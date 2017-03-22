import {
    REQUEST_HEAVIEST_ITEM,
    RECEIVE_HEAVIEST_ITEM,
    FAILURE_HEAVIEST_ITEM
} from './actions'

function balanceReducer(state = {isWaiting: false, result: false, error: false}, action) {
    switch (action.type) {
        case REQUEST_HEAVIEST_ITEM:
            return state
        case RECEIVE_HEAVIEST_ITEM:
            console.log('RECEIVE_HEAVIEST_ITEM', {result: action.result})
            return Object.assign({}, state, {result: action.result})
        case FAILURE_HEAVIEST_ITEM:
            console.log('FAILURE_HEAVIEST_ITEM', {error: action.error})
            return Object.assign({}, state, {error: true})
        default:
            return state
    }
}

export default function Balance(state = {}, action) {
    return {
        ...balanceReducer(state, action)
    }
}