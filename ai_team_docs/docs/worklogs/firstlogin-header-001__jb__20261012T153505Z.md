# 최초 로그인 상단 로고만 표시

## 최신 요약

```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 최초 로그인 경로를 로그인 화면과 같은 AuthLayout으로 옮겨 상단에 로고만 보이게 했다. Layout과 Header의 일반 네비게이션은 바꾸지 않았다. 홈에서는 검색·시험 후기·로그인이 그대로 보인다.
task_id: firstlogin-header-001
session_id: 20261012T153505Z
kind: FEATURE
feature_id: null
human_owner: null
actor_id: jb
tool: Cursor Agent
actual_model: null
started_at: '2026-10-12T15:33Z'
recorded_at: '2026-10-12T15:35:05Z'
timezone: UTC
source_revision: 0bfaf51695518709a79f2b950564d2da27a59078
existing_edits:
- youth_guide/src/pages/FirstLogin.jsx
- youth_guide/src/styles/FirstLogin.css
rules_version: 3.1.0
read_files:
- ai_team_docs/AI_RULES.md
- ai_team_docs/docs/CURRENT_STATE.md
- youth_guide/src/App.jsx
- youth_guide/src/components/Header.jsx
- youth_guide/src/components/AuthLayout.jsx
- youth_guide/src/components/Layout.jsx
goal: 최초 로그인 화면 상단에는 기존 로고만 표시하고 일반 네비게이션은 유지한다.
scope:
- youth_guide/src/App.jsx
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T15:33Z: 최초 로그인 네비게이션은 로고만, 기존 네비게이션과 다른 Layout 페이지는 유지'
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
verification_status: PASSED
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
latest_event_id: E001
previous_log: docs/worklogs/firstlogin-acquired-check-001__jb__20261012T011941Z.md
remaining_work: []
resume_when: []
next_action: 사용자 확인을 기다린다.
missing_reasons:
  feature_id: FEATURE_STATUS에 최초 로그인 기능 ID가 없다.
  human_owner: 사람 담당자 미등록
  actual_model: 세션 모델명이 기록에 없다.
not_applicable_reasons: {}
```

## 사건

```yaml
schema_version: 3.1.0
template: false
record_type: event
summary_ko: /onboarding/certifications를 AuthLayout 아래로 옮겼다. 브라우저에서 해당 화면은 로고만 있고, 홈은 검색·시험 후기·로그인을 유지했다.
event_id: E001
event_type: VERIFY
actor_id: jb
recorded_at: '2026-10-12T15:35:05Z'
occurred_at: '2026-10-12T15:35:05Z'
source_revision: 0bfaf51695518709a79f2b950564d2da27a59078
rule_refs:
- {rule_id: C13, rule_text: 작업·작업자·세션별 로그를 남긴다., source_path: ai_team_docs/AI_RULES.md}
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T15:33Z: 최초 로그인 네비게이션은 로고만'
actions:
- 개발 서버 전용 최초 로그인 경로를 Layout에서 AuthLayout으로 옮겼다.
changes:
- {path: youth_guide/src/App.jsx, symbol: Route, operation: MODIFY, reason: 최초 로그인만 로고 헤더를 쓰게 한다.}
checks:
- command: npm run lint
  environment: youth_guide
  input: null
  expected: exit 0
  observed: exit 0
  result: PASSED
  evidence_ref: null
- command: browser http://127.0.0.1:5173/onboarding/certifications and /
  environment: Vite dev server
  input: null
  expected: 최초 로그인은 로고만, 홈은 기존 네비게이션
  observed: 최초 로그인 상단 링크는 청년 길잡이뿐이었다. 홈에는 자격증 검색, 시험 후기, 로그인이 있었다.
  result: PASSED
  evidence_ref: null
unperformed_checks: []
state_before:
  first_login_layout: Layout
state_after:
  first_login_layout: AuthLayout
remaining_work: []
next_action: 사용자 확인을 기다린다.
state_updates:
- {path: ai_team_docs/docs/CURRENT_STATE.md, result: APPLIED, evidence_ref: null}
missing_reasons: {}
```
