import React, {useEffect, useState} from 'react'
import {CircularProgress, Divider, IconButton, Typography} from "@mui/material"
import {
    BottomBox,
    CharacterBox,
    CharacterMiniBox,
    DateBox,
    DescriptionBox,
    PriceBox
} from "./styledComponents"
import FavoriteIcon from '@mui/icons-material/Favorite'
import {addFavorite, removeFavorite} from "../../../thunks/ad"
import {useDispatch, useSelector} from "react-redux"
import Swall from "sweetalert2"
import {useNavigate} from "react-router-dom"

const Description = ({post, preview}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [favoriteColor, setFavoriteColor] = useState(false)

    const disable = useSelector(({post})=> post.isFetching)
    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id

    const handleFavorite = (id, favor) => {
        if(preview) return false
        if(!userId) return Swall.fire({
            icon: 'info',
            title: 'Добавлять объявления в избранные могут только авторизированные пользователи',
            text: 'Хотите пройти авторизацию ?',
            showCancelButton: 'true',
            confirmButtonText: 'Да, хочу',
            cancelButtonText: 'Нет, в другой раз'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/auth')
            }
        })

        if(favoriteColor){
            dispatch(removeFavorite(id, favor))
            setFavoriteColor(false)
        }else{
            dispatch(addFavorite(id, favor))
            setFavoriteColor(true)
        }
    }

    useEffect(()=>{
        let favorites
        favorites = post?.favorites ? post?.favorites : null
        if(favorites){
            for(let i=0; i<favorites.length; i++){
                if(favorites[i] === userId) setFavoriteColor(true)
            }
        }
    },[post])

    return (
        <DescriptionBox>
            <DateBox>
                <Typography variant='body2'>
                    Опубликовано <small>{post.date}</small>
                </Typography>
                <IconButton
                    title={favoriteColor ? 'Убрать из понравившихся' : 'Добавить в понравившиеся'}
                    sx={{cursor: 'pointer'}}
                    onClick={()=> handleFavorite(post._id, userId)}
                    disabled={disable}
                >
                    {disable ? <CircularProgress /> :
                    <FavoriteIcon
                        fontSize='large'
                        sx={{color: favoriteColor ? '#ed212f' : null}}
                    />}
                </IconButton>
            </DateBox>
            <BottomBox>
                <Typography variant='h4' sx={{margin: '16px'}}>
                    {post.name}
                </Typography>
                <PriceBox>
                    <Typography variant='h4' sx={{margin: '16px'}}>
                        {post.typeDeal === 'price' && post.price}
                        {post.typeDeal === 'change' && <small>Обмен</small>}
                        {post.typeDeal === 'free' && <small>Отдам даром</small>}
                    </Typography>
                    <Typography variant='h5' sx={{marginBottom: {xs: 0, sm: '18px'}, marginLeft: '-8px'}}>
                        {post.typeDeal === 'price' && post.currency}
                    </Typography>
                    <Typography variant='body1' sx={{marginBottom:{xs: 0, sm: '20px'}, marginLeft: '32px'}}>
                        {post.haggle ? 'Договорная' : null}
                    </Typography>
                </PriceBox>
                <CharacterBox>
                    <CharacterMiniBox>
                        {post.isBusiness ? 'Бизнес' : 'Частное лицо'}
                    </CharacterMiniBox>
                    <CharacterMiniBox>
                        {post.category.name}
                    </CharacterMiniBox>
                    <CharacterMiniBox>
                        {post.isNewItem ? 'Новый' : 'Б/у'}
                    </CharacterMiniBox>
                </CharacterBox>
                <Typography variant='h5' sx={{margin: '16px'}}>
                    Описание
                </Typography>
                <Typography
                    variant='body1'
                    sx={{margin: '16px'}}
                    component='div'
                    dangerouslySetInnerHTML={{__html: post.rightDescription ? post.rightDescription : post.description}}
                >
                </Typography>
                <Divider sx={{margin: '16px'}}/>
            </BottomBox>
        </DescriptionBox>
    )
}

export default Description