import { fetchWrapper, host } from "../utils/fetchWrapper";

export async function getUnits(): Promise<string[]> {

  const path = "constants/units";
  const url = host + path;

  return fetchWrapper<string[]>({url})
} 