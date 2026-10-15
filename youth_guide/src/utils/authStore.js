// 로그인 API가 없어서 임시로 쓰는 mock 로그인 상태
// TODO: 로그인 API 연결되면 api/auth.js에서 저장하는 값(토큰/유저 정보)을 읽도록 교체
const KEY = "currentUser";

export function getCurrentUser() {
    try {
        const raw = localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function mockLogin(user = { id: 1, name: "나" }) {
    localStorage.setItem(KEY, JSON.stringify(user));
}

export function mockLogout() {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
}

// 브라우저 콘솔 테스트용: mockAuth.login() / mockAuth.login({ id: 2, name: "철수" }) / mockAuth.logout()
if (typeof window !== "undefined") {
    window.mockAuth = { login: mockLogin, logout: mockLogout };
}