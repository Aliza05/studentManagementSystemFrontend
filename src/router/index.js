import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Students from '../views/Students.vue';
import Courses from '../views/Courses.vue';
import Enrollments from '../views/Enrollments.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/students', component: Students },
    { path: '/courses', component: Courses },
    { path: '/enrollments', component: Enrollments },
    { path: '/dashboard', component: Dashboard }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
