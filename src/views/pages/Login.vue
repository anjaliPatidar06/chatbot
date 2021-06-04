<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                src="@/assets/images/pages/login.png"
                alt="login"
                class="mx-auto"
              />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p>Please login to your account.</p>
                </div>

                <div>
                  <form
                    v-on:submit.prevent="login"
                    v-on:keydown.enter.prevent="login"
                    novalidate="true"
                  >
                    <p v-if="errors.length">
                      <!-- <ul>
                         <li v-for="error in errors" :key="error" style="color:red">{{ error }}</li>
                      </ul> -->
                    </p>
                    <h6>Email*</h6>
                    <vs-input
                      name="email"
                      icon-no-border
                      icon="icon icon-mail"
                      icon-pack="feather"
                      placeholder="Email"
                      v-model="email"
                      class="w-full"
                      required
                    />
                    <br />

                    <h6>Password*</h6>
                    <vs-input
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      placeholder="Password"
                      v-model="password"
                      class="w-full"
                      required
                    />
                    <li v-if="errors.length" style="color: red">
                      {{ errors[0] }}
                    </li>

                    <div class="flex flex-wrap justify-between my-5">
                      <vs-checkbox
                        v-model="checkbox_remember_me"
                        value="true"
                        class="mb-3"
                        >Remember Me</vs-checkbox
                      >
                      <router-link to="/forgot-password"
                        >Forgot Password?</router-link
                      >
                    </div>
                    <vs-button to="/register" type="border">Register</vs-button>
                    <vs-button v-on:click="login" class="float-right"
                      >Login</vs-button
                    >
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {Base_URL, API_List} from '../../../api.config';

export default {
  data() {
    return {
      errors: [],
      email: "",
      password: "",
      checkbox_remember_me: "true",
      // checkbox_remember_me:[],
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.email !== "" &&
        this.password !== "" &&
        checkbox_remember_me === true
      );
    },
  },
  methods: {
    login() {
      console.log(this.email);
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email Required.");
        return;
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
        return;
      }

      if (!this.password) {
        this.errors.push("Password Required.");
        return;
      }

      if (!this.checkbox_remember_me) {
        this.errors.push("Select checkbox button ");
      }

      console.log(this.password);
      console.log(this.checkbox_remember_me);
      axios
        .post(Base_URL.Actual_URL+"login", {
          //  axios.post(Base_URL.Actual_URL+'login', {

          email: this.email,
          password: this.password,
          checkbox_remember_me: this.checkbox_remember_me,
        })
        .then((response) => {
          console.log(response);
          this.email = response.data.msg;
          console.log(this.email);
          this.checkbox_remember_me = response.data.checkbox_remember_me;

          localStorage.setItem("email", this.email);
      
        });
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>