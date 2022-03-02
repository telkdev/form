import axios from "axios";

import { ApiConstants } from "@/constants/api";

function getAccessToken() {
  localStorage.getItem(ApiConstants.accessTokenKey);
}

function setAccessToken(token) {
  localStorage.setItem(ApiConstants.accessTokenKey, token);
}

export async function httpRequest({ url, data, method, params, headers = {} }) {
  const requestOptions = {
    baseURL: ApiConstants.serverApi,
    url,
    method: method,
    data,
    params,
    headers: Object.assign({}, headers),
  };

  const accessToken = getAccessToken();

  if (accessToken) {
    const tokenValue = `Bearer ${accessToken}`;

    requestOptions.headers.Authorization = tokenValue;
  }

  try {
    const result = await axios(requestOptions);

    if (url === "auth" && method === "POST") {
      setAccessToken(result.data.tokens.accessToken);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}
