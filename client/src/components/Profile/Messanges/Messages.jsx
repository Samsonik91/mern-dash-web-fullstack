import React, {useEffect, useState} from 'react'
import {io} from 'socket.io-client'
import {cryptoRandomStringAsync} from 'crypto-random-string'
import {ViewBoxLarge, ViewBoxSmall} from "./styledComponents"
import {messageApi} from "../../../api"
import {useDispatch, useSelector} from "react-redux"
import {getConversations, removeUnread} from "../../../thunks/conversation"
import {addMessage, getMessages, deletingMessage} from "../../../thunks/messages"
import SmallScreen from "./SmallScreen/SmallScreen"
import LargeScreen from "./LargeScreen/LargeScreen"

const Messages = React.memo(({socket, setSocket}) => {

    const dispatch = useDispatch()

    const unread = useSelector(({user})=> user.unread)

    const [currentChat, setCurrentChat] = useState(null)
    const [chatMes, setChatMess] = useState([])
    const [deletedMessage, setDeletedMessage] = useState(null)

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id
    const conversations = useSelector(({conversation})=> conversation.conversations)
    const interlocutor = currentChat?.members?.find(m => m !== userId)

    const handleMessages = async(id) => {
        const messages = await dispatch(getMessages(id))
        setChatMess(messages)
    }

    const deleteMessage = (symbol) => {
        setDeletedMessage(symbol)
        const room = currentChat?.id
        socket.emit('deleteMessage', {symbol, room})
        deletingMessage(symbol)
    }

    const deleteMessages = async () => {
        await messageApi.fetchDeleteMessages(currentChat?.id)
        handleMessages(currentChat?.id)
    }

    const handleSubmit = async(e, newMessage) => {
        e.preventDefault()
        if(newMessage.length<2) return false
        let str = await cryptoRandomStringAsync({length: 10})
        const message = {
            symbol: str,
            receiverId: interlocutor,
            senderId: userId,
            text: newMessage,
            conversationId: currentChat?.id
        }

        const room = currentChat?.id

        await dispatch(addMessage(message))
        socket.emit('sendMessage', {message, room})
    }

    const handleChat = (chat) => {
        setCurrentChat(chat)
    }

    useEffect(()=>{
        dispatch(getConversations(userId))
    },[])

    useEffect(()=>{
        if(currentChat) {
            if (unread) {
                console.log(`unread: ${unread}`)
                for (let i = 0; i < unread.length; i++) {
                    if (unread[i].id === currentChat?.id && unread[i].user === userId) {
                        dispatch(removeUnread(unread[i].id, userId))
                    }
                }
            }
        }

    },[currentChat, unread])

    useEffect(()=>{
        if(currentChat){
            handleMessages(currentChat?.id)
            const room = currentChat?.id
            socket?.emit('joinChat', {userId, room})
        }
    },[currentChat])

    useEffect(()=>{
        const isProd = (process.env.NODE_ENV === 'production')
        const URL = isProd ? "https://dash-web-socket.herokuapp.com" : "http://localhost:8800"
        !socket && setSocket(io((URL)))
    },[])

    useEffect(()=>{
        socket?.on('message', ({message})=>{
            setChatMess([...chatMes, message])
        })
    },[chatMes])

    useEffect(()=>{
        socket && socket.on('deleted',({symbol})=>{
            setDeletedMessage(symbol)
        })
    },[])

    return (
        <>
            <ViewBoxLarge sx={{marginBottom: '56px'}}>
                <LargeScreen
                    conversations={conversations}
                    unread={unread}
                    handleChat={handleChat}
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                    chatMes={chatMes}
                    handleSubmit={handleSubmit}
                    deleteMessage={deleteMessage}
                    deleteMessages={deleteMessages}
                    deletedMessage={deletedMessage}
                />
            </ViewBoxLarge>
            <ViewBoxSmall>
                <SmallScreen
                    conversations={conversations}
                    unread={unread}
                    handleChat={handleChat}
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                    chatMes={chatMes}
                    handleSubmit={handleSubmit}
                    deleteMessage={deleteMessage}
                    deleteMessages={deleteMessages}
                    deletedMessage={deletedMessage}
                />
            </ViewBoxSmall>
        </>
    )
})

export default Messages