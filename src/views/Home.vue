<template>
  <div v-if="userRole !== 'Superadmin'">
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="CpuIcon"
          icon-right
          :statistic="rowdata"
          statisticTitle="Number of User"
          id="div-with-loading"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ServerIcon"
          icon-right
          :statistic="chat"
          statisticTitle="Number of Chatbot Manager"
          color="success"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ActivityIcon"
          icon-right
          :statistic="liveagent"
          statisticTitle="Number of Live Agent"
          color="danger"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ActivityIcon"
          icon-right
          :statistic="userdatanew"
          statisticTitle="Number of Chatbot"
          color="danger"
        />
      </div>
    </div>
    <!-- <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="AlertOctagonIcon"
          icon-right
          statistic="3"
          statisticTitle="Number of Leads"
          color="warning"
        />
      </div>
    </div> -->
    <vx-card>
      <div class="vx-row">
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2">
          <h6>Select Chatbot Name</h6>
          <v-select
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            class="w-1/2"
            label="chatbotname"
            :options="chatbotName"
            @input="selectChatbot"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2">
          <vue-apex-charts
            type="line"
            height="350"
            class="pt-6"
            :options="lineChartSimple.chartOptions"
            :series="lineChartSimple.series"
            ref="chart1"
          ></vue-apex-charts>
          <!-- </vx-card> -->
        </div>
        <!-- <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2">

        <vue-apex-charts type="line" height="350" style="background-color:white;" 
        class="p-4"
        :options="lineChartSimple2.chartOptions" :series="lineChartSimple2.series"></vue-apex-charts>
    </div> -->
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2">
          <!-- <vx-card> -->
          <!-- <h6>Select Chatbot Name</h6>
          <v-select
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            class="w-1/2"
            label="chatbotname"
            :options="chatbotName"
            v-model="chatbotSelected2"
            @input="selectChatbot2"
          /> -->
          <vue-apex-charts
            type="line"
            height="350"
            style="background-color: white"
            class="pt-4"
            :options="lineChartSimple2.chartOptions"
            :series="lineChartSimple2.series"
            ref="chart2"
          ></vue-apex-charts>
          <!-- </vx-card> -->
        </div>
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2 mt-4 pt-4">
          <!-- <vx-card> -->
          <!-- <h6>Select Chatbot Name</h6>
          <v-select
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            class="w-1/2"
            label="chatbotname"
            :options="chatbotName"
            v-model="chatbotSelected3"
            @input="selectChatbot3"
          /> -->
          <vue-apex-charts
            type="line"
            height="350"
            style="background-color: white"
            class="pt-4"
            :options="unansweredQuestionChart.chartOptions"
            :series="unansweredQuestionChart.series"
            ref="chart3"
          ></vue-apex-charts>
          <!-- </vx-card> -->
        </div>
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2 mt-4 pt-4">
          <!-- <vx-card> -->
          <!-- <h6>Select Chatbot Name</h6>
            <v-select
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="w-1/2"
              label="chatbotname"
              :options="chatbotName"
              v-model="chatbotSelected5"
              @input="selectChatbot5"
            /> -->
          <vue-apex-charts
            type="line"
            height="350"
            style="background-color: white"
            class="pt-4"
            :options="visitorChartData.chartOptions"
            :series="visitorChartData.series"
            ref="chart5"
          ></vue-apex-charts>
          <!-- </vx-card> -->
        </div>
      </div>
    </vx-card>
    <vx-card class="mt-4">
      <div class="vx-row">
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2 mt-4 pt-4">
          <!-- <span class="sr-only">Loading...</span> -->
          <h6>Select Agent Name</h6>
          <v-select
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            class="w-1/2"
            label="Name"
            :options="agentList"
            v-model="chatbotSelected4"
            @input="selectChatbot4"
          />
          <vue-apex-charts
            style="background-color: white"
            class="pt-4"
            type="line"
            height="350"
            :options="lineAreaChartSpline.chartOptions"
            :series="lineAreaChartSpline.series"
            ref="chart4"
          ></vue-apex-charts>
          <!-- <div class="spinner-border text-muted"></div> -->
        </div>
      </div>
    </vx-card>
  </div>
  <div v-else></div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import VueApexCharts from "vue-apexcharts";
