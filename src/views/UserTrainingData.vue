

<template>
  <div class="vx-row">
    <vs-button
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
    >
    <!-- <span style="color: red">{{ me }}</span> -->
    <!-- <div class="mt-2">  -->
    <div class="vx-col w-full mb-base mt-4">
      <regex-component
        v-if="regexEvent == true"
        :key="regexComponentKey"
        @updateRegexComponent="updateRegexComponent"
      ></regex-component>
      <nlu-component
        v-if="trainingEvent == true"
        :key="trainingComponentKey"
        @updateNluComponent="updateNluComponent"
      ></nlu-component>
      <synonym-component
        v-if="synonymsEvent == true"
        :key="synonymComponentKey"
        @updateSynonymComponent="updateSynonymComponent"
      ></synonym-component>
    </div>
    <!-- MULTIPLE COLUMNS-->
    <!-- </form> -->
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
require("vue-simple-calendar/static/css/default.css");
import Vue from "vue";
import vSelect from "vue-select";
import regexComponent from "./pages/regex.vue";
import synonymComponent from "./pages/synonyms.vue";
import nluComponent from "./NluData.vue";
Vue.component("v-select", vSelect);
import { EventBus } from "../event-bus";

export default {
  name: "userTrainingData",
  data() {
    return {
      synonymsEvent: false,
      regexEvent: false,
      trainingEvent: false,
      selected: null,
      regexComponentKey: 0,
      synonymComponentKey: 0,
      trainingComponentKey: 0,
    };
  },
  watch: {
    "$route.params.name"(to, from) {
      // console.log(to);
      // console.log(from);
    },
  },
  components: {
    "v-select": vSelect,
    regexComponent,
    synonymComponent,
    nluComponent,
  },
  methods: {
    updateRegexComponent() {
      this.regexComponentKey = this.regexComponentKey + 1;
    },
    updateNluComponent() {
      this.trainingComponentKey = this.trainingComponentKey + 1;
    },
    updateSynonymComponent() {
      this.trainingEvent = false;
      this.regexEvent = false;
      this.synonymsEvent = true;
      // alert('testst')
      this.synonymComponentKey = this.synonymComponentKey + 1;
    },
    selectButton(e) {
      var selectedVal = e;
      (this.synonymsEvent = false),
        (this.trainingEvent = false),
        (this.regexEvent = false);
      if (selectedVal == "regexEvent") {
        this.$router.push({
          params: { name: "regex" },
        });
          this.regexEvent = true;
      }
      if (selectedVal == "trainingEvent") {
        this.$router.push({
          params: { name: "nluData" },
        });
        this.trainingEvent = true;
      }
      if (selectedVal == "synonymsEvent") {
        this.$router.push({
          params: { name: "synonym" },
        });
        this.synonymsEvent = true;
      }
    },

    beforeDestroy() {
      this.$store.unregisterModule("calendar");
    },
  },

  created() {
    if (this.$route.params.name == "nluData") {
      this.trainingEvent = true;
      this.synonymsEvent = false;
      this.regexEvent = false;
    } else {
      if (this.$route.params.name == "synonym") {
        this.trainingEvent = false;
        this.synonymsEvent = true;
        this.regexEvent = false;
      } else {
        this.trainingEvent = false;
        this.synonymsEvent = false;
        this.regexEvent = true;
      }
    }
    // this.trainingEvent = true
    // this.synonymsEvent = false
    // this.regexEvent = false
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    EventBus.$on("updateNluComponent", this.updateNluComponent);
    // EventBus.$on("editSynonymComponent", this.updateSynonymComponent);
  },
};
</script>


  