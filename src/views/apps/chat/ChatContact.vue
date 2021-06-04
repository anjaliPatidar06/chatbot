<!-- =========================================================================================
    File Name: ChatContact.vue
    Description: Chat contact - single component for chat
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="chat__contact flex items-center px-2 pt-4 pb-2"
    :class="{ 'bg-primary-gradient text-white shadow-lg': isActiveChatUser }"
  >
    <div class="contact__avatar mr-1">
      <!-- <vs-avatar class="border-2 border-solid border-white" :src="contact.photoURL" size="42px" /> -->
      <vs-avatar class="border-2 border-solid border-white" size="42px" />
    </div>
    <div
      class="contact__container w-full flex items-center justify-between overflow-hidden"
    >
      <div class="contact__info flex flex-col truncate w-5/6">
        {{ contact.contact }}
        <!-- <h5 class="font-semibold" :class="{'text-white': isActiveChatUser}">{{ contact.displayName }}</h5> -->
        <h5
          class="font-semibold"
          :class="{ 'text-white': isActiveChatUser }"
        ></h5>

        <span
          class="truncate"
          v-if="
            lastMessaged &&
            lastMessaged.msg_type !== 'image' &&
            lastMessaged.msg_type == 'text'
          "
          v-html="remove_linebreaks(lastMessaged.textContent)"
          >{{ showLastMsg ? lastMessaged.textContent : "Chat not found" }}
        </span>
        <span
          class="truncate"
          v-if="lastMessaged && lastMessaged.msg_type == 'image'"
        >
          <i class="fa fa-picture-o" aria-hidden="true"></i> Photo
        </span>

        <span class="truncate" v-if="lastMessaged && lastMessaged.msg_type == 'application/pdf'"
          >{{ lastMessaged.file_name }}
          <i class="fa fa-pdf-o" aria-hidden="true"></i>
        </span>
        <span
          class="text-archive"
          v-if="lastMessaged && lastMessaged.msg_type == 'application/msword'"
          >{{ lastMessaged.file_name }}
          <i class="fa fa-file-o" aria-hidden="true"></i>
        </span>

        <span class="truncate" v-if="!lastMessaged"
          ><b style="color: grey"> Start Conversation</b></span
        >
      </div>

      <div class="chat__contact__meta flex self-start flex-col items-end w-1/6">
        <span class="whitespace-no-wrap" v-if="!lastMessaged"></span>
        <span class="whitespace-no-wrap" v-if="lastMessaged">{{
          moment.tz(lastMessaged.msg_time, "GMT").format("DD MMM")
        }}</span>
        <vs-chip class="number" color="primary" v-if="unseenMsg">{{
          unseenMsg
        }}</vs-chip>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment-timezone");

export default {
  props: {
    contact: { type: Object, required: true },
    isActiveChatUser: { type: Boolean },
    lastMessaged: { type: Object },
    showLastMsg: { type: Boolean, default: false },
    unseenMsg: { type: Number, default: 0 },
  },
  data() {
    return {
      moment,
    };
  },
  filters: {
    hashBold: function (value) {
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
  },
  methods: {
    remove_linebreaks(str) {
      // var div = document.createElement("div");
      // div.innerHTML = str;
      // var text = div.textContent || div.innerText || "";
      // // document.write(text)
      // var str1 = text.replace(/[\r<br/>]+/gm, "");
      // var str2 = str1.replace(/[\r<p>]+/gm, "");
      // return str2.replace(/[\r<p/>]+/gm, "");
      return str.replace('(/\r?<br/>|\r/g', " ");
    },
  },
};
</script>

