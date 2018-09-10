<template>
    <form class="create-product-page">
        <v-text-field v-model="product.name" label="Product Name" :error-messages="state.errors.name" type="text" />
        <div class="product-name-price">
          <div class="select-first">
          <v-select :items="state.category" v-model="product.category" item-text="label"  item-value="value" label="Category" :error-messages="state.errors.category" type="text" />
          </div> 
          <div  class="select-first">
          <v-text-field v-model="product.price" label="Price" :error-messages="state.errors.price" type="text" /></div>
            
        </div>
     <div class="textarea-picture-container">
            <div class="textarea" >
              <p>Description</p>
              <div class="textarea-field">
              <textarea  v-model="product.description" placeholder="Enter the product description here"> </textarea></div> 
              <p>{{state.errors.description}}</p>
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
              <p>{{state.errors.image}}</p>
            </div>
          </div>
        <v-btn type="submit" v-on:click.prevent="editProduct" class="btn btn-primary">Submit</v-btn>
        <v-btn type="submit" v-on:click.prevent="deleteProduct" class="btn btn-danger">Delete</v-btn>
    </form>
</template>

<script>
import InputField from "@/components/common/InputField";
import TextArea from "@/components/common/TextArea";
import ImageUploader from "@/components/common/ImageUploader";
import Api from "@/views/services/Api";
import swal from "sweetalert2";
import validations from "@/views/services/validations";
const isNothing = require("lodash/isEmpty");

export default {
  name: "Products",
  components: {
    InputField,
    TextArea,
    ImageUploader
  },
  data() {
    return {
      state: {
        errors: {},
          category: [
          { label: "FOOD", value: "food"},
          { label: "DRINK", value: "drinks" }
        ],
      },
      product: {
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
        productId: "",
        imageUrl: "",

      },
      selectedCategory: ``,
      product: {}
    };
  },
  beforeMount() {
    console.log(`I am about to mount`)
    let productId = this.$route.params.productId;
    Api.instance()
      .get(`product/${productId}`)
      .then(res => {
        if (res.status === 200) {
          this.product = res.data;
          console.log(`this is state`,this.product);
        }
      });
  },
  methods: {
    async editProduct() {
      let productId = this.product.productId;
      let { errors } = await validations.validateNewProduct(this.product);
      if(this.product.price <= 0) {
        errors.price = `Please enter a valid amount`
      }
      let isValid = isNothing(errors);
        if (!isValid) {
          this.state.errors = errors;
          return;
        }
      if(!this.product.image) {
        Api.instance()
          .put(`product/edit/${productId}`, this.product)
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/admin/products");
            swal({
              html: "<p>The product has been successfully edited</p>"
            });
          }
        });
      } else {
        let formdata = new FormData();
        formdata.append("name", this.product.name);
        formdata.append("price", this.product.price);
        formdata.append("category", this.selectedCategory);
        formdata.append("description", this.product.description);
        formdata.append("image", this.product.image);
        Api.postPicture()
        .put(`product/edit/${productId}`, formdata)
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/admin/products");
            swal({
              html: "<p>The product has been successfully edited</p>"
            });
          }
        })
      }
    },
    uploadImage(event) {
      const file = event.target.files[0];
      this.product.image = file;
      console.log(this.product.image)
      this.product.imageUrl = URL.createObjectURL(file);
    },
    deleteProduct() {
      let productId = this.product.productId;
      Api.instance()
        .delete(`product/delete/${productId}`)
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/admin/products");
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
.btn-danger {
  margin-left: 2rem;
  background-color: red;
  color: white
}
.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
