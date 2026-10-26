import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { PublicProfileDetail } from "../../api/giutHub";
import { createPersonalChatRoom } from "../../api/chat";
import { getProfileActionError, setProfileRecommendation } from "../../api/profileActions";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { Icon } from "../../components/icons";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileShareScreen } from "../GiutHub/ProfileShareScreen";
import { ProfileReportModal } from "../GiutHub/ProfileReportModal";
import { TeamProposalBottomSheet } from "../GiutHub/TeamProposalBottomSheet";
import { toDetailProfileSummary, updateDetailRecommendation } from "../GiutHub/profileDetail";
import { useProfileShare } from "../GiutHub/useProfileShare";
import { profileKeys } from "../GiutHub/profileQueries";
import { S } from "./ProfilePreview.styles";

export function PreviewHeader({ onBack }: { onBack: () => void }) {
  return <S.DetailHeader><S.TopBar><S.IconButton aria-label="뒤로" type="button" onClick={onBack}><Icon name="arrow-left" size={24} /></S.IconButton></S.TopBar></S.DetailHeader>;
}

// 기존 HTTP 경계·공유/신고/제안 화면을 재사용한다. 조회만으로 추천/방 생성/공유 발급을 실행하지 않는다.
export function PreviewProfileActions({ detail, onBack }: { detail: PublicProfileDetail; onBack: () => void }) {
  const navigate = useNavigate();
  const { profile: viewer, isAuthenticated, queryScope } = useAuth();
  const userId = detail.profile.userId;
  const own = viewer?.userId === userId;
  const allowed = isAuthenticated && !own;
  const queryClient = useQueryClient();
  const detailKey = profileKeys.detail(userId, queryScope);
  const recommending = useRef(false);
  const contacting = useRef(false);
  const recommendation = useMutation({
    mutationKey: ["profile-recommendation-update", viewer?.userId, userId],
    mutationFn: (value: boolean) => setProfileRecommendation(userId, value),
    onMutate: () => queryClient.cancelQueries({ queryKey: detailKey }),
    onSuccess: data => queryClient.setQueryData<PublicProfileDetail>(detailKey, previous => updateDetailRecommendation(previous, data)),
    onSettled: () => { recommending.current = false; },
    retry: false,
  });
  const contact = useMutation({
    mutationKey: ["profile-contact", viewer?.userId, userId],
    mutationFn: () => createPersonalChatRoom(userId),
    onSettled: () => { contacting.current = false; },
    retry: false,
  });
  const share = useProfileShare(isAuthenticated, own ? undefined : userId);
  const [menu, setMenu] = useState(false);
  const [proposal, setProposal] = useState(false);
  const [report, setReport] = useState(false);
  const failure = recommendation.isError ? getProfileActionError(recommendation.error, "추천을 변경하지 못했어요. 다시 시도해 주세요.")
    : contact.isError ? getProfileActionError(contact.error, "대화를 시작하지 못했어요. 다시 시도해 주세요.") : "";

  return <>
    <S.DetailHeader><S.TopBar>
      <S.IconButton aria-label="뒤로" type="button" onClick={onBack}><Icon name="arrow-left" size={24} /></S.IconButton>
      <S.TopActions>
        <S.IconButton aria-label="프로필 공유" type="button" onClick={share.openShare}><Icon name="share" size={23} /></S.IconButton>
        <S.IconButton aria-label="프로필 더보기" aria-haspopup="dialog" aria-expanded={menu} type="button" onClick={() => setMenu(true)}><Icon name="more" size={27} weight="bold" /></S.IconButton>
      </S.TopActions>
    </S.TopBar></S.DetailHeader>
    <S.Dock aria-label="프로필에 연락하기">
      {failure && <S.Feedback role="alert">{failure}</S.Feedback>}
      {own && <S.Feedback>내 프로필이에요. 다른 팀원에게 제안과 메시지를 보낼 수 있어요.</S.Feedback>}
      <S.ActionRow>
        <S.Action $primary disabled={!allowed} type="button" onClick={() => setProposal(true)}><Icon name="paper-plane" size={16} weight="fill" />팀 제안 보내기</S.Action>
        <S.Action disabled={!allowed || contact.isPending} type="button" onClick={() => {
          if (!allowed || contacting.current) return;
          contacting.current = true;
          recommendation.reset();
          contact.mutate(undefined, { onSuccess: room => navigate(`/chat/${room.chatRoomId}`) });
        }}><Icon name="chat" size={16} />{contact.isPending ? "연결 중…" : "메시지 보내기"}</S.Action>
        <S.Star $active={detail.recommended} aria-label={detail.recommended ? "프로필 추천 취소" : "프로필 추천하기"} aria-pressed={detail.recommended} disabled={!allowed || recommendation.isPending} type="button" onClick={() => {
          if (!allowed || recommending.current) return;
          recommending.current = true;
          contact.reset();
          recommendation.mutate(!detail.recommended);
        }}><Icon name="star" size={23} weight={detail.recommended ? "fill" : "regular"} /></S.Star>
      </S.ActionRow>
    </S.Dock>
    <BottomSheet open={menu} onClose={() => setMenu(false)} minHeight="auto" variant="compact" title="프로필 더보기" showCloseButton showHeaderDivider={false}>
      <S.Menu>
        <S.MenuButton type="button" onClick={() => { setMenu(false); share.openShare(); }}><Icon name="share" size={22} />프로필 공유</S.MenuButton>
        <S.MenuButton $danger disabled={!allowed} type="button" onClick={() => { setMenu(false); setReport(true); }}><Icon name="shield-check" size={22} />신고하기</S.MenuButton>
      </S.Menu>
    </BottomSheet>
    {proposal && allowed && <TeamProposalBottomSheet targetUserId={userId} profileName={detail.nickname} onClose={() => setProposal(false)} />}
    {report && allowed && <ProfileReportModal userId={userId} onClose={() => setReport(false)} />}
    {share.isOpen && <ProfileShareScreen profile={toDetailProfileSummary(detail)} profileName={detail.nickname} share={share} />}
  </>;
}
