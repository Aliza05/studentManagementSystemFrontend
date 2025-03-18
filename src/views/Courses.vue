<template>
  <div class="container mt-3">
    <h1 class="text-white">Courses</h1>

    <button
        class="btn m-2"
        :class="showList ? 'btn-dark' : 'btn-outline-dark'"
        @click="showList = true"
    >
      Courses List
    </button>

    <button
        class="btn m-2"
        :class="!showList ? 'btn-dark' : 'btn-outline-dark'"
        @click="showList = false"
    >
      Add Course
    </button>

    <h3 v-if="showList">Courses List</h3>
    <CourseList v-if="showList" />
    <CourseForm v-else />
  </div>
</template>

<script>
import CourseList from '../components/CourseList.vue';
import CourseForm from '../components/CourseForm.vue';

export default {
  components: { CourseList, CourseForm },
  data() {
    return {
      showList: true,
    };
  },
};
</script>
