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
import { GET_SELECTED_USER } from "@/domains/twitter/infrastructure/store/getters";

// helper
import { wait } from "@/app/partials/helpers";

const twitterStore = useTwitterStore();

/**
 * composable to share add message usecase
 * @param {string} message - message to show on info notification
 * @param {object} payload - object payload to pass with post HTTP method
 * @returns { void }
 */
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

  Object.keys(twitterStore[GET_SELECTED_USER]).length > 0 ? twitterStore[CHANGE_SELECTED_USER]({ user: {} }) : null;
  twitterStore[CHANGE_NEW_MESSAGE]({ message: text.replace(/ /g, "") });

  await wait(API_DELAY_MAX);
  twitterStore[CHANGE_NEW_MESSAGE]();
};
