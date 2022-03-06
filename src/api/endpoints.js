import { httpRequest } from "./httpRequest";

export async function authRequest({ login, password }) {
  return httpRequest({
    url: "auth",
    method: "POST",
    data: { login, password },
  });
}

export async function getChannels({ limit = 150 }) {
  return httpRequest({
    url: "telegram/channel",
    method: "GET",
    params: { limit },
  });
}

export async function saveReported({ name }) {
  return httpRequest({
    url: "telegram/report",
    method: "POST",
    data: { name },
  });
}

export async function getReportStats() {
  return httpRequest({
    url: "telegram/report/stats",
    method: "GET",
  });
}
