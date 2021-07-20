<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Slot(Same As Entity Name) ">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Slot Name</h6>
            <vs-input
              class="w-full"
              label=""
              v-model="slotname"
              v-validate="'required'"
              name="slot_name"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Slot Type</h6>
            <v-select
              class="w-full"
              v-model="selectedDuration"
              label="durationName"
              :options="duration"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="slot_type"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_type") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2" @click="slot">Submit</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Slot Table">
        <vs-table search :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 40%">Slot Name</vs-th>
            <vs-th style="width: 40%">Slot Type</vs-th>

            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.slotname">
                {{ tr.slotname }}
              </vs-td>

              <vs-td :data="tr.slottype">
                {{ tr.slottype }}
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
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import axios from "axios";
import { Base_URL } from "./../../api.config";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    slot_type: {
      required: "Please select slot type",
    },
    slot_name: {
      required: "Please enter slot name",
    },
  },
};
Validator.localize("en", dict);
export default {
  name: "slot-component",
  data() {
    return {
      actionname: "",
      rowdata: [],
      responsedata: [],
      responsename: "",
      chatbotname: "",
      selectedDuration: "",
      showDate: new Date(),
      selectedDuration: "",
      disabledFrom: false,
      id: 0,
      title: "",
      startDate: "",
      endDate: "",
      rowdata: [],
      url: "",
      calendarView: "month",
      slotname: "",
      slottype: "",
      message: "",
      duration: [
        {
          durationCode: "text",
          durationName: "text",
        },
        {
          durationCode: "bool",
          durationName: "bool",
        },

        {
          durationCode: "list",
          durationName: "list",
        },
        {
          durationCode: "unfeaturized",
          durationName: "unfeaturized",
        },
      ],
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.actionname !== "";
    },
  },
  components: {
    "v-select": vSelect,
  },

  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");
    this.getData();
  },

  methods: {
    slot() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.getItem("email");
          var chatbot_id = localStorage.getItem("chatbot_id");

          axios
            .post(Base_URL.Actual_URL + "domainslot", {
              slotname: this.slotname,
              company_id: localStorage.company_id,
              durationname: this.selectedDuration.durationName,
              CategoricalType: this.title,
              chatbot_id: chatbot_id,
            })
            .then((response) => {
              this.message = response.data.message;
              if (response.data.code == 100) {
                this.$emit("updateSlotComponent");
                this.$vs.notify({
                  color: "success",
                  title: "Slot data saved",
                  text: "The Slot data is successfully Added",
                  position: "top-center",
                });
                this.getData();
              }
            });
        }
      });
    },
    getData() {
      var newemail = localStorage.getItem("email");
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "slottable", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
        });
    },
    deleteTableRow: function (idx) {
      var newemail = localStorage.getItem("email");
      axios
        .post(Base_URL.Actual_URL + "slotdelete", {
          delete: 1,
          idx: idx,
          company_id: localStorage.company_id,
        })
        .then(() => {
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.counter--;
          this.rowdata.splice(idx, 1);
          this.getData();
        });
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editslot", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;

          this.id = this.email[0].id;

          this.$router.push({ name: "editslotname", params: { id: this.id } });
        });
    },
  },
};
</script>