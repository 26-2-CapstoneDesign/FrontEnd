import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FirstLogin.css";

const INTEREST_PAGE_SIZE = 3;
const SEARCH_MAX_LENGTH = 100;

// 아래 mock 값은 화면 동작 확인용 가상 데이터이며 실제 NCS 분류나 자격증 데이터가 아니다.
// 상태: Mock 데이터 사용. API가 연결되기 전까지 화면 확인용으로 유지한다.
// 닉네임 조회 API는 명세에 없다(API 명세 미정).
const MOCK_NICKNAME = "사용자";
const MOCK_NCS_RELEASE_ID = "mock-release";

const MOCK_NCS_CATEGORIES = [
  { ncsCategoryId: "mock-category-a", ncsReleaseId: MOCK_NCS_RELEASE_ID, code: "MOCK_A", name: "샘플 분류 A", levelCode: "MOCK_LEVEL", parentCategoryId: null },
  { ncsCategoryId: "mock-category-b", ncsReleaseId: MOCK_NCS_RELEASE_ID, code: "MOCK_B", name: "샘플 분류 B", levelCode: "MOCK_LEVEL", parentCategoryId: null },
  { ncsCategoryId: "mock-category-c", ncsReleaseId: MOCK_NCS_RELEASE_ID, code: "MOCK_C", name: "샘플 분류 C", levelCode: "MOCK_LEVEL", parentCategoryId: null },
  { ncsCategoryId: "mock-category-d", ncsReleaseId: MOCK_NCS_RELEASE_ID, code: "MOCK_D", name: "샘플 분류 D", levelCode: "MOCK_LEVEL", parentCategoryId: null },
];