import analyticsData from "./ui-elements/card/analyticsData.js";
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue";
import axios from "axios";
import { Base_URL } from "./../../api.config";
import vSelect from "vue-select";
var moment = require("moment-timezone");

export default {
  components: {
    StatisticsCardLine,
    VueApexCharts,
    ChangeTimeDurationDropdown,
    "v-select": vSelect,
  },
  data() {
    return {
      // Area charts
      activeLoading: false,
      userRole: localStorage.user_role,
      moment,
      agentList: [],
      chatbotSelected5: "",
      chatbotSelected4: "",
      chatbotSelected3: "",
      chatbotSelected2: "",
      chatbotSelected: "",
      chatbotName: [],
      chatbotUserGraphData: [],
      subscribersGained: {},
      revenueGenerated: {},
      quarterlySales: {},
      ordersRecevied: {},
      browserStatistics: [],
      clientRetentionBar: {},
      rowdatas: [],
      rowdata: [],
      chat: [],
      liveagent: [],
      userdatanew: [],
      // Line Charts
      siteTraffic: {},
      activeUsers: {},
      newsletter: {},
      analyticsData,
      themeColors: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],

      lineChartSimple2: {
        series: [
          {
            name: "Chatbot User",
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          colors: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "No. of Chatbot User by Month",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          noData: {
            text: "No initial data available...",
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "oct",
              "Nov",
              "Dec",
            ],
          },
        },
      },
      lineChartSimple: {
        series: [
          {
            name: "Leads",
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            zoom: {
              enabled: false,
            },
            events: {
              load() {
                this.showLoading();
              },
            },
          },
          colors: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "No. of Leads by Month",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          noData: {
            text: "No initial data available...",
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "oct",
              "Nov",
              "Dec",
            ],
          },
        },
      },
      unansweredQuestionChart: {
        series: [
          {
            name: "unanswered question report",
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          colors: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "No. of Unanswered Questions",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          noData: {
            text: "No initial data available...",
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "oct",
              "Nov",
              "Dec",
            ],
          },
        },
      },
      lineAreaChartSpline: {
        series: [
          {
            name: "series1",
            data: [],
          },
        ],
        chartOptions: {
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          noData: {
            text: "No initial data available...",
          },
          title: {
            text: "Number of users interacted with Agents",
            align: "left",
          },
          colors: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],
          xaxis: {
            type: "date",
            categories: [],
            labels: {
              rotate: -15,
              rotateAlways: true,
              formatter: function (val) {
                return moment(new Date(val)).format("DD MMM");
              },
            },
          },
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
        },
      },
      visitorChartData: {
        series: [
          {
            name: "visitor_report",
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            zoom: {
              enabled: true,
            },
          },
          noData: {
            text: "No initial data available...",
          },
          colors: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "No. of Chatbot Visitor",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            type: "date",
            categories: [],
            labels: {
              rotate: -15,
              rotateAlways: true,
              formatter: function (val) {
                return moment(new Date(val)).format("DD MMM");
              },
            },
          },
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
        },
      },
    };
  },
  mounted() {
    this.homeuserData();
    this.chatbotList();
    this.agentListData();
    // this.renderChart(this.lineAreaChartSpline, this.options);
  },
  methods: {
    selectChatbot(e) {
      this.leadGraphData(e.id);
      this.userGraphData(e.id);
      this.unansweredQustionGraphData(e.id);
      this.visitorReport(e.id);
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
    },
    selectChatbot2(e) {
      this.userGraphData(e.id);
    },
    selectChatbot3(e) {
      this.unansweredQustionGraphData(e.id);
    },
    selectChatbot4(e) {
      //             this.activeLoading = true

      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
      this.liveAgentReport(e.Id);
    },
    selectChatbot5(e) {
      this.visitorReport(e.id);
    },
    agentListData() {
      axios
        .post(Base_URL.Actual_URL + "liveagent_list", {
          company_id: localStorage.company_id,
        })
        .then((response) => {
          this.agentList = response.data.agent_list;
        });
    },
    visitorReport(chatbotID) {
      axios
        .post(Base_URL.Actual_URL + "visitor_report", {
          chatbot_id: chatbotID,
          company_id: localStorage.company_id,
        })
        .then((response) => {
          var data = response.data.Visiter_data;
          var finalArray = [];
          for (const [key, value] of Object.entries(data)) {
            for (var key1 in value) {
              var value1 = value[key1];
              finalArray.push({
                x: key1,
                y: value1,
              });
              this.visitorChartData.chartOptions.xaxis.categories.push(key1);
              this.visitorChartData.series[0].data.push(value1);
            }
          }
          this.$refs.chart5.updateSeries([
            {
              data: finalArray,
            },
          ]);
        });
    },
    liveAgentReport(agentID) {
      axios
        .post(Base_URL.Actual_URL + "liveagent_report", {
          agent_id: agentID,
          company_id: localStorage.company_id,
        })
        .then((response) => {
          var data = response.data.agent_user_count;
          var finalArray = [];
          for (const [key, value] of Object.entries(data)) {
            for (var key1 in value) {
              var value1 = value[key1];
              finalArray.push({
                x: key1,
                y: value1,
              });
            }
          }
          this.$refs.chart4.updateSeries([
            {
              data: finalArray,
            },
          ]);
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
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
    unansweredQustionGraphData(chatbotID) {
      axios
        .post(Base_URL.Actual_URL + "unans_question_report", {
          chatbot_id: chatbotID,
          company_id: localStorage.company_id,
        })
        .then((response) => {
          this.$refs.chart3.updateSeries([
            {
              data: response.data.unans_count,
            },
          ]);
        });
    },
    chatbotList() {
      axios
        .post(Base_URL.Actual_URL + "chatbottable", {
          company_id: localStorage.company_id,
        })
        .then((response) => {
          this.chatbotName = response.data.userlist;
        });
    },
    homeuserData() {
      var chatbot_id = localStorage.getItem("chatbot_id");
      axios
        .post(Base_URL.Actual_URL + "homeuser", {
          company_id: localStorage.company_id,
          chatbot_id: chatbot_id,
        })
        .then((response) => {
          this.rowdata = response.data.userlist;

          this.chat = response.data.Manager;
          this.liveagent = response.data.Agent;

          this.userdatanew = response.data.userdatalist;
        });
    },
    userGraphData(chatbotId) {
      axios
        .post(Base_URL.Actual_URL + "user_count_get", {
          chatbot_id: chatbotId,
          company_id: localStorage.company_id,
        })
        .then((response) => {
          this.$refs.chart2.updateSeries([
            {
              data: response.data.Data,
            },
          ]);
        });
    },
    leadGraphData(chatbotId) {
      axios
        .post(Base_URL.Actual_URL + "Lead_count_get", {
          chatbot_id: chatbotId,
          company_id: parseInt(localStorage.company_id),
        })
        .then((response) => {
          this.$refs.chart1.updateSeries([
            {
              data: response.data.Data,
            },
          ]);
          setTimeout(() => {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }, 1000);
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
  },
};
</script>
<style lang="scss">
#demo-card-analytics {
  .tasks-today-container {
    .tasks-today__task {
      transition: background 0.15s ease-out;
      .tasks-today__actions {
        display: none;
      }

      &:hover {
        background: rgba(var(--vs-primary), 0.04);
        .tasks-today__actions {
          display: flex;
        }
      }
    }
  }
}
</style>
