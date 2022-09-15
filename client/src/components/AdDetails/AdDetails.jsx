import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import Slider from "./Slider/Slider"
import Description from "./Description/Description"
import PreviewButtons from "./PreviewButtons/PreviewButtons"
import Message from "./Message/Message"
import {createAd, deleteAd, getAd, updateAd} from '../../thunks/ad'
import Profile from "./Profile/Profile"
import SkeletonDetails from "./SkeletonDetails/SkeletonDetails"
import Spinner from '../../utils/Spinner/Spinner'
import {AdBox, AdGrid, MainGrid, ProfileGrid} from "./styledComponents"


const AdDetails = ({preview, setIsPrompt, socket}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()

    const user = JSON.parse(localStorage.getItem('profile'))
    const adForm = JSON.parse(localStorage.getItem('adForm'))
    const ad = useSelector(({post})=> post.post ? post.post : null)

    window.onpopstate = () => {
        if(!preview) dispatch(deleteAd())
        if(adForm) localStorage.removeItem('adForm')
        if(id && preview) navigate(`/create?updateId=${id}&afterPreview=yes`)
    }

    const handleBack = () => {
        if(preview) {
            navigate('/create')
        }
    }

    const handleCreateAd = () => {
        setIsPrompt(false)
        if(ad?.creator !== null){
            dispatch(updateAd(ad, navigate))
        }else{
            const creator = user?.result._id
            let finallyAd = {...ad, creator: creator}
            dispatch(createAd(finallyAd, navigate))
        }
    }



    useEffect(()=>{
        if(!preview){
            dispatch(getAd(id))
        }
    },[])

    if(!ad) return (<><Spinner/><SkeletonDetails/></>)

    return (
        <MainGrid container maxWidth='lg'>
            <AdGrid item xs={12} md={8}>
                <AdBox>
                    <Slider
                        images={ad.files}
                    />
                    <Description post={ad} preview={preview}/>
                    <Message
                        phone={ad.phone}
                        contactFace={ad.contactFace}
                        id={ad._id}
                        owner={ad.creator}
                        avatar={ad.avatar}
                        socket={socket}
                        preview={preview}
                    />
                    {preview ? (<PreviewButtons
                        preview={preview}
                        handleBack={handleBack}
                        handleCreateAd={handleCreateAd}
                    />) : null}
                </AdBox>
            </AdGrid>
            <ProfileGrid item xs={12} md={4}>
                <Profile
                    contactFace={ad.contactFace}
                    delivery={ad.postServices}
                    location={ad.location}
                    sinceFromUser={ad.sinceFromUser}
                    author={ad.creator}
                    preview={preview}
                />
            </ProfileGrid>
        </MainGrid>
    )
}

export default AdDetails