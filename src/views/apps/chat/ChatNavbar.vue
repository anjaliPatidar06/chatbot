<!-- =========================================================================================
    File Name: ChatNavbar.vue
    Description: Chat Application - Chat navbar
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div v-if="userId != null" class="chat__header">
    <vs-navbar class="p-4 flex navbar-custom" color="white" type="flat">
      <div class="relative flex mr-4">
        <feather-icon
          icon="MenuIcon"
          class="mr-4 cursor-pointer"
          v-if="isSidebarCollapsed"
          @click.stop="$emit('openContactsSidebar')"
        />
        <!-- <vs-avatar
          class="m-0 border-2 border-solid border-white"
          size="40px"
          :src="userDetails.photoURL"
          @click.stop="$emit('showProfileSidebar', userId)"
        /> -->
        <vs-avatar
          class="m-0 border-2 border-solid border-white"
          size="40px"
          @click.stop="$emit('showProfileSidebar', userId)"
        />
        <!-- <div
          class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0"
          :class="'bg-' + getStatusColor(false)"
        ></div> -->
        <!-- <div
          class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0"
          :class="'bg-success'"
        ></div> -->
      </div>
      <!-- <h6>{{ test.contact }} </h6> -->
      <h6 class="font-semibold"  v-html="test.display_name == null ? test.contact : test.display_name"></h6>
      <vs-spacer></vs-spacer>
      <i class="fa fa-edit fa-lg" @click="openModal()"></i>
    <vs-popup
        class="holamundo"
        :active.sync="popupActive"
        title="Contact Name"
        @accept="addUserName"
        @close="closeModal"
      >
        <span class="text-danger text-sm">{{
          errors.first("contact_name")
        }}</span>
        <vs-input
          name="contact_name"
          v-validate="'required'"
          class="w-full"
          label-placeholder="Contact Name"
          v-model="contact_name"
          data-vv-validate-on="blur"
        />
        <vs-button class="mt-3" color="primary" @click="addUserName" type="filled"
          >Save</vs-button
        >
      </vs-popup>

      <!-- <feather-icon
        icon="StarIcon"
        class="cursor-pointer"
        :svgClasses="[
          { 'text-warning stroke-current': isPinnedLocal },
          'w-6',
          'h-6',
        ]"
        @click.stop="isPinnedLocal = !isPinnedLocal"
      ></feather-icon> -->
    </vs-navbar>
  </div>
</template>

<script>
import axios from "axios";
import { Base_URL } from "../../../../api.config";
// import { watch } from 'fs';
import { Validator } from "vee-validate";
import { EventBus } from "../../../event-bus";
const dict = {
  custom: {
    contact_name: {
      required: "Please enter contact name",
    },
  },
};
Validator.localize("en", dict);
var test
export default {
  data() {
    return {
      userData:[],
      test:[],
      popupActive: false,
      contact_name:''
    };
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    isPinnedProp: {
      type: Boolean,
      required: true,
    },
    isSidebarCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    //  async userDetails () {
    //           const payload = {
    //           company_id: localStorage.company_id,
    //           chatbot_id: 1042,
    //           user_id: this.userId
    //         }
    //         var test = this.$store.dispatch('chat/fetchContacts' ,payload)
    //     await test.then(function(result) {
    //         console.log(result,'result')
    //               return result
    //       })
    //       console.log('oustisdes')
    //   },
    // test:{
    //     set: function (newValue) {
    //       console.log(newvalue)
    //       // alert(newValue ,'newvalye')
    //     }    
    // },
    isPinnedLocal: {
      get() {
        return this.isPinnedProp;
      },
      set(val) {
        const chatData = this.$store.getters["chat/chatDataOfUser"](
          this.userId
        );
        if (chatData) {
          const payload = { id: this.userId, value: val };
          this.$store
            .dispatch("chat/toggleIsPinned", payload)
            .then(() => {
              this.$emit("toggleIsChatPinned", val);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          this.$emit("toggleIsChatPinned", val);
        }
      },
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
  },
  methods: {
    openModal() {
      this.popupActive = true
    },
    closeModal() {
      this.popupActive = false
    },
    addUserName() {
       this.$validator.validateAll().then((result) => {
        if (result) {
         axios.post(Base_URL.Actual_URL + "update_ip_name", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
          username: this.test.contact,
          display_name: this.contact_name
        })
        .then((response) => {
            console.log(response,'res')
            this.popupActive = false
            this.contact_name = ''
            this.userDetails()
            EventBus.$emit('user_detail_updated')
          });
        }
        })
    },
    userDetails() {
      axios.post(Base_URL.Actual_URL + "get_contact_list", {
          company_id: localStorage.company_id,
          chatbot_id: localStorage.chatbot_id,
          agent_id: localStorage.id
        })
        .then((response) => {
          this.newContacts = response.data.user_list;
          this.newContacts.forEach((contact) => {
            if (contact.user_id == parseInt(this.userId)) {
              this.test = contact;
              this.contact_name = this.test.display_name ? this.test.display_name : this.test.contact
               return this.test;
            }
          });
        });
    },
    getUserStatus(isActiveUser) {
      var test = this.data.contacts.forEach((contact) => {
        if (contact.uid === this.userId) {
          return contact;
        }
      });
      return isActiveUser
        ? this.$store.state.AppActiveUser.status
        : this.userDetails.status;
    },
  },

  async mounted () {
    await this.userDetails()
  },
    watch: {
    userId(newValue , oldValue) {
      if(newValue) {
        this.userDetails()
      }
    }
  }
};
</script>

