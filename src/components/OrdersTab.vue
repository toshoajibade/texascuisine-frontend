<template>
  <div
    class="order-tab"
    v-on:click="viewOrder"
  >
    <div class="order-details">
      <p>ORDER #: <span class="order-number">{{orderNumber}}</span> </p>
      <p
        class="products"
        style="white-space: pre-line;line-height: 1.5"
      >{{orderSummary}}</p>
    </div>
    <div class="customer-details">
      <p class="customer-name">{{`${customerTitle} ${customerFirstName} ${customerLastName}`}}</p>
      <p>{{customerPhoneNumber}}</p>
      <p>{{customerAddress}}</p>
    </div>
    <div class="order-status">
      <p
        v-if="deliveryStatus == 'shipped'"
        class="shipped"
      >{{deliveryStatus}}</p>
      <p
        v-else-if="deliveryStatus == 'cancelled'"
        class="failed"
      >{{deliveryStatus}}</p>
      <p
        v-else-if="deliveryStatus == 'failed'"
        class="failed"
      >{{deliveryStatus}}</p>
      <p
        v-else-if="deliveryStatus == 'delivered'"
        class="delivered"
      >{{deliveryStatus}}</p>
      <p
        v-else
        class="order-status"
      >{{deliveryStatus}}</p>
    </div>
    <div class="print-button">
      <i
        class="material-icons print"
        v-on:click.stop="print"
      >print</i>
    </div>

  </div>
</template>

<script>
import Api from "@/services/Api";
export default {
  name: "OrdersTab",
  props: {
    orderNumber: {
      type: String,
      required: true
    },
    customerLastName: {
      type: String,
      required: true
    },
    customerFirstName: {
      type: String,
      required: true
    },
    customerPhoneNumber: {
      type: String,
      required: true
    },
    customerAddress: {
      type: String,
      required: true
    },
    deliveryStatus: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: String,
      required: true
    },
    customerTitle: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      state: {
        products: []
      },
      orderSummary: ""
    };
  },
  mounted() {
    let orderSummary = "";
    let count = 0;
    this.products.map((product, index) => {
      if (index < 2) {
        orderSummary = orderSummary.concat(
          `${product.name} - ${product.quantity}\n`
        );
      } else {
        count++;
      }
      count > 0
        ? (this.orderSummary = `${orderSummary} and ${count} more.`)
        : (this.orderSummary = `${orderSummary}`);
    });
  },

  methods: {
    viewOrder() {
      this.$router.push(`vieworder/${this.orderNumber}`);
    },
    async print() {
      let res = await Api.instance().post(`print/${this.orderNumber}`);
      const linkSource = `data:application/pdf;base64,${res.data}`;
      const downloadLink = document.createElement("a");
      const fileName = "vct_illustration.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }
};
</script>

<style scoped>
.order-tab {
  width: 100%;
  border-radius: 0.5rem;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  box-shadow: 2px 2px 2px #b4b3b3;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.order-tab > * {
  margin-right: 1rem;
}
@media (max-width: 600px) {
  .order-tab {
    flex-direction: column;
  }
  .order-status,
  .print-button {
    align-self: flex-start !important;
  }
}
.order-details {
  display: flex;
  flex-direction: column;
  flex: 3;
}
.customer-details {
  display: flex;
  flex-direction: column;
  flex: 4;
}

.order-status {
  align-self: center;
  margin-bottom: 0px;
  flex: 1;
}
.print-button {
  align-self: center;
  flex: 1;
  margin-right: 0px;
  display: flex;
  justify-content: center;
}

.customer-name {
  font-weight: normal;
  font-style: italic;
}
.item-ordered {
  display: flex;
  flex-direction: row;
}
.order-tab:hover .view-button {
  visibility: visible;
}

.view-button:hover {
  color: #00472e;
}

.order-status > * {
  text-transform: uppercase;
  width: 100px;
}

.update-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.order-number {
  font-weight: bold;
}
.order-tab:hover {
  background-color: #ebebeb;
  cursor: pointer;
}
.my-auto {
  align-items: center;
}
.shipped {
  color: blue;
}
.delivered {
  color: green;
}
.failed {
  color: red;
}
</style>
