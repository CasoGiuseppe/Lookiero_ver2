import { createRouter, createWebHistory } from "vue-router";

// composables
import { useTimeline } from "@/app/composables/timeline.composable";
import { useUsersFollower } from "@/app/composables/follower.composable";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: () => import("@/app/ui/views/twitter-layout/TwitterLayout.vue"),
      },
      beforeEnter: async (to, from, next) => {
        // 1. get timeline messages
        // 2. get following users
        try {
          await useTimeline();
          await useUsersFollower();
          next();
        } catch (e) {
          console.log(e);
          next("/error");
        }
      },
    },
    {
      path: "/error",
      name: "error",
      components: {
        default: () => import("@/app/ui/views/error/Error.vue"),
      },
    },
  ],
});

export default router;
