

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Button ">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Response Name</h6>
            <v-select
              class="w-full"
              label="responsename"
              :options="responsedata"
              v-model="rowdata[0].responsename"
               name="response_name"
              v-validate="'required'"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
             >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("response_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Intent</h6>
            <v-select
              class="w-full"
              label="intent"
              :options="rowdatanew"
              v-model="rowdata[0].intent"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
               v-validate="'required'"
              name="intent"
            >
            </v-select>
            <span class="text-danger text-sm">
              {{ errors.first("intent") }}</span
            >
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Entity Key</h6>
            <v-select
              class="w-full"
              label="Entitykey"
              :options="newsentence"
              v-model="rowdata[0].entitykey"
              @input="button"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
                name="entity_key"
              v-validate="{ required: rowdata[0].entityvalue !== '' }"

            />
            <span class="text-danger text-sm">
              {{ errors.first("entity_key") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Entity Value</h6>
            <v-select
            
              class="w-full"
              label="Entityvalue"
              :options="entitycard"
              v-model="rowdata[0].entityvalue"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
               name="entity_value"
              v-validate="{ required:rowdata[0].entitykey !== ''}"
            />
            <span class="text-danger text-sm">{{
              errors.first("entity_value")
            }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <h6>Title</h6>
            <vs-input
              class="w-full"
              v-validate="'required|max:350'"
              name="title"
              v-model="rowdata[0].title"
            />
            <span class="text-danger text-sm">{{ errors.first("title") }}</span>
          </div>
          <div class="vx-col w-full">
            <vs-button
              v-on:keyup.enter="Update"
              @click="Update"
              class="mr-3 mb-2"
              >Update</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";
import { Validator } from "vee-validate";
import { EventBus } from '../../event-bus';

const dict = {
  custom: {
    entity_value: {
      required: "Please select entity value",
    },
    entity_key: {
      required: "Please select entity key",
    },
    intent: {
      required: "Please select intent",
    },
    response_name: {
      required: "Please select response name",
    },
    title: {
      required: "Please enter title",
    },
  },
};
Validator.localize("en", dict);
var responsedata;
var newsentence
export default {
  data() {
    return {
      rowdata: {
        intent: "",
        entitykey: "",
        entityvalue: "",
        responsename: "",
        title: "",
        rowdatanew: [],
       
        buttonnew: [],
        
      },
      entitycard: [],
       responsedata:[],
        newsentence: [],
    };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.rowdata[0].title.length > 0 &&
        this.rowdata[0].intent.length > 0 &&
        this.rowdata[0].entitykey.length > 0 &&
        this.rowdata[0].entityvalue.length > 0 &&
        this.rowdata[0].responsename.length > 0
      );
    },
  },
  mounted() {
    this.rowdatanew = []
    this.responsedata = []
    this.newsentence =[]
    var newemail = localStorage.getItem("email");
    axios
      .post(Base_URL.Actual_URL + "entityintentnew", {
        company_id: localStorage.company_id,
        chatbot_id: localStorage.chatbot_id,
      })
      .then((response) => {
        console.log()
        this.rowdatanew = response.data.userlist;
        this.newsentence = response.data.sentence;
        console.log(this.responsedata,'responsedata')
        this.responsedata = response.data.response1;
        this.buttonnew = response.data.button;
        console.log(this.newsentence,'newsentence data')
        console.log(this.responsedata ,'responsedata')
      });
    const url = Base_URL.Actual_URL + "editbuttonname/";
    const id = this.$route.params.id;
    console.log(url + id);
    const url1 = url + id;
    axios.get(url1).then((response) => {
      this.rowdata = response.data.userlist;
    });
  },
  methods: {
    button: function (e) {
       if(e !== null) {
      var newemail = localStorage.getItem("email");
      console.log(e);
      console.log(this.rowdata[0].entitykey);
      axios
        .post(Base_URL.Actual_URL + "entityvalue", {
          company_id: localStorage.company_id,
          entity_key: e.Entitykey,
          chatbot_id: localStorage.chatbot_id,
        })
        .then((response) => {
          console.log(response);
          this.entitycard = response.data.entity;
        });
       } else {
           this.entitycard = []
           this.rowdata[0].entityvalue =''
           this.rowdata[0].entitykey =''
       }
    },
    Update() {
      console.log("in update");
    
    this.$validator.validateAll().then((result) => {
        if (result) {
      const url = Base_URL.Actual_URL + "editbuttonname/";
      const id = this.$route.params.id;
      const url1 = url + id;
      axios
        .post(url1, {
          intent: this.rowdata[0].intent.intent || this.rowdata[0].intent,
          title: this.rowdata[0].title,
          responsename:  this.rowdata[0].responsename.responsename || this.rowdata[0].responsename,
          entityvalue: this.rowdata[0].entityvalue.Entityvalue || this.rowdata[0].entityvalue,
          entitykey: this.rowdata[0].entitykey.Entitykey || this.rowdata[0].entitykey,
        })
        .then((response) => {
          if (response.data.code == 200) {
            EventBus.$emit('selectedComponent','buttonEvent')
            this.msg = response.data.msg;
              this.$vs.notify({
                title: "Edit button ",
                text: "Your button data is updated",
                color:"success",
                position: "top-center",
             });
              this.$router.push({
              name:'botTemplate',
                  params:{ name:'button'}
            })
          }
        });
        }
      })
    },
  },
};
</script>

