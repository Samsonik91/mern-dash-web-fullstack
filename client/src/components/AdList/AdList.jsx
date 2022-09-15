import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate, useSearchParams} from "react-router-dom"
import {addFavorite, GetAdsByCategory, GetAdsByTags, removeFavorite} from "../../thunks/ad"
import AdRow from "./AdRow/AdRow"
import Swall from "sweetalert2"

const AdList = ({search}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const tags = searchParams.get('tags')
    const queryPage = searchParams.get('page') || 1
    const category = searchParams.get('category')

    const disable = useSelector(({post})=> post.isFetching)
    const numberOfPages = useSelector(({post}) => post?.ads?.numberOfPages
        ? post.ads.numberOfPages : 10)
    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id

    const [page,setPage] = useState(queryPage)

    const handlePage = (event, value) => {
        if(search){
            setPage(value)
            navigate(`/adList/search?tags=${tags}&page=${value}`)
        }else{
            setPage(value)
            navigate(`/adList/category?category=${category}&page=${value}`)
        }
    }

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

        if(!search) await dispatch(GetAdsByCategory(category, queryPage))
        if(search) await dispatch(GetAdsByTags(tags, queryPage))
    }

    useEffect(()=>{
        if(!search) {
            dispatch(GetAdsByCategory(category, queryPage))
        }
    },[category, queryPage])

    useEffect(()=>{
        if(search){
            setPage(queryPage)
            dispatch(GetAdsByTags(tags, queryPage))
        }
    },[queryPage])

    return (
        <AdRow
            page={page}
            handlePage={handlePage}
            disable={disable}
            numberOfPages={numberOfPages || 10}
            handleFavorite={handleFavorite}
        />
    )
}

export default AdList