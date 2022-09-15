import React, {useEffect, useRef} from 'react'
import {
    ChatBox,
    ChatBoxTop,
    ChatMenu,
    ChatWrapperBox,
    DeletedMessage,
    DeletedTypography, Messanger,
    NoChatTypography
} from "../styledComponents"
import Conversation from "../Conversation/Conversation"
import {Box, Typography} from "@mui/material"
import ConversationItem from "../Conversation/ConversationItem/ConversationItem"
import {MessageAvatar} from "../Message/styledComponent"
import Message from "../Message/Message"
import CreateMessage from "../Message/CreateMessage"
import Spinner from "../../../../utils/Spinner/Spinner"
import {useSelector} from "react-redux"

const LargeScreen = ({conversations,
                         unread,
                         handleChat,
                         currentChat,
                         setCurrentChat,
                         chatMes,
                         handleSubmit,
                         deleteMessage,
                         deleteMessages,
                         deletedMessage}) => {

    const scrollRef = useRef()

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id
    const isFetching = useSelector(({conversation})=> conversation.isFetching)

    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    },[chatMes, currentChat])

    return (
        <Messanger maxWidth='lg'>
            <ChatMenu>
                <ChatWrapperBox>
                    {isFetching && <Spinner/>}
                    {conversations?.length > 0 ? conversations?.map((c,i)=>(
                        <Conversation
                            key={Math.random()+i}
                            conversation={c}
                            unread={unread}
                            handleChat={handleChat}
                            screen='large'
                        />
                    )) :
                        <Typography
                            variant='h6'
                            color='gray'
                            sx={{padding: '16px'}}
                        >
                            У вас покаместь нет диалогов с продавцами или покупателями.
                        </Typography>}
                </ChatWrapperBox>
            </ChatMenu>
            <ChatBox>
                <ChatWrapperBox>
                    {currentChat ?
                        <>
                            <Box sx={{marginTop: '16px', marginRight: '16px'}}>
                                <ConversationItem
                                    currentChat={currentChat}
                                    setCurrentChat={setCurrentChat}
                                    screen='large'
                                />
                                <ChatBoxTop>
                                    {chatMes ? chatMes?.map((m,i)=> (
                                        deletedMessage && deletedMessage === m.symbol ?
                                            <DeletedMessage
                                                key={Math.random() + i}
                                                sx={{justifyContent: m.senderId === userId ? 'end' : 'start'}}
                                            >
                                                <MessageAvatar/>
                                                <DeletedTypography
                                                    variant='body1'
                                                >
                                                    Сообщение было удалено ...
                                                </DeletedTypography>
                                            </DeletedMessage>
                                            :
                                            <div
                                                ref={scrollRef}
                                                key={Math.random() + i}
                                            >
                                                <Message
                                                    own={m.senderId === userId}
                                                    message={m}
                                                    deleteMessage={deleteMessage}
                                                />
                                            </div>
                                    )) : null}
                                </ChatBoxTop>
                            </Box>
                            <CreateMessage
                                handleSubmit={handleSubmit}
                                deleteMessages={deleteMessages}
                            />
                        </> :
                        <ChatBoxTop>
                            <NoChatTypography
                                variant='h3'
                            >
                                Откройте чат, чтобы прочесть сообщение
                            </NoChatTypography>
                        </ChatBoxTop>}
                </ChatWrapperBox>
            </ChatBox>
        </Messanger>
    )
}

export default LargeScreen