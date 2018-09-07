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
            <v-icon class="print-icon" @click="print">print</v-icon>
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
                <p class="customer-heading">Order Details</p>
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
                    <items-ordered class="first-child"></items-ordered>
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
import pdfMake from "pdfmake/build/pdfmake";
import font from "pdfmake/build/vfs_fonts";
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
  },
  methods: {
    print() {
      pdfMake.vfs = font.pdfMake.vfs;
      let docDefinition = { content: `This is a sample of the pdf to make` };
      pdfMake.createPdf(docDefinition).download();
    }
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
.print-icon {
  color: #00472e !important;
  font-size: 3rem;
}

.total > * {
  font-weight: bold;
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
  border-spacing: 0px;
  border-collapse: collapse;
}
th {
  text-align: left;
  font-size: 1.2em;
  font-weight: normal;
  text-transform: uppercase;
}

.print-button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.customer-heading {
  font-size: 1.2rem;
}
.payment-status {
  font-size: 1.5rem;
}
.pending,
.shipped,
.delivered,
.failed {
  text-transform: uppercase;
}
.shipped {
  color: blue;
}
.delivered {
  color: green;
}
.failed {
  color: red;
}
tbody > * {
  height: 3rem;
  border-bottom: 1px solid grey;
}
.first-child {
  border-top: 1px solid grey !important;
}
</style>
