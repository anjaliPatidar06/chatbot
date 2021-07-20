

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Calendar">
        <div class="vx-row">
          <div class="vx-col sm:w-1/4 w-full mb-2" :data="rowdata">
            <small class="date-label">Response Name</small>
            <v-select
              class="w-full"
              label="responsename"
              :options="userlistnewdata"
              v-model="rowdata[0].responsename"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            >
            </v-select>

            <span class="text-danger text-sm">{{
              errors.first("actionname")
            }}</span>
          </div>

          <div class="vx-col sm:w-1/4 w-full mb-2" :data="rowdata">
            <div class="flex items-center mt-5">
                 <span class="mt-3 ml-4">Time</span>
              <vs-switch
                v-model="rowdata[0].time"
                @change="calendarfunction1"
                class="mt-3 ml-5"
              />
            
            </div>
          </div>
          <div class="vx-col sm:w-1/4 w-full mb-2" :data="rowdata">
            <div class="flex items-center mt-5">
             <span class="mt-3 ml-4 mr-4">Calendar</span>
              <vs-switch
                v-model="rowdata[0].calendar"
                style="size: 30px"
                @change="calendarfunction"
                class="mt-3"
              />
            </div>
          </div>
              <div class="vx-col sm:w-1/4 w-full mb-2" v-if="rowdata[0].calendar">
            <div class="flex items-center mt-5 pt-4">
              <vs-switch color="success" v-model="rowdata[0].future_date" id="dateSwitch">
                <span slot="on">Future Date</span>
                <span slot="off">Past Date</span>
              </vs-switch>
            </div>
          </div>
        </div>
        <div class="vx-row" v-if="rowdata[0].time == true">
          <div class="vx-col sm:w-1/3 w-full mt-5">
            <flat-pickr
              :config="configdateTimePicker"
              v-model="rowdata[0].start_time"
              placeholder="Choose start time"
              class="w-full"
              v-validate="{ required: rowdata[0].time == true }"
              data-vv-validate-on="blur"
              name="start_time"
            />
            <span class="text-danger text-sm ml-4">
              {{ errors.first("start_time") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mt-5">
            <flat-pickr
              :config="configdateTimePicker"
              v-model="rowdata[0].end_time"
              placeholder="Choose end time"
              class="w-full"
              v-validate="{ required: rowdata[0].time == true }"
              data-vv-validate-on="blur"
              name="end_time"
            />
            <span class="text-danger text-sm ml-4">
              {{ errors.first("end_time") }}</span
            >
          </div>
        </div>
        <div class="vx-row mt-4" v-if="rowdata[0].calendar == true">            
            <span class="mt-3 ml-4">Sun</span>
              <vs-switch
                v-model="sunTime"
                @change="weekDaySelection"
                class="mt-3 ml-5"
              />
                <span class="mt-3 ml-4">Mon</span>
              <vs-switch
                v-model="monTime"
                @change="weekDaySelection"
                class="mt-3 ml-5"
              />
                <span class="mt-3 ml-4">Tue</span>
              <vs-switch
                v-model="tueTime"
                @change="weekDaySelection"
                class="mt-3 ml-5"
              />
                <span class="mt-3 ml-4">Wed</span>
              <vs-switch
                v-model="wedTime"
                @change="weekDaySelection"
                class="mt-3 ml-5"
              />
                <span class="mt-3 ml-4">Thr</span>
              <vs-switch
                v-model="thrTime"
                @change="weekDaySelection"
                class="mt-3 ml-5"
              />
                <span class="mt-3 ml-4">Fri</span>
              <vs-switch
                v-model="friTime"
                @change="weekDaySelection"
                class="mt-3 ml-5"
              />
                <span class="mt-3 ml-4">Sat</span>
              <vs-switch
                v-model="satTime"
                @change="weekDaySelection"
                class="mt-3 ml-5"
              />
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mt-5">
            <vs-button
              v-on:keyup.enter="Update"
              @click="Update"
              class="mr-3 mb-2"
              >Update</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import vSelect from "vue-select";
import { EventBus } from "../../event-bus";

import axios from "axios";
import { Base_URL } from "../../../api.config";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  data() {
    return {
      rowdata: {
        actionname: "",
        responsename: "",
     
      // week_days:[]
      },
           sunTime: false,
      monTime: false,
      tueTime: false,
      wedTime: false,
      thrTime: false,
      friTime: false,
      satTime: false,
            // weekDays:[],
      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
        noCalendar: true,
        timeFormat: 'h:i:s'
      },
      name: "",
      userlistnewdata: [],
      company: "",
      selectcategory: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      selectedCountry: "",
      selectedCountry1: "",
      time: false,
      calendar: false,
    };
  },

  components: {
    "v-select": vSelect,
    flatPickr
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.rowdata[0].responsename.length > 0;
    },
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editcalendarname/";
    const id = this.$route.params.id;
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      console.log(response,'response')
      this.rowdata = response.data.userlist;
      this.sunTime = this.rowdata[0].week_days[0]
      this.monTime = this.rowdata[0].week_days[1]
      this.tueTime = this.rowdata[0].week_days[2]
      this.wedTime = this.rowdata[0].week_days[3]
      this.thrTime = this.rowdata[0].week_days[4]
      this.friTime = this.rowdata[0].week_days[5]
      this.satTime = this.rowdata[0].week_days[6]
      this.weekDays = this.rowdata[0].week_days
      this.userlistnewdata = response.data.userlistnew;
    });
  },
  methods: {
        weekDaySelection(e) {
      console.log(this.sunTime,'e')
      console.log(
        this.weekDays,'weekDays'
      )
      this.weekDays = [this.sunTime, this.monTime, this.tueTime, this.wedTime, this.thrTime, this.friTime, this.satTime]

    },
    calendarfunction() {
      if (this.rowdata[0].time == true) {
        this.rowdata[0].time = false;
      }
    },
    calendarfunction1() {
      if (this.rowdata[0].calendar == true) {
        this.rowdata[0].calendar = false;
      }
    },
    Update() {
      console.log(this.rowdata[0].week_days,'436578')
      const url = Base_URL.Actual_URL + "editcalendarname/";
      const id = this.$route.params.id;
      const url1 = url + id;
      axios
        .post(url1, {
          calendar: this.rowdata[0].calendar,
          chatbot_id: localStorage.chatbot_id,
          time: this.rowdata[0].time,
          responsename:
            this.rowdata[0].responsename.responsename ||
            this.rowdata[0].responsename,
            start_time: this.rowdata[0].start_time,
                end_time: this.rowdata[0].end_time,
                future_date: this.rowdata[0].future_date,
                week_days: this.weekDays
        })
        .then((response) => {
          this.msg = response.data.msg;

          if (response.data.code == 200) {
            this.msg = response.data.msg;
            EventBus.$emit("selectedComponent", "calendarEvent");
            this.$vs.notify({
              title: "Edit Calendar ",
              text: "Your Calendar data is updated",
              color: "success",
              position: "top-center",
            });
            this.$router.push({
              name: "botTemplate",
              params:{
                name: 'calendar'
              }
            });
          }
        });
    },
    resetForm() {
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.data.form).forEach(function (key, index) {
        self.data.form[key] = "";
      });
    },
  },
};
</script>

