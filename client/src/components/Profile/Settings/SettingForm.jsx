import React, {useState} from 'react'
import Swal from "sweetalert2"
import {
    InnerFieldBox,
    InnerFieldBoxItem,
    SettingItem,
    SettingItemBottom,
    SettingItemTop
} from "./styledComponents"
import {Button, Divider, IconButton, InputAdornment, TextField, Typography} from "@mui/material"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import {Visibility, VisibilityOff} from "@mui/icons-material"
import {changeEmail, changeName, changePassword, changePhone} from "../../../thunks/user"

const SettingForm = ({task, setChanges, changes}) => {

    const dispatch = useDispatch()

    const [showSetting, setShowSetting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const disable = useSelector(({user})=> user.disable)
    const user = JSON.parse(localStorage.getItem('profile'))
    const result = user?.result
    const userId = result?._id

    const handleShowPassword = () => setShowPassword(prevState => !prevState)

    const swall = (message, typeIcon='success') => Swal.fire({
        position: 'center',
        icon: typeIcon,
        title: message,
        showConfirmButton: false,
        timer: 3000
    })

    const formik = useFormik({
        initialValues: task.value,
        validationSchema: task.schema,
        onSubmit: async(values)=> {
            if(task.type === 'changeName') {
                const name = `${values.firstName} ${values.lastName}`
                if(name === result?.name){
                    return swall('Новое имя не может быть таким же как старое', 'error')
                }
                const message = await dispatch(changeName(name, userId))
                await swall(message)
                setChanges(!changes)
            }else if(task.type === 'changePassword') {
                const message = await dispatch(changePassword(values.oldPassword, values.newPassword, userId))
                if(message === 'Неправильно введеный старый пароль'){
                    return swall(message, 'warning')
                }else{
                    await swall(message)
                    setChanges(!changes)
                }
            }else if(task.type === 'changeEmail') {
                if(values.email === result?.email){
                    return swall('Новый email не может быть таким же как старый', 'error')
                }
                const message = await dispatch(changeEmail(values.email, userId))
                await swall(message)
                setChanges(!changes)
            }else if(task.type === 'changePhone'){
                if(values.email === result?.phone){
                    return swall('Новый номер телефона не может быть таким же как старый', 'error')
                }
                const message = await dispatch(changePhone(values.phone, userId))
                await swall(message)
                setChanges(!changes)
            }
        }
    })

    return (
        <SettingItem
            sx={{paddingBottom: showSetting ? '8px' : '16px'}}
        >
            <SettingItemTop
                onClick={()=> setShowSetting(!showSetting)}
            >
                <Typography variant='h6'>
                    {task.type === 'changeName' && 'Изменить имя и(или) фамилию'}
                    {task.type === 'changePassword' && 'Изменить пароль'}
                    {task.type === 'changePhone' && 'Изменить номер телефона'}
                    {task.type === 'changeEmail' && 'Изменить email-адрес'}
                    {task.type === 'changeLocation' && 'Изменить место нахождения'}
                </Typography>
                {showSetting ? <ExpandLessIcon fontSize='large'/> : <ExpandMoreIcon fontSize='large'/>}
            </SettingItemTop>
            <div style={{display: showSetting ? 'block' : 'none'}}>
                <Divider sx={{marginTop: '16px'}}/>
                <SettingItemBottom>
                    <form onSubmit={formik.handleSubmit}>
                        {task.type === 'changeName' &&
                            <InnerFieldBox>
                                <InnerFieldBoxItem>
                                    <Typography variant='body1'>
                                        Новое имя
                                    </Typography>
                                    <TextField
                                        id='firstName'
                                        name='firstName'
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        sx={{width: '100%'}}
                                    />
                                </InnerFieldBoxItem>
                                <InnerFieldBoxItem>
                                    <Typography variant='body1'>
                                        Новая фамилия
                                    </Typography>
                                    <TextField
                                        id='lastName'
                                        name='lastName'
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        sx={{width: '100%'}}
                                    />
                                </InnerFieldBoxItem>
                            </InnerFieldBox>
                        }
                        {task.type === 'changePassword' &&
                            <InnerFieldBox>
                                <InnerFieldBoxItem>
                                    <Typography variant='body1'>
                                        Старый пароль
                                    </Typography>
                                    <TextField
                                        id='oldPassword'
                                        name='oldPassword'
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={formik.handleChange}
                                        value={formik.values.oldPassword}
                                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                                        sx={{width: '100%'}}
                                        InputProps={
                                            {endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handleShowPassword}>
                                                        { showPassword ? <Visibility/> : <VisibilityOff/> }
                                                    </IconButton>
                                                </InputAdornment>
                                                )
                                            }
                                        }
                                    />
                                </InnerFieldBoxItem>
                                <InnerFieldBoxItem>
                                    <Typography variant='body1'>
                                        Новый пароль
                                    </Typography>
                                    <TextField
                                        id='newPassword'
                                        name='newPassword'
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={formik.handleChange}
                                        value={formik.values.newPassword}
                                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                                        sx={{width: '100%'}}
                                        InputProps={
                                            {endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton onClick={handleShowPassword}>
                                                            { showPassword ? <Visibility/> : <VisibilityOff/> }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }
                                        }
                                    />
                                </InnerFieldBoxItem>
                            </InnerFieldBox>
                        }

                        {
                            task.type === 'changeEmail' &&
                            <InnerFieldBox>
                                <InnerFieldBoxItem>
                                    <Typography variant='body1'>
                                        Новый Email-адрес'
                                    </Typography>
                                    <TextField
                                        id='email'
                                        name='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        sx={{width: '100%'}}
                                    />
                                </InnerFieldBoxItem>
                            </InnerFieldBox>
                        }
                        {
                            task.type === 'changePhone' &&
                            <InnerFieldBox>
                                <InnerFieldBoxItem>
                                    <Typography variant='body1'>
                                        Новый номер телефона
                                    </Typography>
                                    <TextField
                                        id='phone'
                                        name='phone'
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        sx={{width: '100%'}}
                                        InputProps={
                                            {startAdornment: '+38'}
                                        }
                                    />
                                </InnerFieldBoxItem>
                            </InnerFieldBox>
                        }
                        {
                            task.type === 'changeLocation' &&
                            <InnerFieldBox>
                                <InnerFieldBoxItem>
                                    <Typography variant='body1'>
                                        Новое место нахождения
                                    </Typography>
                                </InnerFieldBoxItem>
                                <TextField sx={{width: '100%'}}/>
                            </InnerFieldBox>
                        }
                        <Button
                            variant='contained'
                            type='submit'
                            disabled = {disable}
                            sx={{marginTop: '16px'}}
                        >
                            Подтвердить
                        </Button>
                    </form>
                </SettingItemBottom>
            </div>
        </SettingItem>
    )
}

export default SettingForm