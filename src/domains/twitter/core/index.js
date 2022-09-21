// services
import { get } from "@/app/services/http.services";
import { hasLoader, hasError } from "@/app/services/notification.services";
// usecase
import { getAllUsers } from "@/domains/twitter/core/usecases/getAllUsers.usecase";

export const UseGetAllUsers = getAllUsers({
  HTTP: { get },
  notifications: { hasLoader, hasError },
});
