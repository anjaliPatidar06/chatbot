import Vue from "vue"; import vSelect from "vue-select"; Vue.component("v-select",
vSelect);

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="ChatBot UI Design">
        <!-- <span style="color: red">{{ entitycard }}</span> -->
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Chatbot Name</h6>

            <vs-input
              class="w-full"
              v-validate="'required'"
              v-model="bot_name"
              name="bot_name"
              data-vv-validate-on="blur"
            />
            <span class="text-danger text-sm">{{ errors.first("bot_name") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Chatbot Heading</h6>
            <vs-input
              class="w-full"
              v-validate="'required|max:14'"
              v-model="chatbotheading"
              name="chatbotheading"
              data-vv-validate-on="blur"
            />
            <span class="text-danger text-sm">{{ errors.first("chatbotheading") }}</span>
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Select Font</h6>

            <v-select
              class="w-full"
              label="durationCode"
              :options="durations"
              v-model="selectedDuration"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="select_font"
            >
            </v-select>
            <span class="text-danger text-sm">{{ errors.first("select_font") }}</span>

            <p
              :style="{
                fontFamily: selectedDuration.durationCode,
                color: activecolor,
              }"
            >
              Some text to test font
            </p>
          </div>
          <!-- <div class="mb-2"> -->

          <!-- </div> -->
          <div class="vx-col sm:w-1/3 w-full mt-4">
            <input
              v-model="uiColor"
              @change="changeColor($event.target.value, 'success')"
              type="color"
              name="ui_Color"
              value=""
            />
            <!-- <span class="text-danger text-sm">{{
              errors.first("ui_Color")
            }}</span> -->
            <vs-button
              text-color="rgba(0,0,0,0.5)"
              :color="uiColor"
              type="filled"
              class="ml-2"
            >
              ChatBot UI Color</vs-button
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-button class="mr-3 mt-4" @click="chatbotui" v-if="rowdata.length > 0"
              >Update</vs-button
            >
            <vs-button class="mr-3 mt-4" @click="chatbotui" v-else>Submit</vs-button>
          </div>
        </div>
      </vx-card>
      <vx-card class="mb-5 mt-5" title="Upload Bot Icon">
        <div class="vx-row">
          <template v-if="dataImg">
            <!-- Image Container -->
            <div class="img-container w-64 mx-auto flex items-center justify-center">
              <img :src="dataImg" alt="img" class="image-fit" />
            </div>

            <!-- Image upload Buttons -->
            <div class="mb-5">
              <input
                type="file"
                class="hidden"
                ref="updateImgInput"
                @change="updateCurrImg"
                accept="image/*"
              />
              <vs-button
                class="mb-base mr-3"
                color="danger"
                @click="$refs.updateImgInput.click()"
                size="large"
              >
                Update Image</vs-button
              >
              <vs-button
                color="primary"
                class="mb-base mr-3"
                @click="removeBotIcon"
                size="large"
                >Remove Image</vs-button
              >
            </div>
          </template>
          <div class="vx-col w-full mb-2">
            <div class="upload-img" v-if="!dataImg">
              <input
                type="file"
                class="hidden"
                ref="uploadImgInput"
                @change="updateCurrImg"
                accept="image/*"
              />
              <vs-button
                @click="$refs.uploadImgInput.click()"
                color="primary"
                type="filled"
                icon-pack="feather"
                icon="icon icon-upload"
              >
                Bot Icon
              </vs-button>
            </div>
          </div>
        </div>
      </vx-card>
      <vx-card class="mt-5" title="Upload ChatBot Logo">
        <div class="vx-row">
          <template v-if="dataImgnew">
            <!-- Image Container -->
            <div class="img-container w-64 mx-auto flex items-center justify-center">
              <img :src="dataImgnew" alt="img" class="image-fit" />
            </div>

            <!-- Image upload Buttons -->
            <div class="mb-5">
              <input
                type="file"
                class="hidden"
                ref="updateImgInputnew"
                @change="updateCurrImge"
                accept="image/*"
              />
              <vs-button
                class="mb-base mr-3"
                color="danger"
                @click="$refs.updateImgInputnew.click()"
                size="large"
              >
                Update Image</vs-button
              >
              <vs-button
                color="primary"
                class="mb-base mr-3"
                @click="removeChatIcon"
                size="large"
                >Remove Image</vs-button
              >
            </div>
          </template>
          <div class="vx-col w-full mb-2">
            <div class="upload-img" v-if="!dataImgnew">
              <input
                type="file"
                class="hidden"
                ref="updateImgInputnew"
                @change="updateCurrImge"
                accept="image/*"
              />
              <vs-button
                @click="$refs.updateImgInputnew.click()"
                icon-pack="feather"
                icon="icon icon-upload"
                >Chat Icon</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
      <vx-card class="mt-5" title="Upload User Avatar">
        <div class="vx-row">
          <template v-if="dataImgavatar">
            <!-- Image Container -->
            <div class="img-container w-64 mx-auto flex items-center justify-center">
              <img :src="dataImgavatar" alt="img" class="image-fit" />
            </div>

            <!-- Image upload Buttons -->
            <div class="mb-5">
              <input
                type="file"
                class="hidden"
                ref="updateImgInputnewvalue"
                @change="updateCurrImges"
                accept="image/*"
              />
              <vs-button
                class="mr-3"
                color="danger"
                @click="$refs.updateImgInputnewvalue.click()"
                size="large"
                >Update Image</vs-button
              >
              <vs-button color="primary" @click="removeAvatarIcon" size="large"
                >Remove Image</vs-button
              >
            </div>
          </template>
          <div class="vx-col w-full mb-2">
            <div class="upload-img" v-if="!dataImgavatar">
              <input
                type="file"
                class="hidden"
                ref="updateImgInputnewvalue"
                @change="updateCurrImges"
                accept="image/*"
              />
              <vs-button
                @click="$refs.updateImgInputnewvalue.click()"
                icon-pack="feather"
                icon="icon icon-upload"
                >User Avatar</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
      <vx-card class="mt-5" title="Upload Background Image">
        <div class="vx-row">
          <template v-if="dataImgnewbackground">
            <!-- Image Container -->
            <div class="img-container w-64 mx-auto flex items-center justify-center">
              <img :src="dataImgnewbackground" alt="img" class="image-fit" />
            </div>

            <!-- Image upload Buttons -->
            <div class="mb-5">
              <input
                type="file"
                class="hidden"
                ref="updateImgInputnewbackground"
                @change="updateCurrImgebackground"
                accept="image/*"
              />
              <vs-button
                class="mb-base mr-3"
                color="danger"
                @click="$refs.updateImgInputnewbackground.click()"
                size="large"
              >
                Update Image</vs-button
              >
              <vs-button
                color="primary"
                class="mb-base mr-3"
                @click="removeBackImageIcon"
                size="large"
                >Remove Image</vs-button
              >
            </div>
          </template>
          <div class="vx-col w-full mb-2">
            <div class="upload-img mt-5" v-if="!dataImgnewbackground">
              <input
                type="file"
                class="hidden"
                ref="updateImgInputnewbackground"
                @change="updateCurrImgebackground"
                accept="image/*"
              />
              <vs-button
                @click="$refs.updateImgInputnewbackground.click()"
                icon-pack="feather"
                icon="icon icon-upload"
                >Background Image</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
      <vx-card class="mt-5" title="Upload Popup Icon">
        <div class="vx-row">
          <template v-if="dataPopupIcon">
            <!-- Image Container -->
            <div class="img-container w-64 mx-auto flex items-center justify-center">
              <img :src="dataPopupIcon" alt="img" class="image-fit" />
            </div>

            <!-- Image upload Buttons -->
            <div class="mb-5">
              <input
                type="file"
                class="hidden"
                ref="updatePopupImage"
                @change="updatePopupImage"
                accept="image/*"
              />
              <vs-button
                class="mb-base mr-3"
                color="danger"
                @click="$refs.updatePopupImage.click()"
                size="large"
              >
                Update Image</vs-button
              >
              <vs-button
                color="primary"
                class="mb-base mr-3"
                @click="removePopupImage"
                size="large"
                >Remove Image</vs-button
              >
            </div>
          </template>
          <div class="vx-col w-full mb-2">
            <div class="upload-img mt-5" v-if="!dataPopupIcon">
              <input
                type="file"
                class="hidden"
                ref="updatePopupImage"
                @change="updatePopupImage"
                accept="image/*"
              />
              <vs-button
                @click="$refs.updatePopupImage.click()"
                icon-pack="feather"
                icon="icon icon-upload"
                >Background Image</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import vSelect from "vue-select";
import Prism from "vue-prism-component";
import FontPicker from "font-picker-vue";
import { Base_URL } from "../../../api.config";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    chatbotheading: {
      required: "Please enter chatbot heading.",
      max: "Chatbot heading may not be greater than 14 characters.",
    },
    bot_name: {
      required: "Please enter chatbot name.",
    },
    ui_Color: {
      required: "Please select chatbot UI color.",
    },
    select_font: {
      required: "Please select font.",
    },
  },
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      bot_name: "",
      uiColor: "#def1d1",
      chatbotheading: "",
      dataImgnewbackground: null,
      rowdata: [],
      newsentence: [],
      chatbotname: "",
      chatbotnamenew: "",
      Color: "",
      selectedFiled: null,
      selectedFile: null,
      rdf: "",
      name: "",
      entitycard: "",
      dataImg: null,
      dataImgnew: null,
      dataImgavatar: null,
      focused_font: "",
      selectedDuration: "",
      activecolor: "red",
      dataPopupIcon: "",
      images: [
        {
          url: "../../assets/images/logo/logo.png",
          name: "My Image 1",
        },
      ],

      items: [
        {
          image: false,
        },
      ],
      durations: [
        {
          durationCode: "Pacifico,sans-serif",
        },
        {
          durationCode: "Dancing Script,sans-serif",
        },
        {
          durationCode: "Arial,sans-serif",
        },
        {
          durationCode: "Helvetica ,sans-serif",
        },
        {
          durationCode: "Proza Libre, sans-serif",
        },
        {
          durationCode: "Optima",
        },
        {
          durationCode: "Trebuchet",
        },
        {
          durationCode: "Impact , sans-serif",
        },
        {
          durationCode: "Times New Roman",
        },
        {
          durationCode: "Noto Sans",
        },
        {
          durationCode: "Didot",
        },
        {
          durationCode: "Roboto, sans-serif",
        },

        {
          durationCode: "Shadows Into Light",
        },
        {
          durationCode: "Titillium Web, sans-serif",
        },
        {
          durationCode: "Lobster",
        },
        {
          durationCode: "Anton",
        },
        {
          durationCode: "Indie Flower",
        },
        {
          durationCode: "Charmonman",
        },
        {
          durationCode: "Kodchasan",
        },
        {
          durationCode: "Notable",
        },
        {
          durationCode: "Mali",
        },
        {
          durationCode: "Srisakdi",
        },

        {
          durationCode: "Slabo 27px",
        },
        {
          durationCode: "Segoe Print",
        },
        {
          durationCode: "MingLiU-ExtB",
        },
        {
          durationCode: "Gabriola",
        },
      ],
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.chatbotheading !== "";
    },
  },
  components: {
    "v-select": vSelect,
    Prism,
  },
  mounted() {
    if (localStorage.chatbot_id !== null && localStorage.chatbot_id !== undefined) {
      this.getReloadData();
    }
  },
  methods: {
    getReloadData() {
      axios
        .post(Base_URL.Actual_URL + "chatboticonreload", {
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          if (this.rowdata.length > 0) {
            this.bot_name = this.rowdata[0].bot_name;
            this.chatbotheading = this.rowdata[0].chatbotheading;
            this.selectedDuration = this.rowdata[0].fontname;
            this.uiColor = this.rowdata[0].chatbotuicolor;
          }
          if (this.rowdata.length > 0) {
            var st = this.rowdata[0].botimagepath;

            this.dataImg = `${st}`;

            var sy = this.rowdata[0].chatboticonpath;

            this.dataImgnew = `${sy}`;

            var sj = this.rowdata[0].useravtarpath;

            this.dataImgavatar = `${sj}`;

            var se = this.rowdata[0].backgroundiconpath;

            this.dataImgnewbackground = `${se}`;

            var popupIcon = this.rowdata[0].popup_icon_path;
            this.dataPopupIcon = `${popupIcon}`;
          }
        });
    },
    updatePopupImage(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataPopupIcon = e.target.result;
          axios.post(Base_URL.Actual_URL + "uploadpopup_icon", {
            image: this.dataPopupIcon,
            company_id: localStorage.company_id,
            imagename: input.target.files[0].name,
            bot: "popupIcon",
            chatbot_id: localStorage.chatbot_id,
          });
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    },
    removePopupImage() {
      console.log(this.dataPopupIcon);
      var filename = this.dataPopupIcon.substring(
        this.dataPopupIcon.lastIndexOf("/") + 1
      );
      console.log(filename, "namee");

      if (filename == "botAvatar.png") {
        this.$vs.notify({
          color: "warning",
          // title: "Delete Record",
          title: "Default images can not be deleted.",
          position: "top-center",
        });
      } else {
        axios
          .post(Base_URL.Actual_URL + "deletepopupicon", {
            idx: this.rowdata[0].id,
          })
          .then((response) => {
            this.dataPopupIcon = null;
            this.$vs.notify({
              color: "danger",
              title: "Delete Record",
              text: "The selected Record was successfully deleted",
              position: "top-center",
            });
          });
      }
    },
    removeBotIcon() {
      var filename = this.dataImg.substring(this.dataImg.lastIndexOf("/") + 1);

      if (filename == "sara_avatar.png") {
        this.$vs.notify({
          color: "warning",
          // title: "Delete Record",
          title: "Default images can not be deleted.",
          position: "top-center",
        });
      } else {
        axios
          .post(Base_URL.Actual_URL + "deleteboticon", {
            idx: this.rowdata[0].id,
          })
          .then((response) => {
            this.dataImg = null;
            this.$vs.notify({
              color: "danger",
              title: "Delete Record",
              text: "The selected Record was successfully deleted",
              position: "top-center",
            });
          });
      }
    },
    removeChatIcon() {
      var filename = this.dataImgnew.substring(this.dataImgnew.lastIndexOf("/") + 1);

      if (filename == "logoimag.png") {
        this.$vs.notify({
          color: "warning",
          // title: "Delete Record",
          title: "Default images can not be deleted.",
          position: "top-center",
        });
      } else {
        axios
          .post(Base_URL.Actual_URL + "deletelogo", {
            idx: this.rowdata[0].id,
          })
          .then((response) => {
            this.dataImgnew = null;
            this.$vs.notify({
              color: "danger",
              title: "Delete Record",
              text: "The selected Record was successfully deleted",
              position: "top-center",
            });
          });
      }
    },
    removeAvatarIcon() {
      var filename = this.dataImgavatar.substring(
        this.dataImgavatar.lastIndexOf("/") + 1
      );
      if (filename == "userAvatar.jpg") {
        this.$vs.notify({
          color: "warning",
          // title: "Delete Record",
          title: "Default images can not be deleted.",
          position: "top-center",
        });
      } else {
        axios
          .post(Base_URL.Actual_URL + "deleteusericon", {
            idx: this.rowdata[0].id,
          })
          .then((response) => {
            this.dataImgavatar = null;
            this.$vs.notify({
              color: "danger",
              title: "Delete Record",
              text: "The selected Record was successfully deleted",
              position: "top-center",
            });
          });
      }
    },
    removeBackImageIcon() {
      var filename = this.dataImgnewbackground.substring(
        this.dataImgnewbackground.lastIndexOf("/") + 1
      );

      if (filename == "bg.png") {
        this.$vs.notify({
          color: "warning",
          // title: "Delete Record",
          title: "Default images can not be deleted.",
          position: "top-center",
        });
      } else {
        axios
          .post(Base_URL.Actual_URL + "deletebckgrundimage", {
            idx: this.rowdata[0].id,
          })
          .then((response) => {
            this.dataImgnewbackground = null;
            this.$vs.notify({
              color: "danger",
              // title: "Delete Record",
              title: "The selected Record was successfully deleted",
              position: "top-center",
            });
          });
      }
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImg = e.target.result;
          var chatbotname = localStorage.getItem("chatbotname");
          axios
            .post(Base_URL.Actual_URL + "uploadboticon", {
              image: this.dataImg,
              company_id: localStorage.company_id,
              imagename: input.target.files[0].name,
              bot: "botIcon",
              chatbot_id: localStorage.chatbot_id,
            })
            .then((response) => {
              //   this.result = response.data.result;
              //   if (response.data.code == 200) {
              //     this.$router.push({
              //       name: "alluser",
              //     });
              //     // timeInterval = setInterval(function () {
              //     //   //window.location.href = '/AllUser'
              //     //   this.$vs.loading();
              //     //   setTimeout(() => {
              //     //     this.$vs.loading.close();
              //     //   }, 200);
              //     // }, 1200);
              //   }
            });
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    },
    updateCurrImge(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImgnew = e.target.result;
          axios.post(Base_URL.Actual_URL + "chatbotIconimage", {
            image: this.dataImgnew,
            company_id: localStorage.company_id,
            imagename: input.target.files[0].name,
            bot: "chatbotIcon",
            chatbot_id: localStorage.chatbot_id,
          });
        };

        reader.readAsDataURL(input.target.files[0]);
      }
    },

    updateCurrImges(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImgavatar = e.target.result;
          axios.post(Base_URL.Actual_URL + "newuserdataimage", {
            image: this.dataImgavatar,
            company_id: localStorage.company_id,
            imagename: input.target.files[0].name,
            bot: "useravatar",
            chatbot_id: localStorage.chatbot_id,
          });
        };

        reader.readAsDataURL(input.target.files[0]);
      }
    },
    updateCurrImgebackground(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImgnewbackground = e.target.result;

          var chatbotname = localStorage.getItem("chatbotname");
          axios.post(Base_URL.Actual_URL + "newbackgrounddata", {
            image: this.dataImgnewbackground,
            company_id: localStorage.company_id,
            imagename: input.target.files[0].name,
            bot: "backgroundimage",
            chatbot_id: localStorage.chatbot_id,
          });
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    },

    changeColor(colorx, whatColor) {
      localStorage.setItem("color", colorx);

      this.$vs.theme({
        [whatColor]: colorx,
      });
    },
    chatbotui() {
      // var color = localStorage.getItem("color");
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios
            .post(Base_URL.Actual_URL + "chatbotui", {
              color: localStorage.getItem("color") || this.uiColor,
              company_id: localStorage.company_id,
              chatbotheading: this.chatbotheading,
              fontname: this.selectedDuration.durationCode || this.selectedDuration,
              chatbot_id: localStorage.chatbot_id,
              bot_name: this.bot_name,
            })
            .then((response) => {
              if (response.status == 200) {
                this.$vs.notify({
                  color: "success",
                  title: "UI data Added.",
                  text: "Chatbot UI data added successfully",
                  position: "top-center",
                });
                this.uiColor = "#def1d1";
                this.chatbotheading = "";
                this.selectedDuration = "";
                this.bot_name = "";
                this.entitycard = response.data.result;
              }
              this.getReloadData();

              //     else {
              //  this.$vs.notify({
              //         color: "danger",
              //         title: "UI data Added.",
              //         text: "Chatbot UI data added successfully",
              //         position: "top-center",
              //       });
              //     }
            });
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
.colorprimaryx {
  background: rgb(var(--vs-primary)) !important;
}
.demo-alignment li:hover {
  transform: translate(0, 8px);
  box-shadow: 0px 0px 40px -10px rgba(255, 255, 255, 0) !important;
}

.colorsuccessx {
  background: rgb(var(--vs-success)) !important;
}

.colordangerx {
  background: rgb(var(--vs-danger)) !important;
}

.colorwarningx {
  background: rgb(var(--vs-warning)) !important;
}

.colordarkx {
  background: rgb(var(--vs-dark)) !important;
}
</style>
