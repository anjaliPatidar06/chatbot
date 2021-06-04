
import Vue from "vue";
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter justify-center items-center">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                      <h4 class="mb-4">Create Account</h4>
                                    <p>Fill the below form to create a new account.</p>
                                    <span  style="color:blue">{{msg}}</span>
                                </div>
                                <form v-on:submit.prevent="register" v-on:keydown.enter.prevent="register" novalidate="true">  
                                 <h6>Name*</h6>                               
                                 <vs-input icon-no-border icon="icon icon-user" icon-pack="feather" placeholder="Name"   v-model="name" class="w-full mb-6"  required/>
                               
                                  <h6>Email*</h6>
                                 <vs-input icon-no-border icon="icon icon-mail" icon-pack="feather" placeholder="Email" v-model="email" class="w-full mb-6"/>
                                 
                                 <!-- <small style="color:red">Please Enter number*</small> -->
                                  <h6>Phone*</h6>
                                 <vs-input icon-no-border icon="icon icon-phone" icon-pack="feather"  placeholder="Phone" v-model="phone" class="w-full mb-6"/> 
                                 <div class="vx-row">
     
                                  <div class="vx-col sm:w-1/2 w-full mb-2">
                                <h6>Company Name*</h6>
                                 <vs-input  icon-no-border icon="icon icon-heart" icon-pack="feather"  placeholder="Company Name" v-model="companyname" class="w-full mb-6"/>
                                  </div>
                                   
     
                                 <div class="vx-col sm:w-1/2 w-full mb-2">
                                <h6>Country*</h6>
                                <v-select   icon-no-border icon="icon icon-flag" icon-pack="feather"    class="w-full mb-6" label="name" :options="country"  label-placeholder="Select Country" v-model="selectedCountry" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                                </div>
                                </div>
                                <div class="vx-row">
     
                                <div class="vx-col sm:w-1/2 w-full mb-2">
                                <h6>Password*</h6>
                                <vs-input icon-no-border icon="icon icon-lock" icon-pack="feather" type="password" placeholder="Password" v-model="password" class="w-full mb-6"/>
                                  </div>
                                    <div class="vx-col sm:w-1/2 w-full mb-2">
                                <h6>Confirm Password*</h6>
                                <vs-input icon-no-border icon="icon icon-lock" icon-pack="feather" type="password" placeholder="Confirm Password" v-model="cpassword" class="w-full mb-6" />
                                </div>
                                </div>
                                <li v-if="errors.length" style="color:red">{{errors[0]}}</li>
                                
                                   <!-- <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox> -->
                                    <vs-button  type="border" to="/login" class="mt-6">Login</vs-button>
                                    <vs-button v-on:click="register" v-on:keyup.enter="register" class="float-right mt-6" >Register</vs-button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>



<script>

import axios from 'axios'
import vSelect from 'vue-select'
import {Base_URL, API_List} from '../../../api.config';



