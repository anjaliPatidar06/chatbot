
<template>
  <div
    id="chat-app"
    class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden"
  >
    <vs-sidebar
      class="items-no-padding"
      parent="#chat-app"
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
      v-model="isChatSidebarActive"
      id="chat-list-sidebar"
    >
      <!-- USER PROFILE SIDEBAR -->
      <!-- <user-profile class="user-profile-container" :userId="userProfileId"></user-profile> -->
      <user-profile
        :active="activeProfileSidebar"
        :userId="userProfileId"
        class="user-profile-container"
        :isLoggedInUser="isLoggedInUserProfileView"
        @closeProfileSidebar="closeProfileSidebar"
      ></user-profile>

      <div class="chat__profile-search flex p-4">
        <div class="relative inline-flex">
          <!-- <vs-avatar
            v-if="activeUser.photoURL"
            class="m-0 border-2 border-solid border-white"
            :src="activeUser.photoURL"
            size="40px"
            @click="showProfileSidebar(Number(activeUser.uid), true)"
          /> -->
          <vs-avatar
            class="m-0 border-2 border-solid border-white"
            size="40px"
          />
          <!-- <div
            class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0"
          ></div> -->
        </div>
        <vs-input
          icon-no-border
          icon="icon-search"
          icon-pack="feather"
          class="w-full mx-5 input-rounded-full"
          placeholder="Search or start a new chat"
          v-model="searchQuery"
        />

        <feather-icon
          class="md:inline-flex lg:hidden -ml-3 cursor-pointer"
          icon="XIcon"
        />
      </div>

      <vs-divider class="d-theme-border-grey-light m-0" />
      <component :is="scrollbarTag" class="chat-scroll-area pt-4">
        <!-- ACTIVE CHATS LIST -->
        <div class="chat__chats-list mb-8">
          <h3 class="text-primary mb-5 px-4">Chats</h3>
          <ul class="chat__active-chats bordered-items">
            <li
              class="cursor-pointer"
              v-for="(contact, index) in chatContacts"
              :key="index"
              @click="updateActiveChatUser(contact, contact.user_id)"
            >
              <chat-contact
                showLastMsg
                :contact="contact"
                :lastMessaged="chatLastMessaged(contact.user_id)"
                :isActiveChatUser="isActiveChatUser(contact.user_id)"
                :unseenMsg="chatUnseenMessages(contact.user_id)"
              ></chat-contact>
            </li>
          </ul>
        </div>
      </component>
    </vs-sidebar>
    <!-- CONTACTS LIST -->

    <!-- CONTACTS LIST -->

    <div
      class="chat__bg no-scroll-content chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0"
      :class="{
        'sidebar-spacer--wide': clickNotClose,
        'flex items-center justify-center': activeChatUser === null,
      }"
    >
      <template v-if="activeChatUser">
        <!-- <template> -->
        <div class="chat__navbar">
          <chat-navbar
            :isSidebarCollapsed="!clickNotClose"
            :user-id="'' + activeChatUser"
            :isPinnedProp="isChatPinned"
            @openContactsSidebar="toggleChatSidebar(true)"
            @showProfileSidebar="showProfileSidebar"
            @toggleIsChatPinned="toggleIsChatPinned"
          ></chat-navbar>
        </div>
        <!-- <component
          :is="scrollbarTag"
          class="chat-content-scroll-area border border-solid d-theme-border-grey-light"
          :class="[showEmojis ? 'custom-chatlog' : 'inherit-chatlog']"
          :style="[
            !showEmojis
              ? { height: 'calc(100% - 134px) !important' }
              : { height: '40% !important' },
          ]"
          :settings="settings"
          ref="chatLogPS"
          :key="$vs.rtl"
        > -->
        <component
          :is="scrollbarTag"
          class="chat-content-scroll-area border border-solid d-theme-border-grey-light"
          :class="[showEmojis ? 'custom-chatlog' : 'inherit-chatlog']"
          :settings="settings"
          ref="chatLogPS"
          :key="$vs.rtl"
        >
          <div class="chat__log" ref="chatLog">
            <chat-log
              :userId="activeChatUser"
              v-if="activeChatUser"
              :newmsg="newMsg"
            ></chat-log>
          </div>
        </component>
        <!-- <a href="#nav"><span>Click Here</span></a>
         <div class="expandable" id="nav">
            <p>Cum enim magna parturient</p>
          </div> -->
        <div
          style="background: white; position: inherit"
          :class="[showEmojis ? 'custom-chatlog' : 'inherit-chatlog']"
        >
          <div class="chat__input flex p-4 bg-white" style="z-index: 1">
            <ckeditor  :config="editorConfig" v-model="editorData"></ckeditor>
            <!-- <vx-input-group>
            <template
              slot="prepend"
              class="mt-0"
              style="margin-top: 0px !important"
            >
              <div class="prepend-text bg-primary">
                <span
                  class="input-group-text mt-0 flex-1"
                  @click="showEmojiContainer"
                >
                  <i class="fa fa-smile-o" aria-hidden="true"></i>
                </span>
              </div>
            </template> -->
            <VEmojiPicker
              @select="selectEmoji"
              v-if="showEmojis"
              @emoji-click="emojiClick"
              emojisByRow="10"
              emojiSize="34"
              :showSearch="true"
              :dark="false"
            />
            <!-- <ejs-documenteditor :isReadOnly='false' :enableEditor='true'></ejs-documenteditor> -->
            <!-- <vs-input
              id="editor1"
              class="flex-1"
              placeholder="Type Your Message"
              v-model="message"
              @keyup.enter="queuePurchase"
              @select="testFunction"
              ref="boldText"
            ></vs-input> -->
            <!-- <div
              id="editor1"
              contenteditable
              @input="handleInput"
              @select="testFunction"
            ></div> -->
            <!-- <div id="editor1"
              class="flex-1"
              placeholder="Type Your Message"
              @keyup.enter="queuePurchase"
              @select="testFunction"
              ref="boldText"><p>Test...</p></div> -->
            <!-- </vx-input-group> -->


            <input
              type="file"
              class="hidden"
              @change="sendChatImage"
              data-vv-as="file"
              ref="chatImage"
              accept="*"
              name="chatImage"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />


            <!-- <vs-button @click="document.execCommand('bold',false,null);" style="border-radius:0"
            ><i class="fa fa-bold" aria-hidden="true"></i
          ></vs-button>
          <vs-button @click="document.execCommand('italic',false,null);" style="border-radius:0"
            ><i class="fa fa-italic" aria-hidden="true"></i
          ></vs-button> -->

             <!-- <button id="jBold" @click="makeBold"><b>B</b></button> -->
            <vs-button
              v-if="!showEmojis"
              @click="showEmojiContainer"
              style="border-radius: 0"
              ><i class="fa fa-smile-o fa-lg" aria-hidden="true"></i
            ></vs-button>
            <vs-button
              v-else
              @click="closeEmojiContainer"
              style="border-radius: 0"
              ><i class="fa fa-chevron-down" aria-hidden="true"></i
            ></vs-button>
            <vs-button @click="$refs.chatImage.click()" style="border-radius: 0"
              ><i class="fa fa-paperclip fa-lg" aria-hidden="true"></i
            ></vs-button>

             <vs-button
              class="bg-primary-gradient ml-2"
              type="filled"
              @click="queuePurchase"
              id="que"
              >Send</vs-button
            > 

            <!-- <span class="text-danger text-sm mb-2">
                {{ errors.first("chatImage") }}</span> -->
          </div>
        </div>

        <!-- <div class="chat__input flex p-4 bg-white"></div> -->
      </template>
      <template v-else>
        <div class="flex flex-col items-center">
          <feather-icon
            icon="MessageSquareIcon"
            class="mb-4 bg-white p-8 shadow-md rounded-full"
            svgClasses="w-16 h-16"
          ></feather-icon>
          <h4
            class="py-2 px-4 bg-white shadow-md rounded-full cursor-pointer"
            @click.stop="toggleChatSidebar(true)"
          >
            Start Conversation
          </h4>
        </div>
      </template>
      <div id="textBoldDiv" class="hidden" style="font-style: italic"></div>
    </div>
  </div>
