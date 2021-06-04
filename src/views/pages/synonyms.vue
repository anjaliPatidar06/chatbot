
<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Synonyms">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Synonyms Name</h6>
            <vs-input class="w-full" label="" v-model="Synonymsname"  
            v-validate="'required'"
              name="synonym_name"/>
               <span class="text-danger text-sm">{{
              errors.first("synonym_name")
            }}</span>
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Synonyms Word</h6>
            <vs-input class="w-full" label="" v-model="Synonymsword" 
            v-validate="'required'"
              name="synonym_word"/>
               <span class="text-danger text-sm">{{
              errors.first("synonym_word")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <vs-button
              class="mr-3 mt-4"
              @click="synonyms"
              >Submit</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Synonyms Table" search>
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 40%">Synonyms Name</vs-th>
            <vs-th style="width: 40%">Synonyms Word</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.synonymname">
                {{ tr.synonymname }}
              </vs-td>
              <vs-td :data="tr.synonymword">
                {{ tr.synonymword }}
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
    synonym_name: {
      required: "Please enter synonym name",
    },
    synonym_word: {
      required: "Please enter synonym word",
    },
  },
};
Validator.localize("en", dict);
Vue.component("v-select", vSelect);
export default {
  name:'synonym-component',
    data() {
    return {
      Synonymsname: "",
      Synonymsword: "",
      rowdata: [],
      chatbotname: "",
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Synonymsname !== "" &&
        this.Synonymsword !== ""
      );
    },
  },
  mounted() {
    // axios.get(Base_URL.Actual_URL+'alluser',{
    this.chatbotname = localStorage.getItem("chatbotname");
    var newemail = localStorage.getItem("email");
    console.log('from synonym');
    var chatbot_id = localStorage.getItem("chatbot_id");
    console.log(chatbot_id);
    this.synonymsTable();
  },

  methods: {
    synonymsTable() {
      axios
        .post(Base_URL.Actual_URL + "synonymtable", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          console.log(response);
          this.rowdata = response.data.sentence;

          console.log(this.rowdata);
        });
    },
    deleteTableRow: function (idx) {
      var newemail = localStorage.getItem("email");
      // console.log(newemail)
      axios
        .post(Base_URL.Actual_URL + "synonymdelete", {
          delete: 1,
          idx: idx,
          company_id: localStorage.company_id,
        })
        .then(() => {
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.synonymsTable()
          this.counter--;
          this.rowdata.splice(idx, 1);
        });
    },

    updateRecord: function (index) {
   
          this.$router.push({
            name: "editsynonymname",
            params: {
              id: index,
            },
        });
    },

    synonyms() {
      console.log('synonyms')
      this.$validator.validateAll().then((result) => {
        if (result) {
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "synonym", {
          synonymsname: this.Synonymsname,
          synonymsword: this.Synonymsword,
          chatbot_id: chatbot_id,

          company_id: localStorage.company_id,
        })
        .then((response) => {
          console.log(response);

          if (response.data.code == 200) {
            this.synonymsTable();
            this.Synonymsname = "";
            this.Synonymsword = "";
            this.$emit("updateSynonymComponent");
            this.$vs.notify({
              color: "success",
              title: "Synonym Record",
              text: "The synonym  was successfully Added",
              position: "top-center",
            });
          }
        });
        }
      })
    },
  },
};
</script>


