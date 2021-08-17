/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)
console.log('hey user type');
function guardMyroute(to, from, next) {
  
  // console.log(router.apps, 'to from router')
  var isAuthenticated = false;
  if (localStorage.getItem('email'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    // next('/subscription');
    next('/login');

  }
}


function guardMyroutenew(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('email') == "superadmin@gmail.com")
    isAuthenticated = true;
  else
    isAuthenticated = false;

  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/AddSubscription'); // go to '/login';
  }
}



var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }


  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      beforeEnter: guardMyroute,
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            permission: 'all'
          }
        },

        {
          path: '/allaccount',
          name: 'allaccount',
          beforeEnter: guardMyroutenew,
          component: () => import('./views/AllAccount.vue'),
          meta: {
            permission: 'super admin'
          }

        },
        {
          path: '/addaccount',
          name: 'addaccount',
          beforeEnter: guardMyroutenew,
          component: () => import('./views/AddAccount.vue'),

        },
        // {
        //   path: '/edituser',
        //   name: 'edituser',
        //   component: () => import('./views/pages/edituser.vue')
        // },
        {
          path: '/editusername/:id',
          name: 'editusername',
          component: () => import('./views/pages/editusername.vue')
        },
        // {
        //   path: '/editusersubscription',
        //   name: 'editusersubscription',
        //   component: () => import('./views/pages/editusersubscription.vue'),
        //   // meta: {
        //   //   permission: [
        //   //     {
        //   //       role: "Admin",
        //   //       access: (user, to) => user.id === to.params.id,
        //   //       redirect: "login"
        //   //     }
        //   //   ]
        //   // }
        // },
        {
          path: '/editintentname/:id',
          name: 'editintentname',
          component: () => import('./views/pages/editintentname.vue')
        },
        // {
        //   path: '/editintent',
        //   name: 'editintent',
        //   component: () => import('./views/pages/editintent.vue')
        // },
        {
          path: '/editsynonymname/:id',
          name: 'editsynonymname',
          component: () => import('./views/pages/editsynonymname.vue')
        },
        {
          path: '/nlunew',
          name: 'nlunew',
          component: () => import('./views/apps/chat/newchat.vue')
        },
        {
          path: '/user/training/:name',
          name :'userTraining',
          component:() => import('./views/UserTrainingData.vue'),
         
        },
        {
          path: '/editregexname/:id',
          name: 'editregexname',
          component: () => import('./views/pages/editregexname.vue')
        },
        {
          path: '/editactionname/:id',
          name: 'editactionname',
          component: () => import('./views/pages/editactionname.vue')
        },
        {
          path: '/editform',
          name: 'editform',
          component: () => import('./views/pages/editform.vue')
        },
        {
          path: '/button',
          name: 'button',
          component: () => import('./views/pages/button.vue')
        },
        {
          path: '/dropdown',
          name: 'dropdown',
          component: () => import('./views/pages/dropdown.vue')
        },
        {
          path: '/calender',
          name: 'calender',
          component: () => import('./views/pages/calender.vue')
        },

        {
          path: '/picture',
          name: 'picture',
          component: () => import('./views/pages/picture.vue')
        },
        {
          path: '/entity',
          name: 'entity',
          component: () => import('./views/pages/entity.vue')
        },
        {
          path: '/card',
          name: 'card',
          component: () => import('./views/pages/card.vue')
        },
        {
          path: '/payment-status',
          name: 'payment-status',
          component: () => import('./views/pages/paymentStatus.vue')
        },
        {
          path: '/collapsible',
          name: 'collapsible',
          component: () => import('./views/pages/collapsible.vue')
        },
        {
          path: '/quickreplies',
          name: 'quickreplies',
          component: () => import('./views/pages/quickreplies.vue')
        },
        {
          path: '/edit/location/:id',
          name: 'editLocation',
          component: () => import('./views/pages/editLocation.vue')
        },
        {
          path: '/editformname/:id',
          name: 'editformname',
          component: () => import('./views/pages/editformname.vue')
        },
        {
          path: '/editslotname/:id',
          name: 'editslotname',
          component: () => import('./views/pages/editslotname.vue')
        },
        {
          path: '/picture',
          name: 'picture',
          component: () => import('./views/pages/picture.vue')
        },
        {
          path: '/pdf',
          name: 'pdf',
          component: () => import('./views/pages/pdf.vue')
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('./views/pages/videoComponent.vue')
        },
        {
          path: '/edit/video/:id',
          name: 'editvideo',
          component: () => import('./views/pages/editVideo.vue')
        },
        {
          path: '/edit/pdf/:id',
          name: 'edit-pdf',
          component: () => import('./views/pages/editPdf.vue')
        },
        {
          path: '/editentity',
          name: 'editentity',
          component: () => import('./views/pages/editentity.vue')
        },
        {
          path: '/editentityname/:id',
          name: 'editentityname',
          component: () => import('./views/pages/editentityname.vue')
        },
        // {
        //   path: '/editbutton',
        //   name: 'editbutton',
        //   component: () => import('./views/pages/editbutton.vue')
        // },
        {
          path: '/editbuttonname/:id',
          name: 'editbuttonname',
          component: () => import('./views/pages/editbuttonname.vue')
        },
        // {
        //   path: '/editdropdown',
        //   name: 'editdropdown',
        //   component: () => import('./views/pages/editdropdown.vue')
        // },
        {
          path: '/editdropdownname/:id',
          name: 'editdropdownname',
          component: () => import('./views/pages/editdropdownname.vue')
        },
        // {
        //   path: '/editquick',
        //   name: 'editquick',
        //   component: () => import('./views/pages/editquick.vue')
        // },
        {
          path: '/editquickname/:id',
          name: 'editquickname',
          component: () => import('./views/pages/editquickname.vue')
        },

        // {
        //   path: '/editcalendar',
        //   name: 'editcalendar',
        //   component: () => import('./views/pages/editcalender.vue')
        // },
        {
          path: '/editcalendarname/:id',
          name: 'editcalendarname',
          component: () => import('./views/pages/editcalendername.vue')
        },


        // {
        //   path: '/editcollapsible',
        //   name: 'editcollapsible',
        //   component: () => import('./views/pages/editcollapsible.vue')
        // },
        {
          path: '/editcollapsiblename/:id',
          name: 'editcollapsiblename',
          component: () => import('./views/pages/editcollapsiblename.vue')
        },
        // {
        //   path: '/editcard',
        //   name: 'editcard',
        //   component: () => import('./views/pages/editcard.vue')
        // },
        {
          path: '/editcardname/:id',
          name: 'editcardname',
          component: () => import('./views/pages/editcardname.vue')
        },
        // {
        //   path: '/editstory',
        //   name: 'editstory',
        //   component: () => import('./views/pages/editstory.vue')
        // },
        {
          path: '/editstoryname/:id',
          name: 'editstoryname',
          component: () => import('./views/pages/editstoryname.vue')
        },
        // {
        //   path: '/editsentence',
        //   name: 'editsentence',
        //   component: () => import('./views/pages/editsentence.vue')
        // },
        {
          path: '/editsentencename/:id',
          name: 'editsentencename',
          component: () => import('./views/pages/editsentencename.vue')
        },

        // {
        //   path: '/editresponse',
        //   name: 'editresponse',
        //   component: () => import('./views/pages/editresponse.vue')
        // },
        {
          path: '/editresponsename/:id',
          name: 'editresponsename',
          component: () => import('./views/pages/editresponsename.vue')
        },
        // {
        //   path: '/editchatbot',
        //   name: 'editchatbot',
        //   component: () => import('./views/pages/editchatbot.vue')
        // },
        {
          path: '/editchatbotname/:id',
          name: 'editchatbotname',
          component: () => import('./views/pages/editchatbotname.vue')
        },

        // {
        //   path: '/editallaccount',
        //   name: 'editallaccount',
        //   component: () => import('./views/pages/editallaccount.vue')
        // },
        {
          path: '/editsubscriptionname/:id',
          name: 'editsubscriptionname',
          component: () => import('./views/pages/editusersubscriptionname.vue')
        },
        {
          path: '/editallaccountname/:id',
          name: 'editallaccountname',
          component: () => import('./views/pages/editallaccountname.vue')
        },
        {
          path: '/accountinfo',
          name: 'accountinfo',
          component: () => import('./views/pages/AccountInfo.vue')
        },
        {
          path: '/ProfileIn/',
          name: 'profileIn',
          component: () => import('./views/pages/ProfileInfo.vue')
        },
        {
          path: '/alluser',
          name: 'alluser',
          component: () => import('./views/AllUser.vue'),
          meta: { isAdmin: true }

        },
        {
          path: '/adduser',
          name: 'adduser',
          component: () => import('./views/AddUser.vue'),
          // meta: { isAdmin:true } 
        },
        {
          path: '/buy',
          name: 'buy',
          component: () => import('./views/buy.vue'),
        },
        {
          path: '/agent',
          name: 'agent',
          component: () => import('./views/agent.vue'),
        },

        {
          path: '/demochat',
          name: 'demochat',
          component: () => import('./views/pages/demochat.vue'),

        },
        {
          path: '/regex',
          name: 'regex',
          component: () => import('./views/pages/regex.vue'),

        },
        {
          path: '/synonyms',
          name: 'synonyms',
          component: () => import('./views/pages/synonyms.vue'),

        },
        {
          path: '/chatbotui',
          name: 'chatbotui',
          component: () => import('./views/pages/chatbotui.vue'),

        },

        {
          path: '/Intent',
          name: 'Intent',
          component: () => import('./views/pages/Intent.vue'),

        },
        {
          path: '/demomodule',
          name: 'Demo Module',
          component: () => import('./views/pages/newnn.vue'),

        },

        {
          path: '/allsubscription',
          name: 'allsubscription',
          beforeEnter: guardMyroutenew,

          component: () => import('./views/AllSubscription.vue'),
        },
        {
          path: '/addsubscription',
          name: 'addsubscription',
          beforeEnter: guardMyroutenew,
          component: () => import('./views/AddSubscription.vue'),

        },
        {
          path: '/nludata',
          name: 'nludata',
          component: () => import('@/views/NluData.vue'),
        },
        {
          path: '/responses',
          name: 'responses',
          // beforeEnter:guardMyrouteradmin,
          component: () => import('./views/Responses.vue'),

        },
        {
          path: '/botTemplate/:name',
          name: 'botTemplate',
          component: () => import('./views/pages/botTemplate.vue'),

        },
        {
          path: '/stories',
          name: 'stories',
          component: () => import('./views/Stories.vue'),

        },
        {
          path: '/form',
          name: 'form',
          component: () => import('./views/form.vue'),

        },
        {
          path: '/action',
          name: 'action',
          component: () => import('./views/action.vue'),

        },
        {
          path: '/configuration',
          name: 'configuration',
          component: () => import('./views/Configuration.vue')
        },
        {
          path: '/design/:name',
          name: 'design',
          component: () => import('./views/Domain.vue')
        },
        {
          path: '/chat',
          name: 'chat',
          component: () => import('./views/apps/chat/Chat.vue')
        },
        {
          path: '/chatfile',
          name: 'chatfile',
          component: () => import('./views/apps/chat/newfile.vue')
        },
        {
          path: '/chatpage',
          name: 'chatpage',
          component: () => import('./views/apps/chat/newpage.vue')
        },
        // {
        //   path: '/collected-leads',
        //   name: 'collected-leads',
        //   component: () => import('./views/Collectedemail.vue'),

        // },
        {
          path: '/chatbotFile',
          name: 'chatbotFile',
          component: () => import('./views/pages/chatbotFile.vue'),

        },
        {
          path: '/unansweredQuestions',
          name: 'unansweredQuestions',
          component: () => import('./views/unanswered_question.vue'),

        },
        {
          path: '/collected-leads',
          name: 'collected-leads',
          component: () => import('./views/pages/forms.vue'),
        },
        {
          path: '/featured',
          name: 'featured',
          component: () => import('./views/pages/featured.vue'),
        },
      ],
    },

    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/subscription',
          name: 'subscription',
          component: () => import('@/views/pages/subscription.vue'),
        },
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue')
        },

        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        },
        {
          path: '/register',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),

        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),

        },
        // {
        //   path: '/pages/register',
        //   name: 'page-register',
        //   component: () => import('@/views/pages/register/Register.vue'),
        //   meta: {
        //     rule: 'editor'
        //   }
        // },
        {
          path: '/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
        },
        {
          path: '/reset-password/:reset_token?',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
        },
        {
          path: '/email',
          name: 'email',
          component: () => import('@/views/pages/email.vue'),
        },
       
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/not-authorized'
    }
  ],
})

/************************************* */

// router.beforeEach((to, from, next) => {
//     console.log(from ,'frommm')
// // console.log(router.options.routes.length,'before route')

//   // router.options.routes = []
//   // router.options.routes.forEach(route => {
//     // if (route.children) {
//     //   console.log(route.children,'route from router')
//     // }
//     // console.log(router.options.routes,'route from router')  // if (to.meta.isAdmin) {

//    // Remove initial loading
//    // const appLoading = document.getElementById('loading-bg')
//    //   if (appLoading) {
//    //       appLoading.style.display = "none";
//    //   }
//  })
// router.afterEach((to, from) => {
router.afterEach(() => {

  /************************************* */
  // router.options.routes[0].children =  adminRoutes    
  /************************************* */
  //  console.log(to,from)
  // console.log(router.options.routes[0].children,'after route from router');  // if (to.meta.isAdmin) {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})



export default router
    //export default new VueRouter();
