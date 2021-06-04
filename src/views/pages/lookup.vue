<template>
  <div class="vx-row">
    <vs-button
      type="filled"
      color="primary"
      class="ml-12 mt-2 mb-2"
      to="/NluData"
      >User's Training Data</vs-button
    >
    <vs-button type="filled" color="primary" class="ml-12 mt-2 mb-2" to="/regex"
      >Regex Data</vs-button
    >
    <vs-button
      type="filled"
      color="primary"
      class="ml-12 mt-2 mb-2"
      to="/synonyms"
      >Synonyms Data</vs-button
    >

    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Look Up Table">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              class="w-full"
              label="Filename"
              id="mySelect2"
              @input="RefreshGrid"
              v-model="filename"
            />
          </div>

          <div class="vx-col w-full mb-2">
            <vs-textarea
              v-model="textarea"
              rows="13"
              max-rows="13"
              height="305px"
            />
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="lookup">Save File</vs-button>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {Base_URL, API_List} from '../../../api.config';

export default {
  data() {
    return {
      textarea: "",
      filename: "",
      rowdata: [],
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() && this.addregex !== "" && this.regexpattern !== ""
      );
    },
  },

  methods: {
    lookup() {

      var newemail = localStorage.getItem("email");
      console.log(newemail);
      console.log(this.filename);
      console.log(this.textarea);
      //axios.post(Base_URL.Actual_URL+'lookup', {
      axios
        .post(Base_URL.Actual_URL+"lookup", {
          filename: this.filename,
          textarea: this.textarea,
          company_id: localStorage.company_id,
        })
        .then((response) => {
          console.log(response);
          if (response.data.code == 100) {
                  this.$vs.notify({
        color: "success",
        title: "lookup file",
        text: "The Data was successfully Added",
        position: "top-center",
      });
            this.$router.push({name:"lookup"})
           }
          console.log("rahul");
        });
    },
    RefreshGrid: function () {
      var x = document.getElementById("mySelect2").value;

      if (x.slice(-4) == ".txt") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>