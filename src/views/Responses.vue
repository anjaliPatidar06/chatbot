
<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Response">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Response name</h6>
            <vs-input
              class="w-full"
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="response_name"
              v-model="createresponse"
            />
            <span class="text-danger text-sm">{{
              errors.first("response_name")
            }}</span>
          </div>

          <div class="vx-col sm:w-1/2 mb-2 ml-4">
            <h6 class="ml-1">Response Text</h6>
            <div class="vx-row ml-2">
              <div id="editor1" contenteditable class="sm:w-1/2" @input="checkError">
                <!-- <span  style="border-radius:0">
          </span> -->
              </div>

              <div class="sm:w-1/2">
                <vs-button
                  @click="showEmojiContainer"
                  style="border-radius: 0"
                  v-if="!showEmojis"
                >
                  <i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>
                </vs-button>
                <vs-button
                  @click="closeEmojiContainer"
                  style="border-radius: 0"
                  v-if="showEmojis"
                >
                  <i class="fa fa-chevron-down" aria-hidden="true"></i>
                </vs-button>

                <vs-button @click="makeBold('editor1')" style="border-radius: 0"
                  ><i class="fa fa-bold fa-lg" aria-hidden="true"></i
                ></vs-button>
                <vs-button
                  @click="makeItalic('editor1')"
                  style="
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  "
                  ><i class="fa fa-italic fa-lg" aria-hidden="true"></i
                ></vs-button>
                <!-- <span
                    class="input-group-text"
                    @click="showEmojiContainer"
                    v-if="!showEmojis"
                  >
                    <i class="fa fa-smile-o pt-4" aria-hidden="true"></i>
                  </span>
                  <span
                    class="input-group-text"
                    @click="closeEmojiContainer"
                    v-if="showEmojis"
                  >
                    <i class="fa fa-chevron-down pt-4" aria-hidden="true"></i>
                  </span> -->
              </div>
              <VEmojiPicker
                @select="selectEmoji"
                v-if="showEmojis"
                :showSearch="true"
                emojisByRow="8"
                :dark="false"
              />
            </div>
            <!-- <vx-input-group>
              <vs-input
                class="w-full"
                v-validate="'required'"
                data-vv-validate-on="blur"
                name="addresponse"
                v-model="addresponse"
                icon-pack="feather"
                icon="icon-smile"
              />
              <template slot="prepend">
                <div
                  class="append-text bg-primary"
                  style="
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                  "
                >
                  <span
                    class="input-group-text"
                    @click="showEmojiContainer"
                    v-if="!showEmojis"
                  >
                    <i class="fa fa-smile-o pt-4" aria-hidden="true"></i>
                  </span>
                  <span
                    class="input-group-text"
                    @click="closeEmojiContainer"
                    v-if="showEmojis"
                  >
                    <i class="fa fa-chevron-down pt-4" aria-hidden="true"></i>
                  </span>
                </div>
                <div
                  class="append-text bg-primary"
                  style="
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  "
                >
                  <span class="input-group-text" @click="closeEmojiContainer">
                    <i class="fa fa-bold pt-4" aria-hidden="true"></i
                  ></span>
                </div>
              </template>
            </vx-input-group>
            <VEmojiPicker
              @select="selectEmoji"
              v-if="showEmojis"
              :showSearch="true"
              emojisByRow="8"
              :dark="false"
            /> -->
            <span class="text-danger text-sm" v-if="response_error == true">Please enter response text.</span>
          </div>
          <!-- <div class="vx-col sm:w-1/3 w-full">
            <h6 style="color: red">Add multiple text for this response</h6>

            <vs-input
              class="w-full"
              placeholder="Optional : Add multiple text"
              v-model="addresponse1"
            />
          </div> -->
           <div class="vx-col sm:w-1/2 w-full mb-2 ml-1" :data="rowdata">
            <h6>Mutiple Response Text</h6>
            <!-- <vs-input
              class="w-full"
              name="Response Text"
              v-model="rowdata[0].textnew"
            /> -->
            <div class="vx-row ml-1">
              <div
                id="editor2"
                contenteditable
                class="sm:w-1/2"
              ></div>

              <div class="sm:w-1/2">
                <vs-button
                  @click="showEmojiContainer2"
                  style="border-radius: 0"
                  v-if="!showEmojis2"
                >
                  <i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>
                </vs-button>
                <vs-button
                  @click="closeEmojiContainer2"
                  style="border-radius: 0"
                  v-if="showEmojis2"
                >
                  <i class="fa fa-chevron-down" aria-hidden="true"></i>
                </vs-button>

                <vs-button @click="makeBold2('editor2')" style="border-radius: 0"
                  ><i class="fa fa-bold fa-lg" aria-hidden="true"></i
                ></vs-button>
                <vs-button
                  @click="makeItalic2('editor2')"
                  style="
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  "
                  ><i class="fa fa-italic fa-lg" aria-hidden="true"></i
                ></vs-button>
              </div>
            </div>
            <!-- <span class="text-danger text-sm">{{
              errors.first("response_text")
            }}</span> -->
            <VEmojiPicker
              @select="selectEmoji2"
              v-if="showEmojis2"
              :showSearch="true"
              emojisByRow="8"
              :dark="false"
            />
          </div>
        </div>

        <div class="row">
          <div class="vx-col sm:w-1/3 w-full">
            <vs-button class="mr-3 mt-4" @click="SubmitResponse"
              >Submit</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Response Table">
        <vs-table search max-items="10" pagination :data="responsedata">
          <template slot="thead">
            <vs-th style="width: 30%"> Response Name</vs-th>
            <vs-th style="width: 30%"> Response Text</vs-th>
            <vs-th style="width: 30%">Multiple Response Text</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.responsename">
                {{ tr.responsename }}
              </vs-td>

              <vs-td :data="tr.text" v-html="tr.text">
              </vs-td>

              <vs-td :data="tr.textnew" v-html="tr.textnew">
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
import Vue from "vue";
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import axios from "axios";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import moduleCalendar from "@/store/calendar/moduleCalendar.js";
require("vue-simple-calendar/static/css/default.css");

