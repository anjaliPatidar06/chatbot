<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <form ref="form" lazy-validation>
        <vx-card title="Location">
          <div class="vx-row">
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <h6>Response Name</h6>
              <v-select
                class="w-full"
                label="responsename"
                name="response_name"
                v-validate="'required'"
                :options="responsedata"
                v-model="responsename"
              >
              </v-select>
              <span class="text-danger text-sm">
                {{ errors.first("response_name") }}</span
              >
            </div>
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <h6>Latitude</h6>
              <vs-input
                name="latitude"
                v-validate="'required'"
                class="w-full"
                v-model="latitude"
                @change="number_latitude_test(latitude)"
              ></vs-input>
              <span class="text-danger text-sm">
                {{ errors.first("latitude") }}</span
              >
              <span class="text-danger text-sm" v-if="testLatitude == false"
                >Please enter latitude in decimal.</span
              >
            </div>
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <h6>Longitude</h6>
              <vs-input
                name="longitude"
                v-validate="'required'"
                class="w-full"
                v-model="longitude"
                @change="number_longitude_test(longitude)"
              ></vs-input>
              <span class="text-danger text-sm">
                {{ errors.first("longitude") }}</span
              >
              <span class="text-danger text-sm" v-if="testLongitude == false"
                >Please enter latitude in decimal.</span
              >
            </div>
            <div class="vx-col sm:w w-full mb-2">
              <h6>Description</h6>
              <vs-textarea
                class="w-full"
                v-model="description"
                v-validate="'max:100'"
                name="description"
                counter="100"
                label="Counter: 100"
                :counter-danger.sync="counterDanger"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('description')"
                >{{ errors.first("description") }}</span
              >
            </div>
            <div class="vx-col w-1/3 mb-2">
                  <div
              class="img-container w-64 flex items-center justify-center" v-if="file1"
            >
              <img
                :src="file1"
                alt="img"
                class="responsive mt-3"
              />
            </div>
              <div class="upload-img" :class="file1 ? 'mt-5': 'mt-2'">
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  ref="updateImgInputnewbackground"
                  accept="image/*"
                  v-validate="'required'"
                  name="locationImage"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                />
                <vs-button
                  @click="$refs.updateImgInputnewbackground.click()"
                  icon-pack="feather"
                  icon="icon icon-upload"
                  >Location Image</vs-button
                >
                <span class="text-danger text-sm">
                  {{ errors.first("locationImage") }}</span
                >
              </div>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col sm:w-1/3 w-full">
              <vs-button class="mr-3 mt-4" @click="submitLocation"
                >Submit</vs-button
              >
            </div>
          </div>
        </vx-card>
      </form>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Location Table" search>
        <vs-table search max-items="10" pagination :data="locationData">
          <template slot="thead">
            <vs-th style="width: 20%">Response Name</vs-th>
            <vs-th style="width: 20%">Latitude</vs-th>
            <vs-th style="width: 20%">Longitude</vs-th>
            <vs-th style="width: 20%">Description</vs-th>
            <vs-th style="width: 20%">Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.response_name">
                {{ tr.response_name }}
              </vs-td>
              <vs-td :data="tr.latitude">
                {{ tr.latitude }}
              </vs-td>
              <vs-td :data="tr.longitude">
                {{ tr.longitude }}
              </vs-td>
              <vs-td :data="tr.description">
                {{ tr.description }}
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
import vSelect from "vue-select";
import Vue from "vue";
Vue.component("v-select", vSelect);
import { Validator } from "vee-validate";
import { EventBus } from "../../event-bus";

const dict = {
  custom: {
    longitude: {
      required: "Please enter longitude",
    },
    response_name: {
      required: "Please select response name",
    },
    latitude: {
      required: "Please enter latitude",
    },
    locationImage:{
      required: "Please enter location image",
    }
  },
};
Validator.localize("en", dict);
var responsename;
var latitude;
var longitude;
var description;
var locationData;
var testLatitude;
var testLongitude;
export default {
  name: "location",
  data() {
    return {
      counterDanger: false,
      responsedata: [],
      latitude,
      longitude,
      responsename,
      description,
      locationData: [],
      testLatitude: true,
      testLongitude: true,
      max: "",
      selectedfile: "",
      file1: "",
    };
  },
  components: {
    "v-select": vSelect,
  },
  mounted() {
    this.getTableData();
    this.getResponseData();
  },
  methods: {
    number_latitude_test(n) {
      var result = n - Math.floor(n) !== 0;
      if (!parseInt(n)) {
        return (this.testLatitude = false);
      }
      if (result) return (this.testLatitude = true);
      else return (this.testLatitude = false);
    },
    number_longitude_test(n) {
      var result = n - Math.floor(n) !== 0;
      if (!parseInt(n)) {
        return (this.testLongitude = false);
      }
      if (result) return (this.testLongitude = true);
      else return (this.testLongitude = false);
    },
    async reload() {
      this.$forceUpdate();
      this.render = false;
      await this.$nextTick();
      this.render = true;
    },
    getResponseData() {
      axios
        .post(Base_URL.Actual_URL + "entityintentdropdown", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          this.responsedata = response.data.response1;
        });
    },
    getTableData() {
      axios
        .post(Base_URL.Actual_URL + "getlocation", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          this.locationData = response.data.location_list;
        });
    },
    updateRecord: function (index) {
      this.$router.push({
        name: "editLocation",
        params: { id: index },
      });
    },
    handleFileUpload() {
      this.file1 = this.$refs.updateImgInputnewbackground.files[0];
      this.selectedfile = this.$refs.updateImgInputnewbackground.files[0].name;

      console.log(this.$refs.updateImgInputnewbackground.files[0]);
      this.createBase64Image(this.file1);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.file1 = e.target.result;
      };
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "deletelocation", {
          location_id: idx,
        })
        .then(() => {
          this.counter--;
          this.locationData.splice(idx, 1);
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.getTableData();
        });
    },

    dropdown: function (e) {
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
        this.assignentitydropdown = "";
        this.entitycard = "";
        this.assignentityvaluedropdown = "";
      }
    },
    submitLocation() {
      this.$validator.validateAll().then((result) => {
        // this.testLatitude = this.number_latitude_test(this.latitude);
        // this.testLongitude = this.number_longitude_test(this.longitude);
        if (result) {
          if (this.testLatitude && this.testLatitude) {
            var body = {
              company_id: localStorage.company_id,
              chatbot_id: localStorage.chatbot_id,
              latitude: this.latitude,
              longitude: this.longitude,
              description: this.description || '',
              response_name: this.responsename.responsename,
              image_base:this.file1,
              image_name: this.selectedfile,
            };
            axios
              .post(Base_URL.Actual_URL + "addlocation", body)
              .then((response) => {
                if (response.data.code == 200) {
                  this.$emit("updateLocationComponent");
                  this.$vs.notify({
                    color: "success",
                    title: "Location Data Added",
                    text: "Your location record was successfully added",
                    position: "top-center",
                  });
                  this.getTableData();
                }
              });
          }
        }
      });
    },
  },
};
</script>
