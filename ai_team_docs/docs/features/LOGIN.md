# 로그인 (LOGIN)

```yaml
schema_version: 3.1.0
template: false
record_type: feature
summary_ko: 로그인 UI는 UI 코드 구현을 마쳤고 브라우저 검증을 기다리고 있어 IMPLEMENTING 상태다. 사용자 요청으로 로그인 버튼 옆에 회원가입 버튼(테두리형)을 두고, 클릭 시 /signup으로 이동하도록 구현했으며 이동은 브라우저에서 확인했다. 입력 반영·비밀번호 가림·메시지 영역 표시는 도구로 확인해 완료 기준 13개 중 8개가 충족됐고, 체크박스·hover·좁은 화면·21자 입력은 미확인이다. 로그인 API 연동은 API 명세 AUTH-01의 제안값(POST /api/v1/auth/login, loginName·password)으로 요청과 HTTP 상태 코드별 문구 표시를 구현했다(IMPLEMENTING, member-auth-api-001). 백엔드 미구축으로 실제 서버 응답은 현재 검증 불가이고, 백엔드 주소·proxy·환경변수 방식과 성공 응답·인증 전달 방식은 백엔드 구축 후 결정하도록 보류했다. 인증 정보 저장·로그인 후 이동은 구현하지 않았다. 로그인 기능 전체는 완료가 아니다.
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
- 'EXPLICIT_REQUEST@2026-09-30T12:55Z: 현재 대화의 사용자 요청 - 로그인 버튼 영역을 반으로 나눠 로그인·회원가입 버튼 배치(회원가입은 UI만)'
- 'EXPLICIT_REQUEST@2026-09-30T13:16Z: 현재 대화의 사용자 요청 - 회원가입 버튼 흰 배경·파란 테두리·글자, 두 버튼 크기·높이 동일'
- 'EXPLICIT_REQUEST@2026-10-01T04:42Z: 현재 대화의 사용자 요청 - 회원가입 버튼 클릭 시 회원가입 페이지로 이동'
- 'EXPLICIT_REQUEST@2026-10-01T06:40Z: 현재 대화의 사용자 요청 - 회원가입 관련 작업을 AI_RULES 기준으로 최종 정리, 구현과 문서 일치'
- 'EXPLICIT_REQUEST@2026-10-01T16:51Z: 현재 대화의 사용자 요청 - Login.jsx에 AUTH-01(POST /api/v1/auth/login, loginName·password) 요청 추가, 토큰·쿠키·세션·인증 상태 관리 금지, 성공 응답 구조 추측 금지'
- 'EXPLICIT_REQUEST(2026-10-01T16:51Z 이후 16:59:19Z 이전): 현재 대화의 사용자 답변 - 상대 경로 사용, 빈 값 검사 추가, 성공 시 안내 문구만 표시, 제안 오류 문구 사용, LOGIN-AC-05 문구 수정 승인(분모 유지)'
- 'EXPLICIT_REQUEST@2026-10-01T17:13Z: 현재 대화의 사용자 요청 - 백엔드 주소·Vite proxy·환경변수·인증 방식은 백엔드 구축 후 결정으로 보류, 임의 지정·구현 금지, 검증 불가 부분은 "현재 검증 불가"로 기록'
updated_at: '2026-10-01T17:13:46Z'
source_revision: b8a6a966a84cbebc431ddcd477ff41e4dfe5d012
feature_file: docs/features/LOGIN.md
latest_worklog: docs/worklogs/member-auth-api-001__jb__20261001T165919Z.md
implementation_status: IMPLEMENTING
work_status: BLOCKED
acceptance_passed: 8
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
goal: 사용자가 아이디와 비밀번호로 로그인할 수 있는 화면과 기능을 제공한다. 현재 범위는 로그인 UI와 AUTH-01 요청 전송·HTTP 상태 코드별 문구 표시이며, 성공 응답과 인증 전달 방식은 정해지지 않았다.
scope:
- '로그인 UI: 제목, 아이디 입력창, 비밀번호 입력창(가림, 최대 20자), 로그인 상태 유지 체크박스, 로그인 버튼, 아이디 찾기 버튼, 비밀번호 찾기 버튼, 안내·오류 메시지 영역'
- '로그인 UI: 아이디(공백만 입력 포함) 또는 비밀번호가 비어 있으면 요청 없이 "아이디와 비밀번호를 입력해 주세요." 표시(2026-10-01 사용자 결정)'
- '로그인 UI: 화면 중앙 배치, hover·focus 스타일, 작은 화면 대응, 스타일은 styles/Login.css에만 작성'
- '로그인 UI: 로그인 버튼과 같은 줄·같은 크기의 회원가입 버튼(흰 배경, 파란 테두리·글자). 클릭 시 /signup(회원가입 화면)으로 이동'
- '로그인 API 연동: 로그인 버튼 클릭 시 POST /api/v1/auth/login(AUTH-01, 상대 경로)에 Content-Type application/json, Body {loginName, password}를 보낸다. 2xx면 "로그인 요청이 처리되었습니다.", 400 "입력값을 다시 확인해 주세요.", 401 "아이디 또는 비밀번호가 올바르지 않습니다.", 429 "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.", 그 외 상태·연결 실패 "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요."를 표시한다. 응답 본문은 읽지 않는다.'
excluded_scope:
- 'accessToken·refreshToken·JWT·쿠키·세션 등 인증 정보 저장, localStorage·sessionStorage 인증 정보 저장, 로그인 상태 전역 관리, /me 호출, 자동 로그인, 로그아웃(AUTH-01 성공 응답·인증 전달 방식 미정)'
- 로그인 후 페이지 이동, 응답 본문 해석
- 로그인 상태 유지 체크박스 값을 요청에 포함(AUTH-01 Request Body에 없음)
- 아이디 찾기·비밀번호 찾기 기능과 페이지 이동(현재는 버튼 UI만)
dependency_refs:
- youth_guide/src/App.jsx의 Route path="/login"(기존 라우팅, 수정하지 않음)
- youth_guide/src/App.jsx의 Route path="/signup"(기존 라우팅, 회원가입 버튼 이동 대상, 수정하지 않음)
- youth_guide/src/components/Layout.jsx의 Outlet(기존 레이아웃, 수정하지 않음)
unknowns:
- '로그인 API 계약: API 명세 AUTH-01의 URL·Request 필드는 제안(PROPOSED)이고 백엔드 구현 상태는 NOT_IMPLEMENTED다(사용자 메시지 발췌, 저장소에 명세 문서 없음). 성공 응답 구조와 오류 응답 본문 구조: UNDECIDED - 보류(백엔드 구축 후 결정)'
- '인증 방식(token/cookie/session 등 인증 전달 방식): UNDECIDED - 보류(백엔드 구축 후 결정), 결정 전 구현 금지(2026-10-01T17:13Z 사용자 지시)'
- '백엔드 주소·Vite proxy·환경변수 방식: UNDECIDED - 보류(백엔드 구축 후 결정). 임의 주소·proxy·환경변수 추가 금지(2026-10-01T17:13Z 사용자 지시). 현재 코드는 명세 endpoint 상대 경로만 사용'
- '빈 값 검사 문구와 AUTH-01 상태 코드별 문구의 완료 기준 편입 여부: UNDECIDED(분모 변경은 사람 승인 필요, C21)'
- '로그인 관련 데이터 구조: UNDECIDED'
- '로그인 상태 유지 체크박스의 실제 동작(현재는 화면 상태만 관리): UNDECIDED - 보류(인증 방식이 백엔드에서 정해진 뒤 결정)'
- '로그인 성공 후 이동 경로: UNDECIDED - 보류(AUTH-01 성공 응답·인증 방식 결정 후). 요청에서 "로그인 성공 후 홈으로 이동하는 기능도 아직 구현하지 않음"으로만 언급됨'
- '로그인 실패 시 오류 메시지: HTTP 상태 코드(400·401·429) 기준 문구는 2026-10-01 사용자가 승인했다. 오류 응답 본문의 세부 오류 구분은 UNDECIDED'
- '아이디 찾기·비밀번호 찾기 기능: UNDECIDED'
- '로그인 API 연동의 완료 기준: LOGIN-AC-05 문구만 사용자 승인으로 AUTH-01 요청 기준으로 바꿨다. 그 밖의 API 연동 기준은 UNDECIDED'
- '회원가입 버튼 UI·이동의 완료 기준 편입 여부: UNDECIDED(분모 변경은 사람 승인 필요, C21)'
acceptance_definition_status: APPROVED
acceptance_approval_refs:
- 'EXPLICIT_REQUEST@2026-09-30T11:48Z: 현재 대화의 사용자 요청(로그인 화면 구성·기능·스타일)'
- 'EXPLICIT_REQUEST@2026-09-30T11:59Z: 현재 대화의 사용자 요청(비밀번호 최대 20자)'
- 'EXPLICIT_REQUEST(2026-10-01T16:51Z 이후 16:59:19Z 이전): 현재 대화의 사용자 답변(LOGIN-AC-05 문구 수정 승인, 분모 13 유지)'
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
  status: MET
  evidence_refs: ['E004 스냅샷에서 textbox "아이디" 표시 확인. 입력 동작은 E003 차단으로 미확인', 'docs/worklogs/member-auth-api-001__jb__20261001T165919Z.md#E002·E004 browser_fill로 "testuser" 입력 후 스냅샷 value "testuser", 로그인 요청 Body loginName에도 같은 값(실제 키보드 입력은 아님)']
  source_revision: b8a6a966a84cbebc431ddcd477ff41e4dfe5d012
- ac_id: LOGIN-AC-03
  condition: 비밀번호 입력창에 입력
  expected: 입력창이 보이고 입력 내용이 가려진다.
  status: MET
  evidence_refs: ['E004 스냅샷에서 textbox "비밀번호" 표시 확인. 코드상 type="password"', 'docs/worklogs/member-auth-api-001__jb__20261001T165919Z.md#E002·E004 browser_fill로 9자 입력 후 2026-10-01T17:00:41Z 스크린샷에서 점 9개로 가려짐']
  source_revision: b8a6a966a84cbebc431ddcd477ff41e4dfe5d012
- ac_id: LOGIN-AC-04
  condition: 로그인 상태 유지 체크박스 클릭
  expected: 체크 상태가 바뀐다.
  status: UNVERIFIED
  evidence_refs: ['E004 스냅샷에서 checkbox "로그인 상태 유지" 표시 확인. 토글 동작은 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-05
  condition: 아이디·비밀번호를 입력하고 로그인 버튼 클릭
  expected: 'POST /api/v1/auth/login에 Content-Type application/json, Body {loginName, password}로 요청하고, 응답 HTTP 상태에 맞는 문구(2xx·400·401·429·그 외/연결 실패)를 표시한다.'
  status: UNVERIFIED
  evidence_refs: ['문구 변경 전 기준("로그인 서버가 아직 연결되지 않았습니다." 표시)은 2026-10-01 사용자 승인으로 대체됨(member-auth-api-001 E001)', 'docs/worklogs/member-auth-api-001__jb__20261001T165919Z.md#E002 브라우저에서 요청 Method·URL·Content-Type·Body 확인, 응답은 Vite 개발 서버 404이며 "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요." 표시', '실제 백엔드 2xx·400·401·429 응답은 백엔드 NOT_IMPLEMENTED로 미확인']
  source_revision: b8a6a966a84cbebc431ddcd477ff41e4dfe5d012
- ac_id: LOGIN-AC-06
  condition: /login 화면 표시
  expected: 아이디 찾기·비밀번호 찾기 버튼이 보인다(기능·이동 없음).
  status: MET
  evidence_refs: ['E004 스냅샷 button "아이디 찾기"·"비밀번호 찾기"', 'Login.jsx에서 type="button", onClick 없음']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-07
  condition: 안내·오류 메시지 발생
  expected: 메시지가 지정된 영역에 표시된다.
  status: MET
  evidence_refs: ['코드상 p.login-message(role="status") 존재', 'docs/worklogs/member-auth-api-001__jb__20261001T165919Z.md#E002·E004 빈 값 클릭 시 status 영역에 "아이디와 비밀번호를 입력해 주세요.", 404 응답 후 같은 영역(스크린샷의 분홍 메시지 상자)에 "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요." 표시']
  source_revision: b8a6a966a84cbebc431ddcd477ff41e4dfe5d012
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
  evidence_refs: ['E009 rg 결과 Login.jsx 44행 maxLength={20}(현재 46행)']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
- ac_id: LOGIN-AC-16
  condition: 비밀번호를 21자 이상 입력
  expected: 20자를 넘는 입력이 들어가지 않는다.
  status: UNVERIFIED
  evidence_refs: ['브라우저 동작은 미확인']
  source_revision: f7ebd19a9ac4c291ce3897bb4306f8206b83f47c
components:
- path: youth_guide/src/pages/Login.jsx
  symbol: Login / handleSubmit / navigate("/signup")
  role: '로그인 UI: 화면 구성, 입력 상태 관리, 빈 값 검사, 안내·오류 메시지, 회원가입 화면 이동'
  implementation_status: IMPLEMENTING
  remaining_work:
  - LOGIN-AC-04·16 브라우저 확인
  - LOGIN-AC-05 실제 서버 응답 확인(현재 검증 불가, 백엔드 구축 후)
  task_refs: [login-feature-001]
- path: youth_guide/src/styles/Login.css
  symbol: .login-page / .login-card / .login-input / .login-keep-checkbox / .login-message / .login-submit / .login-find-button
  role: '로그인 UI: 로그인 화면 전용 스타일'
  implementation_status: IMPLEMENTING
  remaining_work:
  - LOGIN-AC-10·11 브라우저 확인
  task_refs: [login-feature-001]
- path: youth_guide/src/pages/Login.jsx
  symbol: handleSubmit / fetch("/api/v1/auth/login") / LOGIN_ERROR_MESSAGES / isSubmitting
  role: '로그인 API 연동: AUTH-01 요청 전송과 HTTP 상태 코드별 문구 표시'
  implementation_status: IMPLEMENTING
  remaining_work:
  - 실제 백엔드 응답 확인(현재 검증 불가, 보류)
  - 백엔드 주소·Vite proxy·환경변수 방식(보류, 백엔드 구축 후 결정)
  - AUTH-01 성공 응답·인증 전달 방식 결정 후 인증 정보 처리·로그인 후 이동(보류, 백엔드 구축 후 결정)
  task_refs: [member-auth-api-001]
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
- from: {path: youth_guide/src/pages/Login.jsx, symbol: 'button.login-signup onClick navigate("/signup")'}
  to: {path: youth_guide/src/pages/SignUp.jsx, symbol: SignUp, external_boundary: null}
  payload: 없음(경로 이동)
  contract_ref: 기존 라우팅(App.jsx Route path="/signup")
  purpose: 로그인 화면에서 회원가입 화면으로 이동한다.
  verification_evidence: ['docs/worklogs/login-feature-001__jb__20260930T121505Z.md#E029 클릭 후 /signup 이동·회원가입 제목 표시']
- from: {path: youth_guide/src/pages/Login.jsx, symbol: handleSubmit}
  to: {path: null, symbol: null, external_boundary: 'HTTP POST /api/v1/auth/login (상대 경로, 백엔드 주소는 백엔드 구축 후 결정)'}
  payload: 'Content-Type application/json, Body {"loginName": string, "password": string}'
  contract_ref: 'API 명세 AUTH-01(사용자 메시지 발췌, URL·필드 PROPOSED, 백엔드 NOT_IMPLEMENTED)'
  purpose: 로그인 요청을 보내고 응답 HTTP 상태 코드로 문구를 정한다. 응답 본문은 읽지 않는다.
  verification_evidence: ['docs/worklogs/member-auth-api-001__jb__20261001T165919Z.md#E002 요청 Method·URL·헤더·Body 확인, 응답은 Vite 개발 서버 404(실제 백엔드 응답 아님)']
verified_flow: /login 접속 → Login 렌더링 → Login.css 적용 → 제목·입력창·체크박스·버튼 표시까지 확인했고, 회원가입 버튼 클릭 → /signup 이동을 확인했다. 빈 값으로 로그인 버튼 클릭 → 요청 없이 빈 값 문구 표시, 값 입력 후 클릭 → POST /api/v1/auth/login 요청 전송(Body loginName·password) → Vite 개발 서버 404 → 일반 오류 문구 표시까지 브라우저에서 확인했다(member-auth-api-001 E002). 실제 백엔드 응답 흐름은 확인하지 않았다.
verification_scope: MIXED
required_checks:
- npm run lint
- vite build
- 브라우저에서 LOGIN-AC-04·10·11·16 확인(AC-02·03·07은 member-auth-api-001 E002·E004에서 확인)
- 실제 백엔드와 AUTH-01 응답(2xx·400·401·429) 확인
check_evidence:
- 'npm run lint: 진단 없음, EXIT=0 (worklog E009)'
- 'vite build: 성공, /tmp 출력 (worklog E004)'
- '브라우저 화면 표시: 접근성 스냅샷·스크린샷으로 요소 존재와 중앙 배치 확인 (worklog E004)'
- '브라우저 상호작용: 입력·체크박스·로그인 버튼은 도구 차단으로 미실행 (worklog E003·E017)'
- '회원가입 버튼 이동: 5202 개발 서버에서 로그인 폼의 회원가입 버튼 클릭 시 /signup 이동 확인 (worklog E029)'
- 'lint·build(member-auth-api-001): 진단 없음 LINT_EXIT=0, vite build 성공 (worklog member-auth-api-001 E002)'
- 'API 요청(member-auth-api-001): 빈 값이면 요청 없음, 값 입력 시 POST /api/v1/auth/login·Content-Type application/json·Body {"loginName","password"} 전송 확인. 응답은 Vite 개발 서버 404이고 실제 백엔드 통신은 현재 검증 불가. localStorage·sessionStorage·cookie 비어 있음 (worklog member-auth-api-001 E002)'
- '브라우저 입력·메시지(member-auth-api-001): browser_fill 입력 반영, 비밀번호 가림, 메시지 영역 표시 확인으로 LOGIN-AC-02·03·07 MET (worklog member-auth-api-001 E002·E004)'
- '코드 검색(member-auth-api-001): 서버 주소·환경변수·proxy·인증 정보 저장 코드 없음, fetch는 명세 endpoint 1개(/api/v1/auth/login) (worklog member-auth-api-001 E004)'
exception_coverage:
- 아이디(공백만 입력 포함) 또는 비밀번호가 비어 있으면 요청하지 않고 "아이디와 비밀번호를 입력해 주세요."를 표시한다.
- 400·401·429는 상태별 문구, 그 밖의 상태 코드와 네트워크 오류는 "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요."를 표시한다.
- 요청 중에는 로그인 버튼을 비활성화해 중복 요청을 막는다.
blockers:
- '로그인 UI: 브라우저 상호작용 검증이 도구에서 거부됨(worklog E003, ENVIRONMENT_FAILURE). 이후 member-auth-api-001 E002에서 입력·클릭은 도구로 확인됨. LOGIN-AC-04·10·11·16은 미확인'
- '로그인 API 연동: 보류(백엔드 구축 후 결정) - 백엔드 미구축으로 실제 응답 현재 검증 불가, 백엔드 주소·Vite proxy·환경변수 방식과 AUTH-01 성공 응답·인증 전달 방식 미정(member-auth-api-001 E004 STOP)'
resume_when:
- 사용자가 브라우저에서 LOGIN-AC-04·10·11·16을 직접 확인한 결과를 알려줄 때
- 백엔드 AUTH-01이 구축되고 접근 방식(주소·proxy·환경변수)이 정해질 때
- AUTH-01 성공 응답·인증 전달 방식이 백엔드에서 정해질 때
next_action: 사용자 확인을 받는다. 백엔드 의존 항목은 백엔드 구축 전까지 보류한다.
remaining_work:
- 로그인 UI 브라우저 확인(LOGIN-AC-04·10·11·16)과 사람 검토
- '로그인 API 연동(보류, 백엔드 구축 후): 실제 백엔드 응답 확인, 성공 응답·인증 전달 방식에 따른 후속 처리'
completion_requires: {review_status: APPROVED, integration_status: null, deployment_status: null}
review_evidence: []
integration_evidence: []
deployment_evidence: []
completion_event_ref: null
limitations:
- 변경은 커밋되지 않은 로컬 작업 트리에만 있다.
- LOGIN-AC-05는 2026-10-01 사용자 승인으로 AUTH-01 요청 기준으로 문구가 바뀌었다(member-auth-api-001).
- AUTH-01 요청은 명세 endpoint 상대 경로만 사용하며, 백엔드 구축 전에는 개발 서버에서 404가 난다(현재 검증 불가).
- 로그인 성공(2xx) 시 안내 문구만 표시하며 인증 정보 저장·로그인 상태 유지·이동은 하지 않는다.
- 실행 모델 식별자는 확인하지 못했다.
handoff: 로그인 UI 확인은 youth_guide에서 npm run dev 실행 후 /login에서 입력·체크박스·로그인 버튼·21자 입력을 직접 조작해 진행한다. AUTH-01 실제 응답 확인은 백엔드 구축과 접근 방식 결정 후 진행한다(보류).
```
