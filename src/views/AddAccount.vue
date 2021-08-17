

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Add Account">
        <!-- <span style="color: red">{{ message }}</span> -->
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              label="Name"
              v-validate="'required'"
              name="name"
              v-model="name"
            />
            <span class="text-danger text-sm">{{ errors.first("name") }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input
              v-validate="'required|email'"
              data-vv-validate-on="blur"
              type="email"
              class="w-full"
              label="Email"
              name="email"
              v-model="email"
            />
            <span class="text-danger text-sm">{{ errors.first("email") }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              v-validate="'required'"
              data-vv-validate-on="blur"
              label="Company"
              name="company"
              v-model="company"
            />
            <span class="text-danger text-sm">{{
              errors.first("company")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input
              class="w-full"
              v-validate="'required|digits:10|regex:^([0-9]+)$'"
              data-vv-validate-on="blur"
              name="phone"
              type="digit"
              label="Phone Number"
              v-model="phone"
            />
            <span class="text-danger text-sm">{{ errors.first("phone") }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vx-input-group>
              <vs-input
                v-bind:type="[showPassword ? 'text' : 'password']"
                label="Password"
                v-validate="'required|min:6|max:10'"
                ref="password"
                name="password"
                v-model="password"
                class="w-full"
                data-vv-validate-on="blur"
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
            <span class="text-danger text-sm" v-show="errors.has('password')">{{
              errors.first("password")
            }}</span>
          </div>

          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vx-input-group>
              <vs-input
                label="Confirm Password"
                v-validate="'required|min:6|max:10|confirmed:password'"
                data-vv-as="password"
                name="confirm_password"
                v-model="confirmpassword"
                class="w-full"
                data-vv-validate-on="blur"
                v-bind:type="[showConfirmPassword ? 'text' : 'password']"
              /><template slot="append" class="mt-20">
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
            <span
              class="text-danger text-sm"
              v-show="errors.has('confirm_password')"
              >{{ errors.first("confirm_password") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <small class="date-label">Category Name</small>

            <v-select
              label="categoryname"
              :options="category"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="selectcategory"
              v-validate="'required'"
              name="category"
            />
            <!-- <vs-input class="w-full" label="Category" name="category" v-model="category" /> -->
            <span class="text-danger text-sm">{{
              errors.first("category")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <small class="date-label">Subscription Duration</small>

            <v-select
              class="w-full"
              label="subname"
              :options="rowdata"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="selectsubscription"
              name="subscription"
              v-validate="'required'"
            />

            <span class="text-danger text-sm">{{
              errors.first("subscription")
            }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <small class="date-label">Select Country</small>

            <v-select
              class="w-full"
              label="name"
              :options="country"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="selectedCountry"
              v-validate="'required'"
              name="country"
            />

            <span class="text-danger text-sm">{{
              errors.first("country")
            }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <!-- <vs-button
              @click="addaccount"
              class="mr-3 mb-2"
              :disabled="!validateForm"
              >Submit</vs-button
            >  -->
            <vs-button @click="addaccount" class="mr-3 mb-2">Submit</vs-button>

            <!-- v-on:click="resetForm" -->
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect,
  },
};
</script>

<script>
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "./../../api.config";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    email: {
      required: "Please enter email",
      email: "Please enter valid email",
    },
    name: {
      required: "Please enter name",
      // alpha: "Your name may only contain alphabetic characters",
    },
    company: {
      required: "Please enter company name",
    },
    country: {
      required: "Please select country name",
    },
    category: {
      required: "Please select category ",
    },
    subscription: {
      required: "Please select subscription duration",
    },
    password: {
      required: "Please enter password",
    },
    confirm_password: {
      required: "Please enter confirm password",
    },
    phone: {
      required: " Please enter phone number.",
      digits: "Please enter valid phone number",
      // regex:'Phone number must be valid'
    },
  },
};

// register custom messages
Validator.localize("en", dict);
export default {
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      rowdata: "",
      name: "",
      company: "",
      selectcategory: "",
      email: "",
      phone: "",
      password: "",
      message: "",
      confirmpassword: "",
      selectedCountry: "",
      selectsubscription: "",
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
      category: [
        {
          categoryname: "Retail",
          categorycode: "1",
        },
        {
          categoryname: "Ecommerce",
          categorycode: "2",
        },
        {
          categoryname: "Healthcare",
          categorycode: "3",
        },
      ],

      duration: [
        {
          durationCode: "monthly",
          durationName: "1 Month",
        },
        {
          durationCode: "quaterly",
          durationName: "3 Months",
        },
        {
          durationCode: "halfyearly",
          durationName: "6 Months",
        },
        {
          durationCode: "yearly",
          durationName: "1 Year",
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
        this.companyname !== "" &&
        this.selectedCountry !== "" &&
        this.phone !== "" &&
        this.selectcategory !== "" &&
        this.selectsubscription !== ""
      );
    },
  },
  mounted() {
    axios.get(Base_URL.Actual_URL + "subscriptiondata", {}).then((response) => {
      this.rowdata = response.data.userlist;
    });
  },
  methods: {
    addaccount() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios
            .post(Base_URL.Actual_URL + "users/addaccount", {
              name: this.name,
              company: this.company,
              email: this.email,
              phone: this.phone,
              password: this.password,
              confirmpassword: this.confirmpassword,
              subscription: this.selectsubscription.subname,
              countryname: this.selectedCountry.name,
              categoryname: this.selectcategory.categoryname,
            })
            .then((response) => {
              this.message = response.data.message;
              if (response.data.code == 200) {
                this.$vs.notify({
                  title: "Account Added",
                  text: "Account Added successfully.",
                  color: "success",
                  position: "top-center",
                });
                this.$router.push({
                  name: "allaccount",
                });
              }
              if (response.data.code == 100) {
                this.$vs.notify({
                  text: response.data.message,
                  color: "danger",
                  position: "top-center",
                });
              }
              // this.$router.push({
              //   name: "allaccount",
              // });
            });
          // if form have no errors
        }
      });
    },
  },
};
</script>

