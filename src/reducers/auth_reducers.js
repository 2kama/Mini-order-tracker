import { USER_LOGIN, USER_REGISTER } from './../actions/types'

export default function (state={}, action) {

    switch(action.type) {
        case USER_REGISTER:
            return {
                ...state,
                regReport: action.payload
            }

        case USER_LOGIN:
            return {
                ...state,
                logReport: action.payload
            }

        default:
            return state
    }

}