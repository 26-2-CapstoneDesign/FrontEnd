# 회원가입 비밀번호 안내 문구를 조건 충족 시 숨김

## 최신 요약

```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 회원가입 비밀번호 입력란 아래 안내 문구("영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.")를 기존 isValidPassword 판정이 통과하면 숨기고, 비어 있거나 조건을 만족하지 않으면 다시 표시하도록 SignUp.jsx만 수정했다. 린트·빌드와 브라우저에서 빈칸·abc·abcd123!·abcd123·빈칸 순서의 표시/숨김을 확인했다. SIGNUP-AC-04 문구("표시된다")와의 관계와 상태 문서 반영 여부가 사람 확인 대기라 IMPLEMENTING / WAITING_APPROVAL로 둔다.
task_id: signup-password-hint-001
session_id: 20261004T073106Z
kind: FEATURE
feature_id: SIGNUP
human_owner: null
actor_id: jb
tool: Cursor Agent
actual_model: null
started_at: '2026-10-04T07:29Z'
recorded_at: '2026-10-04T07:31:06Z'
timezone: UTC
source_revision: 5dcb48303aa817a546ff7a7f82ad617bb35b77ae
existing_edits: []
rules_version: 3.1.0
read_files:
- ai_team_docs/AI_RULES.md
- ai_team_docs/docs/worklogs/_TEMPLATE.md
- ai_team_docs/docs/features/SIGNUP.md
- ai_team_docs/docs/CURRENT_STATE.md
- youth_guide/src/pages/SignUp.jsx
goal: 비밀번호가 영문·숫자·특수문자 포함 8자 이상 조건을 만족하면 안내 문구를 숨기고, 비어 있거나 조건을 만족하지 않으면(다시 깨진 경우 포함) 안내 문구를 표시한다.
scope:
- youth_guide/src/pages/SignUp.jsx 비밀번호 안내 FieldMessage 수정
- ai_team_docs/docs/worklogs/ 안에 이번 작업 로그 1개 생성
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-04T07:29Z: 현재 대화의 사용자 요청 - 비밀번호 안내 문구를 조건(영문·숫자·특수문자 포함, 8자 이상) 충족 시 숨기고 미충족 시 표시, 기존 유효성 검사 로직 재사용, 다른 기능·UI 변경 금지, dependency 설치 금지, API 통신 코드·Login·FirstLogin 관련 파일·불필요한 파일 수정 금지, 표시/숨김 확인, commit·push 금지'
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
verification_status: PARTIAL
review_status: PENDING
integration_status: UNVERIFIED
deployment_status: NOT_DEPLOYED
latest_event_id: E004
previous_log: null
remaining_work:
- SIGNUP-AC-04와 새 숨김 동작의 관계에 대한 사람 확인
- SIGNUP.md·FEATURE_STATUS.md·CURRENT_STATE.md 반영 여부 결정
- 사람 검토
resume_when:
- 사용자가 SIGNUP-AC-04 해석과 상태 문서 반영 여부를 알려줄 때
next_action: 사용자에게 결과를 보고하고 확인을 받는다. 확인 전에는 추가 작업을 하지 않는다.
missing_reasons:
  human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음(CURRENT_STATE.md의 human_owner=null).
  actual_model: Cursor의 모델 설정이 Auto이며 실제 실행 모델 식별자가 도구에 노출되지 않아 확인하지 못함.
  started_at: 사용자 요청 메시지 시각이 분 단위(2026-10-04 16:29 UTC+9)로만 제공됨.
  integration_status: 코드 변경이 커밋되지 않았다(commit·push 금지).
not_applicable_reasons:
  previous_log: 이 작업의 이전 로그가 없다. SIGNUP 기능의 주 작업 로그는 docs/worklogs/signup-feature-001__jb__20261001T045008Z.md다.
```

## E001 — 작업 시작

