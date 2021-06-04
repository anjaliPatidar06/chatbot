<!-- =========================================================================================
    File Name: TableExpandableData.vue
    Description: Create expandable rows which have custom data
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card title="All Subscription" search>
    <!-- <p>You can add the functionality of expanding a <strong>tr</strong> to visualize more data to make a structure of data or more complex functionalities</p><br> -->

    <vs-table search max-items="10" pagination :data="rowdata">
      <template slot="thead">
        <vs-th>Subscription Name</vs-th>
        <vs-th>Subscription Cost</vs-th>
        <vs-th>Currency</vs-th>
        <vs-th>Number of Message</vs-th>
        <vs-th>Subscription Duration</vs-th>

        <vs-th>Module Active</vs-th>
        <vs-th>Number Of User</vs-th>

        <vs-th>Action</vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="tr.subscriptionName">
            {{ tr.subscriptionName }}
          </vs-td>
          <vs-td :data="tr.SubscriptionCost">
            {{ tr.SubscriptionCost }}
          </vs-td>
          <vs-td :data="tr.Currency">
            {{ tr.Currency }}
          </vs-td>
          <vs-td :data="tr.NumberofMessage">
            {{ tr.NumberofMessage }}
          </vs-td>
          <vs-td :data="tr.SubscriptionDuration">
            {{ tr.SubscriptionDuration }}
          </vs-td>

          <vs-td :data="tr.module_active">
            {{ tr.module_active }}
          </vs-td>
          <vs-td :data="tr.nuser">
            {{ tr.nuser }}
          </vs-td>

          <vs-td>
            <div class="flex">
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
              <!-- <vs-button type="border" size="medium" icon-pack="feather" icon="icon-edit-2 null" color="success" class="mr-2" value='Update' @click='updateRecord(index,tr.Email);'></vs-button>
                                    <vs-button type="border" size="medium" icon-pack="feather" icon="icon-trash" color="danger"  @click='deleteTableRow(tr.id)'  ></vs-button> -->
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
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
      justify-between&quot;&gt; &lt;div class=&quot;con-userx flex items-center
      justify-start&quot;&gt; &lt;vs-avatar :badge=&quot;tr.id&quot;
      size=&quot;45px&quot;
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
      &lt;/vs-table&gt; &lt;/template&gt; &lt;script&gt; export default { data()
      { return { users: [.....] } }, } &lt;/script&gt;
    </template>
  </vx-card>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from "axios";
import { Base_URL, API_List } from "./../../api.config";

export default {
  data() {
    return {
      rowdata: "",
    };
  },
  methods: {
    getSubscriptionData() {
         axios
      .get(Base_URL.Actual_URL + "allsubscription", {
      })
      .then((response) => {
        this.rowdata = response.data.userlist;
      });
    },
    deleteTableRow: function (idx) {
      this.$vs.notify({
        color: "danger",
        title: "Subscription Deleted",
        text: "The selected subscription was successfully deleted",
        position: 'top-center'
      });

      axios.post(Base_URL.Actual_URL + "allsubscription", {
        delete: 1,
        idx: idx,
      }).then((res)=>{
        this.getSubscriptionData()
      });
      this.counter--;
      this.rowdata.splice(idx, 1);

    },

    updateRecord: function (index) {
        this.$router.push({path:"/editsubscriptionname/"+index}) ;

    },
  },
  mounted() {
    this.getSubscriptionData()
  },
};
</script>
