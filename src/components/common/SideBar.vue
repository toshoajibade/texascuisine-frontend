<template>
    <div class="side-navigation-bar">
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
        <!-- <router-link to="/admin/settings">
            <div class="navigation-tab">
                <p class="nona">SETTINGS</p>
            </div>
         </router-link> -->
    </div>
</template>

<script>
export default {
  name: "SideBar"
};
</script>

<style>
.side-navigation-bar {
  padding-top: 50px;
  width: 250px;
  height: calc(100vh - 4rem);
  background-color: #940e0e;
}
.navigation-tab {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
