/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [

  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",


  },


  {
    url: "",

    name: "Account",
    slug: "Account",
    icon: "MailIcon",

    submenu: [
      {
        url: "/AllAccount",
        name: "All Accounts",
        slug: "All Account",
        icon: "FileIcon",
        meta: { requireAuth: true }

      },
      {
        url: "/AddAccount",
        name: "Add Account",
        slug: "Add Account",
        icon: "FileIcon",
      },
    ]
  },
  {
    url: "",
    name: "User",
    slug: "User",
    icon: "CheckSquareIcon",
    //isDisabled:chatbot,

    submenu: [
      {
        url: "/AllUser",
        name: "All Users",
        slug: "All User",
        icon: "FileIcon",
      },
      {
        url: "/AddUser",
        name: "Add User",
        slug: "Add User",

      },
    ]
  },
  {
    url: "/Buy",
    name: "Buy User",
    slug: "Buy User",
    icon: "PlusCircleIcon",


  },
  {
    url: "/Agent",
    name: "Chatbot Name",
    slug: "Agent",
    icon: "LayersIcon",

  },
  {
    url: "",
    name: "Subscription",
    slug: "Subscription",
    icon: "UserIcon",



    submenu: [
      {
        url: "/AllSubscription",
        name: "All Subscription",
        slug: "All Subscription",
        icon: "FileIcon",
      },
      {
        url: "/AddSubscription",
        name: "Add Subscription",
        slug: "Add Subscription",
        icon: "FileIcon",
      },
    ]
  },
  {
    url: "",
    name: "Training",
    slug: "Training",
    icon: "DropletIcon",



    submenu: [
      {
        url: "/user/training/nluData",
        name: "User's Training Data",
        slug: "Nlu Data",
        icon: "FileIcon",
      },
      {
        url: "/botTemplate/response",
        name: "Bot's Template",
        slug: "botTemplate",
        icon: "FileIcon",
      },
      {
        url: "/Stories",
        name: "Scope",
        slug: "Stories",
        icon: "FileIcon",
      },
      {
        url: "/Intent",
        name: "Intent Data",
        slug: "Intent",
        icon: "FileIcon",
      },
      {
        url: "/Entity",
        name: "Entity Data",
        slug: "Entity",
        icon: "FileIcon",
      },



      {
        url: "/Design/formData",
        name: "Design",
        slug: "Design",
        icon: "FileIcon",
      },

    ]
  },
  {
    url: "",
    name: "Query",
    slug: "Query",
    icon: "LayoutIcon",

    submenu: [
      {
        url: "/Chat",
        name: "Chat",
        slug: "chat",
        icon: "FileIcon",
      },
      {
        url: "/collected-leads",
        name: "Collected Leads",
        slug: "Collected Leads",
        icon: "FileIcon",
      },

      // {
      //   url: "/form_leads",
      //   name: "Form Leads",
      //   slug: "form_leads",
      //   icon: "FileIcon",
      // },
      {
        url: "/unansweredQuestions",
        name: "Unanswered Questions",
        slug: "unansweredQuestions",
        icon: "FileIcon",
      },
      {
        url: "/chatbotFile",
        name: "Chatbot File",
        slug: "chatbotFile",
        icon: "FileIcon",
      }
      
      // {
      //   url: "/nlunew",
      //   name: "chat module",
      //   slug: "chat module",
      //   icon: "FileIcon",
      // },
      // {
      //   url: "/demomodule",
      //   name: "Demo module",
      //   slug: "chat module",
      //   icon: "FileIcon",
      // }

    ]

  },
  {
    url: "/chatbotui",
    name: "Chatbot UI Design",
    slug: "chatbot UI Design",
    icon: "MessageSquareIcon",
  },
// {
//   url: "/featured",
//   name: "Featured Templates",
//   slug: "featured",
//   icon: "MessageSquareIcon",
// }
]


