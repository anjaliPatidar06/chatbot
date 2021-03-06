<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="layout--main"
    :class="[
      layoutTypeClass,
      navbarClasses,
      footerClasses,
      { 'no-scroll': isAppPage },
    ]"
  >
    <v-nav-menu
      :navMenuItems="navMenuItems"
      title="Vuexy"
      parent=".layout--main"
    />

    <div
      id="content-area"
      :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]"
    >
      <div id="content-overlay" />
      <!-- Navbar -->
      <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1200">
        <the-navbar-horizontal
          :navbarType="navbarType"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark },
          ]"
        />

        <div style="height: 62px" v-if="navbarType === 'static'"></div>

        <h-nav-menu
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark },
          ]"
          :navMenuItems="navMenuItems"
        />
      </template>

      <template v-else>
        <the-navbar-vertical
          :navbarColor="navbarColor"
          :chatbotname="chatbotname"
          @selectedChatbotName="selectedChatbotName"
          @chatbotDeleted="chatbotDeleted"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark },
          ]"
        ></the-navbar-vertical>
      </template>
      <chatmessage v-if="showChatComponent" style="display: none"></chatmessage>
      <!-- /Navbar -->

      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
              <div
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
                class="router-header flex flex-wrap items-center mb-6"
              >
                <div
                  class="content-area__heading"
                  :class="{
                    'pr-4 border-0 md:border-r border-solid border-grey-light':
                      $route.meta.breadcrumb,
                  }"
                >
                  <h2 class="mb-1">{{ routeTitle }}</h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb
                  class="ml-4 md:block hidden"
                  v-if="$route.meta.breadcrumb"
                  :route="$route"
                  :isRTL="$vs.rtl"
                />

                <!-- DROPDOWN -->
                <vs-dropdown
                  vs-trigger-click
                  class="ml-auto md:block hidden cursor-pointer"
                >
                  <vs-button radius icon="icon-settings" icon-pack="feather" />

                  <vs-dropdown-menu class="w-32">
                    <vs-dropdown-item>
                      <!-- <div @click="$router.push('/pages/profile').catch(() => {})" class="flex items-center">
                        <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                        <span>Profile</span>
                      </div> -->
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        @click="$router.push('/apps/todo').catch(() => {})"
                        class="flex items-center"
                      >
                        <feather-icon
                          icon="CheckSquareIcon"
                          class="inline-block mr-2"
                          svgClasses="w-4 h-4"
                        />
                        <span>Tasks</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        @click="$router.push('/apps/email').catch(() => {})"
                        class="flex items-center"
                      >
                        <feather-icon
                          icon="MailIcon"
                          class="inline-block mr-2"
                          svgClasses="w-4 h-4"
                        />
                        <span>Inbox</span>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </transition>

            <div class="content-area__content">
              <back-to-top
                bottom="5%"
                :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'"
                visibleoffset="500"
                v-if="!hideScrollToTop"
              >
                <vs-button
                  icon-pack="feather"
                  icon="icon-arrow-up"
                  class="shadow-lg btn-back-to-top"
                />
              </back-to-top>

              <transition :name="routerTransition" mode="out-in">
                <router-view
                  @changeRouteTitle="changeRouteTitle"
                  @setAppClasses="
                    (classesStr) => $emit('setAppClasses', classesStr)
                  "
                />
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>


<script>
import BackToTop from "vue-backtotop";
import HNavMenu from "@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue";
import navMenuItems from "@/layouts/components/vertical-nav-menu/navMenuItems.js";
import TheNavbarHorizontal from "@/layouts/components/navbar/TheNavbarHorizontal.vue";
import TheNavbarVertical from "@/layouts/components/navbar/TheNavbarVertical.vue";
import TheFooter from "@/layouts/components/TheFooter.vue";
import themeConfig from "@/../themeConfig.js";
import VNavMenu from "@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue";
import { EventBus } from "../../event-bus";
import chatmessage from "../../views/apps/chat/Chat.vue";
import { Base_URL } from "../../../api.config";
import axios from "axios";

