import React from 'react'
import {useNavigate} from "react-router-dom"
import {Card, CardContent, CardMedia, Link, styled, Typography} from "@mui/material"
import noFoto from '../../logotypes/noImage.png'

const StyledCardMedia = styled(CardMedia)(()=>({
    height: '250px',
    border: '2px solid #ebeded',
    cursor: 'pointer',
    borderRadius: '3px'
}))

const NameTypography = styled(Typography)(({theme})=>({
    height: '200px',
    cursor: 'pointer',
    '&:hover': {
        color: '#1c44e6'
    },
    [theme.breakpoints.down('sm')]:{
        height: '150px'
    }
}))

const AdCart = ({ad}) => {

    const navigate = useNavigate()

    const handleAd = (id, navigate) => {
        navigate(`/ad/${id}`)
    }

    return (
        <Card sx={{padding: '16px', paddingBottom: '0px'}}>
            <StyledCardMedia
                component="img"
                image={ad.image ? ad.image : noFoto}
                alt={ad.name}
                onClick={()=> handleAd(ad.id, navigate)}
            />
            <CardContent sx={{padding: '0px', paddingTop: '16px'}}>
                <NameTypography
                    gutterBottom
                    variant="h5"
                    component="div"
                    onClick={()=> handleAd(ad.id, navigate)}
                >
                    {ad.name}
                </NameTypography>
                <Typography variant='h4'>
                    {ad.typeDeal === 'price' && ad.price}
                    {ad.typeDeal === 'price' && <small>{` ${ad.currency}`}</small>}
                    {ad.typeDeal === 'change' && <small>Обмен</small>}
                    {ad.typeDeal === 'free' && <small>Бесплатно</small>}
                </Typography>
                <Typography
                    variant="h6"
                    color="black"
                    sx={{minHeight: '70px', marginTop: '16px'}}
                >
                    <strong>{ad.location.split(',')[0]}</strong>
                    <small>{ad.location.split(',')[1]}</small>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {ad.date}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default AdCart