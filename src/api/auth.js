import axios from "axios";

import { ApiConstants } from "@/constants/api";

export async function authRequest({ login, password }) {
  try {
    const url = `${ApiConstants.serverApi}auth`;
    const data = {
      login,
      password,
    };
    const res = await axios.post(url, data);

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getChannels(options) {
  try {
    const url = `${ApiConstants.serverApi}telegram/channel`;
    const res = await axios({ url, method: "GET", params: options });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function saveReported({ name }) {
  try {
    const url = `${ApiConstants.serverApi}telegram/report`;
    const res = await axios({ url, method: "POST", data: { name } });

    return res;
  } catch (error) {
    console.log(error);
  }
}
