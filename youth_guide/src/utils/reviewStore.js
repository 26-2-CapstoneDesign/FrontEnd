import { getCurrentUser } from "./authStore.js";

const KEY = "reviews";

const load = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
};

const save = (list) => localStorage.setItem(KEY, JSON.stringify(list));

export const getReviews = () => [...load()].reverse();

export const getReview = (id) =>
    load().find((r) => String(r.id) === String(id)) || null;

export const addReview = ({ certification, title, content }) => {
    // TODO: API 연결 시 작성자는 서버가 토큰으로 판단
    const user = getCurrentUser();
    if (!user) throw { status: 401 };

    const d = new Date();
    const createdAt = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    const review = {
        id: Date.now(),
        certification,
        title,
        content,
        authorId: user.id,
        author: user.name,
        createdAt,
        views: 0,
        likes: 0,
        comments: 0,
        commentList: [],
    };
    save([...load(), review]);
    return review;
};

export const updateReview = (id, patch) =>
    save(load().map((r) => (String(r.id) === String(id) ? { ...r, ...patch } : r)));

export const deleteReview = (id) =>
    save(load().filter((r) => String(r.id) !== String(id)));

// 테스트용: 더미 후기 생성 (테스트 끝나면 이 함수 삭제)
// 작성자를 여러 명으로 섞어서 "내 글 / 남의 글" 둘 다 테스트 가능
const DUMMY_AUTHORS = [
    { id: 1, name: "나" },
    { id: 2, name: "철수" },
    { id: 3, name: "영희" },
    { id: 4, name: "민수" },
];

export const seedDummyReviews = (count = 100) => {
    const certs = ["정보처리기사", "SQLD", "컴활 1급", "토익", "리눅스마스터", "AWS SAA"];
    const base = Date.now();

    const dummies = Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        const day = String((i % 28) + 1).padStart(2, "0");
        const author = DUMMY_AUTHORS[i % DUMMY_AUTHORS.length];
        return {
            id: base + i,
            certification: certs[i % certs.length],
            title: `테스트 후기 ${n}번 합격 후기입니다`,
            content: `테스트용 더미 내용 ${n}번입니다.`,
            authorId: author.id,
            author: author.name,
            createdAt: `2025.01.${day}`,
            views: Math.floor(Math.random() * 500),
            likes: Math.floor(Math.random() * 50),
            comments: 0,
            commentList: [],
        };
    });

    save([...load(), ...dummies]);
};

export const increaseViews = (id) => {
    let updated = null;
    save(
        load().map((r) => {
            if (String(r.id) !== String(id)) return r;
            updated = { ...r, views: (r.views ?? 0) + 1 };
            return updated;
        })
    );
    return updated;
};

export const toggleLike = (id, userId) => {
    let updated = null;
    save(
        load().map((r) => {
            if (String(r.id) !== String(id)) return r;
            const likedBy = r.likedBy ?? [];
            const already = likedBy.includes(userId);
            updated = {
                ...r,
                likedBy: already
                    ? likedBy.filter((u) => u !== userId)
                    : [...likedBy, userId],
                likes: Math.max(0, (r.likes ?? 0) + (already ? -1 : 1)),
            };
            return updated;
        })
    );
    return updated;
};