import Datepicker from "vuejs-datepicker";
import { en, he } from "vuejs-datepicker/src/locale";
import { Base_URL } from "./../../api.config";
import { Validator } from "vee-validate";
import { VEmojiPicker } from "v-emoji-picker";
const dict = {
  custom: {
    response_name: {
      required: "Please enter response name",
      alpha: "Your first name may only contain alphabetic characters",
    },
    addresponse: {
      required: "Please enter response text",
    },
  },
};
Validator.localize("en", dict);

axios;
export default {
  name: "response",
  data() {
    return {
      response_error:false,
      inputs: [
        {
          name: "",
        },
      ],
      createresponse: "",
      addresponse: "",
      addresponse1: "",
      activePromptAddEvent1: false,
      activePromptAddEvent2: false,
      activePromptAddEvent3: false,
      activePromptAddEvent4: false,
      activePromptAddEvent5: false,

      chatbotname: "",

      descriptioncard: "",
      titlecollapsible: "",
      Descriptioncollapsible: "",
      namecard: "",
      Imagecard: "",
      descriptioncard: "",
      assignentitycard: "",
      assignintentcard: "",
      assignentityvaluecard: "",
      rowdata: [],
      newsentence: [],
      entitycard: [],
      responsedata: [],
      message: "",
      showEmojis: false,
      showEmojis2: false
    };
  },
  mounted() {
    this.getEntityIntent();
  },

  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.title !== "" &&
        this.assignintent !== "" &&
        this.assignentityvalue !== "" &&
        this.assignentity !== ""
      );
    },
    validateForms() {
      return (
        !this.errors.any() &&
        this.label !== "" &&
        this.assignentitydropdown !== "" &&
        this.assignintentdropdown !== "" &&
        this.assignentityvaluedropdown !== ""
      );
    },
    validateName() {
      return (
        !this.errors.any() &&
        this.titlequickreplies !== "" &&
        this.assignentityvaluequickreplies !== "" &&
        this.assignentityquickreplies !== "" &&
        this.assignintentquickreplies !== ""
      );
    },
    validateNames() {
      return (
        !this.errors.any() &&
        this.titlecollapsible !== "" &&
        this.Descriptioncollapsible !== ""
      );
    },
    validatecard() {
      return (
        !this.errors.any() &&
        this.namecard !== "" &&
        this.descriptioncard !== "" &&
        this.Imagecard !== "" &&
        this.assignentitycard !== "" &&
        this.assignintentcard !== "" &&
        this.assignentityvaluecard !== ""
      );
    },
    validateSubmit() {
      return (
        !this.errors.any() &&
        this.addresponse !== "" &&
        this.createresponse !== "" &&
        (this.assignentity !== "" ||
          this.assignintent !== "" ||
          this.assignentityvalue !== "" ||
          this.assignentitydropdown == "" ||
          this.assignentityvaluedropdown !== "" ||
          this.assignintentdropdown !== "" ||
          this.titlequickreplies !== "" ||
          this.title !== "" ||
          this.label !== "" ||
          this.titlecollapsible !== "" ||
          this.Descriptioncollapsible !== "" ||
          this.descriptioncard !== "" ||
          this.Imagecard !== "" ||
          this.namecard !== "" ||
          this.assignentitycard !== "" ||
          this.assignintentcard !== "" ||
          this.assignentityvaluecard !== "")
      );
    },

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
    VEmojiPicker,
  },
  methods: {
    checkError() {
      if(document.getElementById('editor1').innerHTML == '' || document.getElementById('editor1').innerHTML == null) {
        this.response_error = true
      } else {
        this.response_error = false
      }
    },
    selectionIsBold() {
      var isBold = false;
      if (document.queryCommandState) {
        isBold = document.queryCommandState("bold");
      }
      return isBold;
    },
    selectionIsItalic() {
      var isItalic = false;
      if (document.queryCommandState) {
        isItalic = document.queryCommandState("italic");
      }
      return isItalic;
    },
    makeBold2(Id) {
         if (Id == "editor2") {
        var state = document.queryCommandState("bold");
        switch (state) {
          case true:
            break;
          case false:
            break;
          case null:
            break;
        }
        document.execCommand('bold');
      }
    },
    makeBold(Id) {
      if (Id == "editor1") {
        var state = document.queryCommandState("bold");
        switch (state) {
          case true:
            break;
          case false:
            break;
          case null:
            break;
        }
        document.execCommand('bold');
      }
    },
    makeItalic(Id) {
        if (Id == "editor1") {
        var state = document.queryCommandState("italic");
        switch (state) {
          case true:
            break;
          case false:
            break;
          case null:
            break;
        }
        document.execCommand('italic');
      }
    },
    makeItalic2(Id) {
      if (Id == "editor2") {
        var state = document.queryCommandState("italic");
        switch (state) {
          case true:
            break;
          case false:
            break;
          case null:
            break;
        }
        document.execCommand('italic');
      }
    },
    closeEmojiContainer() {
      this.showEmojis = false;
    },
    selectEmoji(emoji) {
      // alert('hey')
      //   var elInput = document.getElementById('editor1')
      //   console.log(elInput,'elInput');
      //   var start = elInput // Record the position of the cursor
      //   var end = elInput // Record the location of the last character of the selected character
      //   if (start === undefined || end === undefined) return
      //   var txt = elInput.value
      //   console.log(txt, 'txt')
      //   var result =
      //     txt.substring(0, start) + emoji.data + txt.substring(end)
      //   elInput.value = result // Assignment to the value of INPUT
      //   elInput.focus()
      //   elInput.selectionStart = start + emoji.data.length
      //   elInput.selectionEnd = start + emoji.data.length
      //   document.getElementById('editor1').innerHTML = result
      //   console.log(document.getElementById('editor1').innerHTML,'console.log')
      var sel, range;
      document.getElementById('editor1').focus();
      if (window.getSelection) {
        // alert('if 1')
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          // alert('if 2')
          range = sel.getRangeAt(0);
          range.deleteContents();
          var el = document.createElement("div");
          el.innerHTML = emoji.data;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);
          if (lastNode) {
            // alert('last node',lastNode)
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            console.log(sel, 'range')
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // alert('else if')
        document.selection.createRange().pasteHTML(emoji.data);
      }
    },
    selectEmoji2(emoji) {
      var sel, range;
      document.getElementById('editor2').focus();
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // non-standard and not supported in all browsers (IE9, for one)
          var el = document.createElement("div");
          el.innerHTML = emoji.data;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
          // IE < 9
            document.selection.createRange().pasteHTML(emoji.data);
          }
    },

    showEmojiContainer() {
      this.showEmojis = true;
    },
     showEmojiContainer2() {
      this.showEmojis2 = true;
    },
    closeEmojiContainer2() {
      this.showEmojis2 = false;
    },
    // selectEmoji2(emoji) {
    //   console.log(emoji);
    //   this.rowdata[0].textnew = this.rowdata[0].textnew + emoji.data;
    // },
    getEntityIntent() {
      this.chatbotname = localStorage.getItem("chatbotname");
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "entityintent", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.newsentence = response.data.sentence;
          this.responsedata = response.data.response1;
        });
    },
    deleteTableRow: function (idx) {
      axios.post(Base_URL.Actual_URL + "deleteresponse", {
        delete: 1,
        idx: idx,
      });
      this.counter--;
      this.rowdata.splice(idx, 1);
      this.getEntityIntent();
      // this.$vs.loading();
      this.$vs.notify({
        color: "danger",
        title: "Delete Record",
        text: "The selected Record was successfully deleted",
        position: "top-center",
      });
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editresponse", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;

          this.id = this.email[0].id;
          this.$router.push({
            name: "editresponsename",
            params: { id: this.id },
          });

          // window.location.href = "/editresponsename/" + this.id;
        });
    },
    SubmitResponse() {
      this.addresponse = document.getElementById('editor1').innerHTML
      if(this.addresponse == '' || this.addresponse == null) {
        this.response_error = true
      } else {
        this.response_error = false
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.getItem("email");
          var chatbot_id = localStorage.getItem("chatbot_id");

          axios
            .post(Base_URL.Actual_URL + "addresponse", {
              chatbot_id: chatbot_id,
              company_id: localStorage.company_id,
              addresponse: document.getElementById('editor1').innerHTML,
              createresponse: this.createresponse,
              addresponse1: document.getElementById('editor2').innerHTML,
            })
            .then((response) => {
              if (response.data.code == 100) {
                document.getElementById('editor1').innerHTML = ''
                document.getElementById('editor2').innerHTML = ''
                this.getEntityIntent();
                this.$vs.notify({
                  color: "success",
                  title: "Response Record",
                  text: "The Response Name  was successfully Added",
                  position: "top-center",
                });
                this.addresponse = "";
                this.createresponse = "";
                this.addresponse1 = "";
              }
            });
        }
      })
      };
    },

    quick: function () {
      axios
        .post(Base_URL.Actual_URL + "entityvalue", {
          company_id: localStorage.company_id,
          entity_key: this.assignentityquickreplies.Entitykey,
        })
        .then((response) => {
          this.entitycard = response.data.entity;
        });
    },
    dropdown: function () {
      axios
        .post(Base_URL.Actual_URL + "entityvalue", {
          company_id: localStorage.company_id,
          entity_key: this.assignentitydropdown.Entitykey,
        })
        .then((response) => {
          this.entitycard = response.data.entity;
        });
    },
    button: function () {
      axios
        .post(Base_URL.Actual_URL + "entityvalue", {
          company_id: localStorage.company_id,
          entity_key: this.assignentity.Entitykey,
        })
        .then((response) => {
          this.entitycard = response.data.entity;
        });
    },

    clearFields1() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    addEvent1() {
      axios
        .post(Base_URL.Actual_URL + "button", {
          company_id: localStorage.company_id,
          title: this.title,
          intent: this.assignintent.intent,
          entity_key: this.assignentity.Entitykey,
          entity_value: this.assignentityvalue.Entityvalue,
          addresponse: this.addresponse,
          createresponse: this.createresponse,
          addresponse1: this.addresponse1,
        })
        .then((response) => {
          if (response.data.code == 100) {
            this.message = response.data.message;
          }
        });
    },

    promptAddNewEvent1(date) {
      this.disabledFrom = false;
      this.addNewEventDialog1(date);
    },
    addNewEventDialog1(date) {
      this.clearFields1();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent1 = true;
    },
    openAddNewEvent1(date) {
      this.disabledFrom = true;
      this.addNewEventDialog1(date);
    },
    clearFields2() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    openAddNewEvent2(date) {
      this.disabledFrom = true;
      this.addNewEventDialog2(date);
    },
    addNewEventDialog2(date) {
      this.clearFields2();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent2 = true;
    },
    promptAddNewEvent2(date) {
      this.disabledFrom = false;
      this.addNewEventDialog2(date);
    },
    addEvent2() {
      axios
        .post(Base_URL.Actual_URL + "dropdown", {
          company_id: localStorage.company_id,
          label: this.label,
          intent: this.assignintentdropdown.intent,
          entity_key: this.assignentitydropdown.Entitykey,
          entity_value: this.assignentityvaluedropdown.Entityvalue,
          addresponse: this.addresponse,
          createresponse: this.createresponse,
          addresponse1: this.addresponse1,
        })
        .then((response) => {
          if (response.data.code == 100) {
            this.message = response.data.message;
          }
        });

      const obj = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        label: this.labelLocal,
        url: this.url,
      };
      obj.classes = `event-${this.labelColor(this.labelLocal)}`;
      this.$store.dispatch("calendar/addEvent", obj);
    },
    clearFields3() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    add(index) {
      this.inputs.push({
        name: "",
      });
    },
    openAddNewEvent3(date) {
      this.disabledFrom = true;
      this.addNewEventDialog3(date);
    },
    addNewEventDialog3(date) {
      this.clearFields3();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent3 = true;
    },
    promptAddNewEvent3(date) {
      this.disabledFrom = false;
      this.addNewEventDialog3(date);
    },
    addEvent3() {
      axios
        .post(Base_URL.Actual_URL + "Quickreplies", {
          company_id: localStorage.company_id,
          label: this.titlequickreplies,
          intent: this.assignintentquickreplies.intent,
          entity_key: this.assignentityquickreplies.Entitykey,
          entity_value: this.assignentityvaluequickreplies.Entityvalue,
          addresponse: this.addresponse,
          createresponse: this.createresponse,
          addresponse1: this.addresponse1,
        })
        .then((response) => {
          if (response.data.code == 100) {
            this.message = response.data.message;
          }
        });
      const obj = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        label: this.labelLocal,
        url: this.url,
      };
      obj.classes = `event-${this.labelColor(this.labelLocal)}`;
      this.$store.dispatch("calendar/addEvent", obj);
    },
    clearFields4() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    openAddNewEvent4(date) {
      this.disabledFrom = true;
      this.addNewEventDialog4(date);
    },
    addNewEventDialog4(date) {
      this.clearFields4();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent4 = true;
    },
    promptAddNewEvent4(date) {
      this.disabledFrom = false;
      this.addNewEventDialog4(date);
    },
    addEvent4() {
      axios
        .post(Base_URL.Actual_URL + "collapsiblevalue", {
          company_id: localStorage.company_id,
          titlecollapsible: this.titlecollapsible,
          Descriptioncollapsible: this.Descriptioncollapsible,
          addresponse: this.addresponse,
          createresponse: this.createresponse,
          addresponse1: this.addresponse1,
        })
        .then((response) => {
          if (response.data.code == 100) {
            this.message = response.data.message;
          }
        });
      const obj = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        label: this.labelLocal,
        url: this.url,
      };
      obj.classes = `event-${this.labelColor(this.labelLocal)}`;
      this.$store.dispatch("calendar/addEvent", obj);
    },
    clearFields5() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    openAddNewEvent5(date) {
      this.disabledFrom = true;
      this.addNewEventDialog5(date);
    },
    addNewEventDialog5(date) {
      this.clearFields5();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent5 = true;
    },
    promptAddNewEvent5(date) {
      this.disabledFrom = false;
      this.addNewEventDialog5(date);
    },

    addEvent5() {
      var newemail = localStorage.getItem("email");
      axios
        .post(Base_URL.Actual_URL + "cardvalue", {
          company_id: localStorage.company_id,
          label: this.namecard,
          image: this.Imagecard,
          description: this.descriptioncard,
          intent: this.assignintentcard.intent,
          entity_key: this.assignentitycard.Entitykey,
          entity_value: this.assignentityvaluecard.Entityvalue,
          addresponse: this.addresponse,
          createresponse: this.createresponse,
          addresponse1: this.addresponse1,
        })
        .then((response) => {
          if (response.data.code == 100) {
            this.message = response.data.message;
          }
        });
      const obj = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        label: this.labelLocal,
        url: this.url,
      };
      obj.classes = `event-${this.labelColor(this.labelLocal)}`;
      this.$store.dispatch("calendar/addEvent", obj);
    },
  },
};
</script>
<style scoped>
.emoji-picker[data-v-f1d527bc] {
  width: 100%;
  /* max-height: 20rem;
  height: 100%; */
}
div#editor1 {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
  height: 38px;
  padding: 0.7rem !important;
}
div#editor2 {
  border-radius: 6px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
  height: 38px;
  padding: 0.7rem !important;
  letter-spacing: normal !important;
  word-spacing: normal !important;
  font-size: inherit !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}
</style>


