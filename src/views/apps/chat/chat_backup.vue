<template>
  <div
    id="chat-app"
    class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden"
  >
    <vs-sidebar
      class="items-no-padding"
      parent="#chat-app"
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
            v-if="activeUser.photoURL"
            :src="activeUser.photoURL"
            class="m-0 border-2 border-solid border-white"
            size="40px"
          />
          <div
            class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0"
          ></div>
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
              v-for="(contact, index) in newContacts"
              :key="index"
              @click="updateActiveChatUser(contact, contact.user_id)"
            >
              <!-- <chat-contact
                showLastMsg
                :contact="contact"
                :lastMessaged="chatLastMessaged(contact.uid).time"
                :unseenMsg="chatUnseenMessages(contact.uid)"
                :isActiveChatUser="isActiveChatUser(contact.uid)"
              ></chat-contact> -->
              <chat-contact
                showLastMsg
                :contact="contact"
                :isActiveChatUser="isActiveChatUser(contact.user_id)"
                :unseenMsg="customChatUnseenMessage(contact.user_id)"
              ></chat-contact>
            </li>
          </ul>
        </div>

        <!-- CONTACTS LIST -->

        <!-- CONTACTS LIST -->
        <!-- <div class="chat__contacts">
          <h3 class="text-primary mb-5 px-4">Contacts</h3>
          <ul class="chat__contacts bordered-items">
            <li
              class="cursor-pointer"
              v-for="contact in data.contacts"
              :key="contact.uid"
              @click="updateActiveChatUser(contact, contact.uid)"
            >
              <chat-contact :contact="contact"></chat-contact>
            </li>
          </ul>
        </div> -->
      </component>
    </vs-sidebar>

    <!-- RIGHT COLUMN -->
    <!--  <div
      class="chat__bg no-scroll-content chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0"
      :class="{
        'sidebar-spacer--wide': clickNotClose,
        'flex items-center justify-center': activeChatUser === null,
      }"
    >
    <template>
        <div class="chat__navbar">

            <chat-navbar
            :isSidebarCollapsed="!clickNotClose"
            :user-id="activeChatUser"
            :isPinnedProp="isChatPinned"
          ></chat-navbar>
        </div>
        <component
          :is="scrollbarTag"
          class="chat-content-scroll-area border border-solid d-theme-border-grey-light"
        >
          <div id="newchats">
            <p
              v-for="message in newmessages"
              :key="message"
              class="message"
              :class="{
                'message-out': message.author === 'you',
                'message-in': message.author !== 'you',
              }"
            >
              {{ message.body }}
            </p>

          </div>

 

          <div class="chat__input flex bg-white">
            <vs-input
              class="flex-1"
              placeholder="Type Your Message"
              v-model="message"
              @keyup.enter="sendMessage"
            />
            <vs-button
              class="bg-primary-gradient ml-2"
              type="filled"
              @click="sendMessage"
              hidden
              >Send</vs-button
            >
         

          </div>
        </component>
      </template> -->
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
        <component
          :is="scrollbarTag"
          class="chat-content-scroll-area border border-solid d-theme-border-grey-light"
          style="height: calc(100% - 134px) !important"
          :settings="settings"
          ref="chatLogPS"
          :key="$vs.rtl"
        >
          <!-- <div id="newchats" class="chat__log" ref="chatLog">
            <p
              v-for="msg in newmessages"
              :key="msg"
              class="message"
              :class="{
                'message-out': msg.msg_from === agentId,
                'message-in': msg.msg_from !== agentId,
              }"
            >
              {{ msg.message }}
            </p>
          </div> -->
          <div class="chat__log" ref="chatLog">
            <chat-log
              :userId="activeChatUser"
              v-if="activeChatUser"
              :newmsg="newMsg"
            ></chat-log>
          </div>
        </component>
        <div class="chat__input flex p-4 bg-white">
          <vs-input
            class="flex-1"
            placeholder="Type Your Message"
            v-model="message"
            @keyup.enter="queuePurchase"
          />
          <!-- <vs-button
            class="bg-primary-gradient ml-4"
            type="filled"
            hidden
            @click="sendMessage"
            >Send</vs-button
          > -->
          <vs-button
            class="bg-primary-gradient ml-2"
            type="filled"
            @click="queuePurchase"
            id="que"
            >Sent button</vs-button
          >
        </div>
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
    </div>
    <!-- <vs-popup classContent="popup-example" title="" :active.sync="popupActive2">
      <div class="vx-row">
        <div class="vx-col sm-w/2 w-full mb-2">
          <span>
            {{ newChatBotUserName }} wants to connect with you. Would you like
            to continue ?</span
          >
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/4 w-full mb-2">
          <vs-button
            color="success"
            type="border"
            class="mb-2"
            icon-pack="feather"
            icon="icon-check"
            @click="msgRequestAccepted"
            >Accept</vs-button
          >
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2 pl-0">
          <vs-button
            color="danger"
            type="filled"
            class="mb-2"
            @click="popupActive2 = false"
            >Reject</vs-button
          >
        </div>
      </div>
    </vs-popup> -->
  </div>
