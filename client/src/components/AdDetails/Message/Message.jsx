import React, {useState} from 'react'
import {Avatar, Typography} from "@mui/material"
import {useDispatch} from "react-redux"
import {addMessage} from "../../../thunks/messages"
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"
import {addConversation} from "../../../thunks/conversation"
import {cryptoRandomStringAsync} from "crypto-random-string"
import {
    AvatarBox,
    ContactBox,
    MessageBox, MessageButton,
    MessageField,
    PhoneBox,
    StyledAccount,
    StyledPhoneIcon
} from "./styledComponents"


const Message = ({phone, contactFace, avatar, owner, id, socket, preview}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [newMessage, setNewMessage] = useState('')

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id

    const handleSubmit = async(e) => {
        if(preview){
            return Swal.fire({
                icon: 'info',
                title: 'Вы не можете написать сообщение самому себе',
                confirmButtonText: 'OK',
                timer: 5000
            })
        }else{
            e.preventDefault()

            if (!user) {
                return Swal.fire({
                    icon: 'info',
                    title: 'Отправлять сообщения могут только авторизированные пользователи',
                    text: 'Хотите пройти авторизацию ?',
                    showCancelButton: 'true',
                    confirmButtonText: 'Да, хочу',
                    cancelButtonText: 'Нет, в другой раз'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/auth')
                    }
                })
            }

            if (user && userId === owner) {
                return Swal.fire({
                    icon: 'info',
                    title: 'Вы не можете написать сообщение самому себе',
                    confirmButtonText: 'OK',
                    timer: 5000
                })
            }

            const conversationId = await addConversation(userId, owner, id)
            let str = await cryptoRandomStringAsync({length: 10})

            const message = {
                receiverId: owner,
                senderId: user?.result?._id,
                text: newMessage,
                conversationId,
                symbol: str
            }
            await dispatch(addMessage(message))
            socket.emit('sendMessage', {message, room: null})
            setNewMessage('')
        }
    }

    return (
        <MessageBox>
            <ContactBox
                sx={{justifyContent: phone ? 'space-between' : 'start'}}
            >
                {avatar ? (
                        <AvatarBox>
                            <Avatar sx={{marginRight: '8px'}}/>
                            <Typography variant='h5'>{contactFace}</Typography>
                        </AvatarBox>)
                        :
                        (<AvatarBox>
                            <StyledAccount/>
                            <Typography variant='h5'>{contactFace}</Typography>
                        </AvatarBox>)
                }
                {phone && (
                    <PhoneBox>
                        <StyledPhoneIcon/>
                        <Typography variant='body1'>+38{phone}</Typography>
                    </PhoneBox>)
                }
            </ContactBox>
            <MessageField
                multiline
                rows={6}
                placeholder='Напишите сообщение'
                value={newMessage}
                onChange={(e)=> setNewMessage(e.target.value)}
            />
            <MessageButton
                variant='contained'
                onClick={handleSubmit}
            >
                Отправить сообщение
            </MessageButton>
        </MessageBox>
    )
}

export default Message