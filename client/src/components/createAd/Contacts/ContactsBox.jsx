import React, {useEffect, useState} from 'react'
import {Box, InputAdornment, Typography} from "@mui/material"
import Location from "../Location/Location"
import {ContactField, MainBox} from "./styledComponents"

const ContactsBox = ({postData,
                         setPostData,
                         faceError,
                         locError,
                         phoneError,
                         setLocError,
                         setPhoneError,
                         setFaceError,
                         isPrompt,
                         setIsPrompt}) => {

    const [faceCount, setFaceCount] = useState(100)
    const [faceHelperText, setFaceHelperText] = useState(false)
    const [phoneHelperText, setPhoneHelperText] = useState(null)

    const handleContactFace = (e) => {
        setPostData({...postData, contactFace: e.target.value})
        if(!isPrompt) setIsPrompt(true)
        setFaceHelperText(true)
        if(100 - e.target.value.length < 0){
            return false
        }
        setFaceCount(100 - e.target.value.length)
    }

    const handleFaceHelperText = () => {
        if(!faceError && postData?.contactFace?.length >= 2 &&
            !faceError && postData?.contactFace?.length <= 100){
            setFaceHelperText(false)
            setFaceError(false)
        }else{
            setFaceError(true)
            setFaceHelperText(true)
        }
    }

    const handlePhoneHelperText = () => {
        const numbers = ['0','1','2','3','4','5','6','7','8','9']
        const phone = postData?.phone

        if(phone?.length !== 10){
            setPhoneHelperText('Введите настоящий номер телефона')
            setPhoneError(true)
            return
        }


        for(let i=0; i<postData?.phone?.length; i++){
            if(!numbers.includes(postData?.phone[i])){
                setPhoneHelperText('Только цифры')
                setPhoneError(true)
                return
            }
        }
        setPhoneHelperText(null)
        setPhoneError(false)
    }

    useEffect(()=>{
        if(postData?.contactFace?.length > 0){
            if(postData.contactFace.length < 2 || postData.contactFace.length > 100) {
                setFaceError(true)
            }else{
                setFaceError(false)
            }
        }
    },[postData.contactFace])

    useEffect(()=>{
        if(postData?.phone?.length > 0){
            handlePhoneHelperText()
        }
    },[postData?.phone])

    const handleEmail = (e) => {
        setPostData({...postData, email: e.target.value})
        if(!isPrompt) setIsPrompt(true)
    }

    const handlePhone = (e) => {
        setPostData({...postData, phone: e.target.value})
        if(!isPrompt) setIsPrompt(true)
    }

    return (
        <MainBox>
            <Typography variant='h6' sx={{marginBottom: '16px'}}>
                Контактная информация
            </Typography>
            <Box>
                <Typography>
                    Месторасположение*
                </Typography>
                <Location
                    postData={postData}
                    setPostData={setPostData}
                    locError={locError}
                    setLocError={setLocError}
                    isPrompt={isPrompt}
                    setIsPrompt={setIsPrompt}
                />
            </Box>
            <Box>
                <Typography>
                    Контактное лицо*
                </Typography>
                <ContactField
                    value={postData.contactFace}
                    label={faceError ? 'Не менее 2 и не более 100 символов' : null}
                    onChange={handleContactFace}
                    onBlur={handleFaceHelperText}
                    error={faceError}
                    helperText={faceHelperText && `Осталось ${faceCount} символов`}
                    placeholder='Как к вам обращаться?'
                />
            </Box>
            <Box>
                <Typography>
                    Email
                </Typography>
                <ContactField
                    name='email'
                    value={postData.email}
                    onChange={handleEmail}
                />
            </Box>
            <Box>
                <Typography>
                    Номер телефона
                </Typography>
                <ContactField
                    name='phone'
                    value={postData.phone}
                    onChange={handlePhone}
                    onBlur={handlePhoneHelperText}
                    helperText={phoneHelperText}
                    error={phoneError}
                    InputProps={{
                        startAdornment: <InputAdornment position='start' sx={{marginTop: '2px'}}>+38</InputAdornment>
                    }}
                />
            </Box>
        </MainBox>
    )
}

export default ContactsBox