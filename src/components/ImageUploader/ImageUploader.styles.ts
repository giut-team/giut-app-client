import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

const SIZE = "100px";

export const S = {
  Wrap: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
  `,

  AddButton: styled.button`
    flex: 0 0 auto;
    width: ${SIZE};
    height: ${SIZE};
    padding: 0;
    border: 1.5px dashed ${tokens.color.neutral[500]};
    border-radius: 12px;
    background: ${tokens.color.neutral[100]};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
  `,

  Plus: styled.span`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #111;
    color: #fff;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  `,

  Count: styled.span`
    font-size: 12px;
    color: #222;
  `,

  HiddenInput: styled.input`
    display: none;
  `,

  Scroll: styled.div`
    flex: 1;
    display: flex;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 8px 8px 8px 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  Item: styled.div`
    position: relative;
    flex: 0 0 auto;
    width: ${SIZE};
    height: ${SIZE};
  `,

  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    display: block;
  `,

  CoverBadge: styled.span`
    position: absolute;
    top: 4px;
    left: 4px;
    padding: 1px 6px;
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 6px;
  `,

  RemoveButton: styled.button`
    position: absolute;
    top: -6px;
    right: -6px;
    width: 22px;
    height: 22px;
    padding: 0;
    border: 2px solid #fff;
    border-radius: 50%;
    background: #ff3b30;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &::after {
      content: "";
      width: 10px;
      height: 2px;
      background: #fff;
      border-radius: 1px;
    }
  `,

  Toast: styled.div`
    position: fixed;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);
    padding: 12px 20px;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    z-index: 1000;
  `,
};