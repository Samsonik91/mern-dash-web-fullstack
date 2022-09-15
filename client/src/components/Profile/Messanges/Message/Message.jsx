import React, {useState} from 'react'
import moment from 'moment'
import 'moment/locale/ru'
import {DeleteIcon, MessageAvatar, MessageBottom, MessageBox, MessageTop, MessageTypography}
    from "./styledComponent"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

const Message = ({message, own, deleteMessage}) => {

    const [showDelete, setShowDelete] = useState(false)

    const handleShowDelete = () => own && setShowDelete(true)
    const handleHideDelete = () => own && setShowDelete(false)

    const timeFrom = () => {
        moment.locale('ru')
        const date = moment(message.createdAt).fromNow()
        return date
    }

    return (
        <MessageBox sx={{alignItems: own ? 'end' : 'start'}}>
            <MessageTop
                onMouseMove={handleShowDelete}
                onMouseLeave={handleHideDelete}
                sx={{cursor: own ? 'pointer' : null}}
            >
                <MessageAvatar/>
                <MessageTypography
                    sx={{background: own ? '#2f75ed' : '#737780'}}
                >
                    {message.text}
                </MessageTypography>
                <DeleteIcon
                    title='Удалить сообщение'
                    sx={{display: showDelete ? 'display' : 'none'}}
                    onClick={()=>deleteMessage(message.symbol)}
                >
                    <HighlightOffIcon
                        fontSize='large'
                    />
                </DeleteIcon>
            </MessageTop>
            <MessageBottom variant='subtitle'>
                {timeFrom()}
            </MessageBottom>
        </MessageBox>
    )
}

export default Message