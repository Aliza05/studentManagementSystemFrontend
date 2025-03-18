<template>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="thead-dark">
        <tr>
          <th>Student</th>
          <th>Course</th>
          <th>Enrollment Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="enrollment in enrollments" :key="enrollment.id">
          <template v-if="editingEnrollmentId === enrollment.id">
            <td><input v-model="editedEnrollment.student_name" class="form-control" /></td>
            <td><input v-model="editedEnrollment.course_name" class="form-control" /></td>
            <td><input v-model="editedEnrollment.enrollment_date" type="date" class="form-control" /></td>
            <td>
              <button class="btn btn-success btn-sm" @click="saveEdit(enrollment.id)">Save</button>
              <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
            </td>
          </template>

          <template v-else>
            <td>{{ enrollment.student_name }}</td>
            <td>{{ enrollment.course_name }}</td>
            <td>{{ enrollment.enrollment_date }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editEnrollment(enrollment)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteEnrollment(enrollment.id)">Delete</button>
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from '../api.js';

export default {
  data() {
    return {
      enrollments: [],
      editingEnrollmentId: null,
      editedEnrollment: {},
    };
  },
  methods: {
    fetchEnrollments() {
      axios.get('/enrollments/')
          .then(response => {
            this.enrollments = response.data;
          })
          .catch(error => console.error(error));
    },
    deleteEnrollment(id) {
      axios.delete(`/enrollments/${id}/`)
          .then(() => this.fetchEnrollments())
          .catch(error => console.error(error));
    },
    editEnrollment(enrollment) {
      this.editingEnrollmentId = enrollment.id;
      this.editedEnrollment = { ...enrollment };
    },
    saveEdit(id) {
      axios
          .patch(`/enrollments/${id}/`, this.editedEnrollment)
          .then(() => {
            this.fetchEnrollments();
            this.editingEnrollmentId = null;
          })
          .catch((error) => console.error(error));
    },
    cancelEdit() {
      this.editingEnrollmentId = null;
      this.editedEnrollment = {};
    },
  },
  mounted() {
    this.fetchEnrollments();
  },
};
</script>


<style scoped>

.table {
  background: #fff;
}

</style>
