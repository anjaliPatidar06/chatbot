

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Quick Replies">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Response Name</h6>
            <v-select
              class="w-full"
              label="responsename"
              name="response_name"
              v-validate="'required'"
              :options="responsedata"
              v-model="responsename"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("response_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Title</h6>
            <vs-input
              name="title"
              v-validate="'required'"
              class="w-full"
              v-model="titlequickreplies"
              data-vv-validate-on="blur"
            ></vs-input>
            <span class="text-danger text-sm">
              {{ errors.first("title") }}</span
            >
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Intent</h6>

            <v-select
              class="w-full"
              label="intent"
              :options="rowdata"
              v-model="assignintentquickreplies"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="intent"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("intent") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Entity Key</h6>
            <v-select
              class="w-full"
              label="Entitykey"
              :options="newsentence"
              @input="quick"
              v-model="assignentityquickreplies"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="{ required: assignentityvaluequickreplies !== '' }"
              name="entity_key"
            />
            <span class="text-danger text-sm">
              {{ errors.first("entity_key") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Entity Value</h6>
            <v-select
              class="w-full"
              label="Entityvalue"
              :options="entitycard"
              v-model="assignentityvaluequickreplies"
              v-validate="{ required: assignentityquickreplies !== '' }"
              name="entity_value"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
            <span class="text-danger text-sm">{{
              errors.first("entity_value")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <vs-button class="mr-3 mt-4" @click="addEvent3">Submit</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Quick Replies Table" search>
        <vs-table search max-items="10" pagination :data="buttonnew">
          <template slot="thead">
            <vs-th style="width: 20%">Response Name</vs-th>
            <vs-th style="width: 20%">Title</vs-th>
            <vs-th style="width: 20%">Intent Name</vs-th>
            <vs-th style="width: 20%">Entity Key</vs-th>
            <vs-th style="width: 20%">Entity Value</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.responsename">
                {{ tr.responsename }}
              </vs-td>
              <vs-td :data="tr.title">
                {{ tr.title }}
              </vs-td>
              <vs-td :data="tr.intent">
                {{ tr.intent }}
              </vs-td>
              <vs-td :data="tr.entitykey">
                {{ tr.entitykey }}
              </vs-td>
              <vs-td :data="tr.entityvalue">
                {{ tr.entityvalue }}
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
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";
import Vue from "vue";
Vue.component("v-select", vSelect);
import { Validator } from "vee-validate";

const dict = {
  custom: {
    entity_value: {
      required: "Please select entity value",
    },
    entity_key: {
      required: "Please select entity key",
    },
    intent: {
      required: "Please select intent",
    },
    response_name: {
      required: "Please select response name",
    },
    title: {
      required: "Please enter title",
    },
  },
};
Validator.localize("en", dict);
export default {
  name: "quick-reply",
  data() {
    return {
      rowdata: [],
      name: "",
      responsedata: [],
      newsentence: [],
      entitycard: [],
      assignentityvaluequickreplies: "",
      assignentityquickreplies: "",
      assignintentquickreplies: "",
      titlequickreplies: "",
      message: "",
      buttonnew: [],
      responsename: "",
      chatbotname: "",
    };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    validateName() {
      return (
        !this.errors.any() &&
        this.titlequickreplies !== "" &&
        this.assignintentquickreplies !== ""
      );
    },
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.getTableData();
  },
  methods: {
    getTableData() {
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "entityintentquick", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.newsentence = response.data.sentence;
          this.responsedata = response.data.response1;
          this.buttonnew = response.data.button;
        });
    },
    updateRecord: function (index) {
      this.$router.push({
        name: "editquickname",
        params: { id: index },
      });
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "deletequick", {
          delete: 1,
          idx: idx,
        })
        .then(() => {
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.counter--;
          this.rowdata.splice(idx, 1);
          this.getTableData();
        });
    },
    quick: function (e) {
      if (e !== null) {
        this.assignentityvaluequickreplies = "";

        var newemail = localStorage.getItem("email");
        var chatbot_id = localStorage.getItem("chatbot_id");

        axios
          .post(Base_URL.Actual_URL + "entityvalue", {
            company_id: localStorage.company_id,
            chatbot_id: chatbot_id,

            entity_key: e.Entitykey,
          })
          .then((response) => {
            this.entitycard = response.data.entity;
            // this.assignentityvaluequickreplies = "";
          });
      } else {
        this.assignentityquickreplies = "";
        this.entitycard = "";
        this.assignentityvaluequickreplies = "";
      }
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editquick", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;

          this.id = this.email[0].id;
          this.$router.push({
            name: "editquickname",
            params: { id: this.id },
          });
        });
    },
    addEvent3() {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios
            .post(Base_URL.Actual_URL + "Quickreplies", {
              company_id: localStorage.company_id,
              chatbot_id: chatbot_id,
              label: this.titlequickreplies,
              intent: this.assignintentquickreplies.intent,
              entity_key:
                this.assignentityquickreplies.Entitykey ||
                this.assignentityquickreplies,
              entity_value:
                this.assignentityvaluequickreplies.Entityvalue ||
                this.assignentityvaluequickreplies,
              addresponse: this.responsename.responsename,
            })
            .then((response) => {
              if (response.data.code == 100) {
                this.message = response.data.message;
                this.$emit("updateQuickComponent");
                this.$vs.notify({
                  color: "success",
                  title: "Data Saved",
                  text: "Data saved successfully.",
                  position: "top-center",
                });
                this.getTableData();
              }
            });
        }
      });
    },
  },
};
</script>

