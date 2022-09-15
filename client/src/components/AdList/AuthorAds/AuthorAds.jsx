import React, {useEffect, useState} from 'react'
import {AuthorAvatar, LocationTypography, MainContainer, NameBox, TopAuthorBox} from "./styledComponents"
import AdRow from "../AdRow/AdRow"
import {useNavigate, useParams} from "react-router-dom"
import {addFavorite, getAuthorAds, removeFavorite} from "../../../thunks/ad"
import {useDispatch, useSelector} from "react-redux"
import Swall from "sweetalert2"
import {Typography} from "@mui/material"
import {getInterlocutor} from "../../../thunks/user"

const AuthorAds = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const author = params.author

    const disable = useSelector(({post})=> post.isFetching)
    const numberOfPages = useSelector(({post}) => post?.ads?.numberOfPages ? post.ads.numberOfPages : 10)
    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id
    const interlocutor = useSelector(({user})=> user?.interlocutor)
    const fragment = interlocutor?.location?.split(',')

    const [page, setPage] = useState(1)

    const handlePage = (num) => setPage(num)

    const handleFavorite = async(id, favor, favoriteColor) => {
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

        if (favoriteColor) {
            await dispatch(removeFavorite(id, favor))
        } else {
            await dispatch(addFavorite(id, favor))
        }
        dispatch(getAuthorAds(author, page))
    }

    useEffect(()=>{
        console.log('work')
        dispatch(getAuthorAds(author, page))
    },[page])

    useEffect(()=>{
        dispatch(getInterlocutor(author))
    },[author])

    return (
        <MainContainer>
            <TopAuthorBox>
                <AuthorAvatar src={interlocutor ? interlocutor.avatar : null}/>
                <NameBox>
                    <div>
                        <Typography variant='h5'>
                            {interlocutor && interlocutor?.name}
                        </Typography>
                        <Typography variant='body2'>
                            {interlocutor && `На сайте с ${interlocutor?.date}`}
                        </Typography>
                    </div>
                    <LocationTypography
                        variant='h6'
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        {interlocutor?.location ?
                            <>
                                <strong>{`${fragment[0]},`}</strong>
                                <small>{fragment[1]}</small>
                            </>
                            :
                            null}
                    </LocationTypography>
                    <LocationTypography
                        variant='h6'
                        sx={{display: {xs: 'block', sm: 'none'}}}
                    >
                        {interlocutor?.location ?
                            <>
                                <strong>{`${fragment[0]},`}</strong>
                                <small>{`${fragment[1].slice(0,6)}. обл.`}</small>
                            </>
                            :
                            null}
                    </LocationTypography>
                </NameBox>
            </TopAuthorBox>
            <Typography
                variant='h5'
                color='gray'
                sx={{marginBottom: '-8px', marginTop: '32px'}}
            >
                Объявления автора
            </Typography>
            <AdRow
                page={page}
                handlePage={handlePage}
                disable={disable}
                numberOfPages={numberOfPages}
                handleFavorite={handleFavorite}
            />
        </MainContainer>
    )
}

export default AuthorAds