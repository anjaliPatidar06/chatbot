<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base" :data="rowdata">
      <form v-on:submit.prevent="Update">
        <vx-card title="Edit User">
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input
                v-validate="'required|alpha|min:3|max:25'"
                data-vv-validate-on="blur"
                class="w-full"
                label="First Name"
                name="first_name"
                v-model="rowdata[0].Firstname"
              />
              <span class="text-danger text-sm">{{
                errors.first("first_name")
              }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input
                class="w-full"
                v-validate="'required|alpha|min:3|max:25'"
                data-vv-validate-on="blur"
                label="Last Name"
                name="last_name"
                v-model="rowdata[0].Lastname"
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
                label="Phone Number"
                type="digit"
                name="phone"
                v-model="rowdata[0].PhoneNumber"
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
                v-model="rowdata[0].Email"
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
                  v-bind:type="[showPassword ? 'text' : 'password']"
                  data-vv-validate-on="blur"
                  v-validate="'required|min:6|max:10'"
                  label="Password"
                  name="password"
                  v-model="rowdata[0].Password"
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
              <span class="text-danger text-sm">{{
                errors.first("password")
              }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-6">
              <vx-input-group>
                <vs-input
                  class="w-full"
                  v-bind:type="[showConfirmPassword ? 'text' : 'password']"
                  v-validate="'required|min:6|max:10|confirmed:password'"
                  data-vv-validate-on="blur"
                  data-vv-as="password"
                  label="Confirm Password"
                  name="confirm_password"
                  v-model="rowdata[0].confirm_password" />
                  <template
                  slot="append"
                  class="mt-20"
                >
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
                  </div> </template
              ></vx-input-group>
              <span class="text-danger text-sm">{{
                errors.first("confirm_password")
              }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
              <small class="date-label">Role </small>
              <v-select
                class="w-full"
                label="rolename"
                :options="rolenew"
                v-model="rowdata[0].role"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                name="role"
                v-validate="'required'"
              />     <span class="text-danger text-sm">{{
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
                v-model="rowdata[0].chatbotname"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <span class="text-danger text-sm">{{
                errors.first("chatbot_name")
              }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-button class="mr-3 mb-2" @click="Update">Update</vs-button>
              <!-- <vs-button  v-on:click="resetForm" color="warning" type="border" class="mb-2">Reset</vs-button> -->
            </div>
          </div>
        </vx-card>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";

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
Validator.localize("en", dict);

export default {
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      rowdata: {
        Firstname: "",
        Lastname: "",
        Email: "",
        PhoneNumber: "",
        Password: "",
        role: "",
      },
      // name1 : localStorage.getItem('email'),
      firstname: "",
      lastname: "",
      Password: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      newsentence:[],
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
      rolenew: [
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
  created() {},

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
      axios
        .post(Base_URL.Actual_URL + "addchatbotname", {
          company_id : localStorage.company_id ,
        })
        .then((response) => {
          this.newsentence = response.data.sentence;
      });
    const url = Base_URL.Actual_URL + "editusername/";
    const id = this.$route.params.id;

    const url1 = url + id;

    axios.get(url1).then((response1) => {
      this.rowdata = response1.data.userlist;
      this.rowdata[0]["confirm_password"] = this.rowdata[0].Password;
    });
  },
  methods: {
    Update() {
        this.$validator.validateAll().then((result) => {
        if (result) {
      const url = Base_URL.Actual_URL + "editusername/";
      const id = this.$route.params.id;
      const url1 = url + id;
      axios
        .post(url1, {
          email: this.rowdata[0].Email,
          password: this.rowdata[0].Password,
          phone: this.rowdata[0].PhoneNumber,
          Lastname: this.rowdata[0].Lastname,
          Firstname: this.rowdata[0].Firstname,
          role: this.rowdata[0].role.rolename || this.rowdata[0].role,
          chatbotname: this.rowdata[0].chatbotname.chatbotname || this.rowdata[0].chatbotname
        })
        .then((response) => {
          this.msg = response.data.msg;
          if (response.data.code == 200) {
                  this.$vs.notify({
                  title: "Edit Status",
                  text: "Details Updated Successfully.",
                  color: "success",
                  position: "top-center",
                });
            this.msg = response.data.msg;
            this.$router.go(-1);
          }
        });
        }
        })
    },
  },
};
</script>
