# 기능별 개발 현황
언어: 기능명·진행 설명·차단 원인·다음 행동은 한국어로 작성한다. 고정 키와 상태 코드는 보존한다.
등록: 범위가 승인된 기능만 docs/features/_TEMPLATE.md를 복사해 docs/features/<feature_id>.md로 만든다.
갱신 순서: 사건 → feature_file → 해당 기능의 현황 → docs/CURRENT_STATE.md. 공용 항목을 바꾸기 전에 다시 확인한다.
중단: implementation_status를 유지하고 work_status와 latest_worklog를 별도로 갱신한다.
진행도: 승인된 비어 있지 않은 기준만 acceptance_total로 사용한다. acceptance_passed는 현재 근거가 있는 MET 개수, 미확인은 null이다.
구현 완료: 적용 기준·필수 검증 통과와 미해결 차단 없음일 때만 IMPLEMENTED. 사람 검토가 남으면 IN_REVIEW를 유지한다.
작업 종료: review_status=APPROVED와 범위에 포함된 통합·배포 조건을 충족해야 기능 DONE으로 표시한다.
```yaml
schema_version: 3.1.0
template: false
record_type: feature_index
inventory_status: UNVERIFIED
features:
- feature_id: LOGIN
  name: 로그인
  summary_ko: '로그인 UI: UI 코드 구현(회원가입 버튼과 /signup 이동 포함), 회원가입 이동은 브라우저 확인됨, 입력 반영·비밀번호 가림·메시지 영역은 도구로 확인해 기준 7/13 충족, 체크박스·hover·좁은 화면·21자 입력은 검증 대기(IMPLEMENTING). 아이디 찾기 버튼은 /find-id, 비밀번호 찾기 버튼은 /find-password로 이동한다(find-id-001, find-password-001). LOGIN-AC-06은 비밀번호 찾기 이동이 추가되어 UNVERIFIED다. 로그인 API 연동: AUTH-01 제안값으로 빈 값 검사·요청 전송·상태 코드별 문구 구현, 요청 전송은 브라우저 확인, 실제 서버 응답은 현재 검증 불가, 백엔드 주소·proxy·환경변수·인증 전달 방식은 보류(백엔드 구축 후 결정)(IMPLEMENTING). 로그인 기능 전체는 완료가 아니다.'
  human_owner: null
  actor_id: jb
  implementation_status: IMPLEMENTING
  work_status: BLOCKED
  acceptance_passed: 7
  acceptance_total: 13
  verification_status: PARTIAL
  review_status: PENDING
  integration_status: PR_REVIEW
  deployment_status: NOT_DEPLOYED
  feature_file: docs/features/LOGIN.md
  latest_worklog: docs/worklogs/member-auth-api-001__jb__20261001T165919Z.md
  source_revision: b8a6a966a84cbebc431ddcd477ff41e4dfe5d012
  updated_at: '2026-10-01T17:13:46Z'
  missing_reasons:
    human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
    acceptance_total: 로그인 UI 기준 13개만 포함(LOGIN-AC-05는 사용자 승인으로 AUTH-01 요청 기준으로 문구 변경, 분모 유지). 그 밖의 로그인 API 연동 완료 기준은 UNDECIDED.
- feature_id: SIGNUP
  name: 회원가입
  summary_ko: '회원가입 UI: UI·프론트엔드 입력 검증 구현(아이디 30자, 버튼 활성 표시, 생년월일 단위, 클릭 시 이메일 형식 검증 포함), 브라우저 확인과 사용자 실제 키보드 확인으로 기준 11/21 충족, 명세·시안 불일치 결정과 좁은 화면 생년월일 잘림 해결 대기(IMPLEMENTING). 회원가입 API 연동: MEM-01 제안값으로 가입 요청 코드 추가(IMPLEMENTING), 회원가입 버튼이 중복 확인·이메일 인증 API 부재로 활성화되지 않아 화면 요청과 실제 서버 응답은 현재 검증 불가. 중복 확인·이메일 인증 API 연동과 백엔드 접근 방식은 보류(백엔드 구축 후 결정, NOT_STARTED). 회원가입 완료 화면: /signup/complete 화면 추가, MEM-01 응답이 response.ok일 때만 완료 화면으로 이동하고 버튼으로 /login 이동(IMPLEMENTING, 미커밋, 프론트엔드 화면·이동만). 성공 응답에 따른 이동은 같은 이유로 현재 검증 불가, SIGNUP-AC-19 문구 처리는 사람 확인 대기. 회원가입 기능 전체는 완료가 아니다.'
  human_owner: null
  actor_id: jb
  implementation_status: IMPLEMENTING
  work_status: WAITING_APPROVAL
  acceptance_passed: 11
  acceptance_total: 21
  verification_status: PARTIAL
  review_status: PENDING
  integration_status: PR_REVIEW
  deployment_status: NOT_DEPLOYED
  feature_file: docs/features/SIGNUP.md
  latest_worklog: docs/worklogs/signup-complete-001__jb__20261008T161951Z.md
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
  updated_at: '2026-10-08T16:21:18Z'
  missing_reasons:
    human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
    acceptance_total: 상세 명세 1~11, 요구사항 표 REG-01~11, 요청 스타일 조건에서 정리한 21개(API 의존 기준 포함). 사용자가 2026-10-01T07:03Z 답변으로 승인 유지. 완료 화면 기준 추가·SIGNUP-AC-19 문구 수정은 사람 승인 전이라 분모 21 유지(signup-complete-001 E004).
- feature_id: CHANGE_ID
  name: 아이디 변경
  summary_ko: '아이디 변경 화면 구현(개발 서버 전용 /change-id): 새 아이디 기존 아이디 동일·30자 초과 문구와 최대 30자, 이메일 입력과 발송 클릭 시 형식 검증, mock 인증번호 확인, 조건에 따른 완료 버튼 활성(IMPLEMENTING). 이메일 인증·아이디 변경 API는 명세에 없어 sendVerificationCode·changeLoginId 함수 구조만 있고 요청은 보내지 않는다(API 연결 준비, 백엔드 API 필요). API 성공 시에만 홈으로 이동하는 구조이며 현재는 서버 미연결 안내를 표시하고 이동하지 않는다. 완료 기준 9개 승인, 6개 충족. 기능 전체는 완료가 아니다.'
  human_owner: null
  actor_id: jb
  implementation_status: IMPLEMENTING
  work_status: WAITING_APPROVAL
  acceptance_passed: 6
  acceptance_total: 9
  verification_status: PARTIAL
  review_status: PENDING
  integration_status: NOT_MERGED
  deployment_status: NOT_DEPLOYED
  feature_file: docs/features/CHANGE_ID.md
  latest_worklog: docs/worklogs/change-id-001__jb__20261005T103215Z.md
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
  updated_at: '2026-10-06T04:59:20Z'
  missing_reasons:
    human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
    acceptance_total: 'CHANGE_ID-AC-01~09(API 의존 기준 포함). 사용자가 2026-10-06T04:57Z 요청으로 승인했고, AC-08은 같은 요청의 이동 조건 변경(API 성공 시에만 홈 이동)을 반영했다. UNVERIFIED: 03(실제 키보드)·07·08(API 없음).'
- feature_id: CHANGE_PASSWORD
  name: 비밀번호 변경
  summary_ko: '비밀번호 변경 화면 구현(개발 서버 전용 /change-password): 새 비밀번호 형식 검증(8~20자, 영문·숫자·특수문자)과 최대 20자, 확인 불일치 문구, 오류 입력창 빨간 테두리, 완료 클릭 시 검증 후 요청 차단(IMPLEMENTING). 현재 비밀번호 실제 확인과 비밀번호 변경은 API가 명세에 없어 changePassword 함수 구조만 있고 요청은 보내지 않는다(API 연결 준비, 백엔드 API 필요). API 성공 시에만 홈으로 이동하는 구조이며 현재는 이동하지 않는다. 완료 기준 9개 승인, 6개 충족. 기능 전체는 완료가 아니다.'
  human_owner: null
  actor_id: jb
  implementation_status: IMPLEMENTING
  work_status: WAITING_APPROVAL
  acceptance_passed: 6
  acceptance_total: 9
  verification_status: PARTIAL
  review_status: PENDING
  integration_status: NOT_MERGED
  deployment_status: NOT_DEPLOYED
  feature_file: docs/features/CHANGE_PASSWORD.md
  latest_worklog: docs/worklogs/change-password-001__jb__20261006T042232Z.md
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
  updated_at: '2026-10-06T04:59:20Z'
  missing_reasons:
    human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
    acceptance_total: 'CHANGE_PASSWORD-AC-01~09(API 의존 기준 포함). 사용자가 2026-10-06T04:57Z 요청으로 승인했다. UNVERIFIED: 02·09(API 없음)·04(실제 키보드).'
- feature_id: FIND_ID
  name: 아이디 찾기
  summary_ko: '아이디 찾기 입력 화면(/find-id)과 완료 화면(/find-id/complete)을 두었다(IMPLEMENTING, 미커밋). 가입 확인·인증번호·아이디 조회 API 계약이 없어 요청을 보내지 않고 null을 반환한다. 완료 화면은 전달된 아이디 문자열만 표시하며 입력 화면에서는 이동하지 않는다. 비밀번호 찾기는 /find-password, 로그인 하기는 /login이다. 완료 기준 초안은 승인 전이라 진행도는 비어 있다. 기능 전체는 완료가 아니다.'
  human_owner: null
  actor_id: jb
  implementation_status: IMPLEMENTING
  work_status: WAITING_APPROVAL
  acceptance_passed: null
  acceptance_total: null
  verification_status: PARTIAL
  review_status: PENDING
  integration_status: NOT_MERGED
  deployment_status: NOT_DEPLOYED
  feature_file: docs/features/FIND_ID.md
  latest_worklog: docs/worklogs/find-id-001__jb__20261009T154640Z.md
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
  updated_at: '2026-10-10T14:00:51Z'
  missing_reasons:
    human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
    acceptance_passed: 완료 기준 초안이 사람 승인 전이라 진행도를 세지 않는다(C21).
    acceptance_total: 기능 명세서 이미지(세 번째 첨부)는 확인하지 못했다. FIND_ID-AC-01~08은 초안이며 사람 승인 전이다(C21).
- feature_id: FIND_PASSWORD
  name: 비밀번호 찾기
  summary_ko: '비밀번호 찾기 화면(/find-password)과 완료 화면(/find-password/complete)을 구현했다(IMPLEMENTING, 미커밋). 이름 일치·인증번호·비밀번호 재설정 API 계약이 없어 요청을 보내지 않고 null을 반환한다. response.ok일 때만 완료 화면으로 이동하며 현재는 이동하지 않는다. 비밀번호 형식은 8~20자·영문·숫자·특수문자다. 완료 기준은 승인 전이라 진행도는 비어 있다. 기능 전체는 완료가 아니다.'
  human_owner: null
  actor_id: jb
  implementation_status: IMPLEMENTING
  work_status: WAITING_APPROVAL
  acceptance_passed: null
  acceptance_total: null
  verification_status: PARTIAL
  review_status: PENDING
  integration_status: NOT_MERGED
  deployment_status: NOT_DEPLOYED
  feature_file: docs/features/FIND_PASSWORD.md
  latest_worklog: docs/worklogs/find-password-001__jb__20261009T162009Z.md
  source_revision: 8e139b480b6c72b00e43a4fdb72f9f2be73fb682
  updated_at: '2026-10-10T14:00:51Z'
  missing_reasons:
    human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음.
    acceptance_passed: 완료 기준이 사람 승인 전이라 진행도를 세지 않는다(C21).
    acceptance_total: 기능 명세서의 조건을 화면에 반영했으나 완료 기준 목록은 사람 승인 전이다(C21).
```
새 항목: 아래 필드를 feature_file에서 복사한다. 기억에 의존해 실제 상태를 다시 만들어 넣지 않는다.
```yaml
template: true
record_type: feature_index_entry
feature_id: null
name: null
human_owner: null
actor_id: null
implementation_status: UNVERIFIED
work_status: QUEUED
acceptance_passed: null
acceptance_total: null
verification_status: NOT_RUN
review_status: NOT_REQUESTED
integration_status: UNVERIFIED
deployment_status: UNVERIFIED
feature_file: null
latest_worklog: null
source_revision: null
updated_at: null
missing_reasons: {}
```
[]는 등록 항목이 없다는 뜻이다. 실제 제품의 기능 목록과 구현 여부는 UNVERIFIED로 남는다.
