import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { tokens } from "../design-system/tokens.generated";
import { Icon } from "./icons";

type PageHeaderProps = {
  title: string;
  onBack?: () => void;
  rightContent?: ReactNode;
  centerTitle?: boolean;
};

const S = {
  Wrapper: styled.header`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 56px;
    padding: 0 16px;
    gap: 4px;
    box-sizing: border-box;
    border-bottom: 1px solid ${tokens.color.neutral[100]};
    background: ${tokens.color.neutral[50]};
  `,
  BackButton: styled.button`
    display: grid;
    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    margin-right: 4px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
      border-radius: 8px;
    }
  `,
  Title: styled.h1<{ $centered: boolean }>`
    min-width: 0;
    margin: 0;
    overflow: hidden;
    color: ${tokens.color.neutral[900]};
    font-size: ${({ $centered }) => ($centered ? "14px" : "16px")};
    font-weight: 700;
    letter-spacing: -0.4px;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ $centered }) =>
      $centered &&
      `
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      `}
  `,
  RightContent: styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
  `,
};

export function PageHeader({
  title,
  onBack,
  rightContent,
  centerTitle = false,
}: PageHeaderProps) {
  return (
    <S.Wrapper>
      {onBack && (
        <S.BackButton aria-label="뒤로 가기" onClick={onBack} type="button">
          <Icon name="arrow-left" size={20} weight="regular" />
        </S.BackButton>
      )}
      <S.Title $centered={centerTitle}>{title}</S.Title>
      {rightContent && <S.RightContent>{rightContent}</S.RightContent>}
    </S.Wrapper>
  );
}
