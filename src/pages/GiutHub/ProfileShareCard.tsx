import { useState, type Ref } from "react";
import type { PublicProfile } from "../../api/giutHub";
import designerAvatar from "../../assets/default_image/designer-female.png";
import developerAvatar from "../../assets/default_image/developer-female.png";
import marketingAvatar from "../../assets/default_image/marketing-female.png";
import plannerAvatar from "../../assets/default_image/planner-female.png";
import { getProfileStatusColor } from "./profileStatus";
import { S } from "./ProfileShareScreen.styles";

export type ShareCardProfile = Omit<PublicProfile, "userId"> & { tags?: PublicProfile["skills"] };

const avatars: Record<string, string> = {
  PLANNING: plannerAvatar,
  DEVELOPMENT: developerAvatar,
  DESIGN: designerAvatar,
  MARKETING: marketingAvatar,
};

export function ProfileShareCard({ profile, cardRef }: {
  profile: ShareCardProfile;
  cardRef?: Ref<HTMLElement>;
}) {
  const [failedImage, setFailedImage] = useState("");
  const defaultAvatar = avatars[profile.primaryRoles[0]?.code] ?? developerAvatar;
  const image = profile.profileImageUrl && profile.profileImageUrl !== failedImage
    ? profile.profileImageUrl : defaultAvatar;
  const roles = profile.primaryRoles.map(({ name }) => name).join(" · ");
  const education = [profile.departmentName, profile.grade > 0 ? `${profile.grade}학년` : ""].filter(Boolean).join(" ");
  const skills = (profile.tags ?? profile.skills ?? []).filter(({ type }) => type === "SKILL");
  const skillSummary = skills.slice(0, 3).map(({ name }) => name).join(" · ");

  return (
    <S.Card aria-label={`${profile.nickname} 공유 카드`} ref={cardRef}>
      <S.Avatar
        alt={`${profile.nickname} 프로필`}
        onError={() => { if (profile.profileImageUrl) setFailedImage(profile.profileImageUrl); }}
        src={image}
      />
      <S.Identity>
        <S.Status $color={getProfileStatusColor(profile.activityStatus)}>
          <S.StatusDot aria-hidden="true" />{profile.activityStatusName}
        </S.Status>
        <S.Name>{profile.nickname}</S.Name>
        <S.Summary>{[roles, education].filter(Boolean).join(" · ") || "학과·학년 미등록"}</S.Summary>
      </S.Identity>
      <S.Skills>{skillSummary ? `${skillSummary}${skills.length > 3 ? ` 외 ${skills.length - 3}개` : ""}` : "스킬 소개 전"}</S.Skills>
      <S.Signature>기웃에서 만나요</S.Signature>
    </S.Card>
  );
}
