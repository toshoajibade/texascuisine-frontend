<template>
    <div>
        <Header @showSidebar="show" :userIsLoggedIn="userIsLoggedIn" @logout="logout" :getUser="getUser"></Header>
        <div class="homepage">
          <transition name="slideLeft">
            <side-bar class="sidebar" :getUser="getUser" @logout="logout" v-if="open"></side-bar>
          </transition>
          <transition name="fade">
          <p class="overlay" v-if="open"  @click="hideSidebar"></p></transition>
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
require("vue2-animate/dist/vue2-animate.min.css");

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
    };
  },
  created() {
    if (window.innerWidth < 960) {
      this.open = false;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      if (window.innerWidth > 960) {
        this.open = true;
      } else {
        this.open = false;
      }
    },
    show() {
      if (this.open) {
        this.open = false;
      } else {
        this.open = true;
      }
    },
    hideSidebar() {
      if (this.open) {
        this.open = false;
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push(`/`);
    }
  },

  computed: {
    userIsLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
    getUser() {
      return `${this.$store.state.user.firstName} ${
        this.$store.state.user.lastName
      }`;
    }
  }
};
</script>

<style>
.homepage {
  position: absolute;
  top: 64px;
  display: flex;
  height: calc(100vh - 64px);
  flex-direction: row;
  width: 100%;
}

p {
  margin-bottom: 0px;
}

.content-section {
  height: 100%;
  width: calc(100vw - 250px);
  padding: 50px 5vw 0px 5vw;
  overflow: auto;
}
.content-section > * {
  padding-bottom: 3rem;
}
.sidebar {
  flex: 0 0 250px;
  height: 100%;
  z-index: 2;
}
.v-messages__message {
  color: red;
}
.v-btn {
  border-radius: 5px;
}
.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.637);
  display: none;
  margin: 0px;
}
.slideLeft-enter-active,
.slideLeft-leave-active {
  -webkit-animation-duration: 200ms;
  -moz-animation-duration: 200ms;
  animation-duration: 200ms;
}
@media (max-width: 960px) {
  .content-section {
    width: 100vw;
  }
  .overlay {
    display: block;
  }
  .sidebar {
    position: absolute;
    width: 250px;
    height: calc(100vh - 64px);
  }
}
</style>
