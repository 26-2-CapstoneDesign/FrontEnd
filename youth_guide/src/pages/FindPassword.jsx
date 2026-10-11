import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FindPassword.css";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;

const PASSWORD_HINT = "영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.";
const PASSWORD_MISMATCH = "비밀번호가 일치하지 않습니다.";
const EMAIL_FORMAT_ERROR = { text: "이메일 형식이 올바르지 않습니다.", tone: "error" };
const EMAIL_DISCONNECTED = {
  text: "이메일 확인 서버가 아직 연결되지 않았습니다.",
  tone: "info",
};
const CODE_DISCONNECTED = { text: "인증 서버가 아직 연결되지 않았습니다.", tone: "info" };
const RESET_DISCONNECTED = {
  text: "비밀번호 변경 서버가 아직 연결되지 않았습니다.",
  tone: "info",
};
const REQUEST_FAILED = {
  text: "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  tone: "error",
};

const NAME_RESULT_MESSAGES = {
  mismatch: { text: "이름이 일치하지 않습니다.", tone: "error" },
};

const CODE_RESULT_MESSAGES = {
  verified: { text: "인증 되었습니다.", tone: "success" },
  mismatch: { text: "인증번호를 확인해주세요.", tone: "error" },
  disconnected: CODE_DISCONNECTED,
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPassword = (value) =>
  value.length >= PASSWORD_MIN_LENGTH &&
  value.length <= PASSWORD_MAX_LENGTH &&
  /[A-Za-z]/.test(value) &&
  /\d/.test(value) &&
  /[^A-Za-z\d\s]/.test(value);

const formatRemaining = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;
  return `${minutes}:${String(remain).padStart(2, "0")}`;
};

// 이름 일치·가입 확인·인증번호 발송을 나누는 API 계약이 없다.
// URL·method·요청 필드·응답 필드·인증 방식을 만들지 않고 null을 반환한다.
// eslint-disable-next-line no-unused-vars
const requestPasswordResetCode = async ({ name, email }) => null;

// 인증번호 검증 API 계약이 없다. 인증번호를 만들거나 고정 값으로 성공 처리하지 않는다.
// eslint-disable-next-line no-unused-vars
const verifyPasswordResetCode = async ({ email, verificationCode }) => null;

// 비밀번호 재설정 API 계약이 없다. 인자는 화면 값이며 요청 필드 이름이 아니다.
// 계약이 확정된 뒤에만 fetch Response를 반환하고, response.ok일 때만 완료 화면으로 이동한다.
// eslint-disable-next-line no-unused-vars
const resetFoundPassword = async ({ name, email, verificationCode, newPassword }) => null;

function FieldMessage({ message }) {
  if (!message) return null;
  return (
    <p className={`find-password-message is-${message.tone}`} aria-live="polite">
      {message.text}
    </p>
  );
}

