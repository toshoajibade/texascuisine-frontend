<template>
  <div class="wrapper"> 
    <label :for="name">{{label}}</label>
    <input :id="name" v-on:input="$emit('input', $event.target.value)" :name="name" :type="type">
    <div class="error-message">
      <p v-if="error_message">{{error_message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    label: {
      type: String,
      required: true
    },
    error_message: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: "text"
    },
    value: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}
input {
  margin-left: 0px;
  margin-top: 0.5rem;
  border-width: 0px 0px 0.5px 0px;
  border-color: black;
  background-color: transparent;
  padding-left: 0px;
  outline: none;
  :focus {
    outline: none
  }
}
.error-message {
  height: 1rem;
  p {
    color: red;
    font-size: 0.75rem;
  }
}

</style>
