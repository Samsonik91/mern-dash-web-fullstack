import React from 'react'
import {
    Characteristics,
    DateBox,
    DescriptionBox,
    DescriptionLinear,
    DescriptionSkeleton,
    InnerGrid,
    InnerSliderBox,
    MainGrid,
    MessageSkeleton,
    NameBox,
    PriceBox,
    ProfileGrid,
    SkeletonAvatar,
    ProfileBox,
    SliderSkeleton,
    TextFieldSkeleton,
    TopBox,
    DeliverySkeleton,
    MapBox
} from "./styledComponents"
import {AdBox} from "../styledComponents"
import noPhoto from '../../../logotypes/noImage.png'
import FavoriteIcon from "@mui/icons-material/Favorite"

const SkeletonDetails = () => {

    const linears = Array(5).fill(1)
    const deliveries = Array(4).fill(1)

    return (
        <MainGrid container maxWidth='1000px'>
            <InnerGrid item xs={12} md={8}>
                <AdBox>
                    <SliderSkeleton>
                        <InnerSliderBox>
                            <img
                                src={noPhoto}
                                style={{
                                    objectFit: 'contain',
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        </InnerSliderBox>
                    </SliderSkeleton>
                    <DescriptionSkeleton>
                        <TopBox>
                            <DateBox/>
                            <FavoriteIcon
                                fontSize='large'
                                color='disabled'
                            />
                        </TopBox>
                        <NameBox/>
                        <PriceBox/>
                        <Characteristics>
                            <PriceBox sx={{width: '20%'}}/>
                            <PriceBox sx={{width: '40%'}}/>
                            <PriceBox sx={{width: '30%'}}/>
                        </Characteristics>
                        <PriceBox
                            sx={{marginBottom: {xs: '32px', sm: 0}, height: '24px', width: '30%'}}
                        />
                        <DescriptionBox>
                            {linears.map((l, i)=>(
                                <DescriptionLinear
                                    key={Math.random()+i}
                                    sx={{width: i === 4 ? '50%' : '100%'}}
                                />
                            ))}
                        </DescriptionBox>
                        <DescriptionBox>
                            {linears.map((l, i)=>(
                                <DescriptionLinear
                                    key={Math.random()+i}
                                    sx={{width: i === 4 ? '50%' : '100%'}}
                                />
                            ))}
                        </DescriptionBox>
                    </DescriptionSkeleton>
                    <MessageSkeleton>
                        <TextFieldSkeleton/>
                        <PriceBox sx={{width: '30%'}}/>
                    </MessageSkeleton>
                </AdBox>
            </InnerGrid>
            <ProfileGrid item xs={12} md={4}>
                <ProfileBox>
                    <SkeletonAvatar/>
                    <PriceBox sx={{width: '50%'}}/>
                    <DateBox sx={{width: '70%'}}/>
                </ProfileBox>
                <DeliverySkeleton>
                    <DescriptionLinear sx={{width: '80%', marginBottom: '16px'}}/>
                    {deliveries.map((d,i)=>(
                        <DescriptionLinear
                            key={Math.random()+i}
                            sx={{width: '50%'}}
                        />
                    ))}
                </DeliverySkeleton>
                <DeliverySkeleton>
                    <DescriptionLinear sx={{width: '80%', marginBottom: '16px'}}/>
                    <Characteristics sx={{width: '100%'}}>
                        <MapBox key={Math.random()}/>
                        <MapBox key={Math.random()}/>
                    </Characteristics>
                </DeliverySkeleton>
            </ProfileGrid>
        </MainGrid>
    )
}

export default SkeletonDetails