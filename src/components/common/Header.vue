<template>
    <div>
        <header class="homepage">
            <nav class="header">
              <div class="show-sidebar-wrapper">
                <v-icon class="show-sidebar" v-if="userIsLoggedIn" @click="$emit('showSidebar')">menu</v-icon>
              </div>
                <p class="logo">Texas Cuisine</p>
                <p class="drop-down"></p>
                <div class="username-logout" v-if="userIsLoggedIn">
                    <p class="username">{{getUser}}</p>
                    <v-btn small class="logout-button" @click="$emit('logout')">LOGOUT</v-btn>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
  name: "Header",
  props: ["getUser", "userIsLoggedIn", "logout"],
  methods: {
    
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
  justify-content: space-between;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.541)
}

.logo {
  font-family: "Lobster", cursive;
  color: white;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  margin: 0px;
  align-self: flex start;
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */
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
.show-sidebar-wrapper, .drop-down {
  display: none;
  color: white !important;
  cursor: pointer;
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */

}
.show-sidebar{
  color: white !important;  
}



@media(max-width: 960px){
   .show-sidebar-wrapper, .drop-down {
    display: block;
      width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around
  }
  .show-sidebar-wrapper:hover {
    background-color:  #940e0e;
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
