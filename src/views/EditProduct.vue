<template>
<div class="overall">


 <div class="loading-wrapper" v-if="isLoading">
         <v-progress-circular class="loading" indeterminate color="grey" />
      </div>
    <form class="create-product-page">
        <v-text-field v-model="product.name" label="Product Name" :error-messages="state.errors.name" type="text" />
        <div class="product-name-price">
          <div class="select-first">
          <v-select :items="state.category" v-model="product.category" item-text="label"  item-value="value" label="Category" :error-messages="state.errors.category" type="text" />
          </div> 
          <div  class="select-first">
          <v-text-field v-model="product.price" label="Price" :error-messages="state.errors.price" type="number" /></div>
            
        </div>
     <div class="textarea-picture-container">
            <div class="textarea" >
              <p>Description</p>
              <div class="textarea-field">
              <textarea  v-model="product.description" placeholder="Enter the product description here"> </textarea></div> 
              <p class="custom-error">{{state.errors.description}}</p>
            </div>
            <v-spacer></v-spacer>
            <div class="picture">
              <p>Picture</p>
              <div class="image-upload">
                <div class="image-placeholder">
                   <label for="editImage"><v-icon class="edit-image-label">edit</v-icon></label>
                    <input type="file"  id="editImage" @change='uploadImage' class="upload-button">
                    <img class="image-preview" :src="product.imageUrl" alt="" srcset="">
                </div>
              </div>
              <p class="custom-error">{{state.errors.image}}</p>
            </div>
          </div>
        <v-btn type="submit" v-on:click.prevent="editProduct" class="btn btn-primary">Submit</v-btn>
        <v-btn type="submit" v-on:click.prevent="deleteProduct" class="delete-button">Delete</v-btn>
    </form>
    </div>
</template>

<script>
import Api from "@/views/services/Api";
import swal from "sweetalert2";
import validations from "@/views/services/validations";
const isNothing = require("lodash/isEmpty");

export default {
  name: "Products",
  data() {
    return {
      state: {
        errors: {},
        category: [
          { label: "FOOD", value: "food" },
          { label: "DRINK", value: "drinks" }
        ]
      },
      product: {
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
        productId: "",
        imageUrl: ""
      },
      selectedCategory: ``,
      isLoading: false
    };
  },
  async beforeMount() {
    let productId = this.$route.params.productId;
    this.isLoading = true;
    try {
      let res = await Api.instance().get(`product/${productId}`)
        if (res.status === 200) {
          this.product = res.data;
        }
    } catch (error) {
      if (navigator.onLine === false) {
          console.log(`please connect to internet`);
        } else {
          console(`an error occured, please try again`);
        }
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async editProduct() {
      try {
        this.state.errors = {};
        let productId = this.product.productId;
        let { errors } = await validations.validateNewProduct(this.product);
        if (!this.product.price || this.product.price < 0) {
          errors.price = `Please enter a valid amount`;
        }
        
        let isValid = isNothing(errors);
        if (!isValid) {
          this.state.errors = errors;
          return;
        }
        this.isLoading = true;
        if (!this.product.image) {
        let res = await Api.instance().put(`product/edit/${productId}`, this.product)
            if (res.status === 200) {
              this.$router.push("/admin/products");
              swal({
                html: "<p>The product has been successfully edited</p>"
              });
            }
      } else {
        let formdata = new FormData();
        formdata.append("name", this.product.name);
        formdata.append("price", this.product.price);
        formdata.append("category", this.selectedCategory);
        formdata.append("description", this.product.description);
        formdata.append("image", this.product.image);
        let res = await Api.postPicture().put(`product/edit/${productId}`, formdata)
        if (res.status === 200) {
          this.$router.push("/admin/products");
          swal({
            html: "<p>The product has been successfully edited</p>"
          });
        }
      }
      } catch (error) {
        if (navigator.onLine === false) {
          console.log(`please connect to internet`);
        } else {
          console(`an error occured, please try again`);
        }
      } finally {
        this.isLoading = false;
      }
    },
    uploadImage(event) {
      const file = event.target.files[0];
      this.product.image = file;
      console.log(this.product.image);
      this.product.imageUrl = URL.createObjectURL(file);
    },
    deleteProduct() {
      let productId = this.product.productId;
      Api.instance()
        .delete(`product/delete/${productId}`)
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/admin/products");
            swal({
              html: "<p>Product deleted successfully</p>"
            });
          } else if (res.status === 403) {
            this.$router.push("/");
          } else {
            console.log("error");
          }
        });
    }
  }
};
</script>

<style scoped>
.create-product-page {
  width: 100%;
  height: 100%;
}
.product-name-price {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.product-name-price > * {
  width: 100%;
}
.product-name {
  width: 100%;
}
.btn-primary {
  margin-top: 3rem;
  margin-bottom: 3rem;
  background-color: #00472e;
  height: 36px;
}

.picture-label {
  margin-bottom: 0.5rem;
}
.delete-button:hover {
  background-color: #940e0e !important;
  color: white !important;
}
.delete-button {
  color: rgb(173, 8, 8) !important;
  background-color: white !important;
  border: 1px solid #940e0e;
}
.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
