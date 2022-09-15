import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {GetOwnAds} from "../../thunks/ad"
import {Pagination, Stack} from "@mui/material"
import ProfileAdCart from "./ProfileAdCart/profileAdCart"
import Spinner from "../../utils/Spinner/Spinner"
import AdSkeleton from "../AdList/AdItem/AdSkeleton/AdSkeleton"
import NoAds from "../AdList/AdItem/NoAds/NoAds"
import {MainBox} from "./styledComponents"

const ProfileAdBox = () => {

    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))
    const ads = useSelector(({post})=> post.ads ? post.ads.data : null)
    const isFetching = useSelector(({post})=> post.isFetching)
    const numberOfPages = useSelector(({post}) => post?.ads?.numberOfPages ? post.ads.numberOfPages : 10)
    const skeletons = Array(8).fill(1)

    const [page, setPage] = useState(1)
    const [deleting, setDeleting] = useState(false)

    useEffect(()=>{
        if(deleting && ads?.length === 1 && page-1 > 0){
            setPage(page-1)
            dispatch(GetOwnAds(user?.result?._id, page-1))
        }else {
            dispatch(GetOwnAds(user?.result?._id, page))
        }
        setDeleting(false)
    },[page, deleting])

    const handlePage = (event, value) => {
        setPage(value)
    }

    return (
        <>
            <MainBox sx={{gap: !ads ? 2 : null}}>
                {ads?.length<1 && !isFetching && <NoAds/>}
                {!ads && isFetching && <Spinner/>}
                {ads ? ads.map((ad, i)=>(
                    <ProfileAdCart key={Math.random()+i} ad={ad} setDeleting={setDeleting}/>
                ))
                    :
                    skeletons.map((s)=>(
                    <AdSkeleton
                        key={Math.random()+Math.random()}
                    />
                    ))
                }
            </MainBox>
            <Stack spacing={2} sx={{marginTop: '16px'}}>
                <Pagination
                    disabled={isFetching || !ads || ads?.length<1 ? true : false}
                    count={numberOfPages || 10}
                    siblingCount={0}
                    boundaryCount={1}
                    page={Number(page)}
                    onChange={handlePage}
                    size='large'
                    color='secondary'
                />
            </Stack>
        </>
    )
}

export default ProfileAdBox