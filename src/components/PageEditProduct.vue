<template>
  <div class="overall">
    <form class="create-product-page">
      <input v-model="product.name" label="Product Name" :error-messages="state.errors.name" type="text" />
      <div class="product-name-price">
        <div class="select-first">
          <v-select :items="state.category" v-model="product.category" item-text="label" item-value="value" label="Category" :error-messages="state.errors.category" type="text" />
        </div>
        <div class="select-first">
          <input v-model="product.price" label="Price" :error-messages="state.errors.price" type="number" /></div>
      </div>
      <div class="textarea-picture-container">
        <div class="textarea">
          <p>Description</p>
          <div class="textarea-field">
            <textarea v-model="product.description" placeholder="Enter the product description here"> </textarea></div>
          <p class="custom-error">{{state.errors.description}}</p>
        </div>
        <v-spacer></v-spacer>
        <div class="picture">
          <p>Picture</p>
          <div class="image-upload">
            <div class="image-placeholder">
              <label for="editImage">
                <v-icon class="edit-image-label">edit</v-icon>
              </label>
              <input type="file" id="editImage" @change='uploadImage' class="upload-button">
              <img class="image-preview" :src="product.imageUrl" alt="" srcset="">
            </div>
          </div>
          <p class="custom-error">{{state.errors.image}}</p>
        </div>
      </div>
      <button type="submit" v-on:click.prevent="editProduct" class="btn btn-primary">Submit</button>
      <button type="submit" v-on:click.prevent="deleteProduct" class="delete-button">Delete</button>
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
import swal from "sweetalert2";
import handleError from "@/middleware/handleError";
import validations from "@/services/validations";

export default {
  name: "Products",
  mixins: [uploadImage],
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
