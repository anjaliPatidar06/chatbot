<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">
        <logo class="w-10 mr-4 fill-current text-primary" />

        <!-- <img src="@/assets/images/logo/logo.png" alt="Logo" class="vx-logo" -->
        <!-- <img src="../../../public/logo.png" alt="Logo" class="w-10 vx-logo" /> -->

        <span id="main_logo">Chatbot</span></span
      >
      <span
        ><vs-button
          type="filled"
          color="primary"
          class="mr-2 buttontr float-right"
          to="/login"
          >Login</vs-button
        >
        <vs-button type="border" color="primary" class="float-right mr-2" to="/register"
          >Register</vs-button
        ></span
      >
    </nav>
    <div id="main_div">
      <div class="center">
        <h2 class="main-text">
          Get the free trial of ChatBot for 14 days.<br />Choose the plan that best fits
          you.
        </h2>
      </div>
      <div id="list_div">
        <ul id="plan_list">
          <li
            @click="ItemClicked('Monthly')"
            :class="{ active: activeTab === 'Monthly' }"
          >
            Monthly
          </li>
          <li
            @click="ItemClicked('Half Yearly')"
            :class="{ active: activeTab === 'Half Yearly' }"
          >
            Half Yearly
          </li>
          <li @click="ItemClicked('Yearly')" :class="{ active: activeTab === 'Yearly' }">
            Yearly
          </li>
          <li>
            <!-- <vs-button> -->
            <vs-dropdown>
              <a class="flex items-center" href.prevent>
                USD
                <i class="material-icons"> expand_more </i>
              </a>

              <vs-dropdown-menu>
                <!-- <vs-dropdown-item> Option 1 </vs-dropdown-item>
                <vs-dropdown-item> Option 2 </vs-dropdown-item> -->
              </vs-dropdown-menu></vs-dropdown
            >
            <!-- </vs-button
            > -->
          </li>
        </ul>
      </div>
    </div>
    <div
      id="demo-basic-card"
      class="container pt-4 d-flex align-items-center justify-content-center"
    >
      <div class="vx-row">
        <div class="vx-col w-full sm:w-1/2 lg:w-1/3 lg:w-1/4 xl:w-1/4 mb-base">
          <vx-card class="pb-12">
            <div class="ribbon ribbon-top-left">
              <span>Try it</span>
            </div>

            <div slot="no-body"></div>
            <h3 class="mb-2">Free</h3>
            <p id="subheading" class="pb-4 curved-2">1 bot <br />50 chats per month</p>
            <!-- <hr class="mt-2" /> -->
            <div class="text-center mt-4">
              <p><span>$19.00</span><br />/month billed annually</p>
              <vs-button
                id="subcription_btn1"
                type="gradient"
                class="mt-4 mr-2 shadow-lg"
                gradient-color-secondary="#CE9FFC"
                >Try it for free</vs-button
              >
            </div>
            <ul id="card_list" class="mt-4 mr-2 pt-4">
              <li class="ml-2"><span>Lead Generation Bot</span></li>
              <li class="ml-2"><span>Logical Branching</span></li>
              <li class="ml-2"><span>URL Based Flow</span></li>
              <li class="ml-2"><span>Text to Speech</span></li>
              <li class="ml-2"><span>Access Bot through Link</span></li>
              <li class="ml-2"><span>Email Notifications</span></li>
            </ul>
          </vx-card>
        </div>
        <div class="vx-col w-full sm:w-1/2 lg:w-1/3 lg:w-1/4 xl:w-1/4 mb-base">
          <vx-card class="pb-12">
            <div class="ribbon ribbon-top-left">
              <span>23<sup>%</sup><sub>Off</sub></span>
            </div>
            <div slot="no-body"></div>

            <h3 class="mb-2">Basic</h3>
            <p id="subheading" class="pb-4 curved-2">1 bot <br />50 chats per month</p>
            <!-- <hr class="mt-2" /> -->
            <div class="text-center mt-4 pt-2">
              <p><span>$19.00</span><br />/month billed annually</p>
              <vs-button
                class="mt-4 mr-2 shadow-lg"
                type="gradient"
                gradient-color-secondary="#CE9FFC"
                id="subcription_btn2"
                >Try it for Free</vs-button
              >
            </div>
            <ul class="mt-4 mr-2 pt-4" id="card_list">
              <li class="ml-2"><span>Lead Generation Bot</span></li>
              <li class="ml-2"><span>Logical Branching</span></li>
              <li class="ml-2"><span>URL Based Flow</span></li>
              <li class="ml-2"><span>Text to Speech</span></li>
              <li class="ml-2"><span>Access Bot through Link</span></li>
              <li class="ml-2"><span>Email Notifications</span></li>
            </ul>
          </vx-card>
        </div>
        <div class="vx-col w-full sm:w-1/2 lg:w-1/3 lg:w-1/4 xl:w-1/4 mb-base">
          <vx-card class="pb-12">
            <div class="ribbon ribbon-top-left">
              <span>20<sup>%</sup><sub>Off</sub></span>
            </div>
            <h3 class="mb-2">Pro</h3>
            <p id="subheading" class="pb-4 curved-2">1 bot <br />50 chats per month</p>

            <!-- <hr class="mt-2" /> -->
            <div class="text-center mt-4">
              <p><span>$100.00</span><br />/month billed annually</p>

              <vs-button
                class="mt-4 mr-2 shadow-lg"
                type="gradient"
                gradient-color-secondary="#CE9FFC"
                id="subcription_btn3"
                >Try it for Free</vs-button
              >
            </div>
            <ul class="mt-4 mr-2 pt-4" id="card_list">
              <li class="ml-2"><span>Lead Generation Bot</span></li>
              <li class="ml-2"><span>Logical Branching</span></li>
              <li class="ml-2"><span>URL Based Flow</span></li>
              <li class="ml-2"><span>Text to Speech</span></li>
              <li class="ml-2"><span>Access Bot through Link</span></li>
              <li class="ml-2"><span>Email Notifications</span></li>
            </ul>
          </vx-card>
        </div>
        <div class="vx-col w-full sm:w-1/2 lg:w-1/3 lg:w-1/4 xl:w-1/4 mb-base">
          <vx-card class="pb-12">
            <div class="ribbon ribbon-top-left">
              <span>50<sup>%</sup><sub>Off</sub></span>
            </div>
            <h3 class="mb-2">Premium</h3>
            <p id="subheading" class="pb-4 curved-2">1 bot <br />50 chats per month</p>

            <!-- <hr class="mt-2" /> -->

            <div class="text-center mt-4">
              <p><span>$50.00</span><br />/month billed annually</p>
              <vs-button
                class="mt-4 mr-2 shadow-lg"
                type="gradient"
                gradient-color-secondary="#CE9FFC"
                id="subcription_btn4"
                >Try it for Free</vs-button
              >
            </div>
            <ul class="mt-4 mr-2 pt-4" id="card_list">
              <li class="ml-2"><span>Lead Generation Bot</span></li>
              <li class="ml-2"><span>Logical Branching</span></li>
              <li class="ml-2"><span>URL Based Flow</span></li>
              <li class="ml-2"><span>Text to Speech</span></li>
              <li class="ml-2"><span>Access Bot through Link</span></li>
              <li class="ml-2"><span>Email Notifications</span></li>
            </ul>
          </vx-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "../../../src/layouts/components/Logo.vue";

