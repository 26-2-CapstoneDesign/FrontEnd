# 아이디 찾기·비밀번호 찾기 API 연결 준비

## 최신 요약

```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 아이디 찾기와 비밀번호 찾기의 호출 함수는 계약이 없어 요청을 보내지 않고 null을 반환한다. 화면은 그 결과가 없을 때 완료 화면으로 이동하지 않고, 요청 중 중복 호출과 통신 예외만 처리한다. 공통 API 모듈·환경변수·proxy는 기존 프로젝트에 없어 추가하지 않았다. lint는 통과했다. 실제 서버 연결은 하지 않았다.
task_id: find-account-api-001
session_id: 20261010T140051Z
kind: FEATURE
feature_id: null
human_owner: null
actor_id: jb
tool: Cursor Agent
actual_model: null
started_at: '2026-10-10T13:58Z'
recorded_at: '2026-10-10T14:00:51Z'
timezone: UTC
source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
existing_edits:
- 'FindId·FindPassword·완료 화면과 라우트는 이전 미커밋 작업이다. 이번 작업은 두 페이지의 호출 처리만 바꿨다.'
rules_version: 3.1.0
read_files:
- ai_team_docs/AI_RULES.md
- ai_team_docs/docs/CURRENT_STATE.md
- ai_team_docs/docs/FEATURE_STATUS.md
- ai_team_docs/docs/features/FIND_ID.md
- ai_team_docs/docs/features/FIND_PASSWORD.md
- ai_team_docs/docs/features/LOGIN.md
- ai_team_docs/docs/features/SIGNUP.md
- youth_guide/src/pages/FindId.jsx
- youth_guide/src/pages/FindPassword.jsx
- youth_guide/src/pages/Login.jsx
- youth_guide/vite.config.js
goal: 기존 화면과 입력 검증을 유지한 채, 명세에 있는 API만 호출하고 없는 API는 연결 자리만 둔다.
scope:
- youth_guide/src/pages/FindId.jsx
- youth_guide/src/pages/FindPassword.jsx
- docs/features/FIND_ID.md
- docs/features/FIND_PASSWORD.md
- docs/FEATURE_STATUS.md
- docs/CURRENT_STATE.md
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-10T13:58Z: 계약이 확인된 API만 구현, URL·필드·가짜 성공 금지, 다른 기능 수정 금지, lint, 브라우저 호출 금지, commit·push 금지'
implementation_status: IMPLEMENTING
work_status: BLOCKED
verification_status: PARTIAL
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
latest_event_id: E001
previous_log: null
remaining_work:
- 아이디 찾기·비밀번호 찾기 API의 URL, method, 요청 필드, 응답 필드, 인증 방식 확정
- 확정된 계약으로 호출 함수 구현
resume_when:
- 해당 API 계약이 명세로 확정될 때
next_action: 사용자에게 미구현 API 목록을 보고한다.
missing_reasons:
  human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
  feature_id: 이번 작업은 FIND_ID와 FIND_PASSWORD를 함께 다루며 새 기능 ID를 만들지 않았다.
  actual_model: 실행 모델 식별자를 확인하지 못함.
not_applicable_reasons:
  previous_log: 이 작업의 이전 로그가 없다.
```

## E001 — 계약 확인과 호출 자리 정리

```yaml
template: false
record_type: event
event_id: E001
event_type: CHECKPOINT
summary_ko: 저장소 명세와 코드에서 아이디 찾기·비밀번호 찾기 API 계약을 찾지 못했다. 확인된 API는 MEM-01과 AUTH-01뿐이고 둘 다 제안 상태이며 이 기능의 계약이 아니다. 그래서 fetch를 추가하지 않고, 두 페이지의 호출 함수가 null을 반환하게 두었다. 발송·검증은 진행 중 재호출을 막고 예외 시 기존 실패 문구를 쓴다. 아이디 조회는 문자열이 있을 때만 완료 화면으로 가고, 비밀번호 재설정은 response.ok일 때만 완료 화면으로 간다. lint는 통과했다. 서버 호출과 브라우저 조작은 하지 않았다.
actor_id: jb
recorded_at: '2026-10-10T14:00:51Z'
occurred_at: '2026-10-10T13:58Z'
source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
rule_refs:
- rule_id: C04
  rule_text: MUST NOT invent features, stacks, API fields, approvals, worker identities, timestamps or successful results.
  source_path: ai_team_docs/AI_RULES.md
- rule_id: C07
  rule_text: REQUIRE explicit scoped human approval BEFORE feature/acceptance, API, DB/data semantics, access, architecture/dependency, cost, merge/deploy or policy changes.
  source_path: ai_team_docs/AI_RULES.md
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-10T13:58Z'
actions:
- 저장소 문서·vite 설정·기존 fetch 사용처를 확인해 아이디 찾기와 비밀번호 찾기 계약이 없음을 확인
- FindId.jsx와 FindPassword.jsx의 호출 함수는 null을 반환하고, 발송·검증에 진행 잠금과 예외 처리를 추가
changes:
- path: youth_guide/src/pages/FindId.jsx
  symbol: requestIdFindCode / verifyIdFindCode / findLoginId
  operation: MODIFY
  reason: 계약 없는 요청을 보내지 않고 호출 중 잠금과 예외만 처리
- path: youth_guide/src/pages/FindPassword.jsx
  symbol: requestPasswordResetCode / verifyPasswordResetCode / resetFoundPassword
  operation: MODIFY
  reason: 계약 없는 요청을 보내지 않고 호출 중 잠금과 예외만 처리
checks:
- command: npm run lint
  environment: youth_guide, oxlint
  input: 현재 작업 트리
  expected: 진단 없음
  observed: LINT_EXIT=0. FindId.jsx와 FindPassword.jsx는 Found 0 warnings and 0 errors.
  result: PASSED
  evidence_ref: /tmp/find-account-api-lint.log
- command: 'rg fetch youth_guide/src/pages/FindId.jsx youth_guide/src/pages/FindPassword.jsx'
  environment: 작업 트리
  input: 두 페이지
  expected: fetch 호출 없음
  observed: 두 파일에서 fetch 호출이 없다.
  result: PASSED
  evidence_ref: null
unperformed_checks:
- check: 실제 백엔드 요청과 응답
  reason: API 계약과 서버가 없고, 이번 요청에서 브라우저 조작과 실제 API 호출을 하지 않는다.
state_before:
  implementation_status: IMPLEMENTING
state_after:
  implementation_status: IMPLEMENTING
  work_status: BLOCKED
  verification_status: PARTIAL
remaining_work:
- API 계약 확정 후 호출 함수 구현
next_action: 사용자에게 필요한 백엔드 API를 보고한다.
state_updates:
- {path: youth_guide/src/pages/FindId.jsx, result: APPLIED, evidence_ref: null-return}
- {path: youth_guide/src/pages/FindPassword.jsx, result: APPLIED, evidence_ref: null-return}
missing_reasons: {}
```
