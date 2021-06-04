

<template>
 <!-- <form v-on:submit.prevent="addsubscription" v-on:keydown.enter.prevent="addsubscription" >   -->
  <div class="vx-row">
   <span  style="color :red">{{me}}</span>
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Add Subscription">
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
         
            <h6>Subscription Name</h6>
            <vs-input 
             v-validate="'required|min:3|max:25'"
             data-vv-validate-on="blur"
             name="subname"
             class="w-full" 
             v-model="subname" />
            <span class="text-danger text-sm">{{ errors.first('subname') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Subscription Duration</h6>
            
           
            
            <v-select class="w-full"  label="durationName" :options="durations" 
            v-model="selectedDuration" :dir="$vs.rtl ? 'rtl' : 'ltr'"
             @input="promptAddNewEvent(selectedDuration, new Date())"> </v-select>
           
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Number of Messages</h6>
            <vs-input
            v-validate="'required|min:1|max:8|between:1,5000'"
            data-vv-validate-on="blur" 
            class="w-full"
            name="message"
            v-model="message" />
            <span class="text-danger text-sm">{{ errors.first('message') }}</span>
          </div>

        </div>
        <vs-prompt
       
        title="Custom Duration"
        @accept="myFunctionAccept"
        :is-valid="validForm"
        :active.sync="activePromptAddEvent">

        

        <!-- <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="Event Title" v-model="title"></vs-input> -->
        <div class="my-4">
            <small class="date-label">Start Date</small>
            <datepicker :language="$vs.rtl ? langHe : langEn" name="start-date" v-model="startDate" :disabled="disabledFrom"></datepicker>
        </div>
        <div class="my-4">
            <small class="date-label">End Date</small>
            <datepicker :language="$vs.rtl ? langHe : langEn" :disabledDates="disabledDatesTo" name="end-date" v-model="endDate"></datepicker>
        </div>
        <!-- <vs-input name="event-url" v-validate="'url'" class="w-full mt-6" label-placeholder="Event URL" v-model="url" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input> -->

    </vs-prompt>
		    <div class="vx-row">
          
          
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Currency</h6>
			      <v-select class="w-full" label="currency" :options="Currency"  v-model="selectedCurrency"  :dir="$vs.rtl ? 'rtl' : 'ltr'" 
             />
           
          </div>
          
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Subscription Cost</h6>
            <vs-input
            v-validate="'required|max:10|between:1,5000'"
            data-vv-validate-on="blur" 
            type="digit"
            class="w-full" 
            name="subcost"
            v-model="subcost" />
            <span class="text-danger text-sm">{{ errors.first('subcost') }}</span>
          </div>
           <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>Number Of User</h6>
            <vs-input-number min="1" v-model="number1" class="mr-0 ml-0"/>
            <span class="text-danger text-sm">{{ errors.first('number1') }}</span>
          </div>
         
        </div>
      </vx-card>
	  <br>
	  <br>
  
  <div class="vx-row">

    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Module Access">
		  <p>Toggle yes or no to grant user permissions to each of the modules listed below.</p>
      <br>
      <br> 
	   	<div class="vx-row">
     
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
            <vs-switch v-model="botcustomization" />
          <span class="ml-4">Bot Customization</span>
        
          </div>
          </div>
         <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
           <vs-switch v-model="pretrained" />
          <span class="ml-4">Pre-trained industrial knowledge</span>
         
          </div>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
            <vs-switch v-model="removable" />
          <span class="ml-4">Removable Branding</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
          
        </div>
          <div class="vx-row">
     
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
           <vs-switch v-model="engagement" />
          <span class="ml-4">Engagement Dashboard</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
         <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-ceprioritynter mb-4">
           <vs-switch v-model="priority" />
          <span class="ml-4">Priority Email Support</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
            <vs-switch v-model="schedule" />
          <span class="ml-4">Schedule Demo/Callback</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
          
        </div>

      <div class="vx-row">
     
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
           <vs-switch v-model="livechat" />
          <span class="ml-4">Live chat integration</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
         <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
           <vs-switch v-model="remote" />
          <span class="ml-4">Remote & Onsite bot training</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
            <vs-switch v-model="channel" />
          <span class="ml-4">Channel integration</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
          
        </div>
       



        <div class="vx-row">
     
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
           <vs-switch v-model="help" />
          <span class="ml-4"> Help desk Integration</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
         <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
           <vs-switch v-model="conversation" />
          <span class="ml-4">Conversation analysis for business</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
            <vs-switch v-model="sales" />
          <span class="ml-4">Sales Lead generation</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
          
        </div>
        <div class="vx-row">
     
          <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="flex items-center mb-4">
           <vs-switch v-model="multiple" />
          <span class="ml-4"> Multiple website integration</span>
         <!-- <vs-switch v-model="product_update" /> -->
          </div>
          </div>
        </div>


        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
          <!-- <vs-button @click="randomCenter()" color="success" type="gradient">Position Top Center Random Color</vs-button> -->
            <vs-button  v-on:keyup.enter="addsubscription" :disabled="!validateForm" @click="addsubscription"  class="mr-3 mt-4">Submit</vs-button>
            <!-- <vs-button color="warning" type="border" class="mb-2" @click="input25 = input26 = input27 = input28 = input29 = input30 = ''; check7 = false;">Reset</vs-button> -->
          </div>
        </div>
        
     </vx-card>
    
    </div>
  
  </div>
  <template slot="codeContainer">
&lt;template&gt;
  &lt;div class=&quot;demo-alignment&quot;&gt;
      &lt;vs-button @click=&quot;addsubscription()&quot; color=&quot;success&quot; type=&quot;gradient&quot;&gt;Position Top Center Random Color&lt;/vs-button&gt;
  &lt;/div&gt;
   &lt;div class=&quot;demo-alignment&quot;&gt;
    &lt;vs-button @click=&quot;addsubscription&quot; type=&quot;filled&quot; color=&quot;primary&quot;&gt;Loading Default&lt;/vs-button&gt;
  &lt;/div&gt;
  &lt;div class=&quot;demo-alignment&quot;&gt;

    &lt;vs-dropdown&gt;

      &lt;a class=&quot;flex items-center&quot; href.prevent&gt;
          Dropdown Option Group
          &lt;i class=&quot;material-icons&quot;&gt; expand_more &lt;/i&gt;
      &lt;/a&gt;

      &lt;vs-dropdown-menu&gt;

        &lt;vs-dropdown-item&gt; Option 1 &lt;/vs-dropdown-item&gt;
        &lt;vs-dropdown-item&gt; Option 2 &lt;/vs-dropdown-item&gt;

        &lt;vs-dropdown-group&gt;

          &lt;vs-dropdown-item&gt; Option 1 &lt;/vs-dropdown-item&gt;
          &lt;vs-dropdown-item&gt; Option 2 &lt;/vs-dropdown-item&gt;

          &lt;vs-dropdown-group&gt;

            &lt;vs-dropdown-item&gt; sub Options 1 &lt;/vs-dropdown-item&gt;
            &lt;vs-dropdown-item&gt; sub Options 2 &lt;/vs-dropdown-item&gt;

          &lt;/vs-dropdown-group&gt;
        &lt;/vs-dropdown-group&gt;

        &lt;vs-dropdown-item divider&gt; Option 3 &lt;/vs-dropdown-item&gt;
      &lt;/vs-dropdown-menu&gt;
    &lt;/vs-dropdown&gt;
  &lt;/div&gt;
    
&lt;/template&gt;

&lt;script&gt;
export default {
  
  methods: {
    addsubscription() {
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = &grave;rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})&grave;
      this.$vs.notify({ title: &apos;Subscription status&apos;, text: &apos;Thank you for subscription!!&apos;, color, position: &apos;top-center&apos; })
      this.$vs.loading()
      setTimeout( ()=&gt; {
        this.$vs.loading.close()
      }, 2000);
    }
  }
}
&lt;/script&gt;
  </template>
  </div>

 <!-- </form> -->
  </div>
