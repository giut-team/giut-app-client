import { S } from './PortfolioManagePage.styles'
import { PageHeader } from "../../components/PageHeader";
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/icons';
import { detailsByProfileId } from '../GiutHub/GiutHubProfilePage';
import { giutHubProfiles } from '../GiutHub/GiutHubPage';
import { useState } from "react";

const storagePortfolio: string[] = [
    "공공데이터 기반 민원 서비스",
    "팀 매칭 API 설계",
    "교내 해커톤 서버 개발",
    "데이터 연동 프로젝트",
];

export function PortfolioManagePage() {
    const navigate = useNavigate();

    const profile = giutHubProfiles.find((item) => item.id === "minjae");
    const detail = profile ? detailsByProfileId[profile.id] : undefined;

    const [exposured, setExposured] = useState<string[]>(
        () => detail?.portfolios.map((p) => p.title) ?? []
    );
    const [storage, setStorage] = useState<string[]>(storagePortfolio);
    const [mainId, setMainId] = useState<string>(exposured[0] ?? "");

    if (!profile || !detail) return null;

    const isFull = exposured.length >= 6;


    const handleHide = (title: string) => {
        const rest = exposured.filter((t) => t !== title);
        setExposured(rest);
        setStorage((prev) => [...prev, title]);
        if (mainId === title) setMainId(rest[0] ?? ""); // 대표였으면 다음 걸로
    };
    const handleShow = (title: string) => {
        if (isFull) return; // 6개 꽉 차면 무시
        setStorage((prev) => prev.filter((t) => t !== title));
        setExposured((prev) => [...prev, title]);
    };
    const handleSeletMain =(id: string)=>{
        setMainId(id);
    };

    return (
        <S.Page>
            <S.Content>
                <PageHeader centerTitle
                    onBack={() => navigate(-1)}
                    rightContent={
                        <S.AddButton aria-label="포트폴리오 추가" onClick={() => navigate("/my-profile/portfolioadd")} type="button">
                            <Icon name="plus" size={20} weight="regular" />
                        </S.AddButton>
                    }
                    title="포트폴리오 관리"
                />
                <S.ManageDiv>
                    <S.ManageContainer>
                        <S.ManageContainerLabels>
                            <S.ManageContainerTitle>프로필에 보이는 포트폴리오</S.ManageContainerTitle>
                            <S.ManageContainerCount><em>{exposured.length}</em><span>/6</span></S.ManageContainerCount>
                        </S.ManageContainerLabels>
                        <S.ProgressBar>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <S.ProgressSegment key={index} isActive={index < exposured.length} />
                            ))}
                        </S.ProgressBar>
                        <S.ManageContainerDescription>체크한 항목만 프로필에 보이고, 나머지는 보관함에 저장돼요. ★를 눌러 대표 프로젝트를 바꿀 수 있어요.</S.ManageContainerDescription>
                    </S.ManageContainer>
                </S.ManageDiv>
                <S.ExposuredDiv>
                    <S.ExposuredLabel>노출 중</S.ExposuredLabel>
                    <S.ExposuredList>
                        {exposured.map((title) => {
                            const isMain = mainId === title;

                            return <S.ExposuredItem
                                key={title}>
                                <S.ExposuredCheck onClick={()=>handleHide(title)}>
                                    <Icon name='check' size={15} weight='bold' color='#ffffff' />
                                </S.ExposuredCheck>
                                <S.ExposuredImage>
                                    <Icon name="image" size={10} weight="regular" />
                                    <span>사진</span>
                                </S.ExposuredImage>
                                <S.ExposuredLabels>
                                    <S.Representation />
                                    <S.ExposuredTitle>{title}</S.ExposuredTitle>
                                    <S.ExposuredDetails>2026.03 - 2026.06&nbsp;&nbsp;·&nbsp;&nbsp;4인 팀</S.ExposuredDetails>
                                </S.ExposuredLabels>
                                <S.ExposuredStars onClick={() => handleSeletMain(title)}>
                                    <Icon name='star' size={23} weight={isMain ? 'fill' : 'regular'} color={isMain ? '#F59E0B' : '#dfe2e9'} />
                                </S.ExposuredStars>
                            </S.ExposuredItem>
                        })}
                    </S.ExposuredList>
                </S.ExposuredDiv>
                <S.StorageDiv>
                    <S.StorageLabel>보관함 <span>{storage.length}</span></S.StorageLabel>
                    <S.StorageList>
                        {storage.map((title) => (
                            <S.StorageItem
                                key={title}>
                                <S.StorageCheck onClick={()=>handleShow(title)}/>
                                <S.StorageImage>
                                    <Icon name="image" size={10} weight="regular" />
                                    <span>사진</span>
                                </S.StorageImage>
                                <S.StorageLabels>
                                    <S.StorageTitle>{title}</S.StorageTitle>
                                    <S.StorageDetails>2026.03 - 2026.06&nbsp;&nbsp;·&nbsp;&nbsp;4인 팀</S.StorageDetails>
                                </S.StorageLabels>
                                <S.StorageStars>
                                    <Icon name='star' size={23} weight='regular' color='#dfe2e9' />
                                </S.StorageStars>
                            </S.StorageItem>
                        ))}
                    </S.StorageList>
                </S.StorageDiv>
            </S.Content>
            <S.SaveBar>
                <S.SaveButton
                    onClick={() => navigate("/my-profile")} type="button">
                    저장하기
                </S.SaveButton>
            </S.SaveBar>
        </S.Page>
    );
}