export default {
    data () {
        return {
            errors:[],
            name:'',
            email: '',
            password:'',
            cpassword:'',
            phone:'',
            companyname:'',
            msg:'', 
            selectedCountry:'',
            country: [
            {
                "name": "Afghanistan",
                "code": "AF"
            }, {
                "name": "Åland Islands",
                "code": "AX"
            }, {
                "name": "Albania",
                "code": "AL"
            }, {
                "name": "Algeria",
                "code": "DZ"
            }, {
                "name": "American Samoa",
                "code": "AS"
            }, {
                "name": "Andorra",
                "code": "AD"
            }, {
                "name": "Angola",
                "code": "AO"
            }, {
                "name": "Anguilla",
                "code": "AI"
            }, {
                "name": "Antarctica",
                "code": "AQ"
            }, {
                "name": "Antigua and Barbuda",
                "code": "AG"
            }, {
                "name": "Argentina",
                "code": "AR"
            }, {
                "name": "Armenia",
                "code": "AM"
            }, {
                "name": "Aruba",
                "code": "AW"
            }, {
                "name": "Australia",
                "code": "AU"
            }, {
                "name": "Austria",
                "code": "AT"
            }, {
                "name": "Azerbaijan",
                "code": "AZ"
            }, {
                "name": "Bahamas",
                "code": "BS"
            }, {
                "name": "Bahrain",
                "code": "BH"
            }, {
                "name": "Bangladesh",
                "code": "BD"
            }, {
                "name": "Barbados",
                "code": "BB"
            }, {
                "name": "Belarus",
                "code": "BY"
            }, {
                "name": "Belgium",
                "code": "BE"
            }, {
                "name": "Belize",
                "code": "BZ"
            }, {
                "name": "Benin",
                "code": "BJ"
            }, {
                "name": "Bermuda",
                "code": "BM"
            }, {
                "name": "Bhutan",
                "code": "BT"
            }, {
                "name": "Bolivia, Plurinational State of",
                "code": "BO"
            }, {
                "name": "Bonaire, Sint Eustatius and Saba",
                "code": "BQ"
            }, {
                "name": "Bosnia and Herzegovina",
                "code": "BA"
            }, {
                "name": "Botswana",
                "code": "BW"
            }, {
                "name": "Bouvet Island",
                "code": "BV"
            }, {
                "name": "Brazil",
                "code": "BR"
            }, {
                "name": "British Indian Ocean Territory",
                "code": "IO"
            }, {
                "name": "Brunei Darussalam",
                "code": "BN"
            }, {
                "name": "Bulgaria",
                "code": "BG"
            }, {
                "name": "Burkina Faso",
                "code": "BF"
            }, {
                "name": "Burundi",
                "code": "BI"
            }, {
                "name": "Cambodia",
                "code": "KH"
            }, {
                "name": "Cameroon",
                "code": "CM"
            }, {
                "name": "Canada",
                "code": "CA"
            }, {
                "name": "Cape Verde",
                "code": "CV"
            }, {
                "name": "Cayman Islands",
                "code": "KY"
            }, {
                "name": "Central African Republic",
                "code": "CF"
            }, {
                "name": "Chad",
                "code": "TD"
            }, {
                "name": "Chile",
                "code": "CL"
            }, {
                "name": "China",
                "code": "CN"
            }, {
                "name": "Christmas Island",
                "code": "CX"
            }, {
                "name": "Cocos (Keeling) Islands",
                "code": "CC"
            }, {
                "name": "Colombia",
                "code": "CO"
            }, {
                "name": "Comoros",
                "code": "KM"
            }, {
                "name": "Congo",
                "code": "CG"
            }, {
                "name": "Congo, the Democratic Republic of the",
                "code": "CD"
            }, {
                "name": "Cook Islands",
                "code": "CK"
            }, {
                "name": "Costa Rica",
                "code": "CR"
            },
            {
                "name": "India",
                "code": "IN"
            },
            {
                "name": "Dubai",
                "code": "Du"
            },  
            {
                "name": "Côte d'Ivoire",
                "code": "CI"
            }, {
                "name": "Croatia",
                "code": "HR"
            }, {
                "name": "Cuba",
                "code": "CU"
            }, {
                "name": "Curaçao",
                "code": "CW"
            }, {
                "name": "Cyprus",
                "code": "CY"
            }, {
                "name": "Czech Republic",
                "code": "CZ"
            }, {
                "name": "Denmark",
                "code": "DK"
            }, {
                "name": "Djibouti",
                "code": "DJ"
            }, {
                "name": "Dominica",
                "code": "DM"
            }, {
                "name": "Dominican Republic",
                "code": "DO"
            }, {
                "name": "Ecuador",
                "code": "EC"
            }, {
                "name": "Egypt",
                "code": "EG"
            }, {
                "name": "El Salvador",
                "code": "SV"
            }, {
                "name": "Equatorial Guinea",
                "code": "GQ"
            }, {
                "name": "Eritrea",
                "code": "ER"
            }, {
                "name": "Estonia",
                "code": "EE"
            }, {
                "name": "Ethiopia",
                "code": "ET"
            },
            ]
        }

    },
    

    components: {
        'v-select': vSelect,
    },
 
    methods: {
      
        register () {
        console.log(this.email)
        this.errors = [];
            if(!this.name){
            this.errors.push('Name Required')
            return;
            }
            if (this.email == '') {
            this.errors.push('Email Required.');
            return;
            }else if(!this.validEmail(this.email)) {
            this.errors.push("Valid email required.");        
            }
            
            if(!this.phone){
            this.errors.push('Phone Required.');
            return;

            }else if(!this.acceptNumber(this.phone)){
                this.errors.push("valid Phone Number Required")
            }

            if(!this.selectedCountry){
            this.errors.push('Country Required.')
            return;

            }
                
            if(!this.companyname){
            this.errors.push('Company Name Required.')
            return;

            }
        
            if (!this.password) {
            this.errors.push('Password Required.');
            return;

            }
    
            if(!this.cpassword){
            this.errors.push('Confirm Password Required')
            return;
            }

            if(this.password != this.cpassword){
            this.errors.push('Password Mismatch')
            return;
            }
            
        console.log(this.password)
        console.log(this.name)
        console.log(this.cpassword)
        console.log(this.phone)
        console.log(this.selectedCountry.name)
        console.log(this.companyname)
            
        // axios.post('http://127.0.0.1:5000/register', {
        axios.post(Base_URL.Actual_URL+'register', {
            email: this.email,
            password: this.password,
            name:this.name,
            cpassword:this.cpassword,
            phone:this.phone,
            selectedCountry:this.selectedCountry.name,
            companyname:this.companyname
            
        })
        .then((response) => {
            // console.log(response)
            this.msg = response.data.msg;
        
            if (response.data.code==200) {
                // window.location.href = 'http://188.227.58.42:83/login'
 this.$router.push({
              name: "page-login",
            });

            } else {
                 this.$router.push({
              name: "page-register",
            });
            // window.location.href = 'http://188.227.58.42:83/register'
            }    
            // window.location.href = 'http://188.227.58.42:83/login'
             this.$router.push({
              name: "page-login",
            });
            })
            
        },
    acceptNumber:function(phone) {
        var x = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
        return x.test(phone);
    },
        

    validEmail: function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }
    
 
  }
  
}
</script>

