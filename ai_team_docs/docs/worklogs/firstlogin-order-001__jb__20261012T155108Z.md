# 최초 로그인 단계 순서 변경

## 최신 요약

```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 최초 로그인 단계를 현재 직무, 관심 직무, 취득 자격증, 관심 자격증 순으로 바꿨다. 이전·다음은 그 순서로 이동하고, 선택한 직무와 자격증은 단계를 오가도 남는다. 마지막 완료 동작은 그대로다.
task_id: firstlogin-order-001
session_id: 20261012T155108Z
kind: FEATURE
feature_id: null
human_owner: null
actor_id: jb
tool: Cursor Agent
actual_model: null
started_at: '2026-10-12T15:50Z'
recorded_at: '2026-10-12T15:51:08Z'
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
goal: 최초 로그인 단계 순서를 현재 직무, 관심 직무, 취득 자격증, 관심 자격증으로 맞춘다.
scope:
- youth_guide/src/pages/FirstLogin.jsx
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T15:50Z: 단계 순서를 현재 직무, 관심 직무, 취득 자격증, 관심 자격증으로 변경'
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
verification_status: PASSED
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
latest_event_id: E001
previous_log: docs/worklogs/firstlogin-ui-001__jb__20261012T154513Z.md
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
summary_ko: 2단계와 3단계의 탭 이름과 화면을 바꿨다. 브라우저에서 다음·이전 이동과 선택 유지를 확인했다.
event_id: E001
event_type: VERIFY
actor_id: jb
recorded_at: '2026-10-12T15:51:08Z'
occurred_at: '2026-10-12T15:51:08Z'
source_revision: 0bfaf51695518709a79f2b950564d2da27a59078
rule_refs:
- {rule_id: C13, rule_text: 작업·작업자·세션별 로그를 남긴다., source_path: ai_team_docs/AI_RULES.md}
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T15:50Z: 단계 순서 변경'
actions:
- STEPS의 2단계와 3단계 이름을 바꿨다.
- 관심 직무 화면을 2단계, 취득 자격증 화면을 3단계에 연결했다.
changes:
- {path: youth_guide/src/pages/FirstLogin.jsx, symbol: STEPS, operation: MODIFY, reason: 표시 순서와 진행 순서를 맞춘다.}
checks:
- command: npx oxlint --format default src/pages/FirstLogin.jsx
  environment: youth_guide
  input: null
  expected: warnings 0, errors 0
  observed: Found 0 warnings and 0 errors.
  result: PASSED
  evidence_ref: null
- command: browser http://127.0.0.1:5173/onboarding/certifications
  environment: Vite dev server
  input: 현재 직무 선택 후 다음, 관심 직무 선택 후 다음, 취득 자격증 선택 후 다음, 이전으로 복귀
  expected: 탭과 화면 순서가 같고 선택이 유지되며 마지막 버튼은 완료
  observed: 탭은 현재 직무, 관심 직무, 취득 자격증, 관심 자격증이었다. 다음으로 같은 제목 순서가 나왔고 이전으로 돌아가도 직무 행 선택과 취득 자격증 체크가 남았다. 4단계 버튼은 완료였다.
  result: PASSED
  evidence_ref: null
unperformed_checks: []
state_before:
  step2: 취득 자격증
  step3: 관심 직무
state_after:
  step2: 관심 직무
  step3: 취득 자격증
remaining_work: []
next_action: 사용자 확인을 기다린다.
state_updates:
- {path: ai_team_docs/docs/CURRENT_STATE.md, result: APPLIED, evidence_ref: null}
missing_reasons: {}
```
