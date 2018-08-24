<template>
    <form class="create-product-page">
        <input-field label="Name" v-model="state.name" class="product-name" placeholder="What is the name of the product"/>
        <div class="product-name-price">
            <input-field label="Category" v-model="state.category" placeholder="Select the product category"/>
            <input-field label="Price" v-model="state.price" placeholder="How much is the product"/>
        </div>
        <div class="product-name-price">
            <text-area label="Description" v-model="state.description" type="textarea" placeholder="Select the product category"/>
            <div>
              <p class="picture-label">Picture</p>
              <img class="product-image" :src="state.imageUrl" alt="The picture of the product">
            </div>

        </div>
        <button type="submit" v-on:click.prevent="editProduct" class="btn btn-primary">Submit</button>
        <button type="submit" v-on:click.prevent="deleteProduct" class="btn btn-danger">Delete</button>
    </form>
</template>

<script>
import InputField from "@/components/common/InputField";
import TextArea from "@/components/common/TextArea";
import ImageUploader from "@/components/common/ImageUploader";
import Api from "@/views/services/Api";
import swal from "sweetalert2";

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
        category: "",
        description: "",
        image: null,
        productId: "",
        imageUrl: ""
      },
      product: {}
    };
  },
  beforeMount() {
    let productId = this.$route.params.productId;
    Api.instance()
      .get(`product/${productId}`)
      .then(res => {
        if (res.status === 200) {
          this.state = res.data;
          console.log(res.data);
        }
      });
  },
  methods: {
    editProduct() {
      console.log("I am about to edit");
      let productId = this.state.productId;
      console.log(productId);
      Api.instance()
        .put(`product/edit/${productId}`, this.state)
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/admin/products");
            swal({
              html: "<p>The product has been successfully edited</p>"
            });
          }
        });
    },
    clicked(value) {
      this.state.image = value;
    },
    deleteProduct() {
      let productId = this.state.productId;
      Api.instance()
        .delete(`product/delete/${productId}`, this.state)
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
  width: 48%;
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
}
.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
