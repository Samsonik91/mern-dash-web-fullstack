import React, {useEffect, useState} from 'react'
import {CircularProgress, Grid, Typography} from "@mui/material"
import {
    DescriptionGrid,
    FavoriteButton,
    InnerPriceBox,
    LocationBox,
    MainGrid,
    PhotoGrid,
    PriceBox,
    PriceText,
    TextDate,
    TextName,
    TypeDeal
} from "./styledComponents"
import FavoriteIcon from '@mui/icons-material/Favorite'
import {useNavigate} from "react-router-dom"
import noImage from '../../../logotypes/noImage.png'


const AdItem = React.memo(({ad, disable, handleFavorite}) => {
    console.log(ad)

    const navigate = useNavigate()

    const [favoriteColor, setFavoriteColor] = useState(false)

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id

    const enterAd = (id) => {
        navigate(`/ad/${id}`)
    }

    useEffect(()=>{
        const favorites = ad.favorites
        for(let i=0; i<favorites?.length; i++){
            if(favorites[i] === userId) setFavoriteColor(true)
            return
        }
        setFavoriteColor(false)
    },[])

    return (
        <MainGrid container>
            <PhotoGrid
                item xs={12} sm={4} md={3}
                onClick={()=>enterAd(ad.id)}
            >
                <img
                    src={ad.image ? ad.image : noImage}
                    style={{ width: '100%', height: '100%',objectFit: 'cover'}}
                />
            </PhotoGrid>
            <DescriptionGrid item xs={12} sm={6} md={8}>
                <TextName
                    variant='h6'
                    onClick={()=>enterAd(ad.id)}
                >{ad.name}</TextName>
                <LocationBox>
                    <Typography variant='h6'><strong>{ad.location},</strong></Typography>
                    <TextDate variant='body2'>{ad.date.split(',')[0]}</TextDate>
                </LocationBox>
            </DescriptionGrid>
            <Grid item xs={12} sm={2} md={1} sx={{position: 'relative'}}>
                {ad.typeDeal === 'price' ?
                    <PriceBox>
                        <InnerPriceBox>
                            <PriceText variant='h5'>{ad.price}</PriceText>
                            <Typography
                                variant='subtitle1'
                                sx={{marginBottom: {xs: '-4px', sm: 0}}}
                            >{ad.currency}</Typography>
                        </InnerPriceBox>
                        {ad.haggle ? <Typography variant='body2' component='div'>
                            Договорная
                        </Typography> : null}
                    </PriceBox>
                    :
                    null
                }
                {ad.typeDeal === 'change' ?
                    <TypeDeal variant='h5'>Обмен</TypeDeal> : null
                }
                {ad.typeDeal === 'free' ?
                    <TypeDeal variant='h5'>Даром</TypeDeal> : null
                }
                <FavoriteButton
                    title={favoriteColor ? 'Убрать из понравившихся' : 'Добавить в понравившиеся'}
                    onClick={()=> handleFavorite(ad.id, userId, favoriteColor)}
                    disabled={disable}
                >
                    {disable ? <CircularProgress /> :
                        <FavoriteIcon
                            fontSize='large'
                            sx={{color: favoriteColor ? '#ed212f' : null}}
                        />}
                </FavoriteButton>
            </Grid>
        </MainGrid>
    )
})

export default AdItem