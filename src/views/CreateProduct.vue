<template>
  <div class="overall">
      <div class="loading-wrapper" v-if="isLoading">
         <v-progress-circular class="loading" indeterminate color="grey" />
      </div>
       <form class="create-product-page">

        <v-text-field v-model="state.name" label="Product Name" :error-messages="state.errors.name" type="text" />
        <div class="product-name-price">
          <div class="select-first">
          <v-select :items="state.category" v-model="selectedCategory" item-text="label"  item-value="value" label="Category" :error-messages="state.errors.category" type="text" />
          </div> 
          <div  class="select-first">
          <v-text-field v-model="state.price" label="Price" :error-messages="state.errors.price" type="number" /></div>
            
        </div>
        <div class="textarea-picture-container">
            <div class="textarea" >
              <p>Description</p>
              <div class="textarea-field">
              <textarea  v-model="state.description" placeholder="Enter the product description here"> </textarea></div> 
              <p class="custom-error">{{state.errors.description}}</p>
            </div>
            <v-spacer></v-spacer>
            <div class="picture">
              <p>Picture</p>
              <div class="image-upload">
                <div class="image-placeholder" v-if="state.url">
                   <label for="editImage"><v-icon class="edit-image-label">edit</v-icon></label>
                    <input type="file"  id="editImage" @change='uploadImage' class="upload-button">
                    <img class="image-preview" :src="state.url" alt="" srcset="">
                </div>
                <div class="image-placeholder" v-else>
                    <label for="file"><v-icon class="image-label">add_a_photo</v-icon></label>
                    <input type="file"  id="file" @change='uploadImage' class="upload-button">
                    <p>Click to add product image</p>
                </div>
               
              </div>
              <p  class="custom-error">{{state.errors.image}}</p>
            </div>
          </div>
        <v-btn type="submit" v-on:click.prevent="addProduct" class="btn-primary">Submit</v-btn>
    </form>
  </div>
   
</template>

<script>
import Api from "@/views/services/Api";
import validations from "@/views/services/validations";
import swal from "sweetalert2";
const isNothing = require("lodash/isEmpty");

export default {
  name: "Products",
  data() {
    return {
      state: {
        name: "",
        price: "",
        category: [
          { label: "FOOD", value: "food" },
          { label: "DRINK", value: "drinks" }
        ],
        description: "",
        image: null,
        url: ``,
        errors: {}
      },
      selectedCategory: ``,
      isLoading: false
    };
  },
  methods: {
    async addProduct() {
      this.state.errors = {};
      let price = Number(this.state.price)
      try {
        let req = {
          name: this.state.name,
          price,
          category: this.selectedCategory,
          description: this.state.description,
          image: this.state.image
        };
        let isValid;
        const { errors } = await validations.validateNewProduct(req);
        if (req.image === null) errors.image = `Please upload product picture`;
        if(req.price < 0) errors.price = `Please enter a valid price`
        isValid = isNothing(errors);
        if (!isValid) {
          this.state.errors = errors;
          return;
        }
        this.isLoading = true
        let formdata = new FormData();
        formdata.append("name", this.state.name);
        formdata.append("price", this.state.price);
        formdata.append("category", this.selectedCategory);
        formdata.append("description", this.state.description);
        formdata.append("image", this.state.image);
        await Api.postPicture().post(`items/create`, formdata);
        this.isLoading = false
        this.$router.push("/admin/products");
                    swal({
              html: "<p>Product added successfully</p>"
            });
      } catch (error) {
        this.isLoading = false
      }
    },
    uploadImage(event) {
      const file = event.target.files[0];
      this.state.image = file;
      this.state.url = URL.createObjectURL(file);
    }
  },
  watch: {
    selectedCategory(result) {
      console.log(result);
    }
  }
};
</script>

<style>
.product-description-container {
  display: flex;
  flex-direction: row;
  flex: 1fr 2rem 1fr;
  justify-content: space-between;
}
.create-product-page {
  width: 100%;
  height: 100%;
}
.product-name-price {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.product-name-price > *:first-child {
  margin-right: 2rem;
}
.select-first {
  width: 100%;
}
.image-label {
  color: grey !important;
  padding: 1rem !important;
  font-size: 6rem !important;
  cursor: pointer;
}
.image-label:hover {
  color: #00472e !important;
}
.product-name {
  width: 100%;
}
.btn-primary {
  margin-top: 3rem;
  margin-bottom: 3rem;
  border: 1px solid #00472e;
  color: #00472e !important;
}
.btn-primary:hover {
  background-color: #00472e !important;
  color: white !important;
}
.picture {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.picture-label {
  margin-bottom: 0.5rem;
}
.upload-button {
  display: none;
}
.edit-image-label {
  z-index: 2;
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 3rem;
  color: #00472e !important;
  background-color: white;
  border-radius: 10%;
}
.edit-image-label:hover {
  color: white !important;
  background-color: #00472e;
}
.textarea {
  width: 100%;
  margin-right: 2rem;
}
textarea {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 12px;
  position: absolute;
  border: 0.5px solid #969696 !important;
  top: 0px;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none
}
textarea:focus {
  border: 0.5px solid black !important;
}
.textarea-field {
  border-radius: 4px;
  width: 100%;
  position: relative;
  padding-top: 75%;
}

.textarea-picture-container {
  display: flex;
  flex-direction: row;
}
.image-upload {
  border: 0.5px solid #969696;
  border-radius: 4px;
  width: 100%;
  position: relative;
  padding-top: 75%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.image-upload:hover {
  border: 0.5px solid black;
}
.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4px;
  top: 0px;
}
.image-preview {
  object-fit: cover;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 4px;
  height: 100%;
  width: 100%;
}
.custom-error {
  font-size: 12px;
  color: red;
  background-color: transparent
}
.overall {
  position: relative;
}
.loading-wrapper {
  display: flex;
  position: absolute;
  justify-content: space-around;
  align-items: center;
  z-index: 3;
  width: 100%;
  padding: 2rem;
  margin-top: 4rem;

}
.loading{
  padding: 2rem;
}
 @media(max-width: 600px) {
   .product-name-price {
     flex-direction: column;
   }
   .product-name-price > * {
     flex: 1 1 auto;
   }
   .product-name-price > *:first-child {
  margin-right: 0rem
  }
  .textarea-picture-container {
  display: flex;
  flex-direction: column;
}
}
</style>
