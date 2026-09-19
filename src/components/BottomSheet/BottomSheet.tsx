import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { OverlayShell } from "../OverlayShell/OverlayShell";
import { Icon } from "../icons";
import { S } from "./BottomSheet.styles";

const DRAG_CLOSE_THRESHOLD = 120; // 바텀 시트를 120px 아래로 드래그하면 닫히도록 설정

export type BottomSheetVariant = "default" | "compact";
export type BottomSheetFooterVariant = "note" | "action";
export type DecisionMode = "accept" | "reject";
export type ApplicationCancelState = "confirm" | "complete";

export type BottomSheetOption<T extends string> = {
  value: T;
  label: string;
};

type BottomSheetProps = {
  open: boolean;
  title?: string;
  eyebrow?: string;
  showCloseButton?: boolean; // 닫기 버튼 표시 여부
  showHeaderDivider?: boolean;
  variant?: BottomSheetVariant;
  footerVariant?: BottomSheetFooterVariant;
  minHeight?: string;
  onClose: () => void;
  children?: ReactNode; // 바텀 시트의 내용
  footer?: ReactNode;
  decisionMode?: DecisionMode;
  applicantName?: string;
  applicantRole?: string;
  onDecisionConfirm?: () => void;
  applicationCancelState?: ApplicationCancelState;
  applicationTeamName?: string;
  applicationPosition?: string;
  onApplicationCancelConfirm?: () => void;
  onApplicationCancelComplete?: () => void;
};

