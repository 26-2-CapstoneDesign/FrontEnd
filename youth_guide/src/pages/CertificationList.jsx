import { Link, useSearchParams } from "react-router-dom";
import { getExamList } from "../data/certifications";
import "../styles/CertificationList.css";

const PAGE_SIZE = 6;
const PAGE_GROUP_SIZE = 5;

const formatRange = ([start, end]) => (end ? `${start} ~ ${end}` : start);

export default function CertificationList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") ?? "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const results = getExamList().filter(
    (exam) =>
      !keyword ||
      [exam.title, ...exam.tags].some((text) =>
        text.toLowerCase().includes(keyword),
      ),
  );
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const groupStart =
    Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNumbers = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, i) => groupStart + i,
  );

  const movePage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="cert-list">
      <p className="cert-list-summary">
        {keyword && <>&lsquo;{keyword}&rsquo; </>}검색 결과{" "}
        <strong>{results.length}건</strong>
      </p>

      {results.length === 0 ? (
        <p className="cert-list-empty">검색 결과가 없습니다.</p>
      ) : (
        <ul className="cert-list-items">
          {pageItems.map((exam) => (
            <li key={exam.title} className="cert-list-item">
              <div className="cert-list-main">
                <div className="cert-list-head">
                  <h2 className="cert-list-title">{exam.title}</h2>
                  <ul className="cert-list-tags">
                    {exam.tags.map((tag) => (
                      <li key={tag} className="cert-list-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <dl className="cert-list-dates">
                  <div>
                    <dt>필기접수</dt>
                    <dd>{formatRange(exam.schedule.writtenApply)}</dd>
                  </div>
                  <div>
                    <dt>필기시험</dt>
                    <dd>{formatRange(exam.schedule.written)}</dd>
                  </div>
                  <div>
                    <dt>실기원서접수</dt>
                    <dd>{formatRange(exam.schedule.practicalApply)}</dd>
                  </div>
                </dl>
              </div>
              <Link
                to={`/certifications/${exam.certId}`}
                className="cert-list-detail-button"
              >
                상세보기 →
              </Link>
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <nav className="pagination" aria-label="페이지 이동">
          <button
            type="button"
            className="pagination-button"
            aria-label="이전 페이지"
            disabled={currentPage === 1}
            onClick={() => movePage(currentPage - 1)}
          >
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              type="button"
              className={`pagination-button${number === currentPage ? " is-current" : ""}`}
              aria-current={number === currentPage ? "page" : undefined}
              onClick={() => movePage(number)}
            >
              {number}
            </button>
          ))}
          <button
            type="button"
            className="pagination-button"
            aria-label="다음 페이지"
            disabled={currentPage === totalPages}
            onClick={() => movePage(currentPage + 1)}
          >
            &gt;
          </button>
        </nav>
      )}
    </div>
  );
}