</template>

<script>
import axios from 'axios'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import moduleCalendar from '@/store/calendar/moduleCalendar.js'
require('vue-simple-calendar/static/css/default.css')

import Datepicker from 'vuejs-datepicker'
import { en, he } from 'vuejs-datepicker/src/locale'
import {Base_URL} from './../../api.config'
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

export default{
  
  data() {
    return {
      showDate: new Date(),
      disabledFrom: false,
      id: 0,
      title: '',
      startDate: '',
      endDate: '',
      labelLocal: 'none',

      langHe: he,
      langEn: en,
      number1:1,
      url: '',
      calendarView: 'month',

      activePromptAddEvent: false,
      activePromptEditEvent: false,

      calendarViewTypes: [
        {
          label: 'Month',
          val: 'month'
        },
        {
          label: 'Week',
          val: 'week'
        },
        {
          label: 'Year',
          val: 'year'
        }
      ],

       listPosition: [
      'top-center',
       ],
       me:'',
      result:'',
      subcost: '',
      subname: '',
      message:'',
      between: '',
      selectedDuration:'',
      selectedCurrency:'',
      multiple:false,
      help:false,
      sales:false,
      conversation:false,
      remote:false,
      livechat:false,
      engagement:false,
      priority:false,
      schedule:false,
      removable:false,
      channel:false,
      botcustomization:false,
      pretrained:false,
      numberuser:'',
      
      durations: [
        {
          durationCode: "monthly",
          durationName: "1 Month"
        },
        {
          durationCode: "quaterly",
          durationName: "3 Month"
        },
        {
          durationCode: "halfyearly",
          durationName: "6 Month"
        },
        {
          durationCode: "yearly",
          durationName: "1 Year"
        },

        {
          durationCode: "custom duration",
          durationName: "custom duration",
          

        }
      ],
       selected: null,
	  Currency:[
        {
          currency: "USD"
        },
        {
         currency: "INR"
         
        } 
    ]   
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.subcost !== '' && this.subname !== '' && this.message !== '' && this.selectedDuration !== '' && this.selectedCurrency !== '' && this.selectedCountry !== '' && (this.botcustomization === true || this.pretrained === true || this.priority === true|| this.help === true || this.multiple === true || this.sales ===true || this.livechat === true ||this.engagement===true || this.schedule=== true || this.channel === true || this.remote === true || this.removable === true || this.conversation === true)
    },
    simpleCalendarEvents () {
      return this.$store.state.calendar.events
    },
    validForm () {
      return  this.startDate !== '' && this.endDate !== '' && Date.parse(this.endDate) - Date.parse(this.startDate) >= 0 
    },
    disabledDatesTo () {
      return { to: new Date(this.startDate) }
    },
    disabledDatesFrom () {
      return { from: new Date(this.endDate) }
    },
    calendarLabels () {
      return this.$store.state.calendar.eventLabels
    },

  },
  components: {
    'v-select': vSelect,
    CalendarView,
    CalendarViewHeader,
    Datepicker
   

  },
  methods:{

    myFunctionAccept() {
      this;
      this.durations[4].durationName = this.startDate.toLocaleDateString() + " to " + this.endDate.toLocaleDateString()
    },
    changedLabel(event) {
      this.selected = event;
    },
    addEvent () {
      const obj = { title: this.title, startDate: this.startDate, endDate: this.endDate, label: this.labelLocal, url: this.url }
      obj.classes = `event-${  this.labelColor(this.labelLocal)}`
      this.$store.dispatch('calendar/addEvent', obj)
    },
    updateMonth (val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val)
    },
    clearFields () {
      this.title = this.endDate = this.url = ''
      this.id = 0
      this.labelLocal = 'none'
    },
    promptAddNewEvent (type, date) {
      this.disabledFrom = false
      this.addNewEventDialog(type, date)
    },
    addNewEventDialog (type, date) {
      this.clearFields()
      
      if(type.durationCode == "custom duration") {
        this.activePromptAddEvent = true;
        this.startDate = date
        this.endDate = date
      } else {
        this.durations[4].durationName = "custom duration";
      }
    },
    openAddNewEvent (date) {
      this.disabledFrom = true
      this.addNewEventDialog(date)
    },
   
    removeEvent () {
      this.$store.dispatch('calendar/removeEvent', this.id)
    },
    eventDragged (event, date) {
      this.$store.dispatch('calendar/eventDragged', {event, date})
    },
  
  created () {
    this.$store.registerModule('calendar', moduleCalendar)
    this.$store.dispatch('calendar/fetchEvents')
    this.$store.dispatch('calendar/fetchEventLabels')
  },
  beforeDestroy () {
    this.$store.unregisterModule('calendar')
  },
    
    addsubscription(){
      
     
      var newemail=localStorage.getItem('email')
      console.log(newemail) 
   
      function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min
      }
      const color = `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)})`
      this.$vs.notify({ title: 'Subscription Status', text: 'Thank you for subscription!!', color, position: 'top-center' })
  

      //axios.post(Base_URL.Actual_URL+'addsubscription', {
     axios.post(Base_URL.Actual_URL+'addsubscription', {
      subname: this.subname,
      subcost:this.subcost,
      selectedDuration:this.selectedDuration.durationName,
      selectedCurrency:this.selectedCurrency.currency,
      message:this.message,
      sales:this.sales,
      multiple:this.multiple,
      priority:this.priority,
      pretrained:this.pretrained,
      botcustomization:this.botcustomization,
      remote:this.remote,
      removable:this.removable,
      channel:this.channel,
      engagement:this.engagement,
      help:this.help,
      schedule:this.schedule,
      livechat:this.livechat,
      conversation:this.conversation,
      newemail:newemail,
      numberuser:this.number1

      })
    .then((response) => {
       
    console.log(response)
    this.result = response.data.result;
    console.log(localStorage.getItem('email'))
    if (response.data.code==200) {

          this.result=response.data.result 

                 this.$vs.loading()
                setTimeout(() => {
                  this.$vs.loading.close()
                  this.$router.push({name:"allsubscription"})
                }, 2000)

          
    }


      })
    },
    

  },
  
}
</script>
<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>

  