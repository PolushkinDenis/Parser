const initState = {
    avaragePriceAutoRu: [],
    loading: false,
}

const FETCH_AVERAGEPRICE = "FETCH_AVERAGEPRICE"
const FETCH_AVERAGEPRICE_SUCCESS = "FETCH_AVERAGEPRICE_SUCCESS"
const DELETE_AVERAGEPRICE_AUTORU = "DELETE_AVERAGEPRICE"

export const avaragePriceAutoRuReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_AVERAGEPRICE:
            return { ...state, loading: true }
        case FETCH_AVERAGEPRICE_SUCCESS:
            console.log(action.payload)
            return { ...state, avaragePriceAutoRu: [...state.avaragePriceAutoRu, ...action.payload], loading: false }
        case DELETE_AVERAGEPRICE_AUTORU:
            return { ...state, avaragePriceAutoRu: [], loading: false }
        default:
            return state
    }
}

export const fetchAvaragePriceAutoRuAction = (payload) => ({ type: FETCH_AVERAGEPRICE, payload })
export const fetchAvaragePriceAutoRuSuccessAction = (payload) => ({ type: FETCH_AVERAGEPRICE_SUCCESS, payload })
export const deleteAvaragePriceAutoRu = (payload) => ({type: DELETE_AVERAGEPRICE_AUTORU, payload})