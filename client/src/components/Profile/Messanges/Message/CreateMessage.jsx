import React, {useState} from 'react'
import {ChatBoxBottom, ChatTextArea} from "../styledComponents"
import {Button} from "@mui/material"
import {ButtonBox} from "../../ProfileAdCart/styledComponents"

const CreateMessage = React.memo(({handleSubmit, deleteMessages}) => {

    const [newMessage, setNewMessage] = useState('')

    const addMessage = (e) => {
        handleSubmit(e, newMessage)
        setNewMessage('')
    }

    const cleanForm = () => setNewMessage('')

    return (
        <>
            <ChatBoxBottom>
                <ChatTextArea
                    multiline
                    maxRows={3}
                    minRows={3}
                    value={newMessage}
                    onChange={(e)=>setNewMessage(e.target.value)}
                />
                <ButtonBox>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={cleanForm}
                    >
                        Очистить
                    </Button>
                    <Button
                        variant='contained'
                        onClick={addMessage}
                        sx={{marginLeft: '16px'}}
                    >
                        Отправить
                    </Button>
                </ButtonBox>
            </ChatBoxBottom>
        </>
    )
})

export default CreateMessage

/*
<Button
                variant='contained'
                onClick={deleteMessages}
            >
                Удалить сообщения
            </Button>
 */