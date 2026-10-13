import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { getMe, logout } from "../api/auth";

export default function Layout() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let isActive = true;
    getMe()
      .then((me) => {
        // Header는 displayName을 쓰므로 닉네임을 넣어준다.
        if (isActive) setCurrentUser({ ...me, displayName: me.nickname });
      })
      .catch(() => {
        // 401(로그인 안 됨)이면 로그아웃 상태로 둔다.
        if (isActive) setCurrentUser(null);
      });
    return () => {
      isActive = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // 세션이 이미 끝났어도 화면은 로그아웃 상태로 바꾼다.
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