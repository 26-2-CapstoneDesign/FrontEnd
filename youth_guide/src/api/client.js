const DEFAULT_ERROR_MESSAGE = "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.";
const CSRF_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

export class ApiError extends Error {
  constructor(status, body) {
    super(body?.message ?? DEFAULT_ERROR_MESSAGE);
    this.status = status;
    this.code = body?.code ?? null;
    this.fieldErrors = body?.fieldErrors ?? [];
  }
}

function getCookie(name) {
  const row = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));
  return row ? decodeURIComponent(row.slice(name.length + 1)) : null;
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function apiRequest(path, { method = "GET", body } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  // 로그인 후 상태를 바꾸는 요청(로그아웃 등)은 CSRF 토큰을 헤더에 담아야 한다.
  if (CSRF_METHODS.includes(method)) {
    const csrfToken = getCookie("XSRF-TOKEN");
    if (csrfToken) headers["X-XSRF-TOKEN"] = csrfToken;
  }

  let response;
  try {
    response = await fetch(path, {
      method,
      headers,
      credentials: "include",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, null);
  }

  const text = await response.text();
  const data = text ? parseJson(text) : null;
  if (!response.ok) throw new ApiError(response.status, data);
  return data;
}