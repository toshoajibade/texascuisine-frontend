<template>
    <div class="order-tab" v-on:click="viewOrder">
        <div class="order-details">
            <p>ORDER #: <span class="order-number">{{orderNumber}}</span> </p>
            <p class="products">{{state.products}}</p>
        </div>
        <div class="customer-details">
            <p class="customer-name">{{`${customerTitle} ${customerFirstName} ${customerLastName}`}}</p>
            <p>{{customerPhoneNumber}}</p>
            <p>{{customerAddress}}</p>
        </div>
        <div class="order-status">
            <p v-if="deliveryStatus == 'shipped'" class="shipped">{{deliveryStatus}}</p>
            <p v-else-if="deliveryStatus == 'cancelled'" class="failed">{{deliveryStatus}}</p>
            <p v-else-if="deliveryStatus == 'failed'" class="failed">{{deliveryStatus}}</p>
            <p v-else-if="deliveryStatus == 'delivered'" class="delivered">{{deliveryStatus}}</p>
            <p v-else class="order-status">{{deliveryStatus}}</p>
        </div>
       <div class="print-button">
  <v-icon  v-on:click.stop="print">printer</v-icon>
       </div>
      
    </div>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import font from "pdfmake/build/vfs_fonts";
export default {
  name: "OrdersTab",
  props: [
    "orderNumber",
    "paymentStatus",
    "deliveryStatus",
    "customerAddress",
    "customerPhoneNumber",
    "customerFirstName",
    "customerLastName",
    "customerTitle",
    "products"
  ],
  data() {
    return {
      state: {
        products: []
      },
      user: {
        name: `Ajibade Nurudeen`
      }
    };
  },
  methods: {
    viewOrder() {
      this.$router.push(`vieworder`);
    },
    print() {
      pdfMake.vfs = font.pdfMake.vfs;
      let docDefinition = {
        content: [
          `This is a sample of the pdf to make`,
          {
            columns: [
              {
                width: "50%",
                text: "first column"
              },
              {
                width: "50%",
                text: this.user.name
              }
            ]
          }
        ]
      };
      pdfMake.createPdf(docDefinition).download();
    }
  },
  mounted() {
    let products = this.products;
    let productsOrdered = ``;
    products.forEach(product => {
      let productName = `${product.productName} ${product.productQuantity} `;
      productsOrdered += productName;
    });
    this.state.products = productsOrdered;
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

.v-icon {
  width: 24px;
}
.v-icon:hover {
  color: #00472e;
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
