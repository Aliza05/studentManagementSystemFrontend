<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const route = useRoute();

watch(route, (to, from) => {
  console.log("Route changed from:", from.fullPath, "to:", to.fullPath);
});
</script>

<template>
  <div>
    <nav>
      <ul class="bg-color">
        <li><router-link to="/">Home</router-link></li>
        <li class="text-dark"><router-link to="/students">Students</router-link></li>
        <li><router-link to="/courses">Courses</router-link></li>
        <li><router-link to="/enrollments">Enrollments</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
      </ul>
      <router-view></router-view>
    </nav>

  </div>
</template>

<style scoped>
body {
  font-family: "Times New Roman", sans-serif;
}
.bg-color{
  background: linear-gradient(to right, #1E3A8A, #87CEFA);
}

nav {
  background: linear-gradient(to right, #87CEFA, #1E3A8A);
  padding: 10px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 15px;
  padding: 0;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
