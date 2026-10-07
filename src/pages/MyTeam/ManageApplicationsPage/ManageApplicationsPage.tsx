import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileRoleName } from "../../../api/profiles";
import { fetchTeamApplications, fetchTeamDetail } from "../../../api/teams";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { PillButton } from "../../../components/PillButton";
import { S } from "./ManageApplicationsPage.styles";

const tones = ["blue", "purple", "success"] as const;

const formatAppliedAt = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "지원일 미정";

  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export function ManageApplicationsPage() {
  const navigate = useNavigate();
  const { teamId = "" } = useParams();
  const numericTeamId = Number(teamId);
  const [activeFilter, setActiveFilter] = useState("전체");
  const {
    data: applications = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["teamApplications", numericTeamId],
    queryFn: () => fetchTeamApplications(numericTeamId),
    enabled: Number.isInteger(numericTeamId) && numericTeamId > 0,
  });
  const { data: team } = useQuery({
    queryKey: ["team", numericTeamId],
    queryFn: () => fetchTeamDetail(numericTeamId),
    enabled: Number.isInteger(numericTeamId) && numericTeamId > 0,
  });
  const filters = useMemo(() => {
    const roleCounts = applications.reduce<Record<string, number>>((counts, application) => {
      counts[application.roleCode] = (counts[application.roleCode] ?? 0) + 1;
      return counts;
    }, {});

    return [
      { code: "전체", label: "전체", count: applications.length },
      ...Object.entries(roleCounts).map(([code, count]) => ({
        code,
        label: getProfileRoleName(code),
        count,
      })),
    ];
  }, [applications]);
  const visibleApplications = activeFilter === "전체"
    ? applications
    : applications.filter((application) => application.roleCode === activeFilter);
  const handleBack = () => {
    if (!team) {
      navigate(-1);
      return;
    }

    navigate(`/contests/${team.competitionId}/teams/${numericTeamId}/manage`, {
      replace: true,
    });
  };

  return (
    <S.Page>
      <PageHeader onBack={handleBack} title="받은 지원" />

      <S.Content>
        <S.Summary>
          <S.SummaryTitle>
            {team?.name ?? "팀"} · 받은 지원 {applications.length}
          </S.SummaryTitle>
        </S.Summary>

        {!isLoading && !isError && applications.length > 0 && (
          <S.FilterList aria-label="지원자 직무 필터">
            {filters.map((filter) => (
              <PillButton
                active={activeFilter === filter.code}
                tone="dark"
                aria-pressed={activeFilter === filter.code}
                key={filter.code}
                onClick={() => setActiveFilter(filter.code)}
                type="button"
              >
                {filter.label} {filter.count}
              </PillButton>
            ))}
          </S.FilterList>
        )}

        {isLoading && <S.StateMessage>지원 목록을 불러오는 중이에요.</S.StateMessage>}
        {isError && <S.StateMessage>지원 목록을 불러오지 못했어요.</S.StateMessage>}
        {!isLoading && !isError && applications.length === 0 && (
          <S.StateMessage>아직 대기 중인 지원자가 없어요.</S.StateMessage>
        )}

        <S.ApplicantList>
          {visibleApplications.map((application, index) => {
            const firstAnswer = [...(application.answers ?? [])]
              .sort((first, second) => first.displayOrder - second.displayOrder)[0];
            const applicantName = `지원자 #${application.userId}`;

            return (
              <S.ApplicantCard key={application.applicationId}>
                <S.ApplicantHeader>
                  <S.Avatar $tone={tones[index % tones.length]}>
                    {String(application.userId).slice(-1)}
                  </S.Avatar>
                  <S.Identity>
                    <S.NameRow>
                      <S.Name>{applicantName}</S.Name>
                    </S.NameRow>
                    <S.ProfileLine>{getProfileRoleName(application.roleCode)} 지원</S.ProfileLine>
                  </S.Identity>
                </S.ApplicantHeader>

                <S.ApplicantIntroductionLabel>간단한 자기소개</S.ApplicantIntroductionLabel>
                <S.ApplicantMessage>{application.message || "작성한 소개가 없어요."}</S.ApplicantMessage>
                {firstAnswer && (
                  <>
                    <S.ReasonLabel>{firstAnswer.question}</S.ReasonLabel>
                    <S.ApplicantAnswer>{firstAnswer.answer}</S.ApplicantAnswer>
                  </>
                )}
                <S.ApplicationMeta>
                  <S.ApplicationMetaItem>
                    <S.ApplicationMetaLabel>지원 포지션</S.ApplicationMetaLabel>
                    <S.ApplicationMetaValue>
                      {getProfileRoleName(application.roleCode)}
                    </S.ApplicationMetaValue>
                  </S.ApplicationMetaItem>
                  <S.ApplicationMetaItem>
                    <S.ApplicationMetaLabel>지원 일시</S.ApplicationMetaLabel>
                    <S.ApplicationMetaValue>
                      {formatAppliedAt(application.appliedAt)}
                    </S.ApplicationMetaValue>
                  </S.ApplicationMetaItem>
                </S.ApplicationMeta>
                <S.DetailButton
                  aria-label={`${applicantName} 지원서 상세보기`}
                  onClick={() => navigate(
                    `/my-team/${numericTeamId}/applications/${application.applicationId}`,
                  )}
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
