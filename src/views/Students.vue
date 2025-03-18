<template>
  <div class="container mt-3">
    <h1 class="text-white">Students</h1>

    <button
        class="btn m-2"
        :class="showList ? 'btn-dark' : 'btn-outline-dark'"
        @click="showList = true"
    >
      Students List
    </button>

    <button
        class="btn m-2"
        :class="!showList ? 'btn-dark' : 'btn-outline-dark'"
        @click="showList = false"
    >
      Add Student
    </button>

    <h3 v-if="showList">Students List</h3>
    <StudentList v-if="showList" />
    <StudentForm v-else />
  </div>
</template>

<script>
import StudentList from '../components/StudentList.vue';
import StudentForm from '../components/StudentForm.vue';

export default {
  components: { StudentList, StudentForm },
  data() {
    return {
      showList: true,
    };
  },
};
</script>
