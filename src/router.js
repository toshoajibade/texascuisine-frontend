import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Orders from "./views/Orders.vue";
import ViewOrder from "./views/ViewOrder.vue";
import Settings from "./views/Settings.vue";
import Users from "./views/Users.vue";
import Products from "./views/Products.vue";
import CreateProduct from "./views/CreateProduct.vue";
import EditProduct from "./views/EditProduct.vue";
import Admin from "./views/Admin.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      component: Admin,
      children: [
        {
          path: "",
          component: Dashboard
        },
        {
          path: "products",
          name: "products",
          component: Products
        },
        {
          path: "edit/:productId",
          name: "edit",
          component: EditProduct
        },
        {
          path: "orders",
          name: "orders",
          component: Orders
        },
        {
          path: "vieworder",
          name: "viewOrder",
          component: ViewOrder
        },
        {
          path: "users",
          name: "users",
          component: Users
        },
        {
          path: "settings",
          name: "settings",
          component: Settings
        },
        {
          path: "createproduct",
          name: "createproduct",
          component: CreateProduct
        }
      ]
    }
  ],
  linkExactActiveClass: "exact-active"
});
