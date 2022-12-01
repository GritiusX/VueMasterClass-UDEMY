import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
// import JobsResultsView from "@/views/JobsResultsView.vue";
// import JobView from "@/views/JobView.vue";

const HomeView = () => import("@/views/HomeView.vue"); //this way you have lazyLoading of the components
const JobsResultsView = () =>
  import(/* webpackChunkName: "jobs" */ "@/views/JobsResultsView.vue");
const JobView = () =>
  import(/* webpackChunkName: "jobs" */ "@/views/JobView.vue"); //with the comment, you lazyLoad all at the same time if they have the same name
const TeamsView = () => import("@/views/TeamsView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobsResultsView,
  },
  {
    path: "/jobs/results/:id",
    name: "JobListing",
    component: JobView,
  },
  {
    path: "/teams",
    name: "Teams",
    component: TeamsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
// query params example: jobs/results/?distance=50%hl=en_US%location=Ohio,%20USA&q=Vue%20Developer
// ? indicates how the query starts
// distance=50 is one param, like hl= or location= or q= , all of this are params
// %20 === keyboard space ===> (it can also be the   +   symbol)
// & === and -- it is used to add more params to the query string
