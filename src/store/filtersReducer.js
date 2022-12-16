const initState = {
    filters: {},
}

const ADD_FILTERS = "ADD_FILTERS"

export const filtersReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_FILTERS:
            return { ...state, filters: action.payload }
        default:
            return state
    }
}

export const filtersAction = (payload) => ({ type: ADD_FILTERS, payload })
