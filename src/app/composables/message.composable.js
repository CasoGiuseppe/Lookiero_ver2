// usecases
import { UseAddMessage } from "@/domains/twitter/core";

// service
import { get } from "@/app/services/http.services";

// constants
import { API_BASE_PATH, API_DELAY_MAX } from "@/app/partials/constants";
import { MESSAGE_SUCCESS } from "@/app/partials/messages";
import { uuid } from "@/app/partials/helpers";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { CHANGE_SELECTED_USER, CHANGE_NEW_MESSAGE } from "@/domains/twitter/infrastructure/store/actions";

// helper
import { wait } from "@/app/partials/helpers";

const twitterStore = useTwitterStore();
export const useMessage = async ({ message = MESSAGE_SUCCESS, payload = {}, callbacks } = {}) => {
  const user = await get(`${API_BASE_PATH}owner/true`);
  const { id } = user[0];
  const { text } = payload;
  await UseAddMessage({
    request: { url: `${API_BASE_PATH}id/${id}`, payload },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message },
    callbacks,
  });

  twitterStore[CHANGE_SELECTED_USER]({ user: {} });
  twitterStore[CHANGE_NEW_MESSAGE]({ message: text.replace(/ /g, "") });

  await wait(API_DELAY_MAX);
  twitterStore[CHANGE_NEW_MESSAGE]();
};
