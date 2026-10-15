# 취득 자격증 날짜 팝업

## 최신 요약

```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 취득 자격증 화면의 취득일 입력란을 없애고, 자격증을 누르면 날짜 팝업이 열리게 했다. 확인을 눌러야 목록에 저장되고 취소나 바깥 클릭은 저장하지 않는다. 저장 API는 빈 함수라 화면 상태에만 남는다.
task_id: firstlogin-acquired-date-001
session_id: 20261012T160042Z
kind: FEATURE
feature_id: null
human_owner: null
actor_id: jb
tool: Cursor Agent
actual_model: null
started_at: '2026-10-12T15:56Z'
recorded_at: '2026-10-12T16:00:42Z'
timezone: UTC
source_revision: 0bfaf51695518709a79f2b950564d2da27a59078
existing_edits:
- youth_guide/src/pages/FirstLogin.jsx
- youth_guide/src/styles/FirstLogin.css
- youth_guide/src/App.jsx
rules_version: 3.1.0
read_files:
- ai_team_docs/AI_RULES.md
- ai_team_docs/docs/CURRENT_STATE.md
- youth_guide/src/pages/FirstLogin.jsx
- youth_guide/src/styles/FirstLogin.css
goal: 취득 자격증을 클릭하면 날짜 팝업에서 등록하고, 서버 저장은 연결하지 않는다.
scope:
- youth_guide/src/pages/FirstLogin.jsx
- youth_guide/src/styles/FirstLogin.css
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T15:56Z: 취득일 입력란 제거, 클릭 시 날짜 팝업, 확인 시에만 등록'
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
verification_status: PASSED
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
latest_event_id: E001
previous_log: docs/worklogs/firstlogin-job-check-001__jb__20261012T155515Z.md
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
summary_ko: 취득 자격증 카드 클릭 시 날짜 팝업을 열게 했다. 날짜 없이 확인하면 등록되지 않고, 확인한 날짜만 화면 목록에 남는다. saveAcquiredCertificate는 계속 빈 함수다.
event_id: E001
event_type: VERIFY
actor_id: jb
recorded_at: '2026-10-12T16:00:42Z'
occurred_at: '2026-10-12T16:00:42Z'
source_revision: 0bfaf51695518709a79f2b950564d2da27a59078
rule_refs:
- {rule_id: C13, rule_text: 작업·작업자·세션별 로그를 남긴다., source_path: ai_team_docs/AI_RULES.md}
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T15:56Z: 취득 자격증 날짜 팝업'
actions:
- 화면의 취득일 입력과 등록하기 버튼을 제거했다.
- 자격증별 날짜 초안을 팝업 상태에 두고 확인 때만 acquiredList를 바꾼다.
changes:
- {path: youth_guide/src/pages/FirstLogin.jsx, symbol: handleAcquiredConfirm, operation: MODIFY, reason: 팝업 확인 시에만 취득 자격증과 날짜를 화면 목록에 저장한다.}
- {path: youth_guide/src/styles/FirstLogin.css, symbol: .onboarding-modal, operation: ADD, reason: 날짜 팝업을 기존 카드 스타일에 맞춘다.}
checks:
- command: npx oxlint --format default src/pages/FirstLogin.jsx src/styles/FirstLogin.css
  environment: youth_guide
  input: null
  expected: warnings 0, errors 0
  observed: Found 0 warnings and 0 errors.
  result: PASSED
  evidence_ref: null
- command: browser http://127.0.0.1:5173/onboarding/certifications
  environment: Vite dev server
  input: 날짜 없이 확인, 2026-01-15 확인, 날짜 변경 후 취소, 2026-03-03 확인, 다른 자격증 바깥 클릭, 다음 후 이전
  expected: 확인한 날짜만 남고 취소와 바깥 클릭은 저장하지 않으며 단계 이동 후에도 유지된다.
  observed: 날짜 없이는 취득일을 입력해 주세요가 나왔다. 2026-01-15 확인 후 취소해도 그 날짜가 남았고, 2026-03-03 확인으로 바뀌었다. 다른 자격증 팝업의 날짜는 비어 있었고 바깥 클릭 후 등록되지 않았다. 관심 자격증으로 갔다가 돌아와도 2026.03.03이 남았다. 등록 카드 배경은 rgb(255, 255, 255)였다. 화면 본문의 취득일 입력은 0개였다.
  result: PASSED
  evidence_ref: null
unperformed_checks: []
state_before:
  acquired_date_ui: page input
state_after:
  acquired_date_ui: modal
  api: saveAcquiredCertificate empty
remaining_work: []
next_action: 사용자 확인을 기다린다.
state_updates:
- {path: ai_team_docs/docs/CURRENT_STATE.md, result: APPLIED, evidence_ref: null}
missing_reasons: {}
```
