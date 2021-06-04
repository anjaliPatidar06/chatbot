<!-- =========================================================================================
    File Name: ChatLog.vue
    Description: Chat Application - Log of chat
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="component-chat-log" class="m-8" v-if="chatData">
    <div
      v-for="(msg, index) in chatData.msg"
      class="msg-grp-container"
      :key="index"
    >
      <!-- If previous msg is older than current time -->
      <template v-if="chatData.msg[index - 1]">
        <vs-divider
          v-if="!isSameDay(msg.msg_time, chatData.msg[index - 1].msg_time)"
          class="msg-time"
        >
          <span>{{ toDate(msg.msg_time) }}</span>
        </vs-divider>
        <div
          class="spacer mt-8"
          v-if="
            !hasSentPreviousMsg(chatData.msg[index - 1].msg_from, msg.msg_from)
          "
        ></div>
      </template>

      <div
        class="flex items-start"
        :class="[{ 'flex-row-reverse': msg.msg_from == agentId }]"
      >
        <template v-if="chatData.msg[index - 1]">
          <template
            v-if="
              !hasSentPreviousMsg(
                chatData.msg[index - 1].msg_from,
                msg.msg_from
              ) || !isSameDay(msg.msg_time, chatData.msg[index - 1].msg_time)
            "
          >
            <vs-avatar
              size="40px"
              class="border-2 shadow border-solid border-white m-0 flex-shrink-0"
              :class="msg.msg_from == agentId ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
            ></vs-avatar>
          </template>
           <!-- <div v-if="
              !hasSentPreviousMsg(
                chatData.msg[index - 1].msg_from,
                msg.msg_from
              ) || !isSameDay(msg.msg_time, chatData.msg[index - 1].msg_time)
            "
            class="con-vs-avatar border-2 shadow border-solid border-white m-0 flex-shrink-0 40px"
            style="width: 40px; height: 40px; background: rgb(195, 195, 195)"
            :class="msg.msg_from !== agentId ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
          >
            <i class="fa fa-laptop" style="font-size: 1.7em; color: white; position: absolute;left: 15%;top: 18%;" aria-hidden="true" ></i> 
          </div> -->
        </template>
<!-- 
        <template v-if="index == 0">
          <div
            class="con-vs-avatar border-2 shadow border-solid border-white m-0 flex-shrink-0 40px"
            style="width: 40px; height: 40px; background: rgb(195, 195, 195)"
            :class="msg.msg_from == agentId ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
          >
            <i class="fa fa-laptop" style="font-size: 1.7em; color: white; position: absolute;left: 15%;top: 18%;" aria-hidden="true" ></i> 
          </div>
        </template>  -->

        <template v-if="chatData.msg[index - 1]">
          <div
            class="mr-16"
            v-if="
              !(
                !hasSentPreviousMsg(
                  chatData.msg[index - 1].msg_from,
                  msg.msg_from
                ) || !isSameDay(msg.msg_time, chatData.msg[index - 1].msg_time)
              )
            "
          ></div>
        </template>

        <div
          class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm"
          :class="{
            'bg-primary-gradient text-white': msg.msg_from == agentId,
            'border border-solid border-transparent bg-white': !(
              msg.msg_from == agentId
            ),
          }"
        >
          <span>{{ msg.textContent }}</span>
          <span class="usertimestamp">{{
            moment.tz(msg.msg_time, "GMT").format("hh:mm A")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment-timezone");
export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      moment,
      agentId: localStorage.getItem("id"),
      newmessages: [],
    };
  },
  computed: {
    chatData() {
      return this.$store.getters["chat/chatDataOfUser"](this.userId);
    },
    activeUserImg() {
      return this.$store.state.AppActiveUser.photoURL;
    },
    // senderImg () {
    //   return (isSentByActiveUser) => {
    //     if (isSentByActiveUser) return this.$store.state.AppActiveUser.photoURL
    //     else return this.$store.getters['chat/contact'](this.userId).photoURL
    //   }
    // },
    hasSentPreviousMsg() {
      return (last_sender, current_sender) => last_sender === current_sender;
    },
  },
  methods: {
    isSameDay(time_to, time_from) {
      const date_time_to = new Date(Date.parse(time_to));
      const date_time_from = new Date(Date.parse(time_from));
      return (
        date_time_to.getFullYear() === date_time_from.getFullYear() &&
        date_time_to.getMonth() === date_time_from.getMonth() &&
        date_time_to.getDate() === date_time_from.getDate()
      );
    },
    toDate(time) {
      const locale = "en-us";
      const date_obj = new Date(Date.parse(time));
      const monthName = date_obj.toLocaleString(locale, {
        month: "short",
      });
      return `${date_obj.getDate()} ${monthName}`;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight;
      });
    },
  },
  updated() {
    this.scrollToBottom();
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>
