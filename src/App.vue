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
html {
  overflow-y: hidden !important;
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
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  border: 1px solid #00472e;
  height: 36px;
  color: #00472e !important;
}
.btn-primary:hover {
  background-color: #00472e !important;
  color: white !important;
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
