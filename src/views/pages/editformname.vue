

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Form">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Form Name"
              v-validate="'required|max:150'"
              name="formname"
              v-model="rowdata[0].formname"
            />
            <span class="text-danger text-sm">{{
              errors.first("formname")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <small class="date-label"> Slot Name </small>
            <v-select
              class="w-full"
              label="slotname"
              :options="slotdata"
              v-model="rowdata[0].slotlist"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="slot_name"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Slot Message"
              name="store_message"
              v-model="rowdata[0].retry_message"
            v-validate="{required: rowdata[0].condition !=''}" data-vv-validate-on="blur"

            />
            <span class="text-danger text-sm">{{
              errors.first("store_message")
            }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Slot validation"
              name="slot_validation"
                            v-validate="{required: rowdata[0].retry_message !=''}" data-vv-validate-on="blur"
              v-model="rowdata[0].condition"
            />
            <span class="text-danger text-sm">{{
              errors.first("slot_validation")
            }}</span>
          </div>
          <div class="flex items-center mt-5">
            <span class="mt-3 ml-4 mr-4">To Store Data</span>
            <vs-switch
              v-model="rowdata[0].store_data"
              style="size: 30px"
              class="mt-3"
            />
          </div>
        </div>
        <div class="vx-col w-full">
          <vs-button v-on:keyup.enter="Update" @click="Update" class="mr-3 mb-2"
            >Update</vs-button
          >
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import { Validator } from "vee-validate";

const dict = {
  custom: {
    slot_name: {
      required: "Please select slot name",
    },
    formname: {
      required: "Please enter form name",
    },
      slot_validation: {
      required: "Please enter slot validation",
    },
     slot_message: {
      required: "Please enter slot message",
    },
  },
};
Validator.localize("en", dict);
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";

export default {
  data() {
    return {
      rowdata: {
        formname: "",
        condition: "",
        retry_message: "",
        slotlist: "",
        slotname: "",
        slotdata: "",
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
  computed: {},
  mounted() {
    var newemail = localStorage.getItem("email");

    var chatbot_id = localStorage.getItem("chatbot_id");

    axios
      .post(Base_URL.Actual_URL + "formtablenew", {
        company_id: localStorage.company_id,
        chatbot_id: chatbot_id,
      })
      .then((response) => {
        this.slotdata = response.data.userlist;

      });
    const url = Base_URL.Actual_URL + "editformname/";

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
          var newemail = localStorage.getItem("email");
          var chatbot_id = localStorage.getItem("chatbot_id");

          const url = Base_URL.Actual_URL + "editformname/";
          const id = this.$route.params.id;
          const url1 = url + id;
          axios
            .post(url1, {
              formname: this.rowdata[0].formname,
              retry_message: this.rowdata[0].retry_message,
              condition: this.rowdata[0].condition,
              slotname:
                this.rowdata[0].slotlist.slotname || this.rowdata[0].slotlist,
              chatbot_id: chatbot_id,
              company_id: localStorage.company_id,
              store_data: this.rowdata[0].store_data,
            })
            .then((response) => {
              this.msg = response.data.msg;

              if (response.data.code == 200) {
                this.$emit("updateformComponent");

                this.$vs.notify({
                  color: "success",
                  title: "Form Record updated",
                  text: "The form data  is successfully updated",
                  position: "top-center",
                });
                this.msg = response.data.msg;
                this.$router.go(-1);
              }
            });
        }
      });
    },
  },
};
</script>

