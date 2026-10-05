import { S } from './PortfolioManagePage.styles'
import { PageHeader } from "../../components/PageHeader";
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/icons';
import { detailsByProfileId } from '../GiutHub/GiutHubProfilePage';
import { giutHubProfiles } from '../GiutHub/GiutHubPage';
import { useState } from "react";

export function PortfolioManagePage(){
    const navigate = useNavigate();

    const profile = giutHubProfiles.find((item) => item.id === "minjae");
      if (!profile) return null;
    const detail = detailsByProfileId[profile.id];
    const [mainId, setMainId]=useState<string>(detail.portfolios[0]?.title ?? "");

    const handleSeletMain =(id: string)=>{
        setMainId(id);
    };
    
    return(
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
                            <S.ManageContainerCount><em>{detail.portfolios.length}</em><span>/6</span></S.ManageContainerCount>
                        </S.ManageContainerLabels>
                        <S.ProgressBar>
                            {Array.from({length: 6}).map((_, index)=>(
                                <S.ProgressSegment key={index} isActive={index<detail.portfolios.length}/>
                            ))}
                        </S.ProgressBar>
                        <S.ManageContainerDescription>체크한 항목만 프로필에 보이고, 나머지는 보관함에 저장돼요. ★를 눌러 대표 프로젝트를 바꿀 수 있어요.</S.ManageContainerDescription>
                    </S.ManageContainer>
                </S.ManageDiv>
                <S.ExposuredDiv>
                    <S.ExposuredLabel>노출 중</S.ExposuredLabel>
                        <S.ExposuredList>
                            {detail.portfolios.map((item)=>{
                                const isMain= mainId===item.title;

                                return <S.ExposuredItem
                                key={item.title}>
                                    <S.ExposuredCheck>
                                        <Icon name='check' size={15} weight='bold' color='#ffffff'/>
                                    </S.ExposuredCheck>
                                    <S.ExposuredImage>
                                        <Icon name="image" size={10} weight="regular" />
                                        <span>사진</span>
                                    </S.ExposuredImage>
                                    <S.ExposuredLabels>
                                        <S.Representation/>
                                        <S.ExposuredTitle>{item.title}</S.ExposuredTitle>
                                        <S.ExposuredDetails>2026.03 - 2026.06&nbsp;&nbsp;·&nbsp;&nbsp;4인 팀</S.ExposuredDetails>
                                    </S.ExposuredLabels>
                                    <S.ExposuredStars onClick={()=>handleSeletMain(item.title)}>
                                        <Icon name='star' size={23}  weight={isMain? 'fill': 'regular'} color={isMain? '#F59E0B':'#dfe2e9'}/>
                                    </S.ExposuredStars>
                                </S.ExposuredItem>
                            })}
                        </S.ExposuredList>
                </S.ExposuredDiv>
                <S.StorageDiv>
                    <S.StorageLabel>보관함 <span>4</span></S.StorageLabel>
                        <S.StorageList>
                            {detail.portfolios.map((item)=>(
                                <S.StorageItem
                                key={item.title}>
                                    <S.StorageCheck></S.StorageCheck>
                                    <S.StorageImage>
                                        <Icon name="image" size={10} weight="regular" />
                                        <span>사진</span>
                                    </S.StorageImage>
                                    <S.StorageLabels>
                                        <S.StorageTitle>{item.title}</S.StorageTitle>
                                        <S.StorageDetails>2026.03 - 2026.06&nbsp;&nbsp;·&nbsp;&nbsp;4인 팀</S.StorageDetails>
                                    </S.StorageLabels>
                                    <S.StorageStars>
                                        <Icon name='star' size={23} weight='regular' color='#dfe2e9'/>
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