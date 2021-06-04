

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Story Name">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Story Name"
              v-validate="'required|max:150'"
              name="Story Name"
              v-model="rowdata[0].name"
            />
            <span class="text-danger text-sm">{{
              errors.first("intent")
            }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button
              v-on:keyup.enter="Update"
              :disabled="!validateForm"
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
import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect,
  },
};
</script>

<script>
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL, API_List } from "../../../api.config";

export default {
  data() {
    return {
      rowdata: {
        name: "",
      },
    };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.rowdata[0].name.length > 0;
    },
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editstoryname/";
    const id = this.$route.params.id;
    console.log(url + id);
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      console.log(response);
      this.rowdata = response.data.userlist;
      console.log(this.rowdata);

      //   console.log(this.rowdata[0].Email,this.rowdata[0].Password,this.rowdata[0].Firstname,this.rowdata[0].Lastname,this.rowdata[0].PhoneNumber)
      // console.log(localStorage.getItem('email'))

      // console.log(response)
    });
  },
  methods: {
    Update() {
      const url = Base_URL.Actual_URL + "editstoryname/";
      const id = this.$route.params.id;
      console.log(url + id);
      const url1 = url + id;
      axios
        .post(url1, {
          name: this.rowdata[0].name,
        })
        .then((response) => {
          this.msg = response.data.msg;

          if (response.data.code == 100) {
            this.msg = response.data.msg;
            this.$vs.notify({
              title: "Edit Story Name ",
              text: "Your story Name  is updated",
              color: "success",
              position: "top-center",
            });
            this.$router.push({
              name: "stories",
            });
          }
        });
    },
    resetForm() {
      console.log("Reseting the form");
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.data.form).forEach(function (key, index) {
        self.data.form[key] = "";
      });
    },
  },
};
</script>

