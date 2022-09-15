import React, {useEffect, useState} from 'react'
import {Typography} from "@mui/material"
import {ConversationAvatar, ConversationBox, NameBox} from "./styledComponent"

const Conversation = React.memo(({conversation, handleChat, unread, screen}) => {

    const [conUnread, setConUnread] = useState(false)
    const interlocutor = conversation?.interlocutor
    const name = conversation?.name

    useEffect(()=>{
        for(let i=0; i<unread?.length; i++){
            if(unread[i].id === conversation?.id){
                setConUnread(true)
                return
            }
            setConUnread(false)
        }
    },[unread])

    return (
        <ConversationBox
            sx={{fontWeight: conUnread ? 'bold': 'normal', width: screen === 'small' ? '41%': null}}
            onClick={()=> handleChat(conversation)}
        >
            <ConversationAvatar src={conversation?.photo ? conversation?.photo : null}/>
            <NameBox>
                <Typography variant='body1' color='#83858a'>
                    {interlocutor?.length > 20 ? `${interlocutor?.slice(0,20)}...` : interlocutor}
                </Typography>
                <Typography
                    variant='h6'
                    title={name}
                    sx={{fontWeight: conUnread ? 'bold': 'normal'}}
                >
                    {screen === 'large' && (name?.length > 25 ? `${name?.slice(0,25)}...` : name)}
                    {screen === 'small' && (name?.length > 18 ? `${name?.slice(0,18)}...` : name)}
                </Typography>
            </NameBox>
        </ConversationBox>
    )
})

export default Conversation