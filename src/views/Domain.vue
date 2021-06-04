

<template>
  <div class="vx-row">
    <vs-button
      type="filled"
      class="ml-12 mt-2 mb-2"
      :color="formEvent ? 'warning' : 'primary'"
      @click="selectButton('formEvent')"
      >Form Data</vs-button
    >
    <vs-button
      type="filled"
      class="ml-12 mt-2 mb-2"
      :color="actionEvent ? 'warning' : 'primary'"
      @click="selectButton('actionEvent')"
      >Action Data</vs-button
    >
    <vs-button
      type="filled"
      :color="slotEvent ? 'warning' : 'primary'"
      @click="selectButton('slotEvent')"
      class="ml-12 mt-2 mb-2"
      >Slot Data</vs-button
    >
    <div class="vx-col w-full mb-base mt-4">
      <action-component
        v-if="actionEvent == true"
        :key="actionComponentKey"
        @updateActionComponent="updateActionComponent"
      ></action-component>
      <slotComponent
        v-if="slotEvent == true"
        :key="slotComponentKey"
        @updateSlotComponent="updateSlotComponent"
      ></slotComponent>
      <form-component
        v-if="formEvent == true"
        :key="formComponentKey"
        @updateFormComponent="updateFormComponent"
      ></form-component>
    </div>
    <!-- MULTIPLE COLUMNS-->
  </div>
</template>
<script>
import Vue from "vue";
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import axios from "axios";
require("vue-simple-calendar/static/css/default.css");
import { en, he } from "vuejs-datepicker/src/locale";
import { Base_URL } from "./../../api.config";
import actionComponent from "./action.vue";
import slotComponent from "./slot.vue";
import formComponent from "./form.vue";
import { EventBus } from "./../event-bus";

export default {
  data() {
    return {
      actionComponentKey: 0,
      slotComponentKey: 0,
      formComponentKey: 0,
      actionEvent: false,
      slotEvent: false,
      formEvent: false,
      showDate: new Date(),
      selectedDuration: "",
      disabledFrom: false,
      id: 0,
      title: "",
      startDate: "",
      endDate: "",
      labelLocal: "none",
      chatbotname: "",
      langHe: he,
      langEn: en,
      rowdata: [],
      url: "",
      calendarView: "month",
      slotname: "",
      slottype: "",
      activePromptAddEvent: false,
      message: "",
      duration: [
        {
          durationCode: "text",
          durationName: "text",
        },
        {
          durationCode: "bool",
          durationName: "bool",
        },

        {
          durationCode: "list",
          durationName: "list",
        },
        {
          durationCode: "unfeaturized",
          durationName: "unfeaturized",
        },
      ],
    };
  },
  components: {
    "v-select": vSelect,
    actionComponent,
    slotComponent,
    formComponent,
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.slotname !== "" &&
        this.selectedDuration !== ""
      );
    },
    validateForms() {
      return (
        !this.errors.any() &&
        this.formname.length > 0 &&
        this.actionname.length > 0
      );
    },
    disabledDatesTo() {
      return { to: new Date(this.startDate) };
    },
    disabledDatesFrom() {
      return { from: new Date(this.endDate) };
    },
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    // EventBus.$on("selectedComponent", this.selectButton);
    if (this.$route.params.name == "formData") {
      this.formEvent = true;
        this.slotEvent = false;
      this.actionEvent = false;
    }
     else if (this.$route.params.name == "actionData") {
      this.actionEvent = true;
        this.slotEvent = false;
      this.formEvent = false;
    } else {
      this.slotEvent = true;
      this.actionEvent = false;
      this.formEvent = false;
    }
    // this.getData();
  },
  methods: {
    updateActionComponent() {
      this.actionComponentKey = this.actionComponentKey + 1;
    },
    updateSlotComponent() {
      this.slotComponentKey = this.slotComponentKey + 1;
    },
    updateFormComponent() {
      this.formComponentKey = this.formComponentKey + 1;
    },
    selectButton(e) {
      var selectedVal = e;
      this.actionEvent = false;
      this.slotEvent = false;
      this.formEvent = false;
      if (selectedVal == "actionEvent") {
        this.$router.push({
          params:{ name: 'actionData'}
        })
        this.actionEvent = true;
      }
      if (selectedVal == "slotEvent") {
        this.slotEvent = true;
          this.$router.push({
          params:{ name: 'slotData'}
        })
      }
      if (selectedVal == "formEvent") {
        this.formEvent = true;
        this.$router.push({
          params:{ name: 'formData'}
        })
      }
    },

    myFunctionAccept() {
      this;
      this.durations[3].durationName = this.title;
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
    updateMonth(val) {
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

      if (type.durationCode == "categorical") {
        this.activePromptAddEvent = true;
        this.startDate = date;
        this.endDate = date;
      } else {
        this.durations[3].durationName = "categorical";
      }
    },
    openAddNewEvent(date) {
      this.disabledFrom = true;
      this.addNewEventDialog(date);
    },
  },
};
</script>
