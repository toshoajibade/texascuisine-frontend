export default {
  methods: {
    uploadImage(event) {
      const file = event.target.files[0];
      this.product.image = file;
      this.product.url = URL.createObjectURL(file);
    }
  }
};
