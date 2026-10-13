import { apiRequest } from "./client";

export const login = ({ loginName, password, rememberMe }) =>
  apiRequest("/api/v1/auth/login", {
    method: "POST",
    body: { loginName, password, rememberMe },
  });

export const logout = () => apiRequest("/api/v1/auth/logout", { method: "POST" });

export const getMe = () => apiRequest("/api/v1/me");