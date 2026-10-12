import { apiRequest } from "./client";

// 셋 중 하나만 보낸다. 예: { loginName: "youth01" }
export const checkAvailability = (params) =>
  apiRequest(`/api/v1/members/availability?${new URLSearchParams(params)}`);

export const sendEmailCode = (email) =>
  apiRequest("/api/v1/members/email-verifications", { method: "POST", body: { email } });

export const confirmEmailCode = (email, code) =>
  apiRequest("/api/v1/members/email-verifications/confirm", {
    method: "POST",
    body: { email, code },
  });

export const signup = (body) => apiRequest("/api/v1/members", { method: "POST", body });