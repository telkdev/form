import axios from "axios";

import { ApiConstants } from "@/constants/api";

function getAccessToken() {
  localStorage.getItem(ApiConstants.accessTokenKey);
}

function setAccessToken(token) {
  localStorage.setItem(ApiConstants.accessTokenKey, token);
}

export async function httpRequest({ uri, data, method, params }) {
  const requestOptions = {
    baseURL: ApiConstants.serverApi,
    uri,
    method: method,
    data,
    params,
  };

  const accessToken = getAccessToken();

  if (accessToken) {
    const tokenValue = `Bearer ${accessToken}`;

    if (!requestOptions.headers) {
      requestOptions.headers = {
        Authorization: tokenValue,
      };
    } else {
      requestOptions.headers.Authorization = tokenValue;
    }
  }

  try {
    const result = await axios(requestOptions);

    if (uri === "auth" && method === "POST") {
      setAccessToken(result.data.tokens.accessToken);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}
