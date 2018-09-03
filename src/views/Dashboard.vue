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
           <orders-tab></orders-tab>
           <orders-tab></orders-tab>
           <orders-tab></orders-tab>
       </div>
    </div>
</template>

<script>
import OrdersTab from "@/components/common/OrdersTab.vue";
export default {
  name: "Dashboard",
  components: {
    OrdersTab
  },
  methods: {
    vieworder() {
      console.log(`I have been clicked`);
      this.$router.push(`/vieworder`);
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
