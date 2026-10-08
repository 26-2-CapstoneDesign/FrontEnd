// TODO(자격증 API 연동): 서버 데이터로 교체. 지금은 화면 확인용 임시 데이터.
const SCHEDULE = {
  writtenApply: ["2026.01.12", "2026.01.15"],
  written: ["2026.01.30", "2026.03.03"],
  writtenResult: ["2026.03.11"],
  practicalApply: ["2026.03.23", "2026.03.26"],
  practical: ["2026.04.18", "2026.05.06"],
  finalResult: ["2026.06.05"],
};

export const CERTIFICATIONS = [
  {
    id: "engineer-information-processing",
    name: "정보처리기사",
    category: "국가기술자격",
    field: "정보기술",
    grade: "기사",
    rounds: [
      { suffix: "1회", label: "2026년 정기 기사 1회", schedule: SCHEDULE },
      { suffix: "2회", label: "2026년 정기 기사 2회", schedule: SCHEDULE },
    ],
  },
  {
    id: "industrial-information-processing",
    name: "정보처리산업기사",
    category: "국가기술자격",
    field: "정보기술",
    grade: "산업기사",
    rounds: [{ suffix: "", label: "2026년 정기 산업기사 1회", schedule: SCHEDULE }],
  },
  {
    id: "sqld",
    name: "SQLD",
    category: "국가전문자격",
    field: "데이터",
    grade: "개발자",
    rounds: [{ suffix: "", label: "2026년 정기 1회", schedule: SCHEDULE }],
  },
  {
    id: "linux-master",
    name: "리눅스마스터",
    category: "민간자격",
    field: "정보기술",
    grade: "2급",
    rounds: [{ suffix: "", label: "2026년 정기 2급 1회", schedule: SCHEDULE }],
  },
  {
    id: "computer-skills",
    name: "컴퓨터활용능력",
    category: "국가기술자격",
    field: "사무",
    grade: "1급",
    rounds: [{ suffix: "", label: "2026년 정기 1급 1회", schedule: SCHEDULE }],
  },
  {
    id: "toeic",
    name: "토익",
    category: "어학",
    field: "어학",
    grade: "-",
    rounds: [{ suffix: "", label: "2026년 정기 1회", schedule: SCHEDULE }],
  },
  {
    id: "electrical-engineer",
    name: "전기기사",
    category: "국가기술자격",
    field: "전기·전자",
    grade: "기사",
    rounds: [{ suffix: "", label: "2026년 정기 기사 1회", schedule: SCHEDULE }],
  },
];

export const RECOMMENDED_CERT_IDS = [
  "linux-master",
  "engineer-information-processing",
  "sqld",
  "computer-skills",
  "toeic",
  "electrical-engineer",
];

export function getCertification(certId) {
  return CERTIFICATIONS.find((cert) => cert.id === certId) ?? null;
}

export function getExamList() {
  return CERTIFICATIONS.flatMap((cert) =>
    cert.rounds.map((round) => ({
      certId: cert.id,
      title: round.suffix ? `${cert.name} ${round.suffix}` : cert.name,
      tags: [cert.category, cert.field, cert.grade].filter((tag) => tag && tag !== "-"),
      schedule: round.schedule,
    })),
  );
}