</template>

<script src="/socket.io/socket.io.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/ej2-vue-es5/dist/ej2-vue.min.js" type="text/javascript"></script>

<script>
import ChatContact from "./ChatContact.vue";
import ChatLog from "./ChatLog.vue";
import ChatNavbar from "./ChatNavbar.vue";
import UserProfile from "./UserProfile.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import moduleChat from "@/store/chat/moduleChat.js";
import io from "socket.io-client";
import axios from "axios";
import { Base_URL } from "../../../../api.config";
import chatUsersData from "./chatData.json";
// import { VueChatEmoji, emojis } from 'vue-chat-emoji'
import { VEmojiPicker } from "v-emoji-picker";
    // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: "chat",
  data() {
    return {
                      // editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',

      editorConfig: {
        toolbar: [ [ 'Bold' , 'Italic'] ],
                    height : 40,
                    toolbarLocation:'bottom',
                    removePlugins:'elementspath'

                },
      showEmojis: false,
      file1: "",
      newChatBotUserName: "",
      reqAccepted: false,
      newMsg: "",
      isConnected: false,
      socketMessage: "",
      agentId: localStorage.id,
      newContacts: [],
      newe: [],
      active: true,
      isHidden: false,
      searchContact: "",
      messages: [],
      newmessages: [],
      purchase: {
        body: this.message,
        author: null,
      },

      message: "",
      username: "",
      mes: "",
      msg: [],
      activeProfileSidebar: false,
      activeChatUser: null,
      activeContact: [],
      userProfileId: -1,
      typedMessage: "",
      isChatPinned: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.7,
      },
      clickNotClose: true,
      isChatSidebarActive: true,
      isLoggedInUserProfileView: false,
      chatUsers: [],
      messageNotSeen: [],
      count: false,
      flag: 0,
      newMsgRequestData: "",
      data: {
        contacts: [
          {
            uid: 1,
            displayName: "avon@gmail.com",
            about: "hello",
            photoURL: require("@/assets/images/portrait/small/avatar-s-1.jpg"),
            status: "offline",
          },
          {
            uid: 2,
            displayName: "anjali@gmail.com",
            about: "hello,how are you?",
            photoURL: require("@/assets/images/portrait/small/avatar-s-2.jpg"),
            status: "do not disturb",
          },
          {
            uid: 3,
            displayName: "aditya@gmail.com",
            about: "how can I help You",
            photoURL: require("@/assets/images/portrait/small/avatar-s-3.jpg"),
            status: "do not disturb",
          },
        ],
      },
    };
  },
  watch: {
    windowWidth() {
      this.setSidebarWidth();
    },
    reqAccepted(newValue, oldValue) {
      if (newValue === true) {
        this.checkforMsgRequest();
      }
    },
  },
  computed: {
    chatLastMessaged() {
      return (userId) => this.$store.getters["chat/chatLastMessaged"](userId);
    },
    chatUnseenMessages() {
      return (userId) => {
        const unseenMsg = this.$store.getters["chat/chatUnseenMessages"](
          userId
        );
        if (unseenMsg) return unseenMsg;
      };
    },
    activeUser() {
      return this.$store.state.AppActiveUser;
    },
    getStatusColor() {
      return (isActiveUser) => {
        const userStatus = this.getUserStatus(isActiveUser);

        if (userStatus === "online") {
          return "success";
        } else if (userStatus === "do not disturb") {
          return "danger";
        } else if (userStatus === "away") {
          return "warning";
        } else {
          return "grey";
        }
      };
    },
    chatContacts() {
      return this.$store.getters["chat/chatContacts"];
    },

    searchQuery: {
      get() {
        return this.$store.state.chat.chatSearchQuery;
      },
      set(val) {
        this.$store.dispatch("chat/setChatSearchQuery", val);
      },
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    isActiveChatUser() {
      return (userId) => userId === this.activeChatUser;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },

  methods: {
    handleInput(e) {
      console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyy",document.getElementById('editor1').outerHTML);
      //  var span = '<p></p>';
      //             var span = '<p></p>';
      //   document.getElementById('editor1').outerHTML+=span;
      // const { firstChild } = e.target

      // if (firstChild && firstChild.nodeType === 3) e
      // // xec('formatBlock', '<p>')
      // else if (this.$el.innerHTML === '<br>')
      // this.$el.innerHTML = ''

      // this.$emit('input', this.$el.innerHTML)
      // var highlight = window.getSelection().toString();
      // console.log(highlight,'textt')
      // var span = '<span style="font-weight:bold;">' + highlight + '</span>';

      // document.getElementById('editor').innerHTML.replace(window.getSelection(), span);
    },
    clickInput() {
      var span = '<p></p>';
      document.getElementById('editor1').innerHTML+=span;
    },
    testFunction(e) {
      // console.log(window.getSelection().toString());
      //    value = value.replace(hashReg, "<b>$&</b>");
      // let hashReg1 = /_\w+/gm;
      // value = value.replace(hashReg1, "<i>$&</i>");
      // value = value.replaceAll(/#/gi, "");
      // value = value.replaceAll(/_/gi, "");
      // console.log(e.target.innerHTML,'innerHtml')
      // console.log((window.getSelection().toString()).bold(),'(window.getSelection().toString()).bold()')
      // console.log(document.getElementById('editor1').innerHTML,'document.getElementById.innerhtml()')
      var highlight = window.getSelection().toString();
      console.log(highlight, "textt function");
      console.log(
        document.getElementById("editor1").innerHTML,
        " document.getElementById().innerHTML"
      );
      // console.log(this.$refs.boldText.innerHTML,this.$refs.boldText.value ,'ref boldtext')
      // console.log(document.getElementById('editor1'),'textarea')
      var span = '<span style="font-weight:bold;">' + highlight + "</span>";

      document.getElementById('editor1').innerHTML = document.getElementById("editor1")
        .innerHTML.replace(highlight, span);
      document.getElementById('editor1').innerHTML= document.getElementById("editor1")
        .innerHTML + '<span style="font-weight:initial;">Heyy</span>'
      // document.getElementById('editor1').innerHTML = (window.getSelection().toString())
      // console.log(document.getElementById('textBoldDiv').innerHTML,'+++++++++++++')
      // return (window.getSelection().toString()).bold()

      //  var highlight = window.getSelection().toString();
      // var span = '<span class="bold">' + window.getSelection().toString() + '</span>';
      // var text = document.getElementById(editor1).innerHTML;
      // console.log(highlight.bold(),'bold')
      // console.log(this.message.match('/'+window.getSelection().toString()+'/'));
      // this.message = highlight.bold();
      // document.getElementById('editor1').innerHTML = highlight.bold();
      // console.log(document.getElementById('editor1'),'document.getElementById.innerhtml()')
      // document.getElementById('editor1').html(text.replace(highlight, span));
      // console.log("<b>$&"+window.getSelection().toString()+"</b>",'"<b>$&"+window.getSelection().toString()+"</b>"')
      // return "<b>  $&"+window.getSelection().toString()+"</b>";
    },
    makeBold() {
            var highlight = window.getSelection().toString();
         var span = '<span style="font-weight:bold;">' + highlight + "</span>";

      document.getElementById('editor1').innerHTML = document.getElementById("editor1")
        .innerHTML.replace(highlight, span);
      console.log("heyy",window.getSelection().toString());
      alert(highlight,'highlight')
    },
    emojiClick(e) {
      console.log(e, "emoji");
    },
    checkToggle() {
      alert("hey toggle");
    },
    selectEmoji(emoji) {
      console.log(emoji);
      this.message = this.message + emoji.data;
    },
    showEmojiContainer() {
      this.showEmojis = true;
      // alert("heyyy");
    },
    closeEmojiContainer() {
      this.showEmojis = false;
    },
    sendChatImage() {
      // console.log(this.$refs.chatImage.files[0],'this.$refs.chatImage.files[0]')
      if (
        this.$refs.chatImage.files[0].type == "image/jpeg" ||
        this.$refs.chatImage.files[0].type == "image/png"
      ) {
        this.file1 = this.$refs.chatImage.files[0];
        // this.selectedfile = this.$refs.chatImage.files[0].name;
        // console.log(this.$refs.chatImage.files[0]);
        this.createBase64Image(this.file1);
      } else {
        this.file1 = this.$refs.chatImage.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.file1);
        reader.onload = (e) => {
          this.file1 = e.target.result;
          console.log("elsee image", this.file1);
          const payload = {
            isPinned: this.isChatPinned,
            msg: {
              textContent: this.file1,
              msg_time: String(new Date()),
              is_sent: true,
              is_seen: true,
              msg_from: localStorage.id,
              msg_type: this.$refs.chatImage.files[0].type,
              file_name: this.$refs.chatImage.files[0].name,
            },
            id: this.activeChatUser,
          };
          this.$store.dispatch("chat/sendChatMessage", payload);
          var body = {
            chatbot_id: localStorage.chatbot_id,
            company_id: localStorage.company_id,
            username: localStorage.id,
            chatbot_user_name: this.activeContact.contact,
            agent_id: localStorage.id,
            message: this.file1,
            isSent: true,
            isSeen: true,
            author: localStorage.logged_in_user_name,
            room: this.activeContact.room,
            msg_type: this.$refs.chatImage.files[0].type,
            file_name: this.$refs.chatImage.files[0].name,
          };
          console.log(body, "emit");

          this.$socket.emit("join_room", {
            username: localStorage.logged_in_user_name,
            room: this.activeContact.room,
          });
          this.$socket.emit("pdf_send", body);
          this.message = "";
        };
      }
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.file1 = e.target.result;
        // console.log(this.file1, "file1");
        const payload = {
          isPinned: this.isChatPinned,
          msg: {
            textContent: this.file1,
            msg_time: String(new Date()),
            is_sent: true,
            is_seen: true,
            msg_from: localStorage.id,
            msg_type: "image",
          },
          id: this.activeChatUser,
        };
        this.$store.dispatch("chat/sendChatMessage", payload);
        var body = {
          chatbot_id: localStorage.chatbot_id,
          company_id: localStorage.company_id,
          username: localStorage.id,
          chatbot_user_name: this.activeContact.contact,
          agent_id: localStorage.id,
          message: this.file1,
          isSent: true,
          isSeen: true,
          author: localStorage.logged_in_user_name,
          room: this.activeContact.room,
          msg_type: "image",
          file_name: fileObject.name,
        };
        console.log(body, "emit");

        this.$socket.emit("join_room", {
          username: localStorage.logged_in_user_name,
          room: this.activeContact.room,
        });
        this.$socket.emit("image_send", body);
        this.message = "";
      };
    },
    async contacts() {
      await axios
        .post(Base_URL.Actual_URL + "get_contact_list", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
          agent_id: localStorage.id,
        })
        .then((response) => {
          this.newContacts = response.data.user_list;
          if (this.newContacts.length > 0) {
            this.newContacts.forEach((element) => {
              this.$socket.emit("join_room", {
                username: localStorage.logged_in_user_name,
                room: element.room,
              });
            });
            // this.activeChatUser = this.newContacts[0].user_id;
            // this.activeContact = this.newContacts[0];
          }
          return this.newContacts;
        });
    },
    sendMessage: function () {
      if (!this.message) return;
      const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS;
      scroll_el.scrollTop = this.$refs.chatLog.scrollHeight;
    },

    closeProfileSidebar(value) {
      this.activeProfileSidebar = value;
    },
    async updateActiveChatUser(contact, contactId) {
      this.activeChatUser = contactId;
      this.activeContact = contact;
      if (this.$store.getters["chat/chatDataOfUser"](this.activeChatUser)) {
        await this.$store.dispatch("chat/markSeenAllMessages", contactId);
      }
      // const chatData = this.$store.getters["chat/chatDataOfUser"](
      //   this.activeChatUser
      // );
      // if (chatData) this.isChatPinned = chatData.isPinned;
      // else this.isChatPinned = false;

      this.toggleChatSidebar();
      this.typedMessage = "";
    },
    containsKey(obj, key) {
      return Object.keys(obj).includes(key);
    },
    onTextBoxClick() {
      this.showEmojis = false;
    },
    fontBoldAndItalic(value) {
      if (!value) return "";
      value = value.toString();
      let hashReg = /#\w+/gm;
      value = value.replace(hashReg, "<b>$&</b>");
      let hashReg1 = /_\w+/gm;
      value = value.replace(hashReg1, "<i>$&</i>");
      value = value.replaceAll(/#/gi, "");
      value = value.replaceAll(/_/gi, "");
      return value;
    },
    queuePurchase() {
      if (!this.message) return;
      const payload = {
        isPinned: this.isChatPinned,
        msg: {
          textContent: this.message,
          msg_time: String(new Date()),
          is_sent: true,
          is_seen: true,
          msg_from: localStorage.id,
          msg_type: "text",
        },
        id: this.activeChatUser,
      };

      this.$store.dispatch("chat/sendChatMessage", payload);
      var body = {
        chatbot_id: localStorage.chatbot_id,
        company_id: localStorage.company_id,
        username: localStorage.id,
        chatbot_user_name: this.activeContact.contact,
        agent_id: localStorage.id,
        message: this.fontBoldAndItalic(this.message),
        isSent: true,
        isSeen: true,
        author: localStorage.logged_in_user_name,
        room: this.activeContact.room,
        msg_type: "text",
        file_name: null,
      };
      console.log(body, "emit");

      this.$socket.emit("join_room", {
        username: localStorage.logged_in_user_name,
        room: this.activeContact.room,
      });
      this.$socket.emit("my event", body);
      this.message = "";
    },
    showProfileSidebar(userId, openOnLeft = false) {
      this.userProfileId = userId;
      this.isLoggedInUserProfileView = openOnLeft;
      this.activeProfileSidebar = !this.activeProfileSidebar;
    },
    // sendMsg() {
    //   if (!this.typedMessage) return;
    //   const payload = {
    //     isPinned: this.isChatPinned,
    //     msg: {
    //       textContent: this.typedMessage,
    //       msg_time: String(new Date()),
    //       isSent: true,
    //       isSeen: false,
    //     },
    //     id: this.activeChatUser,
    //   };
    //     // this.$store.commit('SEND_CHAT_MESSAGE', payload)

    //   this.$store.dispatch("chat/sendChatMessage", payload);
    //   this.typedMessage = "";

    //   const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS;
    //   scroll_el.scrollTop = this.$refs.chatLog.scrollHeight;
    // },
    toggleIsChatPinned(value) {
      this.isChatPinned = value;
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.isChatSidebarActive = this.clickNotClose = false;
      } else {
        this.isChatSidebarActive = this.clickNotClose = true;
      }
    },
    toggleChatSidebar(value) {
      if (!value && this.clickNotClose) return;
      this.isChatSidebarActive = value;
    },
    // checkNewContact(username) {
    //     this.contacts()
    //     var matchedConatct , matchedIndex
    //     var isPresent = this.newContacts.some(function (el ,index) {
    //       console.log(el.username , username)
    //       if(el.username === username){
    //         console.log('matchedddd s')
    //         matchedIndex =index
    //         return matchedConatct = el
    //       };

    //     });
    //     if (isPresent) {
    //       console.log('inside if')
    //         this.activeChatUser = matchedConatct.user_id
    //         this.newContacts.splice(matchedIndex, 1);
    //        this.newContacts.splice(0, 0, matchedConatct);
    //        return this.newContacts
    //       //  this.newContacts =
    //     //             this.chatContacts()
    //     }
    //     //  else {
    //     // }
    // },
    matchedRoomUserId(room) {
      this.newContacts.forEach((ele) => {
        if (room == ele.room) {
          return ele.user_id;
        }
      });
    },
    fillData(data) {
      var body;
      if (!this.containsKey(data, "author")) {
        console.log("hey if", data);
        body = {
          company_id: parseInt(localStorage.company_id),
          chatbot_id: localStorage.chatbot_id,
          username: data.username,
          picture_url: "B",
          messge: data.message,
          msg_from: data.username,
          msg_to: "" + localStorage.id,
          // msg_to: this.matchedRoomUserId(data.room),
          is_seen: 0,
          receiver: localStorage.id,
          room: data.room,
          agent_id: localStorage.id,
          msg_type: data.msg_type,
          file_name: null,
        };
      } else {
        console.log("hey else", data);
        body = {
          company_id: parseInt(localStorage.company_id),
          chatbot_id: localStorage.chatbot_id,
          username: this.activeContact.contact,
          picture_url: "B",
          messge: data.message,
          // msg_from: this.matchedRoomUserId(data.room),
          msg_from: "" + data.agent_id,
          msg_to: "" + data.chatbot_user_name,
          is_seen: 1,
          receiver: data.chatbot_user_name,
          room: data.room,
          agent_id: localStorage.id,
          msg_type: data.msg_type,
          file_name: data.file_name,
        };
      }
      if (this.activeContact.contact == data.username) {
        console.log(this.activeContact.contact, data.username);
        body.is_seen = 1;
      }
      console.log(body, "store body++++++++++++++++++++++++++++");
      axios
        .post(Base_URL.Actual_URL + "store_message", body)
        .then((response) => {
          console.log("store response", response);
          this.newMsg = data.message;
          localStorage.removeItem("message");
          this.contacts();
        });
    },
    async checkNewUser(data) {
      var body = {
        company_id: parseInt(localStorage.company_id),
        chatbot_id: localStorage.chatbot_id,
        username: data.username,
        room: data.room,
      };
      console.log(body, " valid       bodyyyyyyyyyy");
      await axios
        .post(Base_URL.Actual_URL + "valid_contact", body)
        .then((response) => {
          this.count = false;
          if (response.data.result === "Message From New Contact") {
            this.newChatBotUserName = data.username;
            this.$toasted.info("You have new message request. &#013;", {
              icon: "message",
              action: [
                {
                  text: "Accept",

                  onClick: (e, toast) => {
                    toast.goAway(0);
                    this.saveContact(data);
                    this.$store.dispatch("chat/fetchChatContacts");
                    this.chatContacts = this.$store.getters[
                      "chat/chatContacts"
                    ];
                  },
                },
                {
                  text: "Reject",
                  onClick: (e, toast) => {
                    toast.goAway(0);
                  },
                },
              ],
            });
          } else {
            this.fillData(data);
          }
        });
    },
    saveContact(data) {
      const body = {
        chatbot_id: data.chatbot_id,
        company_id: data.company_id,
        username: data.username,
        picture_url: "test",
        room: data.room,
        agent_id: localStorage.id,
      };
      console.log(body, "save contactttt b ody");
      axios
        .post(Base_URL.Actual_URL + "save_contact", body)
        .then((response) => {
          // alert(response.data.result)
          if (response.data.result === "Contact Saved") {
            // alert('inside contact saved if')
            this.$store.dispatch("chat/fetchChatContacts");
            this.chatContacts = this.$store.getters["chat/chatContacts"];
            this.$socket.emit("join_room", {
              username: localStorage.logged_in_user_name,
              room: data.room,
            });
            this.$vs.notify({
              time: 4000,
              color: "success",
              title: "You have accepted the request successfully.",
              position: "top-center",
            });
          } else {
            this.$vs.notify({
              time: 4000,
              color: "warning",
              title: response.data.result,
              position: "top-center",
            });
          }
          this.contacts();
        });
    },
    checkforMsgRequest() {
      if (this.reqAccepted) {
        this.fillData(JSON.parse(localStorage.getItem("message")));
      }
    },

    getRealtimeData(data) {
      let v = this;
      console.log(data, "data frm socket subscribe");
      this.newMsgRequestData = data;
      v.fillData(data);
    },
    newMessageEvent(e) {
      this.$vs.notify({
        time: 4000,
        color: "success",
        title: e,
        position: "top-center",
      });
    },
  },
  components: {
    VuePerfectScrollbar,
    ChatContact,
    UserProfile,
    ChatNavbar,
    ChatLog,
    // Emoji: VueChatEmoji,
    VEmojiPicker,
  },
  created() {
    this.$store.registerModule("chat", moduleChat);
    this.$store.dispatch("chat/fetchContacts");
    this.$store.dispatch("chat/fetchChatContacts");
    this.$store.dispatch("chat/fetchChats");
    this.setSidebarWidth();
    this.contacts();
    this.chatUsers = chatUsersData;
    if (this.chatContacts.length > 0) {
      this.chatContacts.forEach((element) => {
        this.$socket.emit("join_room", {
          username: localStorage.logged_in_user_name,
          room: element.room,
        });
      });
    }
  },
  mounted() {
    console.log("chat mount");
    this.$store.dispatch("chat/setChatSearchQuery", "");
  },
  beforeDestroy() {
    this.$store.unregisterModule("chat");
    // this.sockets.unsubscribe("my_response");
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log("hello socket connected");
    },
    image_get(data) {
      // console.log(data, "iamge get");
      this.fillData(data);
      if (data.username !== localStorage.id) {
        const payload = {
          isPinned: this.isChatPinned,
          msg: {
            textContent: data.message,
            msg_time: String(new Date()),
            is_sent: true,
            is_seen: false,
            msg_from: data.username,
            msg_type: "image",
          },
          id: this.newContacts[0].user_id,
        };
        if (this.activeContact.contact == data.username) {
          payload.msg.is_seen = true;
        }
        this.$store.dispatch("chat/sendChatMessage", payload);
      }
    },
    pdf_get(data) {
      console.log(data, "pdf get");
      if (data.username !== localStorage.id) {
        const payload = {
          isPinned: this.isChatPinned,
          msg: {
            textContent: data.message,
            msg_time: String(new Date()),
            is_sent: true,
            is_seen: false,
            msg_from: data.username,
            msg_type: data.msg_type,
            file_name: data.file_name,
          },
          id: this.newContacts[0].user_id,
        };
        if (this.activeContact.contact == data.username) {
          payload.msg.is_seen = true;
        }
        this.$store.dispatch("chat/sendChatMessage", payload);
      }
      this.getRealtimeData(data);
    },
    // Fired when the server sends something on the "messageChannel" channel.
    my_response: function (data) {
      console.log(data, "my_response ");
      if (data.username !== localStorage.id) {
        const payload = {
          isPinned: this.isChatPinned,
          msg: {
            textContent: data.message,
            msg_time: String(new Date()),
            is_sent: true,
            is_seen: false,
            msg_from: data.username,
            msg_type: "text",
          },
          id: this.newContacts[0].user_id,
        };
        if (this.activeContact.contact == data.username) {
          payload.msg.is_seen = true;
        }
        this.$store.dispatch("chat/sendChatMessage", payload);
      }

      this.getRealtimeData(data);
    },
    custom_connection: function (data) {
      if (
        data.chatbot_id == localStorage.chatbot_id &&
        data.company_id == localStorage.company_id
      ) {
        this.checkNewUser(data);
      }
    },
    customEmit: function (data) {},

    disconnect() {
      this.isConnected = false;
    },
  },
};
</script>



