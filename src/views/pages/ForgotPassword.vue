<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row" id="div-with-loading">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/forgot-password.png"
                alt="login"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg"
            >
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Recover your password</h4>
                  <p>
                    Please enter your email address and we'll send you instructions on how
                    to reset your password.
                  </p>
                </div>

                <vs-input
                  type="email"
                  label-placeholder="Email"
                  v-model="email"
                  class="w-full mb-8"
                />
                <vs-button type="border" to="/login" class="px-4 w-full md:w-auto"
                  >Back To Login</vs-button
                >
                <vs-button
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                  @click="submit"
                  >Recover Password</vs-button
                >
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
import { Base_URL } from "../../../api.config";

export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$vs.loading({
            container: "#div-with-loading",
            scale: 0.6,
          });
          var newemail = localStorage.email;
          axios
            .post(Base_URL.Actual_URL + "forget_password", {
              email_id: this.email,
            })
            .then((response) => {
              setTimeout(() => {
                this.$vs.loading.close("#div-with-loading > .con-vs-loading");
              }, 500);
              if (response.data.code == 200) {
                this.email = "";
                this.$vs.notify({
                  color: "success",
                  // title: "Mail sent.",
                  title: response.data.result,
                  position: "top-center",
                });
              }
              if (response.data.code == 100) {
                setTimeout(() => {
                  this.$vs.loading.close("#div-with-loading > .con-vs-loading");
                }, 500);
                this.$vs.notify({
                  color: "warning",
                  title: response.data.result,
                  position: "top-center",
                });
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
    },
  },
};
</script>
