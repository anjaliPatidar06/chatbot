

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update NLU Data">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <h6>Sentence</h6>
            <vs-input
              class="w-full"
              v-validate="'required|max:350'"
              name="addsentence"
              v-model="rowdata[0].sentence"
            />

            <span class="text-danger text-sm">{{
              errors.first("addsentence")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <h6>Select Intent</h6>

            <v-select
              class="w-full"
              label="intent"
              :options="intentData"
              v-model="rowdata[0].intent"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="Intent"
            >
            </v-select>
            <span class="text-danger text-sm">{{
              errors.first("Intent")
            }}</span>
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
import { Validator } from "vee-validate";
import { EventBus } from "../../event-bus";

const dict = {
  custom: {
    addsentence: {
      required: "Please enter sentence",
    },
    Intent: {
      required: "Please select intent",
    },
  },
};
Validator.localize("en", dict);
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";
var sentence
export default {
  data() {
    return {
      rowdata: {
        intent: "",
        sentence: "",
      },
      name: "",
      company: "",
      selectcategory: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      selectedCountry: "",
      selectedCountry1: "",
      intentData:''
    };
  },

  components: {
    "v-select": vSelect,
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editsentencename/";
    const id = this.$route.params.id;
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      this.rowdata = response.data.userlist;
    });
    this.IntentList()
  },
  methods: {
    Update() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const url = Base_URL.Actual_URL + "editsentencename/";
          const id = this.$route.params.id;
          const url1 = url + id;
          axios
            .post(url1, {
              intent: this.rowdata[0].intent.intent || this.rowdata[0].intent,
              sentence: this.rowdata[0].sentence,
              chatbot_id: localStorage.chatbot_id,
              company_id: localStorage.company_id
            })
            .then((response) => {
              this.msg = response.data.msg;

              if (response.data.code == 200) {
                this.msg = response.data.msg;
                this.$vs.notify({
                  title: "Edit NlU Data.",
                  text: "The Nlu data is updated.",
                  color: "success",
                  position: "top-center",
                });

                EventBus.$emit("updateNluComponent");
                this.$router.push({
                  name: "userTraining",
                  params:{ name:'nluData'}
                });
              }
            });
        }
      });
    },
    IntentList() {
      axios
        .post(Base_URL.Actual_URL + "Nlusentenceintent", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          this.intentData = response.data.userlist;
          this.newsentence = response.data.sentence;
        });
    },
  },
};
</script>

