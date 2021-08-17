<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Add Story">
        <!-- <span style="color: green">{{ message }}</span> -->
        <!-- <span style="color: red">{{ errorMessage }}</span> -->
        <div class="vx-row">
          <div class="vx-col sm:w-5/6 w-full mb-2">
            <h6>Story Name</h6>
            <vs-input
              class="w-full"
              label=""
              v-model="storyname"
              name="story name"
            />
            <span class="text-danger text-sm">{{
              errors.first("story_name")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/6 w-full">
            <vs-button
              class="mr-3 mt-3"
              :disabled="!validateForm"
              @click="story"
              >Submit</vs-button
            >
            <!-- <vs-button color="warning" type="border" class="mb-2" @click="input25 = input26 = input27 = input28 = input29 = input30 = ''; check7 = false;">Reset</vs-button> -->
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-5/6 w-full mb-2">
            <h6>Story select</h6>
            <v-select
              class="w-full"
              label="name"
              :options="rowdata"
              v-model="storyselect"
              @input="RefreshGrid"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              name="story_select"
              v-validate="'required'"
              data-vv-validate-on="blur"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("story_select") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/6 w-full mb-2">
            <vs-button
              class="mr-1 mt-4"
              color="warning"
              :disabled="!validateName"
              @click="editstory"
              >Edit Story Name</vs-button
            >
            <!-- <vs-button color="warning" type="border" class="mb-2" @click="input25 = input26 = input27 = input28 = input29 = input30 = ''; check7 = false;">Reset</vs-button> -->
          </div>
        </div>
      </vx-card>

      <vx-card title="Build Story" class="mt-3">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label"><b>Start With </b></small>
            <v-select
              class="w-full"
              label="durationCode"
              :options="duration"
              v-model="selectvalue"
              @input="newstoryvalue"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="start_with"
              data-vv-validate-on="blur"
            />
            <span class="text-danger text-sm">
              {{ errors.first("start_with") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label">Response Name </small>
            <v-select
              class="w-full"
              multiple
              id="multiple_response"
              :closeOnSelect="false"
              label="responsename"
              :options="responsedata"
              v-model="responsename"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            >
            </v-select>
            <span class="text-danger text-sm">{{
              errors.first("responsename")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label">Intent Name </small>
            <v-select
              class="w-full"
              label="intent"
              :options="rowdatas"
              v-model="assignintent"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="{ required: assignentity !== '' }"
              name="intent"
            >
            </v-select>
            <span class="text-danger text-sm">{{
              errors.first("intent")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label mt-2">Entity Key </small>
            <v-select
              class="w-full"
              label="Entitykey"
              :options="newsentence"
              v-model="assignentity"
              @input="button"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
            <span class="text-danger text-sm">{{
              errors.first("assignentity")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label mt-2">Entity value </small>
            <v-select
              class="w-full"
              label="Entityvalue"
              :options="entitycard"
              @input="newbutton"
              v-model="assignentityvalue"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="{ required: assignentity !== '' }"
              name="entity_value"
            />

            <span class="text-danger text-sm">{{
              errors.first("entity_value")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label mt-2">Form Name </small>
            <v-select
              class="w-full"
              label="formname"
              :options="userlistnewdata"
              v-model="formname"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label mt-2">Action Name </small>
            <v-select
              class="w-full"
              label="actionname"
              :options="newlistdata"
              v-model="actionname"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>

          <div class="vx-col sm:w-1/3 w-full mt-6">
            <vs-button type="filled" color="primary" @click="buildstory"
              >Save</vs-button
            >
          </div>
        </div>

        <div class="mt-5 w-full">
          <vs-textarea
            v-model="textfile"
            color="white"
            id="textarea"
            rows="13"
            max-rows="13"
            height="355px"
          />
        </div>
        <div class="flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2 mr-2" @click="deletestory"
            >Delete Story</vs-button
          >
          <vs-button class="mt-2 mr-2" @click="storybuild"
            >Save Story</vs-button
          >
        </div>
      </vx-card>
    </div>
  </div>
</template>








<script>
import vSelect from "vue-select";
import axios from "axios";
import { VTree, VSelectTree } from "vue-tree-halower";
import { Base_URL } from "./../../api.config";
import Vue from "vue";
Vue.component("v-select", vSelect);
import { Validator } from "vee-validate";
const dict = {
  custom: {
    entity_value: {
      required: "Please select entity value",
    },
    entity_key: {
      required: "Please select entity key",
    },
    story_select: {
      required: "Please select story",
    },
    start_with: {
      required: "Please select start with",
    },
    intent: {
      required: "Please select intent name",
    },
  },
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      abc: "",
      required: "",
      newmessage: "",
      responsename: "",
      storyname: "",
      storyselect: "",
      chatbotname: "",
      textarea: "",
      formname: "",
      actionname: "",
      userlistnewdata: [],
      newlistdata: [],
      rowdata: [],
      rowdatas: [],
      storynew: "",
      story12: [],
      textfile: [],
      responsedata: [],
      newsentence: [],
      entitycard: [],
      buttonnew: [],
      selectvalue: "",
      message: "",
      errorMessage: "",
      assignintent: "",
      Title: "",
      title: "",
      assignentityvalue: "",
      assignentity: "",
      initSelected: ["node-1"],
      treeData: [
        {
          title: "node1",
          expanded: false,
          async: true,
        },
      ],

      duration: [
        {
          durationCode: "Response Name (from Bot)",
        },
        {
          durationCode: "Intent (Inputs from User)",
        },
      ],
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.storyname !== "" &&
        /^\S{3,}$/.test(this.storyname)
      );
    },
    validateForms() {
      return (
        !this.errors.any() && this.storyselect !== "" && this.textfile !== ""
      );
    },
    validateName() {
      return !this.errors.any() && this.storyselect !== "";
    },
    validateFormss() {
      return !this.errors.any() && this.storyselect !== "";
    },
    validateFormresponse() {
      return !this.errors.any() && this.responsename !== "";
    },
  },
  components: {
    VTree,
    VSelectTree,

    "v-select": vSelect,
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");

    // axios.get(Base_URL.Actual_URL+'alluser',{
    this.getStoryNames();
    // this.test();
  },

  methods: {
    getStoryNames() {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "storyselect", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.rowdatas = response.data.userlists;
          this.newsentence = response.data.sentence;
          this.responsedata = response.data.response1;
          this.buttonnew = response.data.button;
          this.userlistnewdata = response.data.userlistnew;
          this.newlistdata = response.data.userlistnews;
        });
    },
    newfunction() {},
    buildstory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var chatbot_id = localStorage.getItem("chatbot_id");

          var chatbotname = localStorage.getItem("chatbotname");
          axios
            .post(Base_URL.Actual_URL + "storiesdata", {
              select_value: this.selectvalue.durationCode,
              chatbotname: chatbotname,
              chatbot_id: chatbot_id,
              entity_key: this.assignentity.Entitykey || this.assignentity,
              intent: this.assignintent.intent || this.assignintent,
              entityvalue:
                this.assignentityvalue.Entityvalue || this.assignentityvalue,
              responsename: this.responsename,
              storyname: this.storyselect.name,
              actionname: this.actionname.actionname || this.actionname,
              formname: this.formname.formname || this.formname,
            })

            .then((response) => {
              this.textfile = response.data.userlistt;
              this.newmessage = response.data.message;
              this.responsename = "";
              //this.selectvalue="";
              this.assignintent = "";
              this.assignentityvalue = "";
              this.assignentity = "";
              this.formname = "";
              this.actionname = "";
              this.selectvalue = "";
              // this.storyselect = ''
              if (response.data.code == 200) {
                this.$vs.notify({
                  color: "success",
                  title: "Data Saved",
                  text: "Data saved successfully.",
                  position: "top-center",
                });
              }
            });
        }
      });
    },
    button: function (e) {
      this.assignentityvalue = "";
      if (e !== null) {
        var chatbot_id = localStorage.getItem("chatbot_id");
        if (this.assignintent == "" && this.assignentityvalue == "") {
          var abc =
            "Please select Intent before selecting Entity Key and Entity value ";

          this.$vs.notify({
            title: ` ${abc}`,
            position: "top-center",
          });
        }

        axios
          .post(Base_URL.Actual_URL + "entityvalue", {
            company_id: localStorage.company_id,
            chatbot_id: chatbot_id,
            entity_key: this.assignentity.Entitykey,
          })
          .then((response) => {
            this.entitycard = response.data.entity;
          });
      } else {
        this.assignentityvalue = "";
        this.assignentity = "";
      }
    },
    newbutton() {
      if (this.assignintent == "" && this.assignentity == "") {
        var abc =
          "Please select Intent and Entity Key before selecting  Entity value ";
        //console.log(this.abc,"abc is printed")
        this.$vs.notify({
          title: ` ${abc}`,
          position: "top-center",
        });
      }
    },
    newstoryvalue() {
      if (this.storyselect == "") {
        var abc = "Please select Story";
        this.$vs.notify({
          title: ` ${abc}`,
          position: "top-center",
        });
      }
    },
    nodechecked(node, v) {
      //alert('that a node-check envent ...' + node.title + v)
    },
    async asyncLoad(node) {
      const { checked = false } = node;
      this.$set(node, "loading", true);
      let pro = await new Promise((resolve) => {
        setTimeout(resolve, 2000, [
          { title: "test1", async: true },
          { title: "test2", async: true },
          { title: "test3" },
        ]);
      });
      if (!node.hasOwnProperty("children")) {
        this.$set(node, "children", []);
      }
      node.children.push(...pro);
      this.$set(node, "loading", false);
      if (checked) {
        this.$refs.tree.childCheckedHandle(node, checked);
      }
    },
    deletestory() {
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "deletestory", {
          delete: 1,
          name: this.storyselect.name,
          story: this.textfile,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          if (response.data.code == 100) {
            this.textfile = "";
            this.storyselect = "";
            this.$vs.notify({
              color: "danger",
              title: "Delete Record",
              text: "The selected Story was successfully deleted",
              position: "top-center",
            });
            this.getStoryNames()
          }
        });
    },
    editstory() {
      axios
        .post(Base_URL.Actual_URL + "editstory", {
          Edit: 2,
          storyname: this.storyselect.name,
                 company_id: localStorage.company_id,
                chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          var storyData = response.data.userlist;
          this.$router.push({
            name: "editstoryname",
            params: { id: storyData[0].id },
          });
        });
    },

    storybuild() {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "storybuild", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
          selectedDuration: this.storyselect.name,
          textarea: this.textfile,
        })
        .then((response) => {
          if (response.data.code == 200) {
            this.textfile = "";
            this.storyselect = "";
            this.$vs.notify({
              color: "success",
              title: "Story Record",
              text: "New Story is Added",
              position: "top-center",
            });
          }
        });
    },
    RefreshGrid: function () {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "storyselectnew", {
          storyname: this.storyname,
          chatbot_id: chatbot_id,
          selectedDuration: this.storyselect.name,
        })
        .then((response) => {
          this.textfile = response.data.story12;
        });
    },
    story() {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "storyname", {
          storyname: this.storyname,
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          if (response.data.code == 200) {
            this.storyname = "";
            this.message = response.data.message;
            this.getStoryNames();
            this.$vs.notify({
              title: "Story Name Saved",
              text: "Storyname Saved Successfully",
              color: "success",
              position: "top-center",
            });
          } 
          if (response.data.code == 100) {
                  this.$vs.notify({
                    color: "danger",
                    text: response.data.message,
                    position: "top-center",
                  });
                }
        });
    },
  },
};
</script>
<style>

@media only screen and (max-width: 600px) {
  span.vs__selected {
    width: 15rem !important;
    display: inline-block !important;
    max-width: 100%;
    box-sizing: border-box;
    white-space: normal !important;
    word-wrap: break-word !important; ;
    word-break: break-all !important;;
  }
}
</style>
         