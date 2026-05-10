import { api } from "@repo/eden";

export const getData = async () => {
  const { data } = await api.get();
  return data;
};
