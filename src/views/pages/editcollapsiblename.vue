

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Collapsible ">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Response Name</h6>
            <v-select
              class="w-full"
              label="responsename"
              :options="responsedata"
              v-model="rowdata[0].responsename"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="response_name"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("response_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <h6>Title</h6>
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="title"
              v-model="rowdata[0].title"
            />
            <span class="text-danger text-sm">{{ errors.first("title") }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <h6>Description</h6>
            <vs-input
              class="w-full"
              v-validate="'required|max:150'"
              name="description"
              v-model="rowdata[0].description"
            />
            <span class="text-danger text-sm">{{
              errors.first("description")
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
import { Validator } from "vee-validate";

const dict = {
  custom: {
    description: {
      required: "Please enter description",
    },
    response_name: {
      required: "Please select response name",
    },
    title: {
      required: "Please enter title",
    },
  },
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      rowdata: {
        description: "",
        responsename: "",
        title: "",
      },
      responsedata: [],
    };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.rowdata[0].title.length > 0 &&
        this.rowdata[0].description.length > 0 &&
        this.rowdata[0].responsename.length > 0
      );
    },
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editcollapsiblename/";
    const id = this.$route.params.id;
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      this.rowdata = response.data.userlist;
    });
    this.getResponseData();
  },
  methods: {
    getResponseData() {
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "entityintentcollapsible", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.responsedata = response.data.response1;
        });
    },
    Update() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const url = Base_URL.Actual_URL + "editcollapsiblename/";
          const id = this.$route.params.id;
          const url1 = url + id;
          axios
            .post(url1, {
              title: this.rowdata[0].title,
              responsename:
                this.rowdata[0].responsename.responsename ||
                this.rowdata[0].responsename,
              description: this.rowdata[0].description,
            })
            .then((response) => {
              this.msg = response.data.msg;

              if (response.data.code == 200) {
                this.msg = response.data.msg;
                this.$vs.notify({
                  title: "Edit collapsible ",
                  text: "Your Collapsible data is updated",
                  color: "success",
                  position: "top-center",
                });
                this.$router.push({
                  name: "botTemplate",
                  params: {
                    name: "collapsible",
                  },
                });
              }
            });
        }
      });
    },
  },
};
</script>

