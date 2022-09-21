// services
import { get } from "@/app/services/http.services";
import { hasLoader, onError } from "@/app/services/notification.services";
// usecase
import { getTwitterUsers } from "@/domains/twitter/core/usecases/getTwitterUsers.usecase";

export const UseGetTwitterUsers = getTwitterUsers({
  HTTP: { get },
  notifications: { hasLoader, onError },
});
