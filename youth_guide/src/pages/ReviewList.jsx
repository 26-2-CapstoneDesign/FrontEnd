import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ReviewList.css";
import { getReviews, seedDummyReviews } from "../utils/reviewStore.js";

const PAGE_SIZE = 10;
const PAGE_GROUP_SIZE = 8;

if (getReviews().length < 100) seedDummyReviews(100);

export default function ReviewList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [reviews] = useState(getReviews);

  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setInput("");
    setKeyword("");
    setPage(1);
  }, [location.key]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return reviews;

    const certMatched = [];
    const titleMatched = [];

    reviews.forEach((r) => {
      if ((r.certification ?? "").toLowerCase().includes(k)) {
        certMatched.push(r);
      } else if (r.title.toLowerCase().includes(k)) {
        titleMatched.push(r);
      }
    });

    return [...certMatched, ...titleMatched];
  }, [reviews, keyword]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const searching = keyword.trim() !== "";

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(input);
    setPage(1);
  };

  const goToPage = (n) => {
    if (n < 1 || n > totalPages) return;
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const groupStart =
      Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNumbers = Array.from(
      { length: groupEnd - groupStart + 1 },
      (_, i) => groupStart + i
  );

  return (
      <main className="review-list">
        {searching && (
            <h1 className="review-list__title">
              <strong>'{keyword.trim()}'</strong> 후기 검색 결과
            </h1>
        )}

        <form className="review-list__search" onSubmit={handleSearch}>
          <div className="review-list__field">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="검색어를 입력하세요"
                aria-label="후기 검색"
                spellCheck={false}
            />
            {input && (
                <button
                    type="button"
                    className="review-list__clear"
                    onClick={() => setInput("")}
                    aria-label="검색어 지우기"
                >
                  ×
                </button>
            )}
            <button
                type="submit"
                className="review-list__search-btn"
                aria-label="검색"
            >
              <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </button>
          </div>

          <button
              type="button"
              className="review-list__submit"
              onClick={() => navigate("/reviews/new")}
          >
            글쓰기 +
          </button>
        </form>

        <div className="review-list__card">
          <table className="review-table">
            <colgroup>
              <col />
              <col style={{ width: "90px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "70px" }} />
              <col style={{ width: "70px" }} />
              <col style={{ width: "70px" }} />
            </colgroup>
            <thead>
            <tr>
              <th className="left">제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요</th>
              <th>댓글수</th>
            </tr>
            </thead>
            <tbody>
            {current.length === 0 ? (
                <tr>
                  <td colSpan={6} className="review-table__empty">
                    {searching
                        ? `'${keyword.trim()}'에 대한 검색 결과가 없어요.`
                        : "아직 작성된 후기가 없어요. 첫 후기를 작성해보세요."}
                  </td>
                </tr>
            ) : (
                current.map((r) => (
                    <tr
                        key={r.id}
                        onClick={() => navigate(`/reviews/${r.id}`)}
                        tabIndex={0}
                        onKeyDown={(e) =>
                            e.key === "Enter" && navigate(`/reviews/${r.id}`)
                        }
                    >
                      <td className="left review-table__title">
                        <strong>{r.certification}</strong> {r.title}
                      </td>
                      <td>{r.author}</td>
                      <td>{r.createdAt}</td>
                      <td>{r.views}</td>
                      <td>{r.likes}</td>
                      <td>{r.comments}</td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
            <nav className="review-pagination" aria-label="페이지 이동">
              <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  aria-label="이전 페이지"
              >
                &lt;
              </button>

              {pageNumbers.map((n) => (
                  <button
                      key={n}
                      type="button"
                      className={n === page ? "active" : ""}
                      aria-current={n === page ? "page" : undefined}
                      onClick={() => goToPage(n)}
                  >
                    {n}
                  </button>
              ))}

              <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="다음 페이지"
              >
                &gt;
              </button>
            </nav>
        )}
      </main>
  );
}