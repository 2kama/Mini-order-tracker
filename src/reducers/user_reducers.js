import { USER_DATA, CLEAR_USER_DATA } from './../actions/types'

const initialUserState = {
    currentUser: null,
    isLoading: true
}

export default function (state = initialUserState, action) {

    switch(action.type) {
        case USER_DATA:
            return {
                currentUser: action.payload,
                isLoading: false
            }
        
        case CLEAR_USER_DATA:
            return {
                ...initialUserState,
                isLoading: false
            }

        default:
            return state
    }

}