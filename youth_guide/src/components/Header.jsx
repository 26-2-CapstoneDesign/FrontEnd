import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function ProfileMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const initial = user.displayName.charAt(0).toUpperCase();

  return (
    <div className="header-profile" ref={menuRef}>
      <button
        type="button"
        className="header-avatar"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`${user.displayName} 님 메뉴 열기`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {initial}
      </button>

      {isOpen && (
        <div className="header-dropdown" role="menu">
          <p className="header-dropdown-name">{user.displayName} 님</p>
          <Link
            to="/mypage"
            className="header-dropdown-item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            마이페이지
          </Link>
          <button
            type="button"
            className="header-dropdown-item is-danger"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header({ isMinimal = false, currentUser = null, onLogout }) {
  const [keyword, setKeyword] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
  };


  if (isMinimal) {
    return (
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            청년 길잡이
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="header-logo">
            청년 길잡이
          </Link>

          <form className="header-search" role="search" onSubmit={handleSearchSubmit}>
            <span className="header-search-icon">
              <SearchIcon />
            </span>
            <label htmlFor="header-search-input" className="visually-hidden">
              자격증 검색
            </label>
            <input
              id="header-search-input"
              className="header-search-input"
              type="search"
              placeholder="#정보처리기사"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </form>
        </div>

        <nav className="header-right" aria-label="주요 메뉴">
          <NavLink
            to="/reviews"
            className={({ isActive }) => (isActive ? "header-link is-active" : "header-link")}
          >
            시험 후기
          </NavLink>

          {currentUser ? (
            <>
              <button type="button" className="header-icon-button" aria-label="알림">
                <BellIcon />
                <span className="header-badge" aria-hidden="true" />
              </button>
              <ProfileMenu user={currentUser} onLogout={onLogout} />
            </>
          ) : (
            <Link to="/login" className="header-login-button">
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
