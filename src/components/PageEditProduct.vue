<template>
  <div class="overall" v-cloak>
    <form class="create-product-page">
      <InputField v-model="product.name" label="Product Name" name="productName" :error_message="state.errors.name" />
      <div class="product-name-price">
        <div class="select-first">
          <SelectField :options="state.category" :value="product.category" @update="updateCategory" name="productCategory" label="Category" />
        </div>
        <div class="select-first">
          <InputField v-model="product.price" label="Price" :error_messages="state.errors.price" type="number" />
        </div>
      </div>
      <div class="textarea-picture-container">
        <div class="textarea">
          <p>Description</p>
          <div class="textarea-field">
            <textarea v-model="product.description"> </textarea>
          </div>
          <div class="error-message">
            <p>{{state.errors.description}}</p>
          </div>
        </div>
        <div class="picture">
          <p>Picture</p>
          <div class="image-upload">
            <div class="image-placeholder">
              <label for="editImage">
                <i class="material-icons edit-image-label">edit</i>
              </label>
              <input type="file" id="editImage" @change='uploadImage' class="upload-button">
              <img class="image-preview" :src="product.imageUrl" alt="" srcset="">
            </div>
          </div>
          <div class="error-message">
            <p>{{state.errors.image}}</p>
          </div>
        </div>
      </div>
      <button type="submit" v-on:click.prevent="editProduct" class="btn-primary submit-button">Submit</button>
      <button type="submit" v-on:click.prevent="deleteProduct" class="btn-primary delete-button">Delete</button>
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
import swal from "sweetalert2";
import handleError from "@/mixins/handleError";
import validations from "@/services/validations";
import uploadImage from "@/mixins/uploadImage";
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
      state: {
        errors: {},
        category: [
          { label: "FOOD", value: "food" },
          { label: "DRINK", value: "drinks" }
        ],
        offline: false,
        postError: false
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
      selectedCategory: ``
    };
  },

  async beforeMount() {
    let productId = this.$route.params.productId;
    this.$Progress.start();
    try {
      let res = await Api.instance().get(`product/${productId}`);
      if (res.status === 200) {
        this.product = res.data;
      }
    } catch (error) {
      this.handleError();
    } finally {
      this.$Progress.finish();
    }
  },

  methods: {
    updateCategory(value) {
      this.selectedCategory = value;
    },
    async editProduct() {
      this.$Progress.start();
      this.state.errors = {};
      try {
        let productId = this.product.productId;
        let { errors } = await validations.validateNewProduct(this.product);
        if (!this.product.price || this.product.price < 0) {
          errors.price = `Please enter a valid amount`;
        }
        let isValid = Object.keys(errors).length === 0 ? true : false;
        if (!isValid) {
          this.state.errors = errors;
          return;
        }
        if (!this.product.image) {
          let res = await Api.instance().put(
            `product/edit/${productId}`,
            this.product
          );
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
          let res = await Api.postPicture().put(
            `product/edit/${productId}`,
            formdata
          );
          if (res.status === 200) {
            this.$router.push("/admin/products");
            swal({
              html: "<p>The product has been successfully edited</p>"
            });
          }
        }
      } catch (error) {
        this.handleError();
      } finally {
        this.$Progress.finish();
      }
    },

    async deleteProduct() {
      this.$Progress.start();
      try {
        let res = await Api.instance().delete(
          `product/delete/${this.product.productId}`
        );
        if (res.status === 200) {
          this.$router.push("/admin/products");
          swal({
            html: "<p>Product deleted successfully</p>"
          });
        }
      } catch (error) {
        this.handleError();
      } finally {
        this.$Progress.finish();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.create-product-page {
  width: 100%;
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


.picture-label {
  margin-bottom: 0.5rem;
}
.delete-button:hover {
  background-color: #940e0e;
  color: white;
}
.delete-button {
  color: rgb(173, 8, 8);
  background-color: white;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border: 1px solid #940e0e;
  margin-left: 2rem;
}
.submit-button {
  color: white;
  background-color: $secondary-color;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
