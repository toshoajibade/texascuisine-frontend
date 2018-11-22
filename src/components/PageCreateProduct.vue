<template>
  <div class="overall">
    <form class="create-product-page">
      <InputField v-model="product.name" label="Product Name" name="productName" :error_message="product.errors.name" />
      <div class="product-name-price">
        <div class="select-first">
          <SelectField :options="product.category" :value="selectedCategory" @update="updateCategory" name="productCategory" label="Category" />
        </div>
        <div class="select-first">
          <InputField v-model="product.price" label="Price" :error_messages="product.errors.price" type="number" />
        </div>
      </div>
      <div class="textarea-picture-container">
        <div class="textarea">
          <p>Description</p>
          <div class="textarea-field">
            <textarea v-model="product.description" placeholder="Enter the product description here"> </textarea></div>
          <p class="custom-error">{{product.errors.description}}</p>
        </div>
        <div class="picture">
          <p>Picture</p>
          <div class="image-upload">
            <div class="image-placeholder" v-if="product.url">
              <label for="editImage">
                <i class="material-icons edit-image-label">edit</i>
              </label>
              <input type="file" id="editImage" @change='uploadImage' class="upload-button">
              <img class="image-preview" :src="product.url" alt="" srcset="">
            </div>
            <div class="image-placeholder" v-else>
              <label for="file">
                <i class="material-icons image-label">add_a_photo</i>
              </label>
              <input type="file" id="file" @change='uploadImage' class="upload-button">
              <p>Click to add product image</p>
            </div>

          </div>
          <p class="custom-error">{{product.errors.image}}</p>
        </div>
      </div>
      <button type="submit" v-on:click.prevent="addProduct" class="btn-primary submit-button">Submit</button>
    </form>
    <div class="alert-wrapper">
      <v-alert v-model="state.offline" class="alert" color="rgba(0, 0, 0, 0)">Please connect to the internet</v-alert>
    </div>
    <div class="alert-wrapper" v-if="state.postError">
      <v-alert v-model="state.postError" class="alert" color="rgba(0, 0, 0, 0)">Error! Please try again</v-alert>
    </div>
  </div>

</template>

<script>
import Api from "@/services/Api";
import validations from "@/services/validations";
import swal from "sweetalert2";
import uploadImage from "@/mixins/uploadImage";
import handleError from "@/middleware/handleError";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField"

export default {
  name: "Products",
  components: {
    InputField,
    SelectField
  },
  mixins: [uploadImage],
  data() {
    return {
      product: {
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
      state: {
        offline: false,
        postError: false,
        isLoading: false
      },
      selectedCategory: ``
    };
  },

  methods: {
    updateCategory(value) {
      console.log("imagine")
      this.selectedCategory = value
      console.log(value)
    },
    async addProduct() {
      this.$Progress.start();
      this.product.errors = {};
      let price = Number(this.product.price);
      try {
        let req = {
          name: this.product.name,
          price,
          category: this.selectedCategory,
          description: this.product.description,
          image: this.product.image
        };
        const { errors } = await validations.validateNewProduct(req);
        if (req.image === null) errors.image = `Please upload product picture`;
        if (!req.price || req.price < 0)
          errors.price = `Please enter a valid price`;
        let isValid = Object.keys(errors).length === 0 ? true : false;
        if (!isValid) {
          this.product.errors = errors;
          return;
        }
        let formdata = new FormData();
        formdata.append("name", this.product.name);
        formdata.append("price", this.product.price);
        formdata.append("category", this.selectedCategory);
        formdata.append("description", this.product.description);
        formdata.append("image", this.product.image);
        await Api.postPicture().post(`items/create`, formdata);
        this.$router.push("/admin/products");
        swal({
          html: "<p>Product added successfully</p>"
        });
      } catch (error) {
        this.handleError();
      } finally {
        this.$Progress.finish();
      }
    }
  }
};
</script>

<style lang="scss">
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

.submit-button {
  margin-top: 1rem;
  padding: 0.25rem 0.75rem;
  background-color: $secondary-color;
  color: white;
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
  box-shadow: none;
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
  background-color: transparent;
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
.loading {
  padding: 2rem;
}
@media (max-width: 600px) {
  .product-name-price {
    flex-direction: column;
  }
  .product-name-price > * {
    flex: 1 1 auto;
  }
  .product-name-price > *:first-child {
    margin-right: 0rem;
  }
  .textarea-picture-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
