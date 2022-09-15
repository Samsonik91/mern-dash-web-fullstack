import React from 'react'
import Swal from "sweetalert2"
import {Grid, Typography} from "@mui/material"
import {
    ButtonBox,
    CardDescription,
    HaggleTypography,
    IdTypography,
    ImageBox,
    LocationBox, LocationTypography,
    MainCardBox,
    NameTypography,
    PriceBox,
    PriceGrid,
    UpdateButton,
    UpdatingBox
} from "./styledComponents"
import noPhoto from '../../../logotypes/noImage.png'
import {useNavigate} from "react-router-dom"
import {deleteAdFromDB, getAd} from "../../../thunks/ad"
import {useDispatch, useSelector} from "react-redux"

const ProfileAdCart = ({ad, setDeleting}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))

    const disable = useSelector(({post})=> post.isFetching)

    const enterAd = () => {
        navigate(`/ad/${ad.id}`)
    }

    const updateAd = async() => {
        await dispatch(getAd(ad.id))
        navigate('/create')
    }

    const deleteAd = async(id, navigate, userId) => {
        await dispatch(deleteAdFromDB(id, navigate, userId))
        setDeleting(true)
    }

    const handleDeleteAd = () => {
        return Swal.fire({
            title: 'Вы уверены что хотите удалить объявление ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            reverseButtons: true
        })
            .then((result)=>{
                if(result.isConfirmed){
                    deleteAd(ad.id, navigate, user?.result?._id)
                }else{
                    return
                }
            })
    }

    return (
        <MainCardBox>
            <Grid container>
                <Grid item xs={12} sm={4} md={3}>
                    <ImageBox onClick={enterAd}>
                        <img
                            src={ad.image ? ad.image : noPhoto}
                            style={{objectFit: 'cover', width: '100%', height: '100%'}}
                        />
                    </ImageBox>
                </Grid>
                <Grid item xs={12} sm={6} md={7} >
                    <CardDescription>
                        <NameTypography
                            variant='h6'
                            onClick={enterAd}
                        >
                            {ad.name}
                        </NameTypography>
                        <Typography
                            variant='body1'
                            sx={{marginTop: {xs: '16px', sm: 0}}}
                        >
                            {ad.categoryName}
                        </Typography>
                        <LocationBox>
                            <Typography variant='h6'>
                                <strong>{ad.location.split(',')[0]},</strong>
                            </Typography>
                            <LocationTypography variant='body2'>
                                {ad.location.split(',')[1]}
                            </LocationTypography>
                        </LocationBox>
                    </CardDescription>
                </Grid>
                <PriceGrid item xs={12} sm={2}>
                    <PriceBox>
                        <Typography variant='h6' sx={{textAlign: 'center'}}>
                            {ad.typeDeal === 'price' &&
                                <>
                                    <strong>{ad.price}</strong><small>{` ${ad.currency}`}</small>
                                </>
                            }
                            {ad.typeDeal === 'change' &&
                                <strong>Обмен</strong>
                            }
                            {ad.typeDeal === 'free' &&
                                <strong>Даром</strong>
                            }
                        </Typography>
                        <HaggleTypography variant='body2'>
                            {ad.typeDeal === 'price' && ad.haggle ? 'Договорная' : null}
                        </HaggleTypography>
                    </PriceBox>
                </PriceGrid>
            </Grid>
            <UpdatingBox>
                <IdTypography variant='body2'>
                    {`id: ${ad.id}`}
                </IdTypography>
                <ButtonBox>
                    <UpdateButton
                        size='large'
                        variant='outlined'
                        onClick={updateAd}
                    >
                        Редактировать
                    </UpdateButton>
                    <UpdateButton
                        size='large'
                        variant='outlined'
                        disabled={disable}
                        sx={{marginLeft: '16px'}}
                        onClick={handleDeleteAd}
                    >
                        Удалить
                    </UpdateButton>
                </ButtonBox>
            </UpdatingBox>
        </MainCardBox>

    )
}

export default ProfileAdCart