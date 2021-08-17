

<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Form Name">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              class="w-full"
              label="Form Name"
              v-model="formname"
              v-validate="'required'"
              name="form_name"
            />
            <span class="text-danger text-sm">
              {{ errors.first("form_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <small class="date-label"> Slot Name </small>
            <v-select
              class="w-full"
              label="slotname"
              :options="slotdata"
              v-model="slotname"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="slot_name"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("slot_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              class="w-full"
              label="Slot Validation"
              v-model="slotvalidation"
              name="slot_validation"
              v-validate="{ required: slotmessage !== '' }"
              data-vv-validate-on="blur"
              @input="checkError"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_validation") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full">
            <h6 class="mt-2 ml-1">Slot Message</h6>
            <!-- <vs-input
              class="w-full"
              label="Slot Message"
              v-model="slotmessage"
              name="slot_message"
              v-validate="{ required: slotvalidation != '' }"
              data-vv-validate-on="blur"
            /> -->
            <!-- <span class="text-danger text-sm">
              {{ errors.first("slot_message") }}</span
            > -->
            <div class="vx-row ml-1">
              <div
                id="editor1"
                contenteditable
                class="sm:w-1/2"
                @input="checkError"
                @paste="onPaste"
              ></div>
              <div class="sm:w-1/2">
                <vs-button
                  @click="showEmojiContainer"
                  style="border-radius: 0"
                  v-if="!showEmojis"
                >
                  <i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>
                </vs-button>
                <vs-button
                  @click="closeEmojiContainer"
                  style="border-radius: 0"
                  v-if="showEmojis"
                >
                  <i class="fa fa-chevron-down" aria-hidden="true"></i>
                </vs-button>

                <vs-button @click="makeBold('editor1')" style="border-radius: 0"
                  ><i class="fa fa-bold fa-lg" aria-hidden="true"></i
                ></vs-button>
                <vs-button
                  @click="makeItalic('editor1')"
                  style="
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  "
                  ><i class="fa fa-italic fa-lg" aria-hidden="true"></i
                ></vs-button>
              </div>
              <VEmojiPicker
                @select="selectEmoji"
                v-if="showEmojis"
                :showSearch="true"
                emojisByRow="8"
                :dark="false"
              />
            </div>
            <span class="text-danger text-sm ml-1" v-if="response_error == true"
              >Please enter slot message.</span
            >
          </div>
          <div class="flex items-center mt-5">
            <span class="mt-3 ml-4 mr-4">To Store Data</span>
            <vs-switch v-model="calendar" style="size: 30px" class="mt-3" />
          </div>
        </div>
        <div class="vx-col sm:w-1/2 w-full mt-5">
          <vs-button class="mr-3" @click="formnew">Submit</vs-button>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card title="Form Table" search>
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th style="width: 20%">Form Name</vs-th>
            <vs-th style="width: 20%">slot Name</vs-th>
            <vs-th style="width: 20%">Slot Validation</vs-th>
            <vs-th style="width: 20%">Slot Message</vs-th>
            <vs-th style="width: 20%">Store Data</vs-th>
            <vs-th>Actions</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.formname">
                {{ tr.formname }}
              </vs-td>
              <vs-td :data="tr.slotlist">
                {{ tr.slotlist }}
              </vs-td>
              <vs-td :data="tr.condition">
                {{ tr.condition }}
              </vs-td>
              <vs-td :data="tr.retry_message" v-html="tr.retry_message">
              </vs-td>
              <vs-td :data="tr.store_data">
                {{ tr.store_data }}
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
import { Base_URL } from "./../../api.config";
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import { Validator } from "vee-validate";
import { VEmojiPicker } from "v-emoji-picker";

const dict = {
  custom: {
    slot_validation: {
      required: "Please enter slot validation",
    },
    slot_message: {
      required: "Please enter slot message",
    },
    slot_name: {
      required: "Please select slot name",
    },
    form_name: {
      required: "Please enter form name",
    },
  },
};
Validator.localize("en", dict);
export default {
  name: "form-component",
  data() {
    return {
      formname: "",
      rowdata: [],
      slotmessage: "",
      slotvalidation: "",
      slotdata: [],
      message: "",
      chatbotname: "",
      calendar: false,

      slotname: "",
      showEmojis: false,
      response_error: false,
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.formname !== "";
    },
  },
  components: {
    "v-select": vSelect,
    VEmojiPicker,
  },
  mounted() {
    this.chatbotname = localStorage.getItem("chatbotname");

    this.getFormData();
  },

  methods: {
    onPaste(e) {
         e.preventDefault()
           var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
    },     
    checkError() {
      this.slotmessage = document.getElementById("editor1").innerHTML;
      if (this.slotvalidation != "") {
        if (
          document.getElementById("editor1").innerHTML == "" ||
          document.getElementById("editor1").innerHTML == null
        ) {
          this.response_error = true;
          console.log('ifff true')
          return true
        } else {
          this.response_error = false;
          return false
        }
      } else if (
          document.getElementById("editor1").innerHTML != "" ||
          document.getElementById("editor1").innerHTML != null
        ) {
           this.response_error = false;
           return false
        }
    },
    selectionIsBold() {
      var isBold = false;
      if (document.queryCommandState) {
        isBold = document.queryCommandState("bold");
      }
      return isBold;
    },
    selectionIsItalic() {
      var isItalic = false;
      if (document.queryCommandState) {
        isItalic = document.queryCommandState("italic");
      }
      return isItalic;
    },
    makeBold(Id) {
      if (Id == "editor1") {
        var state = document.queryCommandState("bold");
        switch (state) {
          case true:
            break;
          case false:
            break;
          case null:
            break;
        }
        document.execCommand("bold");
      }
    },
    makeItalic(Id) {
      if (Id == "editor1") {
        var state = document.queryCommandState("italic");
        switch (state) {
          case true:
            break;
          case false:
            break;
          case null:
            break;
        }
        document.execCommand("italic");
      }
    },
    selectEmoji(emoji) {
      var sel, range;
      document.getElementById("editor1").focus();
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // non-standard and not supported in all browsers (IE9, for one)
          var el = document.createElement("div");
          el.innerHTML = emoji.data;
          this.response_error = false
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(emoji.data);
        console.log('select emoji else if')
      }
    },

    showEmojiContainer() {
      this.showEmojis = true;
    },
    closeEmojiContainer() {
      this.showEmojis = false;
    },
    getFormData() {
      var newemail = localStorage.getItem("email");

      var chatbot_id = localStorage.getItem("chatbot_id");

      axios
        .post(Base_URL.Actual_URL + "formtable", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;
          this.slotdata = response.data.slot;
        });
    },
    deleteTableRow: function (idx) {
      var newemail = localStorage.getItem("email");

      axios
        .post(Base_URL.Actual_URL + "formdelete", {
          delete: 1,
          idx: idx,
          company_id: localStorage.company_id,
        })
        .then(() => {
          this.counter--;
          this.rowdata.splice(idx, 1);
          this.$vs.notify({
            color: "danger",
            title: "Delete Record",
            text: "The selected Record was successfully deleted",
            position: "top-center",
          });
          this.getFormData();
        });
    },

    updateRecord: function (index) {
      // axios.post(Base_URL.Actual_URL+'editform', {
      axios
        .post(Base_URL.Actual_URL + "editform", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;

          this.id = this.email[0].id;
          this.$router.push({ name: "editformname", params: { id: this.id } });
        });
    },

    formnew() {
            this.slotmessage = document.getElementById("editor1").innerHTML;
      console.log(this.slotmessage, document.getElementById("editor1").innerHTML, "slotmessage");
      if (this.slotvalidation != "") {
        if (this.slotmessage == "" || this.slotmessage == null) {
          this.response_error = true;
        } else {
          this.saveApiCall();
        }
      } else {
        this.saveApiCall();
      }
    },
    saveApiCall() {
      console.log(this.checkError(),'this.checkError()')
        console.log('save api call')
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.response_error = false;
            var chatbot_id = localStorage.getItem("chatbot_id");
            axios
              .post(Base_URL.Actual_URL + "domainform", {
                formname: this.formname,
                company_id: localStorage.company_id,
                chatbot_id: chatbot_id,
                slotmessage: this.slotmessage,
                slotvalidation: this.slotvalidation,
                multipleslot: this.slotname.slotname,
                calendar: this.calendar,
              })
              .then((response) => {
                this.message = response.data.result;
                if (response.data.code == 100) {
                  this.getFormData();

                  this.$emit("updateFormComponent");
                  this.$vs.notify({
                    color: "success",
                    title: "Form Record",
                    text: "The form data  is successfully Added",
                    position: "top-center",
                  });
                }
              });
          }
        });
    },
  },
};
</script>
<style scoped>
.emoji-picker[data-v-f1d527bc] {
  width: 100%;
  /* max-height: 20rem;
  height: 100%; */
}
div#editor1 {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
  height: 38px;
  padding: 0.7rem !important;
}
div#editor2 {
  border-radius: 6px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
  height: 38px;
  padding: 0.7rem !important;
  letter-spacing: normal !important;
  word-spacing: normal !important;
  font-size: inherit !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}
</style>