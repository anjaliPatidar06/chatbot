import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="ChatBot UI Design">
        <span style="color: red">{{ entitycard }}</span>
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Chatbot Heading</h6>

            <vs-input
              class="w-full"
              v-validate="'max:14'"
              v-model="chatbotheading"
              name="chatbotheading"
            />
            <span class="text-danger text-sm">{{
              errors.first("chatbotheading")
            }}</span>
            <!-- <span class="text-danger text-sm">{{ errors.first('') }}</span> -->
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Select Font</h6>

            <v-select
              class="w-full"
              label="durationCode"
              :options="durations"
              v-model="selectedDuration"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            >
            </v-select>

            <p
              :style="{
                fontFamily: selectedDuration.durationCode,
                color: activecolor,
              }"
            >
              Some text to test font
            </p>
          </div>
          <div class="mb-2">
            <ul class="demo-alignment text-white">
              <li class="colorsuccessx">
                <input
                  @change="changeColor($event.target.value, 'success')"
                  type="color"
                  name=""
                  value=""
                />
                ChatBot UI Color
              </li>
            </ul>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-button class="mr-3 mt-4" @click="chatbotui">Submit</vs-button>
          </div>
        </div>
      </vx-card>
      <vx-card class="mt-5" title="Upload Bot Icon">
        <div class="vx-row">
          <template v-if="dataImg">
            <!-- Image Container -->
            <div
              class="img-container w-64 mx-auto flex items-center justify-center"
            >
              <img :src="dataImg" alt="img" class="responsive" />
            </div>

            <!-- Image upload Buttons -->
            <div class="mb-5">
              <input
                type="file"
                class="hidden"
                ref="updateImgInput"
                @change="updateCurrImg"
                accept="image/*"
              />
              <vs-button
                class="mb-base mr-3"
                color="danger"
                @click="$refs.updateImgInput.click()"
                size="large"
              >
                Update Image</vs-button
              >
              <vs-button
                color="primary"
                class="mb-base mr-3"
                @click="dataImg = null"
                size="large"
                >Remove Image</vs-button
              >
            </div>
          </template>
        </div>
        </vx-card>
      <vx-card class="mt-5" title="Upload ChatBot Logo">

          <div class="vx-row">
          <template v-if="dataImgnew">

          <!-- Image Container -->
          <div class="img-container w-64 mx-auto flex items-center justify-center">

          <img :src="dataImgnew" alt="img" class="responsive">

          </div>

          <!-- Image upload Buttons -->
            <div class=" mt-5">
            <input type="file" class="hidden" ref="updateImgInputnew" @change="updateCurrImge" accept="image/*">
            <vs-button class="mb-base mr-3"  color="danger" @click="$refs.updateImgInputnew.click()" size="large" > Update Image</vs-button>
            <vs-button color="primary"  class="mb-base mr-3" @click="dataImgnew = null" size="large">Remove Image</vs-button>
            </div>

          </template>               
          </div>
        </vx-card>
        <vx-card class="mt-5" title="Upload User Avatar">
        

        <div class="vx-row">
            <template v-if="dataImgavatar">

            <!-- Image Container -->
            <div class="img-container w-64 mx-auto flex items-center justify-center">
            <img :src="dataImgavatar" alt="img" class="responsive">

            </div>

            <!-- Image upload Buttons -->
            <div class=" mb-5">
            <input type="file" class="hidden" ref="updateImgInputnewvalue" @change="updateCurrImges" accept="image/*">
            <vs-button class="mr-3"  color="danger" @click="$refs.updateImgInputnewvalue.click()" size="large">Update Image</vs-button>
            <vs-button color="primary" @click="dataImgavatar = null" size="large">Remove Image</vs-button>
            </div>

            </template>
            <div class="vx-col  w-full mb-2">

              <div class="upload-img mt-5" v-if="!dataImgavatar">
                <input type="file" class="hidden" ref="updateImgInputnewvalue" @change="updateCurrImges" accept="image/*">
                <vs-button @click="$refs.updateImgInputnewvalue.click()" icon-pack="feather" icon="icon icon-upload">User Avatar</vs-button>
              </div>
              </div>
            </div>
      </vx-card>
    </div>
  </div>
</template>
<div class="vx-col w-full mb-2">

