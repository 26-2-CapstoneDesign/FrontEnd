import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CertificationDetail from "./pages/CertificationDetail";
import ReviewList from "./pages/ReviewList";
import ReviewWrite from "./pages/ReviewWrite";
import ReviewDetail from "./pages/ReviewDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/certifications/:certId" element={<CertificationDetail />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/new" element={<ReviewWrite />} />
          <Route path="/reviews/:reviewId" element={<ReviewDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
