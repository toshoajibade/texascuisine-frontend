<template>
    <tr>
        <td>{{name}}</td>
        <td>N{{price}}</td>
        <td>{{quantity}}</td>
        <td>N{{total}}</td>
    </tr>
</template>

<script>
export default {
  name: "ItemsOrdered",
  props: {  
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }

  },
  computed: {
    total() {
      return this.price * this.quantity
    }
  }
};
</script>