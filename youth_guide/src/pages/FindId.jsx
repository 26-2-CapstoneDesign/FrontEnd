import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FindId.css";

const EMAIL_FORMAT_ERROR = { text: "이메일 형식이 올바르지 않습니다.", tone: "error" };
const EMAIL_UNREGISTERED = { text: "가입되지 않은 이메일입니다.", tone: "error" };
const EMAIL_DISCONNECTED = {
  text: "이메일 확인 서버가 아직 연결되지 않았습니다.",
  tone: "info",
};
const CODE_MISMATCH = { text: "인증번호가 일치하지 않습니다.", tone: "error" };
const CODE_VERIFIED = { text: "인증에 성공하였습니다.", tone: "success" };
const CODE_DISCONNECTED = { text: "인증 서버가 아직 연결되지 않았습니다.", tone: "info" };
const FIND_DISCONNECTED = {
  text: "아이디 찾기 서버가 아직 연결되지 않았습니다.",
  tone: "info",
};
const REQUEST_FAILED = {
  text: "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  tone: "error",
};

const EMAIL_RESULT_MESSAGES = {
  unregistered: EMAIL_UNREGISTERED,
  disconnected: EMAIL_DISCONNECTED,
};

const CODE_RESULT_MESSAGES = {
  mismatch: CODE_MISMATCH,
  verified: CODE_VERIFIED,
  disconnected: CODE_DISCONNECTED,
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const formatRemaining = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;
  return `${minutes}:${String(remain).padStart(2, "0")}`;
};

// 이메일 가입 확인과 인증번호 발송은 명세에 URL·method·요청 필드·응답 필드·인증 방식이 없다.
// 계약을 만들기 전에는 요청을 보내지 않고 null을 반환한다.
// eslint-disable-next-line no-unused-vars
const requestIdFindCode = async (email) => null;

// 인증번호 검증 API 계약이 없다. 인증번호를 만들거나 고정 값으로 성공 처리하지 않는다.
// eslint-disable-next-line no-unused-vars
const verifyIdFindCode = async ({ email, verificationCode }) => null;

// 아이디 조회 API 계약이 없다. 응답 필드 이름을 만들지 않는다.
// 명세에서 확인된 아이디 문자열이 정해진 뒤에만 그 문자열을 반환한다.
// eslint-disable-next-line no-unused-vars
const findLoginId = async ({ name, email }) => null;

function FieldMessage({ message }) {
  if (!message) return null;
  return (
    <p className={`find-id-message is-${message.tone}`} aria-live="polite">
      {message.text}
    </p>
  );
}

export default function FindId() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(null);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeMessage, setCodeMessage] = useState(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [findMessage, setFindMessage] = useState(null);
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

  const isSubmittable =
    name.trim() !== "" && isEmailRegistered && isCodeVerified;

  const resetVerification = () => {
    setIsEmailRegistered(false);
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

  const handleCodeChange = (event) => {
    setVerificationCode(event.target.value);
    setCodeMessage(null);
    setIsCodeVerified(false);
  };

  const handleSendCode = async () => {
    if (isSendingCode) return;
    if (!isValidEmail(email)) {
      setEmailMessage(EMAIL_FORMAT_ERROR);
      setIsEmailRegistered(false);
      return;
    }
    const requestId = sendRequestId.current + 1;
    sendRequestId.current = requestId;
    setIsSendingCode(true);
    setEmailMessage(null);
    try {
      const response = await requestIdFindCode(email);
      if (requestId !== sendRequestId.current) return;
      if (!response) {
        setEmailMessage(EMAIL_RESULT_MESSAGES.disconnected);
        return;
      }
      // 가입 여부·발송 성공·남은 시간을 구분하는 응답 구조가 명세에 없다.
      // 값이 있어도 가입 확인·발송 성공으로 처리하지 않는다.
      setEmailMessage(EMAIL_RESULT_MESSAGES.disconnected);
    } catch {
      if (requestId !== sendRequestId.current) return;
      setIsEmailRegistered(false);
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
      const response = await verifyIdFindCode({ email, verificationCode });
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

  const handleFind = async (event) => {
    event.preventDefault();
    if (!isSubmittable || isSubmitting) return;

    setIsSubmitting(true);
    setFindMessage(null);
    try {
      const loginId = await findLoginId({ name, email });
      if (typeof loginId !== "string" || loginId.trim() === "") {
        setFindMessage(FIND_DISCONNECTED);
        return;
      }
      navigate("/find-id/complete", { state: { loginId: loginId.trim() } });
    } catch {
      setFindMessage(REQUEST_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="find-id-page">
      <div className="find-id-card">
        <h1 className="find-id-title">아이디 찾기</h1>
        <p className="find-id-description">
          가입 시 등록한 정보로 아이디를 찾을 수 있어요
        </p>

        <form className="find-id-form" onSubmit={handleFind} noValidate>
          <div className="find-id-field">
            <label className="find-id-label" htmlFor="find-id-name">
              이름
            </label>
            <input
              id="find-id-name"
              className="find-id-input"
              type="text"
              placeholder="이름을 입력해주세요."
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="find-id-field">
            <label className="find-id-label" htmlFor="find-id-email">
              이메일
            </label>
            <div className="find-id-row">
              <input
                id="find-id-email"
                className="find-id-input"
                type="email"
                placeholder="이메일을 입력해주세요."
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                className="find-id-side-button"
                type="button"
                disabled={isSendingCode}
                onClick={handleSendCode}
              >
                인증번호 받기
              </button>
            </div>
            <FieldMessage message={emailMessage} />
          </div>

          <div className="find-id-field">
            <label className="find-id-label is-accent" htmlFor="find-id-code">
              인증번호
            </label>
            <div className="find-id-row">
              <div className="find-id-code-field">
                <input
                  id="find-id-code"
                  className={
                    remainingSeconds !== null ? "find-id-input has-timer" : "find-id-input"
                  }
                  type="text"
                  inputMode="numeric"
                  placeholder="인증번호를 입력해주세요."
                  autoComplete="one-time-code"
                  disabled={!isCodeSent}
                  value={verificationCode}
                  onChange={handleCodeChange}
                />
                {remainingSeconds !== null && (
                  <span className="find-id-timer" aria-live="polite">
                    {formatRemaining(remainingSeconds)}
                  </span>
                )}
              </div>
              <button
                className="find-id-side-button"
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

          <FieldMessage message={findMessage} />

          <button
            className="find-id-submit"
            type="submit"
            disabled={!isSubmittable || isSubmitting}
          >
            아이디 찾기
          </button>
        </form>
      </div>
    </section>
  );
}
