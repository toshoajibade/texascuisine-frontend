<template>
  <div class="wrapper"> 
    <label :for="name">{{label}}</label>
    <input :id="name" :value='value' v-on:input="$emit('input', $event.target.value)" :name="name" :type="type">
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
      type: [String, Number],
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
  border-color: #969696;
  background-color: transparent;
  padding-left: 0px;
  padding-bottom: 0.5rem;
  outline: none;
  &:focus, &:active {
    border-color: black;
    outline: none;
  }
}
.error-message {
  height: 1rem;
  p {
    color: red;
    font-size: 0.75rem;
  }
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button:hover, 
input[type=number]::-webkit-outer-spin-button:hover,
 { 
  -webkit-appearance: none; 
  margin: 0; 
}

</style>
