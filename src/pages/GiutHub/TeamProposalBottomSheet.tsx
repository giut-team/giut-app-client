import { useId, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { canInviteToTeam, getInvitationRecruitments, getInvitationRoleNames, getMyInvitationTeams, getTeamInvitationError, sendTeamInvitation } from "../../api/teamInvitations";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { Icon } from "../../components/icons";
import { useAuth } from "../../contexts/AuthContext";
import { S } from "./GiutHubProfilePage.styles";

export function TeamProposalBottomSheet({ profileName, targetUserId, onClose }: {
  profileName: string;
  targetUserId: number;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { profile: viewer, isAuthenticated } = useAuth();
  const canPropose = isAuthenticated && Number.isSafeInteger(targetUserId) && targetUserId > 0 && viewer?.userId !== targetUserId;
  const queryClient = useQueryClient();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [selectedRoleCode, setSelectedRoleCode] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const messageId = useId();
  const inFlight = useRef(false);
  const teams = useQuery({
    queryKey: ["team-proposal", "my-teams", viewer?.userId],
    queryFn: ({ signal }) => getMyInvitationTeams(signal),
    enabled: canPropose, retry: false, staleTime: 0, gcTime: 0,
  });
  const leaderTeams = teams.data?.filter(team => team.myRole === "LEADER") ?? [];
  const selectedTeam = !teams.isError ? leaderTeams.find(team => team.teamId === selectedTeamId) : undefined;
  const teamAvailable = !!selectedTeam && canInviteToTeam(selectedTeam);
  const recruitments = useQuery({
    queryKey: ["team-proposal", "recruitments", viewer?.userId, selectedTeamId],
    queryFn: ({ signal }) => getInvitationRecruitments(selectedTeamId!, signal),
    enabled: canPropose && teamAvailable, retry: false, staleTime: 0, gcTime: 0,
  });
  const roles = useQuery({
    queryKey: ["team-proposal", "role-names"],
    queryFn: ({ signal }) => getInvitationRoleNames(signal),
    enabled: canPropose && teamAvailable, retry: false, staleTime: 10 * 60 * 1000,
  });
  const openRecruitments = !recruitments.isError
    ? (recruitments.data ?? []).filter(item => item.requiredCount > item.filledCount) : [];
  const selectedRole = openRecruitments.find(item => item.roleCode === selectedRoleCode);
  const loadingPositions = recruitments.isPending || roles.isPending;
  const positionError = recruitments.isError || roles.isError;
  const canSend = canPropose && teamAvailable && !!selectedRole && !!roles.data?.[selectedRole.roleCode]
    && !teams.isFetching && !recruitments.isFetching && !roles.isFetching && !positionError && message.trim().length <= 500;
  const invitation = useMutation({
    mutationKey: ["team-proposal", "send", viewer?.userId, targetUserId],
    mutationFn: (input: { teamId: number; roleCode: string; message: string }) => sendTeamInvitation(input.teamId, { inviteeUserId: targetUserId, roleCode: input.roleCode, message: input.message }),
    retry: false,
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ["giut-hub", "profile", targetUserId] }); },
    onError: () => { void teams.refetch(); void recruitments.refetch(); },
    onSettled: () => { inFlight.current = false; },
  });
  const close = () => { if (!inFlight.current && !invitation.isPending) onClose(); };
  const send = () => {
    if (!canSend || !selectedTeam || !selectedRole || inFlight.current || invitation.isPending || invitation.isSuccess) return;
    inFlight.current = true;
    invitation.mutate({ teamId: selectedTeam.teamId, roleCode: selectedRole.roleCode, message });
  };
  const showTeamForm = canPropose && !teams.isPending && !teams.isError && leaderTeams.length > 0 && !invitation.isSuccess;

  return (
    <BottomSheet open dragDisabled={invitation.isPending} title={invitation.isSuccess ? "제안을 보냈어요" : "팀 제안 보내기"}
      footerVariant="action" minHeight={showTeamForm ? "min(76svh, 570px)" : "auto"} onClose={close} showHeaderDivider={false} variant="compact"
      footer={invitation.isSuccess ? (
        <S.ProposalConfirmButton onClick={close} type="button">확인</S.ProposalConfirmButton>
      ) : (
        <S.ProposalFooter>
          <S.ProposalCancelButton disabled={invitation.isPending} onClick={close} type="button">취소</S.ProposalCancelButton>
          <S.ProposalConfirmButton disabled={!canSend || invitation.isPending} onClick={send} type="button">
            {invitation.isPending ? "제안 보내는 중…" : "이 팀으로 제안 보내기"}
          </S.ProposalConfirmButton>
        </S.ProposalFooter>
      )}>
      <S.ProposalBody aria-busy={invitation.isPending}>
        {invitation.isSuccess ? (
          <S.ProposalState role="status"><Icon name="check" size={28} /><strong>{profileName}님에게 팀 합류 제안을 보냈어요.</strong><p>상대방의 응답을 기다려 주세요.</p></S.ProposalState>
        ) : !canPropose ? (
          <S.ProposalState><strong>{!isAuthenticated ? "로그인 후 제안할 수 있어요" : "본인에게는 제안할 수 없어요"}</strong>
            {!isAuthenticated && <S.ProposalCancelButton onClick={() => navigate("/login")} type="button">로그인하기</S.ProposalCancelButton>}
          </S.ProposalState>
        ) : (
          <>
            <S.ProposalIntro>
              <S.ProposalHeading>어느 팀으로 제안할까요?</S.ProposalHeading>
              <S.ProposalDescription>{profileName}님에게 보낼 팀을 골라주세요. 내가 팀장인 팀만 보여요.</S.ProposalDescription>
            </S.ProposalIntro>
            {teams.isError ? (
              <S.ProposalState role="alert"><strong>팀 목록을 불러오지 못했어요</strong><p>{getTeamInvitationError(teams.error, "load")}</p>
                <S.ProposalCancelButton disabled={teams.isFetching} onClick={() => void teams.refetch()} type="button">{teams.isFetching ? "불러오는 중…" : "다시 불러오기"}</S.ProposalCancelButton>
              </S.ProposalState>
            ) : teams.isPending ? <S.ProposalState role="status">내 팀을 불러오고 있어요…</S.ProposalState>
              : leaderTeams.length === 0 ? (
                <S.ProposalState><Icon name="users" size={28} /><strong>제안할 팀이 아직 없어요</strong><p>팀장으로 참여 중인 팀이 있어야 제안할 수 있어요.</p>
                  <S.ProposalCancelButton onClick={() => navigate("/my-team")} type="button">내 팀 보기</S.ProposalCancelButton>
                </S.ProposalState>
              ) : (
                <>
                  <S.ProposalTeamList aria-label="제안할 팀 선택">
                    {leaderTeams.map(team => {
                      const selected = team.teamId === selectedTeamId;
                      const available = canInviteToTeam(team);
                      return <S.ProposalTeamCard $disabled={!available} $selected={selected && available} aria-pressed={selected && available}
                        disabled={!available || invitation.isPending} key={team.teamId} type="button" onClick={() => {
                          if (inFlight.current) return;
                          setSelectedTeamId(team.teamId); setSelectedRoleCode(null); invitation.reset();
                        }}>
                        <S.ProposalRadio $selected={selected && available} aria-hidden="true">{selected && available && <Icon name="check" size={13} weight="bold" />}</S.ProposalRadio>
                        <S.ProposalTeamCopy><strong>{team.name}</strong><small>팀장 · {team.currentMemberCount}/{team.maxMemberCount}명</small></S.ProposalTeamCopy>
                        {!available && <em>{team.status === "RECRUITING" ? "인원 마감" : "모집 마감"}</em>}
                      </S.ProposalTeamCard>;
                    })}
                  </S.ProposalTeamList>
                  <S.ProposalDescription>모집 중이고 자리가 남은 팀만 선택할 수 있어요.</S.ProposalDescription>
                </>
              )}
            {teamAvailable && (
              <S.ProposalField>
                <S.ProposalPositionTitle>제안할 포지션</S.ProposalPositionTitle>
                {positionError ? <S.ProposalState role="alert"><p>{getTeamInvitationError(recruitments.error ?? roles.error, "load")}</p>
                  <S.ProposalCancelButton disabled={recruitments.isFetching || roles.isFetching} onClick={() => { void recruitments.refetch(); void roles.refetch(); }} type="button">포지션 다시 불러오기</S.ProposalCancelButton>
                </S.ProposalState> : loadingPositions ? <S.ProposalDescription role="status">모집 포지션을 불러오고 있어요…</S.ProposalDescription>
                  : openRecruitments.length === 0 ? <S.ProposalState>모집 중인 포지션이 없어요. 다른 팀을 선택해 주세요.</S.ProposalState> : (
                    <>
                      <S.ProposalPositionList aria-label="제안할 포지션 선택">
                        {openRecruitments.map(item => <S.ProposalPosition $selected={selectedRoleCode === item.roleCode} aria-pressed={selectedRoleCode === item.roleCode}
                          disabled={invitation.isPending || !roles.data?.[item.roleCode]} key={item.recruitmentId} type="button" onClick={() => {
                            if (inFlight.current) return;
                            setSelectedRoleCode(item.roleCode); invitation.reset();
                          }}>
                          {roles.data?.[item.roleCode] ?? "이름을 확인할 수 없는 포지션"} · {item.requiredCount - item.filledCount}명
                        </S.ProposalPosition>)}
                      </S.ProposalPositionList>
                      {openRecruitments.some(item => !roles.data?.[item.roleCode]) && <S.ProposalCancelButton disabled={roles.isFetching} onClick={() => void roles.refetch()} type="button">포지션 이름 다시 불러오기</S.ProposalCancelButton>}
                    </>
                  )}
              </S.ProposalField>
            )}
            {selectedRole && !positionError && teamAvailable && (
              <S.ProposalField>
                <S.ProposalMessageLabel htmlFor={messageId}>제안 메시지 <span>(선택)</span></S.ProposalMessageLabel>
                <S.ProposalMessageInput aria-describedby={`${messageId}-count`} disabled={invitation.isPending} id={messageId} maxLength={500}
                  onChange={event => setMessage(event.target.value)} placeholder="함께하고 싶은 이유를 짧게 전해보세요." rows={3} value={message} />
                <S.ProposalDescription id={`${messageId}-count`}>{message.length}/500자</S.ProposalDescription>
              </S.ProposalField>
            )}
            {invitation.isError && <S.ProposalError role="alert">{getTeamInvitationError(invitation.error, "send")}</S.ProposalError>}
          </>
        )}
      </S.ProposalBody>
    </BottomSheet>
  );
}
