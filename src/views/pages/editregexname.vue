

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Update Regex">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Regex Name"
              v-validate="'required|max:150'"
              name="regex_name"
              v-model="rowdata[0].addregex"
            />
            <span class="text-danger text-sm">{{
              errors.first("regex_name")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Regex Pattern"
              v-validate="'required|max:150'"
              name="regex_pattern"
              v-model="rowdata[0].addregexpattern"
            />
            <span class="text-danger text-sm">{{
              errors.first("regex_pattern")
            }}</span>
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
import axios from "axios";
import vSelect from "vue-select";
import { Base_URL } from "../../../api.config";
import { EventBus } from "../../event-bus";
import { Validator } from "vee-validate";

const dict = {
  custom: {
    regex_name: {
      required: "Please enter regex name",
    },
    regex_pattern: {
      required: "Please enter regex pattern",
    },
  },
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      rowdata: {
        addregex: "",
        addregexpattern: "",
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
      country: [
        {
          name: "Afghanistan",
          code: "AF",
        },
        {
          name: "Åland Islands",
          code: "AX",
        },
        {
          name: "Albania",
          code: "AL",
        },
        {
          name: "Algeria",
          code: "DZ",
        },
        {
          name: "American Samoa",
          code: "AS",
        },
        {
          name: "Andorra",
          code: "AD",
        },
        {
          name: "Angola",
          code: "AO",
        },
        {
          name: "Anguilla",
          code: "AI",
        },
        {
          name: "Antarctica",
          code: "AQ",
        },
        {
          name: "Antigua and Barbuda",
          code: "AG",
        },
        {
          name: "Argentina",
          code: "AR",
        },
        {
          name: "Armenia",
          code: "AM",
        },
        {
          name: "Aruba",
          code: "AW",
        },
        {
          name: "Australia",
          code: "AU",
        },
        {
          name: "Austria",
          code: "AT",
        },
        {
          name: "Azerbaijan",
          code: "AZ",
        },
        {
          name: "Bahamas",
          code: "BS",
        },
        {
          name: "Bahrain",
          code: "BH",
        },
        {
          name: "Bangladesh",
          code: "BD",
        },
        {
          name: "Barbados",
          code: "BB",
        },
        {
          name: "Belarus",
          code: "BY",
        },
        {
          name: "Belgium",
          code: "BE",
        },
        {
          name: "Belize",
          code: "BZ",
        },
        {
          name: "Benin",
          code: "BJ",
        },
        {
          name: "Bermuda",
          code: "BM",
        },
        {
          name: "Bhutan",
          code: "BT",
        },
        {
          name: "Bolivia, Plurinational State of",
          code: "BO",
        },
        {
          name: "Bonaire, Sint Eustatius and Saba",
          code: "BQ",
        },
        {
          name: "Bosnia and Herzegovina",
          code: "BA",
        },
        {
          name: "Botswana",
          code: "BW",
        },
        {
          name: "Bouvet Island",
          code: "BV",
        },
        {
          name: "Brazil",
          code: "BR",
        },
        {
          name: "British Indian Ocean Territory",
          code: "IO",
        },
        {
          name: "Brunei Darussalam",
          code: "BN",
        },
        {
          name: "Bulgaria",
          code: "BG",
        },
        {
          name: "Burkina Faso",
          code: "BF",
        },
        {
          name: "Burundi",
          code: "BI",
        },
        {
          name: "Cambodia",
          code: "KH",
        },
        {
          name: "Cameroon",
          code: "CM",
        },
        {
          name: "Canada",
          code: "CA",
        },
        {
          name: "Cape Verde",
          code: "CV",
        },
        {
          name: "Cayman Islands",
          code: "KY",
        },
        {
          name: "Central African Republic",
          code: "CF",
        },
        {
          name: "Chad",
          code: "TD",
        },
        {
          name: "Chile",
          code: "CL",
        },
        {
          name: "China",
          code: "CN",
        },
        {
          name: "Christmas Island",
          code: "CX",
        },
        {
          name: "Cocos (Keeling) Islands",
          code: "CC",
        },
        {
          name: "Colombia",
          code: "CO",
        },
        {
          name: "Comoros",
          code: "KM",
        },
        {
          name: "Congo",
          code: "CG",
        },
        {
          name: "Congo, the Democratic Republic of the",
          code: "CD",
        },
        {
          name: "Cook Islands",
          code: "CK",
        },
        {
          name: "Costa Rica",
          code: "CR",
        },
        {
          name: "India",
          code: "IN",
        },
        {
          name: "Dubai",
          code: "Du",
        },
        {
          name: "Côte d'Ivoire",
          code: "CI",
        },
        {
          name: "Croatia",
          code: "HR",
        },
        {
          name: "Cuba",
          code: "CU",
        },
        {
          name: "Curaçao",
          code: "CW",
        },
        {
          name: "Cyprus",
          code: "CY",
        },
        {
          name: "Czech Republic",
          code: "CZ",
        },
        {
          name: "Denmark",
          code: "DK",
        },
        {
          name: "Djibouti",
          code: "DJ",
        },
        {
          name: "Dominica",
          code: "DM",
        },
        {
          name: "Dominican Republic",
          code: "DO",
        },
        {
          name: "Ecuador",
          code: "EC",
        },
        {
          name: "Egypt",
          code: "EG",
        },
        {
          name: "El Salvador",
          code: "SV",
        },
        {
          name: "Equatorial Guinea",
          code: "GQ",
        },
        {
          name: "Eritrea",
          code: "ER",
        },
        {
          name: "Estonia",
          code: "EE",
        },
        {
          name: "Ethiopia",
          code: "ET",
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

      duration: [
        {
          durationCode: "monthly",
          durationName: "1 Month",
        },
        {
          durationCode: "quaterly",
          durationName: "3 Months",
        },
        {
          durationCode: "halfyearly",
          durationName: "6 Months",
        },
        {
          durationCode: "yearly",
          durationName: "1 Year",
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
        this.rowdata[0].addregexpattern.length > 0 &&
        this.rowdata[0].addregex.length > 0
      );
    },
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editregexname/";
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
      const url = Base_URL.Actual_URL + "editregexname/";
      const id = this.$route.params.id;
      const url1 = url + id;
      axios
        .post(url1, {
          addregex: this.rowdata[0].addregex,
          addregexpattern: this.rowdata[0].addregexpattern,
        })
        .then((response) => {
          this.msg = response.data.msg;

          if (response.data.code == 200) {
            this.msg = response.data.msg;
            this.$vs.notify({
              title: "Edit Regex ",
              text: "The Regex data is updated",
              color: "success",
              position: "top-center",
            });
            EventBus.$emit("updateRegexComponent");

            this.$router.push({
              name: "userTraining",
              params:{name:'regex'}
            });
          }
        });
        }
       })
    },
  },
};
</script>

