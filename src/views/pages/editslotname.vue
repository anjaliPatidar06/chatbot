

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Slot">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Slot Name"
              v-model="rowdata[0].slotname"
              v-validate="'required'"
              name="slot_name"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_name") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <small class="date-label">Slot Type</small>
            <v-select
              class="w-full"
              v-model="rowdata[0].slottype"
              label="durationName"
              :options="duration"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-validate="'required'"
              name="slot_type"
            />
            <span class="text-danger text-sm">
              {{ errors.first("slot_type") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
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
/* eslint-disable */
import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect,
  },
};
</script>

<script>
/* eslint-disable */
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    slot_type: {
      required: "Please select slot type",
    },
    slot_name: {
      required: "Please enter slot name",
    },
  },
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      rowdata: {
        slotname: "",
        slottype: "",
      },
      name: "",
      company: "",
      selectcategory: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      selectedCountry: "",
      selectedCountry1: "",
      duration: [
        {
          durationCode: "text",
          durationName: "text",
        },
        {
          durationCode: "bool",
          durationName: "bool",
        },

        {
          durationCode: "list",
          durationName: "list",
        },
        {
          durationCode: "unfeaturized",
          durationName: "unfeaturized",
        },
      ],
      category: [
        {
          categoryname: "Retail",
          categorycode: "1",
        },
        {
          categoryname: "Ecommerce",
          categorycode: "2",
        },
        {
          categoryname: "Healthcare",
          categorycode: "3",
        },
      ],
    };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.rowdata[0].slotname.length > 0 &&
        this.rowdata[0].slottype.length > 0
      );
    },
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editslotname/";

    const id = this.$route.params.id;
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      this.rowdata = response.data.userlist;
    });
  },
  methods: {
    Update() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const url = Base_URL.Actual_URL + "editslotname/";
          const id = this.$route.params.id;
          const url1 = url + id;
          axios
            .post(url1, {
              slotname: this.rowdata[0].slotname,
              slottype:
                this.rowdata[0].slottype.durationName ||
                this.rowdata[0].slottype,
            })
            .then((response) => {
              this.msg = response.data.msg;

              if (response.data.code == 100) {
                this.msg = response.data.msg;
                this.$emit("updateSlotComponent");

                this.$vs.notify({
                  title: "Edit Slot Data.",
                  text: "Your Slot data is updated",
                  color: "success",
                  position: "top-center",
                });
                this.$router.go(-1);
              }
            });
        }
      });
    },
    resetForm() {
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.data.form).forEach(function (key, index) {
        self.data.form[key] = "";
      });
    },
  },
};
</script>

