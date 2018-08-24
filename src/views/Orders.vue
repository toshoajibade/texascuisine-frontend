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
export default {
  name: "Orders",
  components: {
    OrdersTab
  }
};
</script>

<style scoped>
</style>
