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

      <vs-button @click="loginJWT" class="float-right" type="filled" color="primary"
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
      email: "Please enter a valid email.",
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
              var userData = response.data.user_list[0];
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
                console.log(
                  response.data.User_Role,
                  userData.payment_status,
                  "response.data.User_Role"
                );
                if (
                  response.data.User_Role == "Live Agent" ||
                  response.data.User_Role == "Chatbot Manager"
                ) {
                  localStorage.setItem("chatbot_id", userData.chatbot_id);
                }
                // if (
                //   response.data.User_Role == "Admin" &&
                //   userData.payment_status == "Due"
                // ) {
                //   this.getSubscriptionDetails(userData.subscription_id);
                // }
                localStorage.setItem("company_id", userData.company_id);
                localStorage.setItem("user_role", response.data.User_Role);
                localStorage.setItem("email", userData.email);
                localStorage.setItem("id", userData.id);
                localStorage.setItem("logged_in_user_name", userData.firstname);
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
            })
            .catch((err) => {
              setTimeout(() => {
                this.$vs.loading.close("#div-with-loading > .con-vs-loading");
              }, 1000);
              this.$vs.notify({
                text: "Please try again.",
                title: "Failed to process your request.",
                color: "danger",
                position: "top-center",
              });
            });
        }
      });
      //  window.location.href = '/'
    },
    payment(cost, currencyValue) {
      console.log(cost, currencyValue, "currencyValue");
      let merchantKey =
        "test_$2y$10$kQLHx5X2j2.LkNPuBcKlUeT4C4mJsOLZZTh092r5RjFEa8NaLaupy";
      const body = {
        redirect_url: "http://188.227.58.42:83/payment-status",
        transaction_amount: cost,
        currency: "AED",
        customer_name: localStorage.logged_in_user_name,
        customer_email: localStorage.email,
        // site_return_url: "http://188.227.58.42:83/AddUser",
        site_return_url: "https://techsolvo.com/",
      };
      axios
        .post("https://foloosi.com/api/v1/api/initialize-setup", body, {
          headers: {
            merchant_key: merchantKey,
          },
        })
        .then((res) => {
          console.log(res.data.data, "res");

          var options = {
            reference_token: res.data.data.reference_token, //which is get from step2
            merchant_key: merchantKey,
            redirect: true,
          };
          var fp1 = new Foloosipay(options);
          fp1.open();
          foloosiHandler(res, function (e) {
            console.log(e, "e foloosi handler");
            if (e.data.status == "success") {
              //responde success code
              console.log(e.data.status, "hey if");
              //console.log(e.data.data.transaction_no);
            }
            if (e.data.status == "error") {
              //responde success code
              console.log(e.data.status, "hey error");
              //console.log(e.data.data.payment_status);
            }
            if (e.data.status == "closed") {
              //Payment Popup Closed
              console.log(e.data);
            }
          });
          fp1.close();
          console.log(res, "after fp1");
        });
    },
    getSubscriptionDetails(subscription_id) {
      axios
        .get(Base_URL.Actual_URL + "subscriptions_get/" + subscription_id)
        .then((response) => {
          console.log(response, "sub data");
          var sub_data = response.data.data[0];
          this.payment(sub_data.price, sub_data.currency);
        });
    },
  },
};
</script>
