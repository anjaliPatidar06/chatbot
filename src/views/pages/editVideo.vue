<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Edit Video">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Response Name</h6>
            <v-select
              class="w-full"
              label="responsename"
              name="response_name"
              v-validate="'required'"
              :options="responsedata"
              v-model="rowdata.response_name"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            >
            </v-select>
            <span class="text-danger text-sm"> {{ errors.first("response_name") }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mt-2">
            <!-- <h6>Pdf Upload</h6> -->
            <div class="vx-col w-full">
              <div class="upload-img mt-4">
                <span v-if="selectedfile !== null || selectedfile !== ''">{{
                  selectedfile
                }}</span>
                <a
                  :href="rowdata.video_path"
                  target="_blank"
                  v-if="selectedfile == null || selectedfile == ''"
                  >{{ rowdata.video_path }}</a
                >
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  ref="updateImgInputnewbackground"
                  accept="video/mp4,video/x-m4v,video/*"
                  v-validate="'mimes:video/*'"
                  name="videofile"
                  :v-validate="{ required: rowdata.video_path == null }"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                />
                <vs-button
                  @click="$refs.updateImgInputnewbackground.click()"
                  icon-pack="feather"
                  icon="icon icon-upload"
                  >Upload Video</vs-button
                >
                <span class="text-danger text-sm"> {{ errors.first("videofile") }}</span>
                <!-- <span class="text-danger text-sm" v-if="!IsValidFile"
                  >Please select video files only.
                </span> -->
              </div>
            </div>
            <div class="vx-col sm:w-1/3 w-full contained-example-container pt-2 pb-2">
              <div id="div-with-loading" class="vs-con-loading__container">
                <vs-button class="mr-3 mt-4" @click="Update">Update</vs-button>
              </div>
            </div>
          </div>
        </div>
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
  name: "editVideo",
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
    this.getData();
  },
  methods: {
    handleFileUpload() {
      this.file1 = this.$refs.updateImgInputnewbackground.files[0];
      // if (this.file1.type !== "video/mp4") {
      //   this.IsValidFile = false;
      //   return;
      // } else {
      // this.IsValidFile = true;
      this.selectedfile = this.$refs.updateImgInputnewbackground.files[0].name;
      this.selectedfilePath = this.selectedfile;
      this.createBase64Image(this.file1);
      // }
      console.log(this.file1.type, "file@@@");
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.file1 = "";
        this.file1 = e.target.result;
        this.rowdata.video_path = e.target.result;
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
    getData() {
      axios
        .get(Base_URL.Actual_URL + "editvideo/" + this.$route.params.id)
        .then((response) => {
          this.rowdata = response.data.video_list[0];
          console.log(this.rowdata, "rowData");
        });
    },

    Update() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$vs.loading({
            container: "#div-with-loading",
            scale: 0.6,
          });
          var chatbot_id = localStorage.getItem("chatbot_id");
          axios
            .post(Base_URL.Actual_URL + "editvideo/" + this.$route.params.id, {
              chatbot_id: chatbot_id,
              company_id: localStorage.company_id,
              responsename:
                this.rowdata.response_name.responsename || this.rowdata.response_name,
              video_path: this.selectedfile || this.rowdata.video_path,
              video_base64: this.file1 || "",
            })
            .then((response) => {
              if (response.data.code == 200) {
                setTimeout(() => {
                  this.$vs.loading.close("#button-with-loading > .con-vs-loading");
                }, 500);
                this.$emit("updateVideoComponent");
                this.$router.push({
                  name: "botTemplate",
                  params: { name: "video" },
                });
                this.$vs.notify({
                  color: "success",
                  title: "Data Saved",
                  text: "Data saved successfully.",
                  position: "top-center",
                });
              }
              if (response.data.code == 100) {
                setTimeout(() => {
                  this.$vs.loading.close("#div-with-loading > .con-vs-loading");
                }, 500);
                this.$vs.notify({
                  color: "warning",
                  text: response.data.result,
                  position: "top-center",
                });
              }
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
        }
      });
    },
  },
};
</script>
