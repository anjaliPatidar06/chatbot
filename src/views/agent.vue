<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <div class="vx-col sm:w-1/3 w-full mb-2">
        <h6>Select Chatbot Name</h6>
        <v-select
          class="w-full"
          label="chatbotname"
          :options="rowdata"
          v-model="selectIntent"
          @input="handleSelected"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
        >
        </v-select>
      </div>
      <div class="flex flex-wrap items-center justify-end">
        <vs-button class="mr-2 mb-4" @click="popupActive = true"
          >Create New Chatbot
        </vs-button>
        <vs-button
          class="mr-2 mb-4"
          @click="chatbotBackupActive = true"
          color="warning"
          >Chatbot Backup
        </vs-button>
      </div>
      <span style="color: red">{{ msg }}</span>
      <vs-popup
        class="holamundo"
        :active.sync="popupActive"
        title="Chatbot Name"
        @accept="addEvent1"
      >
        <span class="text-danger text-sm">{{
          errors.first("chatbot_name")
        }}</span>
        <vs-input
          name="chatbot_name"
          v-validate="'required'"
          class="w-full"
          label-placeholder="Chatbot Name"
          v-model="chatbotname"
          data-vv-validate-on="blur"
        />
        <vs-button class="mt-3" color="primary" @click="addEvent1" type="filled"
          >Save</vs-button
        >
      </vs-popup>
        <vs-prompt
          class="calendar-event-dialog"
        title="Chatbot Backup"
          accept-text="Save"
          @accept="chatbotBackup()"
          :is-valid="validBackupForm"
          :active.sync="chatbotBackupActive"
          @cancel="chatbotBackupActive = false"
        >
        <div class="vx-row">
          <div class="vx-col w-full mb-2">
            <small class="date-label">Select Chatbot </small>
            <v-select
              class="w-full"
              label="chatbotname"
              v-validate="'required'"
              name="chatbotSelected"
              :options="rowdata"
              v-model="chatbotSelected"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
            <span class="text-danger text-sm">{{
              errors.first("chatbotSelected")
            }}</span>
          </div>
       
        <div class="vx-col w-full mb-2">
          <small class="date-label">Chatbot Name</small>
          <vs-input
            name="chatbot_backup_name"
            v-validate="'required'"
            class="w-full"
            v-model="chatbot_backup_name"
            data-vv-validate-on="blur"
          /><span class="text-danger text-sm">{{
            errors.first("chatbot_backup_name")
          }}</span>
        </div>
         </div>
        <!-- <vs-button class="mt-3" color="primary" @click="chatbotBackup" type="filled"
          >Save</vs-button
        > -->
        </vs-prompt>
      <vx-card title="Agent Table" search>
        <!-- <vs-table search max-items="10" pagination :data="users" > -->
        <vs-table
          search
          max-items="10"
          pagination
          v-model="selected"
          :data="rowdata"
        >
          <template slot="thead">
            <vs-th style="width: 20%">Chatbot Name</vs-th>
            <vs-th>Deployed Url</vs-th>
            <vs-th>Train Chatbot</vs-th>
            <vs-th>Deploy chatbot</vs-th>

            <vs-th>Train status</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.chatbotname">
                {{ tr.chatbotname }}
              </vs-td>
              <vs-td :data="tr.deploystatus">
                <a v-bind:href="'http://' + tr.deploystatus" target="_blank">{{
                  tr.deploystatus
                }}</a>
              </vs-td>

              <vs-td>
                <div class="flex buttonload" v-if="tr.newstatus == null">
                  <!-- <template > -->
                  <vs-button
                    @click="training(tr.id, indextr)"
                    v-bind:id="'training' + tr.id"
                    type="filled"
                    icon-pack="feather"
                    icon="icon-play"
                    color="warning"
                    class="mr-2 buttontr"
                  >
                    Train
                  </vs-button>
                  <!-- <vs-button
                    v-else
                    :disabled="tr.chatbotname == 'Lead_Generation'"
                    type="filled"
                    icon-pack="feather"
                    icon="icon-play"
                    color="warning"
                    class="mr-2"
                  >
                    Train </vs-button
                  > -->
                </div>
                <div v-else-if="tr.newstatus != null">
                  <vs-button
                    @click="training(tr.id, indextr)"
                    v-bind:id="'training' + tr.id"
                    type="filled"
                    icon-pack="feather"
                    icon="icon-play"
                    color="warning"
                    class="mr-2 buttontr"
                    >Train</vs-button
                  >
                </div>
              </vs-td>
              <vs-td>
                <div class="flex">
                  <!-- <vs-button v-if="tr.chatbotname == 'Lead_Generation'"
                    :disabled="tr.chatbotname == 'Lead_Generation'"
                    @click="deploy(tr.id)"
                    type="filled"
                    icon-pack="feather"
                    icon="icon-upload"
                    color="primary"
                  >
                    Deploy</vs-button
                  > -->
                  <vs-button
                    @click="deploy(tr.id)"
                    :disabled="IsTraining"
                    type="filled"
                    icon-pack="feather"
                    icon="icon-upload"
                    color="primary"
                  >
                    Deploy</vs-button
                  >
                </div>
              </vs-td>
              <vs-td :data="tr.trainstatus">
                {{ tr.trainstatus }}
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
                    type="filled"
                    color="danger"
                    icon="delete"
                    aria-hidden="true"
                    @click="openConfirm(tr.id)"
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
import vSelect from "vue-select";
import { Base_URL } from "./../../api.config";
import { EventBus } from "../event-bus";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    chatbot_name: {
      required: "Please enter chatbot name",
    },
    chatbotSelected:{
      required: "Please select chatbot",
    },
    chatbot_backup_name:{
      required: "Please enter chatbot name",
    }
  },
};
Validator.localize("en", dict);

