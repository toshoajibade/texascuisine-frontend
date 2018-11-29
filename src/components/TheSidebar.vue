<template>
  <div class="side-navigation-bar">
    <div>
      <router-link to="/admin/dashboard">
        <div class="navigation-tab">
          <p>DASHBOARD</p>
        </div>
      </router-link>
      <router-link to="/admin/orders">
        <div class="navigation-tab">
          <p>ORDERS</p>
        </div>
      </router-link>
      <router-link to="/admin/products">
        <div class="navigation-tab">
          <p>PRODUCTS</p>
        </div>
      </router-link>
      <router-link to="/admin/users">
        <div class="navigation-tab">
          <p>USERS</p>
        </div>
      </router-link>
    </div>
    <div class="user-logout">
      <p v-if="getUser">{{getUser}}</p>
      <button class="logout-button" @click="$emit('logout')">LOG OUT</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    getUser: {
      type: String,
      required: true
    }
  },
  watch: {
    $route(to, from) {
      if (window.innerWidth < 960) {
        this.$parent.open = false;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.side-navigation-bar {
  padding-top: 50px;
  background-color: #940e0e;
  display: flex;
  position: absolute;
  top: 64px;
  width: 250px;
  height: calc(100vh - 64px);
  justify-content: space-between;
  flex-direction: column;
}
.navigation-tab {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-logout {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 2rem;
  display: none;
}
.user-logout > * {
  color: white;
}
.navigation-tab:hover {
  background-color: rgb(187, 33, 33);
  text-decoration: none;
}
.navigation-tab > p {
  font-size: 1rem;
  margin-bottom: 8px;
  margin-top: 8px;
  color: white;
}
.logout-button {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  margin-top: 1rem;
  padding: 0.5rem 0.75rem;
  &:active {
    background-color: #940e0e;
  }
}
@media (max-width: 960px) {
  .user-logout {
    display: flex;
    margin-bottom: 4rem;
  }
}

</style>
