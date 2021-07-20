<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Lead Data Table">
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
        <div id="div-with-loading" class="vs-con-loading__container">
          <vs-table
            pagination
            v-model="selected"
            @selected="selectRow"
            :data="newData"
            max-items="10"
          >
            <template slot="thead">
              <vs-th v-for="(tr, indextr) in columnDefs" :key="indextr">{{
                columnDefs[indextr].headerName
              }}</vs-th>
              <vs-th v-if="!dateExist && columnDefs.length > 0"
                >Date_of_Creation</vs-th
              >
            </template>

            <template slot-scope="{ data }">
              <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in leadRowdata">
          <vs-td :data="data[indextr]" v-for="(tr1, indextr1) in tr[0]" :key="indextr1" :class="{collapsed: indextr1 > 5}">
          {{tr1}}
          </vs-td> -->
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td
                  :data="data[indextr]"
                  v-for="(tr1, indextr1) in tr"
                  :key="indextr1"
                  :class="{ collapsed: indextr1 > 4 }"
                >
                  {{ tr1.value }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <vs-popup
          class="holamundo"
          title="Selected lead data"
          :active.sync="popupActive"
          @close="popupActive = false"
        >
          <vs-table :data="selectedRowData">
            <template slot-scope="{ data }">
              <vs-tr v-for="(row, index) in data" :key="index">
                <vs-td>
                  <vs-th>{{ row.key }}</vs-th>
                </vs-td>
                <vs-td>
                  {{ row.value }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
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
export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
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
    };
  },
  computed: {},
  mounted() {
    if (
      localStorage.chatbot_id !== undefined &&
      localStorage.chatbot_id !== null
    ) {
      this.getFormData();
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
      // this.collectedLeads()
    }
  },
  methods: {
    getFormData() {
      // axios
      //   .post(Base_URL.Actual_URL + "get_formdata", {
      //     chatbot_id: localStorage.chatbot_id,
      //   })
      //   .then((response) => {
      //     // console.log(response.data);
      //     setTimeout(() => {
      //       this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      //     }, 1000);
      //     this.formData = response.data.Form_list;
      //   });
      axios
        .post(Base_URL.Actual_URL + "Lead_ip_wise", {
          chatbot_id: localStorage.chatbot_id,
          company_id: localStorage.company_id,
        })
        .then((response) => {
          var test = [];
          test = response.data;
          // console.log(test ,typeof response.data)
          //  for(let i in response.data) {
          //    console.log(i ,'iiiiiiiiii')
          //  }
          // response.data.forEach(element => {
          //   console.log(element,'element')
          // });
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
          // this.formData = response.data.Data;
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
                if (property == "Date_of_Creation" && columnCount <= 4) {
                  this.dateExist = true;
                }
                this.leadRowdata.push({
                  key: property,
                  value: element[property],
                });
                // if(columnCount > 4) {
                //   console.log(element,property)
                //   this.$delete(element, property);
                // console.log(this.$delete(element));
                // }
                if (count < 1 && columnCount < 5) {
                  this.columnDefs.push({
                    headerName: property,
                    // field: property,
                    // filter: true,
                    // width: 225,
                  });
                }
                columnCount++;
              }
              // console.log(this.dateExist,columnCount,'columnCount')
              if (this.dateExist == false && columnCount > 4) {
                console.log(
                  element.Date_of_Creation,
                  "element.Date_of_Creation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\+++"
                );
                this.leadRowdata.splice(5, 0, {
                  key: "Date_of_Creation",
                  value: element.Date_of_Creation,
                });
              }

              this.newData.push(this.leadRowdata);
              this.leadRowdata = [];
              count++;
            });
            // console.log(this.newData,'newadta')
          }
          console.log("columndef" , this.columnDefs);
        });
    },
    handleSelected(val) {
      // console.log(val, "selected");
      this.columnDefs = [];
      this.leadRowdata = [];
      this.leadsData = [];
      this.newData = [];
      axios
        .post("http://15.207.152.10:80/lead_data", {
          form_name: val,
          chatbotid: localStorage.chatbot_id,
        })
        .then((response) => {
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
          console.log(response.data.Data, "response.data.Data");
          if (Array.isArray(response.data.Data)) {
            var count = 0;
            this.dateExist = false;
            this.leadsData = response.data.Data;
            this.leadsData.forEach((element) => {
              var columnCount = 0;
              // this.leadRowdata.push(
              //       [element])

              for (const property in element) {
                if (property == "Date_of_Creation" && columnCount <= 4) {
                  this.dateExist = true;
                }
                this.leadRowdata.push({
                  key: property,
                  value: element[property],
                });
                // if(columnCount > 4) {
                //   console.log(element,property)
                //   this.$delete(element, property);
                // console.log(this.$delete(element));
                // }
                if (count < 1 && columnCount < 5) {
                  this.columnDefs.push({
                    headerName: property,
                    // field: property,
                    // filter: true,
                    // width: 225,
                  });
                }
                columnCount++;
              }
              // console.log(this.dateExist,columnCount,'columnCount')
              if (this.dateExist == false && columnCount > 4) {
                console.log(
                  element.Date_of_Creation,
                  "element.Date_of_Creation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\+++"
                );
                this.leadRowdata.splice(5, 0, {
                  key: "Date_of_Creation",
                  value: element.Date_of_Creation,
                });
              }

              this.newData.push(this.leadRowdata);
              this.leadRowdata = [];
              count++;
            });
            // console.log(this.newData,'newadta')
          }
        });
    },
    selectRow(row) {
      this.popupActive = true;
      this.selectedRowData = row;
      const obj = [
        ...new Map(
          this.selectedRowData.map((item) => [JSON.stringify(item), item])
        ).values(),
      ];
      this.selectedRowData = obj;
      // console.log("selected row", this.selectedRowData.length);
    },
  },
};
</script>