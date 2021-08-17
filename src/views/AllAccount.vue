<template>
  <vx-card title="All Account" search>
    <!-- <p>You can add the functionality of expanding a <strong>tr</strong> to visualize more data to make a structure of data or more complex functionalities</p><br> -->
    <!-- <div class="centerx example-loading">
    <div
      class="fill-row-loading">
      <div
        :class="{'activeLoading':activeLoading}"
        @click="openLoading(type)"
        v-for="type in types"
        :id="[`loading-${type}`]"
        class="vs-con-loading__container loading-example"  v-bind:key="type.id">
        </div>
    </div>
  </div> -->
    <div id="div-with-loading" class="vs-con-loading__container">
      <vs-table search max-items="10" pagination :data="rowdata">
        <template slot="thead">
          <vs-th>Name</vs-th>
          <vs-th>Email</vs-th>
          <!-- <vs-th>Company Name</vs-th> -->
          <vs-th>Phone Number</vs-th>
          <vs-th>Country</vs-th>
          <vs-th>Category</vs-th>

          <vs-th>Action</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.name">
              {{ tr.name }}
            </vs-td>
            <vs-td :data="tr.email">
              {{ tr.email }}
            </vs-td>
            <vs-td :data="tr.phone">
              {{ tr.phone }}
            </vs-td>

            <vs-td :data="tr.country">
              {{ tr.country }}
            </vs-td>
            <vs-td :data="tr.category">
              {{ tr.category }}
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
                <vs-button @click="deleteTableRow(tr.id)" type="filled" color="danger"
                  >Delete</vs-button
                >
                <!-- <vs-button type="border" size="medium" icon-pack="feather" icon="icon-edit-2 null" color="success" class="mr-2" value='Update' @click='updateRecord(index,tr.Email);'></vs-button>
                                    <vs-button type="border" size="medium" icon-pack="feather" icon="icon-trash" color="danger"  @click='deleteTableRow(tr.id)'  ></vs-button> -->
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
      :key=&quot;indextr&quot; v-for=&quot;(tr, indextr) in data&quot;&gt; &lt;vs-td
      :data=&quot;tr.email&quot;&gt;
      {{ &quot;\{\{ tr.email \}\}&quot; }}
      &lt;/vs-td&gt; &lt;vs-td :data=&quot;tr.username&quot;&gt;
      {{ &quot;\{\{ tr.name \}\}&quot; }}
      &lt;/vs-td&gt; &lt;vs-td :data=&quot;tr.website&quot;&gt;
      {{ &quot;\{\{ tr.website \}\}&quot; }}
      &lt;/vs-td&gt; &lt;vs-td :data=&quot;tr.id&quot;&gt;
      {{ &quot;\{\{ tr.id \}\}&quot; }}
      &lt;/vs-td&gt; &lt;template class=&quot;expand-user&quot;
      slot=&quot;expand&quot;&gt; &lt;div class=&quot;con-expand-users w-full&quot;&gt;
      &lt;div class=&quot;con-btns-user flex items-center justify-between&quot;&gt;
      &lt;div class=&quot;con-userx flex items-center justify-start&quot;&gt;
      &lt;vs-avatar :badge=&quot;tr.id&quot; size=&quot;45px&quot;
      :src=&quot;`https://randomuser.me/api/portraits/women/${indextr}.jpg`&quot; /&gt;
      &lt;span&gt;{{ "\{\{ tr.name \}\}" }}&lt;/span&gt; &lt;/div&gt; &lt;div
      class=&quot;flex&quot;&gt; &lt;vs-button type=&quot;border&quot;
      size=&quot;small&quot; icon-pack=&quot;feather&quot; icon=&quot;icon-phone&quot;
      class=&quot;mr-2&quot;&gt;&lt;/vs-button&gt; &lt;vs-button type=&quot;border&quot;
      size=&quot;small&quot; icon-pack=&quot;feather&quot; icon=&quot;icon-send&quot;
      color=&quot;success&quot; class=&quot;mr-2&quot;&gt;&lt;/vs-button&gt; &lt;vs-button
      type=&quot;border&quot; size=&quot;small&quot; icon-pack=&quot;feather&quot;
      icon=&quot;icon-trash&quot; color=&quot;danger&quot;&gt;&lt;/vs-button&gt;
      &lt;/div&gt; &lt;/div&gt; &lt;vs-list&gt; &lt;vs-list-item
      icon-pack=&quot;feather&quot; icon=&quot;icon-mail&quot;
      :title=&quot;tr.email&quot;&gt;&lt;/vs-list-item&gt; &lt;vs-list-item
      icon-pack=&quot;feather&quot; icon=&quot;icon-globe&quot;
      :title=&quot;tr.website&quot;&gt;&lt;/vs-list-item&gt; &lt;/vs-list&gt; &lt;/div&gt;
      &lt;/template&gt; &lt;/vs-tr&gt; &lt;/template&gt; &lt;/vs-table&gt;
      &lt;/template&gt; &lt;script&gt; export default { data() { return { users: [.....] }
      }, } &lt;/script&gt;
    </template>
  </vx-card>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import { Base_URL, API_List } from "./../../api.config";

export default {
  data() {
    return {
      rowdata: "",
    };
  },
  mounted() {
    this.allAccountList();
  },
  methods: {
    allAccountList() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
      axios
        .get(Base_URL.Actual_URL + "allaccount", {
          //axios.get(Base_URL.Actual_URL+'allaccount',{
        })
        .then((response) => {
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
          this.rowdata = response.data.userlist;
        })
        .catch((err) => {
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
          this.$vs.notify({
            text: "Please try again.",
            title: "Failed to process your request.",
            color: "danger",
            position: "top-center",
          });
        });
    },
    deleteTableRow: function (idx) {
      this.$vs.notify({
        color: "danger",
        title: "Account Deleted",
        text: "The selected account was deleted successfully",
        position: "top-center",
      });
      axios
        .post(Base_URL.Actual_URL + "allaccount", {
          // axios.post(Base_URL.Actual_URL+'allaccount', {
          delete: 1,
          idx: idx,
        })
        .then((res) => {
          this.allAccountList();
        });
      this.counter--;
      this.rowdata.splice(idx, 1);
    },

    updateRecord: function (index) {
      axios
        .post(Base_URL.Actual_URL + "editallaccountnew", {
          Edit: 2,
          id: index,
        })
        .then((response) => {
          this.email = response.data.userlist;
          this.id = this.email[0].id;
          this.$router.push({
            name: "editallaccountname",
            params: { id: this.id },
          });
        });
    },
  },
};
</script>
