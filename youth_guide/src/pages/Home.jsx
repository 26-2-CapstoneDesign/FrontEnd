import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../styles/Home.css";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
// 주마다 일정 줄을 이만큼 항상 확보해 일정 유무와 상관없이 행 높이를 같게 유지한다.
const MAX_EVENT_LANES = 2;

// TODO(자격증 API 연동): 추천 자격증 목록을 서버 데이터로 교체
const RECOMMENDED_CERTS = [
  { id: "linux-master", name: "리눅스마스터", category: "민간자격" },
  { id: "engineer-information-processing", name: "정보처리기사", category: "국가기술자격" },
  { id: "sqld", name: "SQLD", category: "국가전문자격" },
  { id: "computer-skills", name: "컴퓨터활용능력", category: "국가기술자격" },
  { id: "toeic", name: "토익", category: "어학" },
  { id: "electrical-engineer", name: "전기기사", category: "국가기술자격" },
];

// TODO(캘린더 API 연동): 로그인한 사용자의 등록 일정으로 교체. 지금은 오늘 기준 임시 데이터.
function getMockEvents(today) {
  const day = (offset) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
  return [
    { id: 1, title: "정보처리기사 실기 접수", start: day(0), end: day(4) },
    { id: 2, title: "SQLD 합격자 발표", start: day(0), end: day(0) },
  ];
}

const toKey = (date) => date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();

/* 해당 월을 주(7칸) 단위 배열로 만든다. 빈 칸은 null */
function buildWeeks(year, month) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
}

/* 한 주 안에서 일정이 차지하는 열 구간(1~7)을 구한다. 겹치지 않으면 null */
function getSegment(event, year, month, week) {
  const dated = week
    .map((date, col) => (date ? { col, key: toKey(new Date(year, month, date)) } : null))
    .filter(Boolean);
  const inRange = dated.filter(({ key }) => key >= toKey(event.start) && key <= toKey(event.end));
  if (inRange.length === 0) return null;
  return { start: inRange[0].col + 1, end: inRange[inRange.length - 1].col + 1 };
}

function CalendarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function CertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 10h18" />
    </svg>
  );
}

function Calendar({ events, isLocked }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const weeks = buildWeeks(year, month);

  const moveMonth = (delta) => setViewDate(new Date(year, month + delta, 1));

  return (
    <section className={`calendar-card${isLocked ? " is-locked" : ""}`} aria-label="캘린더">
      <div className="calendar-nav">
        <button type="button" className="calendar-nav-button" aria-label="이전 달" onClick={() => moveMonth(-1)}>
          &lt;
        </button>
        <h2 className="calendar-title">{month + 1}월</h2>
        <button type="button" className="calendar-nav-button" aria-label="다음 달" onClick={() => moveMonth(1)}>
          &gt;
        </button>
      </div>

      {/* 비로그인 시 시안처럼 달력 본문만 흐리게 처리 */}
      <div className="calendar-body" aria-hidden={isLocked}>
        <div className="calendar-week calendar-weekdays">
          {WEEKDAYS.map((label, col) => (
            <span key={label} className={`calendar-weekday${col === 0 ? " is-sunday" : col === 6 ? " is-saturday" : ""}`}>
              {label}
            </span>
          ))}
        </div>

        {weeks.map((week, weekIndex) => (
          <div className="calendar-week is-dates" key={weekIndex}>
            {week.map((date, col) => {
              const isToday =
                date !== null && toKey(new Date(year, month, date)) === toKey(today);
              return (
                <div className="calendar-cell" key={col} style={{ gridColumn: col + 1 }}>
                  {date !== null && <span className={`calendar-date${isToday ? " is-today" : ""}`}>{date}</span>}
                </div>
              );
            })}
            {!isLocked &&
              events.slice(0, MAX_EVENT_LANES).map((event, eventIndex) => {
                const segment = getSegment(event, year, month, week);
                if (!segment) return null;
                return (
                  <span
                    key={event.id}
                    className="calendar-event"
                    style={{ gridColumn: `${segment.start} / ${segment.end + 1}`, gridRow: eventIndex + 2 }}
                  >
                    {event.title}
                  </span>
                );
              })}
          </div>
        ))}
      </div>
    </section>
  );
}

function TodayPanel({ today, events, isLoggedIn }) {
  const todayKey = toKey(today);
  const todayEvents = events.filter((e) => toKey(e.start) <= todayKey && todayKey <= toKey(e.end));

  return (
    <aside className="today-card" aria-label="오늘 일정">
      <h2 className="today-label">오늘일정</h2>
      <p className="today-date">{`${today.getMonth() + 1}.${today.getDate()}`}</p>

      {!isLoggedIn && (
        <div className="today-empty">
          <CalendarIcon />
          <p>
            로그인 후 캘린더를
            <br />
            이용해 보세요
          </p>
        </div>
      )}

      {isLoggedIn && todayEvents.length === 0 && (
        <div className="today-empty">
          <CalendarIcon />
          <p>등록된 일정이 없습니다.</p>
        </div>
      )}

      {isLoggedIn && todayEvents.length > 0 && (
        <ul className="today-list">
          {todayEvents.map((event) => (
            <li key={event.id} className="today-item">
              {event.title}
            </li>
          ))}
        </ul>
      )}

      {isLoggedIn && (
        // TODO(시험 등록): 시험 등록 화면/모달 연결
        <button type="button" className="today-register">
          + 시험 등록
        </button>
      )}
    </aside>
  );
}

export default function Home() {
  const { currentUser } = useOutletContext();
  const isLoggedIn = Boolean(currentUser);
  const today = new Date();
  const events = isLoggedIn ? getMockEvents(today) : [];

  return (
    <div className="home">
      <div className="home-top">
        <Calendar events={events} isLocked={!isLoggedIn} />
        <TodayPanel today={today} events={events} isLoggedIn={isLoggedIn} />
      </div>

      <section className="home-certs" aria-labelledby="home-certs-title">
        <h2 id="home-certs-title" className="home-section-title">
          추천 자격증
        </h2>
        <ul className="cert-grid">
          {RECOMMENDED_CERTS.map((cert) => (
            <li key={cert.id}>
              <Link to={`/certifications/${cert.id}`} className="cert-card">
                <span className="cert-icon">
                  <CertIcon />
                </span>
                <span className="cert-text">
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-category">{cert.category}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
