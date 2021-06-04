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
          <span class="text-danger text-sm">{{
            errors.first("chatbot_name")
          }}</span>
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
          <span class="text-danger text-sm ml-4">{{
            errors.first("no_of_user")
          }}</span>
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
          <vs-button class="mr-3" @click="formnew">Submit</vs-button>
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "./../../api.config";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    chatbot_name: {
      required: "Please enter chatbot name",
      alpha: "Your chatbot name may only contain alphabetic characters",
    },
    cost: {
      required: "Please enter your cost",
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
          render:true

    };
  },
  computed: {
  },
  mounted() {
    var newemail = localStorage.getItem("email");
    axios
      .post(Base_URL.Actual_URL + "chatbottable", {
          company_id : localStorage.company_id ,
      })
      .then((response) => {
        console.log(response);
        this.rowdata = response.data.userlist;

        console.log(this.rowdata);
      });
  },
  methods: {
     async reload() {
      this.$forceUpdate();
      this.render = false;
      await this.$nextTick();
      this.render = true;
    },
    formnew () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // this.$vs.loading();

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
              if (response.status == 200) {
                this.nuser = "";
                this.Cost = "";
                this.selectedRole = "";
                this.chatbotname = "";
                this.reload()
                  this.$vs.notify({
                    color: "success",
                    title: "User Record",
                    text: "The User  was successfully Added",
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