<template>
    <form class="create-product-page">
        <v-text-field v-model="state.name" label="Product Name" :error-messages="state.errors.name" type="text" />
        <div class="product-name-price">
          <div class="select-first">
          <v-select :items="state.category" v-model="selectedCategory" item-text="label"  item-value="value" label="Category" :error-messages="state.errors.category" type="text" />
          </div> 
          <div  class="select-first">
          <v-text-field v-model="state.price" label="Price" :error-messages="state.errors.price" type="text" /></div>
            
        </div>
        <div class="textarea-picture-container">
            <div class="textarea" >
              <p>Description</p>
              <div class="textarea-field">
              <textarea  v-model="state.description" placeholder="Enter the product description here"> </textarea></div> 
              <p>{{state.errors.description}}</p>
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
              <p>{{state.errors.image}}</p>
            </div>
          </div>
        <v-btn type="submit" v-on:click.prevent="addProduct" class="btn-primary">Submit</v-btn>
    </form>
</template>

<script>
import InputField from "@/components/common/InputField";
import TextArea from "@/components/common/TextArea";
import ImageUploader from "@/components/common/ImageUploader";
import Api from "@/views/services/Api";
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
      selectedCategory: ``
    };
  },
  methods: {
    async addProduct() {
      try {
        let req = {
          name: this.state.name,
          price: this.state.price,
          category: this.selectedCategory,
          description: this.state.description,
          image: this.state.image
        };
        let isValid;
        const { errors } = await validations.validateNewProduct(req);
        if (req.image === null) errors.image = `Please upload product picture`;
        isValid = isNothing(errors);
        if (!isValid) {
          this.state.errors = errors;
          return;
        }
        let formdata = new FormData();
        formdata.append("name", this.state.name);
        formdata.append("price", this.state.price);
        formdata.append("category", this.selectedCategory);
        formdata.append("description", this.state.description);
        formdata.append("image", this.state.image);
        Api.postPicture().post(`items/create`, formdata);
      } catch (error) {
        console.log(error);
      }
    },
    uploadImage(event) {
      const file = event.target.files[0];
      this.image = file;
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
