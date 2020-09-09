import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: "Dashboard"
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue'),
    meta: {
      title: "Statistics"
    }
  },
  {
    path: '/offers',
    name: 'Offers',
    component: () => import('../views/Offers.vue'),
    meta: {
      title: "Offers"
    }
  },
  {
    path: '/offer',
    name: 'Offer',
    component: () => import('../views/Offer.vue'),
    meta: {
      title: "Offer"
    }
  },
  {
    path: '/advertisers',
    name: 'Advertisers',
    component: () => import('../views/Advertisers.vue'),
    meta: {
      title: "Advertisers"
    }
  },
  {
    path: '/smartlinks',
    name: 'SmartLinks',
    component: () => import('../views/SmartLinks.vue'),
    meta: {
      title: "SmartLinks"
    }
  },
  {
    path: '/automation',
    name: 'Automation',
    component: () => import('../views/Automation.vue'),
    meta: {
      title: "Automation"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
})

export default router
