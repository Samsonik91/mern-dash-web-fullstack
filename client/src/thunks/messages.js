import {messageApi} from '../api/index'
import {SETMESSAGES} from "../reducers/actionTypes"

export const getMessages = (id) => async(dispatch) => {
    const {data} = await messageApi.fetchGetMessages(id)
    dispatch({type: SETMESSAGES, payload: data})
    return data
}

export const addMessage = (message) => async(dispatch) => {
    await messageApi.fetchAddMessage(message)
}

export const deletingMessage = (symbol) => {
    messageApi.fetchDeleteMessage(symbol)
}