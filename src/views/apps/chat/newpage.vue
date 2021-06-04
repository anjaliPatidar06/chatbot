<template>
<div id="chat-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
<vs-sidebar class="items-no-padding" parent="#chat-app" :hidden-background="clickNotClose" v-model="isChatSidebarActive" id="chat-list-sidebar">

<!-- USER PROFILE SIDEBAR -->
<user-profile class="user-profile-container"></user-profile>

<div class="chat__profile-search flex p-4">
<div class="relative inline-flex">
<vs-avatar v-if="activeUser.photoURL" class="m-0 border-2 border-solid border-white" size="40px" />
<div class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0" ></div>
</div>
<vs-input icon-no-border icon="icon-search" icon-pack="feather" class="w-full mx-5 input-rounded-full" placeholder="Search or start a new chat" v-model="searchQuery"/>

<feather-icon class="md:inline-flex lg:hidden -ml-3 cursor-pointer" icon="XIcon" />
</div>

<vs-divider class="d-theme-border-grey-light m-0" />
<component :is="scrollbarTag" class="chat-scroll-area pt-4" >

<!-- ACTIVE CHATS LIST -->
<div class="chat__chats-list mb-8">
<h3 class="text-primary mb-5 px-4">Chats</h3>
<ul class="chat__active-chats bordered-items">
<li class="cursor-pointer" v-for="(contact, index) in chatContacts" :key="index" @click="updateActiveChatUser(contact.uid)">
<chat-contact showLastMsg :contact="contact" :lastMessaged="chatLastMessaged(contact.uid).time" :unseenMsg="chatUnseenMessages(contact.uid)" :isActiveChatUser="isActiveChatUser(contact.uid)"></chat-contact>
</li>
</ul>
</div>



<!-- CONTACTS LIST -->

</component>
</vs-sidebar>

<!-- RIGHT COLUMN -->
<div class="chat__bg no-scroll-content chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0" :class="{'sidebar-spacer--wide': clickNotClose, 'flex items-center justify-center': activeChatUser === null}">
<template >
<div class="chat__navbar">
<chat-navbar :isSidebarCollapsed="!clickNotClose" :user-id="activeChatUser" :isPinnedProp="isChatPinned" ></chat-navbar>
</div>
<component :is="scrollbarTag" class="chat-content-scroll-area border border-solid d-theme-border-grey-light" >
<div id="newchats">
  <!-- {{newmessages}} -->
<p v-for="message in newmessages" :key="message" class="message" :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
{{ message.body}}
</p>
<!-- <div>
<span style="float:right" id ="mesForTrue" class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 ml-3 mr-3 rounded-lg max-w-sm border border-solid border-transparent bg-primary-gradient text-white">{{conew}}</span>
<br>
</div>
<h1>"sakshi"</h1>
<div>
<span style="float:left" id="mesForFalse" class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 ml-3 mr-3 rounded-lg max-w-sm border border-solid border-transparent bg-primary-gradient text-white mt-4">{{conewnew}}</span>
<br>
</div> -->
</div>


<!-- <div v-if="true"> -->







<!-- </div> -->






<div class="chat__input flex bg-white" >
<vs-input class="flex-1" placeholder="Type Your Message" v-model="message" @keyup.enter="sendMessage" />
<vs-button class="bg-primary-gradient ml-2" type="filled" @click="sendMessage" hidden>Send</vs-button>
<vs-button class="bg-primary-gradient ml-2" type="filled" @click="queuePurchase" id="que">Sent button</vs-button>

<!-- <pre>{{ JSON.stringify(this.newmessages,this.message, "bob") }}</pre> -->
</div>
</component>

</template>

</div>
</div>
</template>
<script src="/socket.io/socket.io.js"></script>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
import ChatContact from './ChatContact.vue'
import ChatLog from './ChatLog.vue'
import ChatNavbar from './ChatNavbar.vue'
import UserProfile from './UserProfile.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleChat from '@/store/chat/moduleChat.js'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
//import myJSON from "../wwwroot/chatbot_backend/chatbackup.json"
//import myJSON from "../../../../chatbackup.json"