export default function FindPassword() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameMessage, setNameMessage] = useState(null);
  const [isNameMatched, setIsNameMatched] = useState(false);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeMessage, setCodeMessage] = useState(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [submitMessage, setSubmitMessage] = useState(null);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sendRequestId = useRef(0);
  const verifyRequestId = useRef(0);

  const isTimerRunning = remainingSeconds !== null && remainingSeconds > 0;

  useEffect(() => {
    if (!isTimerRunning) return undefined;
    const timerId = setInterval(() => {
      setRemainingSeconds((prev) => (prev === null || prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerId);
  }, [isTimerRunning]);

  const isPasswordValid = isValidPassword(newPassword);
  const isPasswordMismatch =
    newPasswordConfirm !== "" && newPasswordConfirm !== newPassword;

  const isSubmittable =
    name.trim() !== "" &&
    isNameMatched &&
    isCodeSent &&
    isCodeVerified &&
    isPasswordValid &&
    newPasswordConfirm !== "" &&
    !isPasswordMismatch;

  const resetVerification = () => {
    setIsCodeSent(false);
    setVerificationCode("");
    setCodeMessage(null);
    setIsCodeVerified(false);
    setRemainingSeconds(null);
    sendRequestId.current += 1;
    verifyRequestId.current += 1;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailMessage(null);
    resetVerification();
  };

  const handleSendCode = async () => {
    if (isSendingCode) return;
    if (!isValidEmail(email)) {
      setEmailMessage(EMAIL_FORMAT_ERROR);
      return;
    }
    const requestId = sendRequestId.current + 1;
    sendRequestId.current = requestId;
    setIsSendingCode(true);
    setEmailMessage(null);
    try {
      const response = await requestPasswordResetCode({ name, email });
      if (requestId !== sendRequestId.current) return;
      if (!response) {
        setEmailMessage(EMAIL_DISCONNECTED);
        return;
      }
      // 발송 성공·남은 시간·가입 여부·이름 일치를 구분하는 응답 구조가 명세에 없다.
      // 값이 있어도 발송 성공이나 이름 일치로 처리하지 않는다.
      setEmailMessage(EMAIL_DISCONNECTED);
    } catch {
      if (requestId !== sendRequestId.current) return;
      setEmailMessage(REQUEST_FAILED);
    } finally {
      if (requestId === sendRequestId.current) setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (isVerifyingCode || !isCodeSent || verificationCode.trim() === "") return;
    const requestId = verifyRequestId.current + 1;
    verifyRequestId.current = requestId;
    setIsVerifyingCode(true);
    try {
      const response = await verifyPasswordResetCode({ email, verificationCode });
      if (requestId !== verifyRequestId.current) return;
      if (!response) {
        setCodeMessage(CODE_RESULT_MESSAGES.disconnected);
        setIsCodeVerified(false);
        return;
      }
      // 일치·불일치를 구분하는 응답 구조가 명세에 없다.
      // 값이 있어도 인증 성공으로 처리하지 않는다.
      setCodeMessage(CODE_RESULT_MESSAGES.disconnected);
      setIsCodeVerified(false);
    } catch {
      if (requestId !== verifyRequestId.current) return;
      setIsCodeVerified(false);
      setCodeMessage(REQUEST_FAILED);
    } finally {
      if (requestId === verifyRequestId.current) setIsVerifyingCode(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSubmittable || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const response = await resetFoundPassword({
        name,
        email,
        verificationCode,
        newPassword,
      });
      if (!response) {
        setNameMessage(null);
        setSubmitMessage(RESET_DISCONNECTED);
        return;
      }
      if (response.ok) {
        navigate("/find-password/complete");
        return;
      }
      // 이름 불일치를 가리키는 응답 필드가 명세에 없다. mismatch 문구로 바꾸지 않는다.
      setNameMessage(NAME_RESULT_MESSAGES.mismatch ? null : null);
      setSubmitMessage(REQUEST_FAILED);
    } catch {
      setSubmitMessage(REQUEST_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="find-password-page">
      <div className="find-password-card">
        <h1 className="find-password-title">비밀번호 찾기</h1>
        <p className="find-password-description">
          본인 확인 후 새 비밀번호를 설정해주세요
        </p>

        <form className="find-password-form" onSubmit={handleSubmit} noValidate>
          <div className="find-password-field">
            <label className="find-password-label" htmlFor="find-password-name">
              이름
            </label>
            <input
              id="find-password-name"
              className="find-password-input"
              type="text"
              placeholder="이름을 입력해주세요."
              autoComplete="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setNameMessage(null);
                setIsNameMatched(false);
              }}
            />
            <FieldMessage message={nameMessage} />
          </div>

          <div className="find-password-field">
            <label className="find-password-label" htmlFor="find-password-email">
              이메일
            </label>
            <div className="find-password-row">
              <input
                id="find-password-email"
                className="find-password-input"
                type="email"
                placeholder="가입한 이메일을 입력해주세요."
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                className="find-password-side-button"
                type="button"
                disabled={isSendingCode}
                onClick={handleSendCode}
              >
                인증번호 받기
              </button>
            </div>
            <FieldMessage message={emailMessage} />
          </div>

          <div className="find-password-field">
            <label className="find-password-label" htmlFor="find-password-code">
              인증번호
            </label>
            <div className="find-password-row">
              <div className="find-password-code-field">
                <input
                  id="find-password-code"
                  className={
                    remainingSeconds !== null
                      ? "find-password-input has-timer"
                      : "find-password-input"
                  }
                  type="text"
                  inputMode="numeric"
                  placeholder="인증번호 6자리를 입력해주세요."
                  autoComplete="one-time-code"
                  value={verificationCode}
                  onChange={(event) => {
                    setVerificationCode(event.target.value);
                    setCodeMessage(null);
                    setIsCodeVerified(false);
                  }}
                />
                {remainingSeconds !== null && (
                  <span className="find-password-timer" aria-live="polite">
                    {formatRemaining(remainingSeconds)}
                  </span>
                )}
              </div>
              <button
                className="find-password-side-button"
                type="button"
                disabled={
                  isVerifyingCode || !isCodeSent || verificationCode.trim() === ""
                }
                onClick={handleVerifyCode}
              >
                확인
              </button>
            </div>
            <FieldMessage message={codeMessage} />
          </div>

          <div className="find-password-field">
            <label className="find-password-label" htmlFor="find-password-new">
              새 비밀번호
            </label>
            <input
              id="find-password-new"
              className="find-password-input"
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              autoComplete="new-password"
              maxLength={PASSWORD_MAX_LENGTH}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            {!isPasswordValid && (
              <p className="find-password-hint is-error">{PASSWORD_HINT}</p>
            )}
          </div>

          <div className="find-password-field">
            <label className="find-password-label" htmlFor="find-password-confirm">
              새 비밀번호 확인
            </label>
            <input
              id="find-password-confirm"
              className={
                isPasswordMismatch
                  ? "find-password-input is-error"
                  : "find-password-input"
              }
              type="password"
              placeholder="새 비밀번호를 다시 입력해주세요."
              autoComplete="new-password"
              maxLength={PASSWORD_MAX_LENGTH}
              value={newPasswordConfirm}
              onChange={(event) => setNewPasswordConfirm(event.target.value)}
            />
            {isPasswordMismatch && (
              <p className="find-password-message is-error">{PASSWORD_MISMATCH}</p>
            )}
          </div>

          <FieldMessage message={submitMessage} />

          <button
            className="find-password-submit"
            type="submit"
            disabled={!isSubmittable || isSubmitting}
          >
            비밀번호 변경
          </button>
        </form>
      </div>
    </section>
  );
}