export default {
  components: {
    BackToTop,
    HNavMenu,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu,
    chatmessage,
  },
  data() {
    return {
      footerType: themeConfig.footerType || "static",
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || "#fff",
      navbarType: themeConfig.navbarType || "floating",
      navMenuItems: navMenuItems,
      routerTransition: themeConfig.routerTransition || "none",
      routeTitle: this.$route.meta.pageTitle,
      chatbotname: "No Chatbot Selected",
      showChatComponent: true,
    };
  },

  watch: {
    $route(to, from) {
      // console.log(to.name,'namee frm watch')
      if (to.name == "chat") {
        this.showChatComponent = false;
      } else {
        this.showChatComponent = true;
      }
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      const color = this.navbarColor == "#fff" && val ? "#10163a" : "#fff";
      this.updateNavbarColor(color);
    },
    "$store.state.mainLayoutType"(val) {
      this.setNavMenuVisibility(val);
    },
  },
  methods: {
    forceRerender() {
      // console.log('force Rerender')
      // Remove my-component from the DOM
      this.showChatComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.showChatComponent = true;
      });
    },
  },
  computed: {
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },

    contentAreaClass() {
      if (this.mainLayoutType === "vertical") {
        if (this.verticalNavMenuWidth == "default")
          return "content-area-reduced";
        else if (this.verticalNavMenuWidth == "reduced")
          return "content-area-lg";
        else return "content-area-full";
      }
      // else if(this.mainLayoutType === "boxed") return "content-area-reduced"
      else return "content-area-full";
    },
    footerClasses() {
      return {
        "footer-hidden": this.footerType == "hidden",
        "footer-sticky": this.footerType == "sticky",
        "footer-static": this.footerType == "static",
      };
    },
    isAppPage() {
      return this.$route.meta.no_scroll;
    },
    isThemeDark() {
      return this.$store.state.theme == "dark";
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`;
    },
    mainLayoutType() {
      return this.$store.state.mainLayoutType;
    },
    navbarClasses() {
      return {
        "navbar-hidden": this.navbarType == "hidden",
        "navbar-sticky": this.navbarType == "sticky",
        "navbar-static": this.navbarType == "static",
        "navbar-floating": this.navbarType == "floating",
      };
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  methods: {
    chatbotDeleted(val) {
      if (val === parseInt(localStorage.getItem("chatbot_id"))) {
        this.chatbotname = "No Chatbot Selected";
        localStorage.setItem("selected_chatbot", "");
      }
    },
    selectedChatbotName(e) {
      if (localStorage.getItem("selected_chatbot") !== null) {
        //     this.chatbotname = e
        // }
        if (localStorage.getItem("selected_chatbot_id") !== null) {
          if (e == localStorage.getItem("selected_chatbot_id")) {
            const url = Base_URL.Actual_URL + "editchatbotname/";
            const id = e;
            const url1 = url + id;
            axios.get(url1, {}).then((response) => {
              this.rowdata = response.data.userlist;
              console.log(e, this.rowdata[0],'chatbot')
              this.chatbotname = this.rowdata[0].chatbotname;
            });
          }
        }
      }
    },
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val == "#fff") this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    setNavMenuVisibility(layoutType) {
      if (
        (layoutType === "horizontal" && this.windowWidth >= 1200) ||
        (layoutType === "vertical" && this.windowWidth < 1200)
      ) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
        this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");
      } else {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
      }
    },
  },
  created() {
    if (
      localStorage.selected_chatbot !== null &&
      localStorage.selected_chatbot !== undefined &&
      localStorage.selected_chatbot !== ""
    ) {
      this.chatbotname = localStorage.selected_chatbot;
    }
    const color =
      this.navbarColor == "#fff" && this.isThemeDark
        ? "#10163a"
        : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.mainLayoutType);
    if (this.$route.name == "chat") {
      this.showChatComponent = false;
    }
  },
  mounted() {
    EventBus.$on("selectedChatbotName", this.selectedChatbotName);
    EventBus.$on("chatbotDeleted", this.chatbotDeleted);
  },
};
</script>

