// usecases
import { UseHandleUserByState } from "@/domains/twitter/core";

// constants
import { API_BASE_PATH } from "@/app/partials/constants";
import { uuid } from "@/app/partials/helpers";

export const useUsersFollower = async () => {
  const { getUserByOwnState } = UseHandleUserByState();

  await getUserByOwnState({
    request: { url: `${API_BASE_PATH}following/false` },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message: "ciccio pasticcio" },
  });

  await getUserByOwnState({
    request: { url: `${API_BASE_PATH}following/true` },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message: "ciccio pasticcio 2" },
  });
};
