<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Lead Data Table">
        <div id="div-with-loading" class="vs-con-loading__container">
          <vs-table search max-items="10" pagination :data="rowdatanew">
            <template slot="thead">
              <vs-th>Chatbot Name</vs-th>
              <vs-th>Name</vs-th>
              <vs-th>Email</vs-th>
              <vs-th>Phone Number</vs-th>
              <vs-th>Collected at</vs-th>
            </template>
            <template slot-scope="{ data }" v-if="chatbotname !== null">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>
                  {{ chatbotname }}
                </vs-td>
                <vs-td :data="tr.name">
                  {{ tr.name }}
                </vs-td>
                <vs-td :data="tr.email_id">
                  {{ tr.email_id }}
                </vs-td>
                <vs-td :data="tr.mobile_number">
                  {{ tr.mobile_number }}
                </vs-td>
                <vs-td :data="tr.Date_of_Creation">
                  {{ tr.Date_of_Creation | formatDatewithDate }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
// import vSelect from "vue-select";
import axios from "axios";
import { Base_URL } from "./../../api.config";

export default {
  data() {
    return {
      actionname: "",
      rowdata: [],
      rowdatanew: [],
      chatbotname: "",
      formData: [],
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.actionname !== "";
    },
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    // this.getFormData()
    if (localStorage.chatbotname !== undefined && localStorage.chatbotname !== null) {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
    }
    this.collectedLeads();
  },
  methods: {
    // getFormData() {
    //      axios
    //   .post(Base_URL.Actual_URL+'formtable', {
    //     //axios.post(Base_URL.Actual_URL+'formtable',{
    //     newemail: localStorage.email,
    //     chatbot_id: localStorage.chatbot_id,
    //   })
    //   .then((response) => {
    //     this.formData = response.data.userlist[0];
    //     this.collectedLeads()
    //   });
    // },
    collectedLeads() {
      axios
        .post(Base_URL.Actual_URL + "leadtable", {
          // formname: this.formData.formname,
          formname: "Lead_form",
          chatbotid: localStorage.chatbot_id,
        })
        .then((response) => {
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
          this.rowdatanew = response.data.userlist;
        })
        .catch((err) => {
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
          this.$vs.notify({
            text: "Please try again.",
            title: "Failed to process your request.",
            color: "danger",
            position: "top-center",
          });
        });
    },
  },
};
</script>
