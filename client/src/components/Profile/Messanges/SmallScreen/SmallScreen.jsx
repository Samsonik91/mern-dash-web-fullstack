import React, {useEffect, useRef, useState} from 'react'
import {ChatBox, ChatMenu, ChatMessagesBox, CreateBox, MainBox, MessageButton} from "./styledComponents"
import Conversation from "../Conversation/Conversation"
import {Typography} from "@mui/material"
import ConversationItem from "../Conversation/ConversationItem/ConversationItem"
import {ChatTextArea, DeletedMessage, DeletedTypography, NoChatTypography} from "../styledComponents"
import {MessageAvatar} from "../Message/styledComponent"
import Message from "../Message/Message"
import {useSelector} from "react-redux"
import Spinner from '../../../../utils/Spinner/Spinner'

const SmallScreen = ({conversations,
                         unread,
                         handleChat,
                         currentChat,
                         setCurrentChat,
                         chatMes,
                         handleSubmit,
                         deleteMessage,
                         deletedMessage}) => {

    const scrollRef = useRef()

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id
    const isFetching = useSelector(({conversation})=> conversation.isFetching)

    const [newMessage, setNewMessage] = useState('')
    const cleanForm = () => setNewMessage('')

    const addMessage = (e) => {
        handleSubmit(e, newMessage)
        setNewMessage('')
    }

    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    },[chatMes, currentChat])

    return (
        <MainBox>
            <ChatMenu>
                {isFetching && <Spinner/>}
                {conversations?.length > 0 ? conversations.map((c,i)=>(
                        <Conversation
                            key={Math.random()+i}
                            conversation={c}
                            unread={unread}
                            handleChat={handleChat}
                            screen='small'
                        />
                    )) :
                    <Typography variant='h6'>
                        У вас покаместь нет диалогов с продавцами или покупателями.
                    </Typography>}
            </ChatMenu>
            <ChatBox>
                {currentChat ?
                    <>
                        <ConversationItem
                            currentChat={currentChat}
                            setCurrentChat={setCurrentChat}
                            screen='small'
                        />
                        <ChatMessagesBox>
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
                                        key={Math.random() + i}
                                        ref={scrollRef}
                                    >
                                        <Message
                                            own={m.senderId === userId}
                                            message={m}
                                            deleteMessage={deleteMessage}
                                        />
                                    </div>
                            )) : null}
                        </ChatMessagesBox>
                    </>
                    :
                    <ChatMessagesBox>
                        <NoChatTypography
                            variant='h3'
                        >
                            Откройте чат, чтобы прочесть сообщение
                        </NoChatTypography>
                    </ChatMessagesBox>}
            </ChatBox>
            <CreateBox>
                <ChatTextArea
                    multiline
                    maxRows={3}
                    minRows={3} value={newMessage}
                    onChange={(e)=>setNewMessage(e.target.value)}
                />
                    <MessageButton
                        variant='contained'
                        color='error'
                        size='large'
                        onClick={cleanForm}
                    >
                        Очистить
                    </MessageButton>
                    <MessageButton
                        variant='contained'
                        size='large'
                        onClick={addMessage}
                    >
                        Отправить
                    </MessageButton>
            </CreateBox>
        </MainBox>
    )
}

export default SmallScreen