import './App.css'
import {Routes, Route} from "react-router-dom"
import {io} from 'socket.io-client'
import Auth from "./components/auth/Auth"
import Main from "./components/main/Main"
import Navbar from "./components/navbar/Navbar"
import CreateAd from "./components/createAd/CreateAd"
import {useEffect, useState} from "react"
import AdDetails from "./components/AdDetails/AdDetails"
import AdList from "./components/AdList/AdList"
import Profile from "./components/Profile/Profile"
import {useDispatch} from "react-redux"
import {getUnread} from "./thunks/conversation"
import AuthorAds from "./components/AdList/AuthorAds/AuthorAds"


function App() {

    const dispatch = useDispatch()

    const [isPrompt, setIsPrompt] = useState(false)
    const [isPromptAuth, setIsPromptAuth] = useState(false)
    const [socket, setSocket] = useState(null)

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id

    window.onbeforeunload = function (evt) {
        if(isPrompt || isPromptAuth){
            if(localStorage.getItem('formData')){
                localStorage.removeItem('formData')
            }
            const message = 'Вы уверены? Введенные вами данные не сохранятся.'
            if (typeof evt == "undefined") {
                evt = window.event
            }
            if (evt) {
                evt.returnValue = message
            }
            return message
        }
    }

    useEffect(()=>{
        const isProd = (process.env.NODE_ENV === 'production')
        const URL = isProd ? "https://dash-web-socket.herokuapp.com" : "http://localhost:8800"
        !socket && setSocket(io((URL)))
        dispatch(getUnread(userId))
    },[userId])

    useEffect(()=>{
        socket?.emit('join', userId)
    },[socket])

    useEffect(()=>{
        socket && socket?.on('unreadMessage', ()=>{
            userId !== undefined && dispatch(getUnread(userId))
        })
    },[socket])

    return (
        <div>
            <Navbar isPrompt={isPrompt}
                    setIsPrompt={setIsPrompt}
                    isPromptAuth={isPromptAuth}
                    setIsPromptAuth={setIsPromptAuth}
                    socket={socket}
            />
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/auth'
                       element={<Auth
                           isPromptAuth={isPromptAuth}
                           setIsPromptAuth={setIsPromptAuth}
                           setSocket={setSocket}
                       />}
                />
                <Route path='/ad/:id'
                       element={<AdDetails preview={false} setIsPrompt={false} isPrompt={isPrompt} socket={socket}/>}
                />
                <Route path='/create' element={<CreateAd isPrompt={isPrompt} setIsPrompt={setIsPrompt}/>}/>
                <Route path='/preview' element={<AdDetails preview={true} setIsPrompt={setIsPrompt}/>}/>
                <Route path='/adList/category' element={<AdList search={false}/>}/>
                <Route path='/adList/search' element={<AdList search={true}/>}/>
                <Route path='/adList/author/:author' element={<AuthorAds/>}/>
                <Route path='/profile/:id'
                       element={<Profile socket={socket} setSocket={setSocket} />}
                />
            </Routes>
        </div>
    )
}

export default App
