import React from 'react'
import {
    DealBox,
    IconBox,
    LocationBox,
    MainContainer,
    NameBox,
    NameContainer,
    NumberPrice,
    PhotoBox,
    PhotoContainer,
    PriceBox,
    PriceContainer
} from "./styledComponent"
import FavoriteIcon from "@mui/icons-material/Favorite"

const AdSkeleton = () => {
    return (
        <MainContainer>
            <PhotoContainer>
                <PhotoBox/>
            </PhotoContainer>
            <NameContainer>
                <NameBox/>
                <LocationBox/>
            </NameContainer>
            <PriceContainer>
                <PriceBox>
                    <NumberPrice/>
                    <DealBox/>
                </PriceBox>
                <IconBox>
                    <FavoriteIcon fontSize='large' color='disabled' />
                </IconBox>
            </PriceContainer>
        </MainContainer>
    )
}

export default AdSkeleton