import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Typography} from "@mui/material"
import {AdContainer, InnerGrid, MainGrid} from "./styledComponents"
import ProfileAdBox from "./profileAdBox"
import Messages from "./Messanges/Messages"
import Favorites from "./Favorites/Favorites"
import Settings from "./Settings/Settings"

const Profile = ({socket, setSocket}) => {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('profile'))
    const {id} = useParams()

    const items = ['Объявления','Сообщения','Избранное','Настройки']
    const [focused, setFocused] = useState(Number(id))

    const handleFocus = (index) => {
        navigate(`/profile/${index}`)
    }

    useEffect(()=>{
        if(!user) navigate('/auth')
    },[user])

    useEffect(()=>{
        setFocused(Number(id))
    },[id])

    return (
        <>
            <MainGrid container>
                {items.map((item,i)=>(
                    <InnerGrid item
                          xs={12} sm={3}
                          key={Math.random()+i}
                          sx={{
                              borderBottom: {xs: 'none', sm: i === focused ? '2px solid #b236d1' : 'none'},
                              background: i === focused ? '#bab9f0' : 'white'
                            }}
                        onClick={()=>handleFocus(i)}
                    >
                        <Typography variant='h6'>
                            {item}
                        </Typography>
                    </InnerGrid>
                ))}
            </MainGrid>
                {focused === 0 &&
                    <AdContainer maxWidth='md'>
                        <ProfileAdBox/>
                    </AdContainer>}
                {focused === 1 && <Messages socket={socket} setSocket={setSocket} />}
                {focused === 2 && <Favorites/>}
                {focused === 3 && <Settings/>}
        </>
    )
}

export default Profile