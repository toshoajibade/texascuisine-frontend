<template>
  <div>
  <div v-show="state.showPage"
    class="order-page"
    
  >
    <div class="update-status-tab">
      <p class="delivery-status">Delivery Status: <span :class=deliveryStatus>{{deliveryStatus}}</span></p>
      <div class="select">
        <SelectField
          label="UPDATE TO: "
          :options="deliveryOptions"
          :value="deliveryStatus"
          @update="updateCategory"
          name="productCategory"
        />
      </div>
      <i
        class="print-icon material-icons"
        @click="print"
      >print</i>
    </div>
    <div class="delivery-details">
      <div class="customer-details">
        <p class="customer-heading">Customer Details</p>
        <p>{{customerTitle}} {{customerFirstName}} {{customerLastName}}</p>
        <p>{{customerEmailAddress}}</p>
        <p>{{customerPhoneNumber}}</p>
        <p>{{customerAddress}}</p>
      </div>
      <div class="order-details">
        <p class="customer-heading">Order Details</p>
        <p>Order#: <span class="order-number">{{orderNumber}}</span></p>
        <p>{{formatedDate}}</p>
        <p class="payment-status">{{paymentStatus.toUpperCase()}}</p>

      </div>
    </div>
    <div class="items-ordered-list">
      <table class="table">
        <thead>
          <tr>
            <th
              scope="column"
              class="product-name-column"
            >Product</th>
            <th
              scope="column"
              class="price-column"
            >Price</th>
            <th
              scope="column"
              class="quantity-column"
            >Quantity</th>
            <th
              scope="column"
              class="subtotal-column"
            >Total</th>
          </tr>
        </thead>
        <tbody>
          <items-ordered
            v-for="product in products"
            :key="product.productId"
            class="first-child"
            :name="product.name"
            :price="product.price"
            :quantity="Number(product.quantity)"
          ></items-ordered>
          <tr>
            <td></td>
            <td></td>
            <td>SHIPPING</td>
            <td>N{{shippingFee}}</td>
          </tr>
          <tr class="total">
            <td></td>
            <td></td>
            <td>TOTAL</td>
            <td>N{{total}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
    <div class="alert-wrapper">
      <p v-show="state.offline" class="alert" color="rgba(0, 0, 0, 0)">Please connect to the internet</p>
    </div>
    <div class="alert-wrapper" v-if="state.postError">
      <p v-show="state.postError" class="alert" color="rgba(0, 0, 0, 0)">Error! Please try again</p>
    </div>
  </div>
</template>

<script>
import ItemsOrdered from "@/components/ItemsOrdered";
import SelectField from "@/components/SelectField";
import Api from "@/services/Api";
import handleError from "@/mixins/handleError";

export default {
  name: "ViewOrder",
  components: {
    ItemsOrdered,
    SelectField
  },
  mixins: [handleError],
  data() {
    return {
      deliveryOptions: [
        { label: "Pending", value: "pending" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
        { label: "Failed", value: "failed" },
        { label: "Cancelled", value: "cancelled" }
      ],
      createdAt: "",
      customerAddress: "",
      customerEmailAddress: "",
      customerFirstName: "",
      customerLastName: "",
      customerPhoneNumber: "",
      customerTitle: "",
      deliveryStatus: "",
      id: null,
      orderNumber: "",
      paymentStatus: "",
      products: [],
      total: null,
      shippingFee: 1000,
      state: {
        offline: false,
        postError: false,
        showPage: false
      }
    };
  },
  async mounted() {
    try {
      let res = await Api.instance().post(
        `order/${this.$route.params.orderNumber}`
      );
      if (res.status === 200) {
        Object.keys(res.data).map(item => {
          if (Object.keys(this).includes(item)) {
            this[item] = res.data[item];
          }
        });
  
        this.total =
          this.shippingFee +
          this.products.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.price * currentValue.quantity,
            0
          );
          this.state.showPage = true
      }
    } catch (error) {
      this.handleError()
    }
  },
  methods: {
    updateCategory(value) {
      this.deliveryStatus = value;
    },
    async print() {
      let res = await Api.instance().post(`print/${this.orderNumber}`);
      const linkSource = `data:application/pdf;base64,${res.data}`;
      const downloadLink = document.createElement("a");
      const fileName = "invoice.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  },
  computed: {
    formatedDate() {
      let date = new Date(this.createdAt);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
  }
};
</script>

<style lang='scss' scoped>
.delivery-status {
  margin-right: 1rem;
  margin-top: 0px;
  width: 250px;
}
.select {
  display: flex;
  flex-direction: row;
  margin-right: 1rem;
  * {
    vertical-align: top;
  }
}

.price-column,
.quantity-column,
.subtotal-column {
  width: 17.5%;
  padding-right: 1rem;
}

.order-page {
  display: flex;
  flex-direction: column;
}
.invoice {
  font-size: 2rem;
}
.select-field-input {
  margin: 0px 0px 0px 1rem;
  width: 200px;
}
.print-icon {
  color: #00472e !important;
  font-size: 3rem;
}

.total > * {
  font-weight: bold;
}
.delivery-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.customer-details {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  margin-right: 2rem;
}
.order-details {
  flex: 1;
  width: 100%;
}
.items-ordered-list {
  overflow-x: auto;
}
table {
  width: 100%;
  min-width: 400px;
  margin-top: 2rem;
  border-spacing: 0px;
  border-collapse: collapse;
}
th {
  text-align: left;
  font-size: 1.2em;
  font-weight: normal;
  text-transform: capitalize;
}

.update-status-tab {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    flex-direction: column;
    > * {
      margin-bottom: 1rem;
    }
  }
}
.customer-heading {
  font-size: 1.2rem;
}
.payment-status {
  font-size: 1.5rem;
}
.pending,
.shipped,
.delivered,
.failed {
  text-transform: uppercase;
}
.shipped {
  color: blue;
}
.delivered {
  color: green;
}
.failed,
.cancelled {
  color: red;
}
tbody > * {
  height: 3rem;
  border-bottom: 1px solid grey;
}
.first-child {
  border-top: 1px solid grey !important;
}
@media (max-width: 600px) {
  .delivery-details {
    flex-direction: column;
  }
  .customer-details {
    margin-right: 0px;
    margin-bottom: 1rem;
  }
  .print-icon {
    width: 3rem;
  }
}
.update-status {
  width: 150px;
}
</style>
