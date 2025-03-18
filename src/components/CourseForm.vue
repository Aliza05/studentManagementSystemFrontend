<template>
  <h2 class="text-left text-dark mb-4">Add Course</h2>

  <form @submit.prevent="addCourse" class="row g-3">
    <div class="col-md-3">
      <input v-model="course.name" type="text" class="form-control" placeholder="Course Name" required />
    </div>
    <div class="col-md-3">
      <input v-model="course.code" type="text" class="form-control" placeholder="Code" required />
    </div>
    <div class="col-md-2">
      <input v-model="course.instructor" type="text" class="form-control" placeholder="Instructor" required />
    </div>
    <div class="col-md-2">
      <input v-model="course.credits" type="number" class="form-control" required />
    </div>
    <div class="col-md-2">
      <button type="submit" class="btn btn-primary">Add Course</button>
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
import axios from '../api.js';

export default {
  data() {
    return {
      course: {
        name: '',
        code: '',
        instructor: '',
        credits: '',
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    addCourse() {
      axios.post('/courses/', this.course)
          .then(() => {
            this.successMessage = "Course added successfully!";
            this.course = { name: '', code: '', instructor: '', credits: '' };
            this.$emit('studentAdded');
            setTimeout(() => this.successMessage = '', 3000);
            window.location.reload();
          })
          .catch(error => {
            this.errorMessage = "Error adding course!";
            console.error(error);
            setTimeout(() => this.errorMessage = '', 3000);
          });
    },
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
