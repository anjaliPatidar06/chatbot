<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|alpha|max:15'"
      data-vv-validate-on="blur"
      label-placeholder="Name"
      name="name"
      placeholder="Name"
      v-model="name"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("name") }}</span>

    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="email"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>

    <vs-input
      v-validate="'required|digits:10'"
      data-vv-validate-on="blur"
      name="phone"
      type="digit"
      label-placeholder="Phone"
      placeholder="Phone"
      v-model="phone"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("phone") }}</span>

    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full">
        <vs-input
          v-validate="'required|max:35'"
          data-vv-validate-on="blur"
          name="company_name"
          placeholder="Company Name"
          v-model="companyname"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{
          errors.first("company_name")
        }}</span>
      </div>
      <div class="vx-col sm:w-1/2 w-full">
        <v-select
          icon-no-border
          icon="icon icon-flag"
          icon-pack="feather"
          class="w-full mt-6"
          label="name"
          name="country"
          :options="country"
          placeholder="Select Country"
          v-validate="'required'"
          style="
            color: rgba(0, 0, 0, 0.4) !important;
            font-size: 12px;
            font-family: Montserrat, Helvetica, Arial, sans-serif;
          "
          v-model="selectedCountry"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
        />
        <span class="text-danger text-sm">{{ errors.first("country") }}</span>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full">
        <vx-input-group>
          <vs-input
            ref="password"
            data-vv-validate-on="blur"
            v-validate="'required|min:6|max:10'"
            name="password"
            placeholder="Password"
            v-model="password"
            class="w-full mt-6"
            v-bind:type="[showPassword ? 'text' : 'password']"
          />
          <template slot="append" class="mt-20">
            <div class="append-text bg-primary">
              <span
                class="input-group-text"
                @click="showPassword = !showPassword"
              >
                <i
                  class="fa"
                  :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
                  aria-hidden="true"
                ></i>
              </span>
            </div>
          </template>
        </vx-input-group>
        <span class="text-danger text-sm">{{ errors.first("password") }}</span>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <vx-input-group>
          <vs-input
            v-bind:type="[showConfirmPassword ? 'text' : 'password']"
            v-validate="'required|min:6|max:10|confirmed:password'"
            data-vv-validate-on="blur"
            data-vv-as="password"
            name="confirm_password"
            label-placeholder="Confirm Password"
            placeholder="Confirm Password"
            v-model="confirm_password"
            class="w-full mt-6"
          />
          <template slot="append" class="mt-20">
            <div class="append-text bg-primary">
              <span
                class="input-group-text"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i
                  class="fa"
                  :class="[showConfirmPassword ? 'fa-eye' : 'fa-eye-slash']"
                  aria-hidden="true"
                ></i>
              </span>
            </div>
          </template>
        </vx-input-group>
        <span class="text-danger text-sm">{{
          errors.first("confirm_password")
        }}</span>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <vs-checkbox
          type="checkbox"
          v-model="isTermsConditionAccepted"
          name="terms"
          data-vv-validate-on="blur"
          class="mt-6"
          v-validate.terms="'required: true '"
          >I accept the terms & conditions.</vs-checkbox
        >
        <span class="text-danger text-sm" v-show="!isTermsConditionAccepted">
          You didnt agree on terms and conditions.
        </span>
      </div>
    </div>
    <vs-button type="border" to="/login" class="mt-6">Login</vs-button>
    <vs-button
      class="float-right mt-6"
      @click="registerUserJWt"
      v-on:keyup.enter="registerUserJWt"
      >Register</vs-button
    >
  </div>
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../../api.config";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    name: {
      required: "Please enter your name",
      alpha: "Your name may only contain alphabetic characters",
    },
    email: {
      required: "Please enter email",
    },
    company_name: {
      required: "Please enter company name",
    },
    country: {
      required: "Please select country",
    },
    password: {
      required: "Please enter password",
    },
    confirm_password: {
      required: "Please enter confirm password",
    },
    phone: {
      required: " Please enter phone number.",
      digits: "Phone number must be numeric and have 10 digits",
      // regex:'Phone number must be valid'
    },
    terms: {
      required: "You didnt agree on terms and condition",
    },
  },
};
Validator.localize("en", dict);

