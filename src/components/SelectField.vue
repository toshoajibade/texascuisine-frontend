<template>
  <div class="custom-select" v-click-outside="hide">
    <label :for="name">{{label}}</label>
    <input :id="name" :value="value.toUpperCase()" @click="showDropdown = true" readonly>
    <i class="material-icons" @click="showDropdown = true" ></i>
    <div class="custom-select-options" v-show="showDropdown" @click="showDropdown = false">
      <div v-for="option in options" :value="option.value" :key="option.value" @click="$emit('update', option.value)">{{option.value.toUpperCase()}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    options: {
      type: [Array, Number, String, Boolean, Object],
      required: true,
      validator(value) {
        return value.length > 0;
      }
    },
    value: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    hide() {
      this.showDropdown = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-select {
  width: 100%;
  position: relative;
}
i {
  &::after {
    content: "arrow_drop_down";
    position: absolute;
    right: 0.25rem;
    font-size: 1.5rem;
    bottom: 0.5rem;
  }
}

input {
  width: 100%;
  border-width: 0px 0px 0.5px 0px;
  border-color: #969696;
  padding-bottom: 0.5rem;
  margin-top: 0.5rem;
  outline: none;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
    border-color: black;
  }
}

.custom-select-options {
  display: block;
  position: absolute;
  width: 100%;
  background-color: white;
  z-index: 100;
  top: 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 10px rgb(143, 143, 143);
  & > * {
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: #0000000a;
    }
  }
}
label {
  width: 100%;
}
</style>