<div class="upload-img mt-5" v-if="!dataImg">
<input type="file" class="hidden" ref="uploadImgInput" @change="updateCurrImg" accept="image/*">
<vs-button @click="$refs.uploadImgInput.click()" color="primary" type="filled" icon-pack="feather" icon="icon icon-upload"> Bot Icon   </vs-button>
</div>
</div>
</div>

      </vx-card>
     


<div class="vx-col  w-full mb-2">

<div class="upload-img mt-5" v-if="!dataImgnew">
<input type="file" class="hidden" ref="updateImgInputnew" @change="updateCurrImge" accept="image/*">
<vs-button @click="$refs.updateImgInputnew.click()" icon-pack="feather" icon="icon icon-upload">Chat Icon</vs-button>
</div>
</div>
</div>



      </vx-card>
      

     
      

     
    </div>
     
      
  </div>
  
 
</template>








<script>
import axios from "axios";
import vSelect from "vue-select";
import Prism from "vue-prism-component";
// import FontPicker from 'font-picker-vue';
import { Base_URL } from "../../../api.config";

export default {
  data() {
    return {
      chatbotheading: "",
      dataImgnewbackground: null,
      rowdata: [],
      newsentence: [],
      chatbotname: "",
      chatbotnamenew: "",
      Color: "",
      selectedFiled: null,
      selectedFile: null,
      rdf: "",
      name: "",
      entitycard: "",
      dataImg: null,
      dataImgnew: null,
      dataImgavatar: null,
      focused_font: "",
      selectedDuration: "",
      activecolor: "red",
      images: [
        {
          url: "../../assets/images/logo/logo.png",
          name: "My Image 1",
        },
      ],

      items: [
        {
          image: false,
        },
      ],
      durations: [
        {
          durationCode: "Pacifico,sans-serif",
        },
        {
          durationCode: "Dancing Script,sans-serif",
        },
        {
          durationCode: "Arial,sans-serif",
        },
        {
          durationCode: "Helvetica ,sans-serif",
        },
        {
          durationCode: "Proza Libre, sans-serif",
        },
        {
          durationCode: "Optima",
        },
        {
          durationCode: "Trebuchet",
        },
        {
          durationCode: "Impact , sans-serif",
        },
        {
          durationCode: "Times New Roman",
        },
        {
          durationCode: "Noto Sans",
        },
        {
          durationCode: "Didot",
        },
        {
          durationCode: "Roboto, sans-serif",
        },

        {
          durationCode: "Shadows Into Light",
        },
        {
          durationCode: "Titillium Web, sans-serif",
        },
        {
          durationCode: "Lobster",
        },
        {
          durationCode: "Anton",
        },
        {
          durationCode: "Indie Flower",
        },
        {
          durationCode: "Charmonman",
        },
        {
          durationCode: "Kodchasan",
        },
        {
          durationCode: "Notable",
        },
        {
          durationCode: "Mali",
        },
        {
          durationCode: "Srisakdi",
        },

        {
          durationCode: "Slabo 27px",
        },
        {
          durationCode: "Segoe Print",
        },
        {
          durationCode: "MingLiU-ExtB",
        },
        {
          durationCode: "Gabriola",
        },
      ],
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.chatbotheading !== "";
    },
  },
  components: {
    "v-select": vSelect,
    Prism,
  },
  mounted() {
    var chatbotname = localStorage.getItem("chatbotname");
    console.log(localStorage.getItem("chatbot_id"), "localStorage.chatbot_id");
    console.log(
      localStorage.getItem("chatbotname"),
      "localStorage.chatbotname"
    );

    axios
      .post(Base_URL.Actual_URL + "chatboticonreload", {
        //axios.post('http://127.0.0.1:5000/chatboticonreload',{
        chatbot_id: localStorage.getItem("chatbot_id"),
        chatbotname: localStorage.getItem("chatbotname"),
      })
      .then((response) => {
        this.rowdata = response.data.userlist;

        var st = this.rowdata[0].botimagepath;

        this.dataImg = `${st}`;
                // this.dataImg = `https://chatbot.engagechats.com/${st}`;


        var sy = this.rowdata[0].chatboticonpath;

        this.dataImgnew = `${sy}`;

        var sj = this.rowdata[0].useravtarpath;

        this.dataImgavatar = `https://chatbot.engagechats.com/${sj}`;

        var se = this.rowdata[0].backgroundiconpath;

        this.dataImgnewbackground = `https://chatbot.engagechats.com/${se}`;

        //if(this.dataImg==)
        // this.rowdata.

        if (response.data.code == 100) {
          setInterval(function () {
            //window.location.href = 'http://188.227.58.42:83/NluData'
            /// window.location.href = '/NluData'
          }, 1200);
        }
      });
  },
  methods: {
    updateCurrImg(input) {
      console.log(input);
      //var chatbotuichatname=localStorage.getItem('chatbotname')
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImg = e.target.result;
          console.log(this.dataImg, "value");
          console.log(input.target.files[0].name, "image value");
          var chatbotname = localStorage.getItem("chatbotname");
          axios.post(Base_URL.Actual_URL + "uploadboticon", {
            image: this.dataImg,
            chatbotname: chatbotname,
            imagename: input.target.files[0].name,
            bot: "botIcon",
          });
        };
        console.log(input.target.files[0].name, "image value");
        reader.readAsDataURL(input.target.files[0]);
      }
    },
    updateCurrImge(input) {
      console.log(input);
      //var chatbotuichatname=localStorage.getItem('chatbotUIchatname')
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImgnew = e.target.result;
          console.log(this.dataImgnew, "value");
          console.log(input.target.files[0].name, "image value");
          var chatbotname = localStorage.getItem("chatbotname");
          axios.post(Base_URL.Actual_URL + "chatbotIconimage", {
            image: this.dataImgnew,
            chatbotname: chatbotname,
            imagename: input.target.files[0].name,
            bot: "chatbotIcon",
          });
        };

        reader.readAsDataURL(input.target.files[0]);
      }
    },

    updateCurrImges(input) {
      //var chatbotuichatname=localStorage.getItem('chatbotUIchatname')
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImgavatar = e.target.result;

          var chatbotname = localStorage.getItem("chatbotname");
          axios.post(Base_URL.Actual_URL + "newuserdataimage", {
            image: this.dataImgavatar,
            chatbotname: chatbotname,
            imagename: input.target.files[0].name,
            bot: "useravatar",
          });
        };

        reader.readAsDataURL(input.target.files[0]);
      }
    },
    updateCurrImgebackground(input) {
      console.log(input);
      //var chatbotuichatname=localStorage.getItem('chatbotUIchatname')
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImgnewbackground = e.target.result;

          var chatbotname = localStorage.getItem("chatbotname");
          axios.post(Base_URL.Actual_URL + "newbackgrounddata", {
            image: this.dataImgnewbackground,
            chatbotname: chatbotname,
            imagename: input.target.files[0].name,
            bot: "backgroundimage",
          });
        };
        console.log(input.target.files[0].name, "image value");
        reader.readAsDataURL(input.target.files[0]);
      }
    },

    changeColor(colorx, whatColor) {
      localStorage.setItem("color", colorx);

      this.$vs.theme({
        [whatColor]: colorx,
      });
    },
    chatbotui() {
      var color = localStorage.getItem("color");
      var newemail = localStorage.getItem("email");
      var chatbotname = localStorage.getItem("chatbotname");

      axios
        .post(Base_URL.Actual_URL + "chatbotui", {
          newemail: newemail,
          color: color,
          chatbotname: chatbotname,
          chatbotheading: this.chatbotheading,
          fontname: this.selectedDuration.durationCode,
        })
        .then((response) => {
          //console.log(response)
          this.entitycard = response.data.result;
          console.log(this.entitycard);
        });
    },
  },
};
</script>

<style lang="css" scoped>
.colorprimaryx {
  background: rgb(var(--vs-primary)) !important;
}
.demo-alignment li:hover {
  transform: translate(0, 8px);
  box-shadow: 0px 0px 40px -10px rgba(255, 255, 255, 0) !important;
}

.colorsuccessx {
  background: rgb(var(--vs-success)) !important;
}

.colordangerx {
  background: rgb(var(--vs-danger)) !important;
}

.colorwarningx {
  background: rgb(var(--vs-warning)) !important;
}

.colordarkx {
  background: rgb(var(--vs-dark)) !important;
}
</style>

