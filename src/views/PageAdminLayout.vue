<template>
  <div class="layout">
    <TheNavbar
      @showSidebar="show"
      :userIsLoggedIn="userIsLoggedIn"
      @logout="logout"
      :getUser="getUser"
    ></TheNavbar>
    <div class="homepage">
      <transition name="slide-fade">
        <TheSidebar
          class="sidebar"
          :getUser="getUser"
          @logout="logout"
          v-if="open"
        ></TheSidebar>
      </transition>
      <transition name="fade">
        <p
          class="overlay"
          v-if="open && windowWidth < 900"
          @click="hideSidebar"
        ></p>
      </transition>
      <div class="content-section">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from "@/components/TheSidebar.vue";
import TheNavbar from "@/components/TheNavbar";

export default {
  name: "Admin",
  components: {
    TheNavbar,
    TheSidebar
  },
  data() {
    return {
      open: true,
      windowWidth: null
    };
  },
  created() {
    this.windowWidth = window.innerWidth
    if (window.innerWidth < 960) {
      this.open = false;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
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
    async logout() {
      await this.$router.push(`/`);
      this.$store.dispatch("logout");
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

<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-250px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.layout {
  display: flex;
  flex-direction: column;
}
</style>
