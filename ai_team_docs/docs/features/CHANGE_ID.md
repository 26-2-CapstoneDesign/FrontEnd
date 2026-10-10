# 아이디 변경 (CHANGE_ID)

```yaml
schema_version: 3.1.0
template: false
record_type: feature
summary_ko: 아이디 변경 화면(ChangeId.jsx·ChangeId.css, 개발 서버 전용 경로 /change-id)을 구현했고 IMPLEMENTING 상태다. 새 아이디가 기존 아이디와 같으면 "기존 아이디와 동일합니다.", 30자를 넘으면 "사용할 수 없는 아이디입니다."를 표시하고 입력은 최대 30자다. 이메일을 입력하고 "인증번호 발송"을 누르면 형식을 검사하며, 인증번호는 mock 값과 비교해 확인한다. 이메일 인증·아이디 변경 API는 명세에 없어 sendVerificationCode·changeLoginId 함수 구조만 있고 요청은 보내지 않는다(API 연결 준비). 완료 클릭 시 아이디 변경 API의 성공 응답(response.ok)이 있을 때만 홈("/")으로 이동하며, 현재는 응답이 없어 "아이디 변경 서버가 아직 연결되지 않았습니다." 안내를 표시하고 이동하지 않는다. 기존 아이디·인증번호는 mock 값이다. 완료 기준 9개가 승인되었고 6개를 충족했다. 아이디 변경 기능 전체는 완료가 아니다.
feature_id: CHANGE_ID
name: 아이디 변경
human_owner: null
actor_id: jb
participants:
- jb
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-05T10:25Z: 첨부 UI 시안 기준 아이디 변경 화면 구현(mock, API·fetch 금지)'
- '사용자 답변(AskQuestion, 2026-10-05T10:30Z 무렵): dev_only - App.jsx에 import.meta.env.DEV 조건으로 /change-id 라우트 추가'
- 'EXPLICIT_REQUEST@2026-10-06T03:49Z~04:05Z: 새 아이디 검증, 이메일 입력, 클릭 시 이메일 형식 검증, API 호출 함수 구조 요청 5건(change-id-001 E005)'
- 'EXPLICIT_REQUEST@2026-10-06T04:50Z: 아이디 변경 기능 목록 등록(기능명·범위 항목 제공, 코드 수정 금지)'
- 'EXPLICIT_REQUEST@2026-10-06T04:57Z: 완료도 API 성공 시에만 홈 이동하도록 변경, CHANGE_ID-AC-01~09 승인(change-id-001 E008)'
updated_at: '2026-10-06T04:59:20Z'
source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
feature_file: docs/features/CHANGE_ID.md
latest_worklog: docs/worklogs/change-id-001__jb__20261005T103215Z.md
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
acceptance_passed: 6
acceptance_total: 9
verification_status: PARTIAL
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
missing_reasons:
  human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음(CURRENT_STATE.md의 human_owner=null).
  approval_refs: 승인 근거는 현재 대화의 사용자 요청이며 DECISIONS.md에는 등록하지 않았다(수정 금지 파일).
not_applicable_reasons: {}
goal: 로그인한 사용자가 이메일 인증을 거쳐 아이디를 바꿀 수 있는 화면과 기능을 제공한다. 현재 범위는 화면, 프론트엔드 검증, API 호출 함수 구조(API 연결 준비)까지이며 실제 이메일 인증·아이디 변경 API는 명세가 없어 연결하지 않았다.
scope:
- '화면: 제목 "아이디 변경", 새 아이디 입력, 이메일 입력(placeholder "이메일을 입력해주세요.")과 "인증번호 발송" 버튼, 인증번호 입력과 "확인" 버튼, "완료" 버튼. 스타일은 styles/ChangeId.css'
- '새 아이디: 앞뒤 공백을 뺀 값이 기존 아이디(mock "youthguide")와 같으면 "기존 아이디와 동일합니다.", 30자를 넘으면 "사용할 수 없는 아이디입니다."(빨간색, 기존 아이디 검사 우선, 실시간). 입력창 maxLength 30'
- '이메일: "인증번호 발송" 클릭 시에만 형식 검사. 빈 값·형식 오류면 "이메일 형식이 올바르지 않습니다."(빨간색)를 표시하고 발송 상태로 바꾸지 않는다. 입력을 바꾸면 문구를 지운다'
- '인증번호: 발송 전이거나 입력이 비어 있으면 확인 버튼 비활성. mock 인증번호("123456")와 같으면 "인증 되었습니다."(초록색), 다르면 "인증번호를 확인해 주세요."(빨간색)와 입력창 빨간 테두리'
- '완료: 새 아이디가 비어 있지 않고 오류가 없으며 인증 완료일 때만 활성. 클릭 시 changeLoginId를 호출하고, response.ok일 때만 navigate("/"). 요청 중에는 완료 버튼 비활성'
- 'API 연결 준비: sendVerificationCode(email), changeLoginId({ newUserId, email, verificationCode, isCodeVerified }) 빈 함수. URL·요청 필드·응답 구조·인증 방식은 만들지 않았다. 응답이 없으면 "아이디 변경 서버가 아직 연결되지 않았습니다."(회색), ok가 아니거나 예외면 "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요."(빨간색)'
excluded_scope:
- 실제 이메일 인증번호 발송·확인 API 요청, 아이디 변경 API 요청(명세 없음)
- 현재 회원 아이디·이메일 조회(API 없음, mock 값 사용)
- 토큰·쿠키·세션 등 인증 처리, localStorage 사용
- 운영 빌드 경로 등록(개발 서버 전용 /change-id)
dependency_refs:
- 'youth_guide/src/App.jsx의 {import.meta.env.DEV && <Route path="/change-id" element={<ChangeId />} />}'
- youth_guide/src/components/Layout.jsx의 Outlet(기존 레이아웃, 수정하지 않음)
- youth_guide/src/pages/Home.jsx(완료 후 이동 대상 "/")
unknowns:
- '이메일 인증번호 발송·확인 API: 명세에 없음(UNDECIDED). URL·method·요청·응답·상태 코드·오류 코드 필요'
- '아이디 변경 API: 명세에 없음(UNDECIDED). 성공 응답 구조와 실패 상태 코드(이미 사용 중인 아이디, 인증 미완료 등) 필요'
- '현재 회원 아이디·이메일 조회 API: 명세에 없음(UNDECIDED)'
- '인증 방식(token/cookie/session)과 백엔드 주소·접근 방식: UNDECIDED - 보류(백엔드 구축 후 결정)'
- '아이디 형식 규칙(30자 외): UNDECIDED - 임의 규칙 추가 금지(2026-10-06T03:53Z 사용자 지시)'
- '아이디 변경 실패 상태 코드별 문구(이미 사용 중인 아이디, 인증 미완료 등): UNDECIDED(명세 확정 후 연결, 현재는 공통 실패 문구)'
- '이메일을 바꿨을 때 발송·인증 상태 초기화 여부: UNDECIDED(현재는 초기화하지 않음)'
- '시안·요청 문구 차이(인증번호 오류 문구, "인증 되었습니다." 띄어쓰기)와 발송 후 안내 문구 유무: UNDECIDED(change-id-001 E004)'
acceptance_definition_status: APPROVED
acceptance_approval_refs:
- 'EXPLICIT_REQUEST@2026-10-06T04:57Z: 현재 대화의 사용자 요청(CHANGE_ID-AC-01~09 초안 승인). 같은 요청의 이동 조건 변경(API 성공 시에만 홈 이동)에 맞춰 AC-08 조건을 고쳐 반영(change-id-001 E008)'
acceptance_criteria:
- ac_id: CHANGE_ID-AC-01
  condition: 새 아이디에 기존 아이디(mock "youthguide")를 입력
  expected: '"기존 아이디와 동일합니다."가 빨간색으로 표시되고, 다른 값으로 바꾸면 사라진다.'
  status: MET
  evidence_refs: ['docs/worklogs/change-id-001__jb__20261005T103215Z.md#E005 브라우저 입력 결과(youthguide 오류, newyouth 문구 없음)']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_ID-AC-02
  condition: 새 아이디 입력창 속성과 30자 초과 값
  expected: 'maxLength가 30이고, 30자를 넘는 값이면 "사용할 수 없는 아이디입니다."를 표시한다.'
  status: MET
  evidence_refs: ['ChangeId.jsx maxLength={ID_MAX_LENGTH}(30)', 'E005 스크립트로 31자 입력 시 문구 표시(maxLength 우회 입력)']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_ID-AC-03
  condition: 실제 키보드로 31자 이상 입력
  expected: 30자를 넘는 입력이 들어가지 않는다.
  status: UNVERIFIED
  evidence_refs: ['스크립트 입력은 maxLength를 우회하므로 미확인']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_ID-AC-04
  condition: 이메일을 입력하고 "인증번호 발송" 클릭
  expected: '빈 값·형식 오류면 "이메일 형식이 올바르지 않습니다."를 표시하고 발송 상태로 바꾸지 않는다. 입력 중에는 문구가 없다. 형식이 맞으면 오류 없이 확인 버튼을 쓸 수 있다.'
  status: MET
  evidence_refs: ['docs/worklogs/change-id-001__jb__20261005T103215Z.md#E005 빈칸·abc·abc@gmail 오류, abc 입력 중 문구 없음, abc@gmail.com 확인 버튼 활성']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_ID-AC-05
  condition: 발송 후 인증번호 입력과 확인 클릭
  expected: '일치하면 "인증 되었습니다."(초록색), 다르면 "인증번호를 확인해 주세요."(빨간색)와 입력창 빨간 테두리. 발송 전·빈 입력이면 확인 버튼 비활성.'
  status: MET
  evidence_refs: ['docs/worklogs/change-id-001__jb__20261005T103215Z.md#E003 불일치·일치 문구와 발송 전 확인 버튼 비활성(handleVerifyCode는 이후 변경 없음)', 'E009: 111111 불일치 후 123456 일치 시 "인증 되었습니다." 초록색(rgb(26, 155, 75))', '실제 인증번호가 아닌 mock 값("123456") 비교']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_ID-AC-06
  condition: 새 아이디·인증 상태에 따른 완료 버튼
  expected: 새 아이디가 비어 있지 않고 오류가 없으며 인증 완료일 때만 완료 버튼이 활성화된다.
  status: MET
  evidence_refs: ['docs/worklogs/change-id-001__jb__20261005T103215Z.md#E009 완료 비활성: 아이디만 입력·인증 불일치·기존 아이디(youthguide)일 때 true, 인증 후·아이디 복귀 시 false']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_ID-AC-07
  condition: 인증 완료 후 완료 클릭
  expected: 아이디 변경 API로 변경을 요청한다.
  status: UNVERIFIED
  evidence_refs: ['아이디 변경 API가 명세에 없어 changeLoginId는 요청 없는 빈 함수다(API 연결 준비). 현재 검증 불가']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_ID-AC-08
  condition: 아이디 변경 API 성공
  expected: 홈("/")으로 이동한다. 성공 응답이 없으면 이동하지 않는다.
  status: UNVERIFIED
  evidence_refs: ['아이디 변경 API가 명세·백엔드에 없어 성공 경로를 실행할 수 없다(현재 검증 불가). 코드상 response.ok일 때만 navigate("/")', 'E009: 응답 없음 → 서버 미연결 안내, 경로 /change-id 유지(성공 경로가 아니라 기준 충족 근거로 세지 않음)']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_ID-AC-09
  condition: API 연결 준비 구조
  expected: 'sendVerificationCode·changeLoginId 함수에 화면 값이 전달되고, 명세에 없는 URL·요청 필드·응답 구조·인증 방식·fetch가 없다.'
  status: MET
  evidence_refs: ['E009(handleSubmit 변경 후) lint·build 통과, fetch·axios·/api·storage·env 검색 결과 없음, 브라우저 fetch·XHR 0건', '인자 전달은 코드 확인만(브라우저 디버거 확인은 도구 거부로 생략)']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
components:
- path: youth_guide/src/pages/ChangeId.jsx
  symbol: 'ChangeId / NEW_ID_MESSAGES / getNewUserIdError / isValidEmail / handleSendVerificationCode / handleVerifyCode / handleSubmit / FieldMessage'
  role: '화면·프론트엔드 검증: 새 아이디·이메일·인증번호 입력, 오류·성공 문구, 완료 활성 조건, 완료 결과 안내'
  implementation_status: IMPLEMENTING
  remaining_work:
  - CHANGE_ID-AC-03 실제 키보드 확인
  - E004 문구 판단
  task_refs: [change-id-001]
- path: youth_guide/src/styles/ChangeId.css
  symbol: .change-id-*
  role: 아이디 변경 화면 전용 스타일
  implementation_status: IMPLEMENTING
  remaining_work:
  - 시안과의 최종 비교는 사람 판단
  task_refs: [change-id-001]
- path: youth_guide/src/pages/ChangeId.jsx
  symbol: sendVerificationCode / changeLoginId / handleSubmit(response 처리)
  role: 'API 연결 준비: 이메일 인증번호 발송·아이디 변경 호출 함수 구조와 성공 시에만 홈 이동하는 처리(요청 없음)'
  implementation_status: IMPLEMENTING
  remaining_work:
  - API 명세 확정 후 요청·응답·오류 처리 구현
  task_refs: [change-id-001]
- path: youth_guide/src/pages/ChangeId.jsx
  symbol: '(미구현) 이메일 인증·아이디 변경·현재 회원 정보 API 요청'
  role: 실제 API 연동
  implementation_status: NOT_STARTED
  remaining_work:
  - 백엔드 API 명세·구현 대기
  task_refs: []
connections:
- from: {path: youth_guide/src/App.jsx, symbol: 'Route path="/change-id" (import.meta.env.DEV)'}
  to: {path: youth_guide/src/pages/ChangeId.jsx, symbol: ChangeId, external_boundary: null}
  payload: 없음(props 없음)
  contract_ref: 개발 서버 전용 라우트(2026-10-05 사용자 답변 dev_only)
  purpose: 개발 서버에서 /change-id로 화면을 연다.
  verification_evidence: ['docs/worklogs/change-id-001__jb__20261005T103215Z.md#E003']
- from: {path: youth_guide/src/pages/ChangeId.jsx, symbol: handleSendVerificationCode}
  to: {path: youth_guide/src/pages/ChangeId.jsx, symbol: sendVerificationCode, external_boundary: '없음(이메일 인증 API 명세 없음)'}
  payload: 'email(화면 상태 값)'
  contract_ref: null
  purpose: 형식이 맞는 이메일을 발송 함수로 넘긴다(요청 없음).
  verification_evidence: ['코드 확인(E005)']
- from: {path: youth_guide/src/pages/ChangeId.jsx, symbol: handleSubmit}
  to: {path: youth_guide/src/pages/ChangeId.jsx, symbol: changeLoginId, external_boundary: '없음(아이디 변경 API 명세 없음)'}
  payload: '{ newUserId, email, verificationCode, isCodeVerified }(화면 상태 값, API 필드 아님)'
  contract_ref: null
  purpose: 완료 시 화면 값을 아이디 변경 함수로 넘긴다(요청 없음).
  verification_evidence: ['코드 확인(E005)', 'E009 완료 클릭 시 서버 미연결 안내 표시(함수 호출 후 응답 없음)']
- from: {path: youth_guide/src/pages/ChangeId.jsx, symbol: 'handleSubmit navigate("/") (response.ok)'}
  to: {path: youth_guide/src/pages/Home.jsx, symbol: Home, external_boundary: null}
  payload: 없음(경로 이동)
  contract_ref: 기존 라우팅(App.jsx Route path="/")
  purpose: 아이디 변경 API 성공 시 홈으로 이동한다.
  verification_evidence: ['API 없음으로 미실행(현재 검증 불가)']
verified_flow: /change-id 접속 → 새 아이디 입력 시 기존 아이디 동일·30자 초과 문구 → 이메일 입력 후 발송 클릭 시 형식 검사(E005) → mock 인증번호 불일치·일치 → 조건에 따른 완료 버튼 활성 → 완료 클릭 시 changeLoginId 호출 후 응답 없음으로 서버 미연결 안내와 경로 유지까지 2026-10-06 브라우저에서 확인했다(E009). API 성공 후 홈 이동과 실제 API 흐름은 실행하지 못했다.
verification_scope: MOCK_ONLY
required_checks:
- npm run lint
- vite build
- 실제 키보드로 CHANGE_ID-AC-03 확인
- 실제 API 연동 후 AC-07·08 확인(API 명세·백엔드 확정 후)
check_evidence:
- 'lint·build: E008 변경 후 Found 0 warnings and 0 errors, 빌드 성공(E009)'
- '브라우저(E005): 새 아이디 문구, 클릭 시 이메일 형식 검사, 확인 버튼 활성, fetch·XHR 0건'
- '브라우저(E009): 인증번호 불일치·일치, 완료 활성 조건, 완료 시 서버 미연결 안내·경로 유지, fetch·XHR 0건(스크린샷 /tmp/change-id-api-disconnected.png)'
- '정적 확인(E009): fetch·axios·/api·localStorage·sessionStorage·env 사용 없음'
- '범위: 백엔드 없이 mock 값과 스크립트 입력으로 확인(실제 API 통신 없음, 실제 키보드 입력 없음)'
exception_coverage:
- 이메일이 비어 있거나 형식이 틀리면 발송 상태로 바꾸지 않고 sendVerificationCode를 부르지 않는다.
- 새 아이디 오류나 인증 미완료면 완료 버튼이 비활성이고 changeLoginId를 부르지 않는다.
- 인증번호 입력을 바꾸면 확인 결과를 초기화한다.
- 요청 중에는 완료 버튼을 비활성화해 중복 제출을 막는다.
- 응답이 없으면 서버 미연결 안내, response.ok가 아니거나 예외면 "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요."를 표시하고 홈으로 이동하지 않는다.
blockers:
- '이메일 인증·아이디 변경·현재 회원 정보 API가 명세에 없어 실제 연동 불가(백엔드 API 필요)'
- '문구 판단 대기(change-id-001 E004)'
resume_when:
- 사용자가 E004의 문구 판단을 알려줄 때
- 이메일 인증·아이디 변경 API 명세가 확정될 때
next_action: 사용자에게 변경·승인 반영 결과를 보고한다.
remaining_work:
- CHANGE_ID-AC-03 실제 키보드 확인
- 실제 API 연동(명세·백엔드 확정 후)과 실패 상태 코드별 문구 연결, AC-07·08 확인
- 사람 검토
completion_requires: {review_status: APPROVED, integration_status: null, deployment_status: null}
review_evidence: []
integration_evidence: []
deployment_evidence: []
completion_event_ref: null
limitations:
- 변경은 커밋되지 않은 로컬 작업 트리에만 있다(ChangeId.jsx·ChangeId.css 미추적, App.jsx 수정).
- /change-id는 개발 서버에서만 등록되고 운영 빌드에는 없다.
- 기존 아이디("youthguide")와 인증번호("123456")는 화면 확인용 mock 값이다.
- 아이디 변경 요청을 보내지 않으며, 완료 시 홈으로 이동하지 않는다(API 연결 준비 상태).
- 실행 모델 식별자는 확인하지 못했다.
handoff: youth_guide에서 npm run dev 실행 후 /change-id에서 확인한다. 인증번호는 mock 값 123456이다. 실제 연동은 이메일 인증·아이디 변경 API 명세가 확정된 뒤 sendVerificationCode·changeLoginId를 구현한다.
```
