<template>
    <div>
        <header class="homepage">
            <nav class="header">
                <p class="logo">Texas Cuisine</p>
                <v-spacer></v-spacer>
                <div class="username-logout ml-auto" v-if="userIsLoggedIn">
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
  padding-left: 50px;
  padding-right: 50px;
}

.logo {
  font-family: "Lobster", cursive;
  color: white;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  margin: 0px;
}

.username-logout {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.username {
  color: white;
  padding: 1rem;
  margin-bottom: 0;
}
.logout-button {
  background-color: transparent;
  color: white;
  border: 1px solid white;
}
</style>
