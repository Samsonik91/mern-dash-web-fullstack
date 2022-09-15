import React, {useState} from 'react'
import {ConversationAvatar, ConversationBox, NameBox} from "../styledComponent"
import {Box, Typography, IconButton} from "@mui/material"
import {ChatBoxBadge} from "../../styledComponents"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

const ConversationItem = React.memo(({currentChat, setCurrentChat, screen}) => {

    const [showDelete, setShowDelete] = useState(false)

    const closeChat = () => {
        setCurrentChat(null)
    }

    return (
        <div>
            <ChatBoxBadge
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)}
            >
                <ConversationBox>
                    <Box sx={{display: 'flex'}}>
                        <ConversationAvatar src={currentChat?.photo ? currentChat?.photo : null}/>
                        <NameBox>
                            <Typography variant='body1' color='#484b4f'>
                                {currentChat?.interlocutor.length > 20 ?
                                    `${currentChat?.interlocutor.slice(0,20)}...`
                                    :
                                    currentChat?.interlocutor}
                            </Typography>
                            <Typography
                                variant='h6'
                                title={currentChat?.name}
                            >
                                {screen === 'large' && (currentChat?.name.length > 35 ?
                                    `${currentChat?.name.slice(0,35)}...` : currentChat?.name)}
                                {screen === 'small' && (currentChat?.name.length > 13 ?
                                    `${currentChat?.name.slice(0,13)}...` : currentChat?.name)}
                            </Typography>
                        </NameBox>
                    </Box>
                    <IconButton
                        title='Закрыть чат'
                        sx={{display: showDelete ? 'block' : 'none'}}
                        onClick={closeChat}
                    >
                        <HighlightOffIcon fontSize='large'/>
                    </IconButton>
                </ConversationBox>
            </ChatBoxBadge>
        </div>
    )
})

export default ConversationItem