// ncsReleaseId·ncsCategoryId는 CERT-01 응답 필드가 아니라 mock 필터링에만 쓰는 값이다.
const MOCK_CERTIFICATES = [
  { certificateId: "mock-01", displayName: "샘플 자격증 01", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-a" },
  { certificateId: "mock-02", displayName: "샘플 자격증 02", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-a" },
  { certificateId: "mock-03", displayName: "샘플 자격증 03", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-b" },
  { certificateId: "mock-04", displayName: "샘플 자격증 04", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-b" },
  { certificateId: "mock-05", displayName: "샘플 자격증 05", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-c" },
  { certificateId: "mock-06", displayName: "샘플 자격증 06", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-c" },
  { certificateId: "mock-07", displayName: "샘플 자격증 07", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-d" },
  { certificateId: "mock-08", displayName: "샘플 자격증 08", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-a" },
  { certificateId: "mock-09", displayName: "샘플 자격증 09", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-b" },
  { certificateId: "mock-10", displayName: "샘플 자격증 10", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-c" },
  { certificateId: "mock-11", displayName: "샘플 자격증 11", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-d" },
  { certificateId: "mock-12", displayName: "샘플 자격증 12", ncsReleaseId: MOCK_NCS_RELEASE_ID, ncsCategoryId: "mock-category-d" },
];

// 관심 자격증 조회·추천 자격증 API는 명세에 없다(API 명세 미정).
const MOCK_INTEREST_IDS = ["mock-01", "mock-03", "mock-05", "mock-07", "mock-08", "mock-10", "mock-11"];
const MOCK_RECOMMENDED_IDS = ["mock-02", "mock-03", "mock-04", "mock-06", "mock-09", "mock-12"];

const CERTIFICATE_BY_ID = Object.fromEntries(
  MOCK_CERTIFICATES.map((certificate) => [certificate.certificateId, certificate]),
);
const CATEGORY_NAME_BY_ID = Object.fromEntries(
  MOCK_NCS_CATEGORIES.map((category) => [category.ncsCategoryId, category.name]),
);
const MOCK_RECOMMENDED_CERTIFICATES = MOCK_RECOMMENDED_IDS.map((id) => CERTIFICATE_BY_ID[id]);

/* eslint-disable no-unused-vars */

// CERT-01·NCS-01·NCS-02는 API 명세의 제안 URL·파라미터·응답 구조({ data: { items, page, size, hasNext } })를 따른다.
// 상태: API 연결 준비. 백엔드 구현 대기라 화면에서는 아직 호출하지 않고 mock 데이터를 쓴다.
const getPage = async (path, params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.append(key, value);
  });
  const queryString = query.toString();
  const response = await fetch(queryString ? `${path}?${queryString}` : path);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const { data } = await response.json();
  return data;
};

// CERT-01 자격증 목록·검색. NCS 필터는 ncsReleaseId·ncsCategoryId를 함께 전달한다.
const searchCertificates = ({ q, ncsReleaseId, ncsCategoryId, page, size } = {}) =>
  getPage("/api/v1/certificates", { q, ncsReleaseId, ncsCategoryId, page, size });

// NCS-01 NCS 기준 자료 목록
const getNcsReleases = ({ page, size } = {}) =>
  getPage("/api/v1/ncs/releases", { page, size });

// NCS-02 NCS 하위 분류 조회. parentCategoryId가 없으면 루트 분류를 조회한다.
const getNcsCategories = (ncsReleaseId, { parentCategoryId, page, size } = {}) =>
  getPage(`/api/v1/ncs/releases/${encodeURIComponent(ncsReleaseId)}/categories`, {
    parentCategoryId,
    page,
    size,
  });

// 아래 기능의 API는 명세에 없어 URL·요청 필드·응답 구조·인증 방식을 정할 수 없다.
// 상태: API 명세 미정(백엔드 API 필요). 명세가 확정되면 구현하고, 그 전까지 화면은 mock 데이터를 쓴다.
// 인자는 화면 상태 값이며 API 요청 필드 이름이 아니다.
const getInterestCertificates = async () => {};
const saveInterestCertificates = async (certificateIds) => {};
const getAcquiredCertificates = async () => {};
const saveAcquiredCertificate = async ({ certificateId, acquiredDate }) => {};
const getRecommendedCertificates = async () => {};
const getFirstLoginStatus = async () => {};
const getNickname = async () => {};

/* eslint-enable no-unused-vars */

const SEARCH_EMPTY = "검색어를 입력해 주세요.";
const LIST_EMPTY = "조건에 맞는 자격증이 없습니다.";
const INTEREST_EMPTY = "아직 관심 자격증이 없습니다. 아래에서 자격증을 추가해 보세요.";
const ACQUIRED_SELECT_REQUIRED = "등록할 자격증을 선택해 주세요.";
const ACQUIRED_DUPLICATE = "이미 등록한 취득 자격증입니다.";
const ACQUIRED_DATE_REQUIRED = "취득일을 입력해 주세요.";
const ACQUIRED_DATE_FUTURE = "취득일은 오늘 이후 날짜로 입력할 수 없습니다.";

const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const formatDate = (value) => value.replaceAll("-", ".");

const filterCertificates = (certificates, { query, category }) =>
  certificates.filter(
    (certificate) =>
      (!query || certificate.displayName.includes(query)) &&
      (!category ||
        (certificate.ncsReleaseId === category.ncsReleaseId &&
          certificate.ncsCategoryId === category.ncsCategoryId)),
  );

function CertificateIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 9.5h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FirstLogin() {
  const [interestIds, setInterestIds] = useState(MOCK_INTEREST_IDS);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [completeMessage, setCompleteMessage] = useState("");
  // 취득 자격증 조회 API가 명세에 없어(API 명세 미정) 빈 목록에서 시작한다.
  const [acquiredList, setAcquiredList] = useState([]);
  const [isAcquiredFormOpen, setIsAcquiredFormOpen] = useState(false);
  const [acquiredQuery, setAcquiredQuery] = useState("");
  const [selectedAcquiredId, setSelectedAcquiredId] = useState(null);
  const [acquiredDate, setAcquiredDate] = useState("");
  const [acquiredMessage, setAcquiredMessage] = useState("");

  const today = getToday();
  const acquiredIds = new Set(acquiredList.map((acquired) => acquired.certificateId));
  const acquiredResults = filterCertificates(MOCK_CERTIFICATES, {
    query: acquiredQuery.trim(),
    category: null,
  });

  const interests = interestIds.map((id) => CERTIFICATE_BY_ID[id]);
  const pageCount = Math.max(1, Math.ceil(interests.length / INTEREST_PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const pagedInterests = interests.slice(
    currentPage * INTEREST_PAGE_SIZE,
    (currentPage + 1) * INTEREST_PAGE_SIZE,
  );

  const isSearching = searchQuery !== null;
  const listedCertificates = filterCertificates(
    isSearching ? MOCK_CERTIFICATES : MOCK_RECOMMENDED_CERTIFICATES,
    { query: searchQuery, category: selectedCategory },
  );

  const handleRemove = (certificateId) => {
    const nextPageCount = Math.max(1, Math.ceil((interests.length - 1) / INTEREST_PAGE_SIZE));
    setInterestIds((prev) => prev.filter((id) => id !== certificateId));
    setPage(Math.min(currentPage, nextPageCount - 1));
    setCompleteMessage("");
  };

  const handleAdd = (certificateId) => {
    setInterestIds((prev) => (prev.includes(certificateId) ? prev : [...prev, certificateId]));
    setCompleteMessage("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchInput.trim();
    if (!query) {
      setSearchQuery(null);
      setSearchMessage(SEARCH_EMPTY);
      return;
    }
    setSearchQuery(query);
    setSearchMessage("");
  };

  const handleSearchReset = () => {
    setSearchInput("");
    setSearchQuery(null);
    setSearchMessage("");
  };

  const openAcquiredForm = () => {
    setIsAcquiredFormOpen(true);
    setAcquiredMessage("");
  };

  const closeAcquiredForm = () => {
    setIsAcquiredFormOpen(false);
    setAcquiredQuery("");
    setSelectedAcquiredId(null);
    setAcquiredDate("");
    setAcquiredMessage("");
  };

  const handleAcquiredRegister = async () => {
    if (!selectedAcquiredId) {
      setAcquiredMessage(ACQUIRED_SELECT_REQUIRED);
      return;
    }
    if (acquiredIds.has(selectedAcquiredId)) {
      setAcquiredMessage(ACQUIRED_DUPLICATE);
      return;
    }
    if (!acquiredDate) {
      setAcquiredMessage(ACQUIRED_DATE_REQUIRED);
      return;
    }
    if (acquiredDate > today) {
      setAcquiredMessage(ACQUIRED_DATE_FUTURE);
      return;
    }
    await saveAcquiredCertificate({ certificateId: selectedAcquiredId, acquiredDate });
    setAcquiredList((prev) => [...prev, { certificateId: selectedAcquiredId, acquiredDate }]);
    setCompleteMessage("");
    closeAcquiredForm();
  };

  const handleAcquiredRemove = (certificateId) => {
    setAcquiredList((prev) => prev.filter((acquired) => acquired.certificateId !== certificateId));
    setCompleteMessage("");
  };

  const handleComplete = async () => {
    await saveInterestCertificates(interestIds);
    setCompleteMessage(
      `관심 자격증 ${interests.length}개, 취득한 자격증 ${acquiredList.length}개로 선택을 완료했습니다. 서버 저장은 아직 연결되지 않았습니다.`,
    );
  };

  return (
    <div className="interest-page">
      <section className="interest-card" aria-labelledby="interest-title">
        <p className="interest-guide">
          {MOCK_NICKNAME}님에게 필요할 만한 다른 자격증도 추천해드릴게요
        </p>
        <h1 id="interest-title" className="interest-title">
          내 관심 자격증 {interests.length}개
        </h1>

        {interests.length === 0 ? (
          <p className="interest-empty">{INTEREST_EMPTY}</p>
        ) : (
          <ul className="interest-list">
            {pagedInterests.map((certificate) => (
              <li key={certificate.certificateId} className="interest-item">
                <span className="interest-item-icon">
                  <CertificateIcon />
                </span>
                <div className="interest-item-text">
                  <div className="interest-item-title">
                    <strong className="interest-item-name">{certificate.displayName}</strong>
                    {acquiredIds.has(certificate.certificateId) && (
                      <span className="interest-badge is-acquired">취득</span>
                    )}
                  </div>
                  <span className="interest-item-category">
                    {CATEGORY_NAME_BY_ID[certificate.ncsCategoryId]}
                  </span>
                </div>
                <div className="interest-item-actions">
                  <button
                    type="button"
                    className="interest-remove"
                    onClick={() => handleRemove(certificate.certificateId)}
                  >
                    관심 취소
                  </button>
                  <Link
                    to={`/certifications/${certificate.certificateId}`}
                    className="interest-detail"
                  >
                    상세보기
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        {interests.length > 0 && (
          <nav className="interest-pagination" aria-label="관심 자격증 페이지">
            <button
              type="button"
              className="interest-page-button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 0}
              aria-label="이전 페이지"
            >
              &lt;
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`interest-page-button${index === currentPage ? " is-active" : ""}`}
                onClick={() => setPage(index)}
                aria-current={index === currentPage ? "page" : undefined}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              className="interest-page-button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === pageCount - 1}
              aria-label="다음 페이지"
            >
              &gt;
            </button>
          </nav>
        )}

        <h2 className="interest-section-title">관심 자격증 등록</h2>
        <form className="interest-search" onSubmit={handleSearch} role="search">
          <label className="interest-search-field">
            <span className="interest-search-icon">
              <SearchIcon />
            </span>
            <span className="interest-visually-hidden">자격증명 검색</span>
            <input
              type="text"
              className="interest-search-input"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="관심 자격증을 검색해보세요."
              maxLength={SEARCH_MAX_LENGTH}
            />
          </label>
          <button type="submit" className="interest-search-button">
            검색
          </button>
        </form>
        {searchMessage && (
          <p className="interest-message is-error" aria-live="polite">
            {searchMessage}
          </p>
        )}

        <div className="interest-browse">
          <div className="interest-browse-header">
            <h2 className="interest-browse-title">
              {isSearching ? `'${searchQuery}' 검색 결과` : "추천 자격증"}
            </h2>
            <div className="interest-categories" role="group" aria-label="분류 선택">
              <button
                type="button"
                className={`interest-category${selectedCategory === null ? " is-active" : ""}`}
                onClick={() => setSelectedCategory(null)}
                aria-pressed={selectedCategory === null}
              >
                전체
              </button>
              {MOCK_NCS_CATEGORIES.map((category) => {
                const isActive = selectedCategory?.ncsCategoryId === category.ncsCategoryId;
                return (
                  <button
                    key={category.ncsCategoryId}
                    type="button"
                    className={`interest-category${isActive ? " is-active" : ""}`}
                    onClick={() =>
                      setSelectedCategory({
                        ncsReleaseId: category.ncsReleaseId,
                        ncsCategoryId: category.ncsCategoryId,
                      })
                    }
                    aria-pressed={isActive}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
            {isSearching && (
              <button type="button" className="interest-search-reset" onClick={handleSearchReset}>
                추천 목록 보기
              </button>
            )}
          </div>

          {listedCertificates.length === 0 ? (
            <p className="interest-empty">{LIST_EMPTY}</p>
          ) : (
            <ul className="interest-grid">
              {listedCertificates.map((certificate) => {
                const isAdded = interestIds.includes(certificate.certificateId);
                return (
                  <li key={certificate.certificateId} className="interest-tile">
                    <span className="interest-tile-name">{certificate.displayName}</span>
                    <button
                      type="button"
                      className="interest-add"
                      onClick={() => handleAdd(certificate.certificateId)}
                      disabled={isAdded}
                    >
                      {isAdded ? "추가됨" : "추가"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <section className="acquired-section" aria-labelledby="acquired-title">
          <div className="acquired-header">
            <h2 id="acquired-title" className="interest-section-title">
              내가 취득한 자격증 {acquiredList.length}개
            </h2>
            {acquiredList.length > 0 && !isAcquiredFormOpen && (
              <button type="button" className="interest-detail" onClick={openAcquiredForm}>
                + 추가
              </button>
            )}
          </div>

          {acquiredList.length > 0 && (
            <ul className="interest-list">
              {acquiredList.map(({ certificateId, acquiredDate: date }) => (
                <li key={certificateId} className="interest-item">
                  <span className="interest-item-icon is-acquired">
                    <CheckIcon />
                  </span>
                  <div className="interest-item-text">
                    <div className="interest-item-title">
                      <strong className="interest-item-name">
                        {CERTIFICATE_BY_ID[certificateId].displayName}
                      </strong>
                      {interestIds.includes(certificateId) && (
                        <span className="interest-badge is-interest">관심</span>
                      )}
                    </div>
                    <span className="interest-item-category">취득일 {formatDate(date)}</span>
                  </div>
                  <div className="interest-item-actions">
                    <button
                      type="button"
                      className="interest-remove"
                      onClick={() => handleAcquiredRemove(certificateId)}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {acquiredList.length === 0 && !isAcquiredFormOpen && (
            <button type="button" className="acquired-add" onClick={openAcquiredForm}>
              + 취득한 자격증 추가
            </button>
          )}

          {isAcquiredFormOpen && (
            <div className="acquired-form" role="group" aria-labelledby="acquired-form-title">
              <h3 id="acquired-form-title" className="acquired-form-title">
                취득한 자격증 추가
              </h3>
              <label className="interest-search-field">
                <span className="interest-search-icon">
                  <SearchIcon />
                </span>
                <span className="interest-visually-hidden">취득한 자격증명 검색</span>
                <input
                  type="text"
                  className="interest-search-input"
                  value={acquiredQuery}
                  onChange={(event) => setAcquiredQuery(event.target.value)}
                  placeholder="취득한 자격증을 검색해보세요."
                  maxLength={SEARCH_MAX_LENGTH}
                  autoFocus
                />
              </label>

              {acquiredResults.length === 0 ? (
                <p className="interest-empty">{LIST_EMPTY}</p>
              ) : (
                <ul className="acquired-results" aria-label="취득한 자격증 검색 결과">
                  {acquiredResults.map((certificate) => {
                    const isAcquired = acquiredIds.has(certificate.certificateId);
                    const isSelected = selectedAcquiredId === certificate.certificateId;
                    return (
                      <li key={certificate.certificateId}>
                        <button
                          type="button"
                          className={`acquired-option${isSelected ? " is-selected" : ""}`}
                          onClick={() => {
                            setSelectedAcquiredId(certificate.certificateId);
                            setAcquiredMessage("");
                          }}
                          disabled={isAcquired}
                          aria-pressed={isSelected}
                        >
                          <span className="acquired-option-name">{certificate.displayName}</span>
                          <span className="acquired-option-meta">
                            {isAcquired ? "등록됨" : CATEGORY_NAME_BY_ID[certificate.ncsCategoryId]}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {selectedAcquiredId && (
                <p className="acquired-selected">
                  선택한 자격증 <strong>{CERTIFICATE_BY_ID[selectedAcquiredId].displayName}</strong>
                </p>
              )}

              <label className="acquired-date-field">
                <span className="acquired-date-label">취득일</span>
                <input
                  type="date"
                  className="acquired-date-input"
                  value={acquiredDate}
                  max={today}
                  onChange={(event) => {
                    setAcquiredDate(event.target.value);
                    setAcquiredMessage("");
                  }}
                />
              </label>

              {acquiredMessage && (
                <p className="interest-message is-error" aria-live="polite">
                  {acquiredMessage}
                </p>
              )}

              <div className="acquired-form-actions">
                <button type="button" className="interest-remove" onClick={closeAcquiredForm}>
                  취소
                </button>
                <button type="button" className="acquired-submit" onClick={handleAcquiredRegister}>
                  등록하기
                </button>
              </div>
            </div>
          )}
        </section>

        <button type="button" className="interest-complete" onClick={handleComplete}>
          완료
        </button>
        {completeMessage && (
          <p className="interest-message is-success" aria-live="polite">
            {completeMessage}
          </p>
        )}
      </section>
    </div>
  );
}
