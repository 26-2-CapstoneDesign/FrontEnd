import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CertificationDetail from "./pages/CertificationDetail";
import ReviewList from "./pages/ReviewList";
import ReviewWrite from "./pages/ReviewWrite";
import ReviewDetail from "./pages/ReviewDetail";
import FirstLogin from "./pages/FirstLogin";
import ChangeId from "./pages/ChangeId";
import ChangePassword from "./pages/ChangePassword";
import SignUpComplete from "./pages/SignUpComplete";
import FindId from "./pages/FindId";
import FindIdComplete from "./pages/FindIdComplete";
import FindPassword from "./pages/FindPassword";
import FindPasswordComplete from "./pages/FindPasswordComplete";
import MyPage from "./pages/MyPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-id/complete" element={<FindIdComplete />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/find-password/complete" element={<FindPasswordComplete />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/complete" element={<SignUpComplete />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/certifications/:certId" element={<CertificationDetail />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/new" element={<ReviewWrite />} />
          <Route path="/reviews/:reviewId" element={<ReviewDetail />} />
          {/* 백엔드 구축 전 UI 확인용 임시 직접 접근 경로이며 개발 서버에서만 등록된다. */}
          {import.meta.env.DEV && (
            <Route path="/onboarding/certifications" element={<FirstLogin />} />
          )}
          <Route path="/mypage" element={<MyPage />} />
          {import.meta.env.DEV && (
            <Route path="/change-id" element={<ChangeId />} />
          )}
          {import.meta.env.DEV && <Route path="/change-password" element={<ChangePassword />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
