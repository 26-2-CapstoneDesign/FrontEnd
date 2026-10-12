# 최초 로그인 화면 4단계 구성

## 최신 요약

```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 기존 FirstLogin 화면을 현재 직무, 취득 자격증, 관심 직무, 관심 자격증의 4단계로 바꿨다. 취득·관심 자격증의 검색, 선택, 해제는 유지하고 단계가 바뀌어도 상태가 남는다. 직무 목록은 저장소에 없어 기존 샘플 분류만 표시한다. lint는 통과했다. 브라우저는 확인하지 않았다.
task_id: firstlogin-steps-001
session_id: 20261012T010431Z
kind: FEATURE
feature_id: null
human_owner: null
actor_id: jb
tool: Cursor Agent
actual_model: null
started_at: '2026-10-12T01:01Z'
recorded_at: '2026-10-12T01:04:31Z'
timezone: UTC
source_revision: 0bfaf51695518709a79f2b950564d2da27a59078
existing_edits: []
rules_version: 3.1.0
read_files:
- ai_team_docs/AI_RULES.md
- ai_team_docs/docs/CURRENT_STATE.md
- youth_guide/src/pages/FirstLogin.jsx
- youth_guide/src/styles/FirstLogin.css
goal: 기존 최초 로그인 화면의 자격증 기능을 유지한 채 첨부 4단계 UI로 바꾼다.
scope:
- youth_guide/src/pages/FirstLogin.jsx
- youth_guide/src/styles/FirstLogin.css
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T01:01Z: 기존 FirstLogin을 4단계 UI로 수정, 새 페이지·임의 직무 데이터·브라우저 조작·commit·push 금지'
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
verification_status: PARTIAL
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
latest_event_id: E001
previous_log: docs/worklogs/firstlogin-001__jb__20261002T110244Z.md
remaining_work:
- 직무 분류 데이터 또는 API 확정
- 브라우저에서 4단계 전환과 선택 유지 확인
resume_when:
- 직무 분류 계약이 확정될 때
next_action: 사용자에게 샘플 분류 사용과 lint 결과를 보고한다.
missing_reasons:
  human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
  feature_id: 최초 로그인은 FEATURE_STATUS에 등록된 기능 ID가 없다. 새 ID를 만들지 않았다.
  actual_model: 실행 모델 식별자를 확인하지 못함.
not_applicable_reasons: {}
```

## E001 — 4단계 화면 구성

```yaml
template: false
record_type: event
event_id: E001
event_type: CHECKPOINT
summary_ko: FirstLogin.jsx와 FirstLogin.css만 수정했다. 라우트는 /onboarding/certifications 그대로다. 2단계는 기존 취득 자격증 검색·선택·취득일·삭제, 4단계는 기존 관심 자격증 검색·추가·해제·상세보기를 쓴다. 1단계와 3단계는 기존 샘플 분류 4개만 표로 보여 주고 서로 다른 선택 상태를 유지한다. 완료 버튼은 기존 saveInterestCertificates 호출과 미연결 안내를 유지한다. lint는 통과했다.
actor_id: jb
recorded_at: '2026-10-12T01:04:31Z'
occurred_at: '2026-10-12T01:01Z'
source_revision: 0bfaf51695518709a79f2b950564d2da27a59078
rule_refs:
- rule_id: C04
  rule_text: MUST NOT invent features, stacks, API fields, approvals, worker identities, timestamps or successful results.
  source_path: ai_team_docs/AI_RULES.md
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-12T01:01Z'
actions:
- 직무 분류 데이터 검색 결과 샘플 분류와 미사용 NCS 조회 함수만 확인
- FirstLogin 화면을 같은 컴포넌트 안의 4단계로 변경
changes:
- path: youth_guide/src/pages/FirstLogin.jsx
  symbol: FirstLogin
  operation: MODIFY
  reason: 기존 자격증 기능을 2단계와 4단계에 배치
- path: youth_guide/src/styles/FirstLogin.css
  symbol: null
  operation: MODIFY
  reason: 4단계 카드와 표, 자격증 카드 스타일
checks:
- command: npm run lint
  environment: youth_guide, oxlint
  input: 현재 작업 트리
  expected: 진단 없음
  observed: LINT_EXIT=0. FirstLogin.jsx는 Found 0 warnings and 0 errors.
  result: PASSED
  evidence_ref: /tmp/firstlogin-steps-lint.log
unperformed_checks:
- check: 브라우저에서 단계 전환과 선택 유지
  reason: 이번 요청에서 브라우저 자동 조작을 하지 않는다.
state_before:
  implementation_status: IMPLEMENTING
state_after:
  implementation_status: IMPLEMENTING
  work_status: WAITING_APPROVAL
  verification_status: PARTIAL
remaining_work:
- 직무 분류 계약 확정
- 브라우저 확인
next_action: 사용자에게 보고한다.
state_updates:
- {path: youth_guide/src/pages/FirstLogin.jsx, result: APPLIED, evidence_ref: four-steps}
missing_reasons: {}
```
