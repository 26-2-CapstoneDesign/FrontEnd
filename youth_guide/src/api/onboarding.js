// 최초 로그인 네 단계의 API 연결 지점.
// 저장소에 공통 API 클라이언트, 환경변수, 인증 토큰 처리가 없다.
// 로그인·회원가입은 페이지 안에서 상대 경로 fetch를 쓰고, 백엔드 주소는 정해지지 않았다.
// 이 파일은 요청을 보내지 않는다. 구현된 온보딩 API가 없기 때문이다.

export const ONBOARDING_API_STATUS = {
  currentJobs: "NOT_IMPLEMENTED",
  interestJobs: "NOT_IMPLEMENTED",
  acquiredCertificates: "NOT_IMPLEMENTED",
  interestCertificates: "NOT_IMPLEMENTED",
  // CERT-01, NCS-01, NCS-02는 제안이고 백엔드 구현 상태는 NOT_IMPLEMENTED다.
  certificates: "NOT_IMPLEMENTED",
  ncsReleases: "NOT_IMPLEMENTED",
  ncsCategories: "NOT_IMPLEMENTED",
  complete: "NOT_IMPLEMENTED",
};

const notImplemented = () => Promise.resolve({ status: "NOT_IMPLEMENTED" });

// CERT-01 제안 응답의 CertificateSummary는 certificateId, displayName만 확정된 제안 필드다.
// 그 외 필드는 응답에 있다고 보지 않는다.
export function mapCertificateSummaries(items) {
  if (!Array.isArray(items)) return null;
  const mapped = [];
  for (const item of items) {
    if (!item || typeof item.certificateId !== "string" || typeof item.displayName !== "string") {
      return null;
    }
    mapped.push({
      certificateId: item.certificateId,
      displayName: item.displayName,
    });
  }
  return mapped;
}

// 직무 목록의 응답 필드가 명세에 없어 화면 항목으로 바꾸지 않는다.
export function mapJobList(payload) {
  if (payload == null) return null;
  return null;
}

export function loadOnboardingCatalogs() {
  return Promise.resolve({
    status: "NOT_IMPLEMENTED",
    jobs: null,
    certificates: null,
  });
}

// 인자는 화면에서 고른 값이다. API 요청 필드 이름이 아니다.
export function saveCurrentJobs(selectedIds) {
  if (!Array.isArray(selectedIds)) return Promise.resolve({ status: "FAILED" });
  return notImplemented();
}

export function saveInterestJobs(selectedIds) {
  if (!Array.isArray(selectedIds)) return Promise.resolve({ status: "FAILED" });
  return notImplemented();
}

export function saveAcquiredCertificate(entry) {
  if (!entry || typeof entry.certificateId !== "string" || typeof entry.acquiredDate !== "string") {
    return Promise.resolve({ status: "FAILED" });
  }
  return notImplemented();
}

export function saveInterestCertificates(certificateIds) {
  if (!Array.isArray(certificateIds)) return Promise.resolve({ status: "FAILED" });
  return notImplemented();
}

export function completeOnboarding() {
  return notImplemented();
}
