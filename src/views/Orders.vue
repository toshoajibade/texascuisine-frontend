<template>
    <div >
      <div v-for="order in state.orders" v-bind:key="order.orderNumber">
        <orders-tab :customerPhoneNumber="order.customerPhoneNumber" :orderNumber="order.orderNumber" :customerFirstName="order.customerFirstName" :customerLastName="order.customerLastName" :customerTitle="order.customerTitle" :products="order.products" :customerAddress="order.customerAddress" :deliveryStatus="order.deliveryStatus" />
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
        orders: []
      }
    };
  },
  async created() {
    try {
      let res = await Api.instance().get(`orders`);
      let orders = res.data;
      console.log(orders);
      this.state.orders = orders;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
</style>
