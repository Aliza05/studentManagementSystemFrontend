<template>
  <div class="dashboard-container">

    <div class="chart-container">
      <h3>Students per Course</h3>
      <canvas ref="barChartCanvas" class="chart"></canvas>
    </div>

    <div class="chart-container">
      <h3>Distribution of Students Across Courses</h3>
      <canvas ref="pieChartCanvas" class="chart"></canvas>
    </div>

  </div>
</template>

<script>
import axios from '../api.js';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      courseStats: {},
      barChart: null,
      pieChart: null
    };
  },
  methods: {
    fetchStats() {
      axios.get('/enrollments/stats/')
          .then(response => {
            this.courseStats = response.data;
            this.renderBarChart();
            this.renderPieChart();
          })
          .catch(error => console.error(error));
    },
    renderBarChart() {
      if (this.barChart) {
        this.barChart.destroy();
      }
      const ctx = this.$refs.barChartCanvas.getContext('2d');
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.courseStats),
          datasets: [{
            label: 'Number of Students',
            data: Object.values(this.courseStats),
            backgroundColor: 'blue',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    },
    renderPieChart() {
      if (this.pieChart) {
        this.pieChart.destroy();
      }
      const ctx = this.$refs.pieChartCanvas.getContext('2d');
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.courseStats),
          datasets: [{
            data: Object.values(this.courseStats),
            backgroundColor: ['red', 'blue', 'green', 'orange', 'purple'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  },
  mounted() {
    this.fetchStats();
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.chart-container {
  background: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart {
  width: 100%;
  max-width: 500px;
  height: 300px !important;
  display: block;
  margin: 0 auto;
}

</style>
