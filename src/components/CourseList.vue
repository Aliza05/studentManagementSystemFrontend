<template>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="thead-dark">
        <tr>
          <th>Course Name</th>
          <th>Course Code</th>
          <th>Instructor</th>
          <th>Credits</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="course in courses" :key="course.id">
          <!-- Edit Mode -->
          <template v-if="editingCourseId === course.id">
            <td><input v-model="editedCourse.name" class="form-control" /></td>
            <td><input v-model="editedCourse.code" class="form-control" /></td>
            <td><input v-model="editedCourse.instructor" class="form-control" /></td>
            <td><input v-model="editedCourse.credits" type="number" class="form-control" /></td>
            <td>
              <button class="btn btn-success btn-sm" @click="saveEdit(course.id)">Save</button>
              <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
            </td>
          </template>

          <!-- View Mode -->
          <template v-else>
            <td>{{ course.name }}</td>
            <td>{{ course.code }}</td>
            <td>{{ course.instructor }}</td>
            <td>{{ course.credits }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editCourse(course)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteCourse(course.id)">Delete</button>
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
      courses: [],
      editingCourseId: null,
      editedCourse: {},
    };
  },
  methods: {
    fetchCourses() {
      axios.get('/courses/')
          .then(response => {
            this.courses = response.data;
          })
          .catch(error => console.error(error));
    },
    deleteCourse(id) {
      axios.delete(`/courses/${id}/`)
          .then(() => this.fetchCourses())
          .catch(error => console.error(error));
    },
    editCourse(course) {
      this.editingCourseId = course.id;
      this.editedCourse = { ...course };
    },
    saveEdit(id) {
      axios
          .patch(`/courses/${id}/`, this.editedCourse)
          .then(() => {
            this.fetchCourses();
            this.editingCourseId = null;
          })
          .catch((error) => console.error(error));
    },
    cancelEdit() {
      this.editingCourseId = null;
      this.editedCourse = {};
    },
  },
  mounted() {
    this.fetchCourses();
  },
};
</script>

<style scoped>
.table {
  background: #fff;
}

.btn-sm {
  padding: 5px 10px;
}
</style>
