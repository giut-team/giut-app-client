import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    display: flex;
    flex-direction: column;
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    border: 1px solid ${tokens.color.neutral[200]};
    border-top: 0;
    border-radius: 0 0 16px 16px;
    background: ${tokens.color.neutral[50]};
  `,
  Content: styled.div`
    padding: 28px 28px 0;
  `,
  Title: styled.h1`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 19px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.4;
    white-space: pre-line;
  `,
  Description: styled.p`
    margin: 10px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 11px;
    letter-spacing: -0.25px;
    line-height: 1.65;
  `,
  Notice: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 36px;
    margin-top: 16px;
    padding: 0 12px;
    border-radius: 10px;
    background: ${tokens.color.success[100]};
    color: ${tokens.color.success[500]};
    font-size: 10px;
    letter-spacing: -0.25px;
    line-height: 1.4;
  `,
  Form: styled.form`
    display: grid;
    gap: 14px;
    margin-top: 16px;
  `,
  Field: styled.label`
    display: grid;
    gap: 7px;
    color: ${tokens.color.neutral[700]};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: -0.2px;
  `,
  FieldInput: styled(Input)`
    height: 40px;
    padding: 0 12px;
    border-radius: 11px;
    font-size: 12px;
  `,
  SchoolButton: styled(Button)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    padding: 0 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    text-align: left;

    &:hover:not(:disabled) {
      opacity: 1;
      background: ${tokens.color.neutral[100]};
    }
  `,
  PasswordField: styled.div`
    position: relative;
  `,
  PasswordInput: styled(Input)`
    height: 40px;
    padding: 0 40px 0 12px;
    border-radius: 11px;
    font-size: 12px;
  `,
  PasswordToggle: styled(Button)`
    position: absolute;
    top: 50%;
    right: 10px;
    display: grid;
    width: 24px;
    height: 24px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    transform: translateY(-50%);
    &:hover:not(:disabled) {
      opacity: 1;
      background: transparent;
    }
  `,
  Consent: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${tokens.color.neutral[700]};
    font-size: 10px;
    letter-spacing: -0.25px;
  `,
  Checkbox: styled.input`
    width: 14px;
    height: 14px;
    margin: 0;
    accent-color: ${tokens.color.primary[500]};
  `,
  ConsentLabel: styled.label`
    flex: 1;
    cursor: pointer;
  `,
  Required: styled.span`
    color: ${tokens.color.primary[500]};
    font-weight: 700;
  `,
  ViewButton: styled(Button)`
    height: auto;
    padding: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 10px;
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover:not(:disabled) {
      opacity: 1;
      background: transparent;
    }

    &:active:not(:disabled) {
      transform: none;
    }
  `,
  BottomArea: styled.div`
    display: grid;
    gap: 10px;
    margin-top: auto;
    padding: 0 28px max(18px, calc(14px + env(safe-area-inset-bottom)));
  `,
  LaterButton: styled(Button)`
    height: auto;
    justify-self: center;
    padding: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 10px;
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover:not(:disabled) {
      opacity: 1;
      background: transparent;
    }

    &:active:not(:disabled) {
      transform: none;
    }
  `,
  SubmitButton: styled(Button)`
    height: 42px;
    border-radius: 11px;
    font-size: 13px;
  `,
  TermsContent: styled.div`
    display: flex;
    min-height: 0;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
  `,
  TermsSection: styled.section`
    padding-bottom: 12px;
    border-bottom: 1px solid ${tokens.color.neutral[300]};
  `,
  TermsHeading: styled.h3`
    margin: 0 0 6px;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
    line-height: 1.4;
  `,
  TermsText: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 10px;
    line-height: 1.55;
  `,
  TermsNote: styled.p`
    margin: 0;
    padding: 11px 12px;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    line-height: 1.5;
  `,
  TermsAgreeButton: styled(Button)`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    font-size: 12px;
  `,
};
