const initState = {
    avaragePrice: [],
    loading: false,
}

const FETCH_AVERAGEPRIVE = "FETCH_AVERAGEPRIVE"
const FETCH_AVERAGEPRIVE_SUCCESS = "FETCH_AVERAGEPRIVE_SUCCESS"
const DELETE_AVERAGEPRICE = "DELETE_AVERAGEPRICE"

export const avaragePriceReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_AVERAGEPRIVE:
            return { ...state, loading: true }
        case FETCH_AVERAGEPRIVE_SUCCESS:
            console.log(action.payload)
            return { ...state, avaragePrice: [...state.avaragePrice, ...action.payload], loading: false }
        case DELETE_AVERAGEPRICE:
            return { ...state, avaragePrice: [], loading: false }
        default:
            return state
    }
}

export const fetchAvaragePriceAction = (payload) => ({ type: FETCH_AVERAGEPRIVE, payload })
export const fetchAvaragePriceSuccessAction = (payload) => ({ type: FETCH_AVERAGEPRIVE_SUCCESS, payload })
export const deleteAvaragePrice = (payload) => ({type: DELETE_AVERAGEPRICE, payload})