# 최초 로그인 자격증 카드
```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 최초 로그인에서 직무만 대분류·소분류로 남기고, 자격증은 기존 검색·분류·추가 로직으로 되돌렸다. 자격증 카드는 이름과 추가 버튼만 두고 상세보기 링크는 제거했다. 취득일 모달은 그대로다. API는 호출하지 않았다.
task_id: firstlogin-cert-card-001
session_id: firstlogin-cert-card-001__jb__20261015T050202Z
kind: MAINTENANCE
feature_id: null
human_owner: null
actor_id: jb
tool: cursor
actual_model: grok-4.7
started_at: '2026-10-15T04:48:00Z'
recorded_at: '2026-10-15T05:02:02Z'
timezone: UTC
source_revision: 70afbb4
existing_edits:
  - youth_guide/src/pages/FirstLogin.jsx
  - youth_guide/src/styles/FirstLogin.css
  - youth_guide/src/styles/Login.css
  - youth_guide/src/styles/FindId.css
  - youth_guide/src/styles/FindPassword.css
  - youth_guide/src/styles/ChangeId.css
  - youth_guide/src/styles/ChangePassword.css
rules_version: 3.1.0
read_files:
  - AI_RULES.md
  - docs/CURRENT_STATE.md
  - youth_guide/src/pages/FirstLogin.jsx
  - youth_guide/src/styles/FirstLogin.css
goal: 직무만 대분류·소분류로 두고, 자격증은 기존 선택 로직을 카드 형태로 보여 주며 상세보기는 뺀다.
scope:
  - youth_guide/src/pages/FirstLogin.jsx
  - youth_guide/src/styles/FirstLogin.css
approval_refs: []
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
verification_status: PASSED
review_status: PENDING
commit_id: null
push_status: NOT_PUSHED
push_evidence: ''
events:
  - time: '2026-10-15T04:48:00Z'
    type: read
    files:
      - AI_RULES.md
      - youth_guide/src/pages/FirstLogin.jsx
      - youth_guide/src/styles/FirstLogin.css
    summary_ko: 직전 대분류 작업에서 자격증까지 대분류 UI로 바뀐 상태와 기존 검색·추가 로직을 확인했다.
  - time: '2026-10-15T04:55:00Z'
    type: edit
    files:
      - youth_guide/src/pages/FirstLogin.jsx
      - youth_guide/src/styles/FirstLogin.css
    summary_ko: 자격증 3·4단계를 검색·분류·추가 카드로 되돌리고 상세보기 링크를 제거했다. 직무 1·2단계는 대분류·소분류를 유지했다.
  - time: '2026-10-15T05:02:02Z'
    type: verify
    command: 'cd youth_guide && npx oxlint --format default src/pages/FirstLogin.jsx'
    result: PASSED
    summary_ko: FirstLogin.jsx 린트 0건. 브라우저에서 직무 선택 유지, 자격증 추가·취득일 모달, 상세보기 링크 없음, fetch 0건을 확인했다.
verification:
  - check: FirstLogin.jsx oxlint
    command: 'cd youth_guide && npx oxlint --format default src/pages/FirstLogin.jsx'
    result: PASSED
    summary_ko: 경고 0, 오류 0.
  - check: /firstlogin 브라우저
    command: 'http://127.0.0.1:5173/firstlogin'
    result: PASSED
    summary_ko: 1440px에서 대분류 B로 바꿔도 A 선택이 남고, 관심 직무 C는 현재 직무와 따로 유지됐다. 취득 자격증은 검색·분류와 추가 12개, 상세 링크 0개, 날짜 확인 후 태그가 남았다. 관심 자격증 추가는 선택 상태를 바꿨다. 미선택 카드 테두리는 rgb(229, 231, 235), 추가 버튼 높이 32px. 390px는 카드 1열이고 긴 이름과 버튼 사이 간격은 12px였다. fetch 호출은 0건.
next_action: 직무만 대분류·소분류로 두고 자격증은 기존 검색·분류·추가 로직으로 되돌렸다. 카드는 이름과 추가 버튼만 두고 상세보기 링크는 뺐다. 취득일 모달은 유지한다. API는 호출하지 않는다. 미커밋.
```
