import { fetchWrapper, host } from "./utils/fetchWrapper";

const path = "categories/";
const url = host + path;

export async function getCategories(): Promise<string[]> {
  return fetchWrapper<string[]>({url})
} 