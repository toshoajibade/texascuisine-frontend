<template>
    <div class="order-page">
        <div class="print-button-container">
            <p class="delivery-status" v-if="order.status === 'pending'">Delivery Status: <span class="pending">{{order.status}}</span></p>
            <p class="delivery-status" v-else-if="order.status === 'shipped'">Delivery Status: <span class="shipped">{{order.status}}</span></p>
            <p class="delivery-status" v-else-if="order.status === 'delivered'">Delivery Status: <span class="delivered">{{order.status}}</span></p>
            <p class="delivery-status" v-else>Delivery Status: <span class="failed">{{order.status}}</span></p>


            <div class="select">
          <p>UPDATE TO</p>
       <v-select v-model="order.status" class="select-field-input" :items="deliveryStatus" item-text="label"  item-value="value"></v-select></div>
            <v-btn class="print-button btn">PRINT</v-btn>
        </div>
        <div class="delivery-details">
            <div class="customer-details">
                <p class="customer-heading">Customer Details</p>
                <p>Pastor Andrew Okon</p>
                <p>pastorandrew@gmail.com</p>
                <p>08099565423</p>
                <p>No 1, Gwarimpa Road, Aso Rock, Onike,Yaba, Kwara State</p>
            </div>
            <div class="order-status">
                <p>Order#: <span class="order-number">F5HEU6HGUTUJHTY</span></p>
                <p>Date Ordered: 21-08-2018</p>
                <p class="payment-status">PAID</p>
                
            </div>
        </div>
        <div class="order-details">
            <table class="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <items-ordered></items-ordered>
                     <items-ordered></items-ordered>
                      <items-ordered></items-ordered>
                    <items-ordered></items-ordered>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>SHIPPING</td>
                        <td>N500</td>
                    </tr>
                    <tr class="total">
                        <td></td>
                        <td></td>
                        <td>TOTAL</td>
                        <td>N6500</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ItemsOrdered from "@/components/common/ItemsOrdered";
export default {
  name: "ViewOrder",
  components: {
    ItemsOrdered
  },
  data() {
    return {
      deliveryStatus: [
        { label: "Pending", value: "pending" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
        { label: "Failed", value: "failed" },
        { label: "Cancelled", value: "cancelled" }
      ],
      order: {
        status: `Pending`
      }
    };
  }
};
</script>

<style scoped>
.delivery-status {
  margin-right: 1rem;
  width: 250px;
}
.select {
  display: flex;
  flex-direction: row;
}

.order-page {
  display: flex;
  flex-direction: column;
}
.invoice {
  font-size: 2rem;
}
.select-field-input {
  margin: 0px 0px 0px 1rem;
  width: 200px;
}
.print-button {
  font-size: 0.875rem;
  background-color: transparent;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 0.2rem;
  height: 2rem;
  color: #00472e;
}

.print-button:hover {
  color: white;
  background-color: #00472e;
}
.total > * {
  font-size: 1rem;
}
.delivery-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.customer-details {
  display: flex;
  flex-direction: column;
  width: 50%;
}
table {
  width: 100%;
  margin-top: 2rem;
}
th {
  text-align: left;
  font-weight: normal;
  font-style: italic;
  text-transform: uppercase
}

.print-button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.customer-heading {
  font-size: 1rem;
}
.payment-status {
  font-size: 1.5rem;
  
}
.pending, .shipped, .delivered, .failed {
  text-transform: uppercase;
  
}
.shipped {
  color: blue;
}
.delivered {
  color: green
}
.failed {
  color: red
}
</style>
