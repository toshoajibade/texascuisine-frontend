<template>
    <div>
        <orders-tab></orders-tab>
        <orders-tab></orders-tab>
        <orders-tab></orders-tab>
        <orders-tab></orders-tab>
        <orders-tab></orders-tab>
        <orders-tab></orders-tab>
        <orders-tab></orders-tab>
        <orders-tab></orders-tab>
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
  async created() {
    try {
    let orders = await Api.instance().get(`orders`);
    console.log(orders)
    } catch (error) {
      console.log(error)
    }

  }
};
</script>

<style scoped>
</style>
