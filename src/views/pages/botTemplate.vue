
<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vs-button
        type="filled"
        :color="responseEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('responseEvent')"
        >Responses</vs-button
      >
      <vs-button
        type="filled"
        :color="buttonEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('buttonEvent')"
        >Button</vs-button
      >
      <vs-button
        type="filled"
        :color="dropdownEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('dropdownEvent')"
        >Dropdown</vs-button
      >
      <vs-button
        type="filled"
        :color="quickReplyEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('quickReplyEvent')"
        >Quick Replies</vs-button
      >
      <vs-button
        type="filled"
        :color="collapsibleEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('collapsibleEvent')"
        >Collapsible</vs-button
      >
      <vs-button
        type="filled"
        :color="cardEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('cardEvent')"
        >Card</vs-button
      >
      <vs-button
        type="filled"
        :color="calendarEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('calendarEvent')"
        >Calendar & Clock</vs-button
      >

      <vs-button
        type="filled"
        :color="pictureEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('pictureEvent')"
        >Picture</vs-button
      >

      <vs-button
        type="filled"
        :color="locationEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('locationEvent')"
        >Location</vs-button
      >
      <vs-button
        type="filled"
        :color="pdfEvent ? 'warning' : 'primary'"
        class="ml-12 mt-2 mb-2"
        @click="selectButton('pdfEvent')"
        >Pdf</vs-button
      >
      <div class="mt-2">
        <responses v-if="responseEvent == true"></responses>
        <dropdown
          v-if="dropdownEvent == true"
          :key="componentKey"
          @updatecomponent="updatecomponent"
        ></dropdown>
        <button1
          v-if="buttonEvent == true"
          :key="buttonComponentKey"
          @updateButtonComponent="updateButtonComponent"
        ></button1>
        <quickReply
          v-if="quickReplyEvent == true"
          :key="quickComponentKey"
          @updateQuickComponent="updateQuickComponent"
        ></quickReply>
        <collapsible
          v-if="collapsibleEvent == true"
          :key="collapseComponentKey"
          @updateCollapseComponent="updateCollapseComponent"
        ></collapsible>
        <card-component
          v-if="cardEvent == true"
          :key="cardComponentKey"
          @updateCardComponent="updateCardComponent"
        ></card-component>
        <calender
          v-if="calendarEvent == true"
          :key="calendarComponentKey"
          @updateCalendarComponent="updateCalendarComponent"
        ></calender>
        <picture-component
          v-if="pictureEvent == true"
          :key="pictureComponentKey"
          @updatepictureComponent="updatepictureComponent"
        ></picture-component>
        <location
          v-if="locationEvent == true"
          :key="locationComponentKey"
          @updateLocationComponent="updateLocationComponent"
        ></location>
        <pdf
          v-if="pdfEvent == true"
          :key="pdfComponentKey"
          @updatePdfComponent="updatePdfComponent"
        ></pdf>
      </div>
    </div>
  </div>
</template>






