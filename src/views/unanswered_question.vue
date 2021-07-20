<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Unanswered Questions Table">
              <div id="div-with-loading" class="vs-con-loading__container">
        <vs-table search max-items="10" pagination :data="rowdatanew" >
          <template slot="thead" >
            <vs-th>IP</vs-th>
            <vs-th>Question</vs-th>
            <!-- <vs-th>Name</vs-th>
            <vs-th>Email</vs-th>
            <vs-th>Phone Number</vs-th> -->
            <vs-th>Collected at</vs-th>
          </template>
          <template slot-scope="{ data }" v-if="chatbotname !== null">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
               <!-- <vs-td>
                {{ chatbotname }}
              </vs-td> -->
              
              <vs-td :data="tr.Ip">
                {{ tr.Ip }}
              </vs-td>
              <vs-td :data="tr.Question">
                {{ tr.Question }}
              </vs-td>
              <!-- <vs-td :data="tr.mobile_number">
                {{ tr.mobile_number }}
              </vs-td> -->
              <vs-td :data="tr.Date_of_Creation">
                {{ moment.tz(tr.Date_of_Creation, "GMT").format("ddd DD MMM YYYY")}}
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
var moment = require("moment-timezone");

export default {
  data() {
    return {
      moment,
      actionname: "",
      rowdata: [],
      rowdatanew: [],
      chatbotname:'',
      formData: []
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.actionname !== "";
    },
  },
  mounted() {

    this.chatbotname = localStorage.getItem("chatbot_id");
    // this.getFormData()
    if(localStorage.chatbotname !== undefined && localStorage.chatbotname !== null){
      this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.6,
    });
    }
    this.collectedLeads()
  },
  methods:{
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
        axios.post(Base_URL.Actual_URL + "unans_question_get", {
        // formname: this.formData.formname,
        company_id: localStorage.company_id,
        chatbot_id : localStorage.chatbot_id
      })
      .then((response) => {
         setTimeout(() => {
              this.$vs.loading.close("#div-with-loading > .con-vs-loading");
            }, 1000);
        this.rowdatanew = response.data.data;
      });
    }
  }
};
</script>