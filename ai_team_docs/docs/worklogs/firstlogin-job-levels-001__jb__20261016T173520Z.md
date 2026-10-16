# 직무 3단 분류
```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 현재 직무와 관심 직무만 대분류, 중분류, 소분류 세 영역으로 나눴다. 분류 관계는 parentCategoryId만 보고, 샘플 데이터에는 하위 분류가 없어 중분류는 비어 있다. 없는 직무명은 넣지 않았고 API는 호출하지 않았다.
task_id: firstlogin-job-levels-001
session_id: firstlogin-job-levels-001__jb__20261016T173520Z
kind: MAINTENANCE
feature_id: null
human_owner: null
actor_id: jb
tool: cursor
actual_model: grok-4.7
started_at: '2026-10-16T17:30:00Z'
recorded_at: '2026-10-16T17:35:20Z'
timezone: UTC
source_revision: 70afbb4
existing_edits:
  - youth_guide/src/pages/FirstLogin.jsx
  - youth_guide/src/styles/FirstLogin.css
rules_version: 3.1.0
read_files:
  - AI_RULES.md
  - docs/CURRENT_STATE.md
  - youth_guide/src/pages/FirstLogin.jsx
  - youth_guide/src/styles/FirstLogin.css
  - youth_guide/src/api/onboarding.js
goal: 직무 선택을 대분류, 중분류, 소분류 3단으로 보여 주고 선택 상태는 유지한다.
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
  - time: '2026-10-16T17:30:00Z'
    type: read
    files:
      - youth_guide/src/pages/FirstLogin.jsx
      - youth_guide/src/api/onboarding.js
    summary_ko: 직무 목업은 parentCategoryId가 없는 샘플 분류 4개다. 저장 함수는 요청을 보내지 않는다.
  - time: '2026-10-16T17:33:00Z'
    type: edit
    files:
      - youth_guide/src/pages/FirstLogin.jsx
      - youth_guide/src/styles/FirstLogin.css
    summary_ko: 직무 화면을 3단으로 바꾸고 하위 목록은 parentCategoryId로만 고른다. 대분류를 바꾸면 중분류 보기만 지우고 선택한 직무 id는 남긴다.
  - time: '2026-10-16T17:35:20Z'
    type: verify
    command: 'cd youth_guide && npx oxlint --format default src/pages/FirstLogin.jsx'
    result: PASSED
    summary_ko: 린트 0건. 1440px는 3열, 390px는 1열이다. 현재 직무 B와 관심 직무 C는 따로 남고, 중분류 데이터는 없다.
verification:
  - check: FirstLogin.jsx oxlint
    command: 'cd youth_guide && npx oxlint --format default src/pages/FirstLogin.jsx'
    result: PASSED
    summary_ko: 경고 0, 오류 0.
  - check: /firstlogin 직무 3단
    command: 'http://127.0.0.1:5173/firstlogin'
    result: PASSED
    summary_ko: 1440px 그리드는 약 327px 세 열이다. 대분류 선택 전 중분류와 소분류에 안내 문구가 있고, 샘플 분류를 고르면 중분류는 없음 문구다. 현재 직무는 B, 관심 직무는 C로 따로 유지되고 다음 뒤 이전해도 B가 남는다. 390px는 1열이고 대분류 버튼이 줄바꿈된다. 취득 자격증 검색과 추가 버튼은 그대로다. fetch 호출은 0건. 소분류 체크 해제는 하위 항목이 없어 화면에서 누르지 못했다.
next_action: 현재 직무와 관심 직무만 대분류·중분류·소분류 3단으로 표시한다. 샘플 분류는 상위가 없어 중분류가 비어 있다. 없는 직무명은 추가하지 않았다. 미커밋.
```
