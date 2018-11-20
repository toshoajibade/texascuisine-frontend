<template>
  <custom-select ref="customSelect">
    <select>
      <option v-for="option in options" :key="option">{{option.value}}</option>
    </select>
  </custom-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0;
      }
    }
  },
  
  created() {
    const { customSelect } = this.$refs
  }
};
</script>

<style lang="sass" scoped>

</style>
