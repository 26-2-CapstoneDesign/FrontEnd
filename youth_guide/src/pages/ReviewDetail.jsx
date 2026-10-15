import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  deleteReview,
  getReview,
  increaseViews,
  toggleLike,
  updateReview,
} from "../utils/reviewStore.js";
import "../styles/ReviewDetail.css";
import { getCurrentUser } from "../utils/authStore.js";
import {
  REPORT_TYPES,
  addReport,
  hasReported,
  shouldCountView,
} from "../utils/reviewPolicyStore.js";

const REPORT_DETAIL_MAX = 200;

const renderContent = (content) => {
  const match = content.match(/^@(\S+)\s/);
  if (!match) return content;
  return (
      <>
        <span className="comment-mention">@{match[1]}</span>{" "}
        {content.slice(match[0].length)}
      </>
  );
};

export default function ReviewDetail() {
  const navigate = useNavigate();
  const { reviewId } = useParams();

  const [currentUser] = useState(getCurrentUser);
  const [reported, setReported] = useState(() =>
      hasReported(reviewId, currentUser?.id)
  );
  const [reportOpen, setReportOpen] = useState(false);

  const [review, setReview] = useState(() => getReview(reviewId));
  const [comments, setComments] = useState(review?.commentList ?? []);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const viewed = useRef(false);

  const commentCount = comments.filter((c) => !c.deleted).length;

  useEffect(() => {
    if (!review || viewed.current) return;
    viewed.current = true;
    if (!shouldCountView(reviewId, currentUser?.id)) return;
    const updated = increaseViews(reviewId);
    if (updated) setReview(updated);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (review) {
      updateReview(reviewId, {
        commentList: comments,
        comments: commentCount,
      });
    }
  }, [comments]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!review) {
    return (
        <div className="review-detail">
          <header className="review-detail__bar">
            <button
                type="button"
                className="review-detail__back"
                onClick={() => navigate(-1)}
            >
              뒤로가기
            </button>
            <span />
            <span />
          </header>
          <p style={{ padding: 40, textAlign: "center", color: "#999" }}>
            존재하지 않는 후기예요.
          </p>
        </div>
    );
  }

  const liked =
      currentUser != null && (review.likedBy ?? []).includes(currentUser.id);
  const likeCount = review.likes ?? 0;
  const isMyReview =
      currentUser != null && review.authorId === currentUser.id;

  const topLevelComments = comments.filter((c) => c.parentId == null);
  const repliesOf = (parentId) => comments.filter((c) => c.parentId === parentId);

  const requireLogin = () => {
    if (window.confirm("로그인이 필요해요. 로그인 페이지로 이동할까요?")) {
      navigate("/login");
    }
  };

  const handleLike = () => {
    if (!currentUser) return requireLogin();
    const updated = toggleLike(reviewId, currentUser.id);
    if (updated) setReview(updated);
  };

  const handleReportClick = () => {
    if (!currentUser) return requireLogin();
    if (reported) return;
    setReportOpen(true);
  };

  const handleReported = () => {
    setReported(true);
    setReportOpen(false);
  };

  const newComment = (content, parentId) => ({
    id: Date.now(),
    parentId,
    authorId: currentUser.id,
    author: currentUser.name,
    createdAt: "방금",
    content,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return requireLogin();
    const content = text.trim();
    if (!content) return;
    // TODO: 댓글 작성 API 호출 (POST /reviews/{reviewId}/comments, body: { content, parentId: null })
    setComments((prev) => [...prev, newComment(content, null)]);
    setText("");
  };

  const startReply = (target) => {
    if (!currentUser) return requireLogin();
    const parentId = target.parentId ?? target.id;
    const mention = target.parentId != null ? `@${target.author} ` : "";
    setReplyTo({ parentId });
    setReplyText(mention);
    cancelEdit();
  };

  const cancelReply = () => {
    setReplyTo(null);
    setReplyText("");
  };

  const submitReply = (e) => {
    e.preventDefault();
    if (!currentUser) return requireLogin();
    const content = replyText.trim();
    if (!content || !replyTo) return;
    // TODO: 답글 작성 API 호출 (POST /reviews/{reviewId}/comments, body: { content, parentId })
    setComments((prev) => [...prev, newComment(content, replyTo.parentId)]);
    cancelReply();
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditText(c.content);
    cancelReply();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (commentId) => {
    const content = editText.trim();
    if (!content) return;
    // TODO: 수정 API 호출 (PUT /comments/{commentId})
    setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, content, edited: true } : c))
    );
    cancelEdit();
  };

  const removeComment = (prev, id) => {
    const target = prev.find((c) => c.id === id);
    if (!target) return prev;

    if (target.parentId == null) {
      const hasReplies = prev.some((c) => c.parentId === target.id);
      return hasReplies
          ? prev.map((c) =>
              c.id === target.id ? { ...c, deleted: true, content: "" } : c
          )
          : prev.filter((c) => c.id !== target.id);
    }

    const next = prev.filter((c) => c.id !== target.id);
    const parent = next.find((c) => c.id === target.parentId);
    if (parent?.deleted && !next.some((c) => c.parentId === parent.id)) {
      return next.filter((c) => c.id !== parent.id);
    }
    return next;
  };

  const closeConfirm = () => {
    if (deleting) return;
    setConfirm(null);
  };

  const handleConfirm = async () => {
    if (deleting) return;

    if (confirm.type === "review") {
      setDeleting(true);
      try {
        // TODO: 삭제 API 호출 (DELETE /reviews/{reviewId})
        await deleteReview(reviewId);
        navigate("/reviews", { replace: true });
      } catch (e) {
        if (e?.status === 403) {
          alert("본인이 작성한 글만 삭제할 수 있어요.");
        } else if (e?.status === 404) {
          alert("이미 삭제된 글이에요.");
          navigate("/reviews", { replace: true });
        } else {
          alert("삭제에 실패했어요. 잠시 후 다시 시도해주세요.");
        }
        setConfirm(null);
      } finally {
        setDeleting(false);
      }
      return;
    }

    // TODO: 삭제 API 호출 (DELETE /comments/{id})
    setComments((prev) => removeComment(prev, confirm.id));
    if (replyTo?.parentId === confirm.id) cancelReply();
    setConfirm(null);
  };

  const renderComment = (c) => {
    const isMine = currentUser != null && c.authorId === currentUser.id;
    const isEditing = editingId === c.id;

    if (c.deleted) {
      return (
          <div className="comment-main">
            <p className="comment-deleted">삭제된 댓글입니다.</p>
          </div>
      );
    }

    return (
        <>
          <div className="avatar avatar--sm">{c.author?.[0]}</div>
          <div className="comment-main">
            <div className="comment-head">
              <strong>{c.author}</strong>
              <span>
                {c.createdAt}
                {c.edited && " (수정됨)"}
              </span>
              {isMine && !isEditing && (
                  <span className="comment-tools">
                    <button type="button" onClick={() => startEdit(c)}>
                      수정
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirm({ type: "comment", id: c.id })}
                    >
                      삭제
                    </button>
                  </span>
              )}
            </div>

            {isEditing ? (
                <div className="comment-edit">
                  <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(c.id);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      aria-label="댓글 수정"
                      autoFocus
                  />
                  <button
                      type="button"
                      className="save"
                      onClick={() => saveEdit(c.id)}
                  >
                    저장
                  </button>
                  <button type="button" onClick={cancelEdit}>
                    취소
                  </button>
                </div>
            ) : (
                <>
                  <p>{renderContent(c.content)}</p>
                  <button
                      type="button"
                      className="comment-reply-btn"
                      onClick={() => startReply(c)}
                  >
                    답글
                  </button>
                </>
            )}
          </div>
        </>
    );
  };

  return (
      <div className="review-detail">
        <header className="review-detail__bar">
          <button
              type="button"
              className="review-detail__back"
              onClick={() => navigate(-1)}
          >
            뒤로가기
          </button>
          <span />
          <span className="review-detail__bar-spacer" />
        </header>

        <main className="review-detail__content">
          <article className="review-detail__card">
            <div className="review-detail__meta">
              <div className="avatar">{review.author?.[0]}</div>
              <div className="review-detail__meta-text">
                <strong>{review.author}</strong>
                <span>
                {review.createdAt}
                  {review.edited && " (수정됨)"}
              </span>
              </div>
              {!isMyReview && (
                  <button
                      type="button"
                      className="review-detail__report"
                      onClick={handleReportClick}
                      disabled={reported}
                  >
                    {reported ? "신고됨" : "신고"}
                  </button>
              )}
            </div>

            <h2 className="review-detail__title">
              <strong>{review.certification}</strong> {review.title}
            </h2>

            <div
                className="review-detail__body"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(review.content),
                }}
            />

            <div className="review-detail__stats">
              <span>조회 {review.views}</span>
              <button
                  type="button"
                  className={liked ? "liked" : ""}
                  onClick={handleLike}
                  aria-pressed={liked}
              >
                {liked ? "♥" : "♡"} 좋아요 {likeCount}
              </button>

              {isMyReview && (
                  <div className="review-detail__owner">
                    <button
                        type="button"
                        onClick={() => navigate(`/reviews/${reviewId}/edit`)}
                    >
                      수정
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirm({ type: "review" })}
                    >
                      삭제
                    </button>
                  </div>
              )}
            </div>

            <section className="review-detail__comments">
              <h3>댓글 {commentCount}</h3>
              <ul>
                {topLevelComments.map((c) => {
                  const replies = repliesOf(c.id);
                  const replyOpen = replyTo?.parentId === c.id;

                  return (
                      <li key={c.id} className="comment-thread">
                        <div className="comment-row">{renderComment(c)}</div>

                        {(replies.length > 0 || replyOpen) && (
                            <ul className="comment-replies">
                              {replies.map((r) => (
                                  <li key={r.id} className="comment-row">
                                    {renderComment(r)}
                                  </li>
                              ))}

                              {replyOpen && (
                                  <li className="comment-reply-form-wrap">
                                    <form
                                        className="review-detail__form comment-reply-form"
                                        onSubmit={submitReply}
                                    >
                                      <input
                                          type="text"
                                          value={replyText}
                                          onChange={(e) => setReplyText(e.target.value)}
                                          onKeyDown={(e) => e.key === "Escape" && cancelReply()}
                                          placeholder="답글을 입력하세요."
                                          aria-label="답글 입력"
                                          autoFocus
                                      />
                                      <button type="button" className="comment-reply-cancel" onClick={cancelReply}>
                                        취소
                                      </button>
                                      <button type="submit">등록</button>
                                    </form>
                                  </li>
                              )}
                            </ul>
                        )}
                      </li>
                  );
                })}
              </ul>

              <form className="review-detail__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={
                      currentUser
                          ? "댓글을 입력하세요."
                          : "로그인 후 댓글을 작성할 수 있어요."
                    }
                    readOnly={!currentUser}
                    onClick={!currentUser ? requireLogin : undefined}
                    aria-label="댓글 입력"
                />
                <button type="submit" aria-label="댓글 등록">
                  <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                  </svg>
                </button>
              </form>
            </section>
          </article>
        </main>

        {confirm && (
            <div
                className="modal-overlay"
                onClick={closeConfirm}
                onKeyDown={(e) => e.key === "Escape" && closeConfirm()}
            >
              <div
                  className="modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="delete-modal-title"
                  onClick={(e) => e.stopPropagation()}
              >
                <p id="delete-modal-title" className="modal__message">
                  {confirm.type === "review"
                      ? "게시글을 삭제하시겠습니까?"
                      : "댓글을 삭제하시겠습니까?"}
                </p>
                <div className="modal__actions">
                  <button
                      type="button"
                      className="modal__cancel"
                      onClick={closeConfirm}
                      disabled={deleting}
                  >
                    취소
                  </button>
                  <button
                      type="button"
                      className="modal__confirm"
                      onClick={handleConfirm}
                      disabled={deleting}
                      autoFocus
                  >
                    {deleting ? "삭제 중..." : "확인"}
                  </button>
                </div>
              </div>
            </div>
        )}

        {reportOpen && (
            <ReportModal
                reviewId={reviewId}
                userId={currentUser?.id}
                onClose={() => setReportOpen(false)}
                onReported={handleReported}
            />
        )}
      </div>
  );
}

