<template>
  <div>
    <header>
      <nav class="header">
        <div class="show-sidebar-wrapper" v-if="userIsLoggedIn" @click="$emit('showSidebar')">
          <i class="material-icons show-sidebar">menu</i>
        </div>
        <p class="logo">Texas Cuisine</p>
        <p class="drop-down"></p>
        <div class="username-logout" v-if="userIsLoggedIn">
          <p class="username">{{getUser}}</p>
          <button small class="logout-button" @click="$emit('logout')">LOGOUT</button>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  props: {
    getUser: {
      required: false,
      type: String
    },
    userIsLoggedIn: {
      required: true,
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  z-index: 100;
  height: 64px;
  background-color: #470000;
  display: flex;
  align-items: center;
  padding: 0rem 4rem;
  justify-content: space-between;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.541);
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
  padding: 0.25rem 0.75rem;
}
.show-sidebar-wrapper,
.drop-down {
  display: none;
  color: white !important;
  cursor: pointer;
}
.show-sidebar {
  color: white !important;
}
.show-sidebar,
.logo {
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
}

@media (max-width: 960px) {
  .show-sidebar-wrapper,
  .drop-down {
    display: block;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .show-sidebar-wrapper:hover {
    background-color: #940e0e;
  }

  .username-logout {
    display: none;
  }
  .header {
    justify-content: space-between;
    padding: 0 2rem;
  }
}
</style>
