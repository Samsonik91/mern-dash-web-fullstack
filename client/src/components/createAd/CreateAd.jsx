import React, {useEffect, useState} from 'react'
import {Box, Container, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom"
import PhotoBox from "./Photo/PhotoBox"
import PriceBox from "./Price/PriceBox"
import NameBox from "./Name/NameBox"
import DescriptionBox from "./Description/DescriptionBox"
import ContactsBox from "./Contacts/ContactsBox"
import ConfirmBox from "./ConfirmBox"
import {useDispatch, useSelector} from "react-redux"
import {addPreview, createAd, deleteAd, updateAd} from "../../thunks/ad"
import Swal from "sweetalert2"
import {initialPostData} from "./data"
import validator from "./validator"
import {popStatePrompt} from "../../utils/swallPrompt"
import {InnerBox, MainBox} from "./styledComponents"

const CreateAd = ({isPrompt, setIsPrompt}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))
    const adForm = JSON.parse(localStorage.getItem('adForm'))
    const post = useSelector(({post})=> post.post ? post.post : null)

    const [nameError, setNameError] = useState(false)
    const [catError, setCatError] = useState(false)
    const [descError, setDescError] = useState(false)
    const [locError, setLocError] = useState(false)
    const [faceError, setFaceError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [postData, setPostData] = useState(adForm ? adForm : initialPostData(user))


    const handleSubmit = async(e, postType) => {
        e.preventDefault()

        let isError = await validator(postData,
            setNameError,
            setCatError,
            setDescError,
            setLocError,
            setFaceError,
            setPriceError,
            setPhoneError)

        if(!isError){
            let val = postData.description
            if(!localStorage.getItem('rightDesc')) localStorage.setItem('rightDesc', JSON.stringify(val))
            val = val.replace(/\r\n/g, '<br/>')
            val = val.replace(/\n/g, '<br/>')
            val = val.replace(/\s/g, ' ')

            let fullPostData = {...postData, description: val}
            const creatorName = user?.result?.name

            let tags = fullPostData.name.toLowerCase()
            tags = tags.trim().split(',').join(' ')
            tags = tags.split('.').join(' ')
            tags = tags.split('/').join(' ')
            tags = tags.split(' ')
            for(let i=0;i<tags.length; i++){
                if(tags[i] === '') tags.splice(i,1)
            }

            fullPostData = {...fullPostData,
                creatorName: creatorName,
                tags: tags,
                sinceFromUser: user?.result?.date
            }

            if(postType === 'preview'){
                dispatch(addPreview(fullPostData, navigate))
            }
            if(postType === 'createAd' && postData.creator === null){
                if(localStorage.getItem('rightDesc')) localStorage.removeItem('rightDesc')

                const creator = user.result._id
                fullPostData = {...fullPostData, creator: creator, description: val}

                setIsPrompt(false)
                dispatch(createAd(fullPostData, navigate))
            }
            if(postType === 'createAd' && postData.creator !== null){
                if(localStorage.getItem('rightDesc')) localStorage.removeItem('rightDesc')
                setIsPrompt(false)

                fullPostData = {...fullPostData, description: val}
                dispatch(updateAd(fullPostData, navigate))
            }
        }else{
            const swall = Swal.fire({
                title: 'Ошибка!',
                text: 'Проверьте правильность заполнения формы',
                icon: 'error',
                confirmButtonText: 'Проверить форму'
            })
            return swall
        }
    }

    useEffect(()=>{
        if(post){
            let val = post.description
            val = val.replaceAll('<br/>','\n')
            let fullPostData = {...post, description: val}
            setPostData(fullPostData)
        }
    },[post])

    useEffect(()=>{
        if(isPrompt){
            const data = {...postData, files: []}
            localStorage.setItem('adForm', JSON.stringify(data))
        }
    },[postData])

    window.onpopstate = () => {
        const func = () => post && dispatch(deleteAd())
        if(isPrompt || adForm){
            popStatePrompt(setIsPrompt, navigate, func,'/create', postData, 'ad')
        }
    }

    window.onbeforeunload = () => {
        const func = () => post && dispatch(deleteAd())
        if(isPrompt || adForm){
            popStatePrompt(setIsPrompt, navigate, func,'/create', postData, 'ad')
        }
    }

    useEffect(()=>{
        !user && navigate('/auth')
    },[user])

    return (
        <MainBox>
            <Container maxWidth='md' sx={{margin: '16px', marginTop: '32px'}}>
                <form>
                    <InnerBox>
                        <Box sx={{marginBottom: '16px'}}>
                            <Typography variant='h4'>Создать объявление</Typography>
                        </Box>
                        <Box>
                            <NameBox
                                postData={postData}
                                nameError={nameError}
                                catError={catError}
                                setPostData={setPostData}
                                setNameError={setNameError}
                                setCatError={setCatError}
                                isPrompt={isPrompt}
                                setIsPrompt={setIsPrompt}
                            />
                            <PhotoBox
                                postData={postData}
                                setPostData={setPostData}
                                isPrompt={isPrompt}
                                setIsPrompt={setIsPrompt}
                            />
                            <DescriptionBox
                                descError={descError}
                                setDescError={setDescError}
                                postData={postData}
                                setPostData={setPostData}
                                isPrompt={isPrompt}
                                setIsPrompt={setIsPrompt}
                            />
                            <PriceBox
                                postData={postData}
                                priceError={priceError}
                                setPostData={setPostData}
                                setPriceError={setPriceError}
                                isPrompt={isPrompt}
                                setIsPrompt={setIsPrompt}
                            />
                            <ContactsBox
                                user={user}
                                postData={postData}
                                locError={locError}
                                faceError={faceError}
                                phoneError={phoneError}
                                setPostData={setPostData}
                                setLocError={setLocError}
                                setFaceError={setFaceError}
                                setPhoneError={setPhoneError}
                                isPrompt={isPrompt}
                                setIsPrompt={setIsPrompt}
                            />
                            <ConfirmBox handleSubmit={handleSubmit}/>
                        </Box>
                    </InnerBox>
                </form>
            </Container>
        </MainBox>
    )
}

export default CreateAd