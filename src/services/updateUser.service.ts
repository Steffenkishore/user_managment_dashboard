import type { AxiosResponse } from "axios";
import type { UserType } from "../types/types";
import api from "./api.service";

export const updateUser = async (
  id: number | string,
  updateData: UserType,
): Promise<AxiosResponse<UserType>> => {
  const response = await api.put(`/users/${id}`, updateData);
  console.log(response);
  return response;
};
