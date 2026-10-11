# 비밀번호 변경 (CHANGE_PASSWORD)

```yaml
schema_version: 3.1.0
template: false
record_type: feature
summary_ko: 비밀번호 변경 화면(ChangePassword.jsx·ChangePassword.css, 개발 서버 전용 경로 /change-password)을 구현했고 IMPLEMENTING 상태다. 새 비밀번호 형식(8~20자, 영문·숫자·특수문자) 검증, 새 비밀번호 확인 불일치 문구, 오류 입력창 빨간 테두리, 완료 클릭 시 검증을 브라우저에서 확인했다. 현재 비밀번호의 실제 일치 여부는 백엔드 판단이며, 비밀번호 변경 API가 명세에 없어 changePassword 함수 구조만 있고 요청은 보내지 않는다(API 연결 준비). API 성공 시에만 홈("/")으로 이동하는 구조이며, 현재는 이동하지 않고 서버 미연결 안내를 표시한다. 완료 기준 9개가 승인되었고 6개를 충족했다. 비밀번호 변경 기능 전체는 완료가 아니다.
feature_id: CHANGE_PASSWORD
name: 비밀번호 변경
human_owner: null
actor_id: jb
participants:
- jb
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-06T04:20Z: 첨부 UI 시안 기준 비밀번호 변경 화면 구현, 프론트엔드 검증, API 명세 없으면 함수 구조만, API 성공 시에만 홈 이동, 라우트는 import 1줄·Route 1줄'
- 'EXPLICIT_REQUEST@2026-10-06T04:50Z: 비밀번호 변경 기능 목록 등록(기능명·범위 항목 제공, 코드 수정 금지)'
- 'EXPLICIT_REQUEST@2026-10-06T04:57Z: CHANGE_PASSWORD-AC-01~09 승인(change-password-001 E006)'
updated_at: '2026-10-06T04:59:20Z'
source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
feature_file: docs/features/CHANGE_PASSWORD.md
latest_worklog: docs/worklogs/change-password-001__jb__20261006T042232Z.md
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
goal: 로그인한 사용자가 현재 비밀번호를 확인받고 새 비밀번호로 바꿀 수 있는 화면과 기능을 제공한다. 현재 범위는 화면, 프론트엔드 검증, API 호출 함수 구조(API 연결 준비), API 성공 시 홈 이동 구조까지이며 실제 비밀번호 변경 API는 명세가 없어 연결하지 않았다.
scope:
- '화면: 제목 "비밀번호 변경", 안내 문구 2줄(빨간 강조 포함)과 구분선, 현재 비밀번호·새 비밀번호·새 비밀번호 확인 입력(가림), 파란 "완료" 버튼. 스타일은 styles/ChangePassword.css'
- '현재 비밀번호: 실제 일치 여부는 백엔드 판단이며 프론트에서 비교하지 않는다. 완료 클릭 시 비어 있으면 "비밀번호가 올바르지 않습니다."(빨간색)와 빨간 테두리(작업자 해석, 사람 판단 대기), 입력을 바꾸면 지운다'
- '새 비밀번호: 8~20자이며 영문·숫자·특수문자를 모두 포함하지 않으면 "사용할 수 없는 비밀번호입니다."(빨간색)와 빨간 테두리. 입력창 maxLength 20. 비어 있으면 형식 안내 문구(회색)'
- '새 비밀번호 확인: 값이 있고 새 비밀번호와 다르면 "일치하지 않는 비밀번호입니다."(빨간색)와 빨간 테두리. 빈 값이면 문구 없음. 새 비밀번호가 바뀌면 다시 비교. maxLength 20'
- '완료: 현재 비밀번호 빈 값 → 새 비밀번호 형식 → 확인 빈 값·불일치 순으로 검사하고, 하나라도 실패하면 요청하지 않는다. 통과하면 changePassword({ currentPassword, newPassword }) 호출'
- 'API 연결 준비: changePassword는 URL·요청 필드·응답 구조·인증 방식이 없는 빈 함수. 응답이 없으면 "비밀번호 변경 서버가 아직 연결되지 않았습니다." 안내, response.ok일 때만 navigate("/"), 그 외·예외는 "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요."'
excluded_scope:
- 실제 비밀번호 변경 API 요청과 현재 비밀번호 서버 확인(명세 없음)
- 명세에 없는 상태 코드·오류 코드 처리
- 토큰·쿠키·세션 등 인증 처리, localStorage 사용
- 운영 빌드 경로 등록(개발 서버 전용 /change-password)
dependency_refs:
- 'youth_guide/src/App.jsx의 {import.meta.env.DEV && <Route path="/change-password" element={<ChangePassword />} />}'
- youth_guide/src/components/Layout.jsx의 Outlet(기존 레이아웃, 수정하지 않음)
- youth_guide/src/pages/Home.jsx(API 성공 후 이동 대상 "/")
unknowns:
- '비밀번호 변경 API: 명세에 없음(UNDECIDED). URL·method·요청 필드·응답 구조·상태 코드·오류 코드 필요'
- '현재 비밀번호 불일치를 나타내는 상태 코드·오류 코드: UNDECIDED(정해지면 "비밀번호가 올바르지 않습니다."에 연결)'
- '인증 방식(token/cookie/session)과 백엔드 주소·접근 방식: UNDECIDED - 보류(백엔드 구축 후 결정)'
- '작업자 해석 항목(change-password-001 E003): 현재 비밀번호 빈 값 오류 표시, 빈 새 비밀번호 형식 안내, 서버 미연결 안내(시안에 없음), 빈 확인 값 완료 시 문구 없이 요청만 막음, 개발 서버 전용 경로 - UNDECIDED'
- '시안·요청 문구 차이: 확인 불일치 문구는 시안 "비밀번호가 일치하지 않습니다.", 요청 "일치하지 않는 비밀번호입니다."(요청 문구 적용)'
acceptance_definition_status: APPROVED
acceptance_approval_refs:
- 'EXPLICIT_REQUEST@2026-10-06T04:57Z: 현재 대화의 사용자 요청(CHANGE_PASSWORD-AC-01~09 초안 승인, 문구 변경 없음, change-password-001 E006)'
acceptance_criteria:
- ac_id: CHANGE_PASSWORD-AC-01
  condition: /change-password 화면 표시
  expected: 제목, 안내 문구 2줄, 세 입력창(label·placeholder), 완료 버튼이 시안과 같은 구조로 보인다.
  status: MET
  evidence_refs: ['docs/worklogs/change-password-001__jb__20261006T042232Z.md#E002 접근성 스냅샷과 스크린샷 /tmp/change-password-error-state.png']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_PASSWORD-AC-02
  condition: 올바르지 않은 현재 비밀번호로 완료
  expected: '"비밀번호가 올바르지 않습니다."를 빨간색으로 표시한다(판단은 백엔드 API).'
  status: UNVERIFIED
  evidence_refs: ['비밀번호 변경 API가 명세에 없어 서버 판단 결과를 받을 수 없다(현재 검증 불가)', 'E002: 빈 값으로 완료 시에만 문구와 빨간 테두리 표시, 입력하면 제거(작업자 해석)']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_PASSWORD-AC-03
  condition: 새 비밀번호 입력창 속성
  expected: maxLength가 20이다.
  status: MET
  evidence_refs: ['ChangePassword.jsx maxLength={PASSWORD_MAX_LENGTH}(20), 확인 입력도 같음']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_PASSWORD-AC-04
  condition: 실제 키보드로 새 비밀번호 21자 이상 입력
  expected: 20자를 넘는 입력이 들어가지 않는다.
  status: UNVERIFIED
  evidence_refs: ['스크립트 입력은 maxLength를 우회하므로 미확인']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_PASSWORD-AC-05
  condition: 새 비밀번호 형식
  expected: '12345678·abcdefgh·Abcdefgh 등 조건 미충족이면 "사용할 수 없는 비밀번호입니다."(빨간색)와 빨간 테두리, Abcd1234!처럼 충족하면 제거된다.'
  status: MET
  evidence_refs: ['docs/worklogs/change-password-001__jb__20261006T042232Z.md#E002 12345678·abcdefgh·Abcdefgh·Abc12! 오류, Abcd1234! 오류 없음']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_PASSWORD-AC-06
  condition: 새 비밀번호 확인 입력
  expected: '새 비밀번호와 다르면 "일치하지 않는 비밀번호입니다."(빨간색)와 빨간 테두리, 같으면 제거, 빈 값이면 미표시, 새 비밀번호가 바뀌면 다시 비교한다.'
  status: MET
  evidence_refs: ['docs/worklogs/change-password-001__jb__20261006T042232Z.md#E002 Abcd1234 불일치 표시, Abcd1234! 제거, 새 비밀번호 변경 시 재표시, 빈 값 미표시']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_PASSWORD-AC-07
  condition: 검증 실패 상태에서 완료 클릭
  expected: 비밀번호 변경 함수를 호출하지 않고 홈으로 이동하지 않는다.
  status: MET
  evidence_refs: ['E002: 빈 값·빈 확인 값으로 완료 시 서버 미연결 안내가 나오지 않음(changePassword 미호출), 경로 유지, fetch·XHR 0건']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_PASSWORD-AC-08
  condition: 모든 검증 통과 후 완료 클릭(API 미연결)
  expected: 'changePassword({ currentPassword, newPassword })를 호출하고, 성공 응답이 없으면 홈으로 이동하지 않는다.'
  status: MET
  evidence_refs: ['E002: "비밀번호 변경 서버가 아직 연결되지 않았습니다." 표시, 경로 /change-password 유지, fetch·XHR 0건', '코드상 명세에 없는 URL·요청 필드·응답 구조·인증 방식 없음']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
- ac_id: CHANGE_PASSWORD-AC-09
  condition: 비밀번호 변경 API 성공
  expected: 홈("/")으로 이동한다.
  status: UNVERIFIED
  evidence_refs: ['비밀번호 변경 API가 명세·백엔드에 없어 성공 경로를 실행할 수 없다(현재 검증 불가). 코드상 response.ok일 때만 navigate("/")']
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
components:
- path: youth_guide/src/pages/ChangePassword.jsx
  symbol: 'ChangePassword / isValidPassword / handleCurrentPasswordChange / handleSubmit / FieldMessage'
  role: '화면·프론트엔드 검증: 세 입력 상태 관리, 형식·일치 검증, 오류 문구·테두리, 완료 검증 순서'
  implementation_status: IMPLEMENTING
  remaining_work:
  - CHANGE_PASSWORD-AC-04 확인, 좁은 화면 확인
  - E003 해석 항목 결정
  task_refs: [change-password-001]
- path: youth_guide/src/styles/ChangePassword.css
  symbol: .change-password-*
  role: 비밀번호 변경 화면 전용 스타일
  implementation_status: IMPLEMENTING
  remaining_work:
  - 시안과의 최종 비교는 사람 판단
  task_refs: [change-password-001]
- path: youth_guide/src/pages/ChangePassword.jsx
  symbol: changePassword / handleSubmit(response 처리)
  role: 'API 연결 준비: 비밀번호 변경 호출 함수 구조와 성공 시에만 홈 이동하는 처리(요청 없음)'
  implementation_status: IMPLEMENTING
  remaining_work:
  - API 명세 확정 후 요청 구현, 현재 비밀번호 오류 상태 코드 연결
  task_refs: [change-password-001]
- path: youth_guide/src/pages/ChangePassword.jsx
  symbol: '(미구현) 비밀번호 변경 API 요청'
  role: 실제 API 연동
  implementation_status: NOT_STARTED
  remaining_work:
  - 백엔드 API 명세·구현 대기
  task_refs: []
connections:
- from: {path: youth_guide/src/App.jsx, symbol: 'Route path="/change-password" (import.meta.env.DEV)'}
  to: {path: youth_guide/src/pages/ChangePassword.jsx, symbol: ChangePassword, external_boundary: null}
  payload: 없음(props 없음)
  contract_ref: 개발 서버 전용 라우트(작업자 선택, change-password-001 E003 판단 대기)
  purpose: 개발 서버에서 /change-password로 화면을 연다.
  verification_evidence: ['docs/worklogs/change-password-001__jb__20261006T042232Z.md#E002']
- from: {path: youth_guide/src/pages/ChangePassword.jsx, symbol: handleSubmit}
  to: {path: youth_guide/src/pages/ChangePassword.jsx, symbol: changePassword, external_boundary: '없음(비밀번호 변경 API 명세 없음)'}
  payload: '{ currentPassword, newPassword }(화면 상태 값, API 필드 아님)'
  contract_ref: null
  purpose: 검증을 통과한 값을 비밀번호 변경 함수로 넘긴다(요청 없음).
  verification_evidence: ['E002 검증 통과 시에만 서버 미연결 안내 표시']
- from: {path: youth_guide/src/pages/ChangePassword.jsx, symbol: 'handleSubmit navigate("/") (response.ok)'}
  to: {path: youth_guide/src/pages/Home.jsx, symbol: Home, external_boundary: null}
  payload: 없음(경로 이동)
  contract_ref: 기존 라우팅(App.jsx Route path="/")
  purpose: API 성공 시 홈으로 이동한다.
  verification_evidence: ['API 없음으로 미실행(현재 검증 불가)']
verified_flow: /change-password 접속 → 입력별 형식·일치 검증과 빨간 테두리·문구 → 검증 실패 시 완료해도 요청·이동 없음 → 검증 통과 시 changePassword 호출 후 응답 없음으로 서버 미연결 안내 표시까지 브라우저에서 확인했다(E002). API 성공 후 홈 이동은 실행하지 못했다.
verification_scope: MIXED
required_checks:
- npm run lint
- vite build
- 실제 키보드로 CHANGE_PASSWORD-AC-04 확인
- 좁은 화면(560px 이하) 확인
- 실제 API 연동 후 AC-02·09 확인(API 명세·백엔드 확정 후)
check_evidence:
- 'lint·build: Found 0 warnings and 0 errors, 빌드 성공(E002)'
- '브라우저(E002): 입력별 검증, 완료 클릭 시 검증 순서와 요청 차단, 서버 미연결 안내, 경로 유지, fetch·XHR 0건'
- '범위: lint·build는 정적 확인, 화면 동작은 백엔드 없이 브라우저에서 확인(실제 API 통신 없음)'
exception_coverage:
- 현재 비밀번호 빈 값, 새 비밀번호 형식 오류, 확인 빈 값·불일치 중 하나라도 있으면 changePassword를 부르지 않는다.
- 요청 중에는 완료 버튼을 비활성화해 중복 제출을 막는다.
- 응답이 없으면 서버 미연결 안내, response.ok가 아니거나 예외면 "서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요."를 표시한다.
blockers:
- '비밀번호 변경 API가 명세에 없어 실제 연동 불가(백엔드 API 필요)'
- '해석 항목 결정 대기(change-password-001 E003)'
resume_when:
- 사용자가 E003 해석 항목을 결정할 때
- 비밀번호 변경 API 명세가 확정될 때
next_action: 사용자에게 승인 반영 결과를 보고하고 E003 결정을 받는다.
remaining_work:
- CHANGE_PASSWORD-AC-04·좁은 화면 확인
- 실제 API 연동(명세·백엔드 확정 후)과 현재 비밀번호 오류 상태 코드 연결
- 사람 검토
completion_requires: {review_status: APPROVED, integration_status: null, deployment_status: null}
review_evidence: []
integration_evidence: []
deployment_evidence: []
completion_event_ref: null
limitations:
- 변경은 커밋되지 않은 로컬 작업 트리에만 있다(ChangePassword.jsx·ChangePassword.css 미추적, App.jsx 수정).
- /change-password는 개발 서버에서만 등록되고 운영 빌드에는 없다.
- 비밀번호 변경 요청을 보내지 않으며, 완료 시 홈으로 이동하지 않는다(API 연결 준비 상태).
- 실행 모델 식별자는 확인하지 못했다.
handoff: youth_guide에서 npm run dev 실행 후 /change-password에서 확인한다. 실제 연동은 비밀번호 변경 API 명세가 확정된 뒤 changePassword를 구현하고 현재 비밀번호 오류 상태 코드를 문구에 연결한다.
```
