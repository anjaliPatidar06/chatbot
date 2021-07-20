

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Calendar & Clock">
        <div class="vx-row">
          <div class="vx-col sm:w-1/4 w-full mb-2">
            <small class="date-label">Response Name</small>
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

          <div class="vx-col sm:w-1/4 w-full mb-2">
            <div class="flex items-center mt-5">
              <span class="mt-3 ml-4">Time</span>
              <vs-switch
                v-model="time"
                @change="calendarfunction1"
                class="mt-3 ml-5"
              />
            </div>
            <span class="text-danger text-sm ml-4" v-if="toggleError">
              Please select time or calendar.</span
            >
          </div>
          <div class="vx-col sm:w-1/4 w-full mb-2">
            <div class="flex items-center mt-5">
              <span class="mt-3 ml-4 mr-4">Calendar</span>
              <vs-switch
                v-model="calendar"
                @change="calendarfunction"
                style="size: 30px"
                class="mt-3"
              />
            </div>
            <!-- <div class="vx-col sm:w-1/3 w-full mt-5"> -->
            <!-- <vs-switch color="success" v-model="switch2">
        <span slot="on">Accept</span>
        <span slot="off">Cancel</span>
      </vs-switch> -->
          </div>
          <div class="vx-col sm:w-1/4 w-full mb-2" v-if="calendar">
            <div class="flex items-center mt-5 pt-4">
              <vs-switch color="success" v-model="switch2" id="dateSwitch">
                <span slot="on">Future Date</span>
                <span slot="off">Past Date</span>
              </vs-switch>
            </div>
          </div>
        </div>
        <div class="vx-row" v-if="time == true">
          <div class="vx-col sm:w-1/3 w-full mt-5">
            <flat-pickr
              :config="configdateTimePicker"
              v-model="start_time"
              placeholder="Choose start time"
              class="w-full"
              v-validate="{ required: time == true }"
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
              v-model="end_time"
              placeholder="Choose end time"
              class="w-full"
              v-validate="{ required: time == true }"
              data-vv-validate-on="blur"
              name="end_time"
            />
            <span class="text-danger text-sm ml-4">
              {{ errors.first("end_time") }}</span
            >
          </div>
        </div>
        <div class="vx-row mt-4" v-if="calendar == true">
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
          <div class="vx-col sm:w-1/3 w-full mt-5">
            <vs-button class="mr-3" @click="Actions">Submit</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Calendar Table" search>
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 30%">Response Name</vs-th>
            <vs-th style="width: 10%">Calendar </vs-th>
            <vs-th style="width: 20%">Future Date</vs-th>
            <vs-th style="width: 10%">Time </vs-th>
            <vs-th style="width: 20%">Start Time</vs-th>
            <vs-th style="width: 20%">End Time</vs-th>
            <vs-th style="width: 20%">Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.responsename">
                {{ tr.responsename }}
              </vs-td>
              <vs-td :data="tr.calendar">
                {{ tr.calendar }}
              </vs-td>
              <vs-td :data="tr.future_date">{{ tr.future_date}}</vs-td>
              <vs-td :data="tr.time">
                {{ tr.time }}
              </vs-td>
               <vs-td :data="tr.start_time">
                {{ tr.start_time }}
              </vs-td>
               <vs-td :data="tr.end_time">
                {{ tr.end_time }}
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
import { Base_URL } from "../../../api.config";
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import { Validator } from "vee-validate";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

const dict = {
  custom: {
    response_name: {
      required: "Please select response name",
    },
    // time: {
    //   required: "Please switch on any one.",
    // },
    end_time: {
      required: "Please select end time",
    },
    start_time: {
      required: "Please select start time",
    },
  },
};
Validator.localize("en", dict);
export default {
  name: "calendar",
  data() {
    return {
      sunTime: false,
      monTime: false,
      tueTime: false,
      wedTime: false,
      thrTime: false,
      friTime: false,
      satTime: false,
      weekDays:[],
      switch2: true, 
      start_time: '',
      end_time: '',
      actionname: "",
      rowdata: [],
      responsedata: [],
      responsename: "",
      chatbotname: "",
      time: false,
      calendar: false,
      toggleError: false,
      time: null,
      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
        noCalendar: true,
        timeFormat: 'h:i:s'
      },
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.responsename !== "";
    },
  },
  components: {
    "v-select": vSelect,
    flatPickr,
  },

  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.getCalendarTable();
  },

  methods: {
    weekDaySelection(e) {
      console.log(this.sunTime,'e')
      console.log(
        this.weekDays,'weekDays'
      )
      this.weekDays = [this.sunTime, this.monTime, this.tueTime, this.wedTime, this.thrTime, this.friTime, this.satTime]

    },
    getCalendarTable() {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "calendartable", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          console.log(response,'++++')
          this.rowdata = response.data.slot;
          this.responsedata = response.data.responsename;
          //this.responsedata=response.data.slot
        });
    },
    calendarfunction() {
      if (this.time == true) {
        this.toggleError = false;

        this.time = false;
      }
      //  if(this.time == false && this.calendar == false) {
      //     this.toggleError = false

      // }
    },
    calendarfunction1() {
      if (this.calendar == true) {
        this.calendar = false;
      }
      if (this.time == true) {
        this.toggleError = false;
      }
      // if(this.time == false && this.calendar == false) {
      //     this.toggleError = false
      // }
    },
    deleteTableRow: function (idx) {
      var newemail = localStorage.getItem("email");
      axios
        .post(Base_URL.Actual_URL + "calenderdelete", {
          delete: 1,
          idx: idx,
        })
        .then((res) => {
          this.getCalendarTable();
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.counter--;
          this.rowdata.splice(idx, 1);
        });
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editcalendar", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;
          this.id = this.email[0].id;
          this.$router.push({
            name: "editcalendarname",
            params: { id: this.id },
          });
        });
    },

    Actions() {
      // console.log(this.start_time, this.end_time,this.switch2)
      if (this.time == false && this.calendar == false) {
        this.toggleError = true;
        console.log('if')
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log(result,'result')
          if (this.time == false && this.calendar == false) {
            this.toggleError = true;
          } else {
            this.toggleError = false;
            var newemail = localStorage.getItem("email");

            var chatbot_id = localStorage.getItem("chatbot_id");
            console.log('else')
            axios
              .post(Base_URL.Actual_URL + "calendarvalue", {
                time: this.time,
                calendar: this.calendar,
                company_id: localStorage.company_id,
                chatbot_id: chatbot_id,
                responsename: this.responsename.responsename,
                start_time: this.start_time,
                end_time: this.end_time,
                future_date: this.switch2,
                week_days: this.weekDays
              })
              .then((response) => {
                if (response.data.code == 200) {
                  this.$emit("updateCalendarComponent");
                  this.start_time = ''
                  this.end_time = ''
                  // this.time = false
                  this.$vs.notify({
                    color: "success",
                    title: "Calendar Record",
                    text: response.data.Message,
                    position: "top-center",
                  });
                } else {
                   this.$vs.notify({
                    color: "danger",
                    title: response.data.Message,
                    position: "top-center",
                  });
                }
              });
          }
        }
      });
    },
  },
};
</script>
<style scoped>
button#dateSwitch {
  width: 90px !important;
  height: 26px !important;
}
</style>