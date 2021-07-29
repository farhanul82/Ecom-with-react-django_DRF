import {FETCH_CART_COMPLETE,FETCH_CART_INCOMPLETE,GET_ORDER} from '../Type'

export const CartReducer=(
    state={
        completeCart:[],
        inCompleteCart:[],
        order:[]
    },action
)=>{
    switch(action.type){
        default:
            return state;
        case FETCH_CART_COMPLETE:
            return{
                ...state,
                completeCart:action.payload,
            }
        
            case FETCH_CART_INCOMPLETE:
                return{
                    ...state,
                    inCompleteCart:action.payload,
                }   
        
                case GET_ORDER:
                    return{
                        ...state,
                        order:action.payload,
                    }
    }
}