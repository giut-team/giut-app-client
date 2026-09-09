import { Icon, type IconName } from "../icons";
import { S } from "./BottomActionBar.styles";

type BottomAction = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

type BottomSecondaryAction = {
  label?: string;
  icon?: IconName;
  ariaLabel?: string;
  onClick: () => void;
  disabled?: boolean;
};

export type BottomActionBarProps = {
  primaryAction: BottomAction;
  secondaryAction?: BottomSecondaryAction;
};

export function BottomActionBar({
  primaryAction,
  secondaryAction,
}: BottomActionBarProps) {
  return (
    <S.Wrapper>
      {secondaryAction && (
        <S.SecondaryButton
          aria-label={secondaryAction.ariaLabel ?? secondaryAction.label ?? "보조 액션"}
          disabled={secondaryAction.disabled}
          onClick={secondaryAction.onClick}
          type="button"
        >
          {secondaryAction.icon ? (
            <Icon name={secondaryAction.icon} size={22} weight="regular" />
          ) : (
            secondaryAction.label
          )}
        </S.SecondaryButton>
      )}
      <S.PrimaryButton
        disabled={primaryAction.disabled}
        onClick={primaryAction.onClick}
        tone="primary"
        type="button"
        width="100%"
      >
        {primaryAction.label}
      </S.PrimaryButton>
    </S.Wrapper>
  );
}
