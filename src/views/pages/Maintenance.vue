<!-- =========================================================================================
    File Name: Maintenance.vue
    Description: Maintenance Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
            <img src="@/assets/images/pages/maintenance-2.png" alt="graphic-maintenance" class="mx-auto mb-4">
            <h1 class="sm:mx-0 mx-4 mb-6 text-5xl d-theme-heading-color">Under Maintenance!</h1>
            <p class="sm:mx-0 mx-4 mb-6 d-theme-text-inverse">paraphonic unassessable foramination Caulopteris worral Spirophyton encrimson esparcet aggerate chondrule restate whistler shallopy biosystematy area bertram plotting unstarting quarterstaff.</p>
            <vs-button size="large" to="/">Back to Home</vs-button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value1: ''
    }
  }
}
</script>





<template>

<div>
  <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
    <label class="form__label">Name</label>
    <input class="form__input" v-model.trim="$v.name.$model"/>
  </div>
  <div class="error" v-if="!$v.name.required">Field is required</div>
  <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
  <tree-view :data="$v.name" :options="{rootObjectKey: '$v.name', maxDepth: 2}"></tree-view>
  <div class="form-group" :class="{ 'form-group--error': $v.age.$error }">
    <label class="form__label">Age</label>
    <input class="form__input" v-model.trim.lazy="$v.age.$model"/>
  </div>
  <div class="error" v-if="!$v.age.between">Must be between {{$v.age.$params.between.min}} and {{$v.age.$params.between.max}}</div><span tabindex="0">Blur to see changes</span>
  <tree-view :data="$v.age" :options="{rootObjectKey: '$v.age', maxDepth: 2}"></tree-view>
</div>
</template>
import Vue from 'Vue';

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      name: '',
      age: 0
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    age: {
      between: between(20, 30)
    }
  }
}


</script>