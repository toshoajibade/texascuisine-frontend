<template>
  <div>
    <div class="sales-data">
      <div>
        <p class="data-label">PENDING ORDERS</p>
        <p class="data">20</p>
      </div>
      <div>
        <p class="data-label">TODAY'S SALES</p>
        <p class="data">N385,890</p>
      </div>
      <div>
        <p class="data-label">TODAY'S ORDERS</p>
        <p class="data">56</p>
      </div>
    </div>
    <div class="pending-orders">
      <p class="pending-order-title">Pending Orders List</p>
      <div v-for="order in state.orders" v-bind:key="order.orderNumber">
        <orders-tab :customerPhoneNumber="order.customerPhoneNumber" :orderNumber="order.orderNumber" :customerFirstName="order.customerFirstName" :customerLastName="order.customerLastName" :customerTitle="order.customerTitle" :products="order.products" :paymentStatus="order.paymentStatus" :customerAddress="order.customerAddress" :deliveryStatus="order.deliveryStatus" />
      </div>
    </div>
    <div class="alert-wrapper">
      <p v-show="state.offline" class="alert" color="rgba(0, 0, 0, 0)">Please connect to the internet</p>
    </div>

  </div>
</template>

<script>
import OrdersTab from "@/components/OrdersTab.vue";
import Api from "@/services/Api";
export default {
  name: "Dashboard",
  components: {
    OrdersTab
  },
  data() {
    return {
      state: {
        orders: [],
        offline: false,
      }
    };
  },
  async created() {
    this.$Progress.start();
    try {
      let res = await Api.instance().get(`orders`);
      let orders = res.data.reverse();
      this.state.orders = orders;
      orders.forEach(order => this.$db.set(order.orderNumber, order, "orders"));
    } catch (error) {
      let orders = await this.$db.getAll("orders");
      if (navigator.onLine === false && orders.length !== 0) {
        this.state.orders = orders;
      } else {
        this.state.offline = true;
        setTimeout(() => {
          this.state.offline = false;
        }, 2000);
      }
    } finally {
      this.$Progress.finish();
    }
  }
};
</script>

<style scoped>
.sales-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem;
  margin-bottom: 2rem;
}
.sales-data > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@media (max-width: 600px) {
  .sales-data {
    padding: 0px;
  }
  .data-label {
    width: 75px;
  }
}

.date-label {
  font-size: 1rem;
}
.data {
  font-size: 2rem;
  font-weight: 500;
  color: #00472e;
}
.pending-orders {
  display: flex;
  flex-direction: column;
}
.pending-order-title {
  font-size: 1rem;
}
</style>