<style lang="scss">
@import "@/assets/scss/vuexy/apps/chat.scss";

// #chat-app .chat-content-area .chat-content-scroll-area {
//   height: -webkit-fill-available !important;
// }

body,
html {
  font-family: sans-serif;
  font-weight: 100;
  //background: #7b4397; / fallback for old browsers /
  //background: -webkit-linear-gradient(to right, #dc2430, #7b4397); / Chrome 10-25, Safari 5.1-6 /
  //background: linear-gradient(to right, #dc2430, #7b4397); / W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ /
}

.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
  border: 1px solid #ccc;
  background: white;
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 550px;
  margin: 0 auto 2em auto;
  //box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  margin-bottom: 0.5em;
  font-size: 0.8em;
}
.message-out {
  background: #407fff;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #f1f0f0;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
#person1-input {
  padding: 0.5em;
}
#person2-input {
  padding: 0.5em;
}
.emoji-category-group {
  display: flex;
}
// .vx-input-group-append.flex {
//     margin-top: 0 !important;
// }
div#EmojiPicker {
  position: absolute;
  z-index: 1;
  margin-top: 40px;
  // width: 55rem;
  // width: 56rem;
  display: block;
  // overflow-y: scroll;
  // overflow: hidden scroll;
  flex-direction: column;
  transform: translateZ(0px);
  // padding-right: 13px;
  // margin-right: -30px;
  min-height: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  // margin-left: 10px;
  height: 100%;
}

.inherit-chatLog {
  height: calc(100% - 134px) !important;
}
.custom-chatlog {
  height: 50% !important;
  min-height: 200px !important;
}
div#editor1 {
  display: block;
  padding: 9px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.8rem;
  width: 100%;
  max-width: 100%;
  /* min-width: 100%; */
  background: transparent;
  border-width: thin !important;
  border-radius: 6px;
  border: solid black;
}
</style>
