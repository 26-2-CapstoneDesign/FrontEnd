# 자격증 추가 취소 버튼
```yaml
schema_version: 3.1.0
template: false
record_type: session
summary_ko: 자격증 카드 버튼은 미선택일 때 파란색 추가, 선택일 때 회색 취소로 바뀐다. 취득 자격증은 취득일 확인 뒤에만 선택되고, 관심 자격증과 선택 상태는 서로 영향을 주지 않는다.
task_id: firstlogin-cert-toggle-001
session_id: firstlogin-cert-toggle-001__jb__20261015T150015Z
kind: MAINTENANCE
feature_id: null
human_owner: null
actor_id: jb
tool: cursor
actual_model: grok-4.7
started_at: '2026-10-15T14:58:00Z'
recorded_at: '2026-10-15T15:00:15Z'
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
goal: 자격증 카드 버튼을 선택 상태에 맞춰 추가와 취소로 표시한다.
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
  - time: '2026-10-15T14:58:00Z'
    type: read
    files:
      - youth_guide/src/pages/FirstLogin.jsx
      - youth_guide/src/styles/FirstLogin.css
    summary_ko: 카드 버튼은 항상 추가였고, 관심은 이미 토글되며 취득은 추가가 날짜 창을 연다.
  - time: '2026-10-15T14:59:00Z'
    type: edit
    files:
      - youth_guide/src/pages/FirstLogin.jsx
      - youth_guide/src/styles/FirstLogin.css
    summary_ko: 선택된 카드 버튼을 회색 취소로 바꿨다. 취득 취소는 등록 해제로 연결하고 미선택 추가는 날짜 창을 연다.
  - time: '2026-10-15T15:00:15Z'
    type: verify
    command: 'cd youth_guide && npx oxlint --format default src/pages/FirstLogin.jsx'
    result: PASSED
    summary_ko: 린트 0건. 브라우저에서 추가·취소 문구, 색, 취득일 확인, 두 영역 독립을 확인했다.
verification:
  - check: FirstLogin.jsx oxlint
    command: 'cd youth_guide && npx oxlint --format default src/pages/FirstLogin.jsx'
    result: PASSED
    summary_ko: 경고 0, 오류 0.
  - check: /firstlogin 버튼 상태
    command: 'http://127.0.0.1:5173/firstlogin'
    result: PASSED
    summary_ko: 미선택은 추가 rgb(21, 32, 166), 선택은 취소 rgb(229, 231, 235). 높이는 32px, 패딩은 0 14px. 취득은 날짜 확인 전 추가가 유지되고 확인 후 취소가 되며, 취소를 누르면 추가와 태그가 사라진다. 관심 02를 추가했다가 취소해도 취득 01은 취소로 남고 관심 03은 취소로 남는다.
next_action: 선택되지 않은 자격증 버튼은 파란색 추가, 선택된 자격증 버튼은 회색 취소다. 취득은 날짜 확인 뒤에만 취소로 바뀌고, 관심과 취득 상태는 서로 영향이 없다. 미커밋.
```
