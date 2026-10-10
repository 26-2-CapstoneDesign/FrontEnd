/*
 * 개발 서버(npm run dev)에서만 동작하는 임시 로그인 확인 스위치
 *   주소 뒤에 ?mockLogin=1 → 로그인 상태로 보기 (탭을 닫기 전까지 유지)
 *   주소 뒤에 ?mockLogin=0 → 로그아웃 상태로 되돌리기
 * TODO(로그인 연동): 인증 방식이 정해지면 실제 로그인 상태로 교체
 */
export const MOCK_USER = { displayName: "dkdlel123" };
export const MOCK_LOGIN_KEY = "mockLogin";

export function getMockCurrentUser() {
  if (!import.meta.env.DEV) return null;
  try {
    const param = new URLSearchParams(window.location.search).get(MOCK_LOGIN_KEY);
    if (param === "1") sessionStorage.setItem(MOCK_LOGIN_KEY, "1");
    if (param === "0") sessionStorage.removeItem(MOCK_LOGIN_KEY);
    return sessionStorage.getItem(MOCK_LOGIN_KEY) === "1" ? MOCK_USER : null;
  } catch {
    return null;
  }
}
