<template>
    <div>
        <Header @showSidebar="show"></Header>
        <div class="homepage">
          <side-bar class="sidebar" v-if="open"></side-bar>
          <div class="content-section" @click="hideSidebar">
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
  },
  data() {
    return {
      open: true,
      windowWidth: null
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize)
  },
  methods: {
    onResize() {
      if(window.innerWidth > 960) {
        this.open = true
      } else { this.open = false}
    },
    show() {
      if(this.open) {
        this.open = false
      } else {
        this.open = true
      }
    },
    hideSidebar() {
      if(this.open){
        this.open = false
      }
    }
  },

};
</script>

<style>
.homepage {
  position: relative;
  display: flex
}

p {
  margin-bottom: 0px;
}
.content-section {
  height: calc(100vh - 4rem);
  width: calc(100vw - 250px);
  position: absolute;
  left: 0px;
  padding: 50px 5vw;
  overflow: auto;
  margin-left: 250px;
}
.sidebar {
  width: 250px;
  left: 0px;
  top: 0px;
  z-index: 2;
  transition: width 5s;

}
.v-messages__message {
  color: red;
}
.v-btn {
  border-radius: 5px;
}
@media(max-width: 960px) {
  .content-section {
    margin-left: 0px;
    width: 100vw
  }
}
</style>
