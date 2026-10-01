import { useState } from "react";
import "../styles/SignUp.css";

const ID_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
const NAME_MAX_LENGTH = 20;
const NICKNAME_MAX_LENGTH = 30;
const BIRTH_YEAR_START = 2009;
const BIRTH_YEAR_END = 1900;

const GENDER_OPTIONS = ["여성", "남성", "비공개"];

const TERMS = [
  { id: "service", label: "(필수) 이용약관 동의", isRequired: true },
  { id: "privacy", label: "(필수) 개인정보 수집 및 이용 동의", isRequired: true },
  { id: "marketing", label: "(선택) 마케팅 정보 수신 동의", isRequired: false },
];

const ID_CHECK_MESSAGES = {
  available: { text: "사용 가능한 아이디입니다.", tone: "success" },
  duplicate: { text: "이미 존재하는 아이디입니다.", tone: "error" },
  disconnected: { text: "중복 확인 서버가 아직 연결되지 않았습니다.", tone: "info" },
};

const NICKNAME_CHECK_MESSAGES = {
  available: { text: "사용 가능한 닉네임입니다.", tone: "success" },
  duplicate: { text: "이미 존재하는 닉네임입니다.", tone: "error" },
  disconnected: { text: "중복 확인 서버가 아직 연결되지 않았습니다.", tone: "info" },
};

const EMAIL_MESSAGES = {
  invalid: { text: "이메일 형식이 올바르지 않습니다.", tone: "error" },
  duplicate: { text: "이미 가입된 이메일입니다.", tone: "error" },
  disconnected: { text: "인증 서버가 아직 연결되지 않았습니다.", tone: "info" },
};

const CODE_MESSAGES = {
  verified: { text: "인증되었습니다.", tone: "success" },
  mismatch: { text: "인증번호를 확인해 주세요.", tone: "error" },
  disconnected: { text: "인증 서버가 아직 연결되지 않았습니다.", tone: "info" },
};

const PASSWORD_HINT = "영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.";
const PASSWORD_MISMATCH = "비밀번호가 일치하지 않습니다.";
const TERMS_REQUIRED = "필수 약관에 동의해주세요.";
const SUBMIT_DISCONNECTED = "회원가입 서버가 아직 연결되지 않았습니다.";

const BIRTH_YEARS = Array.from(
  { length: BIRTH_YEAR_START - BIRTH_YEAR_END + 1 },
  (_, index) => BIRTH_YEAR_START - index,
);
const BIRTH_MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);

const isValidPassword = (value) =>
  value.length >= PASSWORD_MIN_LENGTH &&
  value.length <= PASSWORD_MAX_LENGTH &&
  /[A-Za-z]/.test(value) &&
  /\d/.test(value) &&
  /[^A-Za-z\d\s]/.test(value);

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const getDaysInMonth = (year, month) => {
  if (!month) return 31;
  // 연도를 고르지 않았으면 2월 29일까지 선택할 수 있도록 윤년을 기준으로 계산한다.
  return new Date(year ? Number(year) : 2000, Number(month), 0).getDate();
};

