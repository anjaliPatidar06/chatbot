<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <form v-on:submit.prevent="adduser">
        <vx-card title="Add User">
          <span style="color: red">{{ result }}</span>
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input
                v-validate="'required|min:3|max:25'"
                data-vv-validate-on="blur"
                class="w-full"
                label="First Name"
                name="first_name"
                v-model="firstname"
              />
              <span class="text-danger text-sm">{{
                errors.first("first_name")
              }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input
                class="w-full"
                v-validate="'required|min:3|max:25'"
                data-vv-validate-on="blur"
                label="Last Name"
                name="last_name"
                v-model="lastname"
              />
              <span class="text-danger text-sm">{{
                errors.first("last_name")
              }}</span>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input
                class="w-full"
                v-validate="'required|digits:10'"
                data-vv-validate-on="blur"
                name="phone"
                type="digit"
                label="Phone Number"
                v-model="phone"
              />
              <span class="text-danger text-sm">{{
                errors.first("phone")
              }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-6">
              <vs-input
                type="email"
                class="w-full"
                v-validate="'required|email'"
                data-vv-validate-on="blur"
                label="Email"
                name="email"
                v-model="email"
              />
              <span class="text-danger text-sm">{{
                errors.first("email")
              }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vx-input-group>
                <vs-input
                  class="w-full"
                  ref="password"
                  data-vv-validate-on="blur"
                  v-validate="'required|min:6|max:10'"
                  label="Password"
                  name="password"
                  v-model="password"
                  v-bind:type="[showPassword ? 'text' : 'password']"
                />
                <template slot="append">
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

              <span class="text-danger text-sm">{{
                errors.first("password")
              }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-6">
              <vx-input-group>
                <vs-input
                  class="w-full"
                  v-validate="'required|min:6|max:10|confirmed:password'"
                  data-vv-validate-on="blur"
                  data-vv-as="password"
                  label="Confirm Password"
                  name="confirm_password"
                  v-model="confirmpassword"
                  v-bind:type="[showConfirmPassword ? 'text' : 'password']"
                />
                <template slot="append">
                  <div class="append-text bg-primary">
                    <span
                      class="input-group-text"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <i
                        class="fa"
                        :class="[
                          showConfirmPassword ? 'fa-eye' : 'fa-eye-slash',
                        ]"
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
              <small class="date-label">Role </small>
              <v-select
                class="w-full"
                label="rolename"
                :options="role"
                v-model="selectedCurrency"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                v-validate="'required'"
                name="role"
              />
              <span class="text-danger text-sm">{{
                errors.first("role")
              }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <small class="date-label">Chatbot Name </small>
              <v-select
                class="w-full"
                label="chatbotname"
                v-validate="'required'"
                name="chatbot_name"
                :options="newsentence"
                v-model="chatbotnamenew"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <span class="text-danger text-sm">{{
                errors.first("chatbot_name")
              }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-button
                v-on:click="adduser"
                class="mr-3 mb-2"
                >Submit</vs-button
              >
              <!-- <vs-button  v-on:click="resetForm" color="warning" type="border" class="mb-2">Reset</vs-button> -->
            </div>
          </div>
        </vx-card>
      </form>
    </div>
  </div>
</template>


<script>
/* eslint-disable */
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL} from "./../../api.config";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    first_name: {
      required: "Please enter your first name",
      alpha: "Your first name may only contain alphabetic characters",
    },
    last_name: {
      required: "Please enter your last name",
      alpha: "Your last name may only contain alphabetic characters",
    },
    email: {
      required: "Please enter your email",
    },
    chatbot_name: {
      required: "Please select chatbot name ",
    },
    role: {
      required: "Please select role",
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
  },
};

// register custom messages
Validator.localize("en", dict);
export default {
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      newsentence: [],
      newsentence: "",
      chatbotnamenew: "",
      firstname: "",
      lastname: "",
      city: "",
      country: "",
      company: "",
      category: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      selectedCurrency: "",
      result: "",
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
      role: [
        {
          rolecode: "Live Agent",
          rolename: "Live Agent",
        },
        {
          rolecode: "Chatbot Manager",
          rolename: "Chatbot Manager",
        },
      ],
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.firstname !== "" &&
        this.lasttname !== "" &&
        this.email !== "" &&
        this.password !== "" &&
        this.confirm_password !== "" &&
        this.phone !== ""
      );
    },
  },

  components: {
    "v-select": vSelect,
  },
  mounted() {
    var newemail = localStorage.getItem("email");

    var chatbot_id = localStorage.getItem("chatbot_id");

    axios
      .post(Base_URL.Actual_URL + "addchatbotname", {
        company_id: localStorage.company_id,
      })
      .then((response) => {
        this.newsentence = response.data.sentence;
        console.log(this.newsentence,'newvbdbs')
      });
  },

  methods: {
    adduser() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.getItem("email");
          axios
            .post(Base_URL.Actual_URL + "adduser", {
              firstname: this.firstname,
              lastname: this.lastname,
              email: this.email,
              phone: this.phone,
              password: this.password,
              confirmpassword: this.confirmpassword,
              newemail: newemail,
              role: this.selectedCurrency.rolename,
              chatbotname:
                this.chatbotnamenew.chatbotname,
              // chatbotname: this.chatbotnamenew.id
            })
            .then((response) => {
              this.result = response.data.result;
              if (response.data.code == 200) {
                 this.$vs.notify({
                  title: "User Added",
                  text: "User added successfully.",
                  color: "success",
                  position: "top-center",
                });
                this.$router.push({
                  name: "alluser",
                });
              }
            });
        }
      });
    },
  },
};
</script>
