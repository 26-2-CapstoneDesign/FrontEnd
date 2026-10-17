// 조회수·신고 정책 mock (localStorage)
// TODO: 백엔드 API 생기면 조회수는 상세 GET에서 서버가 처리, 신고는 POST /reviews/{id}/reports로 교체
const VIEW_KEY = "reviewViewedBy"; // { [reviewId]: [userId, ...] }
const REPORT_KEY = "reviewReports"; // [{ reviewId, userId, type, detail, createdAt }]

export const REPORT_TYPES = [
    { value: "SPAM", label: "스팸·홍보" },
    { value: "ABUSE", label: "욕설·비방" },
    { value: "OBSCENE", label: "음란·불건전" },
    { value: "FALSE_INFO", label: "허위 정보" },
    { value: "PRIVACY", label: "개인정보 노출" },
    { value: "ETC", label: "기타" },
];

const read = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

const write = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {

    }
};

export function shouldCountView(reviewId, userId) {
    if (userId == null) return false;
    const id = String(reviewId);
    const map = read(VIEW_KEY, {});
    const viewers = map[id] ?? [];
    if (viewers.includes(userId)) return false;
    map[id] = [...viewers, userId];
    write(VIEW_KEY, map);
    return true;
}

export function hasReported(reviewId, userId) {
    if (userId == null) return false;
    const id = String(reviewId);
    return read(REPORT_KEY, []).some((r) => r.reviewId === id && r.userId === userId);
}

export function addReport(reviewId, userId, { type, detail }) {
    if (userId == null) throw { status: 401 };
    if (!REPORT_TYPES.some((t) => t.value === type)) throw { status: 400 };
    if (hasReported(reviewId, userId)) throw { status: 409 };

    const reports = read(REPORT_KEY, []);
    reports.push({
        reviewId: String(reviewId),
        userId,
        type,
        detail: type === "ETC" ? detail.trim() : "",
        createdAt: new Date().toISOString(),
    });
    write(REPORT_KEY, reports);
}