<template>
  <div class="container mt-3">
    <h1 class="text-white">Enrollments</h1>

    <button
        class="btn m-2"
        :class="showList ? 'btn-dark' : 'btn-outline-dark'"
        @click="showList = true"
    >
      Enrollments List
    </button>

    <button
        class="btn m-2"
        :class="!showList ? 'btn-dark' : 'btn-outline-dark'"
        @click="showList = false"
    >
      Add Enrollment
    </button>

    <h3 v-if="showList">Enrollments List</h3>
    <EnrollmentList v-if="showList" />
    <EnrollmentForm v-else />
  </div>
</template>

<script>
import EnrollmentList from '../components/EnrollmentList.vue';
import EnrollmentForm from '../components/EnrollmentForm.vue';

export default {
  components: { EnrollmentList, EnrollmentForm },
  data() {
    return {
      showList: true,
    };
  },
};
</script>