<script>
import Vue from "vue";
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import axios from "axios";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
require("vue-simple-calendar/static/css/default.css");
import Datepicker from "vuejs-datepicker";
import { Base_URL } from "../../../api.config";
import Responses from "./../Responses.vue";
import button1 from "./button.vue";
import dropdown from "./dropdown.vue";
import quickReply from "./quickreplies.vue";
import collapsible from "./collapsible.vue";
import cardComponent from "./card.vue";
import pictureComponent from "./picture.vue";
import Calender from "./calender.vue";
import location from "./location.vue";
import { EventBus } from "../../event-bus";
import pdf from "./pdf.vue";
export default {
  data() {
    return {
      componentKey: 0,
      buttonComponentKey: 0,
      quickComponentKey: 0,
      cardComponentKey: 0,
      collapseComponentKey: 0,
      calendarComponentKey: 0,
      pictureComponentKey: 0,
      locationComponentKey: 0,
      pdfComponentKey: 0,
      pdfEvent: false,
      responseEvent: false,
      dropdownEvent: false,
      buttonEvent: false,
      calendarEvent: false,
      pictureEvent: false,
      quickReplyEvent: false,
      collapsibleEvent: false,
      cardEvent: false,
      locationEvent: false,
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
    };
  },
  mounted() {
    EventBus.$on("selectedComponent", this.reload);
    if (this.$route.params.name == "response") {
      this.responseEvent = true;
      (this.dropdownEvent = false),
        (this.buttonEvent = false),
        (this.calendarEvent = false),
        (this.pictureEvent = false),
        (this.quickReplyEvent = false),
        (this.collapsibleEvent = false),
        (this.cardEvent = false),
        (this.locationEvent = false);
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "dropdown") {
      this.dropdownEvent = true;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = false;
      this.pictureEvent = false;
      this.quickReplyEvent = false;
      this.collapsibleEvent = false;
      this.cardEvent = false;
      this.locationEvent = false;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "button") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = true;
      this.calendarEvent = false;
      this.pictureEvent = false;
      this.quickReplyEvent = false;
      this.collapsibleEvent = false;
      this.cardEvent = false;
      this.locationEvent = false;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "quickReply") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = false;
      this.pictureEvent = false;
      this.quickReplyEvent = true;
      this.collapsibleEvent = false;
      this.cardEvent = false;
      this.locationEvent = false;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "collapsible") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = false;
      this.pictureEvent = false;
      this.quickReplyEvent = false;
      this.collapsibleEvent = true;
      this.cardEvent = false;
      this.locationEvent = false;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "card") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = false;
      this.pictureEvent = false;
      this.quickReplyEvent = false;
      this.collapsibleEvent = false;
      this.cardEvent = true;
      this.locationEvent = false;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "calendar") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = true;
      this.pictureEvent = false;
      this.quickReplyEvent = false;
      this.collapsibleEvent = false;
      this.cardEvent = false;
      this.locationEvent = false;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "picture") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = false;
      this.pictureEvent = true;
      this.quickReplyEvent = false;
      this.collapsibleEvent = false;
      this.cardEvent = false;
      this.locationEvent = false;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "location") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = false;
      this.pictureEvent = false;
      this.quickReplyEvent = false;
      this.collapsibleEvent = false;
      this.cardEvent = false;
      this.locationEvent = true;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "location") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = false;
      this.pictureEvent = false;
      this.quickReplyEvent = false;
      this.collapsibleEvent = false;
      this.cardEvent = false;
      this.locationEvent = true;
      this.pdfEvent = false;
    }
    if (this.$route.params.name == "pdf") {
      this.dropdownEvent = false;
      this.responseEvent = false;
      this.buttonEvent = false;
      this.calendarEvent = false;
      this.pictureEvent = false;
      this.quickReplyEvent = false;
      this.collapsibleEvent = false;
      this.cardEvent = false;
      this.locationEvent = false;
      this.pdfEvent = true;
    }
  },

  computed: {
    simpleCalendarEvents() {
      return this.$store.state.calendar.events;
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
    Responses,
    button1,
    dropdown,
    quickReply,
    collapsible,
    cardComponent,
    Calender,
    pictureComponent,
    location,
    pdf,
  },
  methods: {
    async reload(e) {
      this.$forceUpdate();
      this.render = false;
      await this.$nextTick();
      this.render = true;
      var selectedVal = e;
      (this.responseEvent = false),
        (this.dropdownEvent = false),
        (this.buttonEvent = false),
        (this.calendarEvent = false),
        (this.pictureEvent = false),
        (this.quickReplyEvent = false),
        (this.collapsibleEvent = false),
        (this.cardEvent = false);
    },
    updatePdfComponent() {
      this.pdfComponentKey = this.pdfComponentKey + 1;
    },
    updateLocationComponent() {
      this.locationComponentKey = this.locationComponentKey + 1;
    },
    updateButtonComponent() {
      this.buttonComponentKey = this.buttonComponentKey + 1;
    },
    updateQuickComponent() {
      this.quickComponentKey = this.quickComponentKey + 1;
    },
    updatecomponent() {
      this.componentKey = this.componentKey + 1;
    },
    updateCollapseComponent() {
      this.collapseComponentKey = this.collapseComponentKey + 1;
    },
    updateCardComponent() {
      this.cardComponentKey = this.cardComponentKey + 1;
    },
    updateCalendarComponent() {
      this.calendarComponentKey = this.calendarComponentKey + 1;
    },
    updatepictureComponent() {
      this.pictureComponentKey = this.pictureComponentKey + 1;
    },
    selectButton(e) {
      var selectedVal = e;
      (this.responseEvent = false),
        (this.dropdownEvent = false),
        (this.buttonEvent = false),
        (this.calendarEvent = false),
        (this.pictureEvent = false),
        (this.quickReplyEvent = false),
        (this.collapsibleEvent = false),
        (this.cardEvent = false),
        (this.locationEvent = false);
      this.pdfEvent = false;
      if (selectedVal == "responseEvent") {
        this.responseEvent = true;
        this.$router.push({
          params: { name: "response" },
        });
      }
      if (selectedVal == "dropdownEvent") {
        this.dropdownEvent = true;
        this.$router.push({
          params: { name: "dropdown" },
        });
      }
      if (selectedVal == "calendarEvent") {
        this.calendarEvent = true;
        this.$router.push({
          params: { name: "calendar" },
        });
      }
      if (selectedVal == "buttonEvent") {
        this.$router.push({
          params: { name: "button" },
        });
        this.buttonEvent = true;
      }
      if (selectedVal == "pictureEvent") {
        this.$router.push({
          params: { name: "picture" },
        });
        this.pictureEvent = true;
      }
      if (selectedVal == "quickReplyEvent") {
        this.$router.push({
          params: { name: "quickReply" },
        });
        this.quickReplyEvent = true;
      }
      if (selectedVal == "collapsibleEvent") {
        this.$router.push({
          params: { name: "collapsible" },
        });
        this.collapsibleEvent = true;
      }
      if (selectedVal == "cardEvent") {
        this.$router.push({
          params: { name: "card" },
        });
        this.cardEvent = true;
      }
      if (selectedVal == "locationEvent") {
        this.$router.push({
          params: { name: "location" },
        });
        this.locationEvent = true;
      }
      if (selectedVal == "pdfEvent") {
        this.$router.push({
          params: { name: "pdf" },
        });
        this.pdfEvent = true;
      }
    },
  },
};
</script>


