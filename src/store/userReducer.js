const initState = {
    id: '',
    email: '',
    role: ''
}

const FETCH_USER = "FETCH_USER"

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USER:
            console.log(action.payload)
            return { ...state, id: action.payload.id, email: action.payload.email, role: action.payload.role}
        default:
            return state
    }
}

export const fetchUser = (payload) => ({ type: FETCH_USER, payload })
