<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Lead Data Table">
        <vs-button @click="downLoadPdf()" class="mb-4" v-if="newData.length > 0"
          >Export As PDF</vs-button
        >
        <vs-button @click="ExportAsCSV()" class="mb-4 ml-2" v-if="newData.length > 0"
          >Export As CSV</vs-button
        >
        <!-- <div class="vx-row">
          <div class="vx-col w-full mb-base">
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <h6>Select form Name</h6>
              <v-select
                class="w-full"
                label="chatbotname"
                :options="formData"
                v-model="selectform"
                @input="handleSelected"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              >
              </v-select>
            </div>
          </div>
        </div> --> 
      <div class="float-right">
        <date-picker v-model="time3" range  @change="filterData" placeholder="Choose a date"></date-picker></div>
        <div id="div-with-loading" class="vs-con-loading__container">
          <vs-table
            pagination
            v-model="selected"
            @selected="selectRow"
            :data="newData"
            max-items="10"
            id="pdfContent"
          >
            <template slot="thead">
              <vs-th>S.No.</vs-th>
              <vs-th
                v-for="(tr, indextr) in columnDefs"
                :key="indextr"
                :class="{ collapsed: indextr > 2 }"
                >{{ columnDefs[indextr].headerName }}</vs-th
              >
              <!-- <vs-th v-if="!dateExist && columnDefs.length > 0"
                >Date_of_Creation</vs-th
              > -->
              <vs-th> Action </vs-th>
            </template>

            <template slot-scope="{ data }">
              <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in leadRowdata">
          <vs-td :data="data[indextr]" v-for="(tr1, indextr1) in tr[0]" :key="indextr1" :class="{collapsed: indextr1 > 5}">
          {{tr1}}
          </vs-td> -->
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>{{ indextr + 1 }}</vs-td>
                <vs-td
                  :data="data[indextr]"
                  v-for="(tr1, indextr1) in tr"
                  :key="indextr1"
                  :class="{ collapsed: indextr1 > 2 }"
                >
                  {{ tr1.value }}
                </vs-td>
                <vs-td>
                  <vs-button
                    @click="viewDetails"
                    type="filled"
                    color="primary"
                    class="mr-2"
                    >View Details</vs-button
                  >
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <vs-popup
          class="holamundo"
          title="Selected Lead Data"
          :active.sync="popupActive"
          @close="popupActive = false"
        >
          <vs-table :data="selectedRowData">
            <template slot-scope="{ data }">
              <vs-tr v-for="(row, index) in data" :key="index">
                <vs-td v-if="row.key !== 'Form' && row.key !== 'file_format'  && row.key !== 'file_path' && row.key !== 'sender_id'">
                  <vs-th>{{ row.key }}</vs-th>
                </vs-td>
                 <vs-th v-if="row.key == 'sender_id'" style="background: lightgrey;"><vs-td>{{ row.key }}</vs-td></vs-th>
                <vs-td v-if="row.key !== 'Form'  && row.key !== 'file_format'  && row.key !== 'file_path' && row.key !== 'sender_id'" >
                  {{ row.value }}
                </vs-td>
                                 <vs-td v-if="row.key == 'sender_id'" style="background: lightgrey;">{{ row.value }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <div v-for="(row, index) in selectedRowData" :key="index">
            <div
              v-show="row.key == 'Form'"
              v-for="(row1, index1) in selectedRowData[index]"
              :key="index1"
            >
              <table :data="selectedRowData[index]" v-show="row1 != 'Form'" id="outer_table">
                <p v-show="row1 != 'Form'">
                  <table id="customers" class="table mt-8 pt-8" v-for="(value, propertyName, index) in row1" :key="index">
                     <thead><tr> <th colspan="4">{{ propertyName }} </th></tr></thead>
                      <tr
                        :data="value1"
                        v-for="(value1, propertyName1, index) in value"
                        :key="index"
                      >
                        <td>{{ propertyName1 }}</td
                        ><td>{{ value1 }}</td></tr
                      >
                  </table>
                </p>
              </table>
            </div>
            <div v-show="row.key == 'file_format'"
              >
                  <table id="customers" class="table mt-8 pt-8">
                     <thead><tr> <th colspan="4">File </th></tr></thead>
                      <tr v-for="(row1, index1) in selectedRowData"
              :key="index1"
                      >
                        <td v-show="row1.key == 'file_format'|| row1.key == 'file_path'">{{ row1.key }}</td
                        ><td v-show="row1.key == 'file_format'|| row1.key == 'file_path'">{{ row1.value }}</td></tr
                      >
                  </table>
            </div>
          </div>
        </vs-popup>
      </vx-card>
    </div>
  </div>
</template>
<script>
// import vSelect from "vue-select";
import axios from "axios";
import { Base_URL } from "../../../api.config";
import vSelect from "vue-select";
var selectedRowData;
var selectform;
var dateExist;
import html2canvas from "html2canvas";
import CsvExportor from "csv-exportor";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  var moment = require("moment-timezone");

export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      moment,
      selected: [],
      columnDefs: [],
      rowdata: [],
      rowdatanew: [],
      chatbotname: "",
      formData: [],
      leadsData: [],
      selectform: "",
      leadRowdata: [],
      newData: [],
      selectedRowData: [],
      popupActive: false,
      dateExist: false,
      finalArr: [],
      heads: [],
      from_date:'',
      to_date:'',
        time3: null,
        form_name:[],
        allData:[],
    };
  },
  computed: {},
  mounted() {
    if (localStorage.chatbot_id !== undefined && localStorage.chatbot_id !== null) {
      this.getFormData();
      this.getDataForExport()
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
      // this.collectedLeads()
    }
  },
      components: { DatePicker },

  methods: {
    getDataForExport() {
      axios
          .post(Base_URL.Actual_URL + "Lead_ip_wise_pdf", {
            chatbot_id: localStorage.chatbot_id,
            company_id: localStorage.company_id,
            from_date: this.from_date,
            to_date: this.to_date
          })
          .then((response) => {
            // console.log(response,'pdf response')
            this.allData = []
            this.allData = response.data.Data
           
      })
    },
    filterData(e) {
      console.log(e[0],'e')
      console.log(moment(e[0]).format("DD-MMM-YYYY"))
      this.from_date = moment(e[0]).format("DD-MMM-YYYY")
      this.to_date = moment(e[1]).format("DD-MMM-YYYY")
      this.getFormData();
      this.getDataForExport()
    },
    makeFinalArrData() {
      let arrNew = [this.newData];
      if (this.newData.length > 0) {
        for (let i = 0; i < 1; i++) {
          console.log(i, "arrNew[i]");
          let object = arrNew[i];
          for (let k = 0; k < object[0].length; k++) {
            this.heads.push(object[0][k].key);
          }
          let array1 = {};
          this.newData.forEach((element) => {
            for (let k = 0; k < element.length; k++) {
              array1[element[k].key] = element[k].value;
            }
            this.finalArr.push(array1);
            array1 = {};
          });
        }
      }
    },
    ExportAsCSV() {
        var heads = []
            var rows =[]
            var body1 = []
            let columnLength = 0     
            this.allData.forEach((element, index1) => {
                 for (const [key, value,index] of Object.entries(element)) {
                   console.log(key, value,'key value')
                   body1.push(value);
                   if (index1 == 0) {
                     heads.push(key);
                   }
              }
              columnLength = Object.entries(heads).length;
              rows.push(body1);
              body1 = [];
            })
      let csvData = []; // csv table
      // this.makeFinalArrData()
      // for (let i = 0; i < this.allData.length; i++) {
        csvData = rows;
      // }
      CsvExportor.downloadCsv(csvData, { header: heads }, "lead.csv");
    },
    downLoadPdf() {
     var heads = []
            var rows =[]
            var body1 = []
            let columnLength = 0     
            this.allData.forEach((element, index1) => {
                 for (const [key, value,index] of Object.entries(element)) {
                   console.log(key, value,'key value')
                   body1.push(value);
                   if (index1 == 0) {
                     heads.push(key);
                   }
              }
              columnLength = Object.entries(heads).length;
              rows.push(body1);
              body1 = [];
            })
              if (columnLength > 14) {
              const doc = new jsPDF("l", "mm", [800, 210]);
              doc.autoTable({
                styles: { minCellWidth: 30 },
                head: [heads],
                body: rows,
              });
              doc.save("table.pdf");
            }
            if (columnLength > 6 && columnLength < 10) {
              console.log("if 2",heads,rows);
              const doc = new jsPDF("l", "mm", [400, 210]);
              doc.autoTable({
                styles: { minCellWidth: 30 },
                head: [heads],
                body: rows,
              });
              console.log(doc.save("table.pdf"),'doc')
              doc.save("table.pdf");
            }
            if (columnLength > 10 && columnLength < 14) {
              console.log("if 3");
              const doc = new jsPDF("l", "mm", [600, 210]);
              doc.autoTable({
                styles: { minCellWidth: 30 },
                //      columnStyles: {
                // 0: { cellWidth: 20 },1:{ cellWidth: 50}
                //      },
                head: [heads],
                body: rows,
              });
              doc.save("table.pdf");
            }
          if (columnLength <= 5) {
            const doc = new jsPDF();
            doc.autoTable({
              styles: { minCellWidth: 30 },
              head: [heads],
              body: rows,
            });
            doc.save("table.pdf");
            }     
    },
    getFormData() {
      axios
        .post(Base_URL.Actual_URL + "Lead_ip_wise", {
          chatbot_id: localStorage.chatbot_id,
          company_id: localStorage.company_id,
          from_date: this.from_date,
          to_date: this.to_date
        })
        .then((response) => {
          var test = [];
          this.newData = []
          test = response.data;
          this.form_name = response.data.Form_list
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
          if (Array.isArray(response.data.Data)) {
            var count = 0;
            this.dateExist = false;
            console.log(response.data.Data, "tyyuuii");
            this.leadsData = response.data.Data;
            console.log(this.leadsData, "leadsData");
            this.leadsData.forEach((element) => {
              var columnCount = 0;
              // this.leadRowdata.push(
              //       [element])

              for (const property in element) {
                // if (property == "Date_of_Creation" && columnCount <= 4) {
                //   this.dateExist = true;
                // }
                this.leadRowdata.push({
                  key: property,
                  value: element[property],
                });
                // if(columnCount > 4) {
                //   console.log(element,property)
                //   this.$delete(element, property);
                // console.log(this.$delete(element));
                // }
                // if (count < 1 && columnCount < 5) {
                this.columnDefs.push({
                  headerName: property,
                  // field: property,
                  // filter: true,
                  // width: 225,
                });
                // }
                // columnCount++;
              }
              // console.log(this.dateExist,columnCount,'columnCount')
              if (this.dateExist == false && columnCount > 4) {
                this.leadRowdata.splice(5, 0, {
                  key: "Date_of_Creation",
                  value: element.Date_of_Creation,
                });
              }

              this.newData.push(this.leadRowdata);
              this.leadRowdata = [];
              count++;
            });
          }
          for (let i = 0; i < this.newData.length; i++) {
            for (const property in this.newData[i]) {
              if (this.newData[i][property].key == "sender_id") {
                const tmp = this.newData[i][property];
                this.newData[i][property] = this.newData[i][0];
                this.newData[i][0] = tmp;
                // console.log(
                //   this.newData[i][property],
                //   "date of creation index"
                // );
                // this.newData[i][property].key,this.newData[i][property].value)
              }
              if (this.newData[i][property].key == "Date_of_Creation") {
                const tmp = this.newData[i][property];
                this.newData[i][property] = this.newData[i][1];
                this.newData[i][1] = tmp;
              }
              // console.log(this.newData[i], "newww checkkk elements");
            }
          }
          for (let i = 0; i < this.columnDefs.length; i++) {
            if (this.columnDefs[i].headerName == "sender_id") {
              const tmp = this.columnDefs[i];
              this.columnDefs[i] = this.columnDefs[0];
              this.columnDefs[0] = tmp;
            }

            if (this.columnDefs[i].headerName == "Date_of_Creation") {
              const tmp = this.columnDefs[i];
              this.columnDefs[i] = this.columnDefs[1];
              this.columnDefs[1] = tmp;
            }
          }
          this.makeFinalArrData();
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
    // handleSelected(val) {
    //   // console.log(val, "selected");
    //   this.columnDefs = [];
    //   this.leadRowdata = [];
    //   this.leadsData = [];
    //   this.newData = [];
    //   axios
    //     .post("http://15.207.152.10:80/lead_data", {
    //       form_name: val,
    //       chatbotid: localStorage.chatbot_id,
    //     })
    //     .then((response) => {
    //       setTimeout(() => {
    //         this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    //       }, 1000);
    //       console.log(response.data.Data, "response.data.Data");
    //       if (Array.isArray(response.data.Data)) {
    //         var count = 0;
    //         this.dateExist = false;
    //         this.leadsData = response.data.Data;
    //         this.leadsData.forEach((element) => {
    //           var columnCount = 0;
    //           // this.leadRowdata.push(
    //           //       [element])

    //           for (const property in element) {
    //             if (property == "Date_of_Creation" && columnCount <= 4) {
    //               this.dateExist = true;
    //             }
    //             this.leadRowdata.push({
    //               key: property,
    //               value: element[property],
    //             });
    //             // if(columnCount > 4) {
    //             //   console.log(element,property)
    //             //   this.$delete(element, property);
    //             // console.log(this.$delete(element));
    //             // }
    //             if (count < 1 && columnCount < 5) {
    //               this.columnDefs.push({
    //                 headerName: property,
    //                 // field: property,
    //                 // filter: true,
    //                 // width: 225,
    //               });
    //             }
    //             columnCount++;
    //           }
    //           // console.log(this.dateExist,columnCount,'columnCount')
    //           if (this.dateExist == false && columnCount > 4) {
    //             console.log(
    //               element.Date_of_Creation,
    //               "element.Date_of_Creation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\+++"
    //             );
    //             this.leadRowdata.splice(5, 0, {
    //               key: "Date_of_Creation",
    //               value: element.Date_of_Creation,
    //             });
    //           }

    //           this.newData.push(this.leadRowdata);
    //           this.leadRowdata = [];
    //           count++;
    //         });
    //         console.log(this.newData,'newadta')
    //       }
    //     });
    // },
    selectRow(row) {
      this.selectedRowData = row;
      console.log(this.selected, "selected");

      // console.log("selected row", this.selectedRowData.length);
    },
    viewDetails() {
      this.popupActive = true;
      const obj = [
        ...new Map(
          this.selectedRowData.map((item) => [JSON.stringify(item), item])
        ).values(),
      ];
      this.selectedRowData = obj;
      for (let a in this.selectedRowData) {
        console.log(a, "a");
      }
      // console.log(this.selectedRowData, "this.selectedRowData ");
    },
  },
};
</script>
<style scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  /* border: 1px solid #ddd; */
  padding: 8px;
      font-size: 1rem;

}
#customers tr{
    border-bottom: 1px solid lightgrey;
}
#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 6px;
  padding-bottom: 6px;
  /* text-align: left; */
  /* background-color: #04AA6D; */
  /* color: white; */
}
 #customers th {
    text-align: center;
        font-size: 1rem;
        background-color: lightgray;

}
.table{
  width: 100% !important;
    /* text-align: center; */
}
#customers[data-v-58190bfa] {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
table#outer_table {
    width: 100%;
}
#customers tr:nth-child(even) {
    background-color: transparent;
}
</style>