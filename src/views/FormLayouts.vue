import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

<template>
  <div class="vx-row">

    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input class="w-full" label="First Name" v-model="input25" />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input class="w-full" label="Last Name" v-model="input26" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input class="w-full" label="City" v-model="input27" />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input class="w-full" label="Country" v-model="input28" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input class="w-full" label="Company" v-model="input29" />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input type="email" class="w-full" label="Email" v-model="input30" />
          </div>
        </div>
        
        
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input class="w-full" label="Category" v-model="input31" />
          </div>
          
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-select class="w-full" label="Subscription"></vs-select>
          </div>
            
          
        </div>


        <div class="vx-row">
          <div class="vx-col w-full mb-6">
            <vs-checkbox class="inline-flex" v-model="check7">Remember Me</vs-checkbox>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2">Submit</vs-button>
            <vs-button color="warning" type="border" class="mb-2" @click="input25 = input26 = input27 = input28 = input29 = input30 = ''; check7 = false;">Reset</vs-button>
          </div>
        </div>
        
      </vx-card>
    </div>
  </div>
  
 
</template>




<script>
import vSelect from 'vue-select'

export default{
  components: {
    'v-select': vSelect,
  }
}
</script>

<script>

export default{
  data () {
    return {
      check1: '',
      check2: '',
      check3: '',
      check4: '',
      check5: '',
      check6: '',
      check7: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      input10: '',
      input11: '',
      input12: '',
      input13: '',
      input14: '',
      input15: '',
      input16: '',
      input17: '',
      input18: '',
      input19: '',
      input20: '',
      input21: '',
      input22: '',
      input23: '',
      input24: '',
      input25: '',
      input26: '',
      input27: '',
      input28: '',
      input29: '',
      input30: '',
      input31: '',
      input32: ''

    }
  }
}
</script>
