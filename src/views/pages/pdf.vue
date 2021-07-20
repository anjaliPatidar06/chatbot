

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Pdf">
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
            <h6>Pdf Title</h6>
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
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mt-2">
            <!-- <h6>Pdf Upload</h6> -->
            <span>{{ selectedfile }}</span>

            <div class="vx-col w-full mb-2">
              <div class="upload-img">
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  ref="updateImgInputnewbackground"
                  accept="pdf/*"
                  v-validate="'required'"
                  name="pdffile"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                />
                <vs-button
                  @click="$refs.updateImgInputnewbackground.click()"
                  icon-pack="feather"
                  icon="icon icon-upload"
                  >Upload pdf</vs-button
                >
                <span class="text-danger text-sm">
                  {{ errors.first("pdffile") }}</span
                >
                <span class="text-danger text-sm" v-if="!IsValidFile"
                  >Please select pdf files only.
                </span>
              </div>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <vs-button class="mr-3 mt-4" @click="addEvent1">Submit</vs-button>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Pdf Table" search>
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 20%">Response Name</vs-th>
            <vs-th style="width: 20%">Title</vs-th>
            <vs-th style="width: 20%">Pdf</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.response_name">
                {{ tr.response_name }}
              </vs-td>
              <vs-td :data="tr.title">
                {{ tr.title }}
              </vs-td>
              <vs-td :data="tr.url">
                <a :href="tr.url" target="_blank">{{ tr.url }}</a>
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
    pdffile: {
      required: "Please upload a pdf",
    },
    response_name: {
      required: "Please select response name",
    },
    title: {
      required: "Please enter pdf title",
    },
  },
};
Validator.localize("en", dict);

export default {
  name: "pdf",
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
      message: "",
      chatbotname: "",
      selectedfile: "",
      file1: "",
      IsValidFile: true,
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
    this.getResponseData();
    this.getPdfList();
  },
  methods: {
    handleFileUpload() {
      this.file1 = this.$refs.updateImgInputnewbackground.files[0];
      if (this.file1.type !== "application/pdf") {
        this.IsValidFile = false;
        return;
      } else {
        this.IsValidFile = true;
        this.selectedfile =
          this.$refs.updateImgInputnewbackground.files[0].name;
        this.selectedfilePath = this.selectedfile;
        this.createBase64Image(this.file1);
      }
      console.log(this.file1.type, "file@@@");
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.file1 = "";
        this.file1 = e.target.result;
        this.rowdata[0].image_path = e.target.result;
      };
    },
    getResponseData() {
      this.chatbotname = localStorage.getItem("chatbotname");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "entityintentnew", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.responsedata = response.data.response1;
        });
    },
    getPdfList() {
      axios
        .post(Base_URL.Actual_URL + "pdf_data", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.pdf_Data;
        });
    },
    updateRecord: function (index) {
      this.$router.push({
        name: "edit-pdf",
        params: { id: index },
      });
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "delete_pdf", {
          pdf_id: idx,
        })
        .then(() => {
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.getPdfList();
          this.counter--;
          this.rowdata.splice(idx, 1);
        });
      this.counter--;
      this.rowdata.splice(idx, 1);
    },
    addEvent1() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var chatbot_id = localStorage.getItem("chatbot_id");
          axios
            .post(Base_URL.Actual_URL + "upload_pdf", {
              chatbot_id: chatbot_id,
              company_id: localStorage.company_id,
              title: this.title,
              pdf_base: this.file1,
              pdf_name: this.selectedfile,
              chatbot_name: localStorage.chatbotname,
              response_name: this.responsename.responsename,
            })
            .then((response) => {
              if (response.data.code == 100) {
                this.$emit("updatePdfComponent");
                this.getPdfList();
                this.title = "";
                this.selectedfile = "";
                this.file1 = "";
                this.responsename = "";
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

