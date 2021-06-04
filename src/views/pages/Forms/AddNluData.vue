
<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Add Nlu Data">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Add Sentence</h6>
            <vs-input class="w-full" v-model="addsentence" />
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Select Intent</h6>
            <v-select
              class="w-full"
              label="durationName"
              :options="duration"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>
          <div class="vx-col sm:w-1/3 w-full mt-4">
            <vs-button
              icon-pack="feather"
              @click="promptAddNewEvent(new Date())"
              >Create New Intent</vs-button
            >
          </div>
        </div>
        <vs-prompt
          title="Add Event"
          @accept="myFunctionAccept"
          :is-valid="validForm"
          :active.sync="activePromptAddEvent"
        >
          <!-- <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="Event Title" v-model="title"></vs-input> -->
          <div class="my-4">
            <small class="date-label">Start Date</small>
            <datepicker
              :language="$vs.rtl ? langHe : langEn"
              name="start-date"
              v-model="startDate"
              :disabled="disabledFrom"
            ></datepicker>
          </div>
          <div class="my-4">
            <small class="date-label">End Date</small>
            <datepicker
              :language="$vs.rtl ? langHe : langEn"
              :disabledDates="disabledDatesTo"
              name="end-date"
              v-model="endDate"
            ></datepicker>
          </div>
          <!-- <vs-input name="event-url" v-validate="'url'" class="w-full mt-6" label-placeholder="Event URL" v-model="url" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input> -->
        </vs-prompt>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2">Submit</vs-button>
            <vs-button
              color="warning"
              type="border"
              class="mb-2"
              @click="
                addsentence;
                check7 = false;
              "
              >Reset</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>






<script>
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
export default {
  data() {
    return {
      addsentence: "",
    };
  },
};
</script>

<script>
import vSelect from "vue-select";

export default {
  data() {
    return {
      duration: [
        {
          durationCode: "afirm",
          durationName: "afirm",
        },
        {
          durationCode: "welcome",
          durationName: "welcome",
        },
        {
          durationCode: "goodbye",
          durationName: "goodbye",
        },
        {
          durationCode: "greet",
          durationName: "greet",
        },
      ],
    };
  },
  components: {
    "v-select": vSelect,
  },
  computed: {},
  methods: {
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
    promptAddNewEvent(date) {
      this.disabledFrom = false;
      this.addNewEventDialog(date);
    },
    addNewEventDialog(date) {
      this.clearFields();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent = true;
    },
    openAddNewEvent(date) {
      this.disabledFrom = true;
      this.addNewEventDialog(date);
    },
    openEditEvent(event) {
      const e = this.$store.getters["calendar/getEvent"](event.id);
      this.id = e.id;
      this.title = e.title;
      this.startDate = e.startDate;
      this.endDate = e.endDate;
      this.url = e.url;
      this.labelLocal = e.label;
      this.activePromptEditEvent = true;
    },
    editEvent() {
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
    removeEvent() {
      this.$store.dispatch("calendar/removeEvent", this.id);
    },
    eventDragged(event, date) {
      this.$store.dispatch("calendar/eventDragged", { event, date });
    },
  },
  created() {
    this.$store.registerModule("calendar", moduleCalendar);
    this.$store.dispatch("calendar/fetchEvents");
    this.$store.dispatch("calendar/fetchEventLabels");
  },
  beforeDestroy() {
    this.$store.unregisterModule("calendar");
  },
};
</script>
