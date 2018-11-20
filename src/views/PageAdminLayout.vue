<template>
  <div>
    <TheNavbar @showSidebar="show" :userIsLoggedIn="userIsLoggedIn" @logout="logout" :getUser="getUser"></TheNavbar>
    <div class="homepage">
      <transition name="slideLeft">
        <TheSidebar class="sidebar" :getUser="getUser" @logout="logout" v-if="open"></TheSidebar>
      </transition>
      <transition name="fade">
        <p class="overlay" v-if="open" @click="hideSidebar"></p>
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

<style lang="scss">

</style>
