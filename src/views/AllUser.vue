<!-- =========================================================================================
    File Name: TableExpandableData.vue
    Description: Create expandable rows which have custom data
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="ag-grid-demo">
    <vx-card title="All Users" search>
      <!-- <p>You can add the functionality of expanding a <strong>tr</strong> to visualize more data to make a structure of data or more complex functionalities</p><br> -->
      <div id="div-with-loading" class="vs-con-loading__container">
        <vs-table search max-items="10" pagination :data="rowdata">
          <template slot="thead">
            <vs-th>First Name</vs-th>
            <vs-th>Last Name</vs-th>
            <vs-th>Email</vs-th>
            <vs-th>Phone Number</vs-th>
            <vs-th>Role</vs-th>
            <vs-th>Chatbot Name</vs-th>
            <vs-th>Actions</vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.Firstname">
                {{ tr.Firstname }}
              </vs-td>
              <vs-td :data="tr.Lastname">
                {{ tr.Lastname }}
              </vs-td>
              <vs-td :data="tr.Email">
                {{ tr.Email }}
              </vs-td>
              <vs-td :data="tr.PhoneNumber">
                {{ tr.PhoneNumber }}
              </vs-td>
              <vs-td :data="tr.role">
                {{ tr.role }} 
              </vs-td>
              <vs-td :data="tr.Chatbot_name">{{tr.Chatbot_name}}</vs-td>

              <vs-td>
                <div class="flex">
                  <!-- <vs-button type="border" size="large" icon-pack="feather" icon="icon-edit-2 null" color="success" class="mr-2" @click="updateRecord(tr.id)"></vs-button>
                                    <vs-button type="border" size="medium" icon-pack="feather" icon="icon-trash" color="danger"  @click='deleteTableRow(tr.id)'  ></vs-button> -->
                  <vs-button
                    @click="updateRecord(tr.id)"
                    type="filled"
                    color="success"
                    class="mr-2"
                    >Edit</vs-button
                  >
                  <vs-button
                    @click="deleteTableRow(tr.id)"
                    type="filled"
                    color="danger"
                    >Delete</vs-button
                  >
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <br />

      <template slot="codeContainer">
        &lt;template&gt; &lt;vs-table :data=&quot;users&quot;&gt; &lt;template
        slot=&quot;thead&quot;&gt; &lt;vs-th&gt;Email&lt;/vs-th&gt;
        &lt;vs-th&gt;Name&lt;/vs-th&gt; &lt;vs-th&gt;Website&lt;/vs-th&gt;
        &lt;vs-th&gt;Nro&lt;/vs-th&gt; &lt;/template&gt; &lt;template
        slot-scope=&quot;{data}&quot;&gt; &lt;vs-tr :data=&quot;tr&quot;
        :key=&quot;indextr&quot; v-for=&quot;(tr, indextr) in data&quot;&gt;
        &lt;vs-td :data=&quot;tr.email&quot;&gt;
        {{ &quot;\{\{ tr.email \}\}&quot; }}
        &lt;/vs-td&gt; &lt;vs-td :data=&quot;tr.username&quot;&gt;
        {{ &quot;\{\{ tr.name \}\}&quot; }}
        &lt;/vs-td&gt; &lt;vs-td :data=&quot;tr.website&quot;&gt;
        {{ &quot;\{\{ tr.website \}\}&quot; }}
        &lt;/vs-td&gt; &lt;vs-td :data=&quot;tr.id&quot;&gt;
        {{ &quot;\{\{ tr.id \}\}&quot; }}
        &lt;/vs-td&gt; &lt;template class=&quot;expand-user&quot;
        slot=&quot;expand&quot;&gt; &lt;div class=&quot;con-expand-users
        w-full&quot;&gt; &lt;div class=&quot;con-btns-user flex items-center
        justify-between&quot;&gt; &lt;div class=&quot;con-userx flex
        items-center justify-start&quot;&gt; &lt;vs-avatar
        :badge=&quot;tr.id&quot; size=&quot;45px&quot;
        :src=&quot;`https://randomuser.me/api/portraits/women/${indextr}.jpg`&quot;
        /&gt; &lt;span&gt;{{ "\{\{ tr.name \}\}" }}&lt;/span&gt; &lt;/div&gt;
        &lt;div class=&quot;flex&quot;&gt; &lt;vs-button type=&quot;border&quot;
        size=&quot;small&quot; icon-pack=&quot;feather&quot;
        icon=&quot;icon-phone&quot; class=&quot;mr-2&quot;&gt;&lt;/vs-button&gt;
        &lt;vs-button type=&quot;border&quot; size=&quot;small&quot;
        icon-pack=&quot;feather&quot; icon=&quot;icon-send&quot;
        color=&quot;success&quot; class=&quot;mr-2&quot;&gt;&lt;/vs-button&gt;
        &lt;vs-button type=&quot;border&quot; size=&quot;small&quot;
        icon-pack=&quot;feather&quot; icon=&quot;icon-trash&quot;
        color=&quot;danger&quot;&gt;&lt;/vs-button&gt; &lt;/div&gt; &lt;/div&gt;
        &lt;vs-list&gt; &lt;vs-list-item icon-pack=&quot;feather&quot;
        icon=&quot;icon-mail&quot;
        :title=&quot;tr.email&quot;&gt;&lt;/vs-list-item&gt; &lt;vs-list-item
        icon-pack=&quot;feather&quot; icon=&quot;icon-globe&quot;
        :title=&quot;tr.website&quot;&gt;&lt;/vs-list-item&gt; &lt;/vs-list&gt;
        &lt;/div&gt; &lt;/template&gt; &lt;/vs-tr&gt; &lt;/template&gt;
        &lt;/vs-table&gt; &lt;/template&gt; &lt;script&gt; export default {
        data() { return { users: [.....] } }, } &lt;/script&gt;
      </template>
    </vx-card>
  </div>
