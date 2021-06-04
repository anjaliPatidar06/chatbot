<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="CpuIcon"
          icon-right
          statistic="1 Active"
          :statisticTitle="rowdata"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ServerIcon"
          icon-right
          statistic="1 Active"
          :statisticTitle="chat"
          color="success"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ActivityIcon"
          icon-right
          statistic="1 Active"
          :statisticTitle="liveagent"
          color="danger"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="ActivityIcon"
          icon-right
          statistic="1 Active"
          :statisticTitle="userdatanew"
          color="danger"
        />
      </div>
    </div>
    <div class="vx-row">
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
    </div>
    <!-- <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2">

        <vue-apex-charts type="line" height="350" style="background-color:white;" 
        class="p-4"
        :options="lineChartSimple.chartOptions" :series="lineChartSimple.series"></vue-apex-charts>
    </div>
         <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/2">

        <vue-apex-charts type="line" height="350" style="background-color:white;" 
        class="p-4"
        :options="lineChartSimple2.chartOptions" :series="lineChartSimple2.series"></vue-apex-charts>
    </div>
    </div> -->
  </div>
</template>
<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import VueApexCharts from "vue-apexcharts";
import analyticsData from "./ui-elements/card/analyticsData.js";
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue";
import axios from "axios";
import { Base_URL } from "./../../api.config";

export default {
  components: {
    StatisticsCardLine,
    VueApexCharts,
    ChangeTimeDurationDropdown,
  },
  data() {
    return {
      // Area charts
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
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
       lineChartSimple2: {
        series: [{
          name: "Chatbot User",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chartOptions: {
          chart: {
            height: 350,
            zoom: {
              enabled: false
            }
          },
          colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'No. of Chatbot User by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }
        }
      },
      lineChartSimple: {
        series: [{
          name: "Leads",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chartOptions: {
          chart: {
            height: 350,
            zoom: {
              enabled: false
            }
          },
          colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'No. of Leads by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }
        }
      }
    }
  },
  mounted() {
    var chatbot_id = localStorage.getItem("chatbot_id");

    axios
      .post(Base_URL.Actual_URL + "homeuser", {
          company_id : localStorage.company_id ,
        chatbot_id: chatbot_id,
      })
      .then((response) => {
        this.rowdata = response.data.userlist;

        this.chat = response.data.Manager;
        this.liveagent = response.data.Agent;

        this.userdatanew = response.data.userdatalist;
      });
  },
  created() {
    // Subscribers gained
    // this.$http
    //   .get("/api/card/card-statistics/subscribers")
    //   .then((response) => {
    //     this.subscribersGained = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Revenue Generated
    // this.$http
    //   .get("/api/card/card-statistics/revenue")
    //   .then((response) => {
    //     this.revenueGenerated = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Sales
    // this.$http
    //   .get("/api/card/card-statistics/sales")
    //   .then((response) => {
    //     this.quarterlySales = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Orders
    // this.$http
    //   .get("/api/card/card-statistics/orders")
    //   .then((response) => {
    //     this.ordersRecevied = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Site Traffic gained
    // this.$http
    //   .get("/api/card/card-statistics/site-traffic")
    //   .then((response) => {
    //     this.siteTraffic = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Active Users
    // this.$http
    //   .get("/api/card/card-statistics/active-users")
    //   .then((response) => {
    //     this.activeUsers = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Site Traffic gained
    // this.$http
    //   .get("/api/card/card-statistics/newsletter")
    //   .then((response) => {
    //     this.newsletter = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Browser Analytics
    // this.$http
    //   .get("/api/card/card-analytics/browser-analytics")
    //   .then((response) => {
    //     this.browserStatistics = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Client Retention
    // this.$http
    //   .get("/api/card/card-analytics/client-retention")
    //   .then((response) => {
    //     this.clientRetentionBar = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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


