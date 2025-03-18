<template>
  <h2 class="text-left text-dark mb-4">Add Enrollment</h2>

  <form @submit.prevent="addEnrollment" class="row g-3">
    <!-- Student Selection -->
    <div class="col-md-3">
      <select v-model="enrollment.student_id" class="form-control" required>
        <option value="" disabled>Select Student</option>
        <option v-for="student in students" :key="student.id" :value="student.id">
          {{ student.name }}
        </option>
      </select>
    </div>

    <!-- Course Selection -->
    <div class="col-md-3">
      <select v-model="enrollment.course_id" class="form-control" required>
        <option value="" disabled>Select Course</option>
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.name }}
        </option>
      </select>
    </div>

    <div class="col-md-2">
      <input v-model="enrollment.enrollment_date" type="date" class="form-control" required />
    </div>

    <div class="col-md-2">
      <button type="submit" class="btn btn-primary">Add Enrollment</button>
    </div>
  </form>

  <div v-if="successMessage" class="alert alert-success mt-3">
    {{ successMessage }}
  </div>
  <div v-if="errorMessage" class="alert alert-danger mt-3">
    {{ errorMessage }}
  </div>
</template>

<script>
import axios from "../api.js";

export default {
  data() {
    return {
      students: [],
      courses: [],
      enrollment: {
        student_id: "",
        course_id: "",
        enrollment_date: "",
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async fetchStudentsAndCourses() {
      try {
        const [studentsResponse, coursesResponse] = await Promise.all([
          axios.get("/students/"),
          axios.get("/courses/"),
        ]);
        this.students = studentsResponse.data;
        this.courses = coursesResponse.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async addEnrollment() {
      try {
        await axios.post("/enrollments/", {
          student: this.enrollment.student_id,
          course: this.enrollment.course_id,
          enrollment_date: this.enrollment.enrollment_date
        });
        this.successMessage = "Enrollment added successfully!";
        this.enrollment = { student_id: "", course_id: "", enrollment_date: "" };
        this.$emit("enrollmentAdded");
        setTimeout(() => (this.successMessage = ""), 3000);
      } catch (error) {
        this.errorMessage = error.response?.data || "Error adding enrollment!";
        console.error(error);
        setTimeout(() => (this.errorMessage = ""), 3000);
      }
    }
  },
  mounted() {
    this.fetchStudentsAndCourses();
  },
};
</script>

<style scoped>

.btn {
  width: 100%;
}

.alert {
  text-align: center;
}

</style>
