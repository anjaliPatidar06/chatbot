

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Video">
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
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mt-2">
            <span>{{ selectedfile }}</span>

            <div class="vx-col w-full mb-2">
              <div class="upload-img">
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  ref="updateImgInputnewbackground"
                  accept="video/mp4,video/x-m4v,video/*"
                  v-validate="'required'"
                  name="videofile"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                />
                <vs-button
                  @click="$refs.updateImgInputnewbackground.click()"
                  icon-pack="feather"
                  icon="icon icon-upload"
                  >Upload Video</vs-button
                >
                <span class="text-danger text-sm">
                  {{ errors.first("videofile") }}</span
                >
                <span class="text-danger text-sm" v-if="!IsValidFile"
                  >Please select files in mp4 format only.
                </span>
              </div>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <vs-button class="mr-3 mt-4" @click="addEvent1">Submit</vs-button>
            </div>
          </div>
        </div>
          <div class="demo-alignment">
        <div class="fill-row-loading">
        <div :class="{'activeLoading':activeLoading}" id="loading-default" class="vs-con-loading__container loading-example">
        </div></div></div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Video Table" search>
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 20%">Response Name</vs-th>
            <vs-th style="width: 20%">Video</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.response_name">
                {{ tr.response_name }}
              </vs-td>
              <vs-td :data="tr.video_path">
                <a :href="tr.video_path" target="_blank">{{ tr.video_path }}</a>
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
    videofile: {
      required: "Please upload a video",
    },
    response_name: {
      required: "Please select response name",
    },
  },
};
Validator.localize("en", dict);

export default {
  name: "videoComponent",
  data() {
    return {
          activeLoading:false,
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
    this.getVideoList();
  },
  methods: {
    handleFileUpload() {
      this.file1 = this.$refs.updateImgInputnewbackground.files[0];
      console.log(this.file1.type, "this.file1.type");
      if (this.file1.type !== "video/mp4") {
        // if((this.file1.type != 'video/webm')|| (this.file1.type != 'video/mp4')|| (this.file1.type != 'video/MPEG-2') ||
        // (this.file1.type != 'video/mov') || (this.file1.type != 'video/wmv')) {
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
    getVideoList() {
      axios
        .post(Base_URL.Actual_URL + "video_data", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.Video_Data;
        });
    },
    updateRecord: function (index) {
      this.$router.push({
        name: "editvideo",
        params: { id: index },
      });
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "deleteVideo", {
          idx: idx,
        })
        .then(() => {
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.getVideoList();
          this.counter--;
          this.rowdata.splice(idx, 1);
        });
      this.counter--;
      this.rowdata.splice(idx, 1);
    },
    addEvent1() {
      this.$validator.validateAll().then((result) => {
        if (result) {
       this.activeLoading = true
      this.$vs.loading({
                container: `#loading-default`,
        type:'default',
      })
          // var chatbot_id = localStorage.getItem("chatbot_id");
          var body = {
            video_base64: this.file1,
            video_path: this.selectedfile,
            responsename: this.responsename.responsename,
            company_id: localStorage.company_id,
            chatbot_id: localStorage.chatbot_id,
          };
          console.log(body, "body");
          axios.post(Base_URL.Actual_URL + "video", body).then((response) => {
            if (response.data.code == 200) {
                  setTimeout( ()=> {
        this.activeLoading = false
        this.$vs.loading.close()
      }, 3000);

              this.$emit("updateVideoComponent");
              this.getVideoList();
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

            if (response.data.code == 100) {
              this.$vs.notify({
                color: "warning",
                text: response.data.result,
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

<style lang="scss" scoped>

.fill-row-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
   .loading-example {
    width: 120px;
    float: left;
    height: 120px;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.05);
      transform: translate(0, 4px);
    }
    h4 {
      z-index: 40000;
      position: relative;
      text-align: center;
      padding: 10px;
    }
    &.activeLoading {
      opacity: 0 !important;
      transform: scale(0.5);
    }
  }
}
  </style>

