import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getSharedProfile } from "../../api/profileShares";
import { Icon } from "../../components/icons";
import { ProfileShareCard, type ShareCardProfile } from "./ProfileShareCard";
import { buildProfileShareUrl, copyProfileShareUrl, isProfileShareExpired, shareProfileUrl } from "./profileShare";
import { saveProfileShareImage } from "./profileShareImage";
import type { useProfileShare } from "./useProfileShare";
import { exitToBottom, PROFILE_SHARE_MOTION_MS, S } from "./ProfileShareScreen.styles";

export function ProfileShareScreen({ share, profileName, profile }: {
  share: ReturnType<typeof useProfileShare>;
  profileName: string;
  profile?: ShareCardProfile;
}) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const closePhase = useRef<"open" | "closing" | "closed">("open");
  const closeTimer = useRef<number | undefined>(undefined);
  const [isClosing, setIsClosing] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState("");
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [expiredToken, setExpiredToken] = useState("");
  const [pendingAction, setPendingAction] = useState<"share" | "copy" | "save" | null>(null);
  const actionPending = useRef(false);
  const { data: link, isPending, isError, error } = share.issuance;
  const expired = !!link && (expiredToken === link.token || isProfileShareExpired(link));
  const profileUrl = link ? buildProfileShareUrl(link.token, window.location.origin) : "";
  const canShare = share.canIssue && !!link && !isPending && !isError && !expired && !isClosing;
  const profileQuery = useQuery({
    queryKey: ["profile-share-card", link?.token],
    queryFn: ({ signal }) => getSharedProfile(link!.token, signal),
    enabled: canShare && !profile,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
  const cardProfile = profile ?? profileQuery.data;
  const isCopied = canShare && copiedUrl === profileUrl;

  const finishClose = () => {
    if (closePhase.current !== "closing") return;
    closePhase.current = "closed";
    window.clearTimeout(closeTimer.current);
    share.closeShare();
  };

  const requestClose = () => {
    if (closePhase.current !== "open") return;
    closePhase.current = "closing";
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }
    setIsClosing(true);
    // animationend가 전달되지 않아도 닫힌 상태에 갇히지 않도록 보완한다.
    closeTimer.current = window.setTimeout(finishClose, PROFILE_SHARE_MOTION_MS + 80);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!link) return;
    const timer = window.setTimeout(() => setExpiredToken(link.token), Math.max(0, Date.parse(link.expiresAt) - Date.now()));
    return () => window.clearTimeout(timer);
  }, [link]);

  const performAction = async (action: "share" | "copy" | "save") => {
    if (!canShare || !link || actionPending.current || closePhase.current !== "open") return;
    if (isProfileShareExpired(link)) {
      setExpiredToken(link.token);
      return;
    }
    actionPending.current = true;
    setPendingAction(action);
    setActionError("");
    setCopiedUrl("");
    setMessage("");
    try {
      if (action === "save") {
        if (!cardRef.current) return;
        await saveProfileShareImage(cardRef.current, cardProfile?.nickname ?? profileName);
        setMessage("프로필 이미지 다운로드를 시작했어요.");
      } else if (action === "share") {
        const result = await shareProfileUrl(cardProfile?.nickname ?? profileName, profileUrl);
        setCopiedUrl(result === "copied" ? profileUrl : "");
      } else {
        await copyProfileShareUrl(profileUrl);
        setCopiedUrl(profileUrl);
      }
    } catch (error) {
      setActionError(action === "save"
        ? "이미지를 저장하지 못했어요. 사진을 불러올 수 있는지 확인한 뒤 다시 시도해 주세요."
        : error instanceof Error ? error.message : "링크를 공유하지 못했어요. 다시 시도해 주세요.");
    } finally {
      actionPending.current = false;
      setPendingAction(null);
    }
  };

  const needsIssue = !link && !isPending && !isError;

  return (
    <S.Screen
      aria-label="프로필 공유"
      aria-modal="true"
      data-closing={isClosing}
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === exitToBottom.name) finishClose();
      }}
      ref={dialogRef}
    >
      <S.Inner>
        <S.Header>
          <S.CloseButton aria-label="프로필 공유 닫기" disabled={isClosing} onClick={requestClose} type="button" autoFocus>
            <Icon name="x" size={25} weight="regular" />
          </S.CloseButton>
        </S.Header>
        <S.Main>
          {!share.canIssue ? (
            <S.Notice>
              <p>프로필을 공유하려면 로그인해 주세요.</p>
              <S.RetryButton disabled={isClosing} onClick={() => navigate("/login")} type="button">
                로그인하기
              </S.RetryButton>
            </S.Notice>
          ) : (
            <>
              {cardProfile ? <ProfileShareCard cardRef={cardRef} profile={cardProfile} /> : (
                <S.Notice>
                  {profileQuery.isError ? (
                    <>
                      <p role="alert">프로필 정보를 불러오지 못했어요.</p>
                      <S.RetryButton disabled={!canShare || profileQuery.isFetching} onClick={() => void profileQuery.refetch()} type="button">프로필 다시 불러오기</S.RetryButton>
                    </>
                  ) : <p role="status">{canShare ? "프로필을 불러오고 있어요." : "공유 링크가 준비되면 프로필 카드가 표시돼요."}</p>}
                </S.Notice>
              )}
              <S.Actions aria-label="공유 방식 선택">
                <S.ActionButton disabled={!canShare || !!pendingAction} onClick={() => void performAction("share")} type="button">
                  <Icon name="share-export" size={24} weight="regular" />
                  <span>{pendingAction === "share" ? "공유 중…" : "프로필 공유"}</span>
                </S.ActionButton>
                <S.ActionButton disabled={!canShare || !!pendingAction} onClick={() => void performAction("copy")} type="button">
                  <Icon name={isCopied ? "check" : "link"} size={24} weight="regular" />
                  <span>{isCopied ? "복사 완료" : "링크 복사"}</span>
                </S.ActionButton>
                <S.ActionButton disabled={!canShare || !cardProfile || !!pendingAction} onClick={() => void performAction("save")} type="button">
                  <Icon name="download" size={24} weight="regular" />
                  <span>{pendingAction === "save" ? "저장 중…" : "이미지 저장"}</span>
                </S.ActionButton>
              </S.Actions>
              {(isPending || isError || expired || needsIssue || actionError || isCopied || message) && (
                <S.Notice>
                  {isPending && <p role="status">공유 링크를 발급하고 있어요…</p>}
                  {isError && <p role="alert">{error instanceof Error && error.message === "공유 링크 발급 응답을 확인할 수 없어요." ? error.message : "링크를 발급하지 못했어요. 로그인 상태와 네트워크를 확인하고 다시 시도해 주세요."}</p>}
                  {expired && <p role="alert">공유 링크가 만료되었어요. 새 링크를 발급해 주세요.</p>}
                  {(isError || expired || needsIssue) && <S.RetryButton disabled={isPending || isClosing} onClick={share.issueLink} type="button">{expired ? "새 링크 발급" : isError ? "다시 발급" : "링크 발급"}</S.RetryButton>}
                  {actionError && <p role="alert">{actionError}</p>}
                  {isCopied && <p role="status">공유 링크를 복사했어요. 링크는 발급 후 3시간 동안 유효해요.</p>}
                  {message && <p role="status">{message}</p>}
                </S.Notice>
              )}
            </>
          )}
        </S.Main>
      </S.Inner>
    </S.Screen>
  );
}
