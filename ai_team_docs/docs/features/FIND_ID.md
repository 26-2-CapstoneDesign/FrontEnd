# 아이디 찾기 (FIND_ID)

```yaml
schema_version: 3.1.0
template: false
record_type: feature
summary_ko: 아이디 찾기 입력 화면(/find-id)과 완료 화면(/find-id/complete)을 두었고 IMPLEMENTING 상태다. 완료 화면은 확인된 아이디 문자열이 전달된 경우에만 그 아이디를 보여 준다. 가입 확인·인증번호 발송·인증번호 검증·아이디 조회는 저장소와 기존 명세(MEM-01·AUTH-01)에 계약이 없어 요청을 보내지 않는다. 호출 함수는 null을 반환하고, 요청 중 중복 호출 방지와 통신 예외 처리만 두었다. 입력 화면에서는 완료 화면으로 이동하지 않는다. 완료 기준은 사람 승인 전이며 기능 전체는 완료가 아니다.
feature_id: FIND_ID
name: 아이디 찾기
human_owner: null
actor_id: jb
participants:
- jb
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-09T15:41Z: 첨부 UI·요청 문장 기준 아이디 찾기 페이지 구현, 로그인 화면 아이디 찾기 버튼 연결, API 명세 없는 계약 임의 생성 금지, 결과 화면이 없으면 만들지 말 것'
- 'EXPLICIT_REQUEST@2026-10-09T15:48Z: 첨부 이미지 2장(입력 화면, 결과 화면)을 UI 기준으로 사용. 결과 화면의 chungnyeon은 디자인 예시이며 조회 결과로 하드코딩하지 않음. 비밀번호 찾기 페이지는 만들지 않음'
- 'EXPLICIT_REQUEST@2026-10-09T16:44Z: 아이디 찾기 완료 화면을 첨부 이미지처럼 별도 페이지로 구현. 아이디는 API 결과만 표시. 임의 아이디·API 추측 금지. 비밀번호 찾기는 /find-password, 로그인 하기는 /login'
- 'EXPLICIT_REQUEST@2026-10-10T13:58Z: 아이디 찾기·비밀번호 찾기를 실제 API와 연결할 수 있게 정리. 계약이 없으면 URL·필드·가짜 성공 금지. 브라우저 호출·commit·push 금지'
updated_at: '2026-10-10T14:00:51Z'
source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
feature_file: docs/features/FIND_ID.md
latest_worklog: docs/worklogs/find-id-001__jb__20261009T154640Z.md
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
acceptance_passed: null
acceptance_total: null
verification_status: PARTIAL
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
missing_reasons:
  human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음(CURRENT_STATE.md의 human_owner=null).
  acceptance_passed: 아래 기준은 작업자가 요청 문장과 첨부 이미지로 정리한 초안이며 사람 승인 전이라 진행도를 세지 않는다(C21).
  acceptance_total: 기능 명세서 이미지(세 번째 첨부)는 확인하지 못했다. 초안 분모는 사람 승인 전이다(C21).
not_applicable_reasons: {}
goal: 가입 정보로 아이디를 찾는 화면을 제공한다. 현재 범위는 화면, 프론트엔드 이메일 형식 검사, API 호출 함수 구조(API 연결 준비), 로그인 화면에서의 이동까지다. 실제 가입 확인·인증·아이디 조회는 명세가 없어 연결하지 않았다.
scope:
- '화면: 제목 "아이디 찾기", 설명 "가입 시 등록한 정보로 아이디를 찾을 수 있어요", 이름·이메일·인증번호 입력, "인증번호 받기"·"확인" 테두리 버튼, "아이디 찾기" 버튼. 인증번호 라벨은 파란색 밑줄. 스타일은 styles/FindId.css. 상단은 기존 Layout 네비게이션만 사용'
- '이름: 입력 state만 관리한다. 형식 제한은 없다. 이름이 비어 있으면 아이디 찾기 버튼을 활성화하지 않는다'
- '이메일: 입력 중에는 오류를 표시하지 않는다. "인증번호 받기" 클릭 시 형식을 검사하고, 틀리면 "이메일 형식이 올바르지 않습니다."(빨간색, 회원가입과 같은 문구). 입력을 바꾸면 이메일 확인·인증 상태를 초기화한다'
- '가입 확인·발송 성공 문구: "가입되지 않은 이메일입니다."(빨간색)는 명세 문구로 준비만 했다. 가입 확인 초록색 문장은 첨부 입력 화면에 없어 만들지 않았다. API 응답이 없으면 "이메일 확인 서버가 아직 연결되지 않았습니다."를 표시하고 가입·발송 성공으로 처리하지 않는다'
- '인증번호: 발송 성공 전에는 입력과 확인 버튼이 비활성이다. 남은 시간 표시 자리는 입력 안쪽에 두었고, 발송 성공과 시간 값이 있을 때만 동작한다. 시간 길이는 명세에 없어 정하지 않았다'
- '인증 문구: 불일치 "인증번호가 일치하지 않습니다."(빨간색), 성공 "인증에 성공하였습니다."(초록색)는 준비만 했다. 응답이 없으면 "인증 서버가 아직 연결되지 않았습니다."를 표시하고 성공으로 처리하지 않는다'
- '아이디 찾기 버튼: 이름 입력, 가입 이메일 확인, 인증 성공이 모두 있을 때만 활성. 클릭 시 findLoginId를 호출한다. 반환값이 비어 있지 않은 문자열일 때만 /find-id/complete로 state.loginId를 넘긴다. 응답 필드 이름은 만들지 않는다'
- '완료 화면: FindIdComplete.jsx·FindIdComplete.css, /find-id/complete. 체크 아이콘, "회원님의 아이디입니다.", 전달된 아이디, 안내 문구, "비밀번호 찾기"(/find-password), "로그인 하기"(/login). 아이디 문자열이 없으면 "조회된 아이디가 없습니다." 개발 서버에서만 ?preview=layout일 때 예시 아이디를 보여주고 "테스트용 표시이며 실제 조회 결과가 아닙니다."를 함께 표시한다'
- '라우트: App.jsx Route path="/find-id"와 "/find-id/complete". /change-id와 다르다. 로그인 화면 아이디 찾기 버튼은 navigate("/find-id")'
excluded_scope:
- 이메일 가입 확인·인증번호 발송·인증번호 확인·아이디 조회 API 요청(명세 없음)
- URL·요청 필드·응답 필드·인증 방식·백엔드 주소의 임의 생성
- 가짜 성공, 가짜 아이디, mock 인증번호
- '비밀번호 찾기 페이지 구현(FIND_PASSWORD, /find-password). 이 기능의 후속 작업에서 그 파일을 삭제하지 않는다'
- 로그인 화면 디자인, 비밀번호 찾기 버튼 동작, SignUp·FirstLogin·ChangeId·ChangePassword
dependency_refs:
- youth_guide/src/App.jsx의 Route path="/find-id"
- youth_guide/src/pages/Login.jsx의 아이디 찾기 버튼 navigate("/find-id")
- youth_guide/src/components/Layout.jsx의 Outlet(기존 레이아웃, 수정하지 않음)
- youth_guide/src/pages/Login.jsx(결과 화면 "로그인 하기"의 이동 대상, 이 버튼 외에는 수정하지 않음)
unknowns:
- '이메일 가입 확인·인증번호 발송·인증번호 확인·아이디 조회 API: 명세에 없음(UNDECIDED). URL·method·요청·응답·상태 코드 필요'
- '가입된 이메일의 초록색 문구: 요청은 "확인 상태를 초록색으로 표시"라고만 하고, 첨부 입력 화면에는 해당 문장이 없다(UNDECIDED)'
- '인증 남은 시간(초): 첨부 입력 화면에는 타이머가 없고, 요청 문장에도 길이가 없다(UNDECIDED). 임의 시간을 넣지 않았다'
- '아이디 조회 성공 시 아이디 필드 이름: UNDECIDED. 정해지기 전에는 결과 화면으로 넘기지 않는다'
- '아이디 조회 성공 응답의 아이디 필드 이름은 여전히 UNDECIDED다. 프론트 전달 키 state.loginId는 화면 간 전달용이며 API 필드 이름이 아니다'
- '기능 명세서 이미지(세 번째 첨부): 확인하지 못함. 이 문서의 동작은 요청 문장과 UI 이미지 2장만 기준으로 했다'
- 'placeholder: 첨부 이미지는 값이 채워져 있어 placeholder가 보이지 않는다. 다른 화면과 같은 "입력해주세요." 문구를 썼다'
acceptance_definition_status: UNVERIFIED
acceptance_approval_refs: []
acceptance_criteria:
- ac_id: FIND_ID-AC-01
  condition: /find-id 화면 표시
  expected: 제목, 설명, 이름·이메일·인증번호 입력, 인증번호 받기·확인, 아이디 찾기 버튼이 보이고 인증번호 라벨이 파란색 밑줄이다.
  status: MET
  evidence_refs: ['docs/worklogs/find-id-001__jb__20261009T154640Z.md#E003 스냅샷·스크린샷 /tmp/find-id-form.png, 라벨 rgb(21, 32, 166)·underline']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: FIND_ID-AC-02
  condition: 이름·가입 확인·인증이 끝나기 전
  expected: 아이디 찾기 버튼이 비활성이다.
  status: MET
  evidence_refs: ['E003 초기·이름 입력·형식 맞는 이메일 발송 클릭 후에도 disabled true']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: FIND_ID-AC-03
  condition: 이메일 입력 중과 인증번호 받기 클릭
  expected: 입력 중에는 오류가 없고, 형식이 틀리면 "이메일 형식이 올바르지 않습니다."를 표시한다.
  status: MET
  evidence_refs: ['E003 abc 입력 중 문구 없음, 클릭 시 is-error, abc@gmail.com 입력 후 문구 초기화']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: FIND_ID-AC-04
  condition: 가입되지 않은 이메일
  expected: '"가입되지 않은 이메일입니다."를 빨간색으로 표시한다.'
  status: UNVERIFIED
  evidence_refs: ['가입 확인 API가 명세에 없어 현재 검증 불가. 문구 상수는 있고 지금은 표시하지 않는다']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: FIND_ID-AC-05
  condition: 가입된 이메일로 인증번호 발송 성공
  expected: 확인 상태를 초록색으로 표시하고, 인증번호 입력과 남은 시간을 활성화한다.
  status: UNVERIFIED
  evidence_refs: ['발송 API·남은 시간 값이 명세에 없어 성공으로 처리하지 않는다. E003 형식 맞는 이메일 클릭 후 코드 입력 disabled, 타이머 없음, 서버 미연결 안내']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: FIND_ID-AC-06
  condition: 인증번호 확인
  expected: '불일치면 "인증번호가 일치하지 않습니다."(빨간색), 일치면 "인증에 성공하였습니다."(초록색).'
  status: UNVERIFIED
  evidence_refs: ['인증 API가 명세에 없고 발송 성공 전이라 확인 버튼이 비활성이다(E003). 문구 상수는 있다']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: FIND_ID-AC-07
  condition: 아이디 조회 성공
  expected: 조회된 아이디 문자열이 있을 때만 /find-id/complete에 그 아이디를 보여 준다. 로그인 하기는 /login, 비밀번호 찾기는 /find-password. 예시 아이디를 실제 결과로 하드코딩하지 않는다.
  status: UNVERIFIED
  evidence_refs: ['아이디 조회 API가 아이디 문자열을 반환하지 않아 입력 화면에서는 완료 화면으로 이동하지 않는다. 전달된 문자열 표시와 버튼 이동은 E007']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: FIND_ID-AC-08
  condition: 로그인 화면의 아이디 찾기 버튼
  expected: /find-id로 이동한다. 로그인 화면의 비밀번호 찾기 이동은 FIND_PASSWORD 범위다.
  status: MET
  evidence_refs: ['E003 아이디 찾기 클릭 후 /find-id', '비밀번호 찾기 클릭 후 /login에 머물렀다는 관찰은 이후 /find-password 연결로 현재 동작과 같지 않다(find-password-001)']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
components:
- path: youth_guide/src/pages/FindId.jsx
  symbol: FindId
  role: 아이디 찾기 입력 화면, 프론트엔드 이메일 형식 검사, API 미연결 안내
  implementation_status: IMPLEMENTING
  remaining_work:
  - API 명세 확정 후 가입 확인·인증·조회 연결
  - 완료 기준 사람 승인
  task_refs: [find-id-001]
- path: youth_guide/src/pages/FindIdComplete.jsx
  symbol: FindIdComplete
  role: 아이디 찾기 완료 화면. 전달된 아이디 문자열만 표시
  implementation_status: IMPLEMENTING
  remaining_work:
  - 실제 조회 API가 아이디 문자열을 반환한 뒤의 이동 확인
  task_refs: [find-id-001]
- path: youth_guide/src/styles/FindIdComplete.css
  symbol: .find-id-complete-*
  role: 아이디 찾기 완료 화면 스타일
  implementation_status: IMPLEMENTING
  remaining_work:
  - 첨부 이미지와의 최종 비교는 사람 판단
  task_refs: [find-id-001]
- path: youth_guide/src/styles/FindId.css
  symbol: .find-id-*
  role: 아이디 찾기 입력 화면 스타일
  implementation_status: IMPLEMENTING
  remaining_work:
  - 첨부 이미지와의 최종 비교는 사람 판단
  task_refs: [find-id-001]
- path: youth_guide/src/pages/FindId.jsx
  symbol: requestIdFindCode / verifyIdFindCode / findLoginId
  role: 'API 연결 자리. 계약이 없어 fetch하지 않고 null을 반환. 화면은 요청 중 잠금과 통신 예외만 처리'
  implementation_status: IMPLEMENTING
  remaining_work:
  - 명세 확정 후 구현
  task_refs: [find-id-001]
- path: youth_guide/src/pages/FindId.jsx
  symbol: '(미구현) 가입 확인·인증·아이디 조회 API 요청'
  role: 실제 API 연동
  implementation_status: NOT_STARTED
  remaining_work:
  - 백엔드 API 명세·구현 대기
  task_refs: []
connections:
- from: {path: youth_guide/src/App.jsx, symbol: 'Route path="/find-id"'}
  to: {path: youth_guide/src/pages/FindId.jsx, symbol: FindId, external_boundary: null}
  payload: 없음
  contract_ref: 기존 react-router-dom, Layout 하위
  purpose: /find-id에서 아이디 찾기 화면을 연다.
  verification_evidence: ['docs/worklogs/find-id-001__jb__20261009T154640Z.md#E003']
- from: {path: youth_guide/src/pages/Login.jsx, symbol: '아이디 찾기 버튼 navigate("/find-id")'}
  to: {path: youth_guide/src/pages/FindId.jsx, symbol: FindId, external_boundary: null}
  payload: 없음
  contract_ref: App.jsx Route path="/find-id"
  purpose: 로그인 화면에서 아이디 찾기로 이동한다.
  verification_evidence: ['E003']
- from: {path: youth_guide/src/App.jsx, symbol: 'Route path="/find-id/complete"'}
  to: {path: youth_guide/src/pages/FindIdComplete.jsx, symbol: FindIdComplete, external_boundary: null}
  payload: 'location.state.loginId 문자열. 없거나 공백이면 아이디를 표시하지 않는다'
  contract_ref: 기존 react-router-dom. loginId는 화면 전달 키이며 API 필드 이름이 아니다
  purpose: 확인된 아이디를 완료 화면에 표시한다.
  verification_evidence: ['E007']
- from: {path: youth_guide/src/pages/FindIdComplete.jsx, symbol: '비밀번호 찾기 navigate("/find-password")'}
  to: {path: youth_guide/src/pages/FindPassword.jsx, symbol: FindPassword, external_boundary: null}
  payload: 없음
  contract_ref: App.jsx Route path="/find-password"
  purpose: 완료 화면에서 비밀번호 찾기로 이동한다.
  verification_evidence: ['E007']
- from: {path: youth_guide/src/pages/FindIdComplete.jsx, symbol: '로그인 하기 navigate("/login")'}
  to: {path: youth_guide/src/pages/Login.jsx, symbol: Login, external_boundary: null}
  payload: 없음
  contract_ref: App.jsx Route path="/login"
  purpose: 완료 화면에서 로그인으로 이동한다.
  verification_evidence: ['E007']
verified_flow: /find-id 표시, 이메일 입력 중 문구 없음, 형식 오류, 형식 맞는 이메일 클릭 시 서버 미연결 안내와 인증번호 입력 비활성, 아이디 찾기 버튼 비활성, 결과 화면 없음, fetch·XHR 0건, 로그인 화면 아이디 찾기 클릭 시 /find-id, 비밀번호 찾기 클릭 시 경로 유지를 브라우저에서 확인했다(E003). 360px에서 카드가 화면 안에 있고 가로 스크롤이 없다.
verification_scope: MOCK_ONLY
required_checks:
- npm run lint
- vite build
- 실제 API 연동 후 AC-04·05·06·07 확인
check_evidence:
- 'lint: npm run lint LINT_EXIT=0, oxlint FindId.jsx·Login.jsx·App.jsx Found 0 warnings and 0 errors'
- 'build: BUILD_EXIT=0'
- '브라우저(E003): 위 verified_flow. 스크린샷 /tmp/find-id-form.png, /tmp/find-id-360.png'
exception_coverage:
- 이메일 형식이 아니면 requestIdFindCode를 부르지 않는다.
- 응답이 없으면 가입·발송·인증 성공으로 처리하지 않고 서버 미연결 안내만 표시한다.
- 발송 성공 전에는 인증번호 입력과 확인 버튼이 비활성이다.
- 조회 응답이 없거나 아이디 필드를 알 수 없으면 결과 화면으로 넘기지 않는다.
blockers:
- '가입 확인·인증번호·아이디 조회 API가 명세에 없어 실제 연동 불가'
- '완료 기준 사람 승인 전'
resume_when:
- 사용자가 완료 기준 초안을 승인할 때
- 아이디 찾기 관련 API 명세가 확정될 때
- 아이디 조회 API가 확인된 아이디 문자열을 반환할 때
next_action: 사용자에게 구현 결과와 미구현 항목을 보고한다.
remaining_work:
- 완료 기준 승인
- API 연동
- 아이디 조회 API 연결 후 완료 화면 이동 확인
- 사람 검토
completion_requires: {review_status: APPROVED, integration_status: null, deployment_status: null}
review_evidence: []
integration_evidence: []
deployment_evidence: []
completion_event_ref: null
limitations:
- 변경은 커밋되지 않은 로컬 작업 트리에만 있다.
- 완료 화면은 /find-id/complete로 직접 열 수 있으나, 조회 API가 아이디 문자열을 반환하기 전에는 입력 화면에서 이동하지 않는다. 직접 열면 조회된 아이디가 없다고 표시한다.
- 첨부 기능 명세서 이미지는 확인하지 못했다.
- 실행 모델 식별자는 확인하지 못했다.
handoff: youth_guide에서 npm run dev 후 /find-id 또는 로그인 화면의 아이디 찾기로 연다. 실제 연동은 API 명세가 확정된 뒤 requestIdFindCode·verifyIdFindCode·findLoginId를 구현한다.
```
