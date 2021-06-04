
<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Picture">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Response Name</h6>
            <v-select
              class="w-full"
              label="responsename"
              :options="responsedata"
              v-model="responsename"
              @input="newres"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="response_name"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("response_name") }}</span
            >
          </div>

          <template v-if="dataImg">
            <!-- Image Container -->
            <div
              class="img-container w-64 mx-auto flex items-center justify-center"
            >
              <img :src="dataImg" alt="img" class="responsive" />
              <!-- <img :src="previewImage" alt="img" class="responsive"/> -->
            </div>

            <!-- Image upload Buttons -->
            <div class="mt-5">
              <!-- <div
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      >
    </div> -->
              <!-- <input :src="previewImage"
                type="file"
                ref="uploadImgInput"
                accept="image/*"
              /> -->
              <input
                type="file"
                class="hidden"
                ref="updateImgInput"
                @change="handleUpdateFileUpload"
                accept="image/*"
              />
              <vs-button
                class="mb-base mr-3 mb-4"
                color="danger"
                @click="$refs.updateImgInput.click()"
                size="medium"
                >Update Image</vs-button
              >
              <vs-button
                color="primary"
                class="mb-base mr-3 mb-4"
                @click="dataImg = null"
                size="medium"
                >Remove Image</vs-button
              >
            </div>
          </template>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <div class="upload-img mt-5" v-if="!dataImg">
              <input
                type="file"
                class="hidden"
                ref="uploadImgInput"
                @change="handleFileUpload"
                accept="image/*"
                v-validate="'required'"
                name="cardimage"
              />
              <!-- <div
              class="img-container w-64 mx-auto flex items-center justify-center"
            >
                    <img :src="previewImage" alt="img" class="responsive" />

    </div> -->
              <!-- <img v-bind:src="previewImage" v-show="previewImage"/> -->

              <vs-button
                :class="[previewImage != null ? 'mb-base mr-3 mb-4' : '']"
                @click="$refs.uploadImgInput.click()"
                icon-pack="feather"
                icon="icon icon-upload"
                >Upload Image</vs-button
              >
              <span class="text-danger text-sm">
                {{ errors.first("cardimage") }}</span
              >
            </div>
          </div>
        </div>
        <!-- <div class="contained-example-container">
    <div id="div-with-loading" class="vs-con-loading__container"></div>
  </div> -->

        <div class="vx-col sm:w-1/3 w-full">
          <vs-button class="mr-3 mt-4" @click="addEvent1">Submit</vs-button>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Picture Table" search>
        <!-- <vs-table search max-items="10" pagination :data="users" > -->
        <vs-table search max-items="10" pagination :data="picture">
          <template slot="thead">
            <vs-th style="width: 40%">Response Name</vs-th>
            <vs-th style="width: 40%">Picture </vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.responsename">
                {{ tr.responsename }}
              </vs-td>
              <vs-td :data="tr.picturepath">
                {{ tr.picturepath }}
              </vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    @click="deleteTableRow(tr.id)"
                    type="filled"
                    color="danger"
                    icon="delete"
                    aria-hidden="true"
                    >Delete</vs-button
                  >
                </div></vs-td
              >
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import axios from "axios";
import { Base_URL } from "../../../api.config";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
require("vue-simple-calendar/static/css/default.css");

