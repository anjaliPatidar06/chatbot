

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update ChatBot Name">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input v-if="rowdata[0]"
              class="w-full"
              label="Chatbot Name"
              v-validate="'required|max:150'"
              name="chatbot_name"
              v-model="rowdata[0].chatbotname"
            />
            <span class="text-danger text-sm">{{
              errors.first("chatbot_name")
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
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";
import { EventBus } from "../../event-bus";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    chatbot_name: {
        required: "Please enter chatbot name",
    },
  },
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      rowdata: {
        chatbotname: "",
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
    };
  },
  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.chatbotname !== null || this.chatbotname !== undefined;
    },
  },
  created() {
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editchatbotname/";
    const id = this.$route.params.id;
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      this.rowdata = response.data.userlist;
    });
  },
  methods: {
    Update() {
        this.$validator.validateAll().then((result) => {
        if (result) {
      const url = Base_URL.Actual_URL + "editchatbotname/";
      const id = this.$route.params.id;
      const url1 = url + id;
      axios
        .post(url1, {
          chatbotname: this.rowdata[0].chatbotname,
        })
        .then((response) => {
          EventBus.$emit("selectedChatbotName", this.rowdata[0].chatbotname);
          this.msg = response.data.msg;
          if (response.data.code == 200) {
            this.$vs.notify({
              title: "ChatBot Name Updated.",
              text: "The selected ChatBot Name is updated.",
              color: "success",
              position: "top-center",
            });

            this.msg = response.data.msg;
            this.$router.push({ name: "agent" });
          }
        });
        }
        })
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