export default {
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      msg: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      companyname: "",
      confirm_password: "",
      isTermsConditionAccepted: true,
      selectedCountry: "",
      country: [
        {
          name: "Afghanistan",
          code: "AF",
        },
        {
          name: "Åland Islands",
          code: "AX",
        },
        {
          name: "Albania",
          code: "AL",
        },
        {
          name: "Algeria",
          code: "DZ",
        },
        {
          name: "American Samoa",
          code: "AS",
        },
        {
          name: "Andorra",
          code: "AD",
        },
        {
          name: "Angola",
          code: "AO",
        },
        {
          name: "Anguilla",
          code: "AI",
        },
        {
          name: "Antarctica",
          code: "AQ",
        },
        {
          name: "Antigua and Barbuda",
          code: "AG",
        },
        {
          name: "Argentina",
          code: "AR",
        },
        {
          name: "Armenia",
          code: "AM",
        },
        {
          name: "Aruba",
          code: "AW",
        },
        {
          name: "Australia",
          code: "AU",
        },
        {
          name: "Austria",
          code: "AT",
        },
        {
          name: "Azerbaijan",
          code: "AZ",
        },
        {
          name: "Bahamas",
          code: "BS",
        },
        {
          name: "Bahrain",
          code: "BH",
        },
        {
          name: "Bangladesh",
          code: "BD",
        },
        {
          name: "Barbados",
          code: "BB",
        },
        {
          name: "Belarus",
          code: "BY",
        },
        {
          name: "Belgium",
          code: "BE",
        },
        {
          name: "Belize",
          code: "BZ",
        },
        {
          name: "Benin",
          code: "BJ",
        },
        {
          name: "Bermuda",
          code: "BM",
        },
        {
          name: "Bhutan",
          code: "BT",
        },
        {
          name: "Bolivia, Plurinational State of",
          code: "BO",
        },
        {
          name: "Bonaire, Sint Eustatius and Saba",
          code: "BQ",
        },
        {
          name: "Bosnia and Herzegovina",
          code: "BA",
        },
        {
          name: "Botswana",
          code: "BW",
        },
        {
          name: "Bouvet Island",
          code: "BV",
        },
        {
          name: "Brazil",
          code: "BR",
        },
        {
          name: "British Indian Ocean Territory",
          code: "IO",
        },
        {
          name: "Brunei Darussalam",
          code: "BN",
        },
        {
          name: "Bulgaria",
          code: "BG",
        },
        {
          name: "Burkina Faso",
          code: "BF",
        },
        {
          name: "Burundi",
          code: "BI",
        },
        {
          name: "Cambodia",
          code: "KH",
        },
        {
          name: "Cameroon",
          code: "CM",
        },
        {
          name: "Canada",
          code: "CA",
        },
        {
          name: "Cape Verde",
          code: "CV",
        },
        {
          name: "Cayman Islands",
          code: "KY",
        },
        {
          name: "Central African Republic",
          code: "CF",
        },
        {
          name: "Chad",
          code: "TD",
        },
        {
          name: "Chile",
          code: "CL",
        },
        {
          name: "China",
          code: "CN",
        },
        {
          name: "Christmas Island",
          code: "CX",
        },
        {
          name: "Cocos (Keeling) Islands",
          code: "CC",
        },
        {
          name: "Colombia",
          code: "CO",
        },
        {
          name: "Comoros",
          code: "KM",
        },
        {
          name: "Congo",
          code: "CG",
        },
        {
          name: "Congo, the Democratic Republic of the",
          code: "CD",
        },
        {
          name: "Cook Islands",
          code: "CK",
        },
        {
          name: "Costa Rica",
          code: "CR",
        },
        {
          name: "India",
          code: "IN",
        },
        {
          name: "Dubai",
          code: "Du",
        },
        {
          name: "Côte d'Ivoire",
          code: "CI",
        },
        {
          name: "Croatia",
          code: "HR",
        },
        {
          name: "Cuba",
          code: "CU",
        },
        {
          name: "Curaçao",
          code: "CW",
        },
        {
          name: "Cyprus",
          code: "CY",
        },
        {
          name: "Czech Republic",
          code: "CZ",
        },
        {
          name: "Denmark",
          code: "DK",
        },
        {
          name: "Djibouti",
          code: "DJ",
        },
        {
          name: "Dominica",
          code: "DM",
        },
        {
          name: "Dominican Republic",
          code: "DO",
        },
        {
          name: "Ecuador",
          code: "EC",
        },
        {
          name: "Egypt",
          code: "EG",
        },
        {
          name: "El Salvador",
          code: "SV",
        },
        {
          name: "Equatorial Guinea",
          code: "GQ",
        },
        {
          name: "Eritrea",
          code: "ER",
        },
        {
          name: "Estonia",
          code: "EE",
        },
        {
          name: "Ethiopia",
          code: "ET",
        },
      ],
    };
  },
  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.name !== "" &&
        this.email !== "" &&
        this.password !== "" &&
        this.confirm_password !== "" &&
        this.isTermsConditionAccepted === true &&
        this.companyname !== "" &&
        this.selectedCountry !== "" &&
        this.phone !== ""
      );
    },
  },
  methods: {
    registerUserJWt() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$vs.loading({
            text: "Please wait while we're setting up the account for you.",
          });
          axios
            .post(Base_URL.Actual_URL + "register", {
              email: this.email,
              password: this.password,
              phone: this.phone,
              companyname: this.companyname,
              name: this.name,
              selectedCountry: this.selectedCountry.name,
              confirm_password: this.confirm_password,
              checkbox_remember_me: this.checkbox_remember_me,
            })
            .then((response) => {
              this.msg = response.data.msg;
              setTimeout(() => {
                this.$vs.loading.close();
              }, 2000);
              if (response.data.code == 200) {
                this.msg = response.data.msg;
                this.$vs.notify({
                  color: "success",
                  title: "Registration Successful.",
                  text: "You have registered successfully",
                  position: "top-center",
                });
                this.$router.push({ name: "page-login" });
              } else {
                this.$vs.notify({
                  color: "danger",
                  title: "Registration Failed.",
                  text: response.data.msg,
                  position: "top-center",
                });
              }
            });
        } else {
          console.log(this.$validator);
        }
      });
    },
    // If form is not validated or user is already login return
  },
};
</script>
