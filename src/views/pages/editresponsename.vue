<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Response">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <h6>Response name</h6>
            <vs-input
              class="w-full"
              v-validate="'required|max:150'"
              data-vv-validate-on="blur"
              name="response_name"
              v-model="rowdata[0].responsename"
            />
            <span class="text-danger text-sm">{{
              errors.first("response_name")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <!-- <vx-input-group>
              <template slot="append">
                <div class="append-text bg-primary">
                  <span
                    class="input-group-text"
                    @click="showEmojiContainer"
                    v-if="!showEmojis"
                  >
                    <i class="fa fa-smile-o" aria-hidden="true"></i>
                  </span>
                  <span
                    class="input-group-text"
                    @click="closeEmojiContainer"
                    v-if="showEmojis"
                  >
                    <i class="fa fa-chevron-down" aria-hidden="true"></i
                  ></span>
                </div>
              </template>

              <vs-input
                class="w-full"
                label="Response Text"
                v-validate="'required|max:350'"
                data-vv-validate-on="blur"
                name="response_text"
                v-model="rowdata[0].text"
              />
            </vx-input-group> -->
            <h6>Response Text</h6>
            <div class="vx-row ml-1">
              <div
                id="editor1"
                contenteditable
                class="sm:w-1/2"
                @input="checkError"
                @paste="onPaste1"
                v-html="rowdata[0].text"
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
            </div>
            <span class="text-danger text-sm">{{
              errors.first("response_text")
            }}</span>
            <VEmojiPicker
              @select="selectEmoji1"
              v-if="showEmojis"
              :showSearch="true"
              emojisByRow="8"
              :dark="false"
            />
          </div>

          <div class="vx-col sm:w-1/2 w-full mb-2 ml-1" :data="rowdata">
            <h6>Mutiple Response Text</h6>
            <!-- <vs-input
              class="w-full"
              name="Response Text"
              v-model="rowdata[0].textnew"
            /> -->
            <div class="vx-row ml-1">
              <div
                id="editor2"
                contenteditable
                class="sm:w-1/2"
                v-html="rowdata[0].textnew"
                @paste="onPaste2"
              ></div>

              <div class="sm:w-1/2">
                <vs-button
                  @click="showEmojiContainer2"
                  style="border-radius: 0"
                  v-if="!showEmojis2"
                >
                  <i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>
                </vs-button>
                <vs-button
                  @click="closeEmojiContainer2"
                  style="border-radius: 0"
                  v-if="showEmojis2"
                >
                  <i class="fa fa-chevron-down" aria-hidden="true"></i>
                </vs-button>

                <vs-button
                  @click="makeBold2('editor2')"
                  style="border-radius: 0"
                  ><i class="fa fa-bold fa-lg" aria-hidden="true"></i
                ></vs-button>
                <vs-button
                  @click="makeItalic2('editor2')"
                  style="
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  "
                  ><i class="fa fa-italic fa-lg" aria-hidden="true"></i
                ></vs-button>
              </div>
            </div>
            <!-- <span class="text-danger text-sm">{{
              errors.first("response_text")
            }}</span> -->
            <VEmojiPicker
              @select="selectEmoji2"
              v-if="showEmojis2"
              :showSearch="true"
              emojisByRow="8"
              :dark="false"
            />
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
const dict = {
  custom: {
    response_name: {
      required: "Please enter response name"
      // alpha: "Your first name may only contain alphabetic characters",
    },
    response_text: {
      required: "Please enter response Text"
    }
  }
};
Validator.localize("en", dict);
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";
import { EventBus } from "../../event-bus";
import { VEmojiPicker } from "v-emoji-picker";

export default {
  data() {
    return {
      rowdata: {
        responsename: "",
        text: "",
        textnew: ""
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
      showEmojis: false,
      // checkError: false,
      showEmojis2: false
    };
  },

  components: {
    "v-select": vSelect,
    VEmojiPicker
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.rowdata[0].responsename.length > 0 &&
        this.rowdata[0].text.length > 0
      );
    }
  },
  mounted() {
    this.entityData();
    // this.onPaste1()
    // this.onPaste2()
  },
  methods: {
    entityData() {
      const url = Base_URL.Actual_URL + "editresponsename/";
      const id = this.$route.params.id;
      const url1 = url + id;
      axios.get(url1, {}).then(response => {
        this.rowdata = response.data.userlist;
      });
    },
    onPaste1(e) {
      //  alert('paste111')
      //        var ce = document.querySelector("div#editor1");

      //   ce.addEventListener("paste", function (e) {
      e.preventDefault();
      //   console.log('isndie paste')
      //   var text = e.clipboardData.getData("text/plain");
      //   document.execCommand("insertText", false, text);
      // });
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    },
    onPaste2(e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
      // var ce = document.querySelector("div#editor2");
      // console.log(ce,'cece')
      // ce.addEventListener("paste", function (e) {
      //   console.log('isnide paste 2')
      //   // e.preventDefault();
      //   var text = e.clipboardData.getData("text/plain");
      //   document.execCommand("insertText", false, text);
      // });
    },
    checkError() {
      if (
        document.getElementById("editor1").innerHTML == "" ||
        document.getElementById("editor1").innerHTML == null
      ) {
        this.response_error = true;
      } else {
        this.response_error = false;
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
            break;
          case false:
            break;
          case null:
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
            break;
          case false:
            break;
          case null:
            break;
        }
        document.execCommand("italic");
      }
    },
    // fontBold(Id) {
    //   var highlight = window.getSelection().toString();
    //   console.log("heyy", highlight, "textt function");
    //   console.log("heyy", highlight.trim(), "trim text function");

    //   if (highlight == "") {
    //     document.getElementById(Id).innerHTML =
    //       document.getElementById(Id).innerHTML +
    //       '<span style="font-weight:initial;">&nbsp; </span>';
    //     if (Id == "editor1") {
    //       this.rowdata[0].text = document.getElementById(Id).innerHTML;
    //     } else {
    //       this.rowdata[0].textnew = document.getElementById(Id).innerHTML;
    //     }
    //   } else {
    //     // console.log("heyey elseee");
    //     if (this.selectionIsBold()) {
    //       alert('if bold')
    //       // var span =
    //       //   '<span style="font-weight:initial;">' + highlight + "</span>";
    //       var span = '<p>'+ highlight + '</p>'
    //       document.getElementById(Id).innerHTML = document
    //         .getElementById(Id)
    //         .innerHTML.replace(highlight, span);
    //       if (Id == "editor1") {
    //         this.rowdata[0].text = document.getElementById(Id).innerHTML;
    //       } else {
    //         this.rowdata[0].textnew = document.getElementById(Id).innerHTML;
    //       }
    //     } else {
    //       // alert('not bold')
    //       console.log(highlight, Id, "highlight");
    //       var span1 =
    //         '<span style="font-weight:bold;">' + highlight + "</span>";
    //       document.getElementById(Id).innerHTML = document
    //         .getElementById(Id)
    //         .innerHTML.replace(highlight, highlight.trim().bold());

    //       console.log(document.getElementById(Id).innerHTML);
    //       // ).innerHTML,Id,' document.getElementById(Id')
    //       // console.log(document.getElementById(Id).innerHTML,' hc3rdewjkfekj')
    //       // console.log(this.rowdata[0].text ,'row data text')
    //       if (Id == "editor1") {
    //         this.rowdata[0].text = document.getElementById(Id).innerHTML;
    //       } else {
    //         this.rowdata[0].textnew = document.getElementById(Id).innerHTML;
    //       }
    //     }
    //   }
    // },
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
    // selectEmoji1(emoji) {
    //   console.log(emoji);
    //   this.rowdata[0].text = this.rowdata[0].text + emoji.data;
    // },
    showEmojiContainer() {
      this.showEmojis = true;
    },
    closeEmojiContainer2() {
      this.showEmojis2 = false;
    },
    selectEmoji2(emoji) {
      document.getElementById("editor2").focus();
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

          // Range.createContextualFragment() would be useful here but is
          // non-standard and not supported in all browsers (IE9, for one)
          var el = document.createElement("div");
          el.innerHTML = emoji.data;
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
      }
    },
    showEmojiContainer2() {
      this.showEmojis2 = true;
    },
    Update() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const url = Base_URL.Actual_URL + "editresponsename/";
          const id = this.$route.params.id;
          const url1 = url + id;
          axios
            .post(url1, {
              responsename: this.rowdata[0].responsename,
              text: document.getElementById("editor1").innerHTML,
              textnew: document.getElementById("editor2").innerHTML
            })
            .then(response => {
              this.msg = response.data.msg;

              if (response.data.code == 200) {
                this.msg = response.data.msg;
                this.$vs.notify({
                  title: "Edit Response ",
                  text: "The Response data is updated",
                  color: "success",
                  position: "top-center"
                });
                EventBus.$emit("selectedComponent", "responseEvent");
                this.$router.go(-1);
              }
               if (response.data.code == 100) {
                    this.$vs.notify({
                    color: "danger",
                    title: response.data.result,
                    position: "top-center",
                  });
                }
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.emoji-picker[data-v-f1d527bc] {
  width: 100%;
  /* max-height: 20rem;
  height: 100%; */
}
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
