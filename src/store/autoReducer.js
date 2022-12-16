const initState = {
    autoRes: [],
    loading: false,
}

const FETCH_AUTO = "FETCH_AUTO"
const FETCH_AUTO_SUCCESS = "FETCH_AUTO_SUCCESS"
const DELETE_AUTO = "DELETE_AUTO"

export const autoReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_AUTO:
            return { ...state, loading: true }
        case FETCH_AUTO_SUCCESS:
            return { ...state, autoRes: [...state.autoRes, ...action.payload], loading: false}
        case DELETE_AUTO: 
            return {...state, autoRes: [], loading: false}
        default:
            return state
    }
}

export const fetchAutoAction = (payload) => ({ type: FETCH_AUTO, payload })
export const fetchAutoSuccessAction = (payload) => ({ type: FETCH_AUTO_SUCCESS, payload })
export const deleteAutos = (payload) => ({type: DELETE_AUTO, payload})