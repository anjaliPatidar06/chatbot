<template>
  <div>
    <vs-input
      v-validate="'required|email|min:3'"
      data-vv-validate-on="blur"
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      v-model="email"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>

    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Password"
      v-model="password"
      class="w-full mt-6"
      @keyup.enter="loginJWT"
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>

    <div class="flex flex-wrap justify-between mt-2 float-right">
      <router-link to="/forgot-password">Forgot Password?</router-link>
    </div>
    <div class="flex flex-wrap justify-between" style="margin-top: 40px">
      <vs-button type="border" to="/register">Register</vs-button>

      <vs-button
        @click="loginJWT"
        class="float-right"
        type="filled"
        color="primary"
        >Login</vs-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Base_URL } from "../../../../api.config";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    email: {
      required: "Please enter your email",
      email: "Please enter a valid email."
    },
    password: {
      required: "Please enter your password",
    },
  },
};
// register custom messages
Validator.localize("en", dict);
export default {
  data() {
    return {
      message: "",
      email: "",
      password: "",
      errormessage: "",
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email !== "" && this.password !== "";
    },
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });

        return false;
      }
      return true;
    },
    loginJWT() {
      // this.$vs.loading();
      (this.errormessage = ""), (this.message = "");
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios
            .post(Base_URL.Actual_URL + "login", {
              email: this.email,
              password: this.password,
              checkbox_remember_me: this.checkbox_remember_me,
            })
            .then((response) => {
              this.$vs.loading();
              this.email = response.data.msg;
              console.log(response);
              console.log(response.data, "datat from");
              
              if (response.data.code == 100) {
                this.$vs.notify({
                  color: "danger",
                  title: "Login Failed.",
                  text: "You have entered incorrect email or password",
                  position: "top-center",
                });
                setTimeout(() => {
                  this.$vs.loading.close();
                  this.errormessage = response.data.message;
                  this.$router.push({ name: "page-login" });
                }, 2000);
              } else {
                if (
                response.data.User_Role == "Live Agent" ||
                response.data.User_Role == "Chatbot Manager"
              ) {
               
                localStorage.setItem(
                  "chatbot_id",
                  response.data.user_list[0].chatbot_id
                );
              }
               localStorage.setItem(
                  "company_id",
                  response.data.user_list[0].company_id
                );
              console.log(response.data,'login data')
                  localStorage.setItem("user_role", response.data.User_Role);
                  localStorage.setItem("email", response.data.user_list[0].email);
                  localStorage.setItem("id", response.data.user_list[0].id);
                  localStorage.setItem("logged_in_user_name", response.data.user_list[0].firstname);
                  localStorage.setItem("trainingID", "");
                this.$vs.notify({
                  color: "success",
                  title: "Login Successful.",
                  text: "You have logged in successfully",
                  position: "top-center",
                });
                setTimeout(() => {
                  this.$vs.loading.close();
                  this.message = response.data.message;
                  this.$router.push({ name: "home" });
                  // window.location.href = "/";
                }, 2000);
              }
            });
        }
      });
      //  window.location.href = '/'
    },
  },
};
</script>

