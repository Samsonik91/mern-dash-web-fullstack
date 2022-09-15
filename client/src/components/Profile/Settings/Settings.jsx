import React, {useEffect, useState} from 'react'
import {MainContainer, ProfileDivider, ProfilePart1, ProfilePart2, ProfileTop, TypographyBox} from "./styledComponents"
import {Typography} from "@mui/material"
import SettingForm from "./SettingForm"
import {emailSchema, nameSchema, passwordSchema, phoneSchema} from "./validationSchema"
import LocationSettings from "./LocationSettings"
import Avatar from "./Avatar/Avatar"
import DeleteProfile from "./DeleteProfile"

const Settings = () => {

    const [user, setUser] = useState(null)
    const [changes, setChanges] = useState(false)

    const result = user?.result
    const firstName = result?.name.split(' ')[0]
    const lastName = result?.name.split(' ')[1]
    const phone = result?.phone?.length > 0 ? result?.phone : ''

    const tasks = [
        {type: 'changeName', schema: nameSchema, value: {firstName, lastName}},
        {type: 'changePassword', schema: passwordSchema, value: {oldPassword: '', newPassword: ''}},
        {type: 'changePhone', schema: phoneSchema, value: {phone}},
        {type: 'changeEmail', schema: emailSchema, value: {email: ''}}
    ]

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[changes])

    return (
        <MainContainer maxWidth='md'>
            <ProfileTop>
                <ProfilePart1>
                    <Avatar/>
                </ProfilePart1>
                <ProfileDivider/>
                <ProfilePart2>
                    <Typography
                        variant='h5'
                        sx={{marginBottom: {xs: '16px', sm: 0}}}
                    >{result?.name}</Typography>
                    <TypographyBox>
                        <Typography
                            variant='body1'
                            sx={{marginBottom: {xs: '8px', sm: 0}}}
                        >
                            <strong>Email:</strong>{` ${result?.email}`}
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{marginBottom: {xs: '8px', sm: 0}}}
                        >
                            <strong>Телефон:</strong>{result?.phone?.length>0 && ` +38${result.phone}`}
                        </Typography>
                        <Typography variant='body1'>
                            <strong>Местонахождение:</strong>{result?.location?.length>0 && ` ${result?.location}`}
                        </Typography>
                    </TypographyBox>
                </ProfilePart2>
            </ProfileTop>
            {tasks.map((t,i)=>(
                <SettingForm
                    task={t}
                    setChanges={setChanges}
                    changes={changes}
                    key={Math.random()+i}
                />
            ))}
            <LocationSettings
                setChanges={setChanges}
                changes={changes}
            />
            <DeleteProfile/>
        </MainContainer>
    )
}

export default Settings