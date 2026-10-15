import { Link, useParams } from "react-router-dom";
import { getCertification } from "../../data/certifications";
import "../../styles/CertificationDetail.css";

const QNET_URL = "https://www.q-net.or.kr";

const formatRange = ([start, end]) => (end ? `${start} ~ ${end}` : start);

export default function CertificationDetail() {
  const { certId } = useParams();
  const cert = getCertification(certId);

  if (!cert) {
    return (
      <div className="cert-detail-notfound">
        <p>자격증 정보를 찾을 수 없습니다.</p>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    );
  }

  const round = cert.rounds[0];
  const { schedule } = round;
  const scheduleRows = [
    ["필기 원서접수", schedule.writtenApply],
    ["필기시험", schedule.written],
    ["필기합격 발표", schedule.writtenResult],
    ["실기 원서접수", schedule.practicalApply],
    ["실기시험", schedule.practical],
    ["최종합격 발표", schedule.finalResult],
  ];

  return (
    <article className="cert-detail">
      <header className="cert-detail-header">
        <span className="cert-detail-category">{cert.category}</span>
        <h1 className="cert-detail-title">{cert.name}</h1>
      </header>

      <section
        className="cert-detail-section"
        aria-labelledby="cert-info-title"
      >
        <h2 id="cert-info-title" className="cert-detail-section-title">
          자격정보
        </h2>
        <dl className="cert-detail-rows">
          <div className="cert-detail-row">
            <dt>자격종목</dt>
            <dd>{cert.name}</dd>
          </div>
          <div className="cert-detail-row">
            <dt>등급</dt>
            <dd>{cert.grade}</dd>
          </div>
          <div className="cert-detail-row">
            <dt>직무분야</dt>
            <dd>{cert.field}</dd>
          </div>
        </dl>
      </section>

      <section
        className="cert-detail-section"
        aria-labelledby="cert-schedule-title"
      >
        <h2 id="cert-schedule-title" className="cert-detail-section-title">
          시험일정
        </h2>
        <p className="cert-detail-round">{round.label}</p>
        <dl className="cert-detail-rows is-schedule">
          {scheduleRows.map(([label, dates]) => (
            <div key={label} className="cert-detail-row">
              <dt>{label}</dt>
              <dd>{formatRange(dates)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="cert-detail-actions">
        {/* TODO(관심 자격증): 로그인 연동 후 관심 자격증 등록 API 연결 */}
        <button type="button" className="cert-detail-primary">
          관심 자격증으로 등록
        </button>
        <a
          className="cert-detail-secondary"
          href={QNET_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          원서 접수하러가기 ↗
        </a>
      </div>
      <p className="cert-detail-note">원서 접수는 큐넷(Q-net)으로 이동해요</p>
    </article>
  );
}
