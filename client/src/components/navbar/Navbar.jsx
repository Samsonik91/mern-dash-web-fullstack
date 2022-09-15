import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import decode from 'jwt-decode'
import {AppBar, Box, IconButton, InputBase, Toolbar, Typography} from "@mui/material"
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import StarIcon from '@mui/icons-material/Star'
import {AddButton, Search, SearchButton, StyledSearchIcon} from './styledComponent'
import ProfileMenu from "./ProfileMenu/ProfileMenu"
import {useDispatch, useSelector} from "react-redux"
import {logOut} from "../../thunks/user"
import {deleteAd} from "../../thunks/ad"
import SearchMenu from "./SearchMenu"
import swallPrompt from "../../utils/swallPrompt"
import {getUnread} from "../../thunks/conversation"

const Navbar = ({isPrompt, setIsPrompt, isPromptAuth, setIsPromptAuth, socket}) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()
    const post = useSelector(({post})=> post.post)

    const func = () => {
        if(post) dispatch(deleteAd())
    }

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const adForm = JSON.parse(localStorage.getItem('adForm'))
    const userId = user?.result?._id
    const [search, setSearch] = useState([])

    const handleSearchValue = (e) => {
        setSearch(e.target.value)
    }

    const searchByTags = () => {
        if(search.length < 2){
            alert('Поисковый запрос не может быть короче 2 символов')
        }else{
            let tags = search.toLowerCase()
            tags = tags.trim().split(',').join(' ')
            tags = tags.split('.').join(' ')
            tags = tags.split('/').join(' ')
            tags = tags.split(' ')
            for(let i=0;i<tags.length; i++){
                if(tags[i] === '') tags.splice(i,1)
            }
            setSearch([])
            navigation(`/adList/search?tags=${tags}&page=1`)
        }
    }

    const navbarClick = (nav) => {
        if(isPrompt || isPromptAuth || adForm){
            swallPrompt(setIsPrompt, setIsPromptAuth, navigation, func, nav)
        }else{
            func()
            navigation(nav)
        }
    }

    useEffect(()=>{
        const token = user?.token

        if(token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()){
                dispatch(logOut(navigation))
                setUser(null)
                setIsPrompt(false)
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    useEffect(()=>{
        socket?.on('unreadMessage', ()=>{
            userId !== undefined && dispatch(getUnread(userId))
        })
    },[location])

    return (
        <AppBar position='static' color='secondary'>
            <Toolbar display='flex' sx={{justifyContent: 'space-between'}}>
                <Box
                    title='На главную'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    onClick={()=>navbarClick('/')}
                    sx={{cursor: 'pointer'}}
                >
                    <DashboardCustomizeIcon
                        sx={{fontSize: '60px', color: 'white'}}
                    />
                    <Typography
                        variant='h2'
                        color='yellow'
                        fontWeight={600}
                        sx={{display:{xs: 'none', sm: 'block'}}}
                    >
                        Dash
                    </Typography>
                </Box>
                <Search onChange={handleSearchValue}>
                    <StyledSearchIcon/>
                    <InputBase placeholder='Поиск на сайте' sx={{paddingLeft: '32px'}} value={search}/>
                    <SearchButton onClick={searchByTags}>Найти</SearchButton>
                </Search>
                <Box display='flex' alignItems='center'>
                    <SearchMenu
                        searchByTags={searchByTags}
                        handleSearchValue={handleSearchValue}
                        search={search}
                    />
                    <IconButton onClick={()=> navbarClick(`/profile/${2}`)} title='Избранное'>
                        <StarIcon
                            fontSize='large'
                            sx={{color: 'black'}}
                        />
                    </IconButton>
                    <ProfileMenu navbarClick={navbarClick}/>
                    <Box onClick={()=> navbarClick('/create')} title='Подать объявление'>
                        <AddButton>
                            Подать объявление
                        </AddButton>
                        <IconButton
                            title='Подать объявление'
                            sx={{display:{xs: 'block', md: 'none'}}}
                        >
                            <AddBoxOutlinedIcon
                                sx={{fontSize: '38px', color: 'yellow', marginTop: '8px'}}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar