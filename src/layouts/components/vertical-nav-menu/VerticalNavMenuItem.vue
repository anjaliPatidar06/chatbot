<!-- =========================================================================================
    File Name: VerticalNavMenuItem.vue
    Description: Vertical NavMenu item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VerticalNavMenuItem
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="vs-sidebar--item"
    :class="[
      {'vs-sidebar-item-active'            : activeLink},
      {'disabled-item pointer-events-none' : isDisabled},
    ]" 
   >
    <!-- hey -->

      <router-link
        tabindex="-1"
        v-if="to"
         v-show="accessNotAllowed(to)"
        exact
        :class="[{'router-link-active': activeLink}]"
        :to="to"
        :target="target" >
          <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
          <feather-icon v-else :class="{'w-3 h-3': iconSmall}" :icon="icon" />
          <slot />
          <!-- hiii -->
      </router-link>

      <a v-else :target="target" :href="href" tabindex="-1">
        <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
        <feather-icon v-else :class="{'w-3 h-3': iconSmall}" :icon="icon" />
        <slot />
      </a>
  </div>
</template>

<script>
export default {
  name: 'v-nav-menu-item',
  props: {
    icon        : { type: String,                 default: ""               },
    iconSmall   : { type: Boolean,                default: false            },
    iconPack    : { type: String,                 default: 'material-icons' },
    href        : { type: [String, null],         default: '#'              },
    to          : { type: [String, Object, null], default: null             },
    slug        : { type: String,                 default: null             },
    index       : { type: [String, Number],       default: null             },
    featherIcon : { type: Boolean,                default: true             },
    target      : { type: String,                 default: '_self'          },
    isDisabled  : { type: Boolean,                default: false            },

  },
  data(){
    return {
    }
  },
  watch: {
    // whenever question changes, this function will run
    test() {
      console.log('from watxhes')
    }
  },

  computed: {

    activeLink() {
      // console.log(this.$route.meta.permission,'this.$route from vertical nav menu')
      return ((this.to == this.$route.path) || (this.$route.meta.parent == this.slug) && this.to) ? true : false
    },
  },
  methods:{
    accessNotAllowed(to) {
      if(localStorage.user_role == 'User') {
        if (to == "/Buy") {
          return false
        }
      } else if(localStorage.user_role == 'Superadmin') {
         if (to == "/Buy") {
          return false
        }
        if (to == "/Agent") {
          return false
        }
        if(to == '/chatbotui') {
          return false
        }
      } else if(localStorage.user_role == 'Live Agent') {
           if (to == "/Buy") {
          return false
        }
        if (to == "/Agent") {
          return false
        }
        if(to == '/chatbotui') {
          return false
        }
      } else if(localStorage.user_role == 'Chatbot Manager') {
        console.log(to ,'to')
        if (to == "/Buy") {
          return false
        }
         if (to == "/AddUser") {
          return false
        }
         
      }
        return true
    }
  }
}

</script>

<style>
.hide-link{
  display: none;
}
</style>