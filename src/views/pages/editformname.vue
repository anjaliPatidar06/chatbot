

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Form">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Form Name"
              v-validate="'required|max:150'"
              name="formname"
              v-model="rowdata[0].formname"
            />
            <span class="text-danger text-sm">{{
              errors.first("formname")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <small class="date-label"> Slot Name </small>
            <v-select
              class="w-full"
              label="slotname"
              :options="slotdata"
              v-model="rowdata[0].slotlist"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="slot_name"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Slot validation"
              name="slot_validation"
              v-validate="{ required: slotmessage != '' }"
              data-vv-validate-on="blur"
              v-model="rowdata[0].condition"
              @input="checkError"
            />
            <span class="text-danger text-sm">{{
              errors.first("slot_validation")
            }}</span>
          </div>
          <!-- <vs-input
              class="w-full"
              label="Slot Message"
              name="store_message"
              v-model="rowdata[0].retry_message"
            v-validate="{required: rowdata[0].condition !=''}" data-vv-validate-on="blur"
            /> -->
          <div class="vx-col sm:w-1/2 w-full">
            <h6 class="mt-2 ml-1">Slot Message</h6>
            <div class="vx-row ml-1">
              <div
                id="editor1"
                contenteditable
                class="sm:w-1/2"
                @input="checkError"
                v-html="rowdata[0].retry_message"
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
                @select="selectEmoji1"
                v-if="showEmojis"
                :showSearch="true"
                emojisByRow="8"
                :dark="false"
              />
            </div>
            <span class="text-danger text-sm" v-if="response_error"
              >Please enter slot message</span
            >
          </div>
          <div class="flex items-center mt-5">
            <span class="mt-3 ml-4 mr-4">To Store Data</span>
            <vs-switch
              v-model="rowdata[0].store_data"
              style="size: 30px"
              class="mt-3"
            />
          </div>
        </div>

        <div class="vx-col w-full mt-5">
          <vs-button v-on:keyup.enter="Update" @click="Update" class="mr-3 mb-2"
            >Update</vs-button
          >
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import { Validator } from "vee-validate";

const dict = {
  custom: {
    slot_name: {
      required: "Please select slot name",
    },
    formname: {
      required: "Please enter form name",
    },
    slot_validation: {
      required: "Please enter slot validation",
    },
    // store_message: {
    //   required: "Please enter slot message",
    // },
  },
};
Validator.localize("en", dict);
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";
import { VEmojiPicker } from "v-emoji-picker";

export default {
  data() {
    return {
      rowdata: {
        formname: "",
        condition: "",
        retry_message: "",
        slotlist: "",
        slotname: "",
        slotdata: "",
      },
      name: "",
      slotdata: [],
      company: "",
      selectcategory: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      selectedCountry: "",
      selectedCountry1: "",
      showEmojis: false,
      response_error: false,
      slotmessage:''
    };
  },

  components: {
    "v-select": vSelect,
    VEmojiPicker,
  },
  computed: {},
  mounted() {
    var newemail = localStorage.getItem("email");

    var chatbot_id = localStorage.getItem("chatbot_id");

    axios
      .post(Base_URL.Actual_URL + "formtablenew", {
        company_id: localStorage.company_id,
        chatbot_id: chatbot_id,
      })
      .then((response) => {
        this.slotdata = response.data.userlist;
      });
    const url = Base_URL.Actual_URL + "editformname/";

    const id = this.$route.params.id;
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      this.rowdata = response.data.userlist;
      console.log(this.rowdata[0].retry_message,'this.rowdata[0].retry_message')
      this.slotmessage = this.rowdata[0].retry_message
    });
  },
  methods: {
    onPaste(e) {
         e.preventDefault()
           var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
    }, 
    checkError() {
            this.slotmessage = document.getElementById("editor1").innerHTML;
      if (this.rowdata[0].condition != "") {
        if (
          document.getElementById("editor1").innerHTML == "" ||
          document.getElementById("editor1").innerHTML == null
        ) {
          this.response_error = true;
          return true
        } else {
          this.response_error = false;
          return false
        }
      }  else if (
          document.getElementById("editor1").innerHTML != "" ||
          document.getElementById("editor1").innerHTML != null
        ) {
           this.response_error = false;
           return false
        }
    },
    selectEmoji1(emoji) {
      var sel, range;
      document.getElementById("editor1").focus();
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

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
        this.response_error = false
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
    strip(html) {
      html = html.replace(/<b>/g, "");
      html = html.replace(/<\/b>/g, "");
      return html;
    },
    makeBold2(Id) {
      if (Id == "editor2") {
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
            // alert("The bold formatting will be removed from the selected text.");
            break;
          case false:
            // alert("The selected text will be displayed in bold.");
            break;
          case null:
            // alert("The state of the 'bold' command is indeterminable.");
            break;
        }
        document.execCommand("italic");
      }
    },
    makeItalic2(Id) {
      if (Id == "editor2") {
        var state = document.queryCommandState("italic");
        switch (state) {
          case true:
            // alert("The bold formatting will be removed from the selected text.");
            break;
          case false:
            // alert("The selected text will be displayed in bold.");
            break;
          case null:
            // alert("The state of the 'bold' command is indeterminable.");
            break;
        }
        document.execCommand("italic");
      }
    },

    Italic(Id) {
      var highlight = window.getSelection().toString();
      if (highlight == "") {
        document.getElementById(Id).innerHTML =
          document.getElementById(Id).innerHTML +
          '<span style="font-style: normal;">&nbsp; </span>';
      } else {
        if (this.selectionIsItalic()) {
          var span =
            '<span style="font-style: normal;">' + highlight + "</span>";
          document.getElementById(Id).innerHTML = document
            .getElementById(Id)
            .innerHTML.replace(highlight.trim(), span);
        } else {
          var span =
            '<span style="font-style: italic;">' + highlight + "</span>";
          document.getElementById(Id).innerHTML = document
            .getElementById(Id)
            .innerHTML.replace(highlight.trim(), span);
        }
      }
    },
    closeEmojiContainer() {
      this.showEmojis = false;
    },
    showEmojiContainer() {
      this.showEmojis = true;
    },
    Update() {
            this.slotmessage = document.getElementById("editor1").innerHTML;
            console.log(this.slotmessage,'slotmessager')
      if (this.rowdata[0].condition != "") {
        console.log("first if", this.slotmessage, this.response_error);
        if (this.slotmessage == "" || this.slotmessage == null) {
          console.log("secnd if");
          this.response_error = true;
        } else {
          console.log("else222222");
          this.response_error = false;
          this.apiCall();
        }
      } else {
        this.response_error = false;
        this.apiCall();
      }
    },
    apiCall() {
     if(!this.checkError()){
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log("validated");
          var newemail = localStorage.getItem("email");
          var chatbot_id = localStorage.getItem("chatbot_id");

          const url = Base_URL.Actual_URL + "editformname/";
          const id = this.$route.params.id;
          const url1 = url + id;
          axios
            .post(url1, {
              formname: this.rowdata[0].formname,
              retry_message: document.getElementById("editor1").innerHTML,
              condition: this.rowdata[0].condition,
              slotname:
                this.rowdata[0].slotlist.slotname || this.rowdata[0].slotlist,
              chatbot_id: chatbot_id,
              company_id: localStorage.company_id,
              store_data: this.rowdata[0].store_data,
            })
            .then((response) => {
              this.msg = response.data.msg;

              if (response.data.code == 200) {
                this.$emit("updateformComponent");

                this.$vs.notify({
                  color: "success",
                  title: "Form Record updated",
                  text: "The form data  is successfully updated",
                  position: "top-center",
                });
                this.msg = response.data.msg;
                this.$router.go(-1);
              }
            });
        }
      });
    }
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