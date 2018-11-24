<template>
  <div class="overall">
    <form class="create-product-page">
      <InputField v-model="product.name" label="Product Name" name="productName" :error_message="product.errors.name" />
      <div class="product-name-price">
        <div class="select-first">
          <SelectField :options="product.category" :value="selectedCategory" @update="updateCategory" name="productCategory" label="Category" />
          <div class="error-message">
            <p v-if="product.errors.category" class="">{{product.errors.category}}</p>
          </div>
        </div>
        <div class="select-first">
          <InputField v-model="product.price" label="Price" name="productPrice" :error_message="product.errors.price" type="number" />
        </div>
      </div>
      <div class="textarea-picture-container">
        <div class="textarea">
          <p>Description</p>
          <div class="textarea-field">
            <textarea v-model="product.description"> </textarea></div>
          <div class="error-message">
            <p>{{product.errors.description}}</p>
          </div>
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
          <div class="error-message">
            <p>{{product.errors.image}}</p>
          </div>
        </div>
      </div>
      <button type="submit" v-on:click.prevent="addProduct" class="btn-primary submit-button">Submit</button>
    </form>
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
import validations from "@/services/validations";
import swal from "sweetalert2";
import uploadImage from "@/mixins/uploadImage";
import handleError from "@/mixins/handleError";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";

export default {
  name: "Products",
  components: {
    InputField,
    SelectField
  },
  mixins: [uploadImage, handleError],
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
        postError: false
      },
      selectedCategory: ``
    };
  },

  methods: {
    updateCategory(value) {
      this.selectedCategory = value;
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
