<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Chatbot file Table">
        <vs-button @click="downLoadPdf()" class="mb-4" v-if="rowdatanew.length > 0"
          >Export As PDF</vs-button
        >
        <vs-button @click="exportAsCsv()" class="ml-2 mb-4" v-if="rowdatanew.length > 0"
          >Export As CSV</vs-button
        >
        <div id="div-with-loading" class="vs-con-loading__container">
          <vs-table search max-items="10" pagination :data="rowdatanew">
            <template slot="thead">
              <vs-th>IP</vs-th>
              <vs-th>File Name</vs-th>
              <vs-th>File Type</vs-th>
              <vs-th>File</vs-th>
              <vs-th>Collected at</vs-th> </template
            >{{ data }}
            <template slot-scope="{ data }" v-if="chatbotname !== null">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.Ip">
                  {{ tr.Ip }}
                </vs-td>
                <vs-td :data="tr.File_name">
                  {{ tr.File_name }}
                </vs-td>
                <vs-td :data="tr.Question">
                  {{ tr.File_Type }}
                </vs-td>
                <vs-td :data="tr.File_Url">
                  <a :href="tr.File_Url" target="_blank">{{ tr.File_Url }}</a>
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
import { Base_URL } from "../../../api.config";
import JSPDF from "jspdf";
import CsvExportor from "csv-exportor";
import "jspdf-autotable";
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
    this.chatbotname = localStorage.getItem("chatbot_id");
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
    downLoadPdf() {
      const doc = new JSPDF("l", "mm", [297, 210]);
      let body1 = [];
      let row = [];
      const heads = [];
      for (let i = 0; i < this.rowdatanew.length; i++) {
        for (const [key, value] of Object.entries(this.rowdatanew[i])) {
          if (key !== "Id") {
            body1.push(value);
            if (i == 0) {
              heads.push(key);
            }
            console.log(body1, body1.length, "body1");
          }
        }

        row.push(body1);
        body1 = [];
      }
      console.log(row, "body");
      doc.autoTable({
        styles: { minCellWidth: 40 },
        // columnStyles: { LOCATION: { cellWidth: 'auto' } },
        head: [heads],
        body: row,
      });

      doc.save("unanswered_questions.pdf");
    },
    exportAsCsv() {
      let row = [];
      let csvData = []; // csv table
      let body1 = [];
      let heads = [];
      // this.makeFinalArrData()
      for (let i = 0; i < this.rowdatanew.length; i++) {
        for (const [key, value] of Object.entries(this.rowdatanew[i])) {
          if (key !== "Id") {
            body1.push(value);
            if (i == 0) {
              heads.push(key);
            }
            console.log(body1, body1.length, "body1");
          }
        }

        row.push(body1);
        body1 = [];
      }
      csvData = row;
      console.log(heads);
      CsvExportor.downloadCsv(csvData, { header: heads }, "unanswered_questions.csv");
    },
    collectedLeads() {
      axios
        .post(Base_URL.Actual_URL + "chatbot_file_get", {
          // formname: this.formData.formname,
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
          this.rowdatanew = response.data.Data;
        })
        .catch((err) => {
          this.$vs.loading.close();
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
