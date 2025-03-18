<template>
    <h2 class="text-left text-dark mb-4">Add Student</h2>

    <form @submit.prevent="addStudent" class="row g-3">
      <div class="col-md-3">
        <input v-model="student.name" type="text" class="form-control" placeholder="Full Name" required />
      </div>
      <div class="col-md-3">
        <input v-model="student.email" type="email" class="form-control" placeholder="Email" required />
      </div>
      <div class="col-md-2">
        <input v-model="student.student_id" type="text" class="form-control" placeholder="Student ID" required />
      </div>
      <div class="col-md-2">
        <input v-model="student.dob" type="date" class="form-control" required />
      </div>
      <div class="col-md-2">
        <button type="submit" class="btn btn-primary">Add Student</button>
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
      student: {
        name: '',
        email: '',
        student_id: '',
        dob: '',
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    addStudent() {
      axios.post('/students/', this.student)
          .then(() => {
            this.successMessage = "Student added successfully!";
            this.student = { name: '', email: '', student_id: '', dob: '' };
            this.$emit('studentAdded');
            setTimeout(() => this.successMessage = '', 3000);
            window.location.reload();
          })
          .catch(error => {
            this.errorMessage = "Error adding student!";
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
