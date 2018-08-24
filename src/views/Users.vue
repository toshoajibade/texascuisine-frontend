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
        
        
        <v-btn type="submit" class="btn btn-primary" v-on:click.prevent="addUser">CREATE</v-btn>
    </form>
    <section>
      <P style="font-weight:bold">CURRENT ADMINS</P>
      <table class="table">
        <thead>
        <tr>
          <th scope="column">First Name</th>
          <th scope="column">Last Name</th>
          <th scope="column">Email Address</th>
          <th scope="column">Phone Number</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr scope="row" v-for="user in state.users" class="user-tab" v-bind:key="user.userId">
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.email}}</td>
          <td>{{user.phoneNumber}}</td>
          <td> <v-btn small class="btn-outline-secondary" v-on:click="deleteUser(user.userId)">Delete</v-btn></td>
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
        }
      });
  },
  methods: {
    addUser() {
      const { errors, isValid } = validations.validateNewUser(this.newUser);
      if(!isValid) {
        this.state.errors = errors;
        return
      }
      Api.instance().post(`user/create`, this.newUser).then(res => this.state.users.unshift(res.data))
      .then(this.newUser = {});
    },
    deleteUser(value) {
      console.log(value);
      Api.instance().delete(`user/delete/${value}`);
    }
  }
};
</script>

<style scoped>
.select-first {
  margin-right: 2rem
}
.create-product-page {
  width: 100%;
  height: 100%;
}

.create-user-label {
  margin-bottom: 1rem;
}
.product-name-price {
  width: 100%;
  display: flex
}
.btn-primary {
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  background-color: #00472e;
  height: 36px;
}
table {
  width: 100%;
}

.user-tab:hover {
  background-color: #f2f2f2;
}
.btn-outline-secondary {
  visibility: hidden;
}
.user-tab:hover .btn-outline-secondary{
  visibility: visible
}
th {
  text-align: left;
  font-weight: normal
}
</style>