</template>

<script>
// import user from 'Alluser.vue'
import axios from "axios";
import { Base_URL } from "./../../api.config";

export default {
  rowdata: "",
  tr: "",
  data() {
    return {
      backgroundLoading: "primary",
      colorLoading: "#fff",
      rowdata: "",
      id: "",
      activeConfirm: false,
      activeLoading: true,
    };
  },
  methods: {
    allUser() {
      axios
        .post(Base_URL.Actual_URL + "alluser", {
          company_id : localStorage.company_id,
          // chatbot_id:localStorage.chatbot_id    
              })
        .then((response) => {
          this.rowdata = response.data.userlist;
          if (response.status == 200) {
            // this.activeLoading = false
            setTimeout(() => {
              this.$vs.loading.close("#div-with-loading > .con-vs-loading");
            }, 500);
            this.result = response.data.result;
          }
        });
    },
    deleteTableRow: function (idx) {
      axios
        .post(Base_URL.Actual_URL + "deleteuser", {
          delete: 1,
          idx: idx,
        })
        .then((res) => {
          if (res.status == 200) {
            this.allUser();
            this.counter--;
            this.rowdata.splice(idx, 1);
            this.$vs.loading();
            this.$vs.notify({
              color: "danger",
              title: "User Deleted",
              text: "The selected User was successfully deleted",
              position: "top-center",
            });
            setTimeout(() => {
              this.$vs.loading.close();
            }, 200);
          }
        });
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "edituser", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;
          this.id = this.email[0].id;
          this.$router.push({
            name: "editusername",
            params: { id: this.id },
          });
        });
    },
    openLoading(type) {
      this.activeLoading = true;
      this.$vs.loading({
        type: type,
      });
      setTimeout(() => {
        this.activeLoading = false;
        this.$vs.loading.close();
      }, 3000);
    },
  },
  mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.6,
    });

    this.allUser();
  },
};
</script>