export default {
  data() {
    return {
      // card 1
      card_1: {},
      activeTab: "Monthly",
    };
  },
  components: {
    Logo,
  },
  methods: {
    ItemClicked(e) {
      console.log(e, "clicked");
      if (e == "Monthly") {
        this.activeTab = "Monthly";
      }
      if (e == "Half Yearly") {
        this.activeTab = "Half Yearly";
      }
      if (e == "Yearly") {
        this.activeTab = "Yearly";
      }
    },
  },
};
</script>
<style scoped>
button.vs-component.vs-button.mt-4.mr-2.shadow-lg.vs-button-primary.vs-button-gradient {
  position: relative;
  border-radius: 17px;
  border: 0;
  /* background: linear-gradient(135degree, #9ecc38, #33EC9D6) !important; */
  /* background: linear-gradient(to right, #7164cc, #be59cb) !important; */

  /* background: linear-gradient(135degree, #7164CC, #33EC9D6) !important; */
  /* color: "#9ecc38";
  gradient-color-secondary: "33EC9D6"; */
}
button#subcription_btn1 {
  background: linear-gradient(to right, #7164cc, #be59cb) !important;
}
button#subcription_btn2 {
  background: linear-gradient(to right, #38c9cc, #3275cd) !important;
}
button#subcription_btn3 {
  background: linear-gradient(to right, #9546f6, #2bb3ee) !important;
}
button#subcription_btn4 {
  background: linear-gradient(to right, #6cd7ea, #71a80b) !important;
}
ul {
  list-style: none;
}

