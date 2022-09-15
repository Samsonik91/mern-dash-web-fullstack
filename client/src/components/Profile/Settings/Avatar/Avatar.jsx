import React, {useEffect, useState} from 'react'
import FileBase from 'react-file-base64'
import {Box, Button, CircularProgress, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import Swal from "sweetalert2"
import {changeAvatar, getAvatar} from "../../../../thunks/user"
import {PhotoBox, PhotoButtons, AvatarButton, ButtonBox, ProfileAvatar} from "./styledComponents"

const Avatar = () => {

    const dispatch = useDispatch()

    const [changeFile, setChangeFile] = useState(false)
    const [file, setFile] = useState(null)

    const user = JSON.parse(localStorage.getItem('profile'))
    const result = user?.result
    const disable = useSelector(({user})=> user.disable)
    const avatar = useSelector(({user})=> user.avatar)

    const closeChange = () => {
        setFile('')
        setChangeFile(false)
    }

    const swall = (message, typeIcon='success') => Swal.fire({
        position: 'center',
        icon: typeIcon,
        title: message,
        showConfirmButton: false,
        timer: 4000
    })

    const handleAvatar = async() => {
        if(file){
            const message = await dispatch(changeAvatar(file, result?._id))
            await swall(message)
            setFile('')
            setChangeFile(false)
        }else{
            return false
        }
    }

    useEffect(()=>{
        dispatch(getAvatar(result?._id))
    },[])

    return (
        <>
            <PhotoBox>
                {!disable ? <ProfileAvatar
                        src={avatar && avatar.length>0 ? avatar : null}
                    />
                    :
                    <ProfileAvatar>
                        <CircularProgress color='secondary'/>
                    </ProfileAvatar>
                }
                <Typography variant='body2'>
                    {`На сайте с ${result?.date}`}
                </Typography>
            </PhotoBox>
            <div>
                {changeFile ?
                    <PhotoButtons>
                        {!disable ?
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setFile(base64)}
                            />
                                :
                            <Box>
                                <Button variant='outlined' disabled size='small'>
                                    Выбрать файл
                                </Button>
                            </Box>
                        }
                        <ButtonBox>
                            <AvatarButton
                                variant='contained'
                                color='error'
                                size='small'
                                disabled={disable}
                                onClick={closeChange}
                            >Отмена</AvatarButton>
                            <AvatarButton
                                variant='contained'
                                size='small'
                                disabled={disable}
                                onClick={handleAvatar}
                            >Отправить</AvatarButton>
                        </ButtonBox>
                    </PhotoButtons>
                    :
                    <Button
                        variant='contained'
                        onClick={()=>setChangeFile(true)}
                    >Изменить аватар</Button>
                }
            </div>
        </>
    )
}

export default Avatar