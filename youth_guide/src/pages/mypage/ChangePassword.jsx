import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChangePassword.css";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;

const PASSWORD_HINT = { text: "영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.", tone: "hint" };
const CURRENT_PASSWORD_INVALID = { text: "비밀번호가 올바르지 않습니다.", tone: "error" };
const NEW_PASSWORD_INVALID = { text: "사용할 수 없는 비밀번호입니다.", tone: "error" };
const NEW_PASSWORD_MISMATCH = { text: "일치하지 않는 비밀번호입니다.", tone: "error" };
const CHANGE_DISCONNECTED = { text: "비밀번호 변경 서버가 아직 연결되지 않았습니다.", tone: "info" };
const REQUEST_FAILED = { text: "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.", tone: "error" };

const isValidPassword = (value) =>
  value.length >= PASSWORD_MIN_LENGTH &&
  value.length <= PASSWORD_MAX_LENGTH &&
  /[A-Za-z]/.test(value) &&
  /\d/.test(value) &&
  /[^A-Za-z\d\s]/.test(value);

// 비밀번호 변경 API는 명세에 없어 URL·요청 필드·응답 구조·인증 방식을 정할 수 없다. 명세가 확정되면 구현한다.
// 연결 전에는 응답을 돌려주지 않으므로 화면은 홈으로 이동하지 않는다.
// 인자는 화면 상태 값이며 API 요청 필드 이름이 아니다.
// eslint-disable-next-line no-unused-vars
const changePassword = async ({ currentPassword, newPassword }) => {};

function FieldMessage({ message }) {
  if (!message) return null;
  return (
    <p className={`change-password-message is-${message.tone}`} aria-live="polite">
      {message.text}
    </p>
  );
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPasswordInvalid, setIsCurrentPasswordInvalid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNewPasswordValid = isValidPassword(newPassword);
  const isNewPasswordError =
    (newPassword !== "" || isSubmitAttempted) && !isNewPasswordValid;
  const isNewPasswordConfirmed = newPasswordConfirm === newPassword;
  const isConfirmError = newPasswordConfirm !== "" && !isNewPasswordConfirmed;

  const newPasswordMessage = isNewPasswordError
    ? NEW_PASSWORD_INVALID
    : newPassword === ""
      ? PASSWORD_HINT
      : null;

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    setIsCurrentPasswordInvalid(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitAttempted(true);
    setSubmitMessage(null);
    const isCurrentPasswordEmpty = currentPassword === "";
    setIsCurrentPasswordInvalid(isCurrentPasswordEmpty);
    if (
      isCurrentPasswordEmpty ||
      !isNewPasswordValid ||
      newPasswordConfirm === "" ||
      !isNewPasswordConfirmed
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await changePassword({ currentPassword, newPassword });
      if (!response) {
        setSubmitMessage(CHANGE_DISCONNECTED);
        return;
      }
      // 현재 비밀번호 오류를 나타내는 상태 코드·오류 코드는 명세가 확정되면 CURRENT_PASSWORD_INVALID로 연결한다.
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
    <section className="change-password-page">
      <div className="change-password-card">
        <header className="change-password-header">
          <h1 className="change-password-title">비밀번호 변경</h1>
          <p className="change-password-guide">
            <span className="change-password-emphasis">
              다른 아이디/사이트에서 사용한 적 없는 비밀번호,
            </span>
            <br />
            <span className="change-password-emphasis">이전에 사용한 적 없는</span>{" "}
            비밀번호가 안전합니다.
          </p>
        </header>

        <form className="change-password-form" onSubmit={handleSubmit} noValidate>
          <div className="change-password-field">
            <label className="change-password-label" htmlFor="change-password-current">
              현재 비밀번호
            </label>
            <div className="change-password-control">
              <input
                id="change-password-current"
                className={
                  isCurrentPasswordInvalid
                    ? "change-password-input is-error"
                    : "change-password-input"
                }
                type="password"
                placeholder="현재 비밀번호를 입력해주세요."
                autoComplete="current-password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
              {isCurrentPasswordInvalid && (
                <FieldMessage message={CURRENT_PASSWORD_INVALID} />
              )}
            </div>
          </div>

          <div className="change-password-field">
            <label className="change-password-label" htmlFor="change-password-new">
              새 비밀번호
            </label>
            <div className="change-password-control">
              <input
                id="change-password-new"
                className={
                  isNewPasswordError
                    ? "change-password-input is-error"
                    : "change-password-input"
                }
                type="password"
                placeholder="새 비밀번호를 입력해주세요."
                autoComplete="new-password"
                maxLength={PASSWORD_MAX_LENGTH}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <FieldMessage message={newPasswordMessage} />
            </div>
          </div>

          <div className="change-password-field">
            <label className="change-password-label" htmlFor="change-password-confirm">
              새 비밀번호 확인
            </label>
            <div className="change-password-control">
              <input
                id="change-password-confirm"
                className={
                  isConfirmError
                    ? "change-password-input is-error"
                    : "change-password-input"
                }
                type="password"
                placeholder="새 비밀번호를 다시 입력해주세요."
                autoComplete="new-password"
                maxLength={PASSWORD_MAX_LENGTH}
                value={newPasswordConfirm}
                onChange={(event) => setNewPasswordConfirm(event.target.value)}
              />
              {isConfirmError && <FieldMessage message={NEW_PASSWORD_MISMATCH} />}
            </div>
          </div>

          <FieldMessage message={submitMessage} />

          <button
            className="change-password-submit"
            type="submit"
            disabled={isSubmitting}
          >
            완료
          </button>
        </form>
      </div>
    </section>
  );
}
