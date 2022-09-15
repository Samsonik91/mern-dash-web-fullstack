import {conversationApi} from '../api/index'
import {SETCONVERSATIONS, SETFETCHING, SETUNREAD} from "../reducers/actionTypes"

export const getConversations = (id) => async(dispatch) => {
    dispatch({type: SETFETCHING, payload: true})
    const {data} = await conversationApi.fetchGetConversations(id)
    dispatch({type: SETCONVERSATIONS, payload: data})
    dispatch({type: SETFETCHING, payload: false})
}

export const addConversation = async (senderId, receiverId, ad) => {
    const conversation = {senderId, receiverId, ad}
    const {data} = await conversationApi.fetchAddConversation(conversation)
    return data
}

export const deleteConversation = (id) => async(dispatch) => {
    const {data} = await conversationApi.fetchDeleteConversation(id)
    return data?.result
}

export const getUnread = (userId) => async(dispatch) => {
    const {data} = await conversationApi.fetchGetUnread(userId)
    const unread = data?.unread
    const total = data?.total
    dispatch({type: SETUNREAD, payload: {unread, total}})
}

export const removeUnread = (conversationId, userId) => async(dispatch) => {
    const {data} = await conversationApi.fetchRemoveUnread(conversationId, userId)
    const unread = data?.unread
    const total = data?.total
    dispatch({type: SETUNREAD, payload: {unread, total}})
}