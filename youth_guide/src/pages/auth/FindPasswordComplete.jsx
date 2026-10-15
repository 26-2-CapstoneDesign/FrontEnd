import { useNavigate } from "react-router-dom";
import "../styles/FindPasswordComplete.css";

export default function FindPasswordComplete() {
  const navigate = useNavigate();

  return (
    <section className="find-password-complete-page">
      <div className="find-password-complete-card">
        <div className="find-password-complete-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="find-password-complete-title">비밀번호가 변경되었습니다.</h1>
        <p className="find-password-complete-guide">
          변경된 비밀번호로 다시 로그인해주세요.
        </p>
        <div className="find-password-complete-actions">
          <button
            className="find-password-complete-secondary"
            type="button"
            onClick={() => navigate("/find-id")}
          >
            아이디 찾기
          </button>
          <button
            className="find-password-complete-primary"
            type="button"
            onClick={() => navigate("/login")}
          >
            로그인 하기
          </button>
        </div>
      </div>
    </section>
  );
}
