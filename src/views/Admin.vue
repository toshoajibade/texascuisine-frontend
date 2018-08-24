<template>
    <div>
        <Header></Header>
        <div class="homepage">
          <side-bar></side-bar>
          <div class="content-section">
              <router-view></router-view>
          </div>
        </div>
    </div>
</template>

<script>
import Dashboard from "@/views/Dashboard.vue";
import Orders from "@/views/Orders.vue";
import ViewOrder from "@/views/ViewOrder.vue";
import CreateProduct from "@/views/CreateProduct.vue";
import Products from "@/views/Products.vue";
import Settings from "@/views/Settings.vue";
import Users from "@/views/Users.vue";
import SideBar from "@/components/common/SideBar.vue";
import Header from "@/components/common/Header";

export default {
  name: "Admin",
  components: {
    Dashboard,
    Products,
    Settings,
    Users,
    SideBar,
    Orders,
    Header,
    CreateProduct,
    ViewOrder
  }
};
</script>

<style>
.homepage {
  display: flex;
  flex-direction: row;
}

p {
  margin-bottom: 0px;
}
.content-section {
  height: calc(100vh - 4rem);
  width: calc(100vw - 250px);
  padding: 50px 100px;
  overflow: auto;
}
.v-messages__message {
  color: red;
}
.v-btn {
  border-radius: 5px;
}

</style>
