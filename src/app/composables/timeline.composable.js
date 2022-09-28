// usecases
import { UseGetTimelineMessages } from "@/domains/twitter/core";

// constants
import { API_BASE_PATH } from "@/app/partials/constants";
import { TIMELINE_SUCCESS } from "@/app/partials/messages";
import { uuid } from "@/app/partials/helpers";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { CHANGE_USERS_LIST } from "@/domains/twitter/infrastructure/store/actions";

const baseUrls = [`${API_BASE_PATH}following/true`, `${API_BASE_PATH}owner/true`];
export const useTimeline = async (urls = baseUrls) => {
  const twitterStore = useTwitterStore();

  await UseGetTimelineMessages({
    request: { urls },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message: TIMELINE_SUCCESS },
    $store: twitterStore,
    $actionName: CHANGE_USERS_LIST,
  });
};
