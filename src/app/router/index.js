import { createRouter, createWebHistory } from "vue-router";

// composables
import { useTimeline } from "@/app/composables/timeline.composable";
import { useUsersFollower } from "@/app/composables/users.composable";

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
        try {
          await useTimeline();
          await useUsersFollower();
          next();
        } catch (e) {
          next("/error");
        }
      },
    },
    {
      path: "/error",
      name: "error",
      components: {
        default: () => import("@/app/ui/views/error-page/ErrorPage.vue"),
      },
    },
  ],
});

export default router;
