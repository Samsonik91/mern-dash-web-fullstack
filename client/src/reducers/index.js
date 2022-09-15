import userReducer from "./userReduser"
import {applyMiddleware, createStore, combineReducers} from "redux"
import thunk from "redux-thunk"
import adReducer from "./adReducer"
import conversationReducer from './conversationReducer'
import messageReducer from "./meassageReducer"

const reducers = combineReducers({
    user: userReducer,
    post: adReducer,
    conversation: conversationReducer,
    message: messageReducer
})

const Store = createStore(reducers, applyMiddleware(thunk))

export default Store