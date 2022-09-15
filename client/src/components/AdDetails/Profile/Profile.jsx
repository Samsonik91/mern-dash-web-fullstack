import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {getAvatar, getInterlocutor} from "../../../thunks/user"
import {useDispatch, useSelector} from "react-redux"
import {Avatar, Box, CircularProgress, Typography} from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {DeliveryBox,
    ItemDelivery,
    LocationBox,
    LocationTypographies,
    ProfileBox,
    RowToAds} from "./styledComponents"
import NovaPoshta from '../../../logotypes/NovaPoshta.png'
import UkrPoshta from  '../../../logotypes/Ukr_Poshta.png'
import Justin from  '../../../logotypes/Justin.jpg'
import Meest from  '../../../logotypes/Meest.png'
import CityMap from '../../../logotypes/CityMap.jpg'


const Profile = ({contactFace, delivery, location, sinceFromUser, author, preview}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [box, setBox] = useState([])

    const interlocutor = useSelector(({user})=> user?.interlocutor)
    const userAvatar = useSelector(({user})=> user?.avatar)
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleDelivery = () => {
        let box = []
        for(let i=0; i<delivery.length;i++) {
            let service = {}
            if (delivery[i] === 'UkrPoshta'){
                service.post = 'Укрпошта'
                service.logo = UkrPoshta
                box.push(service)
            }else if(delivery[i] === 'NovaPoshta'){
                service.post = 'Нова Пошта'
                service.logo = NovaPoshta
                box.push(service)
            }else if(delivery[i] === 'Justin'){
                service.post = delivery[i]
                service.logo = Justin
                box.push(service)
            }else{
                service.post = delivery[i]
                service.logo = Meest
                box.push(service)
            }
            setBox(box)
        }
    }

    useEffect(()=>{
        handleDelivery()
    },[delivery])

    useEffect(()=>{
        if(preview){
            console.log(user?.result?._id)
            dispatch(getAvatar(user?.result?._id))
        }else{
            dispatch(getInterlocutor(author))
        }
    },[])

    return (
        <>
            <ProfileBox>
                <Avatar
                    src={interlocutor?.avatar || userAvatar || null}
                    sx={{width: '70px', height: '70px'}}
                />
                <Typography variant='h5'>{contactFace}</Typography>
                <Typography
                    variant='body2'
                    sx={{marginTop: {xs: '-6px',sm: '-16px'}}}
                >{`На сайте с ${sinceFromUser}`}</Typography>
                <RowToAds onClick={()=> navigate(`/adList/author/${author}`)}>
                    <Typography variant='body1'>Другие объявления автора</Typography>
                    <ArrowForwardIosIcon
                        fontSize='small'
                        sx={{marginLeft: '8px', marginBottom: '2px'}}
                    />
                </RowToAds>
            </ProfileBox>
            <DeliveryBox>
                <Typography variant='h5'>Способы доставки</Typography>
                <Box sx={{marginTop: '16px'}}>
                    {box.map((b,i)=> (
                        <ItemDelivery key={Math.random() + i}>
                            <img src={b.logo} style={{width: '30px'}}/>
                            <Typography
                                variant='subtitle1'
                                sx={{marginLeft: '16px'}}
                            >{b.post}</Typography>
                        </ItemDelivery>
                    ))}
                </Box>
            </DeliveryBox>
            <DeliveryBox>
                <Typography variant='h5'>Местонахождение</Typography>
                <LocationBox>
                    <LocationTypographies>
                        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{location.split(',')[0]},</Typography>
                        <Typography variant='body1'>{location.split(' ')[1]}</Typography>
                        <Typography variant='body1'>{location.split(' ')[2]}</Typography>
                    </LocationTypographies>
                    <Box>
                        <img
                            src={CityMap}
                            style={{width: '90px'}}
                        />
                    </Box>
                </LocationBox>
            </DeliveryBox>
        </>
    )
}

export default Profile