function ReportModal({ reviewId, userId, onClose, onReported }) {
  const [type, setType] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!type) return setError("신고 사유를 선택해주세요.");
    if (type === "ETC" && !detail.trim()) {
      return setError("기타 사유를 입력해주세요.");
    }

    try {
      // TODO: 신고 API 호출 (POST /reviews/{reviewId}/reports, body: { type, detail })
      addReport(reviewId, userId, { type, detail });
      alert("신고가 접수됐어요.");
      onReported();
    } catch (e) {
      if (e?.status === 409) {
        alert("이미 신고한 글이에요.");
        onReported();
      } else {
        setError("신고에 실패했어요. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
      <div className="modal-overlay" onClick={onClose}>
        <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            onClick={(e) => e.stopPropagation()}
        >
          <p id="report-modal-title" className="modal__message">
            신고 사유를 선택해주세요
          </p>

          <div
              role="radiogroup"
              aria-labelledby="report-modal-title"
              style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0" }}
          >
            {REPORT_TYPES.map((t) => (
                <label key={t.value} style={{ display: "flex", gap: 8, cursor: "pointer" }}>
                  <input
                      type="radio"
                      name="report-type"
                      value={t.value}
                      checked={type === t.value}
                      onChange={() => {
                        setType(t.value);
                        setError("");
                      }}
                  />
                  {t.label}
                </label>
            ))}
          </div>

          {type === "ETC" && (
              <textarea
                  value={detail}
                  onChange={(e) => {
                    setDetail(e.target.value);
                    setError("");
                  }}
                  maxLength={REPORT_DETAIL_MAX}
                  placeholder="신고 사유를 입력해주세요."
                  aria-label="기타 신고 사유"
                  rows={3}
                  style={{ width: "100%", boxSizing: "border-box", resize: "none" }}
              />
          )}

          <p style={{ fontSize: 12, color: "#999", margin: "8px 0 0" }}>
            신고는 취소할 수 없어요.
          </p>
          {error && (
              <p role="alert" style={{ fontSize: 13, color: "#e5484d", margin: "6px 0 0" }}>
                {error}
              </p>
          )}

          <div className="modal__actions">
            <button type="button" className="modal__cancel" onClick={onClose}>
              취소
            </button>
            <button type="button" className="modal__confirm" onClick={handleSubmit}>
              신고하기
            </button>
          </div>
        </div>
      </div>
  );
}