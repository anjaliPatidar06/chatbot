

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Entity">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Entity key"
              v-validate="'required|max:150'"
              name="Intent Name"
              v-model="rowdata[0].entitykey"
            />
            <span class="text-danger text-sm">{{
              errors.first("intent")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Entity value"
              v-validate="'required|max:150'"
              name="Intent Name"
              v-model="rowdata[0].entityvalue"
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
        intent: "",
      },
      name: "",
      company: "",
      selectcategory: "",
     };
  },

  components: {
    "v-select": vSelect,
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.rowdata[0].entitykey.length > 0 &&
        this.rowdata[0].entityvalue.length > 0
      );
    },
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editentityname/";

    const id = this.$route.params.id;
    const url1 = url + id;
    axios.get(url1, {}).then((response) => {
      this.rowdata = response.data.userlist;
    });
  },
  methods: {
    Update() {
      const url = Base_URL.Actual_URL + "editentityname/";
      const id = this.$route.params.id;
      const url1 = url + id;
      axios
        .post(url1, {
          entitykey: this.rowdata[0].entitykey,
          entityvalue: this.rowdata[0].entityvalue,
        })
        .then((response) => {
          this.msg = response.data.msg;

          if (response.data.code == 200) {
            this.msg = response.data.msg;
            this.$vs.notify({
              title: "Edit Entity",
              text: "Your Entity data is updated",
              color:"success",
              position: "top-center",
            });
            this.$router.push({
              name: "entity",
            });
          }
          if (response.data.code == 100) {
            this.msg = response.data.result;
            this.$vs.notify({
              title: this.msg,
              color: "danger",
              position: "top-center",
            });
          }
        });
    },
  },
};
</script>

