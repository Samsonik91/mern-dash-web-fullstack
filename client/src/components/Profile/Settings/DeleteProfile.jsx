import React from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {SettingItem, SettingItemTop} from "./styledComponents"
import {Button} from "@mui/material"
import Swall from "sweetalert2"
import {deleteUser, logOut} from "../../../thunks/user"
import Swal from "sweetalert2";

const DeleteProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))
    const disable = useSelector(({user})=> user.disable)

    const swall = () => Swall.fire({
        title: 'Вы уверены что хотите удалить профиль?',
        text: "Данные будут удалены навсегда и безвозватно!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Удалить профиль',
        cancelButtonText: 'Отмена'
    })
        .then(async (result)=>{
            if(result.isConfirmed){
                const { value: password } = await Swall.fire({
                    title: 'Введите свой пароль',
                    input: 'password',
                    inputLabel: 'Пароль',
                    inputPlaceholder: 'Введите свой пароль',
                })
                if (password && password.length >= 8) {
                    return {password, message: 'Правильно'}
                }else{
                    return {message: 'Неправильный пароль'}
                }
            }else{
                return {message: 'Не выбрано'}
            }
        })

    const handleDelete = async() => {
        const {password, message} = await swall()
        if(message === 'Правильно'){
            const mes = await dispatch(deleteUser(password, user?.result?._id))
            if(mes === 'Пользователь успешно удален'){
                await Swall.fire({
                    position: 'center',
                    icon: 'success',
                    title: mes,
                    showConfirmButton: false,
                    timer: 3000
                })
                dispatch(logOut(navigate))
            }else{
                return Swall.fire({
                    position: 'center',
                    icon: 'error',
                    title: mes,
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        }
        if(message === 'Неправильный пароль'){
            return Swall.fire({
                position: 'center',
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 3000
            })
        }
        if(message === 'Не выбрано'){
            return
        }
    }

    const handleOut = () => {
        return Swal.fire({
            title: 'Вы уверены что хотите выйти ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            reverseButtons: true
        })
            .then((result)=>{
                if(result.isConfirmed){
                    dispatch(logOut(navigate))
                    window.location.reload()
                }else{
                    return
                }
            })
    }

    return (
        <SettingItem>
            <SettingItemTop>
                <Button
                    variant='contained'
                    onClick={handleOut}
                >
                    Выйти
                </Button>
                <Button
                    variant='contained'
                    color='error'
                    disabled={disable}
                    onClick={handleDelete}
                >Удалить профиль</Button>
            </SettingItemTop>
        </SettingItem>
    )
}

export default DeleteProfile