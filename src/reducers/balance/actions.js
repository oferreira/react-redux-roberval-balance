import BalanceService from './../../services/balance'

export const REQUEST_HEAVIEST_ITEM = 'FIND_HEAVIEST_ITEM'
export const RECEIVE_HEAVIEST_ITEM = 'RECEIVE_HEAVIEST_ITEM'
export const FAILURE_HEAVIEST_ITEM = 'FAILURE_FIND_HEAVIEST_ITEM'



export function requestHeaviestItem() {
    return {
        type: REQUEST_HEAVIEST_ITEM,
    }
}

export function receiveHeaviestItem(json) {
    return {
        type: RECEIVE_HEAVIEST_ITEM,
        result: json,
    }
}

export function failureHeaviestItem(error) {
    return {
        type: FAILURE_HEAVIEST_ITEM,
        error: error,
    }
}

export function findHeaviestItem(items, _callback) {

    return (dispatch) => {
        dispatch(requestHeaviestItem())

        const callback = (json) => {
            dispatch(receiveHeaviestItem(json))
            _callback()
        }

        const error = (error) => dispatch(failureHeaviestItem(error))

        return BalanceService.findHeaviestItem(callback, error, items)
    }
}
