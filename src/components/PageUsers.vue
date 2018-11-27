<template>
  <div>
    <form class="create-product-page">
      <p class="create-user-label" style="font-weight:bold">CREATE ADMIN</p>
      <p>Enter new admin details below</p>
      <div class="new-admin">
        <InputField v-model="newUser.firstName" label="First Name" name="firstName" :error_message="state.errors.firstName" />
        <InputField v-model="newUser.lastName" label="Last Name" name="lastName" :error_message="state.errors.lastName" />
      </div>
      <div class="new-admin">
        <InputField v-model="newUser.phoneNumber" label="Phone Number" name="phoneNumber" :error_message="state.errors.phoneNumber" />
        <InputField v-model="newUser.email" label="Email" type="email" name="email" :error_message="state.errors.email" />
      </div>
      <button type="submit" class="btn-primary create-user-button" v-on:click.prevent="addUser">CREATE</button>
    </form>
    <section v-if="state.users.length !== 0">
      <P style="font-weight:bold" class="current-admins">CURRENT ADMINS</P>
      <div class="table-container">
        <table class="table">
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
              <td>
                <i class="material-icons delete-user" v-on:click="deleteUser(user.userId)">delete</i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="alert-wrapper">
      <p v-show="state.offline" class="alert" color="rgba(0, 0, 0, 0)">Please connect to the internet</p>
    </div>
    <div class="alert-wrapper" v-if="state.postError">
      <p v-show="state.postError" class="alert" color="rgba(0, 0, 0, 0)">Error! Please try again</p>
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api";
import handleError from "@/mixins/handleError";
import validations from "@/services/validations";
import InputField from "@/components/InputField";

export default {
  name: "Products",
  components: {
    InputField
  },
  mixins: [handleError],
  data() {
    return {
      state: {
        users: [],
        count: 0,
        errors: {},
        offline: false,
        postError: false
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
    this.$Progress.start();
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
        this.state.offline = true;
        setTimeout(() => {
          this.state.offline = false;
        }, 2000);
      }
    } finally {
      this.$Progress.finish();
    }
  },

  methods: {
    async addUser() {
      this.$Progress.start();
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
        this.handleError();
      } finally {
        this.$Progress.finish();
      }
    },

    async deleteUser(value) {
      this.$Progress.start();
      try {
        const res = await Api.instance().delete(`user/delete/${value}`);
        if (res.status === 200) {
          let users = this.state.users.filter(user => user.userId !== value);
          this.state.users = users;
          this.$db.delete(value, "users");
        }
      } catch (error) {
        this.handleError();
      } finally {
        this.$Progress.finish();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin-bottom: 3rem;
}

.create-product-page {
  width: 100%;
  height: 100%;
}
.current-admins {
  margin-bottom: 1rem;
  font-size: 1.2em;
}
.create-user-label {
  margin-bottom: 1rem;
  font-size: 1.2em;
}
.new-admin {
  width: 100%;
  display: flex;
  justify-content: space-between;
  > * {
    width: 48%;
  }
}

.new-admin > *:first-child {
  margin-right: 2rem;
}

@media (max-width: 600px) {
  .new-admin {
    flex-direction: column;
    > * {
      width: 100%;
    }
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
.create-user-button {
  padding: 0rem 2rem;
  color: white;
  background-color: $secondary-color;
}
</style>
