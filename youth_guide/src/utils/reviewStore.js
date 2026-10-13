const KEY = "reviews";

const load = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
};

const save = (list) => localStorage.setItem(KEY, JSON.stringify(list));

// TODO: 로그인 연동 시 실제 로그인한 유저 정보로 교체
const CURRENT_USER = { id: 1, name: "나" };

export const getReviews = () => [...load()].reverse();

export const getReview = (id) =>
    load().find((r) => String(r.id) === String(id)) || null;

export const addReview = ({ certification, title, content }) => {
    const d = new Date();
    const createdAt = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    const review = {
        id: Date.now(),
        certification,
        title,
        content,
        authorId: CURRENT_USER.id,
        author: CURRENT_USER.name,
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
export const seedDummyReviews = (count = 100) => {
    const certs = ["정보처리기사", "SQLD", "컴활 1급", "토익", "리눅스마스터", "AWS SAA"];
    const base = Date.now();

    const dummies = Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        const day = String((i % 28) + 1).padStart(2, "0");
        return {
            id: base + i,
            certification: certs[i % certs.length],
            title: `테스트 후기 ${n}번 합격 후기입니다`,
            content: `테스트용 더미 내용 ${n}번입니다.`,
            authorId: CURRENT_USER.id,
            author: CURRENT_USER.name,
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