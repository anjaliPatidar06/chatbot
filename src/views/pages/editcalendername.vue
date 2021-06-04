

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Calendar">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
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

          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
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
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <div class="flex items-center mt-5">
              <span class="mt-3 ml-4">Time</span>
              <vs-switch
                v-model="rowdata[0].time"
                @change="calendarfunction1"
                class="mt-3 ml-5"
              />
            </div>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
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

export default {
  data() {
    return {
      rowdata: {
        actionname: "",
        responsename: "",
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
      this.rowdata = response.data.userlist;
      console.log(this.rowdata);
      this.userlistnewdata = response.data.userlistnew;
      console.log(this.userlistnewdata);
    });
  },
  methods: {
    calendarfunction() {
      console.log(this.calendar);
      if (this.rowdata[0].time == true) {
        this.rowdata[0].time = false;
      }
    },
    calendarfunction1() {
      console.log(this.calendar);
      if (this.rowdata[0].calendar == true) {
        this.rowdata[0].calendar = false;
      }
    },
    Update() {
      const url = Base_URL.Actual_URL + "editcalendarname/";
      const id = this.$route.params.id;
      console.log(url + id);
      const url1 = url + id;
      axios
        .post(url1, {
          calendar: this.rowdata[0].calendar,

          time: this.rowdata[0].time,
          responsename:
            this.rowdata[0].responsename.responsename ||
            this.rowdata[0].responsename,
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
      console.log("Reseting the form");
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.data.form).forEach(function (key, index) {
        self.data.form[key] = "";
      });
    },
  },
};
</script>

