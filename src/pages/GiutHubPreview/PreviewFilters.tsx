import { useState } from "react";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { positionOptions, statusOptions, type PreviewFilters } from "./profilePreview";
import { S } from "./ProfilePreview.styles";

export type FilterGroup = "position" | "education" | "status";

export function PreviewFilterSheet({ group, value, onApply, onClose }: {
  group: FilterGroup; value: PreviewFilters; onApply: (value: PreviewFilters) => void; onClose: () => void;
}) {
  const [draft, setDraft] = useState(value);
  const title = group === "position" ? "포지션" : group === "education" ? "학과·학년" : "현재 상태";
  const options = group === "position" ? positionOptions : statusOptions;
  const field = group === "position" ? "position" : "status";
  return <BottomSheet open onClose={onClose} title={title} showCloseButton showHeaderDivider={false} variant="compact" minHeight="auto">
    <S.Form onSubmit={event => { event.preventDefault(); onApply(draft); }}>
      {group === "education" ? <>
        <S.Field>학과 이름
          <S.Search value={draft.department} maxLength={80} placeholder="전체 학과 · 이름을 입력해 주세요" onChange={event => setDraft({ ...draft, department: event.target.value })} />
        </S.Field>
        <S.Options role="radiogroup" aria-label="학년">
          {["", "1", "2", "3", "4"].map(grade => <S.Option key={grade}>
            <input type="radio" name="grade" checked={draft.grade === grade} onChange={() => setDraft({ ...draft, grade })} />
            {grade === "" ? "전체 학년" : grade === "4" ? "4학년 이상" : `${grade}학년`}
          </S.Option>)}
        </S.Options>
      </> : <S.Options role="radiogroup" aria-label={title}>
        {[{ value: "", label: "전체" }, ...options].map(option => <S.Option key={option.value}>
          <input type="radio" name={field} checked={draft[field] === option.value} onChange={() => setDraft({ ...draft, [field]: option.value })} />
          {option.label}
        </S.Option>)}
      </S.Options>}
      <S.ActionRow>
        <S.Action type="button" onClick={() => setDraft(group === "education" ? { ...draft, department: "", grade: "" } : { ...draft, [field]: "" })}>초기화</S.Action>
        <S.Action $primary type="submit">적용하기</S.Action>
      </S.ActionRow>
    </S.Form>
  </BottomSheet>;
}
