<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>


<style>
@import url("https://fonts.googleapis.com/css?family=Chela+One|Lobster|Dancing+Script|Raleway");
* {
  font-family: "Raleway", cursive;
  font-size: 16px;
  color: rgb(43, 42, 42);
}
.btn-outline-secondary {
  font-size: 0.875rem;
  background-color: transparent;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 0.2rem;
  height: 2rem;
}
.v-messages__message {
  font-size: 12px;
}
.btn-primary {
  color: #00472e;
}
.btn-secondary {
  font-size: 0.75rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  height: 2rem;
}

a,
a:hover,
a:focus {
  text-decoration: none;
}
p {
  margin-bottom: 5px !important;
  margin-top: 5px;
}
</style>
