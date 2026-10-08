import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { MOCK_LOGIN_KEY, getMockCurrentUser } from "../utils/mockAuth";

export default function Layout() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getMockCurrentUser);

  const handleLogout = () => {
    // TODO(로그인 연동): 로그아웃 API 연결 후 상태 초기화
    try {
      sessionStorage.removeItem(MOCK_LOGIN_KEY);
    } catch {
      // 저장소 접근 불가 시 무시
    }
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <>
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <main className="layout-main">
        <Outlet context={{ currentUser }} />
      </main>
    </>
  );
}
