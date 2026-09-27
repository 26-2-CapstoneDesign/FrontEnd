import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav style={{ display: "flex", gap: 12, padding: 12 }}>
        <Link to="/">홈</Link>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/certifications/1">자격증상세</Link>
        <Link to="/reviews">시험후기</Link>
        <Link to="/reviews/new">후기작성</Link>
      </nav>
      <main style={{ padding: 12 }}>
        <Outlet />
      </main>
    </>
  );
}
