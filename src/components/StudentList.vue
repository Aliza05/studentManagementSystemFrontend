<template>
  <table class="table table-bordered">
    <thead class="thead-dark">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Student ID</th>
      <th>Date of Birth</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="student in students" :key="student.id">
      <template v-if="editingStudentId === student.id">
        <td><input v-model="editedStudent.name" class="form-control" /></td>
        <td><input v-model="editedStudent.email" class="form-control" /></td>
        <td><input v-model="editedStudent.student_id" class="form-control" /></td>
        <td><input v-model="editedStudent.dob" type="date" class="form-control" /></td>
        <td>
          <button class="btn btn-success btn-sm" @click="saveEdit(student.id)">Save</button>
          <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
        </td>
      </template>

      <template v-else>
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.student_id }}</td>
        <td>{{ student.dob }}</td>
        <td>
          <button class="btn btn-warning btn-sm" @click="editStudent(student)">Edit</button>
          <button class="btn btn-danger btn-sm" @click="deleteStudent(student.id)">Delete</button>
        </td>
      </template>
    </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "../api.js";

export default {
  data() {
    return {
      students: [],
      editingStudentId: null,
      editedStudent: {},
    };
  },
  methods: {
    fetchStudents() {
      axios
          .get("/students/")
          .then((response) => {
            this.students = response.data;
          })
          .catch((error) => console.error(error));
    },
    deleteStudent(id) {
      axios
          .delete(`/students/${id}/`)
          .then(() => this.fetchStudents())
          .catch((error) => console.error(error));
    },
    editStudent(student) {
      this.editingStudentId = student.id;
      this.editedStudent = { ...student };
    },
    saveEdit(id) {
      axios
          .patch(`/students/${id}/`, this.editedStudent)
          .then(() => {
            this.fetchStudents();
            this.editingStudentId = null;
          })
          .catch((error) => console.error(error));
    },
    cancelEdit() {
      this.editingStudentId = null;
      this.editedStudent = {};
    },
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style>
.btn-sm {
  margin-right: 5px;
  margin-left: 5px;
}

input.form-control {
  width: 100%;
}
</style>
