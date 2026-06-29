import type { AxiosResponse } from "axios";
import type { UserType } from "../types/types";
import api from "./api.service";

export const createUser = async (userData: UserType): Promise<AxiosResponse<any, any, {}>> => {
  const response = await api.post("/users", userData);
  console.log(response);
  return response;
};