</template>

<script src="/socket.io/socket.io.js"></script>
<script>
import ChatContact from "./ChatContact.vue";
import ChatLog from "./ChatLog.vue";
import ChatNavbar from "./ChatNavbar.vue";
import UserProfile from "./UserProfile.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import moduleChat from "@/store/chat/moduleChat.js";
import io from "socket.io-client";
// import VueSocketIO from "vue-socket.io";
import axios from "axios";
import { Base_URL } from "../../../../api.config";

//import myJSON from "../wwwroot/chatbot_backend/chatbackup.json"
//import myJSON from "../../../../chatbackup.json"
import chatUsersData from "./chatData.json";
import TableStateVue from "../../ui-elements/table/TableState.vue";
import { EventBus } from "../../../event-bus";

const data = [];
const contacts = [];
var newChatBotUserName;
// var searchQuery

export default {
  name: "chat",
  data() {
    return {
      value1: "",
      newChatBotUserName: "",
      reqAccepted: false,
      popupActive2: false,
      popupActive3: false,
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
        chats: {
          1: {
            isPinned: true,
            msg: [
              {
                textContent: "How can we help? We're here for you!",
                time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
                isSent: true,
                isSeen: true,
              },
              {
                textContent:
                  "Hey sakshi, I  have issue in login happy weeding account",
                time: "Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)",
                isSent: false,
                isSeen: true,
              },
              {
                textContent:
                  "Click On forget my password and reset the account",
                time: "Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)",
                isSent: true,
                isSeen: true,
              },
              {
                textContent: "Absolutely!",
                time: "Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)",
                isSent: true,
                isSeen: true,
              },
            ],
          },
          2: {
            isPinned: false,
            msg: [
              {
                textContent: "Hi",
                time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
                isSent: true,
                isSeen: true,
              },
              {
                textContent: "Hello. How can I help You?",
                time: "Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)",
                isSent: false,
                isSeen: true,
              },
              {
                textContent:
                  "Can I get details of my last transaction I made last month?",
                time: "Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)",
                isSent: true,
                isSeen: true,
              },
              {
                textContent:
                  "We need to check if we can provide you such information.",
                time: "Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)",
                isSent: false,
                isSeen: true,
              },
              {
                textContent: "I will inform you as I get update on this.",
                time: "Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)",
                isSent: false,
                isSeen: true,
              },
              {
                textContent:
                  "If it takes long you can mail me at my mail address.",
                time: "Mon Dec 11 2018 07:46:20 GMT+0000 (GMT)",
                isSent: true,
                isSeen: false,
              },
            ],
          },
        },
      },
    };
  },
  watch: {
    windowWidth() {
      this.setSidebarWidth();
    },
    reqAccepted(newValue, oldValue) {
      console.log(typeof newValue, newValue,"reqAccepted new value");
      if (newValue === true) {
        this.checkforMsgRequest();
      }
    },
  },
  computed: {
    chatLastMessaged() {
      // return (userId) => this.$store.getters["chat/chatLastMessaged"](userId);
    },
    chatUnseenMessages() {
      return (userId) => {
        const unseenMsg = this.$store.getters["chat/chatUnseenMessages"](
          userId
        );
        console.log(unseenMsg, "unseenMsg++++++++++++++");
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
    msgRequestAccepted() {
      this.popupActive2 = false;
      this.reqAccepted = true;
      console.log("isnide accept msg");
    },
    chatContacts() {
      axios
        .post(Base_URL.Actual_URL + "get_contact_list", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
          agent_id: localStorage.id,
        })
        .then((response) => {
          console.log(response, "responseeeeeeeeeeeeeeeeeeeeee");
          // return (this.newContacts = response.data.contact_list);
        });
      return (this.chatContacts = this.data.contacts);
    },
    contacts() {
      axios
        .post(Base_URL.Actual_URL + "get_contact_list", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
          agent_id: localStorage.id,
        })
        .then((response) => {
          console.log(response.data, "response");
          this.newContacts = response.data.user_list;
          console.log(this.newContacts,'this.newContacts')
          if (this.newContacts.length > 0) {
            this.activeChatUser = this.newContacts[0].user_id;
            this.activeContact = this.newContacts[0];
          }

          console.log(this.activeChatUser, "isActiveChatuSer");
          return this.newContacts;
        });
      //  this.chatContacts= this.data.contacts
    },
    customChatUnseenMessage(userID) {
      var newUser = JSON.parse(localStorage.getItem("message"));
      if (newUser !== null) {
        if (newUser.user_name === "" + userID) {
          return 1;
        }
      }
    },
    sendMessage: function () {
      console.log("hello send message");

      // socket.emit("my event", {
      //   user_name: localStorage.id,
      //   message: this.message,
      //   isSent: true,
      //   isSeen: false,
      //   author: localStorage.email,
      // });
      if (!this.message) return;

      // localStorage.setItem("message", JSON.stringify(msg));

      // const payload = {
      //   isPinned: this.isChatPinned,
      //   msg: {
      //     textContent: this.message,
      //     time: String(new Date()),
      //     isSent: true,
      //     isSeen: false,
      //   },
      //   id: this.activeChatUser,
      // };
      // var test = this.$store.dispatch("chat/sendChatMessage", payload);
      // this.message = "";

      const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS;
      scroll_el.scrollTop = this.$refs.chatLog.scrollHeight;
    },

    closeProfileSidebar(value) {
      this.activeProfileSidebar = value;
    },
    updateActiveChatUser(contact, contactId) {
      console.log(contactId, "updateActiveChatUser");
      this.activeChatUser = contactId;
      this.activeContact = contact;
      console.log(
        this.activeContact,
        "active contact from update active chat user"
      );
      //  this.getChatMessages(contactId)
      // if (this.$store.getters["chat/chatDataOfUser"](contact)) {
      //   this.$store.dispatch("chat/markSeenAllMessages", contactId);
      // }
      // const chatData = this.$store.getters["chat/chatDataOfUser"](
      //   this.activeChatUser
      // );
      // if (chatData) this.isChatPinned = chatData.isPinned;
      // else this.isChatPinned = false;

      this.toggleChatSidebar();
      this.typedMessage = "";
    },
    // getChatMessages(conatctID) {
    //    axios
    //     .post(Base_URL.Actual_URL + "get_message", {
    //       user_id: conatctID,
    //     })
    //     .then((response) => {
    //       this.newmessages = response.data.msg_list;
    //       // console.log(response, "new message response////////////");
    //     });
    // },
    containsKey(obj, key) {
      return Object.keys(obj).includes(key);
    },
    queuePurchase() {
      if (!this.message) return;
      console.log(this)
      console.log("queue message enter",this.activeContact.room,'activeContact');
      var responsemsg = JSON.parse(localStorage.getItem("message"));
      var responsemsg = JSON.parse(localStorage.getItem("message"));
      var body = {
        // chatbot_id: 1042,
        // company_id: parseInt(localStorage.company_id),
        chatbot_id: localStorage.chatbot_id,
        company_id: localStorage.company_id,
        username: localStorage.id,
        message: this.message,
        isSent: true,
        isSeen: false,
        author: localStorage.logged_in_user_name,
        room: this.activeContact.room
      }
      console.log(body,'emit')
      this.$socket.emit("my event", body);

      //   var isPresent = this.data.contacts.some(function (el) {
      //     return el.uid === responsemsg.user_name;
      //   });
      //   if (!isPresent) {
      //     this.data.contacts.splice(0, 0, {
      //       uid: responsemsg.user_name,
      //       displayName: responsemsg.user_name,
      //       about: responsemsg.message,
      //       photoURL: require("@/assets/images/portrait/small/avatar-s-1.jpg"),
      //       status: "online",
      //     });
      //   }
      // }
      this.message = "";
    },
    showProfileSidebar(userId, openOnLeft = false) {
      console.log(userId, "userID///");
      this.userProfileId = userId;
      this.isLoggedInUserProfileView = openOnLeft;
      this.activeProfileSidebar = !this.activeProfileSidebar;
    },
    sendMsg() {
      if (!this.typedMessage) return;
      const payload = {
        isPinned: this.isChatPinned,
        msg: {
          textContent: this.typedMessage,
          time: String(new Date()),
          isSent: true,
          isSeen: false,
        },
        id: this.activeChatUser,
      };
      // this.$store.dispatch("chat/sendChatMessage", payload);
      this.typedMessage = "";

      const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS;
      scroll_el.scrollTop = this.$refs.chatLog.scrollHeight;
    },
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
    fillData(data) {
      var body;
      console.log(data, "data");
      if (!this.containsKey(data, "author")) {
        console.log("hey if");
        body = {
          company_id: parseInt(localStorage.company_id),
          chatbot_id: localStorage.chatbot_id,
          username: data.username,
          picture_url: "B",
          messge: data.message,
          msg_from: data.username,
          msg_to: "" + localStorage.id,
          is_seen: 0,
          receiver: localStorage.id,
          room: data.room
        };
      } else {
        console.log("hey else", this.activeContact);
        body = {
          company_id: parseInt(localStorage.company_id),
          chatbot_id: localStorage.chatbot_id,
          username: this.activeContact.contact,
          picture_url: "B",
          messge: data.message,
          msg_from: "" + localStorage.id,
          msg_to: "" + data.username,
          is_seen: 0,
          receiver: data.username,
          room: this.activeContact.room
        };
      }
      console.log(body,'store body')
      axios
        .post(Base_URL.Actual_URL + "store_message", body)
        .then((response) => {
          console.log("store response");
          this.newMsg = data.message;
          localStorage.removeItem("message");
          this.contacts();
        });
    },
    async checkNewUser(data) {
      console.log("insidenew user", data);
      var body =   {company_id: parseInt(localStorage.company_id),
          chatbot_id: localStorage.chatbot_id,
          username: data.username,
          room: data.room}
          console.log(body,'bodyyyyyyyyyy')
      await axios
        .post(Base_URL.Actual_URL + "valid_contact", body)
        .then((response) => {
          if (response.data.result === "Message From New Contact") {
            console.log("inside if");
            // this.sockets.emit("join_room", {
            //   username: data.user_name,
            //   room: channels,
            // });
            this.newChatBotUserName = data.username;
            // this.popupActive2 = true;
            
           this.$toasted.info("You have new message request. &#013;", {
              icon: "message",
            action: [
                {
                  text: "Accept",
                  onClick: (e, toast) => {
                    this.popupActive2 = true;
                    this.reqAccepted = true;
                    toast.goAway(0);
                    return response;
                  },
                },
                {
                  text: "Reject",
                  onClick: (e, toast) => {
                    this.popupActive2 = true;
                    this.reqAccepted = false;
                    toast.goAway(0);
                    return response;
                  },
                },
              ],
            });
            console.log(
              this.popupActive2,
              "popactivr",
              this.reqAccepted,
              "reqAccepted"
            );
          }
          console.log('heyy response return')
          
        });
    },
    checkforMsgRequest() {
      if (this.reqAccepted) {
        console.log(this.reqAccepted,'reqAccepted')
        this.fillData(JSON.parse(localStorage.getItem("message")));
      }
    },

    getRealtimeData(data) {
      console.log("get realtime data",data);
      let v = this;
      // this.sockets.subscribe("my_response", (data) => {
      console.log(data, "data frm socket subscribe");
      v.reqAccepted = false;
      v.popupActive2 = false;
      v.checkNewUser(data).then(() => {
        console.log("inside then");
        console.log("check");
        if (v.popupActive2) {
          console.log('popupActive2 inside if')
          v.checkforMsgRequest();
        } else {
          console.log("check 2");
          v.fillData(data);
        }
      });
      // });
    },
    newMessageEvent(e) {
      console.log(e, "e");
      this.$vs.notify({
        time: 4000,
        color: "success",
        title: e,
        position: "top-center",
      });
    },
    emitforRoom(connectionData) {
      console.log(connectionData);
      this.$socket.emit("join_room", {
        username: localStorage.logged_in_user_name,
        room: connectionData.room,
      });
    },
  },
  components: {
    VuePerfectScrollbar,
    ChatContact,
    UserProfile,
    ChatNavbar,
    ChatLog,
  },
  created() {
    this.sockets.subscribe("custom_connection", (data) => {
      console.log(data, "socket connection data");
    });
    this.$store.registerModule("chat", moduleChat);
    this.$store.dispatch("chat/fetchContacts");
    this.$store.dispatch("chat/fetchChatContacts");
    this.$store.dispatch("chat/fetchChats");
    this.setSidebarWidth();
    this.contacts();
    this.chatContacts = this.data.contacts;
    this.chatUsers = chatUsersData;
    console.log(chatUsersData, "chatUsersData");
  },
  // beforeCreate() {
  //   EventBus.$on('newMessageEvent', this.newMessageEvent)
  // },
  // beforeMount(){
  //   EventBus.$on('newMessageEvent', this.newMessageEvent1)
  // },
  mounted() {
    //   this.$vs.notify({
    //   time: 500000,
    //      title:'Time 8s (8000)',
    //   text:'Lorem ipsum dolor sit amet consectetur',
    //   color:'primary',
    //   iconPack: 'feather',
    //   icon: 'icon-clock'
    // });
    //  this.$confirm("Are you sure?").then(() => {
    //  //do something...
    // });
    console.log("chat mount");
    this.$store.dispatch("chat/setChatSearchQuery", "");
    // this.getRealtimeData();
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
    // Fired when the server sends something on the "messageChannel" channel.
    my_response: function (data) {
      console.log(data,'my_response')
      // EventBus.$emit('newMessageEvent',data)
                  localStorage.setItem("message", JSON.stringify(data));

      this.getRealtimeData(data);
      // console.log(
      //   "this method was fired by the socket server.frm chhhhhhhhhhhhhhhat",
      //   data
      // );

    },
    custom_connection: function (data) {
      console.log(data, "custom");
      this.emitforRoom(data);
    },
    customEmit: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },

    disconnect() {
      this.isConnected = false;
    },
  },
};

var socket = io("http://188.227.58.42:7000");

// var socket = io("localhost:7000");
// broadcast a message
socket.on("connect", function () {
  console.log("connected");
  var check = socket.emit("join_room", {
    username: "Pankaj",
    room: "Room_1",
  });
  console.log(check, "check");
});

// socket.on("my response", function (msg) {
//   localStorage.setItem("message", JSON.stringify(msg));
//   console.log( msg, typeof localStorage.id);

//   // document.getElementById("que").click();
// });
</script>



<style lang="scss">
@import "@/assets/scss/vuexy/apps/chat.scss";

#chat-app .chat-content-area .chat-content-scroll-area {
  height: -webkit-fill-available !important;
}

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
</style>
