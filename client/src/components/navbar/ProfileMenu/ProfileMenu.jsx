import React, {useState} from 'react'
import Swal from "sweetalert2"
import {Badge, Box, Divider, IconButton, ListItemIcon,
    ListItemText, Menu, MenuItem, Typography} from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ListAltIcon from '@mui/icons-material/ListAlt'
import MessageIcon from '@mui/icons-material/Message'
import StarIcon from '@mui/icons-material/Star'
import SettingsIcon from '@mui/icons-material/Settings'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LogoutIcon from '@mui/icons-material/Logout'
import {logOut} from "../../../thunks/user"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {MainBox, ProfileBox, UnreadBox} from "./styledComponents"

const ProfileMenu = ({navbarClick}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))
    const unread = useSelector(({user})=> user.total)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpenMenu = e => setAnchorEl(e.currentTarget)
    const handleCloseMenu = () => setAnchorEl(null)

    const exitFunc = () => {
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

    const handleEnter = () => {
        user ? exitFunc() : navigate('/auth')
        setAnchorEl(null)
    }

    const handleClickMenu = (nav) => {
        handleCloseMenu()
        navbarClick(nav)
    }

    return (
        <MainBox aria-controls='profile-menu'>
            <ProfileBox>
                <IconButton
                    title='Мой профиль'
                    onClick={()=> navigate(`/profile/${0}`)}
                    sx={{position: 'relative'}}
                >
                    <AccountCircleIcon fontSize='large' sx={{color: 'white'}}/>
                    {unread && unread !== 0 ?
                        <UnreadBox>
                            <div>
                                {unread}
                            </div>
                        </UnreadBox> : null}
                </IconButton>
                <Typography
                    variant='body1'
                    sx={{display: {xs: 'none', md: 'block'}}}
                    onClick={handleOpenMenu}
                >
                    Мой профиль
                </Typography>
                <Box
                    sx={{display: {xs: 'none', md: 'block'}}}
                    onClick={handleOpenMenu}
                >
                    <KeyboardArrowDownIcon/>
                </Box>
            </ProfileBox>
            <Menu
                id='profile-menu'
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={()=> handleClickMenu(`/profile/${0}`)}>
                    <ListItemIcon>
                        <ListAltIcon/>
                    </ListItemIcon>
                    <ListItemText>Объявления</ListItemText>
                </MenuItem>
                <MenuItem onClick={()=> handleClickMenu(`/profile/${1}`)}>
                    <ListItemIcon>
                        {unread && unread !== 0 ? <Badge badgeContent={unread} color='secondary'>
                                <MessageIcon/>
                            </Badge>
                            :
                            <MessageIcon/>}
                    </ListItemIcon>
                    <ListItemText>Сообщения</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={()=> handleClickMenu(`/profile/${2}`)}
                >
                    <ListItemIcon>
                        <StarIcon/>
                    </ListItemIcon>
                    <ListItemText>Избранное</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={()=> handleClickMenu(`/profile/${3}`)}
                >
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText>Настройки</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleEnter}>
                    <ListItemIcon>
                        {user ? <LogoutIcon/> : <LockOpenIcon/>}
                    </ListItemIcon>
                    <ListItemText>{user ? 'Выйти' : 'Войти'}</ListItemText>
                </MenuItem>
            </Menu>
        </MainBox>
    )
}

export default ProfileMenu