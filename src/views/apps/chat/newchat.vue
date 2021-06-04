<!-- =========================================================================================
    File Name: Chat.vue
    Description: Chat Application - Stay connected
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="chat-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
        <vs-sidebar class="items-no-padding" parent="#chat-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isChatSidebarActive" id="chat-list-sidebar">

            <!-- USER PROFILE SIDEBAR -->

            <div class="chat__profile-search flex p-4">
                <div class="relative inline-flex">
                    <vs-avatar v-if="activeUser.photoURL" class="m-0 border-2 border-solid border-white" :src="activeUser.photoURL" size="40px" @click="showProfileSidebar(Number(activeUser.uid), true)" />
                    <div class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0" :class="'bg-' + getStatusColor(true)"></div>
                </div>
                <vs-input icon-no-border icon="icon-search" icon-pack="feather" class="w-full mx-5 input-rounded-full" placeholder="Search or start a new chat" v-model="searchQuery"/>

                <feather-icon class="md:inline-flex lg:hidden -ml-3 cursor-pointer" icon="XIcon"  />
            </div>

            <vs-divider class="d-theme-border-grey-light m-0" />
            <component :is="scrollbarTag" class="chat-scroll-area pt-4">
 
                <!-- ACTIVE CHATS LIST -->
                <div class="chat__chats-list mb-8">
                    <h3 class="text-primary mb-5 px-4">Chats</h3>
                    <ul class="chat__active-chats bordered-items" v-for="ci in contactvalue.contacts" :key="ci">
<li class="cursor-pointer" v-for="user in sakshi.chats" :key="user" @click="updateActiveChatUser(ci.uid)">
<div class=" mb-5 px-4 contact__info flex flex-col truncate w-5/6">
<h5 class="font-semibold" :class="{'text-black': isActiveChatUser}">{{ci.displayName}}</h5>
<span >{{user["msg"][(user["msg"].length)-1].textContent}}</span>

</div>

</li>


</ul>
                </div>


                <!-- CONTACTS LIST -->
                
            </component>
        </vs-sidebar>

        <!-- RIGHT COLUMN -->
        <div class="chat__bg no-scroll-content chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0" :class="{'sidebar-spacer--wide': clickNotClose, 'flex items-center justify-center': activeChatUser === null}">
          
            <template v-if="activeChatUser">
                <div class="chat__navbar">

                    <chat-navbar  :user-id="activeChatUser" ></chat-navbar>
                </div>
                 <component :is="scrollbarTag" class="chat-content-scroll-area border border-solid d-theme-border-grey-light" :settings="settings" ref="chatLogPS" :key="$vs.rtl">

<div class="chat__log">
{{isSent}}
<div v-if="msg.isSent===true">
  <div class="flex items-start" :class="[{'flex-row-reverse' : msg.isSent===true}]">
   
<span style="float:right" class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 ml-3 mr-3 rounded-lg max-w-sm border border-solid border-transparent bg-primary-gradient text-white">{{conew}}</span>
</div>
</div>
<div v-else>
  <div class="flex items-start" :class="[{'flex-row-reverse' : msg.isSent===false}]">
   
<span style="float:left" class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 ml-3 mr-3 rounded-lg max-w-sm border border-solid border-transparent bg-primary-gradient text-white">{{conewnew}}</span>
</div>
</div>





</div>

</component>
                
              
                
                <div class="chat__input flex p-4 bg-white">
<vs-input class="flex-1" placeholder="Type Your Message" v-model="message" @keyup.enter="sendMessage" />
<vs-button class="bg-primary-gradient ml-4" type="filled" @click="sendMessage">Send</vs-button>
</div>

            </template>
            
        </div>
    </div>
</template>

<script>
import ChatContact         from './ChatContact.vue'
import ChatLog             from './ChatLog.vue'
import ChatNavbar          from './ChatNavbar.vue'
import UserProfile         from './UserProfile.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleChat          from '@/store/chat/moduleChat.js'
import io from 'socket.io-client'
//import VueSocketIO from 'vue-socket.io'

// import myJSON from "../../../../chatbackup.json"
// import chatco from "../../../../contact.json"
//import myJSON from "../wwwroot/chatbot_backend/chatbackup.json"





