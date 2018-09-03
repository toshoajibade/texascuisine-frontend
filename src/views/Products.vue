<template>
    <div>
        <v-layout wrap align-center >
              <div class="select-slot">
              <v-select label="Category" v-model="selectedCategory" item-text="label" item-value="value" :items="categories"></v-select>
              </div>
               <div class="select-slot">
              <v-select label="Status" v-model="selectedStatus" item-text="label"  item-value="value" :items="statuses"></v-select>
              </div>
              <v-spacer></v-spacer>
                <router-link to="createproduct">
            <v-btn class="btn-secondary">CREATE PRODUCT</v-btn></router-link>
        </v-layout>
            
        <div class="product-selection-list">
       <table class="table">
        <thead>
        <tr>
          <th scope="column">Picture</th>
          <th scope="column">Name</th>
          <th scope="column">Price</th>
          <th></th>
          <th></th>
        </tr> 
        </thead>
        <tbody>
        <tr scope="row" v-for="product in state.products" class="user-tab" v-bind:key="product.productId">
          <td><img class="product-image" :src="product.imageUrl"></td>
          <td>{{product.name}}</td>
          <td>{{product.price}}</td>
          
          <td><router-link :to="{ name: 'edit', params: { productId: product.productId }}"> <v-btn class="btn btn-outline-secondary" :value="product.productId">EDIT</v-btn></router-link></td>
          <td v-if="product.status === 'active'"> <v-btn class="btn btn-outline-secondary" :value="product.productId" v-on:click="changeProductStatus" >PAUSE</v-btn></td>
          <td v-else> <v-btn class="btn btn-outline-secondary" :value="product.productId" v-on:click="changeProductStatus">ACTIVATE</v-btn></td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
</template>

<script>
import Api from "@/views/services/Api";

export default {
  name: "Products",
  data() {
    return {
      categories: [
        { label: "ALL", value: "all" },
        { label: "FOOD", value: "food" },
        { label: "DRINK", value: "drinks" }
      ],
      statuses: [
        { label: "ACTIVE", value: "active" },
        { label: "INACTIVE", value: "inactive" },
        { label: "ALL", value: "all" }
      ],
      selectedCategory: null,
      selectedStatus: null,
      state: {
        products: [],
        allProducts: []
      }
    };
  },
  created() {
    Api.instance()
      .get(`items`)
      .then(res => {
        if (res.status === 200) {
          this.state.products = res.data;
          this.state.allProducts = res.data;
        }
      });
  },
  methods: {
    changeProductStatus() {
      let productId = event.target.value;
      Api.instance()
        .put(`product/changestatus/${productId}`)
        .then(res => {
          if (res.status === 200) {
            let products = this.state.products.filter(
              product => product.productId !== productId
            );
            products.unshift(res.data);
            this.state.products = products;
          }
        });
    }
  },
  watch: {
    selectedStatus(result) {
      let products = [];
      this.state.products = this.state.allProducts;
      switch (true) {
        case result === "inactive":
          products = this.state.products.filter(
            product => product.status === "inactive"
          );
          this.state.products = products;
          break;
        case result === "active":
          products = this.state.products.filter(
            product => product.status === "active"
          );
          this.state.products = products;
          break;
        default:
          return;
      }
    },
    selectedCategory(result) {
      let products = [];
      this.state.products = this.state.allProducts;
      switch (true) {
        case result === "food":
          products = this.state.products.filter(
            product => product.category === "food"
          );
          this.state.products = products;
          break;
        case result === "drinks":
          products = this.state.products.filter(
            product => product.category === "drinks"
          );
          this.state.products = products;
          break;
        default:
          return;
      }
    }
  }
};
</script>

<style scoped>

.select-slot {
  width: 200px;
}
.select-slot:first-child {
  margin-right: 2rem
}
.btn-secondary {
  background-color: #00472e;
  height: 2rem;
}
.my-auto {
  margin-right: 0.5rem;
}
.btn-outline-secondary {
  visibility: hidden;
}
.product-image {
  width: 150px;
  height: 100px;
  border-radius: 5%;
  object-fit: cover;
}
table {
  margin-top: 50px;
  width: 100%
}
th, td {
  text-align: left;
  padding: 0.5rem
}
.user-tab {
  border: 0px 0px 1px solid grey;
}
.table td {
  vertical-align: middle;
}
.user-tab:hover {
  background-color: #f2f2f2;
}
.user-tab:hover .btn-outline-secondary {
  border: 1px solid #00472e;
  visibility: visible;
}
.btn-outline-secondary:hover {
  color: white;
  background-color: #00472e;
}

</style>
