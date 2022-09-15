import {ADDPOST, ADDPOSTS, DELETEPOST, SETFETCHING} from "./actionTypes"

const initialState = {
    post: null,
    ads: null,
    isFetching: false
}

const adReducer = (state=initialState, action) => {
    switch (action.type){
        case ADDPOST:
            return {...state, post: action.payload}

        case DELETEPOST:
            return {...state, post: null}

        case ADDPOSTS:
            return {...state, ads: action.payload}

        case SETFETCHING:
            return {...state, isFetching: action.payload}

        default:
            return state
    }
}

export default adReducer