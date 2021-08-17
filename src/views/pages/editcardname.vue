<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Card">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Response Name</h6>
            <v-select
              class="w-full"
              label="responsename"
              :options="responseData"
              v-model="rowdata[0].responsename"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="response_name"
            >
            </v-select>
            <span class="text-danger text-sm"> {{ errors.first("response_name") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Button Title</h6>
            <vs-input
              class="w-full"
              v-model="rowdata[0].title"
              name="btn_title"
              v-validate="'required'"
              data-vv-validate-on="blur"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            ></vs-input>
            <span class="text-danger text-sm"> {{ errors.first("btn_title") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Card Name</h6>

            <vs-input
              class="w-full"
              v-model="rowdata[0].card_title"
              name="cardname"
              v-validate="'required'"
              data-vv-validate-on="blur"
            ></vs-input>
            <span class="text-danger text-sm"> {{ errors.first("cardname") }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Description Card</h6>
            <vs-input
              class="w-full"
              v-model="rowdata[0].description"
              name="description"
              v-validate="'required'"
              data-vv-validate-on="blur"
            ></vs-input>
            <span class="text-danger text-sm"> {{ errors.first("description") }}</span>
          </div>

          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Intent</h6>

            <v-select
              class="w-full"
              label="intent"
              :options="intentData"
              v-model="rowdata[0].intent"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="intent"
            >
            </v-select>
            <span class="text-danger text-sm"> {{ errors.first("intent") }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Entity Key</h6>
            <v-select
              class="w-full"
              label="Entitykey"
              :options="entityData"
              @input="RefreshGrid"
              v-model="rowdata[0].entitykey"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              name="entity_key"
            />
            <span class="text-danger text-sm"> {{ errors.first("entity_key") }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Entity Value</h6>
            <v-select
              class="w-full"
              label="Entityvalue"
              :options="entitycard"
              v-model="rowdata[0].entityvalue"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="{ required: rowdata[0].entitykey !== '' }"
              name="entity_value"
            />
            <span class="text-danger text-sm">{{ errors.first("entity_value") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Button 2 Title</h6>
            <vs-input
              class="w-full"
              v-model="rowdata[0].title_2"
              name="title2"
              data-vv-validate-on="blur"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            ></vs-input>
            <span class="text-danger text-sm"> {{ errors.first("title2") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Button 2 Payload</h6>
            <vs-input
              class="w-full"
              v-model="rowdata[0].payload_2"
              name="Payload"
              data-vv-validate-on="blur"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            ></vs-input>
            <span class="text-danger text-sm"> {{ errors.first("Payload") }}</span>
          </div>

          <div class="vx-row">
            <div class="vx-col sm:w-1/3 w-full ml-4">
              <div class="img-container w-64 flex items-center justify-center">
                <img :src="rowdata[0].image_path" alt="img" class="responsive mt-3" />
              </div>
              <div class="vx-col sm:w-1/3 w-full"></div>
              <!-- <template v-if="dataImgnewbackground">
                <div
                  class="img-container w-64 mx-auto flex items-center justify-center"
                >
                  <img
                    :src="dataImgnewbackground"
                    alt="img"
                    class="responsive mt-10"
                  />
                </div>
                <div class="mt-5">
                  <input
                    type="file"
                    class="hidden mt-4"
                    ref="updateImgInputnewbackground"
                    @change="addEvent5"
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
                    @click="dataImgnewbackground = null"
                    size="large"
                    >Remove Image</vs-button
                  >
                </div>
              </template> -->
            </div>
            <div class="vx-col w-full mb-2 ml-4">
              <div class="upload-img mt-5">
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  ref="updateImgInputnewbackground"
                  accept="image/*"
                  v-validate="{ required: this.rowdata[0].image_path == null }"
                  name="cardimage"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                />
                <vs-button
                  @click="$refs.updateImgInputnewbackground.click()"
                  icon-pack="feather"
                  icon="icon icon-upload"
                  >Card Image</vs-button
                >
                <span class="text-danger text-sm"> {{ errors.first("cardimage") }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="vx-col sm:w-1/3 w-full contained-example-container pt-2 pb-2">
          <div id="div-with-loading" class="vs-con-loading__container">
            <vs-button class="mr-3 mt-4" @click="addEvent5">Update</vs-button>
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
import { Validator } from "vee-validate";

const dict = {
  custom: {
    cardname: {
      required: "Please enter card name.",
    },
    description: {
      required: "Please enter description",
    },
    cardimage: {
      required: "Please select card image",
    },
    entity_value: {
      required: "Please select entity value",
    },
    entity_key: {
      required: "Please select entity key",
    },
    intent: {
      required: "Please select intent",
    },
    response_name: {
      required: "Please select response name",
    },
    btn_title: {
      required: "Please enter button title",
    },
    title2: {
      required: "Please enter button 2 title",
    },
    Payload: {
      required: "Please enter button 2 payload",
    },
  },
};
Validator.localize("en", dict);
var responsename;
export default {
  name: "card-component",
  data() {
    return {
      Payload: "",
      title: "",
      rowdata: [],
      name: "",
      responsename: "",
      title: "",
      namecard: "",
      Imagecard: "",
      descriptioncard: "",
      respponsename: "",
      assignentitycard: "",
      assignintentcard: "",
      assignentityvaluecard: "",
      dataImgnewbackground: null,
      newsentence: [],
      entitycard: [],
      responseData: [],
      intentData: [],
      entityData: [],
      selectedfilePath: "",
      file1: "",
    };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    validatecard() {
      return (
        !this.errors.any() &&
        this.namecard !== "" &&
        this.descriptioncard !== "" &&
        this.assignintentcard !== ""
      );
    },
  },
  mounted() {
    this.getDropdownsData();
    this.getEditCardData();
  },
  created() {
    this.getDropdownsData();
  },
  methods: {
    getEditCardData() {
      axios
        .get(Base_URL.Actual_URL + "editcardname/" + this.$route.params.id)
        .then((response) => {
          this.rowdata = response.data.card_list;
          this.selectedfilePath = this.rowdata[0].image_path;
        });
    },
    getDropdownsData() {
      this.chatbotname = localStorage.getItem("chatbotname");
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "entityintentcard", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.responseData = response.data.response1;
          this.intentData = response.data.userlist;
          this.entityData = response.data.sentence;
        });
    },
    updateRecord: function (index) {
      this.$router.push({
        name: "editcardname",
        params: { id: index },
      });
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "deletecard", {
          delete: 1,
          idx: idx,
        })
        .then((res) => {
          this.getCardList();
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
    RefreshGrid: function (e) {
      if (e !== null) {
        var newemail = localStorage.getItem("email");
        var chatbot_id = localStorage.getItem("chatbot_id");
        axios
          .post(Base_URL.Actual_URL + "entityvalue", {
            chatbot_id: chatbot_id,
            company_id: localStorage.company_id,
            entity_key: e.Entitykey,
          })
          .then((response) => {
            this.entitycard = response.data.entity;
            this.rowdata[0].entityvalue = "";
          });
      } else {
        this.rowdata[0].entityvalue = "";
        this.rowdata[0].entitykey = "";
        this.entitycard = [];
      }
    },
    handleFileUpload() {
      this.file1 = this.$refs.updateImgInputnewbackground.files[0];
      this.selectedfile = this.$refs.updateImgInputnewbackground.files[0].name;
      this.selectedfilePath = this.selectedfile;
      this.createBase64Image(this.file1);
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

    addEvent5() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$vs.loading({
            container: "#div-with-loading",
            scale: 0.6,
          });
          var newemail = localStorage.getItem("email");
          var chatbot_id = localStorage.getItem("chatbot_id");
          var chatbotname = localStorage.getItem("chatbotname");
          var body = {
            chatbotname: chatbotname,
            companyid: localStorage.company_id,
            chatbot_id: chatbot_id,
            title: this.rowdata[0].title,
            card_title: this.rowdata[0].card_title,
            description: this.rowdata[0].description,
            image_path: this.selectedfilePath,
            image_base: this.file1,
            intent: this.rowdata[0].intent.intent || this.rowdata[0].intent,
            entitykey: this.rowdata[0].entitykey.Entitykey || this.rowdata[0].entitykey,
            entityvalue:
              this.rowdata[0].entityvalue.Entityvalue || this.rowdata[0].entityvalue,
            responsename:
              this.rowdata[0].responsename.responsename || this.rowdata[0].responsename,
            title_2: this.rowdata[0].title_2,
            payload_2: this.rowdata[0].payload_2,
          };
          axios
            .post(Base_URL.Actual_URL + "editcardname/" + this.$route.params.id, body)
            .then((response) => {
              setTimeout(() => {
                this.$vs.loading.close("#div-with-loading > .con-vs-loading");
              }, 500);
              if (response.data.code == 200) {
                this.$router.push({
                  name: "botTemplate",
                  params: { name: "card" },
                });
                this.$emit("selectedComponent", "cardEvent");
                this.$vs.notify({
                  color: "success",
                  title: "Card data added.",
                  text: "Card data was successfully added",
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
<style scoped>
/* span.vs__selected {
    display: inline-block !important;
    width: 25rem !important;
} */
</style>
