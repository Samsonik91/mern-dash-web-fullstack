import {userApi} from "../api"
import moment from "../../node_modules/moment/min/moment-with-locales.min"

import {
    SETINTERLOCUTOR,
    LOGIN,
    LOGOUT,
    SETDISABLE,
    SETAVATAR
} from "../reducers/actionTypes"

export const signUp = (formData, navigate) => async(dispatch) => {
    moment.locale('ru')
    const date = moment().format('ll')
    formData = {...formData, date: date}

    try{
        dispatch({type: SETDISABLE, payload: true})
        await userApi.fetchSignUp(formData)
        if(localStorage.getItem('authData') !== null) localStorage.removeItem('authData')
        navigate('/auth')
        dispatch({type: SETDISABLE, payload: false})
    }catch (error) {
        alert(error.message)
    }
}

export const signIn = (formData, navigate) => async(dispatch) => {
    try{
        dispatch({type: SETDISABLE, payload: true})
        const {data} = await userApi.fetchSignIn(formData)
        if(localStorage.getItem('authData')) localStorage.removeItem('authData')
        localStorage.setItem('profile', JSON.stringify({...data}))
        dispatch({type: LOGIN, payload: data})
        navigate(-1)
        dispatch({type: SETDISABLE, payload: false})
    }catch (error) {
        alert(error.message)
    }
}

export const deleteUser = (password, userId) => async(dispatch) => {
    dispatch({type: SETDISABLE, payload: true})
    const {data} = await userApi.fetchDeleteUser(password, userId)
    dispatch({type: SETDISABLE, payload: false})
    return data?.message
}

export const getAvatar = (userId) => async(dispatch) => {
    dispatch({type: SETDISABLE, payload: true})
    const {data} = await userApi.fetchGetAvatar(userId)
    dispatch({type: SETAVATAR, payload: data})
    dispatch({type: SETDISABLE, payload: false})
}

const changeStorage = (result) => {
    const token = JSON.parse(localStorage.getItem('profile')).token
    localStorage.removeItem('profile')
    localStorage.setItem('profile', JSON.stringify({result, token}))
}

export const changeName = (newName, userId) => async(dispatch) => {
    dispatch({type: SETDISABLE, payload: true})
    const {data} = await userApi.fetchChangeName(newName, userId)
    await changeStorage(data?.result)
    dispatch({type: SETDISABLE, payload: false})
    return data?.message
}

export const changePassword = (oldPass, newPass, userId) => async(dispatch) => {
    dispatch({type: SETDISABLE, payload: true})
    const {data} = await userApi.fetchChangePassword(oldPass, newPass, userId)
    dispatch({type: SETDISABLE, payload: false})
    return data
}

export const changeEmail = (newEmail, userId) => async(dispatch) => {
    dispatch({type: SETDISABLE, payload: true})
    const {data} = await userApi.fetchChangeEmail(newEmail, userId)
    await changeStorage(data?.result)
    dispatch({type: SETDISABLE, payload: false})
    return data?.message
}

export const changeAvatar = (file, userId) => async(dispatch) => {
    dispatch({type: SETDISABLE, payload: true})
    const {data} = await userApi.fetchChangeAvatar(file, userId)
    dispatch({type: SETAVATAR, payload: data?.result})
    dispatch({type: SETDISABLE, payload: false})
    return data?.message
}

export const changePhone = (newPhone, userId) => async(dispatch) => {
    dispatch({type: SETDISABLE, payload: true})
    const {data} = await userApi.fetchChangePhone(newPhone, userId)
    await changeStorage(data?.result)
    dispatch({type: SETDISABLE, payload: false})
    return data?.message
}

export const changeLocation = (newLocation, userId) => async(dispatch) => {
    dispatch({type: SETDISABLE, payload: true})
    const {data} = await userApi.fetchChangeLocation(newLocation, userId)
    await changeStorage(data?.result)
    dispatch({type: SETDISABLE, payload: false})
    return data?.message
}

export const logOut = (navigate) => (dispatch) => {
    if(localStorage.getItem('formData')) localStorage.removeItem('formData')
    if(localStorage.getItem('authData')) localStorage.removeItem('authData')
    localStorage.removeItem('profile')
    dispatch({type: LOGOUT})
    navigate('/')
}

export const getInterlocutor = (id) => async(dispatch) => {
    const {data} = await userApi.fetchGetInterlocutor(id)
    dispatch({type: SETINTERLOCUTOR, payload: data})
}