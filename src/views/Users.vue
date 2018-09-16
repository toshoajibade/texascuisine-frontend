<template>
  <div>
    <form class="create-product-page">
        <p class="create-user-label" style="font-weight:bold">CREATE ADMIN</p>
        <p>Enter new admin details below</p>
        <div class="new-admin">
          <v-text-field v-model="newUser.firstName" label="First Name" :error-messages="state.errors.firstName" type="text" />
          <v-text-field v-model="newUser.lastName" label="Last Name" :error-messages="state.errors.lastName"  type="text" />
        </div>
        <div class="new-admin">
          <v-text-field v-model="newUser.phoneNumber" label="Phone Number" :error-messages="state.errors.phoneNumber" type="text" />
          <v-text-field v-model="newUser.email"  label="Email" :error-messages="state.errors.email" type="email" />
        </div>
        
        
        <v-btn type="submit" class="btn-primary" v-on:click.prevent="addUser">CREATE</v-btn>
    </form>
    <section v-if="state.users.length !== 0">
      <P style="font-weight:bold" class="current-admins">CURRENT ADMINS</P>
      <div class="table-container">
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
      </div>
     
    </section>
    </div>
</template>

<script>
import Api from "@/views/services/Api";
import validations from "@/views/services/validations";

export default {
  name: "Products",
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
  async created() {
    try {
      const res = await Api.instance().get(`user/list`);
      if (res.status === 200) {
        let users = res.data.reverse();
        this.state.users = users;
        users.forEach(user => this.$db.set(user.userId, user, "users"));
      }
    } catch (error) {
      let users = await this.$db.getAll("users");
      if (navigator.onLine === false && users.length !== 0) {
          this.state.users = users;
      } else {
        console.log(`please connect to the internet`)
      }
    }
  },
  methods: {
    async addUser() {
      this.state.errors = {};
      try {
        const { errors, isValid } = await validations.validateNewUser(
          this.newUser
        );
        if (!isValid) {
          this.state.errors = errors;
          return;
        }
        const res = await Api.instance().post(`user/create`, this.newUser);
        if (res.status === 200) {
          this.state.users.unshift(res.data);
          this.$db.set(res.data.userId, res.data, "users");
          this.newUser = {};
        }
      } catch (error) {
        if (navigator.onLine === false) {
          console.log(`please connect to internet`);
        } else {
          console(`an error occured, please try again`);
        }
      }
    },
    async deleteUser(value) {
      try {
        const res = await Api.instance().delete(`user/delete/${value}`);
        if (res.status === 200) {
          let users = this.state.users.filter(user => user.userId !== value);
          this.state.users = users;
          this.$db.delete(value, "users");
        }
      } catch (error) {
        if (navigator.onLine === false) {
          console.log(`please connect to internet`);
        } else {
          console.log(`an error occured, please try again`);
        }
      }
    }
  }
};
</script>

<style scoped>
form {
  margin-bottom: 3rem;
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
.new-admin {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.new-admin > *:first-child {
  margin-right: 2rem;
}

@media (max-width: 600px) {
  .new-admin {
    flex-direction: column;
  }
  .new-admin > * {
    flex: 1 1 auto;
  }
  .new-admin > *:first-child {
    margin-right: 0rem;
  }
}

section {
  display: flex;
  flex-direction: column;
}
table {
  width: 100%;
  border-spacing: 0px;
  border-collapse: collapse;
}

.table-container {
  overflow-x: auto;
}

td,
th {
  padding-right: 2rem;
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
  font-size: 1.2rem;
  text-transform: capitalize;
}
.table-header {
  border-bottom: 1px solid black;
  height: 3rem;
}
.first-child {
  padding-left: 1rem;
}
</style>
