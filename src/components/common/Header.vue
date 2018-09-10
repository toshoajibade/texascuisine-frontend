<template>
    <div>
        <header class="homepage">
            <nav class="header">
                <v-icon class="show-sidebar">menu</v-icon>
                <p class="logo">Texas Cuisine</p>
                <v-icon class="drop-down">arrow_drop_down</v-icon>
                <div class="username-logout" v-if="userIsLoggedIn">
                    <p class="username">{{getUser}}</p>
                    <v-btn small class="logout-button" @click="logout">LOGOUT</v-btn>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push(`/`);
    },
    showSidebar() {
      console.log(this.$refs.sidebar)
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

<style scoped>
.header {
  width: 100%;
  height: 64px;
  background-color: #470000;
  display: flex;
  align-items: center;
  padding: 0rem 4rem;
  justify-content: space-between
}

.logo {
  font-family: "Lobster", cursive;
  color: white;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  margin: 0px;
  align-self: flex start;
}

.username-logout {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
}

.username {
  color: white;
  padding: 1rem;
  margin-bottom: 0;
}
.logout-button {
  background-color: transparent !important;
  color: white !important;
  border: 1px solid white;
}
.show-sidebar, .drop-down {
  display: none;
  color: white !important;
  cursor: pointer;
}



@media(max-width: 960px){
   .show-sidebar, .drop-down {
    display: block;
  }
    .username-logout {
    display: none
  }
    .header {
    justify-content: space-between;
    padding: 0 2rem;
  }
}
</style>