```yaml
template: false
record_type: event
event_id: E001
event_type: START
summary_ko: 비밀번호 안내 문구를 조건 충족 시 숨기라는 요청을 받았다. SignUp.jsx에 이미 같은 조건을 판정하는 isValidPassword와 안내 문구 색상(passwordHintTone) 로직이 있어 이를 재사용하기로 했다.
actor_id: jb
recorded_at: '2026-10-04T07:31:06Z'
occurred_at: '2026-10-04T07:29Z'
source_revision: 5dcb48303aa817a546ff7a7f82ad617bb35b77ae
rule_refs:
- rule_id: C01
  rule_text: MUST identify task.goal, scope, acceptance criteria, source revision and existing edits before implementation.
  source_path: ai_team_docs/AI_RULES.md
- rule_id: C05
  rule_text: MAY make small reversible internal edits ONLY within approved scope, preserving public behavior/contracts and others' edits.
  source_path: ai_team_docs/AI_RULES.md
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-04T07:29Z'
actions:
- '작업 전 상태 확인: 비밀번호 FieldMessage는 항상 { text: PASSWORD_HINT, tone: passwordHintTone }을 받아 문구가 늘 표시됐다. passwordHintTone은 빈칸이면 hint, 입력이 있고 조건 미충족이면 error다.'
- 'isValidPassword: 8자 이상·20자 이하, 영문·숫자·특수문자(/[^A-Za-z\d\s]/) 각각 포함. 요청 조건 4개를 모두 포함하며, 20자 상한은 기존 SIGNUP-AC-03 기준이라 그대로 재사용한다.'
- 'FieldMessage는 message가 falsy이면 null을 렌더링한다.'
- 'SIGNUP.md 확인: SIGNUP-AC-04는 안내 문구가 검은색으로 "표시된다"고만 적혀 있고 "항상"이라는 조건은 없다. SIGNUP-AC-06(조건 미충족 시 빨간색)은 tone 로직을 유지하면 그대로다.'
- '작업 전 git status: 미커밋 변경 없음(HEAD 5dcb483 = origin/jb).'
changes: []
checks: []
unperformed_checks: []
state_before: {}
state_after:
  work_status: ACTIVE
  implementation_status: IMPLEMENTING
remaining_work:
- SignUp.jsx 수정
- 린트·빌드·브라우저 확인
next_action: SignUp.jsx를 수정한다.
state_updates: []
missing_reasons:
  occurred_at: 사용자 요청 메시지 시각이 분 단위로만 제공됨.
```

## E002 — 조건 충족 시 안내 문구 숨김

```yaml
template: false
record_type: event
event_id: E002
event_type: CHECKPOINT
summary_ko: 비밀번호 FieldMessage에 isPasswordValid가 true이면 null을, 아니면 기존 안내 문구와 색상을 넘기도록 바꿨다. 판정 함수·문구·색상 로직·CSS는 바꾸지 않았다.
actor_id: jb
recorded_at: '2026-10-04T07:31:06Z'
occurred_at: null
source_revision: 5dcb48303aa817a546ff7a7f82ad617bb35b77ae
rule_refs:
- rule_id: C05
  rule_text: MAY make small reversible internal edits ONLY within approved scope, preserving public behavior/contracts and others' edits.
  source_path: ai_team_docs/AI_RULES.md
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-04T07:29Z'
actions:
- 'message={{ text: PASSWORD_HINT, tone: passwordHintTone }} → message={isPasswordValid ? null : { text: PASSWORD_HINT, tone: passwordHintTone }}'
changes:
- path: youth_guide/src/pages/SignUp.jsx
  symbol: 비밀번호 FieldMessage
  operation: MODIFY
  reason: 조건 충족 시 안내 문구 숨김
checks: []
unperformed_checks:
- check: 린트·빌드·브라우저 확인
  reason: E003에서 수행한다.
state_before:
  work_status: ACTIVE
state_after:
  work_status: ACTIVE
  implementation_status: IMPLEMENTING
remaining_work:
- 검증
next_action: 검증한다.
state_updates: []
missing_reasons:
  occurred_at: 수정 시각이 따로 남지 않았다. 07:29Z(요청) 이후, 07:30:47Z(작업 트리 확인) 이전이다.
```

## E003 — 검증

