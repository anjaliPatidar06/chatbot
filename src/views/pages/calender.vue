

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Calendar & Clock">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
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

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <div class="flex items-center mt-5">
              <span class="mt-3 ml-4">Time</span>
              <vs-switch
                v-model="time"
                @change="calendarfunction1"
                class="mt-3 ml-5"
                v-validate="'required'"
                data-vv-validate-on="blur"
                name="time"
              />
            </div>
            <span class="text-danger text-sm ml-4" v-if="toggleError">
              Please select time or calendar.</span
            >
          </div>

          <div class="flex items-center mt-5">
            <span class="mt-3 ml-4 mr-4">Calendar</span>
            <vs-switch
              v-model="calendar"
              @change="calendarfunction"
              style="size: 30px"
              class="mt-3"
            />
          </div>
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
            <vs-th style="width: 40%">Response Name</vs-th>
            <vs-th style="width: 20%">Calendar </vs-th>
            <vs-th style="width: 20%">Time </vs-th>

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
              <vs-td :data="tr.time">
                {{ tr.time }}
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

const dict = {
  custom: {
    response_name: {
      required: "Please select response name",
    },
    time: {
      required: "Please switch on any one.",
    },
  },
};
export default {
  name: "calendar",
  data() {
    return {
      actionname: "",
      rowdata: [],
      responsedata: [],
      responsename: "",
      chatbotname: "",
      time: false,
      calendar: false,
      toggleError: false,
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.responsename !== "";
    },
  },
  components: {
    "v-select": vSelect,
  },

  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.getCalendarTable();
  },

  methods: {
    getCalendarTable() {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "calendartable", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          console.log(response, "response mounted");
          this.rowdata = response.data.slot;
          this.responsedata = response.data.responsename;
          //this.responsedata=response.data.slot
        });
    },
    calendarfunction() {
      console.log(this.calendar);
      if (this.time == true) {
        this.toggleError = false;

        this.time = false;
      }
      //  if(this.time == false && this.calendar == false) {
      //     this.toggleError = false

      // }
    },
    calendarfunction1() {
      console.log(this.calendar);
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
      console.log(index);
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
      if (this.time == false && this.calendar == false) {
        this.toggleError = true;
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.time == false && this.calendar == false) {
            this.toggleError = true;
          } else {
            this.toggleError = false;
            console.log(this.actionname);
            console.log(this.responsename.responsename);
            var newemail = localStorage.getItem("email");

            var chatbot_id = localStorage.getItem("chatbot_id");

            axios
              .post(Base_URL.Actual_URL + "calendarvalue", {
                time: this.time,
                calendar: this.calendar,
                company_id: localStorage.company_id,
                chatbot_id: chatbot_id,
                responsename: this.responsename.responsename,
              })
              .then((response) => {
                console.log(response);
                if (response.data.code == 100) {
                  this.$emit("updateCalendarComponent");
                  this.$vs.notify({
                    color: "success",
                    title: "Calendar Record",
                    text: "The Calendar was successfully Added",
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
