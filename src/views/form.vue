

<template>
  <div class="vx-row">
    <!-- <vs-button
      type="filled"
      color="primary"
      class="ml-12 mt-2 mb-2"
      to="/Domain"
      >Slot Data</vs-button
    >
    <vs-button
      type="filled"
      color="primary"
      class="ml-12 mt-2 mb-2"
      to="/action"
      >Action Data</vs-button
    > -->

    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Form Name">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              class="w-full"
              label="Form Name"
              v-model="formname"
              v-validate="'required'"
              name="form_name"
            />
            <span class="text-danger text-sm">
              {{ errors.first("form_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label"> Slot Name </small>
            <v-select
              class="w-full"
              label="slotname"
              :options="slotdata"
              v-model="slotname"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="slot_name"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("slot_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              class="w-full"
              label="Slot Validation"
              v-model="slotvalidation"
              name="slot_validation"
              v-validate="{ required: slotmessage != '' }"
              data-vv-validate-on="blur"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_validation") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              class="w-full"
              label="Slot Message"
              v-model="slotmessage"
              name="slot_message"
              v-validate="{ required: slotvalidation != '' }"
              data-vv-validate-on="blur"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_message") }}</span
            >
          </div>
          <div class="flex items-center mt-5">
            <span class="mt-3 ml-4 mr-4">To Store Data</span>
            <vs-switch v-model="calendar" style="size: 30px" class="mt-3" />
          </div>
        </div>
        <div class="vx-col sm:w-1/2 w-full mt-5">
          <vs-button class="mr-3" @click="formnew">Submit</vs-button>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Form Table" search>
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 20%">Form Name</vs-th>
            <vs-th style="width: 20%">slot Name</vs-th>
            <vs-th style="width: 20%">Slot Validation</vs-th>
            <vs-th style="width: 20%">Slot Message</vs-th>
            <vs-th style="width: 20%">Store Data</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.formname">
                {{ tr.formname }}
              </vs-td>
              <vs-td :data="tr.slotlist">
                {{ tr.slotlist }}
              </vs-td>
              <vs-td :data="tr.condition">
                {{ tr.condition }}
              </vs-td>
              <vs-td :data="tr.retry_message">
                {{ tr.retry_message }}
              </vs-td>
              <vs-td :data="tr.store_data">
                {{ tr.store_data }}
              </vs-td>

              <vs-td>
                <div class="flex">
                  <vs-button
                    @click="updateRecord(tr.id)"
                    type="filled"
                    color="warning"
                    class="mr-2"
                    icon="edit"
                    aria-hidden="true"
                    >Edit</vs-button
                  >
                  <vs-button
                    @click="deleteTableRow(tr.id)"
                    type="filled"
                    color="danger"
                    icon="delete"
                    aria-hidden="true"
                    >Delete</vs-button
                  >
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { Base_URL } from "./../../api.config";
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import { Validator } from "vee-validate";

const dict = {
  custom: {
    slot_validation: {
      required: "Please enter slot validation",
    },
    slot_message: {
      required: "Please enter slot message",
    },
    slot_name: {
      required: "Please select slot name",
    },
    form_name: {
      required: "Please enter form name",
    },
  },
};
Validator.localize("en", dict);
export default {
  name: "form-component",
  data() {
    return {
      formname: "",
      rowdata: [],
      slotmessage: "",
      slotvalidation: "",
      slotdata: [],
      message: "",
      chatbotname: "",
      calendar: false,

      slotname: "",
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.formname !== "";
    },
  },
  components: {
    "v-select": vSelect,
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");

    this.getFormData();
  },

  methods: {
    getFormData() {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "formtable", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.slotdata = response.data.slot;
        });
    },
    deleteTableRow: function (idx) {
      var newemail = localStorage.getItem("email");

      axios
        .post(Base_URL.Actual_URL + "formdelete", {
          delete: 1,
          idx: idx,
          company_id: localStorage.company_id,
        })
        .then(() => {
          this.counter--;
          this.rowdata.splice(idx, 1);
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.getFormData();
        });
    },

    updateRecord: function (index) {
      // axios.post(Base_URL.Actual_URL+'editform', {
      axios
        .post(Base_URL.Actual_URL + "editform", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;

          this.id = this.email[0].id;
          this.$router.push({ name: "editformname", params: { id: this.id } });
        });
    },

    formnew() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.getItem("email");

          var chatbot_id = localStorage.getItem("chatbot_id");

          axios
            .post(Base_URL.Actual_URL + "domainform", {
              formname: this.formname,
              company_id: localStorage.company_id,
              chatbot_id: chatbot_id,
              slotmessage: this.slotmessage,
              slotvalidation: this.slotvalidation,
              multipleslot: this.slotname.slotname,
              calendar: this.calendar,
            })
            .then((response) => {
              this.message = response.data.result;
              if (response.data.code == 100) {
                this.getFormData();

                this.$emit("updateFormComponent");
                this.$vs.notify({
                  color: "success",
                  title: "Form Record",
                  text: "The form data  is successfully Added",
                  position: "top-center",
                });
              }
            });
        }
      });
    },
  },
};
</script>
