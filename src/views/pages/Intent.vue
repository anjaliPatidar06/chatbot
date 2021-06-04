<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Intent Table" search>
        <!-- <vs-table search max-items="10" pagination :data="users" > -->
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 80%">Intent Name</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
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
import { Base_URL, API_List } from "../../../api.config";

export default {
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
    var newemail = localStorage.getItem("email");
    var chatbot_id = localStorage.getItem("chatbot_id");
    this.getIntentData()
  },
  methods: {
    getIntentData() {
       axios
      .post(Base_URL.Actual_URL + "intentpages", {
        company_id: localStorage.company_id,
        chatbot_id: localStorage.chatbot_id,
      })
      .then((response) => {
        this.rowdata = response.data.userlist;
      });
    },
    deleteTableRow: function (idx) {

      axios
        .post(Base_URL.Actual_URL + "intentpage", {
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
          this.getIntentData()
          this.counter--;
          this.rowdata.splice(idx, 1);
        });
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editintent", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;
          this.id = this.email[0].id;
           this.$router.push({
             name: 'editintentname' , params:{ id: this.id}
           })
        });
    },
  },
};
</script>
