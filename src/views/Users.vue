<template>
  <div>
    <form class="create-product-page">
        <p class="create-user-label" style="font-weight:bold">CREATE ADMIN</p>
        <p>Enter new admin details below</p>
        <div class="product-name-price">
          <v-text-field v-model="newUser.firstName" class="select-first" label="First Name" :error-messages="state.errors.firstName" type="text" />
         
          <v-text-field v-model="newUser.lastName" label="Last Name" :error-messages="state.errors.lastName"  type="text" />
            
        </div>

        <div class="product-name-price">
          <v-text-field v-model="newUser.phoneNumber" class="select-first" label="Phone Number" :error-messages="state.errors.phoneNumber" type="text" />
         
            <v-text-field v-model="newUser.email"  label="Email" :error-messages="state.errors.email" type="email" />
            
        </div>
        
        
        <v-btn type="submit" class="btn-primary" v-on:click.prevent="addUser">CREATE</v-btn>
    </form>
    <section v-if="state.users.length !== 0">
      <P style="font-weight:bold" class="current-admins">CURRENT ADMINS</P>
      <table class="table" >
        <thead>
        <tr class="table-header">
          <th class="first-child" scope="column">First Name</th>
          <th scope="column">Last Name</th>
          <th scope="column">Email Address</th>
          <th scope="column">Phone Number</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr scope="row" v-for="user in state.users" class="user-tab" v-bind:key="user.userId">
          <td class="first-child">{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.email}}</td>
          <td>{{user.phoneNumber}}</td>
          <td> <v-icon small class="delete-user" v-on:click="deleteUser(user.userId)">delete</v-icon></td>
        </tr>
        </tbody>
      </table>
    </section>
    </div>
</template>

<script>
import InputField from "@/components/common/InputField";
import TextArea from "@/components/common/TextArea";
import ImageUploader from "@/components/common/ImageUploader";
import Api from "@/views/services/Api";
import validations from "@/views/services/validations";

export default {
  name: "Products",
  components: {
    InputField,
    TextArea,
    ImageUploader
  },
  data() {
    return {
      state: {
        users: [],
        count: 0,
        errors: {}
      },
      newUser: {
        lastName: "",
        firstName: "",
        phoneNumber: "",
        email: ""
      }
    };
  },
  created() {
    Api.instance()
      .get(`user/list`)
      .then(res => {
        if (res.status === 200) {
          this.state.users = res.data.reverse();
          console.log(this.state.users);
        }
      });
  },
  methods: {
    addUser() {
      const { errors, isValid } = validations.validateNewUser(this.newUser);
      if (!isValid) {
        this.state.errors = errors;
        return;
      }
      Api.instance()
        .post(`user/create`, this.newUser)
        .then(res => this.state.users.unshift(res.data))
        .then((this.newUser = {}));
    },
    deleteUser(value) {
      console.log(value);
      Api.instance()
        .delete(`user/delete/${value}`)
        .then(res => {
          let users = this.state.users.filter(user => user.userId !== value);
          this.state.users = users;
        });
    }
  }
};
</script>

<style scoped>
form {
  margin-bottom: 3rem;
}
.select-first {
  margin-right: 2rem;
}
.create-product-page {
  width: 100%;
  height: 100%;
}
.current-admins {
  margin-bottom: 1rem !important;
  font-size: 1.2em;
}
.create-user-label {
  margin-bottom: 1rem;
  font-size: 1.2em;
}
.product-name-price {
  width: 100%;
  display: flex;
}

table {
  width: 100%;
  border-spacing: 0px;
  border-collapse: collapse;
}
.user-tab {
  height: 3rem;
  border-bottom: 1px solid grey !important;
}

.user-tab:hover {
  background-color: #f2f2f2;
}

.delete-user:hover {
  color: red;
}
th {
  text-align: left;
  font-weight: normal;
  font-size: 1.2em;
  text-transform: uppercase;
}
.table-header {
  border-bottom: 1px solid black;
  height: 3rem;
}
.first-child {
  padding-left: 1rem;
}
</style>
