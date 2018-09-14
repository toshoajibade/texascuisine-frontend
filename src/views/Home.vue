<template>
    <div>
        <Header></Header>
        <section class="body">
            <div class="side-container">
            </div>
            <div class="login-form-container">
            
                <div class="login-form-inner-container">
                <form autocomplete="off" class="form-container">
                    <p class="admin-text">Admin Login</p>
                    <div class="login-error-container">
                    <p class="login-error">{{loginError}}</p>
                    </div>
                    <v-text-field v-model="state.email" class="email-input" label="Email address" name="email" :error-messages="state.errors.email" type="email" />
                    <v-text-field label="Password" v-model="state.password" class="password-input" name="password" autocomplete="new-password" type="password" :error-messages="state.errors.password" />
                    <v-btn type="submit" class="btn-primary" @click.prevent="login">Submit</v-btn>
                </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Header from "@/components/common/Header";
import Api from "@/views/services/Api";
import validations from "@/views/services/validations";

export default {
  name: "Home",
  components: {
    Header
  },
  beforeCreate() {
    if(this.$store.state.isUserLoggedIn === true) {
     
      this.$router.push("admin/dashboard")
    }
  },
  data() {
    return {
      state: {
        email: "",
        password: "",
        errors: {}
      },
      loginError: ``
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
          this.isLoading = false
          return;
        }
        let email = this.state.email;
        let password = this.state.password;
        let res = await Api.instance().post(`user/login`, { email, password });
        this.$store.dispatch("setUser", res.data.user);
        this.$store.dispatch("setToken", res.data.token);
        this.$router.push(`/admin/dashboard`);
      } catch (err) {
        this.loginError = err.response.data.error;
      }
    }
  },
  watch: {
    errors() {}
  }
};
</script>


<style scoped>
* {
  margin: 0px;
  padding: 0px;
}


.body {
  width: 100%;
  height: calc(100vh - 64px);
  margin-top: 64px;
  display: flex;
  flex-direction: row;
}
.side-container {
  width: 50%;
  height: 100%;
  background-color: #f8e2e2;
}

.login-form-container {
  width: 50%;
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.login-form-inner-container {
  width: 400px;
  height: 350px;
  padding: 4rem 0 4rem 0;
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
  padding: 0rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between
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
  height: 1rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}
.login-error {
  color: red;
}

.v-btn {
  background-color: #00472e !important;
  color: white !important;
  margin: 2rem 0 0 0;
}
@media(max-width: 960px) {
  .side-container {
    display: none
  }
  .login-form-container {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

}
@media(max-width: 600px) { 
  .login-form-container {
    align-items: flex-start;
    padding-top: 2rem;
  }
  .login-error-container{
    height: 3rem;
  }
}
</style>
