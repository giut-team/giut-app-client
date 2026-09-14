import { useEffect, useRef, useState } from "react";
import { Icon } from "../icons";
import { S } from "./SearchOverlay.styles";

type SearchOverlayProps = {
  onClose: () => void;
  open: boolean;
};

const initialRecentSearches = ["서울시", "UX 디자인", "환경 챌린지"];

export function SearchOverlay({ onClose, open }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    searchInputRef.current?.focus();
  }, [open]);

  const closeSearch = () => {
    setSearchTerm("");
    onClose();
  };
  const submitSearch = () => {
    const normalizedSearchTerm = searchTerm.trim();

    if (!normalizedSearchTerm) return;

    setRecentSearches((searches) => [
      normalizedSearchTerm,
      ...searches.filter((search) => search !== normalizedSearchTerm),
    ].slice(0, 3));
  };
  const removeRecentSearch = (targetSearch: string) => {
    setRecentSearches((searches) =>
      searches.filter((search) => search !== targetSearch),
    );
  };

  if (!open) return null;

  return (
    <S.Overlay onMouseDown={closeSearch}>
      <S.Panel
        aria-label="공모전과 팀 검색"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <S.Form
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch();
          }}
        >
          <S.Field>
            <S.IconWrap aria-hidden="true">
              <Icon name="search" size={16} weight="bold" />
            </S.IconWrap>
            <S.Input
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="공모전이나 팀을 검색해보세요"
              ref={searchInputRef}
              value={searchTerm}
            />
          </S.Field>
          <S.CancelButton onClick={closeSearch} type="button">
            취소
          </S.CancelButton>
        </S.Form>

        <S.RecentTitle>최근 검색</S.RecentTitle>
        <S.RecentList>
          {recentSearches.map((search) => (
            <S.RecentChip key={search}>
              <S.RecentTermButton
                onClick={() => setSearchTerm(search)}
                type="button"
              >
                {search}
              </S.RecentTermButton>
              <S.RecentRemoveButton
                aria-label={`${search} 최근 검색어 삭제`}
                onClick={() => removeRecentSearch(search)}
                type="button"
              >
                <Icon name="x" size={11} weight="bold" />
              </S.RecentRemoveButton>
            </S.RecentChip>
          ))}
        </S.RecentList>
      </S.Panel>
    </S.Overlay>
  );
}
