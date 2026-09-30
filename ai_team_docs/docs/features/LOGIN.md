# 로그인 (LOGIN)

```yaml
schema_version: 3.1.0
template: false
record_type: feature
summary_ko: 로그인 UI는 UI 코드 구현을 마쳤고 브라우저 검증을 기다리고 있어 IMPLEMENTING 상태다. 로그인 API 연동은 API·인증 방식·데이터 구조가 정해지지 않아 착수하지 않았다(NOT_STARTED). 로그인 기능 전체는 완료가 아니다.
feature_id: LOGIN
name: 로그인
human_owner: null
actor_id: jb
participants:
- jb
approval_refs:
- 'EXPLICIT_REQUEST@2026-09-30T11:48Z: 현재 대화의 사용자 요청 - 로그인 화면 UI 구현(백엔드 미연결)'
- 'EXPLICIT_REQUEST@2026-09-30T11:59Z: 현재 대화의 사용자 요청 - 비밀번호 입력창 최대 20자 제한'
- 'EXPLICIT_REQUEST(시각 미제공): 현재 대화의 사용자 답변 - 기능 ID LOGIN 등록, 로그인 UI와 API 연동 구분, 로그인 UI는 IMPLEMENTING'
updated_at: '2026-09-30T12:51:09Z'
source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
feature_file: docs/features/LOGIN.md
latest_worklog: docs/worklogs/login-feature-001__jb__20260930T121505Z.md
implementation_status: IMPLEMENTING
work_status: BLOCKED
acceptance_passed: 5
acceptance_total: 13
verification_status: PARTIAL
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
missing_reasons:
  human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음(CURRENT_STATE.md의 human_owner=null).
  approval_refs: 승인 근거는 현재 대화의 사용자 요청이며 DECISIONS.md에는 등록하지 않았다(수정 허용 범위 밖).
  acceptance_total: 로그인 UI 기준 13개만 포함한다. 로그인 API 연동의 완료 기준은 정해지지 않아(UNDECIDED) 포함하지 않았으며, 기준이 승인되면 사람 승인을 거쳐 분모를 바꾼다(C21).
not_applicable_reasons: {}
goal: 사용자가 아이디와 비밀번호로 로그인할 수 있는 화면과 기능을 제공한다. 현재 확정된 범위는 백엔드 없이 동작하는 로그인 UI이며, 로그인 API 연동 방식은 정해지지 않았다.
scope:
- '로그인 UI: 제목, 아이디 입력창, 비밀번호 입력창(가림, 최대 20자), 로그인 상태 유지 체크박스, 로그인 버튼, 아이디 찾기 버튼, 비밀번호 찾기 버튼, 안내·오류 메시지 영역'
- '로그인 UI: 로그인 버튼 클릭 시 "로그인 서버가 아직 연결되지 않았습니다." 안내 메시지 표시'
- '로그인 UI: 화면 중앙 배치, hover·focus 스타일, 작은 화면 대응, 스타일은 styles/Login.css에만 작성'
- '로그인 API 연동: 범위·방식 UNDECIDED'
excluded_scope:
- 현재 단계의 백엔드 API 호출, 로그인 성공·실패 판단, 로그인 후 페이지 이동
- 아이디 찾기·비밀번호 찾기 기능과 페이지 이동(현재는 버튼 UI만)
- 회원가입 버튼(사용자 제공 시안에는 있으나 요청 구성에 없음)
dependency_refs:
- youth_guide/src/App.jsx의 Route path="/login"(기존 라우팅, 수정하지 않음)
- youth_guide/src/components/Layout.jsx의 Outlet(기존 레이아웃, 수정하지 않음)
unknowns:
- '로그인 API 엔드포인트·요청·응답 구조: UNDECIDED'
- '인증 방식: UNDECIDED'
- '로그인 관련 데이터 구조: UNDECIDED'
- '로그인 상태 유지 체크박스의 실제 동작(현재는 화면 상태만 관리): UNDECIDED'
- '로그인 성공 후 이동 경로: UNDECIDED(요청에서 "로그인 성공 후 홈으로 이동하는 기능도 아직 구현하지 않음"으로만 언급됨)'
- '로그인 실패 시 오류 메시지의 조건·문구: UNDECIDED'
- '아이디 찾기·비밀번호 찾기 기능: UNDECIDED'
- '로그인 API 연동의 완료 기준: UNDECIDED'
acceptance_definition_status: APPROVED
acceptance_approval_refs:
- 'EXPLICIT_REQUEST@2026-09-30T11:48Z: 현재 대화의 사용자 요청(로그인 화면 구성·기능·스타일)'
- 'EXPLICIT_REQUEST@2026-09-30T11:59Z: 현재 대화의 사용자 요청(비밀번호 최대 20자)'
acceptance_criteria:
- ac_id: LOGIN-AC-01
  condition: /login 화면 표시
  expected: 로그인 페이지 제목이 보인다.
  status: MET
  evidence_refs: ['docs/worklogs/login-feature-001__jb__20260930T121505Z.md#E004 접근성 스냅샷 heading "청년 길잡이"']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-02
  condition: 아이디 입력창에 입력
  expected: 입력창이 보이고 입력한 내용이 반영된다.
  status: UNVERIFIED
  evidence_refs: ['E004 스냅샷에서 textbox "아이디" 표시 확인. 입력 동작은 E003 차단으로 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-03
  condition: 비밀번호 입력창에 입력
  expected: 입력창이 보이고 입력 내용이 가려진다.
  status: UNVERIFIED
  evidence_refs: ['E004 스냅샷에서 textbox "비밀번호" 표시 확인. 코드상 type="password", 실제 입력·가림은 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-04
  condition: 로그인 상태 유지 체크박스 클릭
  expected: 체크 상태가 바뀐다.
  status: UNVERIFIED
  evidence_refs: ['E004 스냅샷에서 checkbox "로그인 상태 유지" 표시 확인. 토글 동작은 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-05
  condition: 로그인 버튼 클릭
  expected: '"로그인 서버가 아직 연결되지 않았습니다." 안내 메시지가 표시된다.'
  status: UNVERIFIED
  evidence_refs: ['코드상 handleSubmit에서 setMessage 호출. 브라우저 동작은 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-06
  condition: /login 화면 표시
  expected: 아이디 찾기·비밀번호 찾기 버튼이 보인다(기능·이동 없음).
  status: MET
  evidence_refs: ['E004 스냅샷 button "아이디 찾기"·"비밀번호 찾기"', 'Login.jsx에서 type="button", onClick 없음']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-07
  condition: 안내·오류 메시지 발생
  expected: 메시지가 지정된 영역에 표시된다.
  status: UNVERIFIED
  evidence_refs: ['코드상 p.login-message(role="status") 존재. 메시지가 없는 초기 상태라 화면 표시는 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-09
  condition: /login 화면 표시
  expected: 로그인 영역이 화면 중앙에 배치된다.
  status: MET
  evidence_refs: ['E004 스크린샷(기본 뷰포트 1개)']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-10
  condition: 입력창·버튼에 마우스를 올리거나 포커스
  expected: hover·focus 스타일이 적용된다.
  status: UNVERIFIED
  evidence_refs: ['Login.css에 hover·focus 규칙 존재. 실제 표시는 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-11
  condition: 좁은 화면(480px·320px 이하)
  expected: 레이아웃이 깨지지 않는다.
  status: UNVERIFIED
  evidence_refs: ['Login.css에 미디어 쿼리 존재. 좁은 화면 표시는 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-12
  condition: 스타일 작성 위치
  expected: 로그인 화면 스타일은 styles/Login.css에만 있고 Login.jsx에 인라인 스타일이 없다.
  status: MET
  evidence_refs: ['E009 rg "style=" NO_MATCH', 'Login.jsx가 ../styles/Login.css를 import']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-15
  condition: 비밀번호 입력창 속성
  expected: HTML maxLength가 20으로 설정되어 있다.
  status: MET
  evidence_refs: ['E009 rg 결과 Login.jsx 44행 maxLength={20}']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-16
  condition: 비밀번호를 21자 이상 입력
  expected: 20자를 넘는 입력이 들어가지 않는다.
  status: UNVERIFIED
  evidence_refs: ['브라우저 동작은 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
components:
- path: youth_guide/src/pages/Login.jsx
  symbol: Login / handleSubmit
  role: '로그인 UI: 화면 구성, 입력 상태 관리, 서버 미연결 안내 메시지'
  implementation_status: IMPLEMENTING
  remaining_work:
  - LOGIN-AC-02·03·04·05·07·16 브라우저 확인
  task_refs: [login-feature-001]
- path: youth_guide/src/styles/Login.css
  symbol: .login-page / .login-card / .login-input / .login-keep-checkbox / .login-message / .login-submit / .login-find-button
  role: '로그인 UI: 로그인 화면 전용 스타일'
  implementation_status: IMPLEMENTING
  remaining_work:
  - LOGIN-AC-10·11 브라우저 확인
  task_refs: [login-feature-001]
- path: null
  symbol: null
  role: '로그인 API 연동: 백엔드 로그인 요청과 결과 처리'
  implementation_status: NOT_STARTED
  remaining_work:
  - API·인증 방식·데이터 구조 결정(UNDECIDED)
  - 완료 기준 승인
  task_refs: []
connections:
- from: {path: youth_guide/src/App.jsx, symbol: 'Route path="/login"'}
  to: {path: youth_guide/src/pages/Login.jsx, symbol: Login, external_boundary: null}
  payload: 없음(props 없음)
  contract_ref: 기존 라우팅
  purpose: /login 경로에서 로그인 화면을 렌더링한다.
  verification_evidence: ['docs/worklogs/login-feature-001__jb__20260930T121505Z.md#E004']
- from: {path: youth_guide/src/pages/Login.jsx, symbol: 'import "../styles/Login.css"'}
  to: {path: youth_guide/src/styles/Login.css, symbol: .login-*, external_boundary: null}
  payload: CSS 클래스
  contract_ref: null
  purpose: 로그인 화면 전용 스타일을 적용한다.
  verification_evidence: ['docs/worklogs/login-feature-001__jb__20260930T121505Z.md#E004']
- from: {path: youth_guide/src/pages/Login.jsx, symbol: handleSubmit}
  to: {path: null, symbol: null, external_boundary: UNDECIDED}
  payload: UNDECIDED
  contract_ref: null
  purpose: '로그인 API 연동(미착수). 현재는 외부 호출 없이 안내 메시지만 설정한다.'
  verification_evidence: []
verified_flow: /login 접속 → Login 렌더링 → Login.css 적용 → 제목·입력창·체크박스·버튼 표시까지 확인했다. 입력·클릭 → 메시지 표시 흐름과 API 연동 흐름은 확인하지 않았다.
verification_scope: MIXED
required_checks:
- npm run lint
- vite build
- 브라우저에서 LOGIN-AC-02·03·04·05·07·10·11·16 확인
check_evidence:
- 'npm run lint: 진단 없음, EXIT=0 (worklog E009)'
- 'vite build: 성공, /tmp 출력 (worklog E004)'
- '브라우저 화면 표시: 접근성 스냅샷·스크린샷으로 요소 존재와 중앙 배치 확인 (worklog E004)'
- '브라우저 상호작용: 도구 차단으로 미실행 (worklog E003)'
- 'API 연동: 대상 없음(미착수)'
exception_coverage:
- 백엔드가 없으므로 로그인 버튼은 입력값과 관계없이 같은 안내 메시지를 설정한다.
- 빈 아이디·비밀번호에 대한 별도 검증 메시지는 요청 범위에 없어 구현하지 않았다.
blockers:
- '로그인 UI: 브라우저 상호작용 검증이 도구에서 거부됨(worklog E003, ENVIRONMENT_FAILURE). 사람의 직접 확인 필요'
- '로그인 API 연동: API·인증 방식·데이터 구조가 정해지지 않음(UNDECIDED)'
resume_when:
- 사용자가 브라우저에서 LOGIN-AC-02·03·04·05·07·10·11·16을 직접 확인한 결과를 알려줄 때
- 로그인 API·인증 방식·데이터 구조가 사람에 의해 확정될 때
next_action: 사용자 확인을 받는다. 확인 전에는 추가 작업을 하지 않는다.
remaining_work:
- 로그인 UI 브라우저 확인과 사람 검토
- 로그인 API 연동 방식 결정과 구현
completion_requires: {review_status: APPROVED, integration_status: null, deployment_status: null}
review_evidence: []
integration_evidence: []
deployment_evidence: []
completion_event_ref: null
limitations:
- 변경은 커밋되지 않은 로컬 작업 트리에만 있다.
- LOGIN-AC-05의 안내 메시지는 API 미연결 단계의 동작이며, API 연동 시 바뀔 수 있다(변경 시 사람 승인 필요).
- 실행 모델 식별자는 확인하지 못했다.
handoff: 로그인 UI 확인은 youth_guide에서 npm run dev 실행 후 /login에서 입력·체크박스·로그인 버튼·21자 입력을 직접 조작해 진행한다. 로그인 API 연동은 API 명세와 인증 방식이 정해진 뒤 새 작업으로 시작한다.
```
