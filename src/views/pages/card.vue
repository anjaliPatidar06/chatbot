
<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Card">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Response Name</h6>
            <v-select
              class="w-full"
              label="responsename"
              :options="responsedata"
              v-model="responsename"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="response_name"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("response_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Button Title</h6>
            <vs-input
              class="w-full"
              v-model="title"
              name="btn_title"
              v-validate="'required'"
              data-vv-validate-on="blur"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            ></vs-input>
            <span class="text-danger text-sm">
              {{ errors.first("btn_title") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Card Name</h6>

                <vs-input
              class="w-full"
              v-model="namecard"
              name="cardname"
              v-validate="'required'"
              data-vv-validate-on="blur"
            ></vs-input>
            <span class="text-danger text-sm">
              {{ errors.first("cardname") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Description Card</h6>
            <vs-input
              class="w-full"
              v-model="descriptioncard"
              name="description"
              v-validate="'required'"
              data-vv-validate-on="blur"
            ></vs-input>
            <span class="text-danger text-sm">
              {{ errors.first("description") }}</span
            >
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Intent</h6>

            <v-select
              class="w-full"
              label="intent"
              :options="rowdata"
              v-model="assignintentcard"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="intent"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("intent") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Entity Key</h6>
            <v-select
              class="w-full"
              label="Entitykey"
              :options="newsentence"
              @input="RefreshGrid"
              v-model="assignentitycard"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="{ required: assignentityvaluecard !== '' }"
              name="entity_key"
            />
            <span class="text-danger text-sm">
              {{ errors.first("entity_key") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Entity Value</h6>
            <v-select
              class="w-full"
              label="Entityvalue"
              :options="entitycard"
              v-model="assignentityvaluecard"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="{ required: assignentitycard !== '' }"
              name="entity_value"
            />
            <span class="text-danger text-sm">{{
              errors.first("entity_value")
            }}</span>
          </div>
             <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Button 2 Title</h6>
            <vs-input
              class="w-full"
              v-model="title2"
              name="title2"
              v-validate="'required'"
              data-vv-validate-on="blur"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            ></vs-input>
            <span class="text-danger text-sm">
              {{ errors.first("title2") }}</span
            >
          </div>
           <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Button 2 Payload</h6>
            <vs-input
              class="w-full"
              v-model="Payload"
              name="Payload"
              v-validate="'required'"
              data-vv-validate-on="blur"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            ></vs-input>
            <span class="text-danger text-sm">
              {{ errors.first("Payload") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <div class="vx-row">
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
              <div class="vx-col w-full mb-2">
                <div class="upload-img mt-5" v-if="!dataImgnewbackground">
                  <input
                    type="file"
                    class="hidden"
                    @change="handleFileUpload"
                    ref="updateImgInputnewbackground"
                    accept="image/*"
                    v-validate="'required'"
                    name="cardimage"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />
                  <vs-button
                    @click="$refs.updateImgInputnewbackground.click()"
                    icon-pack="feather"
                    icon="icon icon-upload"
                    >Card Image</vs-button
                  >
                  <span class="text-danger text-sm">
                    {{ errors.first("cardimage") }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="vx-col sm:w-1/3 w-full">
          <vs-button class="mr-3 mt-4" @click="addEvent5">Submit</vs-button>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Card Table" search>
        <vs-table search max-items="10" pagination :data="buttonnew">
          <template slot="thead">
            <vs-th>Response Name</vs-th>
            <vs-th>Card Name</vs-th>
            <vs-th>Description</vs-th>
            <vs-th>Button Title</vs-th>
            <vs-th>Intent </vs-th>
            <vs-th>Entity Key</vs-th>
            <vs-th>Entity Value</vs-th>
            <vs-th>Button 2 Title</vs-th>
            <vs-th>Button 2 Payload</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.responsename">
                {{ tr.responsename }}
              </vs-td>
              <vs-td :data="tr.namecard">
                {{ tr.namecard }}
              </vs-td>
              <vs-td :data="tr.descriptioncard">
                {{ tr.descriptioncard }}
              </vs-td>
              <vs-td :data="tr.title">
                {{ tr.title }}
              </vs-td>
              <vs-td :data="tr.intent">
                {{ tr.intent }}
              </vs-td>
              <vs-td :data="tr.entitykey">
                {{ tr.entitykey }}
              </vs-td>
              <vs-td :data="tr.entityvalue">
                {{ tr.entityvalue }}
              </vs-td>
              <vs-td :data="tr.title_2">
                {{tr.title_2}}
              </vs-td>
              <vs-td :data="tr.payload_2">
                {{tr.payload_2}}
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
    }
};
Validator.localize("en", dict);
var responsename;
export default {
  name: "card-component",
  data() {
    return {
      Payload:'',
      title:"",
      rowdata: [],
      name: "",
      responsename:"",
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
      responsedata: [],
      message: "",
      company: "",
      selectcategory: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      selectedCountry: "",
      selectedCountry1: "",
      selectedfile: "",
      buttonnew: [],
      chatbotname: "",
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
    this.getCardList();
  },
  methods: {
    getCardList() {
      this.chatbotname = localStorage.getItem("chatbotname");
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "entityintentcard", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.newsentence = response.data.sentence;
          this.responsedata = response.data.response1;
          this.buttonnew = response.data.button;
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
        });
      } else {
        this.assignentityvaluecard = "";
        this.assignentitycard = "";
        this.entitycard = "";
      }
    },
    handleFileUpload() {
      this.file1 = this.$refs.updateImgInputnewbackground.files[0];
      this.selectedfile = this.$refs.updateImgInputnewbackground.files[0].name;

      this.createBase64Image(this.file1);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.file1 = e.target.result;
      };
    },
    addEvent5() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const reader = new FileReader();
          var newemail = localStorage.getItem("email");
          var chatbot_id = localStorage.getItem("chatbot_id");
          var chatbotname = localStorage.getItem("chatbotname");
          var body = {
            chatbotname: chatbotname,
            imagename: this.selectedfile,
            company_id: localStorage.company_id,
            chatbot_id: chatbot_id,
            bot: "bot",
            image: this.file1,
            title: this.title,
            label: this.namecard,
            description: this.descriptioncard,
            intent: this.assignintentcard.intent,
            entity_key:
              this.assignentitycard.Entitykey || this.assignentitycard,
            entity_value:
              this.assignentityvaluecard.Entityvalue ||
              this.assignentityvaluecard,
            addresponse: this.responsename.responsename,
            title_2: this.title2,
            payload_2 : this.Payload
          };
          axios
            .post(Base_URL.Actual_URL + "cardvalue", body)
            .then((response) => {
              if (response.data.code == 100) {
                this.message = response.data.message;
                this.getCardList();
                this.$emit('updateCardComponent')
                this.$vs.notify({
                  color: "success",
                  title: "Card data added.",
                  text: "Card data was successfully added",
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

