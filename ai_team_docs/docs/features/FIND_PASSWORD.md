# 비밀번호 찾기 (FIND_PASSWORD)

```yaml
schema_version: 3.1.0
template: false
record_type: feature
summary_ko: 비밀번호 찾기 화면(/find-password)과 완료 화면(/find-password/complete)은 IMPLEMENTING이다. 이름 일치·가입 확인·인증번호 발송·인증번호 검증·비밀번호 재설정은 저장소와 기존 명세(MEM-01·AUTH-01)에 계약이 없어 요청을 보내지 않는다. 호출 함수는 null을 반환하고, 요청 중 중복 호출 방지와 통신 예외 처리만 두었다. response.ok일 때만 완료 화면으로 이동하며 현재는 그 응답이 없다. 완료 기준은 승인 전이라 진행도는 비어 있다. 기능 전체는 완료가 아니다.
feature_id: FIND_PASSWORD
name: 비밀번호 찾기
human_owner: null
actor_id: jb
participants:
- jb
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-09T16:17Z: 비밀번호 찾기·완료 화면 구현, 로그인 버튼 연결, 명세에 없는 API·가짜 성공 금지, ChangePassword 수정 금지, lint, commit·push 금지'
- 'EXPLICIT_REQUEST@2026-10-10T13:58Z: 아이디 찾기·비밀번호 찾기를 실제 API와 연결할 수 있게 정리. 계약이 없으면 URL·필드·가짜 성공 금지'
updated_at: '2026-10-10T14:00:51Z'
source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
feature_file: docs/features/FIND_PASSWORD.md
latest_worklog: docs/worklogs/find-password-001__jb__20261009T162009Z.md
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
acceptance_passed: null
acceptance_total: null
verification_status: PARTIAL
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
missing_reasons:
  human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
  acceptance_passed: 완료 기준이 사람 승인 전이라 진행도를 세지 않는다(C21).
  acceptance_total: 기능 명세서의 조건을 화면에 반영했으나 완료 기준 목록은 사람 승인 전이다(C21).
not_applicable_reasons: {}
goal: 로그인 화면에서 이름·이메일 인증 후 새 비밀번호를 설정하고, API가 성공할 때만 완료 화면으로 이동한다.
scope:
- '화면: 제목 비밀번호 찾기, 설명, 이름, 이메일+인증번호 받기, 인증번호+확인, 새 비밀번호(마스킹, 안내 문구), 새 비밀번호 확인, 비밀번호 변경 버튼'
- '완료 화면: 체크 아이콘, 비밀번호가 변경되었습니다., 안내 문구, 아이디 찾기(/find-id), 로그인 하기(/login)'
- '비밀번호 규칙: 8~20자, 영문·숫자·특수문자(같은 파일의 isValidPassword). 비어 있거나 조건을 만족하지 않으면 안내 문구를 빨간색으로 표시하고, 조건을 만족하면 문구를 숨긴다. 입력값이 바뀔 때마다 다시 검사한다'
- '비밀번호 확인 불일치: 비밀번호가 일치하지 않습니다. 빨간색 문구와 입력 테두리. 일치하면 오류 제거'
- '비밀번호 변경 버튼: 이름 일치·인증번호 발송·인증 성공·비밀번호 유효·비밀번호 일치가 모두 아니면 비활성(#c5c8e8). disabled라 클릭되지 않음'
- 'API 연결 준비: requestPasswordResetCode, verifyPasswordResetCode, resetFoundPassword는 계약이 없어 null만 반환한다. fetch·URL·요청 필드는 없다. 발송·검증 중에는 같은 요청을 다시 보내지 않고, 통신 예외는 기존 실패 문구를 쓴다. response.ok일 때만 /find-password/complete'
excluded_scope:
- 이름 일치·인증번호 발송·인증번호 확인·비밀번호 변경의 실제 요청(명세 없음)
- 인증번호 생성·고정 값 성공 처리, 남은 시간 초의 임의 지정
- 가입되지 않은 이메일·발송 실패를 나누는 문구(기능 명세서 표에 문장이 없음)
- ChangePassword.jsx·ChangePassword.css 수정
- 토큰·쿠키·세션·localStorage
dependency_refs:
- youth_guide/src/App.jsx의 Route path="/find-password"와 "/find-password/complete"
- youth_guide/src/pages/Login.jsx 비밀번호 찾기 버튼 navigate("/find-password")
- youth_guide/src/components/Layout.jsx의 상단 메뉴(수정하지 않음)
unknowns:
- '이름 일치 API: 명세에 없음(UNDECIDED). 불일치 문구 "이름이 일치하지 않습니다."는 응답 필드가 정해진 뒤에만 표시'
- '인증번호 발송·확인 API: 명세에 없음(UNDECIDED). 성공·불일치 문구는 응답 구조가 정해진 뒤에만 표시. 제한 시간 초도 명세에 없음'
- '가입되지 않은 이메일과 발송 실패의 문구: 기능 명세서 표에 없음(UNDECIDED)'
- '비밀번호 찾기 변경 API: 명세에 없음(UNDECIDED). response.ok 외의 실패 원인 구분은 하지 않음'
- '완료 기준 목록의 승인: UNDECIDED'
acceptance_definition_status: UNDECIDED
acceptance_approval_refs: []
acceptance_criteria: []
components:
- path: youth_guide/src/pages/FindPassword.jsx
  symbol: FindPassword
  role: 비밀번호 찾기 입력·검증·API 자리
  implementation_status: IMPLEMENTING
  remaining_work:
  - 명세가 확정된 API 연결
  task_refs:
  - find-password-001
- path: youth_guide/src/pages/FindPasswordComplete.jsx
  symbol: FindPasswordComplete
  role: 비밀번호 변경 성공 후 완료 화면
  implementation_status: IMPLEMENTING
  remaining_work: []
  task_refs:
  - find-password-001
connections:
- from: {path: youth_guide/src/pages/Login.jsx, symbol: 비밀번호 찾기}
  to: {path: youth_guide/src/pages/FindPassword.jsx, symbol: FindPassword, external_boundary: null}
  payload: null
  contract_ref: null
  purpose: /find-password 이동
  verification_evidence: ['find-password-001 E001 브라우저 클릭 후 /find-password']
- from: {path: youth_guide/src/pages/FindPassword.jsx, symbol: resetFoundPassword}
  to: {path: null, symbol: null, external_boundary: '비밀번호 찾기 변경 API(명세 없음)'}
  payload: null
  contract_ref: null
  purpose: 성공 응답이 있을 때만 완료 화면으로 이동
  verification_evidence: ['함수가 응답을 돌려주지 않음. 브라우저 fetch/xhr 0건']
verified_flow: 로그인 화면 비밀번호 찾기 클릭 → /find-password. 형식 오류 이메일 → 빨간 문구. 형식에 맞는 이메일 → 회색 미연결 안내, 타이머 없음, fetch 0. 짧은 비밀번호 blur → 안내 문구 빨간색. 확인값 불일치 → 빨간 테두리와 문구, 일치하면 제거. 비밀번호 변경 버튼 disabled. 완료 화면 직접 접속 시 제목 표시, 로그인 하기 클릭 → /login. 폼에서 API 성공 없이 완료 화면으로 이동하지는 않는다.
verification_scope: MIXED
required_checks:
- npm run lint
- 브라우저에서 화면·로그인 이동·비밀번호 검증·버튼 비활성
check_evidence:
- 'npm run lint LINT_EXIT=0, oxlint FindPassword.jsx·FindPasswordComplete.jsx·App.jsx·Login.jsx Found 0 warnings and 0 errors (/tmp/find-password-lint4.log)'
- '브라우저 /find-password·/find-password/complete 확인(find-password-001 E001)'
exception_coverage: []
blockers:
- 이름 일치·인증번호·비밀번호 변경 API 명세가 없어 변경 버튼을 성공 상태로 만들 수 없다.
resume_when:
- 사용자가 완료 기준을 승인할 때
- 비밀번호 찾기 관련 API 명세가 확정될 때
next_action: 사용자에게 구현 범위와 미연결 API를 보고한다.
remaining_work:
- 완료 기준 승인
- API 명세 확정 후 연결
- 사람 검토
completion_requires: {review_status: APPROVED, integration_status: MERGED, deployment_status: DEPLOYED}
review_evidence: []
integration_evidence: []
deployment_evidence: []
completion_event_ref: null
limitations:
- 완료 화면 URL로 직접 들어가면 폼의 API 성공 여부와 관계없이 화면이 열린다. 회원가입 완료 화면과 같이 직접 접근을 막지 않았다.
- 참고 이미지의 비밀번호 변경 버튼은 채워진 파란색이나, 명세서의 비활성 조건 때문에 초기 화면은 #c5c8e8이다.
- 확인 버튼은 발송 전이거나 입력이 비어 있으면 투명도 0.5다. 참고 이미지는 선명한 테두리로 그려져 있다.
handoff: youth_guide에서 /find-password와 /find-password/complete를 연다. API 성공 이동은 명세와 백엔드가 정해진 뒤에 확인한다.
```
