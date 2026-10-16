import { useEffect, useState } from "react";
import {
  completeOnboarding,
  loadOnboardingCatalogs,
  mapCertificateSummaries,
  mapJobList,
  saveAcquiredCertificate,
  saveCurrentJobs,
  saveInterestCertificates,
  saveInterestJobs,
} from "../api/onboarding";
import "../styles/FirstLogin.css";

// 아래 mock 값은 화면 동작 확인용 가상 데이터이며 실제 NCS 분류나 자격증 데이터가 아니다.
// 상태: Mock 데이터 사용. API가 연결되기 전까지 화면 확인용으로 유지한다.
// 닉네임 조회 API와 직무 선택 저장 API는 명세에 없다.
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

const STEPS = [
  { id: 1, label: "현재 직무" },
  { id: 2, label: "관심 직무" },
  { id: 3, label: "취득 자격증" },
  { id: 4, label: "관심 자격증" },
];

const SEARCH_MAX_LENGTH = 100;
const MIDDLE_PROMPT = "대분류를 선택하면 중분류가 표시됩니다.";
const MIDDLE_EMPTY = "이 대분류에 표시할 중분류가 없습니다.";
const MINOR_PROMPT = "중분류를 선택하면 소분류가 표시됩니다.";
const MINOR_EMPTY = "이 중분류에 표시할 소분류가 없습니다.";
const SEARCH_EMPTY = "검색어를 입력해 주세요.";
const LIST_EMPTY = "조건에 맞는 자격증이 없습니다.";
const JOB_SAMPLE_NOTE = "직무 분류 API가 없어 화면 확인용 샘플 분류만 표시합니다. 실제 직무 목록이 아닙니다.";
const ACQUIRED_DATE_REQUIRED = "취득일을 입력해 주세요.";
const ACQUIRED_DATE_FUTURE = "취득일은 오늘 이후 날짜로 입력할 수 없습니다.";

const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const formatDate = (value) => value.replaceAll("-", ".");

const CERTIFICATE_BY_ID = Object.fromEntries(
  MOCK_CERTIFICATES.map((certificate) => [certificate.certificateId, certificate]),
);
const CATEGORY_NAME_BY_ID = Object.fromEntries(
  MOCK_NCS_CATEGORIES.map((category) => [category.ncsCategoryId, category.name]),
);
const MOCK_RECOMMENDED_CERTIFICATES = MOCK_RECOMMENDED_IDS.map((id) => CERTIFICATE_BY_ID[id]);

const filterCertificates = (certificates, { query, category }) =>
  certificates.filter(
    (certificate) =>
      (!query || certificate.displayName.includes(query)) &&
      (!category ||
        (certificate.ncsReleaseId === category.ncsReleaseId &&
          certificate.ncsCategoryId === category.ncsCategoryId)),
  );

const toggleId = (ids, id) =>
  ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];

const majorCategories = (categories) =>
  categories.filter((category) => !category.parentCategoryId);

