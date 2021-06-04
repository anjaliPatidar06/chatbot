

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Regex">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Regex Name</h6>
            <vs-input
              class="w-full"
              label=""
              v-model="addregex"
              name="regex_name"
              v-validate="'required'"
              data-vv-validate-on="blur"
            />
            <span class="text-danger text-sm">{{
              errors.first("regex_name")
            }}</span>
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Regex Pattern</h6>
            <vs-input
              class="w-full"
              label=""
              v-model="regexpattern"
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="regex_pattern"
            />
            <span class="text-danger text-sm">{{
              errors.first("regex_pattern")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <vs-button class="mr-3 mt-4" @click="regex">Submit</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Regex Table" search>
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 40%">Regex Name</vs-th>
            <vs-th style="width: 40%">Regex Pattern</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.regexname">
                {{ tr.regexname }}
              </vs-td>
              <vs-td :data="tr.regexpattern">
                {{ tr.regexpattern }}
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
import { Base_URL } from "../../../api.config";
import Vue from "vue";
import vSelect from "vue-select";
import { Validator } from "vee-validate";
import { EventBus } from "../../event-bus";

const dict = {
  custom: {
    regex_name: {
      required: "Please enter regex name",
    },
    regex_pattern: {
      required: "Please enter regex pattern",
    },
  },
};
Validator.localize("en", dict);
Vue.component("v-select", vSelect);
export default {
  name: "regex-component",
  data() {
    return {
      addregex: "",
      regexpattern: "",
      rowdata: [],
      chatbotname: "",
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() && this.addregex !== "" && this.regexpattern !== ""
      );
    },
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.getRegexData();
  },
  methods: {
    getRegexData() {
      var newemail = localStorage.getItem("email");
      console.log(newemail);
      var chatbot_id = localStorage.getItem("chatbot_id");
      console.log(chatbot_id);
      axios
        .post(Base_URL.Actual_URL + "regextable", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          console.log(response);
          this.rowdata = response.data.userlist;

          console.log(this.rowdata);
        });
    },
    deleteTableRow: function (idx) {
      var newemail = localStorage.getItem("email");
      console.log(newemail);
      var chatbot_id = localStorage.getItem("chatbot_id");
      console.log(chatbot_id);
      axios
        .post(Base_URL.Actual_URL + "regexpage", {
          delete: 1,
          idx: idx,
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then(() => {
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.counter--;
          this.getRegexData();
          this.rowdata.splice(idx, 1);
        });
    },

    updateRecord: function (index) {
      this.$router.push({
        name: "editregexname",
        params: { id: index },
      });
    },
    regex() {
      console.log('regex data')
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log('heyyyyyyyyyyyy')
          var newemail = localStorage.getItem("email");
          console.log(newemail);
          var chatbot_id = localStorage.getItem("chatbot_id");
          console.log(chatbot_id);
          axios
            .post(Base_URL.Actual_URL + "regex", {
              addregex: this.addregex,
              addregexpattern: this.regexpattern,
              chatbot_id: chatbot_id,

              company_id: localStorage.company_id,
            })
            .then((response) => {
              console.log(response);
              this.result = response.data.result;
              console.log(localStorage.getItem("email"));
              if (response.data.code == 200) {
                this.result = response.data.result;
                (this.addregex = ""), (this.regexpattern = "");
                this.$vs.notify({
                  color: "success",
                  title: "Regex Record",
                  text: "The Regex was successfully Added",
                  position: "top-center",
                });
                this.getRegexData();
              }
            });
        }
      });
    },
  },
};
</script>


