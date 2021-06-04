<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <form ref="form" lazy-validation>
        <vx-card title="Update Location">
          <div class="vx-row">
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <h6>Response Name</h6>
              <v-select
                class="w-full"
                label="responsename"
                name="response_name"
                v-validate="'required'"
                :options="responsedata"
                v-model="locationData[0].responsename"
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
                v-model="locationData[0].latitude"
                @change="number_latitude_test(locationData[0].latitude)"
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
                v-model="locationData[0].longitude"
                @change="number_longitude_test(locationData[0].longitude)"
              ></vs-input>
              <span class="text-danger text-sm">
                {{ errors.first("longitude") }}</span
              >
              <span class="text-danger text-sm" v-if="testLongitude == false"
                >Please enter latitude in decimal.</span
              >
            </div>
            <div class="vx-col sm w-full mb-2">
              <h6>Description</h6>
               <vs-textarea
                class="w-full"
                v-model="locationData[0].description"
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
              class="img-container w-64 flex items-center justify-center" v-if="locationData[0].image_path"
            >
              <img
                :src="locationData[0].image_path"
                alt="img"
                class="responsive mt-3"
              />
            </div>
              <div class="upload-img" :class="locationData[0].image_path ? 'mt-5': 'mt-2'">
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  ref="updateImgInputnewbackground"
                  accept="image/*"
                  v-validate="{ required: locationData[0].image_path == null }"
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
              <vs-button class="mr-3 mt-4" @click="updateLocation"
                >Update</vs-button
              >
            </div>
          </div>
        </vx-card>
      </form>
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
  },
};
Validator.localize("en", dict);
var responsename;
var latitude;
var longitude;
var description;
export default {
  name: "location",
  data() {
    return {
      componentKey: 0,
      responsedata: [],
      latitude,
      longitude,
      responsename,
      description,
      locationData: [],
      testLatitude: true,
      testLongitude: true,
      counterDanger: false,
      selectedfilePath: "",
      file1: "",
    };
  },
  components: {
    "v-select": vSelect,
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.getLocationData();
    this.getResponseData();
  },
  methods: {
        handleFileUpload() {
      this.file1 = this.$refs.updateImgInputnewbackground.files[0];
      this.selectedfile = this.$refs.updateImgInputnewbackground.files[0].name;
      this.selectedfilePath = this.selectedfile;
      this.createBase64Image(this.file1);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.file1 = "";
        //   console.log(e.target.result)
        this.file1 = e.target.result;
        this.locationData[0].image_path = e.target.result;
      };
    },
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
    getLocationData() {
      axios
        .get(Base_URL.Actual_URL + "editlocation/" + this.$route.params.id)
        .then((response) => {
          this.locationData = response.data.location_list;
          this.selectedfilePath = this.locationData[0].image_path
        });
    },
    getResponseData() {
      axios
        .post(Base_URL.Actual_URL + "entityintentdropdown", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          this.responsedata = response.data.response1;
          console.log(this.responsedata[0],'this.responsedata[0].image_path')
        });
    },
    updateLocation() {
      this.$validator.validateAll().then((result) => {
        this.testLatitude = this.number_latitude_test(
          this.locationData[0].latitude
        );
        this.testLongitude = this.number_longitude_test(
          this.locationData[0].longitude
        );
        if (result) {
          if (this.testLatitude && this.testLatitude) {
            var body = {
              latitude: this.locationData[0].latitude,
              longitude: this.locationData[0].longitude,
              description: this.locationData[0].description || '',
              image_path: this.selectedfilePath,
            image_base: this.file1,
              responsename:
                this.locationData[0].responsename.responsename || this.locationData[0].responsename,
            };
            axios
              .post(
                Base_URL.Actual_URL + "editlocation/" + this.$route.params.id,
                body
              )
              .then((response) => {
                if (response.data.code == 200) {
                  this.$router.push({
                    name: "botTemplate",
                    params:{ name:'location'}
                  });
                  this.$emit("selectedComponent", "locationEvent");
                  this.$vs.notify({
                    color: "success",
                    title: "Location Data Updated",
                    text: "Your location record was successfully updated",
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
