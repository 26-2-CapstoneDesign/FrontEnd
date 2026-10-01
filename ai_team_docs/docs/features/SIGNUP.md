# 회원가입 (SIGNUP)

```yaml
schema_version: 3.1.0
template: false
record_type: feature
summary_ko: 회원가입 화면 UI와 프론트엔드 입력 검증은 SignUp.jsx·SignUp.css에 구현했고 IMPLEMENTING 상태다. 사용자 요청으로 아이디 최대 30자, 아이디 중복확인·인증번호 발송 버튼의 입력 여부에 따른 활성 표시, 생년월일 년·월·일 단위 표시, 버튼 클릭 시 이메일 형식 검증을 추가했다. 브라우저에서 비밀번호·약관 동작과 로그인 화면에서의 이동을 확인하고, 사용자가 실제 키보드로 Backspace 삭제 시 버튼 비활성 복귀와 비밀번호 20자 초과 입력 차단을 확인해 완료 기준 21개 중 11개가 충족됐고, 좁은 화면에서 생년월일 연도가 잘리는 문제가 발견됐다. 명세·시안 불일치 항목의 사람 결정과 일부 확인이 남아 있다. 중복 확인·이메일 인증·가입 처리 API 연동은 API 명세가 없어 착수하지 않았다(NOT_STARTED). 회원가입 기능 전체는 완료가 아니다.
feature_id: SIGNUP
name: 회원가입
human_owner: null
actor_id: jb
participants:
- jb
approval_refs:
- 'EXPLICIT_REQUEST@2026-10-01T04:18Z: 현재 대화의 사용자 요청 - 회원가입 화면 구현(백엔드·API 미구현, UI와 프론트엔드 입력 검증까지)'
- 'EXPLICIT_REQUEST@2026-10-01T04:19Z: 현재 대화의 사용자 첨부 - 회원가입 시안, 상세 명세 1~11, 요구사항 표 REG-01~11'
- 'EXPLICIT_REQUEST@2026-10-01T04:44Z: 현재 대화의 사용자 요청 - 아이디 입력란 최대 30자(maxLength)'
- 'EXPLICIT_REQUEST(2026-10-01T04:46:43Z~04:48:45Z 사이): 현재 대화의 사용자 답변 - 기능 파일 생성과 FEATURE_STATUS·CURRENT_STATE 반영'
- 'EXPLICIT_REQUEST@2026-10-01T05:19Z: 현재 대화의 사용자 요청 - 이메일 입력 중 형식 오류 문구 미표시, 인증번호 전송(발송) 버튼 클릭 시 형식 검사, 빈칸 포함 오류 문구 표시, 이메일 인증 API 미구현'
- 'EXPLICIT_REQUEST@2026-10-01T06:11Z: 현재 대화의 사용자 요청 - 이메일 형식 검증 구현 내용을 SIGNUP.md에 반영'
- 'EXPLICIT_REQUEST@2026-10-01T04:59Z: 현재 대화의 사용자 요청 - 아이디 중복확인 버튼 UI(빈 값이면 연한 색·클릭 불가, 1자 이상이면 진한 색)'
- 'EXPLICIT_REQUEST@2026-10-01T05:03Z: 현재 대화의 사용자 요청 - 생년월일 선택창 오른쪽에 년·월·일 단위 표시, 입력창 크기·위치·디자인 유지'
- 'EXPLICIT_REQUEST@2026-10-01T06:20Z: 현재 대화의 사용자 요청 - 회원가입 관련 동작 브라우저 확인(코드·문서 수정 없이)'
- 'EXPLICIT_REQUEST@2026-10-01T06:30Z: 현재 대화의 사용자 요청과 답변 - 이메일이 비어 있으면 인증번호 발송 버튼을 비활성 색상·클릭 불가로, 1자 이상이면 진한 색상으로 표시(실제 비활성화 선택)'
- 'EXPLICIT_REQUEST@2026-10-01T06:40Z: 현재 대화의 사용자 요청 - 회원가입 관련 작업을 AI_RULES 기준으로 최종 정리'
- 'EXPLICIT_REQUEST@2026-10-01T07:03Z: 현재 대화의 사용자 답변 - 완료 기준 21개 승인 유지, 분모 변경 금지'
- 'EXPLICIT_REQUEST@2026-10-01T07:14Z: 현재 대화의 사용자 요청 - 실제 키보드 검증 완료 보고(아이디·이메일 Backspace 전체 삭제 시 버튼 비활성 복귀, 비밀번호 20자 초과 입력 불가), 결정 대기 항목 임의 결정 금지'
updated_at: '2026-10-01T07:16:07Z'
source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
feature_file: docs/features/SIGNUP.md
latest_worklog: docs/worklogs/signup-feature-001__jb__20261001T045008Z.md
implementation_status: IMPLEMENTING
work_status: WAITING_APPROVAL
acceptance_passed: 11
acceptance_total: 21
verification_status: PARTIAL
review_status: PENDING
integration_status: NOT_MERGED
deployment_status: NOT_DEPLOYED
missing_reasons:
  human_owner: 프로젝트 담당자로 등록된 사람 ID가 없음(CURRENT_STATE.md의 human_owner=null).
  approval_refs: 승인 근거는 현재 대화의 사용자 요청·첨부이며 DECISIONS.md에는 등록하지 않았다(수정 허용 범위 밖).
  feature_id: 사용자가 기능 ID를 지정하지 않아 라우팅 경로(/signup)와 컴포넌트명(SignUp)에 맞춰 SIGNUP으로 정했다. 사용자 확인 필요.
  acceptance_total: 상세 명세 1~11, 요구사항 표 REG-01~11, 요청의 스타일 조건에서 21개 기준을 정리했다. API 의존 기준(AC-02·08·09·14·17·18·19)도 승인된 요구사항이므로 분모에 포함했다. 기준 문구 정리는 작업자가 했으며, 사용자가 2026-10-01T07:03Z 답변으로 21개를 승인된 완료 기준으로 유지하고 사람 승인 없이 분모를 바꾸지 말라고 지시했다.
not_applicable_reasons: {}
goal: 사용자가 아이디·비밀번호·이메일 인증·기본정보·닉네임·약관 동의를 입력해 회원가입할 수 있는 화면과 기능을 제공한다. 현재 승인된 단계는 백엔드 없이 동작하는 UI와 프론트엔드 입력 검증이다.
scope:
- '회원가입 UI: 아이디(최대 30자)+중복 확인, 비밀번호(8~20자, 가림), 비밀번호 확인, 이메일+인증번호 발송, 인증번호+확인, 이름(최대 20자), 성별(라디오 3개), 생년월일(년·월·일 선택), 닉네임(최대 30자)+중복 확인, 약관(전체 동의, 필수 2개, 선택 1개), 회원가입 버튼'
- '회원가입 UI: 비밀번호 규칙·비밀번호 일치·필수 약관 동의의 프론트엔드 검증과 안내 문구'
- '회원가입 UI: 이메일 형식 검증 - 인증번호 발송 버튼(요청 문구 "인증번호 전송") 클릭 시 형식을 검사하고, 잘못된 형식이면 이메일 입력란 아래에 "이메일 형식이 올바르지 않습니다."를 표시한다. 입력 중에는 오류 문구를 표시하지 않으며 입력을 바꾸면 문구가 사라진다. 올바른 형식이면 오류 문구 없이 "인증 서버가 아직 연결되지 않았습니다." 안내를 표시한다(이메일 인증 API 미연동). 이메일이 비어 있으면 버튼을 누를 수 없으므로 빈칸 클릭 시 오류 문구는 표시되지 않는다(2026-10-01T06:30Z 사용자 결정).'
- '회원가입 UI: 아이디 중복확인 버튼과 인증번호 발송 버튼은 입력이 비어 있으면(공백만 입력 포함) 비활성·연한 색상, 1자 이상이면 진한 색상(is-primary)으로 표시하고, 다시 모두 지우면 비활성으로 돌아간다.'
- '회원가입 UI: 생년월일 각 선택창 오른쪽에 년·월·일 단위를 항상 표시한다. 선택창 placeholder(년도·월·일)와 월·일 숫자 표기는 유지한다.'
- '회원가입 UI: 스타일은 youth_guide/src/styles/SignUp.css에 작성하고 SignUp.jsx에서 import'
- '회원가입 API 연동: 아이디·닉네임 중복 확인, 이메일 중복 검사·인증번호 발송·확인, 회원가입 처리·저장, 가입 성공 후 로그인 화면 이동 - 범위·방식 UNDECIDED'
excluded_scope:
- 현재 단계의 백엔드 API 호출, 중복 확인·이메일 인증·회원가입 API 생성, API 필드·응답값 정의
- 새로운 라이브러리·dependency 추가
- Login.jsx·Login.css·다른 페이지 수정(회원가입 작업 범위)
dependency_refs:
- youth_guide/src/App.jsx의 Route path="/signup"(기존 라우팅, 수정하지 않음)
- youth_guide/src/components/Layout.jsx의 Outlet과 Link to="/signup"(기존 레이아웃, 수정하지 않음)
- youth_guide/src/pages/Login.jsx의 회원가입 버튼 navigate("/signup")(login-feature-001, 브라우저 클릭 이동 확인 E029)
unknowns:
- '아이디·닉네임 중복 확인, 이메일 인증, 회원가입 API의 엔드포인트·요청·응답 구조: UNDECIDED'
- '비밀번호 안내 문구: 명세와 시안 문구가 다름, UNDECIDED'
- '비밀번호 안내 문구 색: 명세 검은색, 시안 회색, UNDECIDED'
- '성별 표시 순서: 명세 남성/여성/비공개, 시안 여성/남성/비공개, UNDECIDED'
- '결과 문구 띄어쓰기: 명세 원문과 표준 띄어쓰기 중 선택, UNDECIDED'
- '생년 하한(현재 1900): UNDECIDED'
- '비밀번호의 한글·공백 허용 여부: UNDECIDED'
- '이메일 형식 판정 세부 규칙: UNDECIDED. 검증 시점과 문구는 사용자 요청으로 확정(scope 참고). 현재 판정식 /^[^\s@]+@[^\s@]+\.[^\s@]+$/는 작업자가 선택했으며 사용자 예시(abc@gmail.com 정상, abc@gmail·abc·빈칸 오류)와 일치함을 확인했다. 백엔드 검증 규칙과의 일치 여부는 미정'
- '페이지 배경색(현재 흰색, 시안 회색): UNDECIDED'
- '아이디 허용 문자·최소 길이: UNDECIDED(명세에는 최대 30자만 있음)'
- '생년월일 좁은 화면 표시: UNDECIDED. 360px 폭에서 연도 "2000"이 "20", 390px 폭에서 "200"까지만 보인다. 데스크톱에서도 단위 표시로 선택창 너비가 칸 너비(123.3px)보다 작은 105px로 줄어 "입력창 크기 유지" 조건과 다르다. 해결 방식은 사람 결정 필요(signup-feature-001 E013)'
- '사용자 요청으로 추가한 UI(아이디·이메일 버튼 활성 표시, 생년월일 단위)의 완료 기준 편입 여부: UNDECIDED(분모 변경은 사람 승인 필요, C21)'
acceptance_definition_status: APPROVED
acceptance_approval_refs:
- 'EXPLICIT_REQUEST@2026-10-01T04:18Z: 현재 대화의 사용자 요청(구성·검증·스타일 조건)'
- 'EXPLICIT_REQUEST@2026-10-01T04:19Z: 현재 대화의 사용자 첨부(상세 명세 1~11, 요구사항 표 REG-01~11)'
- 'EXPLICIT_REQUEST@2026-10-01T07:03Z: 현재 대화의 사용자 답변(21개 기준 승인 유지, 분모 21 유지)'
acceptance_criteria:
- ac_id: SIGNUP-AC-01
  condition: 아이디 입력창 속성(명세 1, REG-01)
  expected: HTML maxLength가 30으로 설정되어 있다.
  status: MET
  evidence_refs: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E005 DOM maxLength 30', 'docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E008 maxLength={ID_MAX_LENGTH}(현재 SignUp.jsx 209행)']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-02
  condition: 아이디 중복 확인 클릭(명세 1-1, REG-02)
  expected: 중복이 없으면 "사용 가능한 아이디입니다."(초록), 있으면 "이미 존재하는 아이디입니다."(빨강)가 표시된다.
  status: UNVERIFIED
  evidence_refs: ['API 미연결로 결과 판단 불가. 현재는 "중복 확인 서버가 아직 연결되지 않았습니다." 안내만 표시(E004)']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-03
  condition: 비밀번호 규칙(명세 2, REG-03)
  expected: 영문·숫자·특수문자를 포함한 8~20자만 유효하고 20자를 넘게 입력할 수 없다.
  status: MET
  evidence_refs: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E005 isValidPassword 경계값 검사 통과, DOM maxLength 20', 'docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E013 브라우저에서 규칙 판정(abc 오류, abcd123! 정상) 확인', 'docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E018 사용자가 실제 키보드로 20자 초과 입력이 되지 않음을 확인(E016의 UNVERIFIED 재판정 이후 근거 확보)']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-04
  condition: 비밀번호 입력창 하단 안내(명세 2)
  expected: '"영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요." 문구가 검은색으로 표시된다.'
  status: UNMET
  evidence_refs: ['E005 스크린샷에서 문구 표시 확인', 'SignUp.css .signup-message.is-hint 색 var(--signup-muted)=#8a8f9c(회색, 시안 기준). 명세의 검은색과 다름, 결정 대기(E009)']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-05
  condition: 비밀번호 입력(명세 2)
  expected: 입력 내용이 ●로 가려진다.
  status: MET
  evidence_refs: ['E005 DOM type="password" 확인', 'docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E013 브라우저 입력 후 비밀번호·비밀번호 확인 모두 점 문자로 가려짐(스크린샷 page-2026-10-01T06-22-48-078Z.png). 가림 문자 모양은 브라우저 기본값']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-06
  condition: 규칙에 맞지 않는 비밀번호 입력(명세 2)
  expected: 안내 문구가 빨간색으로 바뀐다.
  status: MET
  evidence_refs: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E013 "abc" 입력 시 안내 문구 is-error rgb(224, 49, 49), "abcd123!" 입력 시 is-hint로 복귀']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-07
  condition: 비밀번호 확인 불일치(명세 3, REG-04)
  expected: '"비밀번호가 일치하지 않습니다." 빨간색 문구가 표시된다.'
  status: MET
  evidence_refs: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E013 확인란 "abcd123"(비밀번호 "abcd123!")에서 빨간 "비밀번호가 일치하지 않습니다." 표시, 일치하면 사라짐']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-08
  condition: 인증번호 발송 클릭(명세 4·4-1, REG-05)
  expected: 이메일 중복이면 "이미 가입된 이메일입니다."(빨강), 아니면 입력한 주소로 인증번호를 발송한다.
  status: UNVERIFIED
  evidence_refs: ['API 미연결. 현재는 "인증 서버가 아직 연결되지 않았습니다." 안내만 표시(E004)', 'docs/worklogs/signup-email-validation-001__jb__20261001T055853Z.md#E003·E012 클릭 시 형식 검사 브라우저 확인. 형식이 올바를 때만 서버 미연결 안내 표시, 이메일 중복 검사·인증번호 발송은 API 미연동으로 미확인']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-09
  condition: 인증번호 확인 클릭(명세 5·5-1, REG-06)
  expected: 일치하면 "인증되었습니다."(초록), 불일치하면 "인증번호를 확인해 주세요."(빨강)가 표시된다.
  status: UNVERIFIED
  evidence_refs: ['API 미연결. 현재는 "인증 서버가 아직 연결되지 않았습니다." 안내만 표시(E004)']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-10
  condition: 이름 입력창 속성(명세 6, REG-07)
  expected: HTML maxLength가 20으로 설정되어 있다.
  status: MET
  evidence_refs: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E005 DOM maxLength 20', '현재 SignUp.jsx 336행 maxLength={NAME_MAX_LENGTH}']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-11
  condition: 성별 선택(명세 7, REG-07)
  expected: 남성·여성·비공개 라디오 버튼으로 하나를 선택한다.
  status: MET
  evidence_refs: ['E005 스냅샷·스크린샷에서 성별 3개 표시', 'SignUp.jsx type="radio" name="gender". 표시 순서는 시안 기준(여성·남성·비공개), 결정 대기(E009)']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-12
  condition: 생년월일 선택(명세 8, REG-07)
  expected: 년·월·일 드롭다운이며 연도는 2009년부터 내림차순이다.
  status: MET
  evidence_refs: ['E005 스크린샷 선택창 3개', 'E005 Node 검사 연도 2009부터 내림차순 110개, 윤년·월별 일 수 통과. 하한 1900은 가정(E009)']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-13
  condition: 닉네임 입력창 속성(명세 9, REG-11)
  expected: HTML maxLength가 30으로 설정되어 있다.
  status: MET
  evidence_refs: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E005 DOM maxLength 30', '현재 SignUp.jsx 435행 maxLength={NICKNAME_MAX_LENGTH}']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-14
  condition: 닉네임 중복 확인 클릭(명세 9-1)
  expected: 중복이 없으면 "사용 가능한 닉네임입니다."(초록), 있으면 "이미 존재하는 닉네임입니다."(빨강)가 표시된다.
  status: UNVERIFIED
  evidence_refs: ['API 미연결. 현재는 "중복 확인 서버가 아직 연결되지 않았습니다." 안내만 표시(E004)']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-15
  condition: 약관 전체 동의 선택(명세 10)
  expected: 약관 체크박스가 모두 선택된다.
  status: MET
  evidence_refs: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E013 전체 동의 체크 시 4개 체크박스 모두 선택, 해제 시 모두 해제']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-16
  condition: 필수 약관 미동의(명세 10, REG-08)
  expected: 약관 영역 상단에 "필수 약관에 동의해주세요."가 표시되고 가입할 수 없다.
  status: UNVERIFIED
  evidence_refs: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E013 필수 약관 해제 시 약관 상자 위에 빨간 "필수 약관에 동의해주세요." 표시, 필수 2개 동의 시 사라짐', '가입 불가 부분은 중복 확인·인증 API가 없어 다른 조건이 항상 미충족이므로 필수 약관 때문에 막히는지 분리 확인하지 못함. 코드상 isSubmittable에 필수 약관 포함']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-17
  condition: 회원가입 버튼 활성화(명세 11)
  expected: 모든 값이 올바르게 입력·확인됐을 때만 활성화된다.
  status: UNVERIFIED
  evidence_refs: ['E005 초기 상태 disabled 확인', '활성화 경로는 중복 확인·인증 API가 필요해 확인 불가']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-18
  condition: 회원가입 버튼 클릭(명세 11, REG-09)
  expected: 회원정보를 저장하고 가입을 완료한다.
  status: UNVERIFIED
  evidence_refs: ['회원가입 API 미연결. 코드상 활성 시 "회원가입 서버가 아직 연결되지 않았습니다." 표시']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-19
  condition: 회원가입 성공(REG-10)
  expected: 로그인 화면으로 이동한다.
  status: UNVERIFIED
  evidence_refs: ['가입 처리 API가 없어 미구현']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-20
  condition: /signup 화면 표시(요청 "첨부한 디자인과 동일한 형태")
  expected: 시안과 같은 항목·순서·형태로 표시된다.
  status: UNVERIFIED
  evidence_refs: ['E005 스크린샷 2개에서 항목·순서 일치 확인', '페이지 배경(흰색/시안 회색) 등 차이가 있어 사람 판단 필요(E009)', 'docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E013 360px·390px 폭에서 생년월일 연도 잘림']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
- ac_id: SIGNUP-AC-21
  condition: 스타일 작성 위치(요청)
  expected: 회원가입 화면 스타일은 styles/SignUp.css에 있고 SignUp.jsx가 이를 import하며 인라인 스타일이 없다.
  status: MET
  evidence_refs: ['SignUp.jsx 2행 import "../styles/SignUp.css"', 'E008 rg "style=" 0건']
  source_revision: 95bf65f6a2ccf79a2cb9cc3a59a8a2b546d4a0c8
components:
- path: youth_guide/src/pages/SignUp.jsx
  symbol: SignUp / isValidPassword / isValidEmail / handleSendCode / isUserIdEmpty / isEmailEmpty / getDaysInMonth / FieldMessage
  role: '회원가입 UI: 화면 구성, 입력 상태 관리, 프론트엔드 검증(이메일 형식 포함), 버튼 활성 표시, 서버 미연결 안내'
  implementation_status: IMPLEMENTING
  remaining_work:
  - SIGNUP-AC-04 결정과 반영
  - SIGNUP-AC-16 가입 불가 부분 확인(API 필요)
  task_refs: [signup-feature-001, signup-email-validation-001]
- path: youth_guide/src/styles/SignUp.css
  symbol: .signup-page / .signup-card / .signup-input / .signup-side-button / .signup-message / .signup-gender / .signup-select / .signup-birth-item / .signup-birth-unit / .signup-terms / .signup-submit
  role: '회원가입 UI: 회원가입 화면 전용 스타일'
  implementation_status: IMPLEMENTING
  remaining_work:
  - 좁은 화면 생년월일 연도 잘림 해결 방식 결정과 수정
  - hover·focus 확인
  - SIGNUP-AC-20 사람 판단
  task_refs: [signup-feature-001]
- path: null
  symbol: null
  role: '회원가입 API 연동: 중복 확인, 이메일 인증, 회원가입 처리, 가입 후 이동'
  implementation_status: NOT_STARTED
  remaining_work:
  - API 명세 결정(UNDECIDED)
  task_refs: []
connections:
- from: {path: youth_guide/src/App.jsx, symbol: 'Route path="/signup"'}
  to: {path: youth_guide/src/pages/SignUp.jsx, symbol: SignUp, external_boundary: null}
  payload: 없음(props 없음)
  contract_ref: 기존 라우팅
  purpose: /signup 경로에서 회원가입 화면을 렌더링한다.
  verification_evidence: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E005']
- from: {path: youth_guide/src/pages/SignUp.jsx, symbol: 'import "../styles/SignUp.css"'}
  to: {path: youth_guide/src/styles/SignUp.css, symbol: .signup-*, external_boundary: null}
  payload: CSS 클래스
  contract_ref: null
  purpose: 회원가입 화면 전용 스타일을 적용한다.
  verification_evidence: ['docs/worklogs/signup-feature-001__jb__20261001T045008Z.md#E005']
- from: {path: youth_guide/src/pages/Login.jsx, symbol: 'button.login-signup onClick navigate("/signup")'}
  to: {path: youth_guide/src/pages/SignUp.jsx, symbol: SignUp, external_boundary: null}
  payload: 없음(경로 이동)
  contract_ref: 기존 라우팅
  purpose: 로그인 화면에서 회원가입 화면으로 이동한다(login-feature-001).
  verification_evidence: ['docs/worklogs/login-feature-001__jb__20260930T121505Z.md#E026 빌드 통과', 'docs/worklogs/login-feature-001__jb__20260930T121505Z.md#E029 브라우저에서 클릭 후 /signup 이동·회원가입 제목 표시 확인']
- from: {path: youth_guide/src/pages/SignUp.jsx, symbol: 중복 확인·인증번호·회원가입 버튼}
  to: {path: null, symbol: null, external_boundary: UNDECIDED}
  payload: UNDECIDED
  contract_ref: null
  purpose: 회원가입 API 연동(미착수). 현재는 외부 호출 없이 서버 미연결 안내만 설정한다.
  verification_evidence: []
verified_flow: /login 회원가입 버튼 클릭 → /signup 이동 → SignUp 렌더링 → SignUp.css 적용 → 모든 입력 항목·버튼 표시와 회원가입 버튼 비활성, 아이디·이메일 입력에 따른 버튼 활성 변화, 비밀번호 규칙·확인 문구, 약관 전체·개별 동의와 필수 약관 안내, 이메일 형식 검사 문구, 데스크톱 폭 생년월일 단위 표시까지 브라우저에서 확인했다. 좁은 화면 표시는 연도 잘림 문제가 있고, 회원가입 버튼 활성화와 API 연동 흐름은 확인하지 않았다.
verification_scope: MIXED
required_checks:
- npm run lint
- vite build
- 브라우저에서 SIGNUP-AC-16(가입 불가) 확인
- 좁은 화면·hover·focus 확인
check_evidence:
- 'npm run lint: 진단 없음, EXIT=0 (worklog E005·E008, signup-email-validation-001 E012 2026-10-01T06:43:33Z)'
- 'vite build: 성공 (worklog E005·E008, signup-email-validation-001 E012 2026-10-01T06:43:33Z)'
- '도우미 함수 경계값: Node로 비밀번호·날짜 규칙 검사 통과 (worklog E005)'
- '브라우저 화면 표시: 초기 화면 스냅샷·스크린샷·DOM 속성 확인 (worklog E005)'
- '브라우저 상호작용: 아이디 버튼 활성 변화, 비밀번호 가림·규칙 위반 표시·확인 불일치 문구, 약관 동작, 생년월일 단위 표시(1920px 정상, 360px·390px 연도 잘림) 확인. Backspace 삭제와 maxLength 입력 차단은 도구 한계로 미확인 (worklog E013)'
- '실제 키보드 확인(사용자 보고): 아이디·이메일을 Backspace로 모두 지우면 중복확인·인증번호 발송 버튼이 다시 비활성화되고, 비밀번호는 20자를 넘게 입력되지 않음. 확인 환경·시각은 미제공 (worklog E018, signup-email-validation-001 E016)'
- '이메일 형식 검증: 빈칸 클릭 시 오류 문구(E003, 버튼 비활성화 전), abc·abc@gmail 클릭 시 오류 문구, abc 입력 중 문구 없음, abc@gmail.com 클릭 시 서버 미연결 안내 확인 (signup-email-validation-001 worklog E003·E012)'
- '인증번호 발송 버튼 활성 표시: 빈칸이면 비활성·연한 색, "a" 입력 시 진한 남색, 다시 비우면 비활성 복귀 확인 (signup-email-validation-001 worklog E012)'
- '로그인 → 회원가입 이동: 로그인 폼의 회원가입 버튼 클릭 시 /signup 이동 확인 (login-feature-001 worklog E029)'
- 'API 연동: 대상 없음(미착수)'
exception_coverage:
- 아이디·닉네임 중복 확인 버튼, 인증번호 발송 버튼, 인증번호 확인 버튼은 입력이 비어 있으면(공백만 입력 포함) 비활성이다.
- 인증번호 발송 버튼은 클릭 시 이메일 형식을 검사하고, 잘못된 형식이면 "이메일 형식이 올바르지 않습니다."를 표시한다. 빈칸에서는 버튼이 비활성이라 클릭할 수 없다.
- 아이디·이메일·인증번호·닉네임 입력을 바꾸면 해당 확인 상태가 초기화된다.
- 연·월을 바꿔 선택한 일이 그 달의 일 수를 넘으면 일 선택을 비운다.
- 백엔드가 없어 확인 결과(성공·실패)는 만들지 않고 서버 미연결 안내만 표시한다.
blockers:
- '회원가입 UI: 명세·시안 불일치와 미정 항목의 사람 결정 대기(worklog E009, APPROVAL_GAP)'
- '회원가입 UI: 좁은 화면 생년월일 연도 잘림의 해결 방식 결정 대기(worklog E013)'
- '회원가입 API 연동: API 명세가 정해지지 않음(UNDECIDED)'
resume_when:
- 사용자가 worklog E009의 결정 요청에 답할 때
- 사용자가 생년월일 좁은 화면 표시의 해결 방식을 정할 때
- 회원가입 관련 API 명세가 사람에 의해 확정될 때
next_action: 사용자 확인을 받는다. 확인 전에는 추가 작업을 하지 않는다.
remaining_work:
- 명세·시안 불일치 결정과 반영
- 생년월일 좁은 화면 연도 잘림 해결
- 사람 검토
- 추가 요청 UI의 완료 기준 편입 여부 결정
- 회원가입 API 연동 방식 결정과 구현
completion_requires: {review_status: APPROVED, integration_status: null, deployment_status: null}
review_evidence: []
integration_evidence: []
deployment_evidence: []
completion_event_ref: null
limitations:
- 변경은 커밋되지 않은 로컬 작업 트리에만 있다.
- 명세의 결과 문구는 상수로 있으나 API가 없어 화면에 표시될 경로가 없다.
- 회원가입 버튼은 API 없이 활성화될 수 없다.
- 실행 모델 식별자는 확인하지 못했다.
handoff: 회원가입 UI 확인은 youth_guide에서 npm run dev 실행 후 /signup에서 입력·버튼·약관을 직접 조작해 진행한다. 실행 중인 5199 서버(PID 66950, 2026-10-01T06:44:21Z에도 LISTEN)는 파일 변경을 반영하지 않으므로 종료 후 새로 띄운다. API 연동은 API 명세가 정해진 뒤 새 작업으로 시작한다.
```
