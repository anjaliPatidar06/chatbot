

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Action">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Action Name"
              v-model="rowdata[0].actionname"
              v-validate="'required'"
              name="action_name"
            />
            <span class="text-danger text-sm">
              {{ errors.first("action_name") }}</span
            >
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <small class="date-label"> Response Name </small>
            <v-select
              class="w-full"
              label="responsename"
              :options="slotdata"
              v-model="rowdata[0].responsename"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              name="response_name"
            >
            </v-select>
            <!-- <span class="text-danger text-sm">
              {{ errors.first("response_name") }}</span
            > -->
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button
              v-on:keyup.enter="Update"
              @click="Update"
              class="mr-3 mb-2"
              >Update</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import vSelect from "vue-select";
import axios from "axios";
import { Base_URL } from "../../../api.config";
import { EventBus } from "./../../event-bus";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    // response_name: {
    //   required: "Please select response name",
    // },
    action_name: {
      required: "Please select action name",
    },
  },
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      rowdata: {
        actionname: "",
        responsename: "",
      },
      name: "",
      slotdata: [],
      company: "",
      selectcategory: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      selectedCountry: "",
      selectedCountry1: "",
    };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.rowdata[0].actionname.length > 0;
    },
  },
  mounted() {
    var chatbot_id = localStorage.getItem("chatbot_id");

    axios
      .post(Base_URL.Actual_URL + "actionresponse", {
        company_id: localStorage.company_id,
        chatbot_id: chatbot_id,
      })
      .then((response) => {
        this.slotdata = response.data.userlist;
        //this.slotdata=response.data.slot
      });
    const url = Base_URL.Actual_URL + "editactionname/";

    const id = this.$route.params.id;
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      this.rowdata = response.data.userlist;
    });
  },
  methods: {
    Update() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var response
          const url = Base_URL.Actual_URL + "editactionname/";
          const id = this.$route.params.id;
          const url1 = url + id;
          console.log(typeof this.rowdata,'this.rowdata[0].actionname')
          if (this.rowdata[0].responsename !== null && this.rowdata[0].responsename !== undefined) {
            if (this.rowdata[0].responsename.responsename !== null && this.rowdata[0].responsename.responsename !== undefined) {
                response = this.rowdata[0].responsename.responsename
            } else {
              response = this.rowdata[0].responsename
            }
          } else {
            response = ''
          }
          axios
            .post(url1, {
              actionname: this.rowdata[0].actionname,
              responsename: response,
            })
            .then((response) => {
              this.msg = response.data.msg;

              if (response.data.code == 200) {
                  this.msg = response.data.msg;
                  this.$vs.notify({
                    title: "Edited action data. ",
                    text: "Your action data is updated",
                    color: "success",
                    position: "top-center",
                  });
                // EventBus.$emit("selectedComponent", "actionEvent");
                this.$router.go(-1);
              }
            });
        }
      });
    },
    resetForm() {
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.data.form).forEach(function (key, index) {
        self.data.form[key] = "";
      });
    },
  },
};
</script>

