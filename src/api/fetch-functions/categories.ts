import { fetchWrapper, host } from "../utils/fetchWrapper";

export async function getCategories(): Promise<string[]> {

  const path = "constants/categories";
  const url = host + path;

  return fetchWrapper<string[]>({url})
} 