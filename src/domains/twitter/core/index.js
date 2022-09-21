// services
import { get, patch } from "@/app/services/http.services";
import { hasLoader, onError } from "@/app/services/notification.services";
// usecase
import { getUsersByValue } from "@/domains/twitter/core/usecases/getUsersByValue.usecase";
import { changeUserFollowigState } from "@/domains/twitter/core/usecases/changeUserFollowigState.usecase";

export const UseGetUsersByValue = getUsersByValue({
  HTTP: { get },
  notifications: { hasLoader, onError },
});

export const UseChangeUserState = changeUserFollowigState({
  HTTP: { patch },
  notifications: { hasLoader, onError },
});
