 <!-- jsdelivr cdn -->
  <script src="https://cdn.jsdelivr.net/npm/vee-validate@<3.0.0/dist/vee-validate.js"></script>

  <!-- unpkg -->
  <script src="https://unpkg.com/vee-validate@<3.0.0"></script>
import Vue from "vue";
import vSelect from "vue-select";
import VeeValidate from 'vee-validate';
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
                                    <!-- <span  style="color:blue">{{msg}}</span> -->
                                </div>
                                <!-- <form v-on:submit.prevent="register" v-on:keydown.enter.prevent="register" novalidate="true">   -->
                            <form @submit.prevent="handleSubmit">
                                 <h6>Name*</h6> 
                                 
                                                             
                                 <vs-input icon-no-border icon="icon icon-user" icon-pack="feather" placeholder="Name" name="name" id="name" v-model="user.name" :class="{ 'is-invalid': submitted && $v.user.firstName.$error }" class="w-full mb-6"/>
                                <div v-if="submitted && !$v.user.name.required" class="invalid-feedback"> Name is required</div>
                                  <h6>Email*</h6>
                                 <vs-input icon-no-border icon="icon icon-mail" icon-pack="feather" placeholder="Email" name="email" id="email" v-model="user.email" :class="{ 'is-invalid': submitted && $v.user.email.$error }" class="w-full mb-6" />
                                  <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.email.required">Email is required</span>
                                    <span v-if="!$v.user.email.email">Email is invalid</span>
                                </div>
                                 <!-- <small style="color:red">Please Enter number*</small> -->
                                  <h6>Phone*</h6>
                                 <vs-input icon-no-border icon="icon icon-phone" icon-pack="feather"  placeholder="Phone"  name="phone" v-model="user.phone" :class="{ 'is-invalid': submitted && $v.user.phone.$error }" class="w-full mb-6"/> 
                                <div v-if="submitted && $v.user.phone.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.phone.required">Phone Number is required</span>
                                    <span v-if="!$v.user.phone.minLength">Phone Number be at least 10 characters</span>
                                </div>
                                <h6>Company Name*</h6>
                                 <vs-input  icon-no-border icon="icon icon-heart" icon-pack="feather"  placeholder="Company Name" v-model="user.companyname" :class="{ 'is-invalid': submitted && $v.user.companyname.$error }"  class="w-full mb-6"/>
                                 <div v-if="submitted && $v.user.companyname.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.companyname.required">Company Name is required</span>
                                   
                                </div>
                                <!-- <h6>Country*</h6>
                                <v-select   icon-no-border icon="icon icon-flag" icon-pack="feather"    class="w-full mb-6" label="name" :options="country"  label-placeholder="Select Country" v-model="selectedCountry" :dir="$vs.rtl ? 'rtl' : 'ltr'" /> -->
                                <h6>Password*</h6>
                                <vs-input icon-no-border icon="icon icon-lock" icon-pack="feather" type="password" placeholder="Password" v-model="user.password" name="password" id="password" :class="{ 'is-invalid': submitted && $v.user.password.$error }" class="w-full mb-6"/>
                                <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.password.required">Password is required</span>
                                    <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                                </div>
                                <h6>Confirm Password*</h6>
                                <vs-input icon-no-border icon="icon icon-lock" icon-pack="feather" type="password" placeholder="Confirm Password" v-model="user.cpassword" class="w-full mb-6" :class="{ 'is-invalid': submitted && $v.user.cpassword.$error }" />
                                <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.cpassword.required">Confirm Password is required</span>
                                    <span v-else-if="!$v.user.cpassword.sameAsPassword">Passwords must match</span>
                                </div>
                                
                                   <!-- <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox> -->
                                    <vs-button  type="border" to="/login" class="mt-6">Login</vs-button>
                                    <vs-button  class="float-right mt-6"  >Register</vs-button>
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
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, email, minLength,maxLength, sameAs } from "vuelidate/lib/validators";

    export default {
        name: "app",
        data() {
            return {
                user: {
                    name: "",
                    
                    email: "",
                    password: "",
                    cpassword: "",
                    phone:"",
                    companyname:"",

                },
                submitted: false
            };
        },
        validations: {
            user: {
                name: { required },
                // country: { required },
                email: { required, email },
                companyname:{required},
                password: { required, minLength: minLength(6) },
                cpassword: { required, sameAsPassword: sameAs('password') },
                phone:{required,minLength:minLength(10),maxLength:maxLength(10) }
            }
        },
        methods: {
            handleSubmit(e) {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
            }
        }
    };
</script>