export default {
  data () {
    return {
       sakshi: myJSON,
      message:'',
      contactvalue:chatco,
     
      
      active               : true,
      isHidden             : false,
      searchContact        : '',
      activeProfileSidebar : false,
      activeChatUser       : null,
      userProfileId        : -1,
      typedMessage         : '',
      isChatPinned         : false,
      settings             : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.70
      },
      clickNotClose        : true,
      isChatSidebarActive  : true,
      isLoggedInUserProfileView: false,
      

    }
  },
  watch: {

    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
  chatLastMessaged () {
      //alert("last message")
      return (userId) => this.$store.getters['chat/chatLastMessaged'](userId)
    },
    chatUnseenMessages () {

      return (userId) => {
        const unseenMsg = this.$store.getters['chat/chatUnseenMessages'](userId)
        if (unseenMsg) return unseenMsg
      }
    },
     hasSentPreviousMsg () {
      return (last_sender, current_sender) => last_sender === current_sender
    },
  
    activeUser () {
      //alert("in  computed function")
      return this.$store.state.AppActiveUser
    },
    getStatusColor () {
     // alert("get status color")
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
    chatContacts () {
      //alert("chat contacts")
      return this.$store.getters['chat/chatContacts']
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
    isActiveChatUser () {
      //alert("is active function")
      return (userId) => userId === this.activeChatUser
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    scrollToBottom () {
      this.$nextTick(() => {
        this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight
      })
    },
    isSameDay (time_to, time_from) {
      //alert("same day function")
      const date_time_to = new Date(Date.parse(time_to))
      const date_time_from = new Date(Date.parse(time_from))
      return date_time_to.getFullYear() === date_time_from.getFullYear() &&
                date_time_to.getMonth() === date_time_from.getMonth() &&
                date_time_to.getDate() === date_time_from.getDate()
    },
    toDate (time) {
      //alert("in to date function")
      const locale = 'en-us'
      const date_obj = new Date(Date.parse(time))
      const monthName = date_obj.toLocaleString(locale, {
        month: 'short'
      })
      return `${date_obj.getDate()  } ${   monthName}`
    },
    getUserStatus (isActiveUser) {
      //alert("get user function")
      // return "active"
      return isActiveUser ? this.$store.state.AppActiveUser.status : this.contacts[this.activeChatUser].status
    },
    closeProfileSidebar (value) {
      this.activeProfileSidebar = value
    },
    updateActiveChatUser (contactId) {
      
      this.activeChatUser = contactId
      
     
      const chatData = this.$store.getters['chat/chatDataOfUser'](this.activeChatUser)
      if (chatData) this.isChatPinned = chatData.isPinned
          else this.isChatPinned = false
      this.toggleChatSidebar()
      this.message = ''
      
    },
   
    sendMessage () {
      

        var newemail=localStorage.getItem('email')
        
        const payload = {
            'isPinned': 1,
            'msg': {
            displayName :newemail,
            'textContent' : this.message,
            'time' : String(new Date()),
            'isSent' : true,
            'isSeen' : true
            }}
        socket.emit( "my event", payload )
         
          
  
    
      this.$store.dispatch('chat/sendChatMessage', payload)
      this.message = ''

      const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
      scroll_el.scrollTop = this.$refs.chatLog.scrollHeight

      
    },
    toggleIsChatPinned (value) {
      alert("in toggle")
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
    

  },
  
 mounted () {
  
          
  this.scrollToBottom()

this.$store.dispatch('chat/setChatSearchQuery', '')

}
}
//var posts=[]
var socket = io('localhost:7000')

//var socket =io('ws://188.227.58.42:7000')
      // broadcast a message
      socket.on( 'connect', function() {
       
        socket.emit('join_room', {
            username: "Pankaj",
            room: "Room_1"
        });
      });
      socket.on( 'my response',function( msg  ) {



    
    if( msg.displayName !== 'undefined' && msg.textContent.length >= 1) {
    
			
    }});
    
      
    



</script>


<style lang="scss">
@import "@/assets/scss/vuexy/apps/chat.scss";
</style>
