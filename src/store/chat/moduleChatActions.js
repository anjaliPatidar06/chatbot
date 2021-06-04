/*=========================================================================================
  File Name: moduleChatActions.js
  Description: Chat Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'
import { Base_URL } from "../../../api.config";

export default {
  setChatSearchQuery({ commit }, query) {
    commit('SET_CHAT_SEARCH_QUERY', query)
  },
  updateAboutChat({ commit, rootState }, value) {
    commit('UPDATE_ABOUT_CHAT', {
      rootState,
      value
    })
  },
  updateStatusChat({ commit, rootState }, value) {
    commit('UPDATE_STATUS_CHAT', {
      rootState,
      value
    })
  },

  // API CALLS
  sendChatMessage({ getters, commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      payload.chatData = getters.chatDataOfUser(payload.id)
      commit('SEND_CHAT_MESSAGE', payload)
      // axios.post('/api/apps/chat/msg', {payload})
      //   .then((response) => {
      //     payload.chatData = getters.chatDataOfUser(payload.id)
      //     if (!payload.chatData) { dispatch('fetchChatContacts') }
      //     commit('SEND_CHAT_MESSAGE', payload)
      //     resolve(response)
      //   })
      //   .catch((error) => { reject(error) })
      // axios.post(Base_URL.Actual_URL+'store_message', {payload})
      // .then((response) => {
      //   payload.chatData = getters.chatDataOfUser(payload.id)
      //   if (!payload.chatData) { dispatch('fetchChatContacts') }
      //   commit('SEND_CHAT_MESSAGE', payload)
      //   resolve(response)
      // })
      // .catch((error) => { reject(error) })
    })
  },

  // Get contacts from server. Also change in store
  fetchContacts({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // axios.post(Base_URL.Actual_URL + "get_contact_list",payload)
      //   .then((response) => {
      //     console.log(response ,payload.user_id)
      //     response.data.contact_list.forEach((contact) => {
      //     if (contact.id === parseInt(payload.user_id)) {
      //       console.log('isndie ifs' , contact)
      //        commit('UPDATE_CONTACTS', contact)
      //        resolve(contact)
      //     }
      //   })
      //   })
      // .catch((error) => { reject(error) })
    })
  },

  // Get chat-contacts from server. Also change in store
  fetchChatContacts({ commit }) {
    return new Promise((resolve, reject) => {
      axios.post(Base_URL.Actual_URL + "get_contact_list", {
        company_id: localStorage.company_id,
        chatbot_id: localStorage.chatbot_id,
        agent_id: localStorage.id,
      })
        .then((response) => {
          commit('UPDATE_CHAT_CONTACTS', response.data.user_list)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  // Get chats from server. Also change in store
  fetchChats({ commit }) {
    return new Promise((resolve, reject) => {
      axios.post(Base_URL.Actual_URL + 'get_agent_message', { agent_id: localStorage.id })
        .then((response) => {
          commit('UPDATE_CHATS', response.data.Agent_Messages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  markSeenAllMessages({ getters, commit }, id) {

    return new Promise((resolve, reject) => {
      axios.post(Base_URL.Actual_URL + 'update_seen', { user_id: id })
        .then((response) => {
          commit('MARK_SEEN_ALL_MESSAGES', {
            id,
            chatData: getters.chatDataOfUser(id)
          })
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  toggleIsPinned({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/apps/chat/set-pinned/', {
        contactId: payload.id,
        value: payload.value
      })
        .then((response) => {
          commit('TOGGLE_IS_PINNED', payload)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
