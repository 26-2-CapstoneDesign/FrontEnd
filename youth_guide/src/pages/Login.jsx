import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const LOGIN_EMPTY = "아이디와 비밀번호를 입력해 주세요.";
const LOGIN_REQUESTED = "로그인 요청이 처리되었습니다.";
const REQUEST_FAILED = "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.";

const LOGIN_ERROR_MESSAGES = {
  400: "입력값을 다시 확인해 주세요.",
  401: "아이디 또는 비밀번호가 올바르지 않습니다.",
  429: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isKeepLogin, setIsKeepLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (userId.trim() === "" || password === "") {
      setMessage(LOGIN_EMPTY);
      return;
    }

    setIsSubmitting(true);
    try {
      // AUTH-01의 성공 응답·인증 전달 방식이 정해지지 않아 응답 본문을 읽거나 인증 정보를 저장하지 않는다.
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginName: userId, password }),
      });
      setMessage(
        response.ok
          ? LOGIN_REQUESTED
          : (LOGIN_ERROR_MESSAGES[response.status] ?? REQUEST_FAILED),
      );
    } catch {
      setMessage(REQUEST_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1 className="login-title">청년 길잡이</h1>
        <p className="login-subtitle">로그인</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="login-user-id">
            아이디
          </label>
          <input
            id="login-user-id"
            className="login-input"
            type="text"
            placeholder="아이디"
            autoComplete="username"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />

          <label className="login-label" htmlFor="login-password">
            비밀번호
          </label>
          <input
            id="login-password"
            className="login-input"
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            maxLength={20}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <label className="login-keep" htmlFor="login-keep">
            <input
              id="login-keep"
              className="login-keep-checkbox"
              type="checkbox"
              checked={isKeepLogin}
              onChange={(event) => setIsKeepLogin(event.target.checked)}
            />
            <span>로그인 상태 유지</span>
          </label>

          <p
            className={message ? "login-message is-visible" : "login-message"}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>

          <div className="login-actions">
            <button
              className="login-submit"
              type="submit"
              disabled={isSubmitting}
            >
              로그인
            </button>
            <button
              className="login-signup"
              type="button"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </div>
        </form>

        <div className="login-find">
          <button
            className="login-find-button"
            type="button"
            onClick={() => navigate("/find-id")}
          >
            아이디 찾기
          </button>
          <span className="login-find-divider" aria-hidden="true">
            |
          </span>
          <button
            className="login-find-button"
            type="button"
            onClick={() => navigate("/find-password")}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </section>
  );
}
