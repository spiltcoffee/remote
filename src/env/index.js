import axios from "axios";

export async function loadEnv() {
  const axiosInstance = axios.create({
    baseURL: `/`,
  });
  const path = "settings.json";

  const { url, psk, name } = (await axiosInstance.get(path)).data;

  return {
    TV_URL: url,
    TV_PSK: psk,
    TV_NAME: name,
  };
}
