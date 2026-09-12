import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { PillButton } from "../../../components/PillButton";
import { applicants, type Applicant } from "../myTeam.data";
import { S } from "./ManageApplicationsPage.styles";

type ApplicantFilter = "전체" | Applicant["filter"];

const filters: { label: ApplicantFilter; count: number }[] = [
  { label: "전체", count: applicants.length },
  { label: "백엔드 개발자", count: 1 },
  { label: "데이터 엔지니어", count: 1 },
  { label: "UI 디자이너", count: 1 },
];

export function ManageApplicationsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ApplicantFilter>("전체");
  const [decisions, setDecisions] = useState<Record<string, "accepted" | "rejected">>({});

  const visibleApplicants =
    activeFilter === "전체"
      ? applicants
      : applicants.filter((applicant) => applicant.filter === activeFilter);

  const updateDecision = (
    applicant: Applicant,
    decision: "accepted" | "rejected",
  ) => {
    setDecisions((current) => ({ ...current, [applicant.name]: decision }));
  };

  return (
    <S.Page>
      <PageHeader
        onBack={() => navigate(-1)}
        title="받은 지원"
      />

      <S.Content>
        <S.Summary>
          <S.SummaryTitle>데이터로 서울을 · 받은 지원 3</S.SummaryTitle>
        </S.Summary>

        <S.FilterList aria-label="지원자 직군 필터">
          {filters.map((filter) => (
            <PillButton
              active={activeFilter === filter.label}
              tone="dark"
              aria-pressed={activeFilter === filter.label}
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              type="button"
            >
              {filter.label} {filter.count}
            </PillButton>
          ))}
        </S.FilterList>

        <S.ApplicantList>
          {visibleApplicants.map((applicant) => {
            const decision = decisions[applicant.name];

            return (
              <S.ApplicantCard key={applicant.name}>
                <S.ApplicantHeader>
                  <S.Avatar $tone={applicant.tone}>{applicant.initial}</S.Avatar>
                  <S.Identity>
                    <S.NameRow>
                      <S.Name>{applicant.name}</S.Name>
                      <S.VerifiedBadge>학교 인증</S.VerifiedBadge>
                    </S.NameRow>
                    <S.ProfileLine>
                      {applicant.school} · {applicant.role} 지원
                    </S.ProfileLine>
                  </S.Identity>
                  <S.ReceivedAt>{applicant.receivedAt}</S.ReceivedAt>
                </S.ApplicantHeader>

                <S.ApplicantMessage>{applicant.message}</S.ApplicantMessage>
                <S.ReasonLabel>{applicant.reason}</S.ReasonLabel>
                <S.ApplicantAnswer>{applicant.answer}</S.ApplicantAnswer>

                {decision ? (
                  <S.Decision $accepted={decision === "accepted"}>
                    {decision === "accepted" ? "수락한 지원이에요" : "거절한 지원이에요"}
                  </S.Decision>
                ) : (
                  <S.ApplicantActions>
                    <S.RejectButton
                      onClick={() => updateDecision(applicant, "rejected")}
                      tone="secondary"
                      type="button"
                    >
                      거절
                    </S.RejectButton>
                    <S.AcceptButton
                      onClick={() => updateDecision(applicant, "accepted")}
                      type="button"
                    >
                      수락
                    </S.AcceptButton>
                  </S.ApplicantActions>
                )}
                <S.DetailButton
                  aria-label={`${applicant.name} 지원서 상세보기`}
                  onClick={() =>
                    navigate(`/my-team/applications/${applicant.id}`)
                  }
                  type="button"
                >
                  <Icon name="caret-right" size={13} weight="bold" />
                </S.DetailButton>
              </S.ApplicantCard>
            );
          })}
        </S.ApplicantList>
      </S.Content>
    </S.Page>
  );
}