const childrenOf = (categories, parentId) => {
  if (!parentId) return [];
  return categories.filter((category) => category.parentCategoryId === parentId);
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CategoryFilters({ selectedCategory, onSelect, label }) {
  return (
    <div className="onboarding-categories" role="group" aria-label={label}>
      <button
        type="button"
        className={`onboarding-category${selectedCategory === null ? " is-active" : ""}`}
        onClick={() => onSelect(null)}
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
            className={`onboarding-category${isActive ? " is-active" : ""}`}
            onClick={() =>
              onSelect({
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
  );
}

function CertificateCard({ name, meta, selected, onAdd }) {
  return (
    <div className={`onboarding-cert-card${selected ? " is-selected" : ""}`}>
      <span className="onboarding-cert-card-text">
        <span className="onboarding-cert-card-name">{name}</span>
        {meta ? <span className="onboarding-cert-card-meta">{meta}</span> : null}
      </span>
      <button
        type="button"
        className={`onboarding-add${selected ? " is-cancel" : ""}`}
        onClick={onAdd}
        aria-pressed={selected}
      >
        {selected ? "취소" : "추가"}
      </button>
    </div>
  );
}

function JobMinorList({ items, selectedIds, onToggle }) {
  if (items.length === 0) return <p className="onboarding-empty">{MINOR_EMPTY}</p>;
  return (
    <ul className="onboarding-minors">
      {items.map((category) => {
        const isSelected = selectedIds.includes(category.ncsCategoryId);
        return (
          <li key={category.ncsCategoryId}>
            <label className={`onboarding-minor${isSelected ? " is-selected" : ""}`}>
              <input
                type="checkbox"
                className="onboarding-check"
                checked={isSelected}
                onChange={() => onToggle(category.ncsCategoryId)}
                aria-label={`${category.name} 선택`}
              />
              <span>
                <span className="onboarding-minor-name">{category.name}</span>
                <span className="onboarding-minor-meta">{category.code} · {category.levelCode}</span>
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function LevelButtons({ items, selectedId, onSelect, label }) {
  return (
    <div className="onboarding-majors" role="group" aria-label={label}>
      {items.map((item) => {
        const isActive = item.ncsCategoryId === selectedId;
        return (
          <button
            key={item.ncsCategoryId}
            type="button"
            className={`onboarding-major${isActive ? " is-active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onSelect(item.ncsCategoryId)}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}

function LevelBrowser({
  title,
  note,
  majors,
  middles,
  minors,
  selectedMajorId,
  selectedMiddleId,
  selectedMinorIds,
  onSelectMajor,
  onSelectMiddle,
  onToggleMinor,
}) {
  return (
    <div className="onboarding-panel">
      <h1 id="onboarding-step-title" className="onboarding-title">{title}</h1>
      {note ? <p className="onboarding-note">{note}</p> : null}
      <div className="onboarding-levels">
        <section className="onboarding-level">
          <h2 className="onboarding-level-title">대분류</h2>
          {majors.length === 0 ? (
            <p className="onboarding-empty">표시할 대분류가 없습니다.</p>
          ) : (
            <LevelButtons items={majors} selectedId={selectedMajorId} onSelect={onSelectMajor} label="대분류" />
          )}
        </section>
        <section className="onboarding-level">
          <h2 className="onboarding-level-title">중분류</h2>
          {!selectedMajorId ? (
            <p className="onboarding-empty">{MIDDLE_PROMPT}</p>
          ) : middles.length === 0 ? (
            <p className="onboarding-empty">{MIDDLE_EMPTY}</p>
          ) : (
            <LevelButtons items={middles} selectedId={selectedMiddleId} onSelect={onSelectMiddle} label="중분류" />
          )}
        </section>
        <section className="onboarding-level">
          <h2 className="onboarding-level-title">소분류</h2>
          {!selectedMiddleId ? (
            <p className="onboarding-empty">{MINOR_PROMPT}</p>
          ) : (
            <JobMinorList items={minors} selectedIds={selectedMinorIds} onToggle={onToggleMinor} />
          )}
        </section>
      </div>
    </div>
  );
}

export default function FirstLogin() {
  const [step, setStep] = useState(1);
  const [currentJobIds, setCurrentJobIds] = useState([]);
  const [interestJobIds, setInterestJobIds] = useState([]);
  const [currentJobMajorId, setCurrentJobMajorId] = useState(null);
  const [currentJobMiddleId, setCurrentJobMiddleId] = useState(null);
  const [interestJobMajorId, setInterestJobMajorId] = useState(null);
  const [interestJobMiddleId, setInterestJobMiddleId] = useState(null);
  const [interestIds, setInterestIds] = useState(MOCK_INTEREST_IDS);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [completeMessage, setCompleteMessage] = useState("");
  // 취득 자격증 조회 API가 명세에 없어(API 명세 미정) 빈 목록에서 시작한다.
  const [acquiredList, setAcquiredList] = useState([]);
  const [acquiredQuery, setAcquiredQuery] = useState("");
  const [acquiredCategory, setAcquiredCategory] = useState(null);
  const [acquiredDialog, setAcquiredDialog] = useState(null);
  const [acquiredMessage, setAcquiredMessage] = useState("");
  const [catalogStatus, setCatalogStatus] = useState("NOT_IMPLEMENTED");
  const [apiCertificates, setApiCertificates] = useState(null);
  const [apiJobs, setApiJobs] = useState(null);
  const [isSavingAcquired, setIsSavingAcquired] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [navigationMessage, setNavigationMessage] = useState("");

  const today = getToday();
  const jobCategories = catalogStatus === "READY" && apiJobs ? apiJobs : MOCK_NCS_CATEGORIES;
  const jobNote = catalogStatus === "READY" && apiJobs ? "" : JOB_SAMPLE_NOTE;
  const certificateSource =
    catalogStatus === "READY" && apiCertificates ? apiCertificates : MOCK_CERTIFICATES;
  const certificateById = Object.fromEntries(
    certificateSource.map((certificate) => [certificate.certificateId, certificate]),
  );
  const majors = majorCategories(jobCategories);
  const currentMiddles = childrenOf(jobCategories, currentJobMajorId);
  const interestMiddles = childrenOf(jobCategories, interestJobMajorId);
  const currentMinors = childrenOf(jobCategories, currentJobMiddleId);
  const interestMinors = childrenOf(jobCategories, interestJobMiddleId);
  const acquiredResults = filterCertificates(certificateSource, {
    query: acquiredQuery.trim(),
    category: acquiredCategory,
  });

  useEffect(() => {
    if (!acquiredDialog) return undefined;
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setAcquiredDialog(null);
      setAcquiredMessage("");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [acquiredDialog]);

  useEffect(() => {
    let ignore = false;
    loadOnboardingCatalogs().then((result) => {
      if (ignore) return;
      if (result.status !== "READY") {
        setCatalogStatus("NOT_IMPLEMENTED");
        return;
      }
      const jobs = mapJobList(result.jobs);
      const certificates = mapCertificateSummaries(result.certificates);
      if (!certificates) {
        setCatalogStatus("INVALID");
        return;
      }
      setApiCertificates(certificates);
      if (jobs) setApiJobs(jobs);
      setCatalogStatus("READY");
    });
    return () => {
      ignore = true;
    };
  }, []);

  const handleRemove = (certificateId) => {
    setInterestIds((prev) => prev.filter((id) => id !== certificateId));
    setCompleteMessage("");
  };

  const handleAdd = (certificateId) => {
    setInterestIds((prev) => (prev.includes(certificateId) ? prev : [...prev, certificateId]));
    setCompleteMessage("");
  };

  const isSearching = searchQuery !== null;
  const listedCertificates = filterCertificates(
    isSearching || catalogStatus === "READY" ? certificateSource : MOCK_RECOMMENDED_CERTIFICATES,
    { query: searchQuery, category: selectedCategory },
  );

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

  const handleAcquiredOpen = (certificateId) => {
    const saved = acquiredList.find((item) => item.certificateId === certificateId);
    setAcquiredDialog({
      certificateId,
      date: saved ? saved.acquiredDate : "",
    });
    setAcquiredMessage("");
  };

  const handleAcquiredClose = () => {
    setAcquiredDialog(null);
    setAcquiredMessage("");
  };

  const handleAcquiredConfirm = async () => {
    if (!acquiredDialog || isSavingAcquired) return;
    const { certificateId, date } = acquiredDialog;
    if (!date) {
      setAcquiredMessage(ACQUIRED_DATE_REQUIRED);
      return;
    }
    if (date > today) {
      setAcquiredMessage(ACQUIRED_DATE_FUTURE);
      return;
    }
    setIsSavingAcquired(true);
    try {
      const result = await saveAcquiredCertificate({ certificateId, acquiredDate: date });
      if (result.status === "FAILED") {
        setAcquiredMessage("서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }
      setAcquiredList((prev) => {
        const exists = prev.some((item) => item.certificateId === certificateId);
        if (!exists) return [...prev, { certificateId, acquiredDate: date }];
        return prev.map((item) =>
          item.certificateId === certificateId ? { certificateId, acquiredDate: date } : item,
        );
      });
      setCompleteMessage("");
      setAcquiredDialog(null);
      setAcquiredMessage("");
    } catch {
      setAcquiredMessage("서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSavingAcquired(false);
    }
  };

  const handleAcquiredRemove = (certificateId) => {
    setAcquiredList((prev) => prev.filter((acquired) => acquired.certificateId !== certificateId));
    setCompleteMessage("");
  };

  const handleComplete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);
    try {
      const results = await Promise.all([
        saveCurrentJobs(currentJobIds),
        saveInterestJobs(interestJobIds),
        saveInterestCertificates(interestIds),
        completeOnboarding(),
      ]);
      const failed = results.some((result) => result.status === "FAILED");
      setCompleteMessage(
        failed
          ? "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요."
          : `관심 자격증 ${interestIds.length}개, 취득한 자격증 ${acquiredList.length}개로 선택을 완료했습니다. 서버 저장은 아직 연결되지 않았습니다. 직무 선택은 저장 API가 없어 이 화면에만 남아 있습니다.`,
      );
    } catch {
      setCompleteMessage("서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsCompleting(false);
    }
  };

  const moveStep = async (nextStep) => {
    if (isMoving) return;
    if (nextStep > step) {
      setIsMoving(true);
      try {
        const result = step === 1
          ? await saveCurrentJobs(currentJobIds)
          : step === 2
            ? await saveInterestJobs(interestJobIds)
            : { status: "NOT_IMPLEMENTED" };
        if (result.status === "FAILED") {
          setNavigationMessage("서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.");
          return;
        }
      } catch {
        setNavigationMessage("서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      } finally {
        setIsMoving(false);
      }
    }
    setNavigationMessage("");
    setAcquiredDialog(null);
    setAcquiredMessage("");
    setStep(nextStep);
  };

  return (
    <div className="onboarding-page">
      <section className="onboarding-card" aria-labelledby="onboarding-step-title">
        <ol className="onboarding-steps">
          {STEPS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`onboarding-step${step === item.id ? " is-active" : ""}`}
                onClick={() => moveStep(item.id)}
                aria-current={step === item.id ? "step" : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ol>

        {step === 1 && (
          <LevelBrowser
            title="현재 직무를 모두 선택해주세요."
            note={jobNote}
            majors={majors}
            middles={currentMiddles}
            minors={currentMinors}
            selectedMajorId={currentJobMajorId}
            selectedMiddleId={currentJobMiddleId}
            selectedMinorIds={currentJobIds}
            onSelectMajor={(id) => {
              setCurrentJobMajorId(id);
              if (id !== currentJobMajorId) setCurrentJobMiddleId(null);
            }}
            onSelectMiddle={setCurrentJobMiddleId}
            onToggleMinor={(id) => setCurrentJobIds((prev) => toggleId(prev, id))}
          />
        )}

        {step === 2 && (
          <LevelBrowser
            title="관심 있는 직무를 모두 선택해주세요."
            note={jobNote}
            majors={majors}
            middles={interestMiddles}
            minors={interestMinors}
            selectedMajorId={interestJobMajorId}
            selectedMiddleId={interestJobMiddleId}
            selectedMinorIds={interestJobIds}
            onSelectMajor={(id) => {
              setInterestJobMajorId(id);
              if (id !== interestJobMajorId) setInterestJobMiddleId(null);
            }}
            onSelectMiddle={setInterestJobMiddleId}
            onToggleMinor={(id) => setInterestJobIds((prev) => toggleId(prev, id))}
          />
        )}

        {step === 3 && (
          <div className="onboarding-panel">
            <h1 id="onboarding-step-title" className="onboarding-title">
              취득한 자격증을 선택해주세요.
            </h1>
            <label className="onboarding-search">
              <span className="onboarding-search-icon">
                <SearchIcon />
              </span>
              <span className="interest-visually-hidden">취득한 자격증명 검색</span>
              <input
                type="text"
                className="onboarding-search-input"
                value={acquiredQuery}
                onChange={(event) => setAcquiredQuery(event.target.value)}
                placeholder="취득한 자격증을 검색해보세요."
                maxLength={SEARCH_MAX_LENGTH}
              />
            </label>
            <CategoryFilters
              selectedCategory={acquiredCategory}
              onSelect={setAcquiredCategory}
              label="취득 자격증 분류"
            />
            {acquiredResults.length === 0 ? (
              <p className="onboarding-empty">{LIST_EMPTY}</p>
            ) : (
              <ul className="onboarding-cards">
                {acquiredResults.map((certificate) => {
                  const saved = acquiredList.find((item) => item.certificateId === certificate.certificateId);
                  return (
                    <li key={certificate.certificateId}>
                      <CertificateCard
                        name={certificate.displayName}
                        meta={saved ? `등록됨 · ${formatDate(saved.acquiredDate)}` : CATEGORY_NAME_BY_ID[certificate.ncsCategoryId]}
                        selected={Boolean(saved)}
                        onAdd={() =>
                          saved
                            ? handleAcquiredRemove(certificate.certificateId)
                            : handleAcquiredOpen(certificate.certificateId)
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            )}
            {acquiredList.length > 0 && (
              <ul className="onboarding-tags" aria-label="등록한 취득 자격증">
                {acquiredList.map(({ certificateId, acquiredDate: date }) => (
                  <li key={certificateId} className="onboarding-tag">
                    <span>
                      {certificateById[certificateId]?.displayName} · {formatDate(date)}
                    </span>
                    <button type="button" onClick={() => handleAcquiredRemove(certificateId)} aria-label="취득 자격증 삭제">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {acquiredDialog && (
              <div className="onboarding-modal-backdrop" onClick={handleAcquiredClose}>
                <div
                  className="onboarding-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="acquired-date-title"
                  onClick={(event) => event.stopPropagation()}
                >
                  <h2 id="acquired-date-title" className="onboarding-modal-title">
                    {certificateById[acquiredDialog.certificateId]?.displayName}
                  </h2>
                  <label className="onboarding-date">
                    <span>취득일</span>
                    <input
                      type="date"
                      value={acquiredDialog.date}
                      max={today}
                      autoFocus
                      onChange={(event) => {
                        const date = event.target.value;
                        setAcquiredDialog((current) => (current ? { ...current, date } : current));
                        setAcquiredMessage("");
                      }}
                    />
                  </label>
                  {acquiredMessage && (
                    <p className="onboarding-message is-error" aria-live="polite">
                      {acquiredMessage}
                    </p>
                  )}
                  <div className="onboarding-modal-actions">
                    <button type="button" className="onboarding-prev" onClick={handleAcquiredClose}>
                      취소
                    </button>
                    <button
                      type="button"
                      className="onboarding-next"
                      onClick={handleAcquiredConfirm}
                      disabled={isSavingAcquired}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="onboarding-panel">
            <h1 id="onboarding-step-title" className="onboarding-title">
              관심 있는 자격증을 모두 선택해주세요.
            </h1>
            <form className="onboarding-search-form" onSubmit={handleSearch} role="search">
              <label className="onboarding-search">
                <span className="onboarding-search-icon">
                  <SearchIcon />
                </span>
                <span className="interest-visually-hidden">관심 자격증명 검색</span>
                <input
                  type="text"
                  className="onboarding-search-input"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="관심 자격증을 검색해보세요."
                  maxLength={SEARCH_MAX_LENGTH}
                />
              </label>
              <button type="submit" className="onboarding-search-button">
                검색
              </button>
            </form>
            {searchMessage && (
              <p className="onboarding-message is-error" aria-live="polite">
                {searchMessage}
              </p>
            )}
            <div className="onboarding-browse-head">
              <CategoryFilters
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
                label="관심 자격증 분류"
              />
              {isSearching && (
                <button type="button" className="onboarding-reset" onClick={handleSearchReset}>
                  추천 목록 보기
                </button>
              )}
            </div>
            {listedCertificates.length === 0 ? (
              <p className="onboarding-empty">{LIST_EMPTY}</p>
            ) : (
              <ul className="onboarding-cards">
                {listedCertificates.map((certificate) => {
                  const isAdded = interestIds.includes(certificate.certificateId);
                  return (
                    <li key={certificate.certificateId}>
                      <CertificateCard
                        name={certificate.displayName}
                        meta={CATEGORY_NAME_BY_ID[certificate.ncsCategoryId]}
                        selected={isAdded}
                        onAdd={() =>
                          isAdded ? handleRemove(certificate.certificateId) : handleAdd(certificate.certificateId)
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            )}
            {interestIds.length > 0 && (
              <ul className="onboarding-tags" aria-label="선택한 관심 자격증">
                {interestIds.map((certificateId) => (
                  <li key={certificateId} className="onboarding-tag">
                    <span>{certificateById[certificateId]?.displayName}</span>
                    <button type="button" onClick={() => handleRemove(certificateId)} aria-label="관심 취소">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {completeMessage && (
              <p className="onboarding-message is-success" aria-live="polite">
                {completeMessage}
              </p>
            )}
          </div>
        )}

        {navigationMessage && (
          <p className="onboarding-message is-error" aria-live="polite">
            {navigationMessage}
          </p>
        )}

        <div className={`onboarding-actions${step === 1 ? " is-end" : ""}`}>
          {step > 1 && (
            <button type="button" className="onboarding-prev" onClick={() => moveStep(step - 1)} disabled={isMoving}>
              이전
            </button>
          )}
          {step === 1 && (
            <button type="button" className="onboarding-next" onClick={() => moveStep(2)} disabled={isMoving}>
              다음
            </button>
          )}
          {step === 2 && (
            <button type="button" className="onboarding-next" onClick={() => moveStep(3)} disabled={isMoving}>
              다음
            </button>
          )}
          {step === 3 && (
            <button type="button" className="onboarding-next" onClick={() => moveStep(4)} disabled={isMoving}>
              다음
            </button>
          )}
          {step === 4 && (
            <button type="button" className="onboarding-next" onClick={handleComplete} disabled={isCompleting}>
              완료
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
