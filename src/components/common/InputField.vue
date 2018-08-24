<template>
    <div class="form-group">
    <label :for="name" class="label">{{label}}</label>
    <input :type="type" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" class="form-control" aria-describedby="emailHelp" :placeholder="placeholder">
    <div class="error-container"> <small>{{error}}</small></div>
   
    </div>
</template>

<style scoped>
.form-control {
  border-width: 0px 0px 1px 0px;
  border-radius: 0px;
  background-color: transparent;
  padding-left: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px;
}
.label {
  font-size: 16px;
  margin-bottom: 0px;
}
.error-container {
  height: 1rem;
}

small {
  color: red;
}
</style>

<script>
export default {
  name: "InputField",
  props: ["name", "value", "label", "error", "type", "placeholder"]
};
</script>
