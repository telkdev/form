import { httpRequest } from "./httpRequest";

export async function authRequest({ login, password }) {
  try {
    const res = await httpRequest({
      uri: "auth",
      method: "POST",
      data: { login, password },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getChannels({ limit = 150 }) {
  try {
    const res = await httpRequest({
      uri: "telegram/channel",
      method: "GET",
      params: { limit },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function saveReported({ name }) {
  try {
    const res = await httpRequest({
      uri: "telegram/report",
      method: "POST",
      data: { name },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}
