import { fetchWrapper, host } from "./utils/fetchWrapper";

const path = "units/";
const url = host + path;

export async function getUnits(): Promise<string[]> {
  return fetchWrapper<string[]>({url})
} 