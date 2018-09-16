<template>
    <div >
      <v-progress-linear color="secondary" v-if="state.isLoading" :indeterminate="true" class="progress-bar" height="3" value="15"></v-progress-linear>
      <div v-for="order in state.orders" v-bind:key="order.orderNumber">
        <orders-tab :customerPhoneNumber="order.customerPhoneNumber" :orderNumber="order.orderNumber" :customerFirstName="order.customerFirstName" :customerLastName="order.customerLastName" :customerTitle="order.customerTitle" :products="order.products" :customerAddress="order.customerAddress" :deliveryStatus="order.deliveryStatus" />
      </div>
      <div class="alert-wrapper">
          <v-alert v-model="state.offline" class="alert" color="rgba(0, 0, 0, 0)">Please connect to the internet</v-alert>
       </div>
    </div>
</template>

<script>
import OrdersTab from "@/components/common/OrdersTab.vue";
import Api from "@/views/services/Api";
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
        isLoading: false
      }
    };
  },
  async created() {
    this.state.isLoading = true
    try {
      let res = await Api.instance().get(`orders`);
      let orders = res.data.reverse();
      this.state.orders = orders;
      orders.forEach(order => this.$db.set(order.orderNumber, order, "orders"));
    } catch (error) {
      let orders = await this.$db.getAll("orders");
      if (navigator.onLine === false && orders.length !== 0) {
        this.state.orders = orders
      } else {
        this.state.offline = true
        setTimeout(() => {
          this.state.offline = false
        }, 2000);
      }
    } finally {
      this.state.isLoading = false
    }
  }
};
</script>

<style scoped>
</style>