type BottomSheetOptionListProps<T extends string> = {
  options: BottomSheetOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

const rejectReasons = [
  "이미 인원이 찼어요",
  "포지션이 맞지 않아요",
  "활동 시간이 안 맞아요",
  "직접 입력",
];

function DecisionContent({
  applicantName,
  applicantRole,
  mode,
  completed,
}: {
  applicantName: string;
  applicantRole: string;
  mode: DecisionMode;
  completed: boolean;
}) {
  const [selectedRole, setSelectedRole] = useState(applicantRole);
  const [selectedReason, setSelectedReason] = useState("");
  const isAccepting = mode === "accept";

  if (completed) {
    return (
      <>
        <S.DecisionIcon $mode={mode}>
          <Icon name={isAccepting ? "check" : "x"} size={22} weight="bold" />
        </S.DecisionIcon>
        <S.DecisionTitle>
          {isAccepting
            ? `${applicantName}님을\n수락했습니다`
            : `${applicantName}님의 지원을\n거절했습니다`}
        </S.DecisionTitle>
        <S.DecisionDescription>
          {isAccepting
            ? `${applicantRole} 포지션으로 수락했고, 지원자에게 결과 알림을 보냈습니다.`
            : "지원자에게 결과 알림을 보냈습니다."}
        </S.DecisionDescription>
      </>
    );
  }

  return (
    <>
      <S.DecisionIcon $mode={mode}>
        <Icon name={isAccepting ? "check" : "x"} size={22} weight="bold" />
      </S.DecisionIcon>
      <S.DecisionTitle>{`${applicantName}님을\n${
        isAccepting
          ? `${applicantRole}로 수락할까요?`
          : "지원자의 지원을 거절할까요?"
      }`}</S.DecisionTitle>
      <S.DecisionDescription>
        {isAccepting
          ? `${applicantName}님은 ${applicantRole} 포지션에 지원했어요. 선택한 포지션으로 합류합니다.`
          : "거절하면 목록에서 사라지고 다시 되돌릴 수 없어요. 지원자에게는 결과만 전달되고, 사유는 선택해도 매칭에 전달되지 않습니다."}
      </S.DecisionDescription>

      {isAccepting ? (
        <>
          <S.DecisionFieldHeader>
            <S.DecisionFieldLabel>포지션 선택</S.DecisionFieldLabel>
            <S.DecisionFieldHint>2개 지원</S.DecisionFieldHint>
          </S.DecisionFieldHeader>
          <S.DecisionOptionGroup aria-label="수락 포지션 선택">
            {[applicantRole, "프론트엔드 개발자"].map((role) => (
              <S.DecisionOptionButton
                $selected={selectedRole === role}
                aria-pressed={selectedRole === role}
                key={role}
                onClick={() => setSelectedRole(role)}
                type="button"
              >
                {selectedRole === role && (
                  <Icon name="check" size={12} weight="bold" />
                )}
                {role}
              </S.DecisionOptionButton>
            ))}
          </S.DecisionOptionGroup>
          <S.DecisionSummary>
            <S.DecisionSummaryRow>
              <span>팀 인원</span>
              <strong>3명 → 4명</strong>
            </S.DecisionSummaryRow>
            <S.DecisionSummaryRow>
              <span>남은 자리</span>
              <strong>2건</strong>
            </S.DecisionSummaryRow>
          </S.DecisionSummary>
        </>
      ) : (
        <>
          <S.DecisionFieldHeader>
            <S.DecisionFieldLabel>거절 사유 · 선택</S.DecisionFieldLabel>
          </S.DecisionFieldHeader>
          <S.DecisionReasonList aria-label="거절 사유 선택">
            {rejectReasons.map((reason) => (
              <S.DecisionReasonButton
                $selected={selectedReason === reason}
                aria-pressed={selectedReason === reason}
                key={reason}
                onClick={() => setSelectedReason(reason)}
                type="button"
              >
                {reason}
              </S.DecisionReasonButton>
            ))}
          </S.DecisionReasonList>
        </>
      )}
    </>
  );
}

function ApplicationCancelContent({
  state,
  teamName,
  position,
}: {
  state: ApplicationCancelState;
  teamName: string;
  position: string;
}) {
  const isComplete = state === "complete";

  return (
    <>
      <S.ApplicationCancelIcon $complete={isComplete}>
        <Icon name={isComplete ? "check" : "x"} size={22} weight="bold" />
      </S.ApplicationCancelIcon>
      <S.ApplicationCancelTitle>
        {isComplete ? "지원을 취소했어요" : "이 팀 지원을\n취소할까요?"}
      </S.ApplicationCancelTitle>
      <S.ApplicationCancelDescription $hidden={!isComplete}>
        {isComplete
          ? "모집 마감 전까지는 언제든 다시 지원할 수 있어요."
          : "취소하면 팀장에게 전달된 지원서가 사라지고, 작성한 답변도 저장되지 않아요. 더는 지원하려면 처음부터 작성해야 해요."}
      </S.ApplicationCancelDescription>

      {!isComplete && (
        <>
          <S.ApplicationCancelDetails>
            <S.ApplicationCancelDetailRow>
              <span>지원 팀</span>
              <strong>{teamName}</strong>
            </S.ApplicationCancelDetailRow>
            <S.ApplicationCancelDetailRow>
              <span>지원 포지션</span>
              <strong>{position}</strong>
            </S.ApplicationCancelDetailRow>
            <S.ApplicationCancelDetailRow>
              <span>진행 상태</span>
              <S.ApplicationCancelPending>
                팀장 검토 중
              </S.ApplicationCancelPending>
            </S.ApplicationCancelDetailRow>
          </S.ApplicationCancelDetails>
          <S.ApplicationCancelNotice>
            취소 사유를 팀장에게 따로 알리지 않고, 지원 목록에서 사라져요.
            모집이 열려 있으면 나중에 다시 지원할 수 있어요.
          </S.ApplicationCancelNotice>
        </>
      )}
    </>
  );
}

export function BottomSheet({
  open,
  title,
  eyebrow,
  showCloseButton = false,
  showHeaderDivider = true,
  variant = "default",
  footerVariant = "note",
  minHeight,
  onClose,
  children,
  footer,
  decisionMode,
  applicantName,
  applicantRole,
  onDecisionConfirm,
  applicationCancelState,
  applicationTeamName,
  applicationPosition,
  onApplicationCancelConfirm,
  onApplicationCancelComplete,
}: BottomSheetProps) {
  const titleId = useId();
  const dragStartY = useRef<number | null>(null); // 드래그를 시작한 시점의 y 좌표 저장
  const currentDragOffset = useRef(0); // 현재 얼마나 아래로 이동했는지 저장
  const isClosingByDrag = useRef(false); // 드래그로 닫히는 중인지 구분함
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDecisionComplete, setIsDecisionComplete] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      dragStartY.current = null;

      if (!open && isClosingByDrag.current) return;

      currentDragOffset.current = 0;
      setDragOffset(0);
      setIsDragging(false);

      if (open) {
        isClosingByDrag.current = false;
        setIsDecisionComplete(false);
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [open, decisionMode]);

  const handleDecisionConfirm = () => {
    setIsDecisionComplete(true);
  };

  const handleDecisionComplete = () => {
    onDecisionConfirm?.();
    onClose();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStartY.current = event.clientY;
    currentDragOffset.current = 0;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;

    const nextOffset = Math.max(0, event.clientY - dragStartY.current); // 현재 포인터 위치에서 시작 위치를 빼서 이동 거리 계산
    // 바텀 시트가 위로 올라가지 않도록 하기 위해서 Math.max(0, ...)을 사용하여 음수 값이 되지 않도록 함
    currentDragOffset.current = nextOffset;
    setDragOffset(nextOffset);
  };

  // 그래그 중에 포인터가 캔슬되거나, 드래그가 끝났을 때 호출되는 함수
  const resetDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStartY.current = null;
    currentDragOffset.current = 0;
    isClosingByDrag.current = false;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const shouldClose = currentDragOffset.current >= DRAG_CLOSE_THRESHOLD;

    if (shouldClose) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      dragStartY.current = null;
      isClosingByDrag.current = true;
      setIsDragging(false);
      onClose();
      return;
    }

    resetDrag(event); // 드래그가 끝났지만 닫히지 않은 경우, 드래그 상태를 초기화
  };

  return (
    <OverlayShell
      ariaLabel="바텀 시트"
      ariaLabelledBy={title ? titleId : undefined}
      minHeight={minHeight}
      onClose={onClose}
      open={open}
      dragOffset={dragOffset}
      isDragging={isDragging}
    >
      <S.InnerPadding $compact={variant === "compact"}>
        <S.HandleWrapper
          $compact={variant === "compact"}
          onPointerCancel={resetDrag}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <S.Handle />
        </S.HandleWrapper>
        {(title || eyebrow || showCloseButton) && (
          <S.Header
            $compact={variant === "compact"}
            $showDivider={showHeaderDivider}
          >
            <div>
              {eyebrow && (
                <S.Eyebrow $compact={variant === "compact"}>
                  {eyebrow}
                </S.Eyebrow>
              )}
              {title && (
                <S.Title $compact={variant === "compact"} id={titleId}>
                  {title}
                </S.Title>
              )}
            </div>
            {showCloseButton && (
              <S.CloseButton
                $compact={variant === "compact"}
                aria-label="닫기"
                onClick={onClose}
                type="button"
              >
                ×
              </S.CloseButton>
            )}
          </S.Header>
        )}
        <S.Content>
          {decisionMode && applicantName && applicantRole ? (
            <DecisionContent
              applicantName={applicantName}
              applicantRole={applicantRole}
              completed={isDecisionComplete}
              mode={decisionMode}
            />
          ) : applicationCancelState &&
            applicationTeamName &&
            applicationPosition ? (
            <ApplicationCancelContent
              position={applicationPosition}
              state={applicationCancelState}
              teamName={applicationTeamName}
            />
          ) : (
            children
          )}
        </S.Content>
        {decisionMode && applicantName && applicantRole ? (
          <S.Footer $variant="action">
            {isDecisionComplete ? (
              <S.DecisionCompleteButton
                $mode={decisionMode}
                onClick={handleDecisionComplete}
                type="button"
              >
                확인
              </S.DecisionCompleteButton>
            ) : (
              <S.DecisionFooterActions>
                <S.DecisionConfirmButton
                  $mode={decisionMode}
                  onClick={handleDecisionConfirm}
                  type="button"
                >
                  {decisionMode === "accept" ? "수락하기" : "거절하기"}
                </S.DecisionConfirmButton>
                <S.DecisionCancelButton
                  onClick={onClose}
                  tone="secondary"
                  type="button"
                >
                  취소
                </S.DecisionCancelButton>
              </S.DecisionFooterActions>
            )}
          </S.Footer>
        ) : applicationCancelState &&
          applicationTeamName &&
          applicationPosition ? (
          <S.Footer $variant="action">
            <S.DecisionFooterActions>
              <S.DecisionConfirmButton
                $mode={
                  applicationCancelState === "complete" ? "accept" : "reject"
                }
                onClick={
                  applicationCancelState === "complete"
                    ? (onApplicationCancelComplete ?? onClose)
                    : onApplicationCancelConfirm
                }
                type="button"
              >
                {applicationCancelState === "complete"
                  ? "다른 팀 보기"
                  : "지원 취소하기"}
              </S.DecisionConfirmButton>
              <S.DecisionCancelButton
                onClick={
                  applicationCancelState === "complete"
                    ? (onApplicationCancelComplete ?? onClose)
                    : onClose
                }
                tone="secondary"
                type="button"
              >
                {applicationCancelState === "complete" ? "닫기" : "그대로 두기"}
              </S.DecisionCancelButton>
            </S.DecisionFooterActions>
          </S.Footer>
        ) : (
          footer && <S.Footer $variant={footerVariant}>{footer}</S.Footer>
        )}
      </S.InnerPadding>
    </OverlayShell>
  );
}

export function BottomSheetOptionList<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = "선택 목록",
}: BottomSheetOptionListProps<T>) {
  return (
    <S.Options role="radiogroup" aria-label={ariaLabel}>
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <S.Option
            $first={index === 0}
            $selected={selected}
            aria-checked={selected}
            key={option.value}
            onClick={() => onChange(option.value)}
            role="radio"
            type="button"
          >
            <span>{option.label}</span>
            {selected && <S.Check aria-hidden="true">✓</S.Check>}
          </S.Option>
        );
      })}
    </S.Options>
  );
}
