<template> 
    <picture-input 
      ref="pictureInput" 
      @change="onChange" 
      width="400" 
      height="300" 
      radius="5%"
      accept="image/jpeg,image/png" 
      size="10" 
      :crop="true"
      buttonClass="btn"
      :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Click here to add product picture'
      }">
    </picture-input>
</template>

<script>
import PictureInput from "vue-picture-input";
export default {
  name: "app",
  data() {
    return {
      image: null
    };
  },
  components: {
    PictureInput
  },
  methods: {
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        this.$emit("clicked", this.$refs.pictureInput.file);
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  }
};
</script>

<style>
.preview-container {
  border-radius: 0.5rem;
}
.picture-inner {
  border-width: 0 !important;
}
</style>
