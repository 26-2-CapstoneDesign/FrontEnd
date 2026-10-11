# 현재 작업 현황
작업 시작: 해당 작업과 필독 경로를 확인한다. 다른 작업자의 기록을 보존하고 미확인을 승인으로 해석하지 않는다.
재개: 최신 로그의 session·최신 사건·미해결 STOP을 읽고 실제 파일·버전·재개 조건을 확인한다.
```yaml
schema_version: 3.1.0
template: false
record_type: current_state
rules_file: AI_RULES.md
requirements_status: UNDECIDED
stack_status: UNVERIFIED
code_status: UNVERIFIED
source_revision: null
inventory_status: UNVERIFIED
feature_index: docs/FEATURE_STATUS.md
terms_file: docs/TERMS.md
decisions_file: docs/DECISIONS.md
human_owner: null
missing_reasons:
  source_revision: 제품 저장소 미제공
  human_owner: 사람 담당자 미등록
active_tasks:
  - {task_id: TASK-DOC-002, kind: DOCS, actor_id: codex, work_status: IN_REVIEW, review_status: PENDING, required_files: [README_AI.md, docs/DECISIONS.md], latest_worklog: docs/worklogs/TASK-DOC-002__codex__20260920T070034Z.md, next_action: 사용자 검토 후 실제 프로젝트의 승인된 정보만 등록한다.}
  - {task_id: TASK-DOC-003, kind: DOCS, actor_id: codex, work_status: IN_REVIEW, review_status: PENDING, required_files: [docs/DECISIONS.md, AI_COLLABORATION_DESIGN.md], latest_worklog: docs/worklogs/TASK-DOC-003__codex__20260920T082615Z.md, next_action: 한국어 기록 형식과 포트폴리오 내용을 사용자 검토 후 활용한다.}
  - {task_id: login-feature-001, kind: FEATURE, feature_id: LOGIN, actor_id: jb, work_status: BLOCKED, review_status: PENDING, required_files: [docs/features/LOGIN.md], latest_worklog: docs/worklogs/login-feature-001__jb__20260930T121505Z.md, next_action: 로그인 UI는 구현 중(IMPLEMENTING)이며 회원가입 버튼의 /signup 이동은 브라우저에서 확인됐다. 입력·체크박스·로그인 버튼 안내 메시지는 사용자가 브라우저에서 직접 확인하거나 확인을 허용해야 한다(E003·E017). 로그인 API 연동은 API·인증 방식이 정해지기 전까지 착수하지 않는다(NOT_STARTED).}
  - {task_id: signup-feature-001, kind: FEATURE, feature_id: SIGNUP, actor_id: jb, work_status: WAITING_APPROVAL, review_status: PENDING, required_files: [docs/features/SIGNUP.md], latest_worklog: docs/worklogs/signup-feature-001__jb__20261001T045008Z.md, next_action: 회원가입 UI는 구현 중(IMPLEMENTING)이며 완료 기준 21개 중 11개 충족. 명세·시안 불일치 항목, 좁은 화면 생년월일 연도 잘림 해결 방식, 기능 ID 확정, 추가 UI의 기준 편입 여부에 대한 사용자 결정을 기다린다. 회원가입 API 연동은 API 명세가 정해지기 전까지 착수하지 않는다(NOT_STARTED).}
  - {task_id: signup-email-validation-001, kind: FEATURE, feature_id: REG-05, actor_id: jb, work_status: WAITING_APPROVAL, review_status: PENDING, required_files: [docs/features/SIGNUP.md], latest_worklog: docs/worklogs/signup-email-validation-001__jb__20261001T055853Z.md, next_action: 인증번호 발송 버튼 클릭 시 이메일 형식 검증과 빈칸 비활성 표시는 구현·브라우저 확인됨, 실제 키보드 삭제 시 비활성 복귀는 사용자가 확인함(IMPLEMENTING). 작업 완료 기준 목록의 사람 승인을 기다린다. REG-05는 FEATURE_STATUS에 등록된 기능 ID가 아니며 관련 등록 기능은 SIGNUP이다.}
  - {task_id: member-auth-api-001, kind: FEATURE, feature_id: null, actor_id: jb, work_status: BLOCKED, review_status: PENDING, required_files: [docs/features/LOGIN.md, docs/features/SIGNUP.md], latest_worklog: docs/worklogs/member-auth-api-001__jb__20261001T165919Z.md, next_action: 'Login.jsx에 AUTH-01, SignUp.jsx에 MEM-01 요청을 API 명세 제안값으로 추가함(IMPLEMENTING, 미커밋). 로그인 요청 전송은 브라우저에서 확인했고 실제 서버 응답은 현재 검증 불가. 백엔드 주소·Vite proxy·환경변수 방식, AUTH-01 인증 전달 방식, 중복 확인·이메일 인증 API는 보류(백엔드 구축 후 결정, E004 STOP). 백엔드 구축 후 재개한다. 관련 기능은 LOGIN·SIGNUP이다.'}
  - {task_id: firstlogin-001, kind: FEATURE, feature_id: null, actor_id: jb, work_status: WAITING_APPROVAL, review_status: PENDING, required_files: [], latest_worklog: docs/worklogs/firstlogin-001__jb__20261002T110244Z.md, next_action: '최초 로그인 관심 자격증 선택 페이지를 mock 데이터로 구현함(IMPLEMENTING, 미커밋). 백엔드 구축 전 UI 확인용 임시 직접 접근 경로 /onboarding/certifications는 개발 서버에서만 등록된다. API는 호출하지 않는다. 기능 등록(feature_id·완료 기준)과 완료 후 이동 방식은 사람 결정 대기. 최초 로그인 판단·관심 자격증 저장/조회·CERT-01·NCS API 연결은 백엔드 구축 후 진행한다.'}
  - {task_id: change-id-001, kind: FEATURE, feature_id: CHANGE_ID, actor_id: jb, work_status: WAITING_APPROVAL, review_status: PENDING, required_files: [docs/features/CHANGE_ID.md], latest_worklog: docs/worklogs/change-id-001__jb__20261005T103215Z.md, next_action: '아이디 변경 화면 구현(IMPLEMENTING, 미커밋, 개발 서버 전용 /change-id). 이메일 인증·아이디 변경 API는 명세에 없어 함수 구조만 있고, API 성공 시에만 홈으로 이동한다(API 연결 준비). 완료 기준 승인됨(6/9). 문구 판단(E004)을 기다린다. 실제 API 연동은 명세·백엔드 확정 후 진행한다.'}
  - {task_id: change-password-001, kind: FEATURE, feature_id: CHANGE_PASSWORD, actor_id: jb, work_status: WAITING_APPROVAL, review_status: PENDING, required_files: [docs/features/CHANGE_PASSWORD.md], latest_worklog: docs/worklogs/change-password-001__jb__20261006T042232Z.md, next_action: '비밀번호 변경 화면 구현(IMPLEMENTING, 미커밋, 개발 서버 전용 /change-password). 비밀번호 변경 API는 명세에 없어 함수 구조만 있고 성공 시에만 홈으로 이동하는 구조다(API 연결 준비). 완료 기준 승인됨(6/9). 해석 항목 결정(E003)을 기다린다. 실제 API 연동은 명세·백엔드 확정 후 진행한다.'}
  - {task_id: signup-complete-001, kind: FEATURE, feature_id: SIGNUP, actor_id: jb, work_status: WAITING_APPROVAL, review_status: PENDING, required_files: [docs/features/SIGNUP.md], latest_worklog: docs/worklogs/signup-complete-001__jb__20261008T161951Z.md, next_action: '회원가입 완료 화면(/signup/complete)을 추가하고 MEM-01 응답이 response.ok일 때만 이동하도록 함(IMPLEMENTING, 미커밋, 프론트엔드 화면·이동만). 완료 화면 버튼은 /login으로 이동. 성공 응답에 따른 이동은 회원가입 버튼 활성화 불가·백엔드 부재로 현재 검증 불가. SIGNUP-AC-19 문구 수정·완료 화면 기준 추가 여부 사람 승인을 기다린다(E004).'}
  - {task_id: find-id-001, kind: FEATURE, feature_id: FIND_ID, actor_id: jb, work_status: WAITING_APPROVAL, review_status: PENDING, required_files: [docs/features/FIND_ID.md], latest_worklog: docs/worklogs/find-id-001__jb__20261009T154640Z.md, next_action: '아이디 찾기 입력(/find-id)과 완료 화면(/find-id/complete)을 두었다(IMPLEMENTING, 미커밋). 조회 API가 아이디 문자열을 반환할 때만 완료 화면으로 이동한다. 지금은 반환하지 않는다. 완료 화면의 비밀번호 찾기는 /find-password, 로그인 하기는 /login이다. 완료 기준 초안 승인을 기다린다.'}
  - {task_id: find-password-001, kind: FEATURE, feature_id: FIND_PASSWORD, actor_id: jb, work_status: WAITING_APPROVAL, review_status: PENDING, required_files: [docs/features/FIND_PASSWORD.md], latest_worklog: docs/worklogs/find-password-001__jb__20261009T162009Z.md, next_action: '비밀번호 찾기(/find-password)와 완료 화면(/find-password/complete)을 구현함(IMPLEMENTING, 미커밋). 로그인 버튼은 /find-password로 이동한다. 이름 일치·인증번호·비밀번호 변경 API는 명세에 없어 성공 처리와 완료 화면 이동을 하지 않는다. 완료 기준 승인을 기다린다.'}
  - {task_id: find-account-api-001, kind: FEATURE, feature_id: null, actor_id: jb, work_status: BLOCKED, review_status: PENDING, required_files: [docs/features/FIND_ID.md, docs/features/FIND_PASSWORD.md], latest_worklog: docs/worklogs/find-account-api-001__jb__20261010T140051Z.md, next_action: '아이디 찾기·비밀번호 찾기 호출 함수는 null을 반환하고 요청을 보내지 않는다(IMPLEMENTING, 미커밋). URL·method·요청 필드·응답 필드·인증 방식이 명세에 없다. 백엔드 계약이 확정되면 그 함수 안에서만 요청을 붙인다.'}
updated_at: '2026-10-10T14:00:51Z'
```
