<template>
  <div class="vx-row">
    <!-- <vs-button type="filled" color="primary" class="ml-12 mt-2 mb-2" to="/form"
      >Form Data</vs-button
    >
    <vs-button
      type="filled"
      color="primary"
      class="ml-12 mt-2 mb-2"
      to="/Domain"
      >Slot Data</vs-button
    > -->
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Action Name">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              class="w-full"
              label="Action Name"
              v-model="actionname"
              v-validate="'required'"
              name="action_name"
            />
            <span class="text-danger text-sm">
              {{ errors.first("action_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label">Response Name </small>
            <v-select
              class="w-full"
              label="responsename"
              :options="responsedata"
              v-model="responsename"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="response_name"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("response_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mt-5">
            <vs-button class="mr-3" @click="Actions">Submit</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Action Table" search>
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 40%">Action Name</vs-th>
            <vs-th style="width: 40%">Response Name</vs-th>

            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.actionname">
                {{ tr.actionname }}
              </vs-td>
              <vs-td :data="tr.responsename">
                {{ tr.responsename }}
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
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import axios from "axios";
import { Base_URL } from "./../../api.config";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    response_name: {
      required: "Please select response name",
    },
    action_name: {
      required: "Please enter action name",
    },
  },
};
Validator.localize("en", dict);

export default {
  name: "action-component",
  data() {
    return {
      actionname: "",
      rowdata: [],
      responsedata: [],
      responsename: "",
      chatbotname: "",
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.actionname !== "";
    },
  },
  components: {
    "v-select": vSelect,
  },

  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.getActionData();
  },

  methods: {
    getActionData() {
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "actiontable", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.responsedata = response.data.response1;
        });
    },
    deleteTableRow: function (idx) {
      var newemail = localStorage.getItem("email");

      axios
        .post(Base_URL.Actual_URL + "actiondelete", {
          delete: 1,
          idx: idx,
          company_id: localStorage.company_id,
        })
        .then((response) => {
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.getActionData();

          this.counter--;
          this.rowdata.splice(idx, 1);
        });
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editaction", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;
          this.id = this.email[0].id;
          this.$router.push({
            name: "editactionname",
            params: { id: this.id },
          });
        });
    },

    Actions() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.getItem("email");
          var responseName = this.responsename.responsename
            ? this.responsename.responsename
            : null;
          var chatbot_id = localStorage.getItem("chatbot_id");

          axios
            .post(Base_URL.Actual_URL + "domainaction", {
              actionname: this.actionname,
              company_id: localStorage.company_id,
              chatbot_id: chatbot_id,
              responsename: responseName,
            })
            .then((response) => {
              if (response.data.code == 200) {
                this.$emit("updateActionComponent");
                this.$vs.notify({
                  color: "success",
                  title: "Action Record",
                  text: "The Action data  is successfully Added",
                  position: "top-center",
                });
                this.responsename = "";
                this.actionname = "";
                this.getActionData();
              }
            });
        }
      });
    },
  },
};
</script>
