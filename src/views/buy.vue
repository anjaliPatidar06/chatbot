<template>
  <div class="vx-col w-full mb-base" v-if="render">
    <vx-card title="Buy User">
      <div class="vx-row">
        <div class="vx-col sm:w-1/4 w-full mb-2">
          <small class="date-label">Chatbot Name </small>
          <v-select
            class="w-full"
            v-validate="'required|min:3|max:25'"
            label="chatbotname"
            :options="rowdata"
            v-model="chatbotname"
            name="chatbot_name"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm">{{ errors.first("chatbot_name") }}</span>
        </div>
        <div class="vx-col sm:w-1/4 w-full mt-2">
          <small class="date-label ml-4">Number of User</small>
          <vs-input-number
            min="1"
            v-validate="'required'"
            name="no_of_user"
            v-model="nuser"
            size="medium"
          />
          <span class="text-danger text-sm ml-4">{{ errors.first("no_of_user") }}</span>
        </div>
        <div class="vx-col sm:w-1/4 w-full mb-2">
          <!-- <vs-input
            class="w-full"
            label="Cost "
            v-model="Cost"
            type="digit"
            size="medium"
            v-validate="'numeric'"
          /> -->
          <vx-input-group>
            <template slot="append">
              <div class="append-text bg-primary">
                <span aria-label="cost">$</span>
              </div>
            </template>

            <vs-input
              label="Cost"
              v-model="Cost"
              data-vv-validate-on="blur"
              name="cost"
              v-validate="'required|numeric'"
            />
          </vx-input-group>
          <span class="text-danger text-sm">{{ errors.first("cost") }}</span>
        </div>
        <div class="vx-col sm:w-1/4 w-full mb-2">
          <small class="date-label">Role </small>
          <v-select
            class="w-full"
            label="rolename"
            :options="role"
            v-model="selectedRole"
            v-validate="'required'"
            name="role"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm">{{ errors.first("role") }}</span>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mt-2">
          <vs-button class="mr-3" @click="formnew">Buy</vs-button>
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script type="text/javascript"></script>
<script type="text/javascript" src="https://www.foloosi.com/js/foloosipay.v2.js"></script>
<script>
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "./../../api.config";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    chatbot_name: {
      required: "Please enter chatbot name",
      // alpha: "Your chatbot name may only contain alphabetic characters",
    },
    cost: {
      required: "Please enter cost",
      numeric: "Cost must have numbers only.",
    },
    role: {
      required: "Please select role",
    },
    no_of_user: {
      required: "Please enter no. of user",
    },
  },
};
// register custom messages
Validator.localize("en", dict);
export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      nuser: 1,
      Cost: "",
      rowdata: [],
      chatbotname: "",
      role: [
        {
          rolecode: "Live Agent",
          rolename: "Live Agent",
        },
        {
          rolecode: "Chatbot Manager",
          rolename: "Chatbot Manager",
        },
      ],
      selectedRole: "",
      render: true,
    };
  },
  computed: {},
  mounted() {
    axios
      .post(Base_URL.Actual_URL + "chatbottable", {
        company_id: localStorage.company_id,
      })
      .then((response) => {
        this.rowdata = response.data.userlist;
      });
  },
  methods: {
    getRandomNumberBetween(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    async reload() {
      this.$forceUpdate();
      this.render = false;
      await this.$nextTick();
      this.render = true;
    },

    payment(cost, id) {
      // let merchantKey =
      //   "test_$2y$10$kQLHx5X2j2.LkNPuBcKlUeT4C4mJsOLZZTh092r5RjFEa8NaLaupy";
      // const body = {
      //   redirect_url: "http://188.227.58.42:83/payment-status",
      //   transaction_amount: cost,
      //   currency: "AED",
      //   customer_name: localStorage.logged_in_user_name,
      //   customer_email: localStorage.email,
      //   // site_return_url: "http://188.227.58.42:83/AddUser",
      //   site_return_url: "https://techsolvo.com/",
      // };
      // axios
      //   .post("https://foloosi.com/api/v1/api/initialize-setup", body, {
      //     headers: {
      //       merchant_key: merchantKey,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data.data, "res");
      //     var options = {
      //       reference_token: res.data.data.reference_token, //which is get from step2
      //       merchant_key: merchantKey,
      //       redirect: true,
      //     };
      //     var fp1 = new Foloosipay(options);
      //     fp1.open();
      //     foloosiHandler(response, function (e) {
      //       console.log(e, "e foloosi handler");
      //       if (e.data.status == "success") {
      //         //responde success code
      //         console.log(e.data.status, "hey if");
      //         //console.log(e.data.data.transaction_no);
      //       }
      //       if (e.data.status == "error") {
      //         //responde success code
      //         console.log(e.data.status, "hey error");
      //         //console.log(e.data.data.payment_status);
      //       }
      //       if (e.data.status == "closed") {
      //         //Payment Popup Closed
      //         console.log(e.data);
      //       }
      //     });
      //     fp1.close();
      //   });
      /*note : minimize form fields in card detail page*/
      axios
        .post(Base_URL.Actual_URL + "payment_order", {
          methods: "create",
          store: 25923,
          authkey: "f7Gng@bTpxw-bbhq",
          trantype: "sale",
          cart: id,
          amount: cost,
          currency: "AED",
          desc: "order transaction test",
          return_auth: "http://188.227.58.42:83/payment-status",
          return_decl: "http://188.227.58.42:83/payment-status",
          return_can: "http://188.227.58.42:83/payment-status",
          test: 1,
        })
        .then((res) => {
          console.log(res, "res");
          localStorage.setItem("order_ref", res.data.order.ref);
          window.location.href = res.data.order.url;
        });
    },
    formnew() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var newemail = localStorage.email;
          axios
            .post(Base_URL.Actual_URL + "buyuser", {
              nuser: this.nuser,
              cost: this.Cost,
              newemail: newemail,
              chatbotname: this.chatbotname.chatbotname,
              userrole: this.selectedRole.rolename,
            })
            .then((response) => {
              // console.log(this.getRandomNumberBetween(100000, 1))
              if (response.data.code == 200) {
                this.payment(this.Cost, this.getRandomNumberBetween(100000, 1));
                // this.reload()
                this.$vs.notify({
                  color: "success",
                  // title: "User Record",
                  text: "Please wait, while you are redirecitng to the payment gateway..",
                  position: "top-center",
                });
              }
              if (response.data.code == 404) {
                this.$vs.notify({
                  color: "danger",
                  // title: "User Record",
                  text: response.data.result,
                  position: "top-center",
                });
              }
            });
        }
      });
      //  this.$router.push({name: 'Buy'})
    },
  },
};
</script>
