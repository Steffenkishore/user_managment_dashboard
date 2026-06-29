import type { AxiosResponse } from "axios";
import api from "./api.service";

export const getUsers = async (): Promise<AxiosResponse<any, any, {}>> => {
  const response = api.get("/users");
  return response;
};