```yaml
template: false
record_type: event
event_id: E003
event_type: VERIFY
summary_ko: 린트·빌드가 통과했고, 5179 개발 서버의 브라우저 /signup에서 빈칸이면 회색 안내, abc면 빨간 안내, abcd123!이면 숨김, abcd123으로 다시 깨지면 빨간 안내 재표시, 다시 비우면 회색 안내로 돌아옴을 확인했다. 변경 파일은 SignUp.jsx 하나이고 dependency 변경은 없다.
actor_id: jb
recorded_at: '2026-10-04T07:31:06Z'
occurred_at: '2026-10-04T07:30Z'
source_revision: 5dcb48303aa817a546ff7a7f82ad617bb35b77ae
rule_refs:
- rule_id: C04
  rule_text: MUST NOT invent features, stacks, API fields, approvals, worker identities, timestamps or successful results.
  source_path: ai_team_docs/AI_RULES.md
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-04T07:29Z'
actions:
- 'npx vite --port 5179 --strictPort를 샌드박스 밖에서 실행해 /signup을 열었다.'
- 'browser_fill로 비밀번호 값을 바꾸고, 각 단계 뒤 Runtime.evaluate로 비밀번호 입력란 영역의 안내 문구 존재와 class를 읽었다.'
- '확인 후 5179 서버를 종료했다.'
changes: []
checks:
- command: npm run lint
  environment: youth_guide, oxlint
  input: 'SignUp.jsx sha256 ed27952e…4810'
  expected: 진단 없음
  observed: 'LINT_EXIT=0(/tmp/yg-lint-pwhint.log, 2026-10-04T07:30:59Z 직전)'
  result: PASSED
  evidence_ref: /tmp/yg-lint-pwhint.log
- command: npx vite build --outDir /tmp/yg-build-pwhint --emptyOutDir
  environment: youth_guide, Vite 8
  input: 'SignUp.jsx sha256 ed27952e…4810'
  expected: 빌드 성공
  observed: 'BUILD_EXIT=0, built in 91ms(/tmp/yg-build-pwhint.log)'
  result: PASSED
  evidence_ref: /tmp/yg-build-pwhint.log
- command: 'browser_fill(비밀번호) + Runtime.evaluate'
  environment: 'Cursor 브라우저, http://localhost:5179/signup, 기본 뷰포트'
  input: 빈칸 → abc → abcd123! → abcd123 → 빈칸
  expected: 빈칸·미충족이면 표시, 충족이면 숨김, 다시 미충족이면 재표시
  observed: '빈칸: 표시(signup-message is-hint). abc: 표시(is-error). abcd123!: 스냅샷·스크린샷에서 문구 없음. abcd123: 표시(is-error). 다시 빈칸: 스냅샷에서 문구 표시'
  result: PASSED
  evidence_ref: docs/worklogs/signup-password-hint-001__jb__20261004T073106Z.md#E003
- command: git diff --stat + git diff --quiet -- youth_guide/package.json youth_guide/package-lock.json + shasum -a 256
  environment: 로컬 저장소(2026-10-04T07:30:59Z)
  input: 수정 후 작업 트리
  expected: SignUp.jsx만 변경, dependency 변경 없음
  observed: 'SignUp.jsx만 변경(3 insertions, 1 deletion), PKG_DIFF_EXIT=0. SignUp.jsx ed27952e…4810, SignUp.css f68bd9d2…a86a, Login.jsx ebd9c63c…588a, FirstLogin.jsx ce4ec8ab…ae9e'
  result: PASSED
  evidence_ref: docs/worklogs/signup-password-hint-001__jb__20261004T073106Z.md#E003
- command: pkill -f "vite --port 5179" + lsof -nP -iTCP:5179 -sTCP:LISTEN
  environment: 로컬 macOS(2026-10-04T07:31:03Z)
  input: 5179 포트
  expected: LISTEN 없음
  observed: LSOF_5179_EXIT=1(출력 없음)
  result: PASSED
  evidence_ref: docs/worklogs/signup-password-hint-001__jb__20261004T073106Z.md#E003
unperformed_checks:
- check: 실제 키보드 입력·Backspace로 조건이 깨질 때 재표시
  reason: browser_fill로 값을 바꿨다. 같은 onChange 경로를 쓰지만 실제 키보드 입력은 사람이 확인해야 한다.
- check: 21자 이상 입력 시 표시
  reason: 기존 isValidPassword의 20자 상한을 그대로 쓰므로 표시될 것으로 보이나 브라우저에서 확인하지 않았다.
- check: 좁은 화면 표시
  reason: 수행하지 않았다.
state_before:
  work_status: ACTIVE
  verification_status: NOT_RUN
state_after:
  work_status: ACTIVE
  implementation_status: IMPLEMENTING
  verification_status: PARTIAL
remaining_work:
- 완료 판단
next_action: E004에 완료 판단을 기록한다.
state_updates: []
missing_reasons:
  occurred_at: 브라우저 확인의 초 단위 시각이 남지 않아 분 단위로 적었다.
```

## E004 — 완료 판단 보류와 사람 확인 대기

