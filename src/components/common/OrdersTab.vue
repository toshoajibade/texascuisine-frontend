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
        <v-btn class="view-button" type="button" v-on:click.stop="print">PRINT</v-btn>
    </div>
</template>

<script>
export default {
  name: "OrdersTab",
  data() {
    return {
      order: {
        status: `PENDING`,
        number:  `FA5GJH7889907J767`,
        products: `Fried and Jollof Rice, 1/2 Chicken, Table Water`,
        customerName: `Pastor Andrew Okon`,
        address: `No 12, Gwarimpa Street, Onike, Lagos`,
        phoneNumber: `08097937583`
      }
    }
  },
  methods: {
    viewOrder() {
      console.log(`I am about to be clicked`);
      this.$router.push(`vieworder`);
    },
    print() {
      console.log(`printing`);
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
  font-size: 0.875rem;
  background-color: transparent;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 0.2rem;
  height: 2rem;
  border-color: #00472e;
  visibility: hidden;
  color: #00472e;
  align-self: center;
}
.order-status {
  align-self: center;
  margin-bottom: 0px;
}

.view-button:hover {
  background-color: #00472e;
  border-color: #00472e;
  color: white;
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
