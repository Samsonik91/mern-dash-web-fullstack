import React, {useEffect} from 'react'
import {Typography} from "@mui/material"
import AdCart from "../../AdCart/AdCart"
import {useDispatch, useSelector} from "react-redux"
import {getLastAds} from "../../../thunks/ad"
import SkeletonCard from "../../AdCart/SkeletonCard/SkeletonCard"
import {AdsGrid, MainBox, StyledGrid} from "./styledComponents"

const RecentAds = ({blockWidth}) => {

    const dispatch = useDispatch()
    const ads = useSelector(({post})=> post.ads ? post.ads.data : null)
    const skeletons = Array(8).fill(1)

    useEffect(()=>{
        dispatch(getLastAds())
    },[])

    return (
        <MainBox sx={{width: blockWidth}}>
            <Typography variant='h5' sx={{textAlign: 'center'}}>
                Последние добавленные объявления
            </Typography>
            <AdsGrid container>
                {ads ? ads.map((ad, i)=>(
                    <StyledGrid item xs={12} sm={6} md={4} lg={3} key={Math.random()+i}>
                        <AdCart
                            ad={ad}
                            dispatch={dispatch}
                        />
                    </StyledGrid>)) :
                    skeletons.map(s=>(
                        <StyledGrid item xs={12} sm={6} md={4} lg={3} key={Math.random()+s}>
                            <SkeletonCard/>
                        </StyledGrid>))
                }
            </AdsGrid>
        </MainBox>
    )
}

export default RecentAds