import { useNavigate } from "react-router-dom";
import "../styles/SignUpComplete.css";

export default function SignUpComplete() {
  const navigate = useNavigate();

  return (
    <section className="signup-complete-page">
      <div className="signup-complete-body">
        <div className="signup-complete-card">
          <div className="signup-complete-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="32" height="32">
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

          <h1 className="signup-complete-title">회원가입이 완료되었습니다.</h1>
          <p className="signup-complete-guide">
            로그인을 진행하여 서비스를 이용해주세요.
          </p>

          <button
            className="signup-complete-button"
            type="button"
            onClick={() => navigate("/login")}
          >
            로그인 화면으로 이동
          </button>
        </div>
      </div>
    </section>
  );
}
