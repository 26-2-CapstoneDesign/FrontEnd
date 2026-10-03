import { Outlet } from "react-router-dom";
import Header from "./Header";

/* 로그인·회원가입 등 인증 화면용 레이아웃 (로고만 있는 헤더) */
export default function AuthLayout() {
  return (
    <>
      <Header isMinimal />
      <main className="layout-main">
        <Outlet />
      </main>
    </>
  );
}
