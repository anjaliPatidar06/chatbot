<template>
  <div class="content">
    <div class="outerBox" v-if="payment_status.code == 3">
      <div class="fa fa-check-circle-o symbol" aria-hidden="true"></div>

      <div class="title">
        Payment Completed.<br />

        <p>You can <a @click="addUser()" style="cursor: pointer;">add user</a> now.</p>
      </div>
    </div>
    <div class="outerBox" v-if="payment_status.code == 1 || payment_status.code == -1">
      <div class="fa fa-exclamation-triangle" aria-hidden="true"></div>
      <div class="title">
        Payment {{payment_status.text}}.<br />
        <p>Please try again.</p>
      </div>
    </div>
    <div class="outerBox" v-if="payment_status.code == -2 || payment_status.code == -3">
      <div class="fa fa-times-circle-o" aria-hidden="true"></div>
      <div class="title">
        Payment Failed.<br />
        <p>Please try again.</p>
      </div>
    </div>
    <!-- <div class="text">Please try again</div> -->
  </div>
</template>

<script>
import axios from "axios";
import { Base_URL } from "../../../api.config";
export default {
  data() {
    return {
      payment_status: "",
    };
  },
  mounted() {
    this.checkPaymentStatus();
  },
  methods: {
    checkPaymentStatus() {
      axios
        .post(Base_URL.Actual_URL + "payment_get_orderid", {
          methods: "check",
          store: 25923,
          authkey: "f7Gng@bTpxw-bbhq",
          order_ref: localStorage.order_ref,
        })
        .then((res) => {
          this.payment_status = res.data.order.status;
          console.log(res.data.order.status.text, "res");
            localStorage.removeItem('order_ref')
        });
    },
    addUser() {
      this.$router.push({ name: "adduser" });
    },
  },
};
</script>

<style lang="stylus" scoped>
.outerBox {
        display: contents;
    justify-content: center;
    align-items: center;
}
* {
  background: rgb(255, 255, 255);
}
.fa.fa-exclamation-triangle{
      font-size: 100px;
  color: red;
}
.fa.fa-times-circle-o {
  font-size: 100px;
  color: red;
}

.content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding: 30px;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 25px 0px #ccc;
  -webkit-transition: all 0.3s ease-in-out;
}

.title {
  font-weight: bold;
  color: #626262;
  text-align: center;
}

p {
  color: #8889a2;
  font-size: 1.4rem;
}

.symbol {
  font-size: 150px;
  color: green;
}

.text {
  margin-top: 15px;
  font-size: 25px;
  color: #e7e7e7;
  text-align: center;
  font-family: 'avenir';
  font-weight: lighter;
}
</style>