<template>
  <div >
    <div v-for="order in state.orders" v-bind:key="order.orderNumber">
      <orders-tab :customerPhoneNumber="order.customerPhoneNumber" :orderNumber="order.orderNumber" :customerFirstName="order.customerFirstName" :customerLastName="order.customerLastName" :customerTitle="order.customerTitle" :products="order.products" :customerAddress="order.customerAddress" :deliveryStatus="order.deliveryStatus" />
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
  name: "Orders",
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
</style>