```yaml
template: false
record_type: event
event_id: E004
event_type: STOP
summary_ko: 요청한 표시/숨김 동작은 브라우저에서 확인했지만, SIGNUP-AC-04는 안내 문구가 "표시된다"고만 정의돼 있어 조건 충족 시 숨김이 이 기준과 맞는지 사람 확인이 필요하다. 완료 기준을 바꾸지 않았고 SIGNUP.md·FEATURE_STATUS.md·CURRENT_STATE.md도 수정하지 않았다. IMPLEMENTING / WAITING_APPROVAL로 둔다.
actor_id: jb
recorded_at: '2026-10-04T07:31:06Z'
occurred_at: '2026-10-04T07:31:06Z'
source_revision: 5dcb48303aa817a546ff7a7f82ad617bb35b77ae
rule_refs:
- rule_id: C07
  rule_text: REQUIRE explicit scoped human approval BEFORE feature/acceptance, API, DB/data semantics, access, architecture/dependency, cost, merge/deploy or policy changes.
  source_path: ai_team_docs/AI_RULES.md
- rule_id: C18
  rule_text: SET IMPLEMENTED only after approved nonempty acceptance + required checks pass; set IN_REVIEW until human approval; feature DONE requires approval plus required integration/deployment.
  source_path: ai_team_docs/AI_RULES.md
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-04T07:29Z'
actions:
- 'SIGNUP-AC-03(유효한 비밀번호 판정): 판정 로직 변경 없음.'
- 'SIGNUP-AC-04(안내 문구 검은색 표시): 기존 상태 UNMET(색상 결정 대기) 유지. 빈칸·미충족일 때는 계속 표시되며, 충족 시 숨김이 기준 의도와 맞는지는 사람 판단이 필요하다.'
- 'SIGNUP-AC-06(조건 미충족 시 빨간색): tone 로직 변경 없음, E003에서 is-error 확인.'
changes:
- path: ai_team_docs/docs/worklogs/signup-password-hint-001__jb__20261004T073106Z.md
  symbol: session / E001–E004
  operation: ADD
  reason: 작업 경과와 검증 결과 기록
checks: []
unperformed_checks: []
state_before:
  work_status: ACTIVE
state_after:
  work_status: WAITING_APPROVAL
  implementation_status: IMPLEMENTING
  verification_status: PARTIAL
  review_status: PENDING
remaining_work:
- SIGNUP-AC-04 해석 확인
- 상태 문서 반영 여부 결정
next_action: 사용자에게 보고하고 확인을 받는다.
state_updates:
- path: ai_team_docs/docs/features/SIGNUP.md
  result: NOT_APPLIED
  evidence_ref: '요청이 "불필요한 파일을 수정하지 말 것"이라 했고, SIGNUP-AC-04 해석이 사람 확인 대기다.'
- path: ai_team_docs/docs/FEATURE_STATUS.md
  result: NOT_APPLIED
  evidence_ref: SIGNUP 항목의 상태 값(충족 개수 포함)은 이번 변경으로 바뀌지 않았다.
- path: ai_team_docs/docs/CURRENT_STATE.md
  result: NOT_APPLIED
  evidence_ref: 이 작업 항목 추가 여부는 사용자 결정 대기.
missing_reasons:
  stop.user_notification_ref: 사용자 보고는 이 기록을 마친 뒤 이뤄진다.
stop:
  category: APPROVAL_GAP
  location: {path: ai_team_docs/docs/features/SIGNUP.md, symbol: SIGNUP-AC-04, stage: 완료 판단}
  blocked_scope:
  - IMPLEMENTED·COMPLETE 기록
  - 상태 문서 반영
  conflicting_evidence:
  - 'SIGNUP-AC-04 expected: "영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요." 문구가 검은색으로 표시된다.'
  - '요청(07:29Z): 조건을 모두 만족하면 문구를 숨긴다.'
  observed_error: {message: null, summary_ko: 도구·실행 오류는 없었다. 기존 완료 기준 문구와 새 요청의 관계 확인 대기다., input: null, reproduction: null, result: null}
  predicted_risk:
  - trigger: 확인 없이 SIGNUP-AC-04를 판정할 경우
    affected_paths: [ai_team_docs/docs/features/SIGNUP.md]
    possible_failure: 완료 기준과 실제 동작의 해석이 어긋난 채 기록될 가능성
  attempts: []
  autonomous_fix_forbidden_because: 완료 기준 해석·변경은 사람 승인 사항이다(C07).
  preserved_edits:
  - youth_guide/src/pages/SignUp.jsx
  independent_allowed_work:
  - 정적 확인
  decision_request:
    question: 조건 충족 시 안내 문구를 숨기는 동작을 SIGNUP-AC-04와 맞는 것으로 볼지, 상태 문서에 반영할지
    proposed_change: 맞다고 보면 SIGNUP.md scope·check_evidence에 숨김 동작과 이 로그 근거를 추가하고 CURRENT_STATE.md에 이 작업을 등록
    options:
    - 현재 기준과 맞는 것으로 보고 상태 문서 반영
    - SIGNUP-AC-04 문구 수정(사람 승인 필요)
    - 상태 문서는 반영하지 않음
    impact: 결정 전까지 이 작업은 IMPLEMENTING / WAITING_APPROVAL로 남는다.
    requested_scope:
    - ai_team_docs/docs/features/SIGNUP.md
    - ai_team_docs/docs/CURRENT_STATE.md
  resume_when:
  - 사용자가 SIGNUP-AC-04 해석과 상태 문서 반영 여부를 알려줄 때
  resume_checks:
  - SignUp.jsx 해시가 E003과 같은지 확인
  user_notification_ref: null
```
