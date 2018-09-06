<template>
    <div class="order-tab" v-on:click="viewOrder">
        <div class="order-details">
            <p>ORDER #: <span class="order-number">{{order.number}}</span> </p>
            <p class="products">{{order.products}}</p>
            
        </div>
        <div class="customer-details">
            <p class="customer-name">{{order.customerName}}</p>
            <p>{{order.phoneNumber}}</p>
            <p>{{order.address}}</p>
        </div>
        <p class="order-status">{{order.status}}</p>
        <v-icon class="view-button" v-on:click.stop="print">printer</v-icon>
    </div>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import font from "pdfmake/build/vfs_fonts";
export default {
  name: "OrdersTab",
  data() {
    return {
      order: {
        status: `PENDING`,
        number: `FA5GJH7889907J767`,
        products: `Fried and Jollof Rice, 1/2 Chicken, Table Water`,
        customerName: `Pastor Andrew Okon`,
        address: `No 12, Gwarimpa Street, Onike, Lagos`,
        phoneNumber: `08097937583`
      }
    };
  },
  methods: {
    viewOrder() {
      this.$router.push(`vieworder`);
    },
    print() {
      pdfMake.vfs = font.pdfMake.vfs;
      let docDefinition = { content: `This is a sample of the pdf to make` };
      pdfMake.createPdf(docDefinition).download();
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
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
@media (max-width: 960px) {
  .order-tab {
    flex-direction: column;
  }
}
.order-details {
  display: flex;
  flex-direction: column;
}
.customer-details {
  display: flex;
  flex-direction: column;
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
.view-button {
  align-self: center;
}
.view-button:hover {
  color: #00472e;
}
.order-status {
  align-self: center;
  margin-bottom: 0px;
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
  box-shadow: 2px 2px 2px #b4b3b3;
  cursor: pointer;
}
.my-auto {
  align-items: center;
}
</style>
