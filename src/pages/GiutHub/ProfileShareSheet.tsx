import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { Icon } from "../../components/icons";
import { buildProfileShareUrl, copyProfileShareUrl, isProfileShareExpired, shareProfileUrl } from "./profileShare";
import type { useProfileShare } from "./useProfileShare";
import { useAuth } from "../../contexts/AuthContext";
import { S } from "./GiutHubProfilePage.styles";

export function ProfileShareSheet({ share, profileName }: {
  share: ReturnType<typeof useProfileShare>;
  profileName: string;
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [copiedUrl, setCopiedUrl] = useState("");
  const [actionError, setActionError] = useState("");
  const [expiredToken, setExpiredToken] = useState("");
  const actionPending = useRef(false);
  const { data: link, isPending, isError, error } = share.issuance;
  const expired = !!link && (expiredToken === link.token || isProfileShareExpired(link));
  const profileUrl = link ? buildProfileShareUrl(link.token, window.location.origin) : "";
  const canShare = share.canIssue && !!link && !isPending && !isError && !expired;
  const isCopied = canShare && copiedUrl === profileUrl;

  useEffect(() => {
    if (!link) return;
    const timer = window.setTimeout(() => setExpiredToken(link.token), Math.max(0, Date.parse(link.expiresAt) - Date.now()));
    return () => window.clearTimeout(timer);
  }, [link]);

  const performShare = async (native: boolean) => {
    if (!canShare || !link || actionPending.current) return;
    if (isProfileShareExpired(link)) {
      setExpiredToken(link.token);
      return;
    }
    actionPending.current = true;
    setActionError("");
    setCopiedUrl("");
    try {
      if (native) {
        const result = await shareProfileUrl(profileName, profileUrl);
        setCopiedUrl(result === "copied" ? profileUrl : "");
      } else {
        await copyProfileShareUrl(profileUrl);
        setCopiedUrl(profileUrl);
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "링크를 공유하지 못했어요. 다시 시도해 주세요.");
    } finally {
      actionPending.current = false;
    }
  };

  return (
    <BottomSheet minHeight="auto" onClose={share.closeShare} open showHeaderDivider={false} variant="compact">
      <S.ShareHeading>프로필 공유</S.ShareHeading>
      {!share.canIssue ? (
        <>
          <S.ShareDescription>공유 링크는 로그인한 본인의 프로필에서 발급할 수 있어요.</S.ShareDescription>
          <S.CopyButton onClick={() => navigate(isAuthenticated ? "/my-profile" : "/login")} type="button">{isAuthenticated ? "내 프로필로 이동" : "로그인하기"}</S.CopyButton>
        </>
      ) : (
        <>
          <S.ShareDescription>{profileName} 님의 프로필을 팀원에게 공유할 수 있어요. 링크는 발급 후 3시간 동안 유효해요.</S.ShareDescription>
          <S.ShareLinkBox>
            <code aria-label="프로필 공유 링크">{isPending ? "공유 링크를 발급하고 있어요…" : canShare ? profileUrl : "공유 링크를 발급해 주세요."}</code>
            <S.CopyButton disabled={!canShare} onClick={() => void performShare(false)} type="button">{isCopied && canShare ? "복사됨" : "복사"}</S.CopyButton>
          </S.ShareLinkBox>
          {isError && <S.ShareDescription role="alert">{error instanceof Error && error.message === "공유 링크 발급 응답을 확인할 수 없어요." ? error.message : "링크를 발급하지 못했어요. 로그인 상태와 네트워크를 확인하고 다시 시도해 주세요."}</S.ShareDescription>}
          {expired && <S.ShareDescription role="alert">공유 링크가 만료되었어요. 새 링크를 발급해 주세요.</S.ShareDescription>}
          {(isError || expired) && <S.CopyButton disabled={isPending} onClick={share.issueLink} type="button">{expired ? "새 링크 발급" : "다시 발급"}</S.CopyButton>}
          {!link && !isPending && !isError && <S.CopyButton onClick={share.issueLink} type="button">링크 발급</S.CopyButton>}
          {actionError && <S.ShareDescription role="alert">{actionError}</S.ShareDescription>}
          {isCopied && canShare && <S.ShareDescription role="status">공유 링크를 복사했어요.</S.ShareDescription>}
          <S.ShareChannelList aria-label="공유 방식 선택">
            <S.ShareChannel disabled={!canShare} onClick={() => void performShare(true)} type="button">
              <S.KakaoMark><Icon name="chat" size={23} weight="fill" /></S.KakaoMark><span>카카오톡</span>
            </S.ShareChannel>
            <S.ShareChannel disabled={!canShare} onClick={() => void performShare(false)} type="button">
              <S.ShareChannelIcon><Icon name="link" size={24} weight="bold" /></S.ShareChannelIcon><span>링크 공유</span>
            </S.ShareChannel>
            <S.ShareChannel disabled={!canShare} onClick={() => void performShare(true)} type="button">
              <S.ShareChannelIcon><Icon name="share" size={24} weight="bold" /></S.ShareChannelIcon><span>기타</span>
            </S.ShareChannel>
          </S.ShareChannelList>
        </>
      )}
      <S.ShareCloseButton onClick={share.closeShare} type="button">닫기</S.ShareCloseButton>
    </BottomSheet>
  );
}
