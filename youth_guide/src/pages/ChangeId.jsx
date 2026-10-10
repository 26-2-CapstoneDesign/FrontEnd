import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChangeId.css";

// 백엔드 API가 없어 화면 확인용 임시 값을 사용한다. 실제 회원 정보·인증번호가 아니다.
const MOCK_CURRENT_USER_ID = "youthguide";
const MOCK_VERIFICATION_CODE = "123456";

const ID_MAX_LENGTH = 30;

const NEW_ID_MESSAGES = {
  sameAsCurrent: { text: "기존 아이디와 동일합니다.", tone: "error" },
  tooLong: { text: "사용할 수 없는 아이디입니다.", tone: "error" },
};

const getNewUserIdError = (value) => {
  if (value.trim() === MOCK_CURRENT_USER_ID) return "sameAsCurrent";
  if (value.length > ID_MAX_LENGTH) return "tooLong";
  return null;
};

const EMAIL_FORMAT_ERROR = { text: "이메일 형식이 올바르지 않습니다.", tone: "error" };

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const CODE_MESSAGES = {
  verified: { text: "인증 되었습니다.", tone: "success" },
  mismatch: { text: "인증번호를 확인해 주세요.", tone: "error" },
};

const CHANGE_DISCONNECTED = { text: "아이디 변경 서버가 아직 연결되지 않았습니다.", tone: "info" };
const REQUEST_FAILED = { text: "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.", tone: "error" };

// 이메일 인증번호 발송 API의 URL·요청 필드·응답 구조가 확정되지 않아 아직 요청을 보내지 않는다.
// eslint-disable-next-line no-unused-vars
const sendVerificationCode = async (email) => {};

// 아이디 변경 API의 URL·요청 필드·응답 구조·인증 방식이 확정되지 않아 아직 요청을 보내지 않는다.
// 연결 전에는 응답을 돌려주지 않으므로 화면은 홈으로 이동하지 않는다.
// 인자는 화면 상태 값이며 API 요청 필드 이름이 아니다.
// eslint-disable-next-line no-unused-vars
const changeLoginId = async ({ newUserId, email, verificationCode, isCodeVerified }) => {};

function FieldMessage({ message }) {
  if (!message) return null;
  return (
    <p className={`change-id-message is-${message.tone}`} aria-live="polite">
      {message.text}
    </p>
  );
}

export default function ChangeId() {
  const navigate = useNavigate();
  const [newUserId, setNewUserId] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeStatus, setCodeStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const newUserIdError = getNewUserIdError(newUserId);
  const isNewUserIdValid = newUserId.trim() !== "" && !newUserIdError;
  const isCodeVerified = codeStatus === "verified";
  const isSubmittable = isNewUserIdValid && isCodeVerified;

  const handleCodeChange = (event) => {
    setVerificationCode(event.target.value);
    setCodeStatus("idle");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailInvalid(false);
  };

  const handleSendVerificationCode = async () => {
    if (!isValidEmail(email)) {
      setIsEmailInvalid(true);
      return;
    }
    await sendVerificationCode(email);
    setIsCodeSent(true);
    setVerificationCode("");
    setCodeStatus("idle");
  };

  const handleVerifyCode = () => {
    setCodeStatus(
      verificationCode.trim() === MOCK_VERIFICATION_CODE ? "verified" : "mismatch",
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSubmittable || isSubmitting) return;

    setSubmitMessage(null);
    setIsSubmitting(true);
    try {
      const response = await changeLoginId({ newUserId, email, verificationCode, isCodeVerified });
      if (!response) {
        setSubmitMessage(CHANGE_DISCONNECTED);
        return;
      }
      if (response.ok) {
        navigate("/");
        return;
      }
      setSubmitMessage(REQUEST_FAILED);
    } catch {
      setSubmitMessage(REQUEST_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="change-id-page">
      <div className="change-id-card">
        <h1 className="change-id-title">아이디 변경</h1>

        <form className="change-id-form" onSubmit={handleSubmit} noValidate>
          <div className="change-id-field">
            <label className="change-id-label" htmlFor="change-id-new-id">
              새 아이디
            </label>
            <div className="change-id-control">
              <input
                id="change-id-new-id"
                className="change-id-input"
                type="text"
                placeholder="아이디를 입력해주세요."
                autoComplete="username"
                maxLength={ID_MAX_LENGTH}
                value={newUserId}
                onChange={(event) => setNewUserId(event.target.value)}
              />
              <FieldMessage message={NEW_ID_MESSAGES[newUserIdError]} />
            </div>
          </div>

          <div className="change-id-field">
            <label className="change-id-label" htmlFor="change-id-email">
              이메일
            </label>
            <div className="change-id-control">
              <div className="change-id-row">
                <input
                  id="change-id-email"
                  className="change-id-input"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  className="change-id-side-button"
                  type="button"
                  onClick={handleSendVerificationCode}
                >
                  인증번호 발송
                </button>
              </div>
              {isEmailInvalid && <FieldMessage message={EMAIL_FORMAT_ERROR} />}
            </div>
          </div>

          <div className="change-id-field">
            <label className="change-id-label" htmlFor="change-id-code">
              인증번호
            </label>
            <div className="change-id-control">
              <div className="change-id-row">
                <input
                  id="change-id-code"
                  className={
                    codeStatus === "mismatch"
                      ? "change-id-input is-error"
                      : "change-id-input"
                  }
                  type="text"
                  inputMode="numeric"
                  placeholder="인증번호를 입력해주세요."
                  autoComplete="one-time-code"
                  value={verificationCode}
                  onChange={handleCodeChange}
                />
                <button
                  className="change-id-side-button"
                  type="button"
                  disabled={!isCodeSent || verificationCode.trim() === ""}
                  onClick={handleVerifyCode}
                >
                  확인
                </button>
              </div>
              <FieldMessage message={CODE_MESSAGES[codeStatus]} />
            </div>
          </div>

          <FieldMessage message={submitMessage} />

          <button
            className="change-id-submit"
            type="submit"
            disabled={!isSubmittable || isSubmitting}
          >
            완료
          </button>
        </form>
      </div>
    </section>
  );
}
