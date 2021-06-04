// import Vue from 'vue'
// import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
// import router from '@/router'

// Vue.use(AclInstaller)

// let initialRole = 'admin'

// const userRole = localStorage.getItem('user_role')
// if (userRole) initialRole = userRole

// export default new AclCreate({
//   initial  : initialRole,
//   notfound : '/pages/not-authorized',
//   router,
//   acceptLocalRules : true,
//   globalRules: {
//     admin  : new AclRule('admin').generate(),
//     editor : new AclRule('editor').or('admin').generate()
//   }
// })
