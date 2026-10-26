import { useId, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProfileReport, getProfileReportError, profileReportReasons, type ProfileReportReason } from "../../api/profileReports";
import { GiutHubDialog } from "./GiutHubDialog";
import { S } from "./GiutHubProfilePage.styles";

export function ProfileReportModal({ userId, onClose }: { userId: number; onClose: () => void }) {
  const [selectedReason, setSelectedReason] = useState<ProfileReportReason | null>(null);
  const [description, setDescription] = useState("");
  const descriptionId = useId();
  const inFlight = useRef(false);
  const report = useMutation({
    mutationKey: ["profile-report", userId],
    mutationFn: (input: { reason: ProfileReportReason; description: string }) => createProfileReport(userId, input.reason, input.description),
    retry: false,
    onSettled: () => { inFlight.current = false; },
  });
  const close = () => { if (!inFlight.current && !report.isPending) onClose(); };

  return (
    <GiutHubDialog
      description={report.isSuccess ? "운영팀이 신고 내용을 확인할 예정이에요." : "신고 사유를 선택해 주세요. 접수된 내용은 운영팀이 확인합니다."}
      onClose={close}
      open
      title={report.isSuccess ? "신고가 접수되었어요" : "신고하기"}
    >
      <S.ReportBody aria-busy={report.isPending}>
        {report.isSuccess ? (
          <S.DialogCancelButton onClick={close} type="button">확인</S.DialogCancelButton>
        ) : (
          <>
            <S.ReportReasonList aria-label="신고 사유 선택">
              {profileReportReasons.map(({ code, label }) => (
                <S.ReportReason $selected={selectedReason === code} aria-pressed={selectedReason === code}
                  disabled={report.isPending} key={code} onClick={() => setSelectedReason(code)} type="button">
                  <S.ReportRadio $selected={selectedReason === code} />{label}
                </S.ReportReason>
              ))}
            </S.ReportReasonList>
            {selectedReason && (
              <S.ReportDescriptionField>
                <S.ReportDescriptionLabel htmlFor={descriptionId}>추가 설명 <span>(선택)</span></S.ReportDescriptionLabel>
                <S.ReportDescriptionInput
                  aria-describedby={`${descriptionId}-count`}
                  disabled={report.isPending}
                  id={descriptionId}
                  maxLength={1000}
                  onChange={event => setDescription(event.target.value)}
                  placeholder="신고한 이유를 조금 더 알려주세요."
                  rows={3}
                  value={description}
                />
                <S.ReportDescriptionCount id={`${descriptionId}-count`}>{description.length}/1,000자</S.ReportDescriptionCount>
              </S.ReportDescriptionField>
            )}
            {report.isError && <S.ReportError role="alert">{getProfileReportError(report.error)}</S.ReportError>}
            <S.ReportActions>
              <S.DialogCancelButton disabled={report.isPending} onClick={close} type="button">취소</S.DialogCancelButton>
              <S.DialogDangerButton disabled={!selectedReason || report.isPending} onClick={() => {
                if (!selectedReason || inFlight.current || report.isPending) return;
                inFlight.current = true;
                report.mutate({ reason: selectedReason, description });
              }} type="button">{report.isPending ? "접수 중…" : "신고 접수"}</S.DialogDangerButton>
            </S.ReportActions>
          </>
        )}
      </S.ReportBody>
    </GiutHubDialog>
  );
}