export default {
  name: "agent-component",
  props: ["agent"],
  data() {
    return {
      trainingID: 0,
      trainingData: "",
      chatbotname: "",
      activePromptAddEvent1: false,
      rowdata: [],
      selected: [],
      msg: "",
      message: "",
      mes: "",
      messages: "",
      valuedy: [],
      selectIntent: "",
      renderComponent: true,
      popupActive: false,
      IsTraining: false,
      trainingchatbot: [],
      chatbotBackupActive: false,
      chatbotSelected: "",
      chatbot_backup_name:'',
      deleteID:0
    };
  },
  watch: {
    selectIntent(newValue, oldValue) {
      // if (newValue !== oldValue) this.getItDone(newValue);
    },
    getFiles() {
      this.local_files = this.rowdata;
    },
  },
  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.chatbotname !== "";
    },
     validBackupForm() {
      return this.chatbot_backup_name !== "" && this.chatbotSelected !== "";
    },
  },
  mounted() {
    this.trainingID = localStorage.getItem("trainingID");
    this.chatbotList();
    if (this.trainingID == "") {
      document.querySelectorAll(".mr-2.buttontr").forEach((elem) => {
        elem.disabled = false;
      });
    } else {
      this.hidebutton();
      var chatbotidtrain = localStorage.getItem("chatbotidtrain");
      if (chatbotidtrain !== null && chatbotidtrain !== undefined) {
        this.IsTraining = true;
        this.trainingData = setInterval(() => {
          this.apicalling(chatbotidtrain);
        }, 30000);
      }
    }
  },
  methods: {
    openConfirm(id) {
      this.deleteID = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to delete this chatbot?',
        accept: this.acceptAlert
      })
    },
    acceptAlert() {
      this.deleteTableRow(this.deleteID)
    },
    chatbotBackup() {
        // this.$validator.validate().then((result) => {
        // if (result) {
      axios
        .post(Base_URL.Actual_URL + "chatbot_backup", {
          from_chatbot_id: this.chatbotSelected.id,
          from_company_id: localStorage.company_id,
          to_company_id: localStorage.company_id,
          chatbotname: this.chatbot_backup_name,
        })
        .then((response) => {
          this.chatbotBackupActive = false
          this.chatbotSelected = ''
          this.chatbot_backup_name= ''
          this.chatbotList()
          this.$vs.notify({
            color: "success",
            title: response.data.result,
            position: "top-center",
          });
        });
        // }
        // })
    },
    chatbotList() {
      axios
        .post(Base_URL.Actual_URL + "chatbottable", {
          company_id: localStorage.company_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          var trainingIDI = localStorage.getItem("trainingID");
          this.rowdata.forEach((ele) => {
            if (
              ele.newstatus !== null &&
              ele.newstatus !== "" &&
              ele.newstatus !== "NULL"
            ) {
              var test = ele.newstatus;
              // if (ele.newstatus === "Training Started") {
              //   console.log("matched");
              //   this.IsTraining = true;
              // }
            }
          });
          console.log("end for loop");
        });
    },
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    hidebutton() {
      if (document.querySelectorAll(".mr-2.buttontr").length > 0) {
        var ID = localStorage.trainingID;

        if (ID != null && ID != undefined) {
          document.querySelectorAll(".mr-2.buttontr").forEach((elem) => {
            elem.disabled = true;
          });
          document.getElementById(ID).innerHTML =
            '<i class="fa fa-refresh fa-spin"></i>&nbspTraining';
          const button = document.getElementById(ID);
          button.disabled = false;
        }
      } else {
        console.log("in else ");
        setTimeout(() => {
          this.hidebutton();
        }, 10);
      }
    },
    apicalling(trainingchatbot_id) {
      var chatbotidtrain = localStorage.getItem("chatbotidtrain");
      if (trainingchatbot_id != null) {
        axios
          .post(Base_URL.Actual_URL + "trainingchatbot_id", {
            chatbot_id: trainingchatbot_id,
          })
          .then((response) => {
            this.message = response.data.messages;

            if (this.message == "Try again") {
              var ID = localStorage.getItem("trainingID");

              document.querySelectorAll(".mr-2.buttontr").forEach((elem) => {
                elem.disabled = true;
              });
              this.IsTraining = true;
              // document.getElementById("training" + ID).innerText = 'Training';

              // document.getElementById(ID).innerText = 'Training'
              document.getElementById(ID).innerHTML =
                '<i  class="fa fa-refresh fa-spin"></i>&nbspTraining';
              const button = document.getElementById(ID);

              button.disabled = false;
            } else {
              clearInterval(this.trainingData);
              this.IsTraining = false;
              this.$vs.notify({
                color: "success",
                title: this.message,
                position: "top-center",
              });
              var Id = localStorage.getItem("chatbotidtrain");
              document.querySelectorAll(".mr-2.buttontr").forEach((elem) => {
                elem.disabled = false;
              });
              document.getElementById("training" + Id).innerHTML =
                '<i  class="fa fa-refresh fa-play"></i>&nbspTrain';
              const button = document.getElementById("training" + Id);
              button.disabled = false;
              localStorage.setItem("trainingID", "");
              localStorage.removeItem("trainingID");
              localStorage.removeItem("chatbotidtrain");
              this.chatbotList();
            }
          }, 10);
      }
    },

    handleSelected(tr) {
      localStorage.setItem("selected_chatbot", tr.chatbotname);
      localStorage.setItem("selected_chatbot_id", tr.id)
      EventBus.$emit("selectedChatbotName", tr.id);

      this.$vs.notify({
        text: `${tr.chatbotname} Chatbot Selected `,
        position: "top-center",
      });
      axios
        .post(Base_URL.Actual_URL + "selectchatbot", {
          //axios.post('Base_URL.Actual_URL+API_List.selectchatbot', {
          chatbotname: `${tr.chatbotname}`,
        })

        .then((response) => {
          this.chatbot_id = response.data.chatbot_id;
          this.valuedy = response.data.chatbotname;
          localStorage.setItem("chatbotname", this.valuedy);
          localStorage.setItem("chatbot_id", tr.id);
        });
    },
    deleteTableRow: function (idx) {
      this.deleteID = 0
      axios
        .post(Base_URL.Actual_URL + "deletechatbot", {
          delete: 1,
          idx: idx,
        })
        .then((res) => {
          EventBus.$emit("chatbotDeleted", idx);
          localStorage.setItem("selected_chatbot", "No Chatbot Selected");
          localStorage.removeItem("selected_chatbot_id")
          this.selectIntent = "";
          this.$vs.notify({
            color: "danger",
            title: "Chatbot Deleted.",
            text: "The selected chatbot is successfully deleted",
            position: "top-center",
          });
          var Id = localStorage.getItem("chatbotidtrain");
          document.querySelectorAll(".mr-2.buttontr").forEach((elem) => {
            elem.disabled = false;
          });
          this.IsTraining = false;
          localStorage.removeItem("chatbotidtrain");
          localStorage.removeItem("trainingID");
          this.chatbotList();
        });
      this.counter--;
      this.rowdata.splice(idx, 1);
    },
    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editchatbot", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;
          this.id = this.email[0].id;
          this.$router.push({
            name: "editchatbotname",
            params: { id: this.id },
          });
        });
    },

    training: function (id, index) {
      this.IsTraining = true;

      document.querySelectorAll(".mr-2.buttontr").forEach((elem) => {
        elem.disabled = true;
      });
      document.getElementById("training" + id).innerHTML =
        '<i class="fa fa-refresh fa-spin"></i>&nbspTraining';
      const button = document.getElementById("training" + id);
      button.disabled = false;

      localStorage.setItem("chatbotidtrain", id);
      localStorage.setItem("trainingID", "training" + id);
      axios
        .post(Base_URL.Actual_URL + "trainingchatbotid", {
          chatbot_id: id,
        })
        .then((response) => {
          this.IsTraining = true;
          this.message = response.data.messages;
          document.getElementById("training" + id).innerText = this.message;
          document.getElementById("training" + id).innerHTML =
            '<i class="fa fa-refresh fa-spin"></i>&nbsp' + this.message;
          this.trainingData = setInterval(() => {
            this.apicalling(id);
          }, 30000);
        });
    },

    deploy: function (index) {
      this.$vs.loading();
      setTimeout(() => {}, 6500);
      axios
        .post(Base_URL.Actual_URL + "deploychatbotid", {
          chatbot_id: index,
        })
        .then((response) => {
          if (response.data.code == 200) {
            this.$vs.notify({
              text: response.data.messages,
              color: "success",
              position: "top-center",
            });
            this.chatbotList();
          } else {
            this.$vs.notify({
              text: response.data.messages,
              color: "danger",
              position: "top-center",
            });
          }
          this.$vs.loading.close();
        });
      this.mes = "";
    },

    addEvent1() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.email;
          axios
            .post(Base_URL.Actual_URL + "chatbotname", {
              company_id: localStorage.company_id,
              chatbotname: this.chatbotname,
            })
            .then((response) => {
              this.popupActive = false;
              this.chatbotname = "";
              if (response.data.code == 200) {
                this.$vs.notify({
                  title: "Chatbot Added",
                  text: "Chatbot added successfully.",
                  color: "success",
                  position: "top-center",
                });
                this.chatbotList();
              } else {
                this.$vs.notify({
                  text: response.data.msg,
                  color: "danger",
                  position: "top-center",
                });
              }
            });
        }
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.trainingData);
  },
};
</script>
<style >
.buttonload {
  /* background-color: #4CAF50; Green background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 12px 16px; /* Some padding */
  font-size: 16px; /* Set a font size */
}
</style>



