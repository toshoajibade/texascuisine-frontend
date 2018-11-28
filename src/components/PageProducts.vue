<template>
  <div >
    <div class="select-add-product-wrapper">
      <div class="select-sort-wrapper">
        <SelectField class="select-slot" :options="categories" :value="selectedCategory" @update="selectCategory" name="productCategory" label="Category" />
        <SelectField class="select-slot" :options="statuses" :value="selectedStatus" @update="selectStatus" name="selectStatus" label="Status" />
      </div>
      <router-link to="createproduct" class="add-product-wrapper">
        <button class="btn-primary">ADD PRODUCT</button>
      </router-link>
    </div>
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

            <td>
              <router-link :to="{ name: 'edit', params: { productId: product.productId }}">
                <p class="edit-icon" :value="product.productId">
                  <i class="material-icons">edit</i><span> EDIT</span>
                </p>
              </router-link>
            </td>
            <td v-if="product.status === 'active'">
              <p class="product-status" v-on:click="changeProductStatus(product.productId)">
                <i class="material-icons" style="color:red">pause</i><span>PAUSE</span>
              </p>
            </td>
            <td v-else-if="product.status === 'inactive'">
              <p class="product-status" v-on:click="changeProductStatus(product.productId)">
                <i class="material-icons" style="color:green">play_arrow</i>ACTIVATE
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="alert-wrapper">
      <p v-show="state.offline" class="alert" color="rgba(0, 0, 0, 0)">Please connect to the internet</p>
    </div>
    <div class="alert-wrapper" v-if="state.postError">
      <p v-show="state.postError" class="alert" color="rgba(0, 0, 0, 0)">Error! Please try again</p>
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api";
import handleError from "@/mixins/handleError";
import SelectField from "@/components/SelectField";

export default {
  name: "Products",
  components: {
    SelectField
  },
  mixins: [handleError],
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
      selectedCategory: "all",
      selectedStatus: "all",
      state: {
        products: [],
        allProducts: [],
        offline: false,
        postError: false
      }
    };
  },

  async created() {
    this.$Progress.start();
    try {
      const res = await Api.instance().get(`items`);
      if (res.status === 200) {
        let products = res.data.reverse();
        this.state.products = products;
        this.state.allProducts = products;
        products.forEach(product =>
          this.$db.set(product.productId, product, "items")
        );
      }
    } catch (error) {
      let products = await this.$db.getAll("items");
      if (navigator.onLine === false && products.length !== 0) {
        this.state.products = products;
      } else {
        this.state.offline = true;
        setTimeout(() => {
          this.state.offline = false;
        }, 2000);
      }
    } finally {
      this.$Progress.finish();
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
        this.handleError();
      }
    },
    selectStatus(result) {
      let products = [];
      this.selectedStatus = result;
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
    selectCategory(result) {
      let products = [];
      this.selectedCategory = result;
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

<style scoped lang="scss">
.select-sort-wrapper {
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
    > * {
      margin-bottom: 1.5rem;
    }
  }
}
.select-slot {
  width: 200px;
  @media (max-width: 900px) {
    width: 150px
  }
}
.select-slot:first-child {
  margin-right: 2rem;
}
.btn-primary {
  color: white;
  background-color: #00472e;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
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
.add-product-wrapper {
  align-self: flex-end;
}

.select-add-product-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
}
</style>
