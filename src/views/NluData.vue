

<template>
  <div class="vx-row">
    <!-- <vs-button
      type="filled"
      :color="trainingEvent ? 'warning' : 'primary'"
      class="ml-12 mt-2 mb-2"
      @click="selectButton('trainingEvent')"
      >User Training Data</vs-button
    >
    <vs-button
      type="filled"
      :color="regexEvent ? 'warning' : 'primary'"
      class="ml-12 mt-2 mb-2"
      @click="selectButton('regexEvent')"
      >Regex Data</vs-button
    >
    <vs-button
      type="filled"
      :color="synonymsEvent ? 'warning' : 'primary'"
      class="ml-12 mt-2 mb-2"
      @click="selectButton('synonymsEvent')"
      >Synonyms Data</vs-button
    > -->

    <!-- <span style="color: red">{{ me }}</span> -->
    <!-- <div class="mt-2">  -->
  
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="NLU Data">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Sentence</h6>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="addsentence"
              class="w-full"
              v-model="addsentence"
            />
            <span class="text-danger text-sm">{{
              errors.first("addsentence")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Select Intent</h6>

            <v-select
              class="w-full"
              label="intent"
              :options="rowdata"
              v-model="selectIntent"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="Intent"
            >
            </v-select>
             <span class="text-danger text-sm">{{
              errors.first("Intent")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mt-4">
            <vs-button
              type="filled"
              color="warning"
              class="mr-2"
              @click="promptAddNewEvent3(new Date())"
              icon="add"
              aria-hidden="true"
              >Add Intent</vs-button
            >
            <!-- <span style="color: red">{{ message }}</span> -->
          </div>
        </div>
        <vs-prompt
          title="Create Intent"
          accept-text="Save"
          @accept="addEvent3"
          :is-valid="validForm"
          :active.sync="activePromptAddEvent3"
        >
          <vs-input
            name="event_name"
            v-validate="'required'"
            class="w-full"
            label-placeholder="Create Intent"
            v-model="createintent"
          ></vs-input>
           <span class="text-danger text-sm">{{
                errors.first("event_name")
              }}</span>
        </vs-prompt>
        <vs-prompt
          class="calendar-event-dialog"
          title="Assign Entity"
          accept-text="Save"
          @accept="addEvent1()"
          :is-valid="validFormsnew"
          :active.sync="activePromptAddEvent1"
          @cancel="closeEntity()"
        >
          <v-select
            class="w-full"
            :options="newword"
            v-model="selectedDuration"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          >
          </v-select>

          <vs-input
            name="event_name"
            v-validate="'required'"
            class="w-full"
            aria-placeholder="Assign Entity"
            label="Assign Entity"
            v-model="createentity"
          ></vs-input>
        </vs-prompt>
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-button
              type="filled"
              color="primary"
              class="mr-2"
              @click="nludata"
              >Submit</vs-button
            >
          </div>
        </div>
      </vx-card>
      <br>
      <br>

      <div class="vx-row">
        <!-- MULTIPLE COLUMNS-->
        <div class="vx-col w-full mb-base">
          <vx-card title="NLU Data Table" search>
            <vs-table search max-items="10" pagination :data="newsentence">
              <template slot="thead">
                <vs-th>Sentence</vs-th>
                <vs-th>Intent</vs-th>
                <vs-th>Assign Entity</vs-th>
                <!-- <vs-th>Assign Regex</vs-th> -->

                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.sentence">
                    {{ tr.sentence }}
                  </vs-td>
                  <vs-td :data="tr.intent">
                    {{ tr.intent }}
                  </vs-td>
                  <vs-td>
                    <div class="flex">
                      <vs-button
                        @click="promptAddNewEvent1(tr.id, new Date())"
                        type="filled"
                        color="success"
                        class="mr-2"
                        >Assign Entity
                      </vs-button>
                    </div>
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
    </div>

    <!-- </form> -->
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from "axios";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import moduleCalendar from "@/store/calendar/moduleCalendar.js";
require("vue-simple-calendar/static/css/default.css");

import Datepicker from "vuejs-datepicker";
import { en, he } from "vuejs-datepicker/src/locale";

import { Base_URL } from "./../../api.config";
import Vue from "vue";
import vSelect from "vue-select";
import regexComponent from "./pages/regex.vue";
import synonymComponent from "./pages/synonyms.vue";
Vue.component("v-select", vSelect);
import { Validator } from "vee-validate";
import { EventBus } from "../event-bus";

const dict = {
  custom: {
    addsentence: {
      required: "Please enter sentence",
    },
    Intent:{
      required: "Please select intent",
    },
    event_name:{
      required: "Please enter intent name",
    }
  },
};
Validator.localize("en", dict);
export default {
  name:'nlu-component',
  data() {
    return {
      showDate: new Date(),
      disabledFrom: false,
      id: 0,
      title: "",
      newsentence: [],
      rowdata: [],
      startDate: "",
      endDate: "",
      labelLocal: "none",
      createintent: "",
      langHe: he,
      langEn: en,
      createentity: "",
      url: "",
      calendarView: "month",
      synonymsEvent: false,
      regexEvent: false,
      trainingEvent: true,
      activePromptAddEvent: false,
      activePromptAddEvent1: false,
      activePromptAddEvent3: false,
      activePromptAddEvent2: false,
      activePromptEditEvent: false,

      calendarViewTypes: [
        {
          label: "Month",
          val: "month",
        },
        {
          label: "Week",
          val: "week",
        },
        {
          label: "Year",
          val: "year",
        },
      ],

      listPosition: ["top-center"],
      me: "",
      result: "",
      subcost: "",
      addsentence: "",
      selectIntent: "",
      message: "",
      between: "",
      selectedDuration: "",
      selectedCurrency: "",
      chatbotname: "",

      newword: [],

      durations: [
        {
          durationCode: "monthly",
          durationName: "service.vippremium",
        },
        {
          durationCode: "quaterly",
          durationName: "appraisal.thank_you",
        },
        {
          durationCode: "halfyearly",
          durationName: "greetings.hello",
        },
        {
          durationCode: "yearly",
          durationName: "greetings.bye",
        },

        {
          durationCode: "Create Intent",
          durationName: "change_detail",
        },
      ],
      selected: null,
      assignEntityID: null
    };
  },
  computed: {
    simpleCalendarEvents() {
      return this.$store.state.calendar.events;
    },
    validForm() {
      return ((/^\S{3,}$/.test(this.createintent)));
    },
    validForms() {
      return this.addsentence !== "" && this.selectIntent !== "";
    },
    validFormsnew() {
      return (this.selectedDuration !== "" && this.createentity !== "" && (/^\S{3,}$/.test(this.createentity)));
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
    regexComponent,
    synonymComponent,
  },
  methods: {
    selectButton(e) {
      var selectedVal = e;
      (this.synonymsEvent = false),
        (this.trainingEvent = false),
        (this.regexEvent = false);
      if (selectedVal == "regexEvent") {
        this.regexEvent = true;
      }
      if (selectedVal == "trainingEvent") {
        this.trainingEvent = true;
      }
      if (selectedVal == "synonymsEvent") {
        this.synonymsEvent = true;
      }
    },
    addEvent1() {
      var idxnew = localStorage.getItem("assignentity");

      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "assignfields", {
          createentity: this.createentity,
          chatbot_id: chatbot_id,
          company_id: localStorage.company_id,
          word: this.selectedDuration,
          idx: this.assignEntityID,
        })
        .then((response) => {
          this.assignEntityID =  null
          this.selectedDuration = ''
          this.createentity = ''
          if (response.data.code == 200) {
            this.$vs.notify({
              color: "success",
              title: "Assign Entity Record",
              text: "The Assign Entity  was successfully Added",
              position: "top-center",
            });
          }
        });
    },
    addEvent2() {
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
    addEvent3() {
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
  if(localStorage.chatbot_id !== null && localStorage.chatbot_id !== undefined) {
      axios
        .post(Base_URL.Actual_URL + "intent", {
          createintent: this.createintent,
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.message = response.data.message;
          if (response.data.code == 200) {
            this.IntentList();
            this.$vs.notify({
              color: "success",
              title: "Intent Saved",
              text: "The Intent Data was successfully saved",
              position: "top-center",
            });
            this.createintent = "";
          }
        });
  } else {
        this.$vs.notify({
          color: "danger",
          title: "Please Select Chatbot First.",
          position: "top-center",
        });
  }
     
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
    updateMonth(val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val);
    },
    nludata() {
      this.$validator.validateAll().then((result) => {
        if (result) {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "nludata", {
          addsentence: this.addsentence,
          company_id: localStorage.company_id,
          selectIntent: this.selectIntent.intent,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          if (response.data.code == 200) {
            this.selectIntent = "";
            this.addsentence = "";
            this.IntentList();
            this.$emit("updateNluComponent");
            this.$vs.notify({
              color: "success",
              title: "Story data saved",
              text: "Your story record was successfully added",
              position: "top-center",
            });
          }
        });
        }
      })
    },
    clearFields1() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    clearFields2() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    clearFields3() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    promptAddNewEvent2(date) {
      this.disabledFrom = false;
      this.addNewEventDialog2(date);
    },
    addNewEventDialog2(date) {
      this.clearFields2();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent2 = true;
    },
    openAddNewEvent2(date) {
      this.disabledFrom = true;
      this.addNewEventDialog2(date);
    },
    openEditEvent2(event) {
      const e = this.$store.getters["calendar/getEvent"](event.id);
      this.id = e.id;
      this.title = e.title;
      this.startDate = e.startDate;
      this.endDate = e.endDate;
      this.url = e.url;
      this.labelLocal = e.label;
      this.activePromptEditEvent = true;
    },
    editEvent2() {
      const obj = {
        id: this.id,
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        label: this.labelLocal,
        url: this.url,
      };
      obj.classes = `event-${this.labelColor(this.labelLocal)}`;
      this.$store.dispatch("calendar/editEvent", obj);
    },
    removeEvent2() {
      this.$store.dispatch("calendar/removeEvent", this.id);
    },
    eventDragged2(event, date) {
      this.$store.dispatch("calendar/eventDragged", { event, date });
    },
    promptAddNewEvent3(date) {
      this.disabledFrom = false;
      this.addNewEventDialog3(date);
    },
    addNewEventDialog3(date) {
      this.clearFields3();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent3 = true;
    },
    promptAddNewEvent1(idx, date) {
      this.assignEntityID = idx
      localStorage.setItem("assignentity", idx);

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "assignentity", {
          idx: idx,
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.newword = response.data.users;
        });
      this.disabledFrom = false;
      this.addNewEventDialog1(date);
    },
    addNewEventDialog1(date) {
      this.clearFields1();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent1 = true;
    },
    closeEntity() {
       this.selectedDuration = ''
       this.createentity = ''
    },
    openAddNewEvent1(date) {
      this.disabledFrom = true;
      this.addNewEventDialog1(date);
    },
    openEditEvent1(event) {
      const e = this.$store.getters["calendar/getEvent"](event.id);
      this.id = e.id;
      this.title = e.title;
      this.startDate = e.startDate;
      this.endDate = e.endDate;
      this.url = e.url;
      this.labelLocal = e.label;
      this.activePromptEditEvent = true;
    },
    editEvent1() {
      const obj = {
        id: this.id,
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        label: this.labelLocal,
        url: this.url,
      };
      obj.classes = `event-${this.labelColor(this.labelLocal)}`;
      this.$store.dispatch("calendar/editEvent", obj);
    },
    removeEvent1() {
      this.$store.dispatch("calendar/removeEvent", this.id);
    },
    eventDragged1(event, date) {
      this.$store.dispatch("calendar/eventDragged", { event, date });
    },

    myFunctionAccept() {
      this;
      this.durations[4].durationName =
        this.startDate.toLocaleDateString() +
        " to " +
        this.endDate.toLocaleDateString();
    },
    changedLabel(event) {
      this.selected = event;
    },
    addEvent() {
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
    updateMonth1(val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val);
    },
    clearFields() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    promptAddNewEvent(type, date) {
      this.disabledFrom = false;
      this.addNewEventDialog(type, date);
    },
    addNewEventDialog(type, date) {
      this.clearFields();

      if (type.durationCode == "Create Intent") {
        this.activePromptAddEvent = true;
        this.startDate = date;
        this.endDate = date;
      } else {
        this.durations[4].durationName = "Create Intent";
      }
    },
    openAddNewEvent(date) {
      this.disabledFrom = true;
      this.addNewEventDialog(date);
    },

    removeEvent() {
      this.$store.dispatch("calendar/removeEvent", this.id);
    },
    eventDragged(event, date) {
      this.$store.dispatch("calendar/eventDragged", { event, date });
    },

    created() {
      this.$store.registerModule("calendar", moduleCalendar);
      this.$store.dispatch("calendar/fetchEvents");
      this.$store.dispatch("calendar/fetchEventLabels");
    },
    beforeDestroy() {
      this.$store.unregisterModule("calendar");
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "sentencedelete", {
          delete: 1,
          idx: idx,
          company_id: localStorage.company_id,
        })
        .then((res) => {
          this.counter--;
          this.rowdata.splice(idx, 1);
          this.IntentList();
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
        });
    },
    IntentList() {
      axios
        .post(Base_URL.Actual_URL + "Nlusentenceintent", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.newsentence = response.data.sentence;
        });
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editsentence", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;
          this.id = this.email[0].id;
          EventBus.$emit("updateNluComponent");
          this.$router.push({
            name: "editsentencename",
            params: { id: this.id },
          });
        });
    },
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.IntentList();
  },
};
</script>


  