<template>
    <div>
          <v-progress-linear color="secondary" v-if="state.isLoading" :indeterminate="true" class="progress-bar" height="3" value="15"></v-progress-linear>
        <v-layout class="select-layout" align-center >
              <div class="select-slot">
              <v-select label="Category" v-model="selectedCategory" item-text="label" item-value="value" :items="categories"></v-select>
              </div>
               <div class="select-slot">
              <v-select label="Status" v-model="selectedStatus" item-text="label"  item-value="value" :items="statuses"></v-select>
              </div>
              <v-spacer></v-spacer>
                <router-link to="createproduct" class="add-product-wrapper">
            <v-btn class="btn-secondary">ADD PRODUCT</v-btn></router-link>
        </v-layout>
        <div class="product-selection-list">
        
       <table class="table" v-if="state.products.length !== 0">
      
        <thead>
        <tr class="table-header">
          <th scope="column">Picture</th>
          <th scope="column">Name</th>
          <th scope="column">Price</th>
          <th></th>
          <th></th>
        </tr> 
        </thead>
        <tbody>
        <tr scope="row" v-for="product in state.products" class="user-tab" v-bind:key="product.productId">
          <td><img class="product-image" crossorigin="anonymous" :alt="product.name" :src="product.imageUrl"></td>
          <td>{{product.name}}</td>
          <td>{{product.price}}</td>
          
          <td><router-link :to="{ name: 'edit', params: { productId: product.productId }}"> <p class="edit-icon" :value="product.productId"><v-icon>edit</v-icon><span> EDIT</span></p></router-link></td>
          <td v-if="product.status === 'active'" >
            <p class="product-status" v-on:click="changeProductStatus(product.productId)">
            <v-icon  style="color:red"  >pause</v-icon>PAUSE
            </p>
          </td>  
          <td v-else-if="product.status === 'inactive'"> 
              <p class="product-status" v-on:click="changeProductStatus(product.productId)"><v-icon  style="color:green" >play_arrow</v-icon>ACTIVATE
              </p>
          </td>
        </tr>
        </tbody>
      </table>
      </div>
       <div class="alert-wrapper">
          <v-alert v-model="state.offline" class="alert" color="rgba(0, 0, 0, 0)">Please connect to the internet</v-alert>
       </div>
      <div class="alert-wrapper" v-if="state.postError">
          <v-alert v-model="state.postError" class="alert" color="rgba(0, 0, 0, 0)">Error! Please try again</v-alert>
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
        allProducts: [],
        offline: false,
        postError: false,
        isLoading: false
      },
      
    };
  },
  async created() {
    this.state.isLoading = true;
    try {
      const res = await Api.instance().get(`items`);
      if (res.status === 200) {
        let products = res.data.reverse()
        this.state.products = products;
        this.state.allProducts = products;
        products.forEach(product => this.$db.set(product.productId, product, "items"));
      }
    } catch (error) {
      let products = await this.$db.getAll("items");
      if (navigator.onLine === false && products.length !== 0) {
          this.state.products = products;
      } else {
          this.state.offline = true
        setTimeout(() => {
          this.state.offline = false
        }, 2000);
      }
    } finally {
      this.state.isLoading = false;
    }
  },
  methods: {
    async changeProductStatus(value) {
      try {
        let res = await Api.instance().put(`product/changestatus/${value}`);
         if (res.status === 200) {
            let products = this.state.products.filter(
              product => product.productId !== value
            );
            products.unshift(res.data);
            this.state.products = products;
          }
      } catch (error) {
        if (navigator.onLine === false) {
             this.state.offline = true
        setTimeout(() => {
          this.state.offline = false
        }, 2000);
        } else {
           this.state.postError = true
          setTimeout(() => {
          this.state.postError = false
        }, 2000);
        }
      }
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
  margin-right: 2rem;
}
.btn-secondary {
  color: #00472e;
  border: 1px solid #00472e;
}
.btn-secondary:hover {
  background-color: #00472e !important;
  color: white;
}
.table-header {
  border-bottom: 1px solid black;
  height: 3rem;
}
th {
  font-size: 1.2rem;
  font-weight: normal;
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
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
  min-width: 600px;
}
th,
td {
  text-align: left;
  padding: 0.5rem;
}
.user-tab {
  border-bottom: 1px solid grey;
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
.product-status:hover {
  cursor: pointer;
}
.edit-icon:hover > * {
  color: rgb(83, 83, 241);
}
.product-selection-list {
  overflow-x: auto;
}
.loading-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 4rem;
}
@media (max-width: 600px) {
  .select-layout {
    flex-direction: column;
  }
  .select-slot {
    width: 100%;
  }
  .select-slot:first-child {
    margin-right: 0px;
  }
  .add-product-wrapper {
    align-self: flex-start !important;
  }
}
</style>
