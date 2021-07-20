<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Collapsible">
            <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Response Name</h6>
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
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Title</h6>
            <vs-input
              class="w-full"
              label=""
              v-model="titlecollapsible"
              data-vv-validate-on="blur"
              name="title"
              v-validate="'required'"
            ></vs-input>
            <span class="text-danger text-sm">
              {{ errors.first("title") }}</span
            >
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Description</h6>
            <vs-input
              class="w-full"
              label=""
              v-model="Descriptioncollapsible"
              name="description"
              v-validate="'required'"
            ></vs-input>
            <span class="text-danger text-sm">
              {{ errors.first("description") }}</span
            >
          </div>
        </div>
        <div class="row">
          <div class="vx-col sm:w-1/3 w-full">
            <vs-button
              class="mr-3 mt-4"
              @click="addEvent4"
              >Submit</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Collapsible Table" search>
        <vs-table search max-items="10" pagination :data="buttonnew">
          <template slot="thead">
            <vs-th style="width: 40%">Response Name </vs-th>
            <vs-th style="width: 40%">Title </vs-th>
            <vs-th style="width: 40%">Description </vs-th>
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
Vue.component("v-select", vSelect);
import { Validator } from "vee-validate";

const dict = {
  custom: {
    description: {
      required: "Please enter description",
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
  name: "collapsible",
  data() {
    return {
      titlecollapsible: "",
      Descriptioncollapsible: "",
      rowdata: [],
      responsename: "",
      responsedata: [],
      message: "",
      buttonnew: "",
      chatbotname: "",
    };
  },

  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.getTableData();
  },
  components: {
    "v-select": vSelect,
  },
  methods: {
    getTableData() {
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "entityintentcollapsible", {
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
        name: "editcollapsiblename",
        params: { id: index },
      });
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "deletecollapsible", {
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
    addEvent4() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.getItem("email");
          var chatbot_id = localStorage.getItem("chatbot_id");
          axios
            .post(Base_URL.Actual_URL + "collapsiblevalue", {
              chatbot_id: chatbot_id,
              company_id: localStorage.company_id,
              titlecollapsible: this.titlecollapsible,
              Descriptioncollapsible: this.Descriptioncollapsible,
              addresponse: this.responsename.responsename,
            })
            .then((response) => {
                this.getTableData();
              if (response.data.code == 100) {
                this.$emit('updateCollapseComponent')
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


