<template>
  <div v-show="showPage" class="login-page">
    <TheNavbar></TheNavbar>
    <section class="body">
      <div class="side-container">
      </div>
      <div class="login-form-container">
        <div class="login-form-inner-container">
          <form
            autocomplete="off"
            class="form-container"
          >
            <p class="admin-text">Admin Login</p>
            <div class="login-error-container">
              <p class="login-error">{{loginError}}</p>
            </div>
            <InputField
              v-model="state.email"
              label="Email address"
              name="email"
              :error_message="state.errors.email"
              type="email"
            />
            <InputField
              v-model="state.password"
              label="Password"
              name="password"
              :error_message="state.errors.password"
              type="password"
              autocomplete="new-password"
            />
            <button
              type="submit"
              class="btn-primary login-button"
              @click.prevent="login"
            >Submit</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import Api from "@/services/Api";
import validations from "@/services/validations";
import InputField from "@/components/InputField";

export default {
  name: "Home",
  components: {
    TheNavbar,
    InputField
  },
  beforeMount() {
    if (this.$store.state.isUserLoggedIn === true) {
      this.$router.push("admin/dashboard");
    } else {
      this.showPage = true;
    }
  },
  data() {
    return {
      state: {
        email: "",
        password: "",
        errors: {}
      },
      loginError: ``,
      showPage: false
    };
  },
  methods: {
    async login() {
      try {
        this.state.errors = {};
        this.loginError = ``;
        const req = this.state;
        const { isValid, errors } = await validations.validateInput(req);
        if (!isValid) {
          this.state.errors = errors;
          return;
        }
        this.$Progress.start();
        let email = this.state.email;
        let password = this.state.password;
        let res = await Api.instance().post(`user/login`, { email, password });
        this.$store.dispatch("setUser", res.data.user);
        this.$store.dispatch("setToken", res.data.token);
        this.$router.push(`/admin/dashboard`);
      } catch (err) {
        this.loginError = err.response.data.error;
      } finally {
        this.$Progress.finish();
      }
    }
  },
  watch: {
    errors() {}
  }
};
</script>


<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.login-page {
  display: flex;
  flex-direction: column;
}

.body {
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
}
.side-container {
  width: 50%;
  background-color: #f8e2e2;
}

.login-form-container {
  width: 50%;
  height: calc(100vh - 64px);
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 960px) {
    align-items: flex-start;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-around;
  }
}
.login-form-inner-container {
  width: 400px;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 10px #adaaaa;
  background-color: #f7f7f7;
  border-radius: 4px;
  display: flex;
  margin: 2rem;
}
.form-container {
  width: 100%;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.admin-text {
  color: #470000;
  font-size: 20px;
}

.username-logout {
  display: flex;
  flex-direction: row;
}
.username-logout > * {
  color: white;
  padding: 0.5rem;
}
.login-error-container {
  height: 1.5rem;
  p {
    font-size: 14px;
  }
  @media (max-width: 600px) {
    height: 3rem;
  }
}
.login-error {
  color: red;
}

.login-button {
  background-color: #00472e;
  color: white;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
@media (max-width: 960px) {
  .side-container {
    display: none;
  }
}
</style>
