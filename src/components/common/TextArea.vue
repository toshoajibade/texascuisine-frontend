<template>
    <div class="form-group">
    <label :for="name" class="label">{{label}}</label>
    <textarea :type="type" class="form-control" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" aria-describedby="emailHelp" :placeholder="placeholder"></textarea>
    </div>
</template>

<style scoped>
.form-control {
  border-width: 1px;
  border-radius: 0.5rem;
  background-color: transparent;
  padding-left: 10px;
  font-size: 16px;
  height: 300px;
}
.label {
  font-size: 16px;
}
</style>

<script>
export default {
  name: "TextArea",
  props: ["name", "label", "value", "type", "placeholder"]
};
</script>