ul#card_list li:before {
  content: "✓";
  color: #3ce66d !important;
  font-weight: bolder;
  width: 2rem;
  font-size: 1rem;
}
div#main_div {
  background-color: rgb(63, 82, 128);
  color: white;
  font-size: 24px;
}
div#main_div {
  position: relative;
  height: 180px;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
h3 {
  font-weight: bold;
  text-align: center;
}
p {
  text-align: center;
}
span {
  font-size: 20px;
  font-weight: 500;
  color: black;
}
p#subheading {
  font-weight: 600;
  color: black;
  box-shadow: 0 16px 7px -8px grey;
  border-radius: 450px / 15px;
}
li span {
  position: relative;
  left: 10px;
  font-size: 12px;
  font-weight: normal;
  line-height: 25px;
}
.curved-2:after {
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  bottom: 0;
  box-shadow: 0 0px 10px 7px rgba(100, 100, 100, 0.5);
  border-radius: 450px / 15px;
}
.ribbon {
  /* width: 150px;
  height: 150px; */
  width: 118px;
  height: 100px;
  overflow: hidden;
  position: absolute;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  border: 5px solid #de2b2b;
}
.ribbon span {
  position: absolute;
  display: block;
  /* width: 225px; */
  width: 150px;
  /* padding: 15px 0; */
  padding: 8px 0;
  background-color: #de2b2b;
  box-shadow: 0 5px 10px grey;
  color: #fff;
  font: 700 18px/1 "Lato", sans-serif;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  text-align: center;
}

/* top left*/
.ribbon-top-left {
  /* top: -10px;
  left: -10px; */
  top: -6px;
  left: -12px;
}
.ribbon-top-left::before,
.ribbon-top-left::after {
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon-top-left::before {
  top: 0;
  /* right: 0; */
  right: 11px;
}
.ribbon-top-left::after {
  bottom: 0;
  /* left: 0; */
  left: 1px;
}
.ribbon-top-left span {
  /* right: -25px; */
  right: 0px;
  top: 24px;
  transform: rotate(-45deg);
}
.ribbon__element:focus {
  box-shadow: inset 0 -3px 0 0 #343435;
}
sub {
  font-size: 8px;
}
sup {
  font-size: 10px;
}
ul#plan_list {
  display: flex;
  background: white;
  color: black;
  font-size: 14px;
  border-radius: 17px;
  height: 40px;
  box-shadow: 1px 2px 4px rgb(0 0 0 / 30%);
}
ul#plan_list li {
  /* width: 100px;
  height: 25px; */
  width: 6.8rem;
  height: 1.8rem;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  align-self: center;
}
/* ul#plan_list li:before {
  content: "";
} */
#plan_list li.active {
  display: block;
  border-radius: 17px;
  border: 0;
  background-color: rgb(63, 82, 128);
  color: white;
}
#main_div div {
  display: flex;
  justify-content: center;
  align-items: center;
}
div#list_div {
  position: relative;
  /* bottom: -150px; */
  bottom: -156px;
}
#plan_list li:first-child {
  margin-left: 1rem;
  margin-right: 1rem;
}
#plan_list li:last-child {
  /* margin-left: 1rem; */
  margin-right: 1rem;
  border-radius: 17px;
  width: 5rem;
  margin-left: 0px;
  align-self: center;
  /* text-align: center; */
  border: 0;
  /* background-color: rgb(63, 82, 128); */
  border: 0;
  border: 1px solid lightgray;
  padding: 1px;
}
a.flex.items-center {
  color: black;
}
div#demo-basic-card {
  margin-top: 3.2rem;
}
.main-text {
  font-weight: 500;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  color: #eee;
  text-align: center;
}
span#main_logo {
  font-size: 22px;
  font-weight: 600;
}
.navbar {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: white;
}
.navbar-brand {
  display: inline-flex;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}
</style>