import Datepicker from "vuejs-datepicker";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    response_name: {
      required: "Please select response name",
    },
    cardimage: {
      required: "Please select card image",
    },
  },
};
Validator.localize("en", dict);
export default {
  name: "picture-component",
  data() {
    return {
      inputs: [
        {
          name: "",
        },
      ],
      createresponse: "",
      rowdata: [],
      newsentence: [],
      entitycard: [],
      responsedata: [],
      buttonnew: [],
      rowdatas: [],
      message: "",
      dataImg: null,
      picture: [],
      newlistdata: [],
      responsename: "",
      selectedfile: "",
      file1: "",
      previewImage: null,
    };
  },
  mounted() {
    this.getResponseList();
  },

  computed: {
    simpleCalendarEvents() {
      return this.$store.state.calendar.events;
    },
    validForm() {
      return (
        this.startDate !== "" &&
        this.endDate !== "" &&
        Date.parse(this.endDate) - Date.parse(this.startDate) >= 0
      );
    },
    disabledDatesTo() {
      return { to: new Date(this.startDate) };
    },
    disabledDatesFrom() {
      return { from: new Date(this.endDate) };
    },
    calendarLabels() {
      return this.$store.state.calendar.eventLabels;
    },
  },
  components: {
    "v-select": vSelect,
    CalendarView,
    CalendarViewHeader,
    Datepicker,
  },
  methods: {
    selectImage() {
      this.$refs.uploadImgInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    getResponseList() {
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      var chatbotname = localStorage.getItem("chatbotname");
      axios
        .post(Base_URL.Actual_URL + "picturedropdown", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
          chatbotname: chatbotname,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.newsentence = response.data.sentence;
          this.responsedata = response.data.response1;
          this.buttonnew = response.data.button;
          this.picture = response.data.newlist;
        });
    },
    newres: function () {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "pictureresponse", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
          responsename: this.responsename.responsename,
        })
        .then((response) => {
          this.newlistdata = response.data.userlist;
          if (this.newlistdata.length > 0) {
            var st = this.newlistdata[0].picturepath;
            console.log(st, "newlistdata");
            this.dataImg = st;
          } else {
            this.dataImg = null;
          }
        });
    },
    handleFileUpload() {
      this.file1 = this.$refs.uploadImgInput.files[0];
      //         const reader1 = new FileReader();
      //   // reader1.readAsDataURL(this.file1);

      // this.dataImg =reader1.readAsDataURL(this.file1);
      this.selectedfile = this.$refs.uploadImgInput.files[0].name;

      // console.log(this.$refs.uploadImgInput.files[0]);
      this.createBase64Image(this.file1);
    },
    handleUpdateFileUpload() {
      this.file1 = this.$refs.updateImgInput.files[0];
      this.selectedfile = this.$refs.updateImgInput.files[0].name;

      this.createBase64Image(this.file1);
      // this.dataImg = this.file1
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.file1 = e.target.result;
        this.previewImage = e.target.result;
        this.dataImg = e.target.result;
        console.log(this.previewImage, "previewImage");
      };
    },
    submitAsItIs() {
      this.$emit("updatepictureComponent");
      this.responsename.responsename = "";

      this.$vs.notify({
        color: "success",
        title: "Picture data updated.",
        text: "Picture data updated successfully.",
        position: "top-center",
      });
    },
    addEvent1() {
      console.log(this.dataImg, "dataimg", this.selectedfile);
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.email;
          var chatbotname = localStorage.chatbotname;
          var chatbot_id = localStorage.chatbot_id;
          if (
            this.dataImg !== null &&
            this.dataImg !== "" &&
            this.selectedfile == ""
          ) {

            this.submitAsItIs();
          } else {
            this.$vs.loading();

            axios
              .post(Base_URL.Actual_URL + "picturesapi", {
                company_id: localStorage.company_id,
                chatbot_id: chatbot_id,
                responsename: this.responsename.responsename,
                image: this.file1,
                chatbotname: chatbotname,
                imagename: this.selectedfile,
                bot: "Picture",
              })
              .then((response) => {
                console.log(typeof response.data.code);
                if (parseInt(response.data.code) == 200) {
                  console.log("inside codee");
                  setTimeout(() => {
                    this.$vs.loading.close();
                  }, 3000);
                  this.getResponseList();
                  this.$emit("updatepictureComponent");
                  this.responsename.responsename = "";
                  this.$vs.notify({
                    color: "success",
                    title: "Picture data added.",
                    text: response.data.message,
                    position: "top-center",
                  });
                }
              });
          }
        }
      });
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "deletepicture", {
          idx: idx,
        })
        .then((res) => {
          this.getResponseList();
          this.counter--;
          this.rowdata.splice(idx, 1);
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>


