<template>
    <div class="side-navigation-bar">
        <div>
            <router-link to="/admin">
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
        <!-- <router-link to="/admin/settings">
            <div class="navigation-tab">
                <p class="nona">SETTINGS</p>
            </div>
         </router-link> -->
        </div>
        
        <div class="user-logout">
            <p>{{getUser}}</p>
            <v-btn class="logout-button" @click="$emit('logout')">LOG OUT</v-btn>
        </div>

    </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ["getUser", "logout"],
  watch:{
    $route (to, from){
        if(window.innerWidth < 960){
           this.$parent.open = false; 
        }
        
    }
  }
};
</script>

<style>
.side-navigation-bar {
  padding-top: 50px;
  height: calc(100vh - 4rem);
  background-color: #940e0e;
  display: flex;
  justify-content: space-between;
  flex-direction: column
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
    color: white
}
.navigation-tab:hover {
  background-color: rgb(187, 33, 33);
  text-decoration: none;
}
.navigation-tab > p {
  font-size: 1.2rem;
  margin-bottom: 0;
  color: white;
}
.logout-button {
  background-color: transparent !important;
  color: white !important;
  border: 1px solid white;
}
@media(max-width: 960px){
    .user-logout {
        display: flex
    }
}
</style>
