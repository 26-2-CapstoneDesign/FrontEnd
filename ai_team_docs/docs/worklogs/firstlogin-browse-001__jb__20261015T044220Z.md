# 최초 로그인 대분류 소분류
```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 최초 로그인 네 단계의 검색 중심 목록을 대분류와 소분류 선택으로 바꿨다. 직무는 하위 분류가 없어 샘플 대분류 자신을 고르게 했고, 자격증은 기존 샘플 분류에 묶인 목업만 보여 준다. API는 호출하지 않았다.
task_id: firstlogin-browse-001
session_id: firstlogin-browse-001__jb__20261015T044220Z
kind: MAINTENANCE
feature_id: null
human_owner: null
actor_id: jb
tool: cursor
actual_model: grok-4.7
started_at: '2026-10-15T04:25:00Z'
recorded_at: '2026-10-15T04:42:20Z'
timezone: UTC
source_revision: 70afbb4
existing_edits:
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
  - youth_guide/src/api/onboarding.js
goal: 최초 로그인 네 단계에서 검색 대신 대분류와 소분류를 골라 선택하게 한다.
scope:
  - youth_guide/src/pages/FirstLogin.jsx
  - youth_guide/src/styles/FirstLogin.css
approval_refs: []
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
verification_status: PASSED
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
latest_event_id: E002
previous_log: docs/worklogs/firstlogin-api-001__jb__20261012T161154Z.md
remaining_work:
  - 사람 확인
  - 직무 소분류 데이터 연결
resume_when: []
next_action: 사람이 네 단계의 대분류·소분류 선택과 단계 이동 후 선택 유지를 확인한다.
missing_reasons:
  human_owner: 사람 담당자 미등록
  feature_id: 최초 로그인은 FEATURE_STATUS에 등록된 기능 ID가 아니다.
not_applicable_reasons:
  feature_file: 새 기능 기록이 아니다.
```

```yaml
template: false
record_type: event
summary_ko: 기존 직무 목업은 parentCategoryId가 없는 샘플 분류 4개뿐이고, 자격증 목업은 그 분류 id로만 묶여 있다. 실제 직무명이나 자격증명을 추가하지 않고 이 구조로 화면을 나눈다.
event_id: E001
event_type: START
actor_id: jb
recorded_at: '2026-10-15T04:42:20Z'
occurred_at: '2026-10-15T04:28:00Z'
source_revision: 70afbb4
rule_refs: []
approval_refs: []
actions:
  - FirstLogin.jsx의 MOCK_NCS_CATEGORIES와 MOCK_CERTIFICATES, onboarding.js의 미호출 상태를 확인했다.
changes: []
checks: []
unperformed_checks: []
state_before: {}
state_after: {}
remaining_work:
  - 화면 구현과 브라우저 확인
next_action: 검색 UI를 제거하고 대분류·소분류 영역을 넣는다.
state_updates:
  - path: docs/CURRENT_STATE.md
    result: NOT_APPLIED
    evidence_ref: null
missing_reasons: {}
```

```yaml
template: false
record_type: event
summary_ko: 네 단계에 대분류 버튼과 소분류 목록을 넣었다. 현재 직무에서 샘플 분류 A를 고른 뒤 다음으로 이동하고 돌아오면 체크가 남았다. 관심 직무의 샘플 분류 C 체크도 남았다. 취득 자격증은 분류 A에서 01·02·08, 분류 B에서 03·04·09가 바뀌고 등록 태그는 유지됐다. 관심 자격증 체크 해제도 됐다. fetch 호출은 0건이다.
event_id: E002
event_type: VERIFY
actor_id: jb
recorded_at: '2026-10-15T04:42:20Z'
occurred_at: '2026-10-15T04:42:20Z'
source_revision: 70afbb4
rule_refs: []
approval_refs: []
actions:
  - 검색 입력과 검색 제출을 네 단계에서 제거했다.
  - 대분류 선택 상태는 단계마다 따로 두고, 저장용 선택 목록은 기존 state를 유지했다.
changes:
  - path: youth_guide/src/pages/FirstLogin.jsx
    symbol: LevelBrowser
    operation: MODIFY
    reason: 대분류를 고른 뒤에만 소분류를 보여 준다.
  - path: youth_guide/src/styles/FirstLogin.css
    symbol: .onboarding-levels
    operation: ADD
    reason: 대분류와 소분류 영역을 나누고 좁은 화면에서는 세로로 쌓는다.
checks:
  - command: npx oxlint --format default src/pages/FirstLogin.jsx
    environment: youth_guide
    input: FirstLogin.jsx
    expected: warnings 0 errors 0
    observed: Found 0 warnings and 0 errors.
    result: PASSED
    evidence_ref: null
  - command: browser layout measure
    environment: 'http://127.0.0.1:5173/onboarding/certifications'
    input: 네 단계 선택과 단계 이동
    expected: 대분류 전 안내, 분류 전환, 선택 유지, API 미호출
    observed: '대분류 전에는 안내 문구가 보인다. 현재 직무 A 체크는 관심 직무로 갔다가 돌아와도 유지된다. 관심 직무 C 체크도 유지된다. 취득 자격증 A는 01·02·08, B는 03·04·09이고 01 등록 태그는 B로 바꿔도 남는다. 관심 자격증 02 체크를 해제하면 false가 된다. window.fetch 호출 배열은 빈 배열이다. 1440px에서 영역은 220px와 774px, 390px에서는 한 열이고 대분류는 가로 줄바꿈이다.'
    result: PASSED
    evidence_ref: null
unperformed_checks: []
state_before: {}
state_after: {}
remaining_work:
  - 사람 확인
next_action: 사람이 네 단계를 확인한다.
state_updates:
  - path: docs/CURRENT_STATE.md
    result: APPLIED
    evidence_ref: docs/CURRENT_STATE.md
missing_reasons: {}
```
