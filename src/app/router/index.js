import { createRouter, createWebHistory } from "vue-router";

// constants
import { API_BASE_PATH } from "@/app/partials/constants";
import { GENERIC_ERROR, TIMELINE_SUCCESS, BASE_NOTIFICATION_OBJ as notification } from "@/app/partials/messages";

// usecases
import { UseGetTimelineMessages, UseHandleUserByState } from "@/domains/twitter/core";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { CHANGE_USERS_LIST } from "@/domains/twitter/infrastructure/store/actions";

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
        // pinia
        const twitterStore = useTwitterStore();

        // usecases
        const { getUserByOwnState } = UseHandleUserByState();

        // 1. get timeline messages
        // 2. get following users
        try {
          await UseGetTimelineMessages({
            request: {
              urls: [`${API_BASE_PATH}following/true`, `${API_BASE_PATH}owner/true`],
            },
            onErrorState: notification({ type: "error", message: GENERIC_ERROR }),
            onInfoState: notification({ type: "info", message: TIMELINE_SUCCESS }),
            $store: twitterStore,
            $actionName: CHANGE_USERS_LIST,
          });

          await getUserByOwnState({
            request: { url: `${API_BASE_PATH}following/false` },
            onErrorState: notification({ type: "error", message: GENERIC_ERROR }),
            onInfoState: notification({ type: "info", message: "ciccio pasticcio" }),
          });

          await getUserByOwnState({
            request: { url: `${API_BASE_PATH}following/true` },
            onErrorState: notification({ type: "error", message: GENERIC_ERROR }),
            onInfoState: notification({ type: "info", message: "ciccio pasticcio2" }),
          });
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
