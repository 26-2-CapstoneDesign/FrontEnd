import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isKeepLogin, setIsKeepLogin] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("로그인 서버가 아직 연결되지 않았습니다.");
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
            <button className="login-submit" type="submit">
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
          <button className="login-find-button" type="button">
            아이디 찾기
          </button>
          <span className="login-find-divider" aria-hidden="true">
            |
          </span>
          <button className="login-find-button" type="button">
            비밀번호 찾기
          </button>
        </div>
      </div>
    </section>
  );
}
