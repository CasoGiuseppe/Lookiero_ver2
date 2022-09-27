import { createRouter, createWebHistory } from "vue-router";

// constants
import { API_BASE_PATH } from "@/assets/partials/constants";
import { GENERIC_ERROR, API_SUCCESS, BASE_NOTIFICATION_OBJ as notification } from "@/app/partials/messages";

// usecases
import { UseGetTimelineMessages } from "@/domains/twitter/core";

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

        try {
          await UseGetTimelineMessages({
            request: {
              urls: [`${API_BASE_PATH}following/true`, `${API_BASE_PATH}owner/true`],
            },
            onErrorState: notification({ type: "error", message: GENERIC_ERROR }),
            onInfoState: notification({ type: "info", message: API_SUCCESS }),
            $store: twitterStore,
            $actionName: CHANGE_USERS_LIST,
          });
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
        default: () => import("@/app/ui/views/error/Error.vue"),
      },
    },
  ],
});

export default router;
