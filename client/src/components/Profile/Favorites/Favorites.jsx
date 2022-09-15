import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {addFavorite, getFavorites, removeFavorite} from "../../../thunks/ad"
import AdRow from "../../AdList/AdRow/AdRow"

const Favorites = () => {

    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const user = JSON.parse(localStorage.getItem('profile'))
    const ads = useSelector(({post})=> post?.ads?.ads)
    const disable = useSelector(({post})=> post?.isFetching)
    const numberOfPages = useSelector(({post}) => post?.ads?.numberOfPages ?
        post.ads.numberOfPages : 10)

    const handlePage = (event, value) => {
        setPage(value)
    }

    const handleFavorite = async(id, favor, favoriteColor) => {
        if (favoriteColor) {
            await dispatch(removeFavorite(id, favor))
        } else {
            await dispatch(addFavorite(id, favor))
        }

        if(ads?.length === 1 && page > 1){
            let newPage = page - 1
            dispatch(getFavorites(user?.result?._id, newPage))
        } else {
            dispatch(getFavorites(user?.result?._id, page))
        }
    }

    useEffect(()=>{
        dispatch(getFavorites(user?.result?._id, page))
    },[page])

    return (
        <AdRow
            ads={ads}
            page={page}
            handlePage={handlePage}
            disable={disable}
            numberOfPages={numberOfPages || 10}
            handleFavorite={handleFavorite}
        />
    )
}

export default Favorites