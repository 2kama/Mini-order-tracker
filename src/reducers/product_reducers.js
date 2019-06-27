import { ADD_PRODUCTS } from './../actions/types'


export default function (state = {}, action) {

    switch(action.type) {
        case ADD_PRODUCTS:
            return {
                addProductReport: action.payload,
                isLoading: false
            }
             

        default:
            return state
    }

}