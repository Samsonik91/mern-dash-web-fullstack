import {ADDPOST, ADDPOSTS, DELETEPOST, SETFETCHING} from "../reducers/actionTypes"
import moment from "../../node_modules/moment/min/moment-with-locales.min"
import {adApi} from '../api/index'

export const addPreview = (postData, navigate, id=null) => (dispatch) => {
    navigate('/preview')
    if(localStorage.getItem('adForm')) localStorage.removeItem('adForm')
    moment.locale('ru')
    const date = moment().format('LLL')
    postData = {...postData, date: date}
    dispatch({type: ADDPOST, payload: postData})
}

export const createAd = (postData, navigate) => async(dispatch) => {
    navigate('/')
    if(localStorage.getItem('adForm')) localStorage.removeItem('adForm')
    if(localStorage.getItem('rightDesc')) localStorage.removeItem('rightDesc')
    moment.locale('ru')
    const date = moment().format('LLL')
    postData = {...postData, date: date}
    await adApi.fetchCreateAd(postData)
    dispatch({type: DELETEPOST})
    dispatch(getLastAds())
}

export const getLastAds = () => async(dispatch) => {
    const {data} = await adApi.fetchLastAds()
    dispatch({type: ADDPOSTS, payload: data})
}

export const getAd = (id) => async(dispatch) => {
    const {data} = await adApi.fetchGetAd(id)
    dispatch({type: ADDPOST, payload: data.data})
}

export const updateAd = (ad, navigate) => async() => {
    const id = ad._id
    if(localStorage.getItem('adForm')) localStorage.removeItem('adForm')
    if(localStorage.getItem('rightDesc')) localStorage.removeItem('rightDesc')
    await adApi.fetchUpdateAd(ad, id)
    navigate(`/profile/${0}`)
}

export const deleteAdFromDB = (id, navigate, userId) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    await adApi.fetchDeleteAd(id)
    dispatch({type: SETFETCHING, payload: false})
}

export const GetAdsByCategory = (category, page) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    const {data} = await adApi.fetchGetAdsByCategory(category, page)
    dispatch({type: ADDPOSTS, payload: data})
    dispatch({type: SETFETCHING, payload: false})
}

export const GetAdsByTags = (tags, page) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    const {data} = await adApi.fetchGetAdsByTags(tags, page)
    dispatch({type: ADDPOSTS, payload: data})
    dispatch({type: SETFETCHING, payload: false})
}

export const GetOwnAds = (id, page) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    const {data} = await adApi.fetchGetOwnAds(id, page)
    dispatch({type: ADDPOSTS, payload: data})
    dispatch({type: SETFETCHING, payload: false})
}

export const getAuthorAds = (author, page) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    const {data} = await adApi.fetchGetAuthorAds(author, page)
    dispatch({type: ADDPOSTS, payload: data})
    dispatch({type: SETFETCHING, payload: false})
}


export const deleteAd = () => (dispatch) => {
    dispatch({type: DELETEPOST})
}

export const addFavorite = (id, favor) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    await adApi.fetchAddFavorite(id, favor)
    dispatch({type: SETFETCHING, payload: false})
}

export const removeFavorite = (id, favor) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    await adApi.fetchRemoveFavorite(id, favor)
    dispatch({type: SETFETCHING, payload: false})
}

export const getFavorites = (id, page) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    const {data} = await adApi.fetchGetFavorites(id, page)
    dispatch({type: ADDPOSTS, payload: data})
    dispatch({type: SETFETCHING, payload: false})
}