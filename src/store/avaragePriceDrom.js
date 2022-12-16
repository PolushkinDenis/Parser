const initState = {
    avaragePriceDrom: [],
    loading: false,
}

const FETCH_AVERAGEPRICE_DROM = "FETCH_AVERAGEPRICE_DROM"
const FETCH_AVERAGEPRICE_DROM_SUCCESS = "FETCH_AVERAGEPRICE_DROM_SUCCESS"
const DELETE_AVERAGEPRICE_DROM = "DELETE_AVERAGEPRICE_DROM"

export const avaragePriceDromReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_AVERAGEPRICE_DROM:
            return { ...state, loading: true }
        case FETCH_AVERAGEPRICE_DROM_SUCCESS:
            console.log(action.payload)
            return { ...state, avaragePriceDrom: [...state.avaragePriceDrom, ...action.payload], loading: false }
        case DELETE_AVERAGEPRICE_DROM:
            return { ...state, avaragePriceDrom: [], loading: false }
        default:
            return state
    }
}

export const fetchAvaragePriceDromAction = (payload) => ({ type: FETCH_AVERAGEPRICE_DROM, payload })
export const fetchAvaragePriceDromSuccessAction = (payload) => ({ type: FETCH_AVERAGEPRICE_DROM_SUCCESS, payload })
export const deleteAvaragePriceDrom = (payload) => ({type: DELETE_AVERAGEPRICE_DROM, payload})