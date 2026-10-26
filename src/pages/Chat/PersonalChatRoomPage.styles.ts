import styled from "@emotion/styled";
import { S as Chat } from "./ChatRoomPage.styles";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  ...Chat,
  Thread: styled(Chat.Thread)`display: flex; flex-direction: column; gap: 16px;`,
  Messages: styled(Chat.Messages)`display: flex; flex-direction: column; gap: 12px;`,
  Composer: styled(Chat.Composer)`display: flex; gap: 8px;`,
  MessageInput: styled(Chat.MessageInput)`flex: 1; min-width: 0; font-size: 14px; height: 44px;`,
  SendButton: styled(Chat.SendButton)`flex: 0 0 44px; width: 44px; height: 44px;`,
  Bubble: styled(Chat.Bubble)`font-size: 14px; overflow-wrap: anywhere;`,
  Name: styled(Chat.Name)`font-size: 15px;`,
  Subtitle: styled(Chat.Subtitle)`font-size: 12px; color: ${tokens.color.neutral[500]};`,
  Notice: styled.div`
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    padding: 24px 16px; color: ${tokens.color.neutral[700]}; font-size: 14px; line-height: 1.6;
    p { margin: 0; }
  `,
};
