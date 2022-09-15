import React, {useEffect, useState} from 'react'
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {signIn, signUp} from "../../thunks/user"
import {useNavigate} from 'react-router-dom'
import {signUpSchema, signInSchema} from './validationSchema'
import {Typography, Button} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import Input from "./Input"
import {AuthAvatar, AuthContainer} from "./styledComponents"
import {popStatePrompt} from "../../utils/swallPrompt"
import Spinner from '../../utils/Spinner/Spinner'
import {io} from "socket.io-client"

const Auth = ({isPromptAuth, setIsPromptAuth, setSocket}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const disable = useSelector(({user})=> user.disable)

    const signUpValues = {email: '', password: '', confirmPassword: '', firstName: '', lastName: ''}
    const signInValues = {email: '', password: ''}
    const user = JSON.parse(localStorage.getItem('profile'))
    const authStorage = JSON.parse(localStorage.getItem('authData'))

    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState)
    }

    useEffect(()=>{
        if(user) navigate('/')
    },[])

    window.onpopstate = () => {
        if(isPromptAuth){
            popStatePrompt(setIsPromptAuth, navigate, null, '/auth', formik.values, 'auth')
        }
    }

    const formik = useFormik({
        initialValues: authStorage ? (authStorage) : (isSignUp ? signUpValues : signInValues),
        validationSchema: isSignUp? signUpSchema : signInSchema,
        onSubmit: async (values)=> {
            setIsPromptAuth(false)
            if(isSignUp) {
                dispatch(signUp({...values}, navigate))
            }else{
                await dispatch(signIn({...values}, navigate))
                setSocket(io("ws://localhost:8800"))
            }
        }
    })

    useEffect(()=>{
        if(formik.values.email !== '' ||
            formik.values.password !== '' ||
            formik.values.firstName && formik.values.firstName !== '' ||
            formik.values.lastName && formik.values.lastName !== '' ||
            formik.values.confirmPassword && formik.values.confirmPassword !== ''
        ) {
            setIsPromptAuth(true)
            localStorage.setItem('authData', JSON.stringify(formik.values))
        }
    },[formik.values])

    return (
        <AuthContainer maxWidth='xs'>
            {disable && <Spinner/>}
            {
                isSignUp ?
                    <AuthAvatar>
                        <AppRegistrationIcon/>
                    </AuthAvatar>
                    :
                    <AuthAvatar>
                        <LockOutlinedIcon/>
                    </AuthAvatar>
            }
            <Typography variant='h5' textAlign='center'>
                {isSignUp ? 'Регистрация' : 'Вход'}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                {isSignUp &&
                <>
                    <Input
                        id='firstName'
                        name='firstName'
                        fullWidth
                        label='Имя'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <Input
                        id='lastName'
                        name='lastName'
                        fullWidth
                        label='Фамилия'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </>
                }
                <Input
                    id='email'
                    name='email'
                    fullWidth
                    label='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'password' : 'text'}
                    label='Пароль'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    handleShowPassword={handleShowPassword}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                {isSignUp &&
                    <Input
                        id='confirmPassword'
                        name='confirmPassword'
                        type={showPassword ? 'password' : 'text'}
                        label='Подтвердите пароль'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        handleShowPassword={handleShowPassword}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                }
                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    fullWidth
                    sx={{marginTop: '16px'}}
                    disabled={disable}
                >
                    {isSignUp ? 'Зарегистрироваться' : 'Войти'}
                </Button>
                <Typography
                    variant='subtitle1'
                    textAlign='center'
                    color={disable? 'gray' : 'darkcyan'}
                    sx={{marginTop: '16px', marginBottom: '8px', cursor: 'pointer'}}
                    onClick={()=> !disable && setIsSignUp(!isSignUp)}
                >
                    {isSignUp ? 'У меня уже есть аккаунт' : 'Нет аккаунта? Зарегистрируйтесь'}
                </Typography>
            </form>
        </AuthContainer>
    )
}

export default Auth