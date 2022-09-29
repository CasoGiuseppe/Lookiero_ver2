// usecases
import { UseAddMessage } from "@/domains/twitter/core";

// service
import { get } from "@/app/services/http.services";

// constants
import { API_BASE_PATH } from "@/app/partials/constants";
import { MESSAGE_SUCCESS } from "@/app/partials/messages";
import { uuid } from "@/app/partials/helpers";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { CHANGE_SELECTED_USER } from "@/domains/twitter/infrastructure/store/actions";

const twitterStore = useTwitterStore();
export const useMessage = async ({ message = MESSAGE_SUCCESS, payload = {}, callbacks } = {}) => {
  const user = await get(`${API_BASE_PATH}owner/true`);
  const { id } = user[0];
  await UseAddMessage({
    request: { url: `${API_BASE_PATH}id/${id}`, payload },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message },
    callbacks,
  });

  twitterStore[CHANGE_SELECTED_USER]({ user: {} });
};