function FieldMessage({ message }) {
  if (!message) return null;
  return (
    <p className={`signup-message is-${message.tone}`} aria-live="polite">
      {message.text}
    </p>
  );
}

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [idCheckStatus, setIdCheckStatus] = useState("idle");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeStatus, setCodeStatus] = useState("idle");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameCheckStatus, setNicknameCheckStatus] = useState("idle");
  const [agreedTerms, setAgreedTerms] = useState(() =>
    Object.fromEntries(TERMS.map((term) => [term.id, false])),
  );
  const [isTermsTouched, setIsTermsTouched] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const isUserIdEmpty = userId.trim() === "";
  const isEmailEmpty = email.trim() === "";
  const isPasswordValid = isValidPassword(password);
  const isPasswordConfirmed =
    passwordConfirm !== "" && passwordConfirm === password;
  const isAllTermsAgreed = TERMS.every((term) => agreedTerms[term.id]);
  const isRequiredTermsAgreed = TERMS.filter((term) => term.isRequired).every(
    (term) => agreedTerms[term.id],
  );
  const birthDays = Array.from(
    { length: getDaysInMonth(birthYear, birthMonth) },
    (_, index) => index + 1,
  );

  const isSubmittable =
    idCheckStatus === "available" &&
    isPasswordValid &&
    isPasswordConfirmed &&
    codeStatus === "verified" &&
    name.trim() !== "" &&
    gender !== "" &&
    birthYear !== "" &&
    birthMonth !== "" &&
    birthDay !== "" &&
    nicknameCheckStatus === "available" &&
    isRequiredTermsAgreed;

  const passwordHintTone =
    password !== "" && !isPasswordValid ? "error" : "hint";

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
    setIdCheckStatus("idle");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailStatus("idle");
    setCodeStatus("idle");
  };

  const handleSendCode = () => {
    setEmailStatus(isValidEmail(email) ? "disconnected" : "invalid");
  };

  const handleCodeChange = (event) => {
    setVerificationCode(event.target.value);
    setCodeStatus("idle");
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    setNicknameCheckStatus("idle");
  };

  const handleBirthYearChange = (event) => {
    const nextYear = event.target.value;
    setBirthYear(nextYear);
    if (Number(birthDay) > getDaysInMonth(nextYear, birthMonth)) {
      setBirthDay("");
    }
  };

  const handleBirthMonthChange = (event) => {
    const nextMonth = event.target.value;
    setBirthMonth(nextMonth);
    if (Number(birthDay) > getDaysInMonth(birthYear, nextMonth)) {
      setBirthDay("");
    }
  };

  const handleAllTermsChange = (event) => {
    const { checked } = event.target;
    setAgreedTerms(
      Object.fromEntries(TERMS.map((term) => [term.id, checked])),
    );
    setIsTermsTouched(true);
  };

  const handleTermChange = (termId) => (event) => {
    const { checked } = event.target;
    setAgreedTerms((prev) => ({ ...prev, [termId]: checked }));
    setIsTermsTouched(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isSubmittable) return;
    setSubmitMessage(SUBMIT_DISCONNECTED);
  };

  return (
    <section className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">회원가입</h1>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-user-id">
              아이디
            </label>
            <div className="signup-row">
              <input
                id="signup-user-id"
                className="signup-input"
                type="text"
                placeholder="아이디를 입력해주세요."
                autoComplete="username"
                maxLength={ID_MAX_LENGTH}
                value={userId}
                onChange={handleUserIdChange}
              />
              <button
                className={
                  isUserIdEmpty
                    ? "signup-side-button"
                    : "signup-side-button is-primary"
                }
                type="button"
                disabled={isUserIdEmpty}
                onClick={() => setIdCheckStatus("disconnected")}
              >
                중복 확인
              </button>
            </div>
            <FieldMessage message={ID_CHECK_MESSAGES[idCheckStatus]} />
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-password">
              비밀번호
            </label>
            <input
              id="signup-password"
              className="signup-input"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="new-password"
              maxLength={PASSWORD_MAX_LENGTH}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <FieldMessage
              message={{ text: PASSWORD_HINT, tone: passwordHintTone }}
            />
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-password-confirm">
              비밀번호 확인
            </label>
            <input
              id="signup-password-confirm"
              className="signup-input"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              autoComplete="new-password"
              maxLength={PASSWORD_MAX_LENGTH}
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
            {passwordConfirm !== "" && !isPasswordConfirmed && (
              <FieldMessage
                message={{ text: PASSWORD_MISMATCH, tone: "error" }}
              />
            )}
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-email">
              이메일
            </label>
            <div className="signup-row">
              <input
                id="signup-email"
                className="signup-input"
                type="email"
                placeholder="이메일을 입력해주세요."
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                className={
                  isEmailEmpty
                    ? "signup-side-button"
                    : "signup-side-button is-primary"
                }
                type="button"
                disabled={isEmailEmpty}
                onClick={handleSendCode}
              >
                인증번호 발송
              </button>
            </div>
            <FieldMessage message={EMAIL_MESSAGES[emailStatus]} />
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-code">
              인증번호
            </label>
            <div className="signup-row">
              <input
                id="signup-code"
                className="signup-input"
                type="text"
                inputMode="numeric"
                placeholder="인증번호를 입력해주세요."
                autoComplete="one-time-code"
                value={verificationCode}
                onChange={handleCodeChange}
              />
              <button
                className="signup-side-button"
                type="button"
                disabled={verificationCode.trim() === ""}
                onClick={() => setCodeStatus("disconnected")}
              >
                확인
              </button>
            </div>
            <FieldMessage message={CODE_MESSAGES[codeStatus]} />
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-name">
              이름
            </label>
            <input
              id="signup-name"
              className="signup-input"
              type="text"
              placeholder="이름을 입력해주세요."
              autoComplete="name"
              maxLength={NAME_MAX_LENGTH}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <fieldset className="signup-field signup-fieldset">
            <legend className="signup-label">성별</legend>
            <div className="signup-gender">
              {GENDER_OPTIONS.map((option) => (
                <label key={option} className="signup-gender-option">
                  <input
                    className="signup-gender-input"
                    type="radio"
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={(event) => setGender(event.target.value)}
                  />
                  <span className="signup-gender-label">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="signup-field signup-fieldset">
            <legend className="signup-label">생년월일</legend>
            <div className="signup-birth">
              <div className="signup-birth-item">
                <select
                  className="signup-select"
                  aria-label="태어난 년도"
                  required
                  value={birthYear}
                  onChange={handleBirthYearChange}
                >
                  <option value="">년도</option>
                  {BIRTH_YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <span className="signup-birth-unit" aria-hidden="true">
                  년
                </span>
              </div>
              <div className="signup-birth-item">
                <select
                  className="signup-select"
                  aria-label="태어난 월"
                  required
                  value={birthMonth}
                  onChange={handleBirthMonthChange}
                >
                  <option value="">월</option>
                  {BIRTH_MONTHS.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <span className="signup-birth-unit" aria-hidden="true">
                  월
                </span>
              </div>
              <div className="signup-birth-item">
                <select
                  className="signup-select"
                  aria-label="태어난 일"
                  required
                  value={birthDay}
                  onChange={(event) => setBirthDay(event.target.value)}
                >
                  <option value="">일</option>
                  {birthDays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <span className="signup-birth-unit" aria-hidden="true">
                  일
                </span>
              </div>
            </div>
          </fieldset>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-nickname">
              닉네임
            </label>
            <div className="signup-row">
              <input
                id="signup-nickname"
                className="signup-input"
                type="text"
                placeholder="닉네임을 입력해주세요."
                autoComplete="nickname"
                maxLength={NICKNAME_MAX_LENGTH}
                value={nickname}
                onChange={handleNicknameChange}
              />
              <button
                className="signup-side-button"
                type="button"
                disabled={nickname.trim() === ""}
                onClick={() => setNicknameCheckStatus("disconnected")}
              >
                중복 확인
              </button>
            </div>
            <FieldMessage message={NICKNAME_CHECK_MESSAGES[nicknameCheckStatus]} />
          </div>

          <fieldset className="signup-field signup-fieldset">
            <legend className="signup-label">약관</legend>
            {isTermsTouched && !isRequiredTermsAgreed && (
              <FieldMessage message={{ text: TERMS_REQUIRED, tone: "error" }} />
            )}
            <div className="signup-terms">
              <label className="signup-check is-all">
                <input
                  className="signup-checkbox"
                  type="checkbox"
                  checked={isAllTermsAgreed}
                  onChange={handleAllTermsChange}
                />
                <span>전체 동의</span>
              </label>
              <div className="signup-terms-list">
                {TERMS.map((term) => (
                  <label key={term.id} className="signup-check">
                    <input
                      className="signup-checkbox"
                      type="checkbox"
                      checked={agreedTerms[term.id]}
                      onChange={handleTermChange(term.id)}
                    />
                    <span>{term.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>

          {submitMessage && (
            <FieldMessage message={{ text: submitMessage, tone: "info" }} />
          )}

          <button
            className="signup-submit"
            type="submit"
            disabled={!isSubmittable}
          >
            회원가입
          </button>
        </form>
      </div>
    </section>
  );
}
