import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

const primary = "#24449a";

export const S ={
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 453px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: calc(86px + var(--app-safe-bottom));
    background: #f6f7fb;
  `,
  AddButton: styled.button`
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
  ManageDiv: styled.div`
    padding: 10px 10px;
  `,
  ManageContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: 0px;
    width: 100%;
    padding: 0;
    border: 0;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    text-align: left;
  `,
  ManageContainerLabels: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px;
  `,
  ManageContainerTitle: styled.div`
    font-size: 16px;
    font-weight: 800;
  `,
  ManageContainerCount: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    >em{
      color: ${tokens.color.primary[600]};
      font-weight: 900;
      font-style: normal;
    }

    >span{
      color: ${tokens.color.neutral[500]};
      font-weight: 700;
      font-style: normal;
    }
  `,
  ProgressBar: styled.div`
    display: flex;
    justify-content: center;
    width: 100%
    gap: 20px;
    margin: 5px 15px 10px;
  `,
  ProgressSegment: styled.div<{ isActive: boolean }>`
    flex:1;
    height: 5px;
    border-radius: 20px;
    margin: 0 2px;
    background-color: ${({isActive})=>(isActive? primary: tokens.color.neutral[500])};
  `,
  ManageContainerDescription: styled.p`
    margin: 0 15px 20px;
    font-size: 15px;
    color: ${tokens.color.neutral[500]};
  `,
  ExposuredDiv: styled.div`
    padding: 5px 10px;
  `,
  ExposuredLabel: styled.div`
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
    font-weight: 600;
    margin: 0 5px 10px;
  `,
  ExposuredList:styled.section`
    overflow: hidden;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
  `,
  ExposuredItem:styled.div`
    display: grid;
    grid-template-columns: 20px 70px minmax(0, 1fr) 30px;
    align-items: center;
    gap: 15px;
    width: 100%;
    min-height: 94px;
    padding: 15px 15px;
    border: 0;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: transparent;
    text-align: left;
    &:last-child {
      border-bottom: 0;
    }
  `,
  ExposuredCheck: styled.div`
    display: flex;
    justify-content: center;
    padding: 3px;
    border-radius: 6px;
    background-color: ${tokens.color.primary[600]};
    aspect-ratio: 1;
    cursor: pointer;
  `,
  ExposuredImage: styled.div`
    overflow: hidden;
    display: grid;
    aspect-ratio: 1;
    align-content: center;
    justify-items: center;
    gap: 7px;
    border: 2px dashed #aaa;
    border-radius: 13px;
    color: #888;

    span {
      color: ${tokens.color.neutral[700]};
      font-size: 10px;
    }
  `,
  ExposuredLabels: styled.div`
    gap: 0px;
  `,
  Representation: styled.span`
  `,
  ExposuredTitle: styled.div`
    font-size: 16px;
    font-weight: 800;
  `,
  ExposuredDetails: styled.p`
    font-size: 13px;
    font-weight: 500;
    margin: 5px 0;
  `,
  ExposuredStars: styled.div`
  cursor: pointer;
  `,
  StorageDiv: styled.div`
    padding: 5px 10px;
  `,
  StorageLabel: styled.div`
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
    font-weight: 600;
    margin: 0 5px 10px;

    >span{
      font-size: 13px;
      font-weight: 600;
    }
  `,
  StorageList:styled.section`
    overflow: hidden;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
  `,
  StorageItem:styled.div`
    display: grid;
    grid-template-columns: 20px 70px minmax(0, 1fr) 30px;
    align-items: center;
    gap: 15px;
    width: 100%;
    min-height: 94px;
    padding: 15px 15px;
    border: 0;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: transparent;
    text-align: left;
    &:last-child {
      border-bottom: 0;
    }
  `,
  StorageCheck: styled.div`
    display: flex;
    justify-content: center;
    padding: 3px;
    border: 2px solid ${tokens.color.neutral[500]};
    border-radius: 6px;
    aspect-ratio: 1;
    cursor: pointer;
  `,
  StorageImage: styled.div`
    overflow: hidden;
    display: grid;
    aspect-ratio: 1;
    align-content: center;
    justify-items: center;
    gap: 7px;
    border: 2px dashed #aaa;
    border-radius: 13px;
    color: #888;

    span {
      color: ${tokens.color.neutral[700]};
      font-size: 10px;
    }
  `,
  StorageLabels: styled.div`
    gap: 0px;
  `,
  StorageTitle: styled.div`
    font-size: 16px;
    font-weight: 800;
  `,
  StorageDetails: styled.p`
    font-size: 13px;
    font-weight: 500;
    margin: 5px 0;
  `,
  StorageStars: styled.div`
  cursor: pointer;
  `,
  SaveBar: styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    padding: 12px 22px calc(12px + var(--app-safe-bottom));
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: rgb(255 255 255 / 96%);
  `,
  SaveButton: styled.button`
    width: min(100%, 409px);
    padding: 17px 14px;
    border: 0;
    border-radius: 15px;
    background: ${primary};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
  `,
};