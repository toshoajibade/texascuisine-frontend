import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const PageAdminLayout = () =>
  import(/* webpackChunkName: "admin" */ "@/views/PageAdminLayout.vue");
const PageLogin = () =>
  import(/* webpackChunkName: "home" */ "@/views/PageLogin.vue");
const Products = () =>
  import(/* webpackChunkName: "product" */ "@/components/PageProducts.vue");
const ViewOrder = () =>
  import(/* webpackChunkName: "viewOrder" */ "@/components/PageViewOrder.vue");
const Users = () =>
  import(/* webpackChunkName: "users" */ "@/components/PageUsers.vue");
const CreateProduct = () =>
  import(/* webpackChunkName: "createproduct" */ "@/components/PageCreateProduct.vue");
const EditProduct = () =>
  import(/* webpackChunkName: "edit" */ "@/components/PageEditProduct.vue");
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/components/PageDashboard.vue");
const Orders = () =>
  import(/* webpackChunkName: "orders" */ "@/components/PageOrders.vue");

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: PageLogin
    },
    {
      path: "/admin",
      component: PageAdminLayout,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
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
          path: "vieworder/:orderNumber",
          name: "viewOrder",
          component: ViewOrder
        },
        {
          path: "users",
          name: "users",
          component: Users
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

router.beforeEach((to, from, next) => {
  if (to.name === `home`) {
    next();
  } else if (store.state.isUserLoggedIn === false) {
    router.push(`/`);
  } else {
    next();
  }
});

export default router;
