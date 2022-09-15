import axios from 'axios'

const isProd = (process.env.NODE_ENV === 'production')
const URL = isProd ? "https://dash-web-backend.herokuapp.com" : "http://localhost:5000"

const API = axios.create({baseURL: URL})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const userApi = {
    fetchSignUp: (data) => API.post('/user/signUp', data),
    fetchSignIn: (data) => API.post('/user/signIn', data),
    fetchDeleteUser: (password, userId) => API.post('/user/deleteUser', {password, userId}),
    fetchChangeName: (newName, userId) => API.patch('/user/changeName', {newName, userId}),
    fetchChangePassword: (oldPass, newPass, userId) => API.patch('/user/changePassword', {oldPass, newPass, userId}),
    fetchChangeEmail: (newEmail, userId) => API.patch('/user/changeEmail', {newEmail, userId}),
    fetchChangeAvatar: (file, userId) => API.patch('/user/changeAvatar', {file, userId}),
    fetchChangePhone: (newPhone, userId) => API.patch('/user/changePhone', {newPhone, userId}),
    fetchChangeLocation: (newLocation, userId) => API.patch('/user/changeLocation', {newLocation, userId}),
    fetchGetAvatar: (userId) => API.get(`/user/getAvatar/${userId}`),
    fetchGetInterlocutor: (id) => API.get(`/user/interlocutor/${id}`)
}

export const adApi = {
    fetchCreateAd: (data) => API.post('/ad/createAd', data),
    fetchUpdateAd: (data, id) => API.patch(`/ad/update/${id}`, data),
    fetchDeleteAd: (id) => API.delete(`/ad/${id}`),
    fetchLastAds: () => API.get('/ad/lastAds'),
    fetchGetAd: (id) => API.get(`/ad/getAd/${id}`),
    fetchGetAdsByCategory: (category, page) => API.get(`/ad/getByCategory?cat=${category}&page=${page}`),
    fetchGetAdsByTags: (tags, page) => API.get(`/ad/search?tags=${tags}&page=${page}`),
    fetchGetOwnAds: (id,page) => API.get(`/ad/getOwnAds?creator=${id}&page=${page}`),
    fetchGetAuthorAds: (author, page) => API.get(`/ad/getAuthorAds?author=${author}&page=${page}`),
    fetchAddFavorite: (id, favor) => API.patch(`/ad/addFavorite`, {id, favor}),
    fetchRemoveFavorite: (id, favor) => API.patch(`/ad/removeFavorite`, {id, favor}),
    fetchGetFavorites: (id, page) => API.get(`/ad/getFavorites?id=${id}&page=${page}`)
}

export const conversationApi = {
    fetchGetConversations: (id) => API.get(`/conversation/getConversation/${id}`),
    fetchAddConversation: (conversation) => API.post('/conversation', conversation),
    fetchDeleteConversation: (id) => API.delete(`/conversation/${id}`),
    fetchGetUnread: (userId) => API.get(`/conversation/unread/${userId}`),
    fetchRemoveUnread: (conversationId, userId) =>
        API.get(`/conversation/remove?conversationId=${conversationId}&userId=${userId}`)
}

export const messageApi = {
    fetchGetMessages: (id) => API.get(`/messages/${id}`),
    fetchAddMessage: (data) => API.post('/messages', data),
    fetchDeleteMessage: (symbol) => API.delete(`/messages/deleteMessage/${symbol}`),
    fetchDeleteMessages: (id) => API.delete(`messages/deleteAll/${id}`)
}