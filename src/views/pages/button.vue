

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Button">
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
              data-vv-validate-on="blur"
              class="w-full"
              v-model="title"
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
              v-model="assignintent"
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
              v-model="assignentity"
              v-validate="{ required: assignentityvalue !== '' }"
              @input="button"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
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
              v-validate="{ required: assignentity !== '' }"
              :options="entitycard"
              v-model="assignentityvalue"
              name="entity_value"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
            <span class="text-danger text-sm">{{
              errors.first("entity_value")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <vs-button class="mr-3 mt-4" @click="addEvent1">Submit</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Button Table" search>
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
  name: "button1",
  data() {
    return {
      responsename: "",
      rowdata: [],
      responsedata: [],
      newsentence: [],
      entitycard: [],
      buttonnew: [],
      assignintent: "",
      Title: "",
      title: "",
      assignentityvalue: "",
      assignentity: "",
      message: "",
      chatbotname: "",
      selectedEnityKey: "",
      selectedEnityValue: "",
    };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    // validateForm() {
    //   return (
    //     !this.errors.any() &&
    //     this.title !== "" &&
    //     this.assignintent !== "" &&
    //     this.responsename !== ""
    //   );
    // },
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // onEntitySelect(e) {
    //   console.log(e,'event enetity select')
    // },
    // onEntityValueSelect(e) {
    //   console.log(e,'on entity value selct+++++++++++++')
    // },
    getTableData() {
      this.chatbotname = localStorage.getItem("chatbotname");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "entityintentnew", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          console.log(response);
          this.rowdata = response.data.userlist;
          this.newsentence = response.data.sentence;
          this.responsedata = response.data.response1;
          this.buttonnew = response.data.button;
        });
    },

    updateRecord: function (index) {
      console.log(index);
      this.$router.push({
        name: "editbuttonname",
        params: { id: index },
      });
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "deletebutton", {
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
          this.getTableData();
          this.counter--;
          this.rowdata.splice(idx, 1);
        });
      this.counter--;
      this.rowdata.splice(idx, 1);
    },
    button: function (e) {
      console.log(e, "e butotn");

      if (e !== null) {
        console.log("isndie if", typeof e);
        this.assignentity = e.Entitykey;
        var chatbot_id = localStorage.getItem("chatbot_id");
        axios
          .post(Base_URL.Actual_URL + "entityvalue", {
            company_id: localStorage.company_id,
            chatbot_id: chatbot_id,
            entity_key: e.Entitykey,
          })
          .then((response) => {
            console.log(response.data, "datatta");
            this.entitycard = response.data.entity;
          });
      } else {
        console.log("hello lese", e);
        this.assignentity = "";
        this.entitycard = "";
        this.assignentityvalue = "";
      }
    },
    addEvent1() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var chatbot_id = localStorage.getItem("chatbot_id");
          axios
            .post(Base_URL.Actual_URL + "button", {
              chatbot_id: chatbot_id,
              company_id: localStorage.company_id,
              title: this.title,
              intent: this.assignintent.intent,
              entity_key: this.assignentity.Entitykey || this.assignentity,
              entity_value:
                this.assignentityvalue.Entityvalue || this.assignentityvalue,
              addresponse: this.responsename.responsename,
            })
            .then((response) => {
              if (response.data.code == 100) {
                this.$emit("updateButtonComponent");
                this.getTableData();
                // this.message = response.data.message;
                this.$vs.notify({
                  color: "success",
                  title: "Data Saved",
                  text: "Data saved successfully.",
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






