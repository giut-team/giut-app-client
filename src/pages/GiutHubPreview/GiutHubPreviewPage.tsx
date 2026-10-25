import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Circle, Quotes } from "@phosphor-icons/react";
import { profileListOptions } from "../GiutHub/profileQueries";
import { useAuth } from "../../contexts/AuthContext";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { ImageWithFallback } from "../GiutHub/ImageWithFallback";
import { GiutHubLoadError } from "../GiutHub/GiutHubLoadError";
import { getProfileStatusColor } from "../GiutHub/profileStatus";
import { PreviewFilterSheet, type FilterGroup } from "./PreviewFilters";
import { matchesProfileSearch, positionOptions, PREVIEW_PATH, profileFacts, readPreviewFilters, skillNames, statusOptions, toPreviewRequest, type PreviewFilters } from "./profilePreview";
import { S } from "./ProfilePreview.styles";

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const }, { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const }, { key: "mypage", label: "마이페이지", icon: "user" as const },
];

export function GiutHubPreviewPage() {
  const navigate = useNavigate();
  const { queryScope, isLoading: authLoading, isAuthenticated } = useAuth();
  const [params, setParams] = useSearchParams();
  const filters = readPreviewFilters(params);
  const [group, setGroup] = useState<FilterGroup | null>(null);
  const [searchOpen, setSearchOpen] = useState(!!filters.search);
  const request = toPreviewRequest(filters);
  const query = useQuery({
    ...profileListOptions(request, queryScope),
    enabled: !authLoading && isAuthenticated,
  });
  const positionLabel = positionOptions.find(option => option.value === filters.position)?.label;
  const statusLabel = statusOptions.find(option => option.value === filters.status)?.label;
  const educationLabel = [filters.department, filters.grade === "4" ? "4학년 이상" : filters.grade ? `${filters.grade}학년` : ""].filter(Boolean).join(" · ");
  const selected = [positionLabel, educationLabel, statusLabel].filter(Boolean).join(" · ");
  const profiles = (query.data ?? []).filter(profile => matchesProfileSearch(profile, filters.search));
  const returnTo = `${PREVIEW_PATH}${params.size ? `?${params.toString()}` : ""}`;
  const apply = (value: PreviewFilters) => {
    const next = new URLSearchParams(params);
    for (const [key, input] of Object.entries(value)) {
      if (input.trim()) next.set(key, input.trim()); else next.delete(key);
    }
    setParams(next);
    setGroup(null);
  };

  return <S.Page>
    <S.ListHeader>
      <S.TopBar><S.Brand>기웃허브</S.Brand><S.IconButton aria-label="팀원 검색" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)} type="button"><Icon name="search" size={24} /></S.IconButton></S.TopBar>
      <S.Intro>
        <S.Heading>함께할 팀원을 찾아보세요</S.Heading>
        <S.Description>다양한 전공의 학생들과 만나 멋진 프로젝트를 시작해 보세요.</S.Description>
      </S.Intro>
      <S.Filters>
        <S.FilterRow aria-label="팀원 필터">
          <S.FilterButton $active={!!filters.position} aria-haspopup="dialog" aria-expanded={group === "position"} onClick={() => setGroup("position")} type="button"><span>{positionLabel ?? "포지션 전체"}</span><Icon name="caret-right" size={14} /></S.FilterButton>
          <S.FilterButton $active={!!educationLabel} aria-haspopup="dialog" aria-expanded={group === "education"} onClick={() => setGroup("education")} type="button"><span>{educationLabel || "학과·학년 전체"}</span><Icon name="caret-right" size={14} /></S.FilterButton>
          <S.FilterButton $active={!!filters.status} aria-haspopup="dialog" aria-expanded={group === "status"} onClick={() => setGroup("status")} type="button"><span>{statusLabel ?? "현재 상태 전체"}</span><Icon name="caret-right" size={14} /></S.FilterButton>
        </S.FilterRow>
        {searchOpen && <S.Search aria-label="이름, 소개 또는 스킬로 팀원 검색" type="search" maxLength={100} placeholder="이름, 소개, 스킬로 찾아보세요" value={params.get("search") ?? ""} onChange={event => {
          const next = new URLSearchParams(params);
          if (event.target.value) next.set("search", event.target.value); else next.delete("search");
          setParams(next, { replace: true });
        }} />}
        {(selected || filters.search) && <S.FilterSummary><span>{selected ? `${selected}에 잘 맞는 팀원이에요` : `‘${filters.search}’ 검색 결과예요`}</span><S.Reset onClick={() => setParams({})} type="button">초기화</S.Reset></S.FilterSummary>}
      </S.Filters>
    </S.ListHeader>
    <S.List aria-label="함께할 팀원" aria-busy={authLoading || query.isFetching}>
      {authLoading ? <S.Empty role="status">로그인 정보를 확인하고 있어요.</S.Empty> : !isAuthenticated ? <S.Empty>
        <Icon name="users" size={28} /><strong>함께할 팀원을 만나보세요</strong><p>로그인하면 프로필을 살펴보고 대화를 시작할 수 있어요.</p><S.Action $primary type="button" onClick={() => navigate("/login")}>로그인하기</S.Action>
      </S.Empty> : query.isError ? <GiutHubLoadError error={query.error} isRetrying={query.isFetching} onRetry={() => { void query.refetch({ cancelRefetch: false }); }} onLogin={() => navigate("/login")} onCheckProfile={() => navigate("/my-profile")} />
        : query.isPending ? <S.Empty role="status">함께할 팀원을 불러오고 있어요.</S.Empty>
        : profiles.length === 0 ? <S.Empty><Icon name="search" size={28} /><strong>아직 조건에 맞는 팀원이 없어요</strong><p>필터를 조금 넓히거나 다른 검색어로 찾아보세요.</p><S.Reset type="button" onClick={() => setParams({})}>전체 팀원 보기</S.Reset></S.Empty>
        : profiles.map(profile => <S.Person key={profile.userId} to={`${PREVIEW_PATH}/${profile.userId}`} state={{ returnTo }} aria-label={`${profile.nickname} 프로필 보기`}>
          <S.PersonBody>
            <S.QuoteRow><Quotes size={22} weight="fill" aria-hidden="true" /><S.Quote>{profile.bio.trim() || "아직 소개를 준비하고 있어요."}</S.Quote></S.QuoteRow>
            <S.Identity>
              <S.Avatar><ImageWithFallback src={profile.profileImageUrl} alt={`${profile.nickname} 프로필 사진`} /></S.Avatar>
              <S.IdentityCopy>
                <S.NameRow><S.Name>{profile.nickname}</S.Name><S.Status $color={getProfileStatusColor(profile.activityStatus)}><Circle size={8} weight="fill" aria-hidden="true" />{profile.activityStatusName}</S.Status></S.NameRow>
                <S.Facts>{profileFacts(profile)}</S.Facts>
                <S.Skills>{skillNames(profile.skills).join(" · ") || "스킬 소개 전"}</S.Skills>
              </S.IdentityCopy>
            </S.Identity>
          </S.PersonBody>
          <Icon name="caret-right" size={18} />
        </S.Person>)}
    </S.List>
    <BottomNavigation activeKey="hub" items={navigationItems} onChange={key => {
      if (key === "hub") navigate(PREVIEW_PATH);
      else navigate(key === "home" ? "/home" : key === "chat" ? "/chat" : "/my-profile");
    }} />
    {group && <PreviewFilterSheet group={group} value={filters} onApply={apply} onClose={() => setGroup(null)} />}
  </S.Page>;
}
