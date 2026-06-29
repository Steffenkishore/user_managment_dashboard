import type { AxiosResponse } from "axios";
import api from "./api.service";

export const delUser = async (
  id: number | string,
): Promise<AxiosResponse<any, any, {}>> => {
    console.log(id);
  const response = await api.delete(`/users/${id}`);
  return response;
};