export default {

data () {
return {
// sakshi: myJSON,
newe:[],
active : true,
isHidden : false,
searchContact : '',
messages: [],
newmessages: [],
purchase:{
 body: this.message,
author: null
},


message: '',
username: '',
mes:'',
msg:[],
activeProfileSidebar : false,
activeChatUser : null,
userProfileId : -1,
typedMessage : '',
isChatPinned : false,
settings : {
maxScrollbarLength : 60,
wheelSpeed : 0.70
},
clickNotClose : true,
isChatSidebarActive : true,
isLoggedInUserProfileView: false
}
},
watch: {
windowWidth () {
this.setSidebarWidth()
}
},
computed: {
chatLastMessaged () {
return (userId) => this.$store.getters['chat/chatLastMessaged'](userId)
},
chatUnseenMessages () {
return (userId) => {
const unseenMsg = this.$store.getters['chat/chatUnseenMessages'](userId)
if (unseenMsg) return unseenMsg
}
},
activeUser () {
return this.$store.state.AppActiveUser
},
getStatusColor () {
return (isActiveUser) => {
const userStatus = this.getUserStatus(isActiveUser)

if (userStatus === 'online') {
return 'success'
} else if (userStatus === 'do not disturb') {
return 'danger'
} else if (userStatus === 'away') {
return 'warning'
} else {
return 'grey'
}
}
},

searchQuery: {
get () {
return this.$store.state.chat.chatSearchQuery
},
set (val) {
this.$store.dispatch('chat/setChatSearchQuery', val)
}
},
scrollbarTag () {
return this.$store.getters.scrollbarTag
},

windowWidth () {
return this.$store.state.windowWidth
}
},

methods: {
sendMessage:function() {

socket.emit( 'my event', {
user_name : "sakshi",
message:this.message,
'isSent' : true,
'isSeen' : false,
'author':"you"



} )
if (!this.message) return
const payload = {
'isPinned': this.isChatPinned,
'msg': {
'textContent' : this.message,
'time' : String(new Date()),
'isSent' : true,
'isSeen' : false
},
'id': this.activeChatUser
}
this.$store.dispatch('chat/sendChatMessage', payload)
this.message = ''

const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
scroll_el.scrollTop = this.$refs.chatLog.scrollHeight



} ,

closeProfileSidebar (value) {
this.activeProfileSidebar = value
},
updateActiveChatUser (contactId) {
this.activeChatUser = contactId
if (this.$store.getters['chat/chatDataOfUser'](this.activeChatUser)) {
this.$store.dispatch('chat/markSeenAllMessages', contactId)
}
const chatData = this.$store.getters['chat/chatDataOfUser'](this.activeChatUser)
if (chatData) this.isChatPinned = chatData.isPinned
else this.isChatPinned = false
this.toggleChatSidebar()
this.typedMessage = ''
},
 queuePurchase(msg){
   console.log("queue message enter")
   var responsemsg=JSON.parse(localStorage.getItem('message'))
   console.log(typeof(responsemsg))
  
   console.log(responsemsg.message,"reeeeeeee")

   if(responsemsg.isSent==true){ 
     
    this.newmessages.push({body: responsemsg.message, author: 'you'})
  
  }
  else{

  this.newmessages.push({body: responsemsg.message, author: 'bob'})

  }
 },
showProfileSidebar (userId, openOnLeft = false) {
this.userProfileId = userId
this.isLoggedInUserProfileView = openOnLeft
this.activeProfileSidebar = !this.activeProfileSidebar
},
sendMsg () {
if (!this.typedMessage) return
const payload = {
'isPinned': this.isChatPinned,
'msg': {
'textContent' : this.typedMessage,
'time' : String(new Date()),
'isSent' : true,
'isSeen' : false
},
'id': this.activeChatUser
}
this.$store.dispatch('chat/sendChatMessage', payload)
this.typedMessage = ''

const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
scroll_el.scrollTop = this.$refs.chatLog.scrollHeight
},
toggleIsChatPinned (value) {
this.isChatPinned = value
},
setSidebarWidth () {
if (this.windowWidth < 1200) {
this.isChatSidebarActive = this.clickNotClose = false
} else {
this.isChatSidebarActive = this.clickNotClose = true
}
},
toggleChatSidebar (value = false) {
if (!value && this.clickNotClose) return
this.isChatSidebarActive = value
}
},
components: {
VuePerfectScrollbar,
ChatContact,
UserProfile,
ChatNavbar,
ChatLog
},
created () {


this.$store.registerModule('chat', moduleChat)
this.$store.dispatch('chat/fetchContacts')
this.$store.dispatch('chat/fetchChatContacts')
this.$store.dispatch('chat/fetchChats')
this.setSidebarWidth()
},
beforeDestroy () {
this.$store.unregisterModule('chat')
},
mounted () {
this.$store.dispatch('chat/setChatSearchQuery', '')
}
}

var socket = io( 'localhost:7000')
// broadcast a message
socket.on( 'connect', function() {
// socket.emit( 'my event', {
// data: ''
// } );

socket.emit('join_room', {
username: "Pankaj",
room: "Room_1"
});
});


socket.on( 'my response',  function( msg ) {
console.log(msg)
  localStorage.setItem('message', JSON.stringify(msg));

document.getElementById('que').click()


})


</script>



<style lang="scss">
@import "@/assets/scss/vuexy/apps/chat.scss";
#chat-app .chat-content-area .chat-content-scroll-area {
height:-webkit-fill-available !important; }

body, html {
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
padding: .5em;
 margin-bottom: .5em; 
font-size: .8em;
}
.message-out {
background: #407FFF;
color: white;
margin-left: 50%;
}
.message-in {
background: #F1F0F0;
color: black;
}
.chat-inputs {
display: flex;
justify-content: space-between;
}
#person1-input {
padding: .5em;
}
#person2-input {
padding: .5em;
}

</style>
