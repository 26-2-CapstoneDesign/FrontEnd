import { useLocation, useNavigate } from "react-router-dom";
import "../styles/FindIdComplete.css";

const PREVIEW_LOGIN_ID = "chungnyeon";

function readPassedLoginId(state) {
  const loginId = state?.loginId;
  if (typeof loginId !== "string") return null;
  const trimmed = loginId.trim();
  return trimmed === "" ? null : trimmed;
}

export default function FindIdComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginId = readPassedLoginId(location.state);
  const isLayoutPreview =
    import.meta.env.DEV &&
    new URLSearchParams(location.search).get("preview") === "layout";
  const displayId = loginId ?? (isLayoutPreview ? PREVIEW_LOGIN_ID : null);

  return (
    <section className="find-id-complete-page">
      <div className="find-id-complete-card">
        <div className="find-id-complete-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="find-id-complete-title">회원님의 아이디입니다.</h1>
        {displayId ? (
          <p className="find-id-complete-value">{displayId}</p>
        ) : (
          <p className="find-id-complete-empty">조회된 아이디가 없습니다.</p>
        )}
        {isLayoutPreview && !loginId && (
          <p className="find-id-complete-preview">
            테스트용 표시이며 실제 조회 결과가 아닙니다.
          </p>
        )}
        <p className="find-id-complete-guide">
          비밀번호를 잊으셨다면
          <br />
          '비밀번호 찾기'를 진행해주세요.
        </p>
        <div className="find-id-complete-actions">
          <button
            className="find-id-complete-secondary"
            type="button"
            onClick={() => navigate("/find-password")}
          >
            비밀번호 찾기
          </button>
          <button
            className="find-id-complete-primary"
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
