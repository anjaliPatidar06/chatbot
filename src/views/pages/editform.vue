

<template>
  <div class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Add Account">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2" :data="rowdata">
            <vs-input
              class="w-full"
              label="Name"
              v-validate="'required|max:15'"
              name="lastname"
              v-model="rowdata[0].name"
            />
            <span class="text-danger text-sm">{{ errors.first("name") }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input
              v-validate="'required|email'"
              data-vv-validate-on="blur"
              type="email"
              class="w-full"
              label="Email"
              name="email"
              v-model="rowdata[0].email"
            />
            <span class="text-danger text-sm">{{ errors.first("email") }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              v-validate="'required|max:15'"
              data-vv-validate-on="blur"
              label="Company"
              name="company"
              v-model="rowdata[0].companyname"
            />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              v-validate="'required|digits:10'"
              data-vv-validate-on="blur"
              name="phone"
              type="digit"
              label="Phone Number"
              v-model="rowdata[0].phone"
            />
            <span class="text-danger text-sm">{{ errors.first("phone") }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              ref="password"
              type="password"
              data-vv-validate-on="blur"
              v-validate="'required|min:6|max:10'"
              label="Password"
              name="password"
              v-model="rowdata[0].password"
            />
            <span class="text-danger text-sm">{{
              errors.first("password")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input
              class="w-full"
              type="password"
              v-validate="'min:6|max:10|confirmed:password'"
              data-vv-validate-on="blur"
              data-vv-as="password"
              label="Confirm Password"
              name="confirmpassword"
              v-model="rowdata[0].password"
            />
            <span class="text-danger text-sm">{{
              errors.first("confirm_password")
            }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <p style="fontsize: 12px">Category Name</p>
            <v-select
              class="w-full"
              label="categoryname"
              :options="category"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="rowdata[0].categorynew"
            />
            <!-- <vs-input class="w-full" label="Category" name="category" v-model="category" /> -->
            <span class="text-danger text-sm">{{
              errors.first("selectcategory")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <p style="size: 12px">Subscription Duration</p>
            <v-select
              class="w-full"
              label="durationName"
              :options="duration"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="selectedCountry"
            />
          </div>
          <span class="text-danger text-sm">{{
            errors.first("selectedCountry")
          }}</span>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <p style="fontsize: 12px">Select Country</p>
            <v-select
              class="w-full"
              label="name"
              :options="country"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="rowdata[0].country"
            />

            <span class="text-danger text-sm">{{
              errors.first("selectedCountry1")
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
            <vs-button
              v-on:click="resetForm"
              color="warning"
              type="border"
              class="mb-2"
              >Reset</vs-button
            >
            <!-- v-on:click="resetForm" -->
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
import {Base_URL, API_List} from '../../../api.config'

export default {
  data() {
    return {
      rowdata: {
        name: "",
        email: "",
        phone: "",
        password: "",
        id: "",
        country: "",
        companyname: "",
        categorynew: "",
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
        this.name !== "" &&
        this.email !== "" &&
        this.password !== "" &&
        this.confirm_password !== "" &&
        this.companyname !== "" &&
        this.selectedCountry !== "" &&
        this.phone !== ""
      );
    },
  },
  mounted() {
    const url = Base_URL.Actual_URL + "editallaccountname/";
    // const url='http://127.0.0.1:5000/editallaccountname/'

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
      console.log("in update");
      console.log(this.rowdata[0].name);
      console.log(this.rowdata[0].email);
      console.log(this.rowdata[0].phone);
      console.log(this.rowdata[0].password);
      console.log(this.rowdata[0].categorynew.categoryname);

      console.log(this.rowdata[0].companyname);
      console.log(this.rowdata[0].country);

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      const color = `rgb(${getRandomInt(0, 255)},${getRandomInt(
        0,
        255
      )},${getRandomInt(0, 255)})`;
      this.$vs.notify({
        title: "Edit Allaccount ",
        text: "Your Allaccount data is updated",
        color,
        position: "top-center",
      });

      // const url='http://127.0.0.1:5000/editallaccountname/'

      const url = Base_URL.Actual_URL + "editallaccountname/";
      const id = this.$route.params.id;
      console.log(url + id);
      const url1 = url + id;
      axios
        .post(url1, {
          name: this.rowdata[0].name,
          email: this.rowdata[0].email,
          phone: this.rowdata[0].phone,
          password: this.rowdata[0].password,
          companyname: this.rowdata[0].companyname,
          categorynew: this.rowdata[0].categorynew.categoryname,
          country: this.rowdata[0].country,
        })
        .then((response) => {
          this.msg = response.data.msg;

          if (response.data.code == 200) {
            this.msg = response.data.msg;
            this.$router.push({
              name:"allaccount"
            })
        
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

