import { handleUserByState } from "@/domains/twitter/core/usecases/handleUserByState.usecase";

export const mockThrwoErrorNoFn = handleUserByState({
  HTTP: { get: null },
});
