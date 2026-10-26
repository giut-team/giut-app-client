import { Icon } from "../../components/icons";
import { S } from "./GiutHubProfilePage.styles";

type ProfileTabEmptyStateProps = {
  kind: "portfolio" | "activity";
  isOwnProfile: boolean;
  onAddPortfolio: () => void;
};

export function ProfileTabEmptyState({
  kind,
  isOwnProfile,
  onAddPortfolio,
}: ProfileTabEmptyStateProps) {
  const isPortfolio = kind === "portfolio";

  return (
    <S.TabEmptyState>
      <S.EmptyIcon aria-hidden="true">
        <Icon name={isPortfolio ? "folder" : "calendar"} size={32} weight="regular" />
      </S.EmptyIcon>
      <S.EmptyBody>
        <S.EmptyCopy>
          <S.EmptyTitle>
            {isPortfolio ? "아직 공개된 포트폴리오가 없어요" : "아직 등록된 활동 이력이 없어요"}
          </S.EmptyTitle>
          <S.EmptyDescription>
            {isPortfolio
              ? isOwnProfile
                ? "진행한 프로젝트와 나의 역할을 소개해 보세요."
                : "프로젝트가 공개되면 이곳에서 확인할 수 있어요."
              : "공모전·대외활동 등의 경험이 등록되면 이곳에서 확인할 수 있어요."}
          </S.EmptyDescription>
        </S.EmptyCopy>
        {isPortfolio && isOwnProfile && (
          <S.EmptyAction onClick={onAddPortfolio} type="button">
            <Icon name="plus" size={18} weight="bold" />
            포트폴리오 작성하기
          </S.EmptyAction>
        )}
      </S.EmptyBody>
    </S.TabEmptyState>
  );
}
