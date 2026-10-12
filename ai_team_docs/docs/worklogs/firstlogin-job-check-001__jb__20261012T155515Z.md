# 직무 선택 체크박스

## 최신 요약

```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 현재 직무와 관심 직무는 체크박스 표시로만 선택된다. 행을 눌러도 한 번만 바뀌고, 선택 행의 배경색과 테두리는 없다. 두 단계의 선택은 따로 유지된다.
task_id: firstlogin-job-check-001
session_id: 20261012T155515Z
kind: FEATURE
feature_id: null
human_owner: null
actor_id: jb
tool: Cursor Agent
actual_model: null
started_at: '2026-10-12T15:52Z'
recorded_at: '2026-10-12T15:55:15Z'
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
goal: 직무 선택을 체크박스 표시로만 나타내고 행 전체 클릭은 한 번만 반영한다.
scope:
- youth_guide/src/pages/FirstLogin.jsx
- youth_guide/src/styles/FirstLogin.css
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T15:52Z: 직무 체크박스 복원, 행 클릭 한 번, 선택 배경 제거'
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
verification_status: PASSED
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
latest_event_id: E001
previous_log: docs/worklogs/firstlogin-order-001__jb__20261012T155108Z.md
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
summary_ko: 직무 표에 체크박스를 다시 두고 선택 행 배경과 왼쪽 줄을 없앴다. 체크박스 클릭은 행 클릭으로 전달되지 않는다. 브라우저에서 한 번 토글, 해제, 단계 이동 후 유지를 확인했다.
event_id: E001
event_type: VERIFY
actor_id: jb
recorded_at: '2026-10-12T15:55:15Z'
occurred_at: '2026-10-12T15:55:15Z'
source_revision: 0bfaf51695518709a79f2b950564d2da27a59078
rule_refs:
- {rule_id: C13, rule_text: 작업·작업자·세션별 로그를 남긴다., source_path: ai_team_docs/AI_RULES.md}
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T15:52Z: 직무 체크박스 동작 수정'
actions:
- 직무 행에 체크박스를 두고 행 클릭과 체크박스 클릭이 한 번씩만 toggleId를 호출하게 했다.
- 선택 행 배경색과 왼쪽 테두리 CSS를 제거했다.
changes:
- {path: youth_guide/src/pages/FirstLogin.jsx, symbol: JobStep, operation: MODIFY, reason: 체크 표시만으로 선택하고 중복 토글을 막는다.}
- {path: youth_guide/src/styles/FirstLogin.css, symbol: .onboarding-job-row, operation: MODIFY, reason: 선택 배경과 테두리를 제거한다.}
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
  input: 체크박스 클릭, 행 클릭, Space, 관심 직무로 이동 후 복귀
  expected: 한 번만 토글되고 선택 배경이 없으며 두 단계 선택이 유지된다.
  observed: 체크박스 클릭과 직무명 칸 클릭은 각각 한 번만 바뀌었다. Space로 체크와 해제가 한 번씩 됐다. 선택 칸 배경은 투명이고 그림자는 없었다. 관심 직무에서 두 번째 항목만 체크된 뒤 현재 직무로 돌아오면 첫 항목 체크가 남고 두 번째는 체크되지 않았다.
  result: PASSED
  evidence_ref: null
unperformed_checks: []
state_before:
  job_selection: row background
state_after:
  job_selection: checkbox
remaining_work: []
next_action: 사용자 확인을 기다린다.
state_updates:
- {path: ai_team_docs/docs/CURRENT_STATE.md, result: APPLIED, evidence_ref: null}
missing_reasons: {}
```
