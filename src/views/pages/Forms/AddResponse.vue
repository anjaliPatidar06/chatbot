import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

<template>
  <div class="vx-row">

    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="Add Response Data">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Create or Select a Response</h6>
            <v-select class="w-full" label="durationName" :options="duration" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          </div>

          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>Add text for this response</h6>
            <vs-input class="w-full" label="" v-model="input25" />
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

<script>
import vSelect from 'vue-select'

export default{
  data() {
    return {
      duration: [
        {
          durationCode: "afirm",
          durationName: "afirm",
        },
        {
          durationCode: "welcome",
          durationName: "welcome",
        },
        {
          durationCode: "goodbye",
          durationName: "goodbye",
        },
        {
          durationCode: "greet",
          durationName: "greet",
        },
      ]
    }
  },
  components: {
    'v-select': vSelect,
  }
}
</script>
