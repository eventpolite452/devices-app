import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import Devices from './views/Devices.vue';
import Search from './views/Search.vue';
import AddDevice from './views/AddDevice.vue';
import UpdateDevice from './views/UpdateDevice.vue';

const About = { template: '<div>About</div>' };

const routes: RouteRecordRaw[] = [
  // Define your routes here
  { path: '/', component: Devices },
  { path: '/search', component: Search },
  { path: '/addDevice', component: AddDevice },
  { path: '/updateDevice', component: UpdateDevice },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
