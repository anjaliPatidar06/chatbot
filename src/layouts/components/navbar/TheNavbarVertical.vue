<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

       <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">
         
        
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />

        <bookmarks :navbarColor="navbarColor"  v-if="windowWidth >= 992 && user_role !== 'Superadmin' && user_role !== 'Live Agent'" />

       <span class="text-primary" v-if="user_role !== 'Superadmin' && user_role !== 'Live Agent'">Selected Chatbot Name :<b> {{chatbotname}}</b></span>
              <!-- <span class="text-primary" v-if="(selectedChatbot == undefined || selectedChatbot == '') || chatbotname !== 'No Chatbot Selected'">Selected Chatbot Name : <b>{{chatbotname}}</b></span>
              <span v-if="(selectedChatbot !== undefined && selectedChatbot !== '' && selectchatbot !== null) && chatbotname == 'No Chatbot Selected'">2 Selected Chatbot Name : <b>{{ selectedChatbot }}</b></span>
              <span v-if="(selectedChatbot == null) && (chatbotname == 'No Chatbot Selected')">{{chatbotname}}</span> -->
        <vs-spacer />

        <!-- <search-bar /> -->

        <!-- <notification-drop-down /> -->

        <profile-drop-down/>

      </vs-navbar> 
    </div>
  </div>
</template>


<script>
import Bookmarks            from "./components/Bookmarks.vue"
import SearchBar            from "./components/SearchBar.vue"
import NotificationDropDown from "./components/NotificationDropDown.vue"
import ProfileDropDown      from "./components/ProfileDropDown.vue"
import { EventBus } from "../../../event-bus";
var selectedChatbot
export default {
 data() {
    return {
      selectedChatbot: '',
      user_role: localStorage.user_role
    }
 },
  name: 'the-navbar-vertical',
    components: {
    Bookmarks,
   
    SearchBar,
    
    NotificationDropDown,
    ProfileDropDown
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    },
    chatbotname: {
      type: String,
      default: ''
    }
  },

   mounted () {
   },
  computed: {
    navbarColorLocal () {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    verticalNavMenuWidth () {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor () {
      return {'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')}
    },
    windowWidth () {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj () {
      if      (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth)               return 'navbar-full'
    }
  },
  methods: {
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    }
  }
}
</script>

