import { autoReducer } from "./autoReducer"
import {avaragePriceReducer} from "./averagePrice"
import { avaragePriceAutoRuReducer } from "./avaragePriceAutoRu"
import { userReducer } from "./userReducer"
import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import { avaragePriceDromReducer } from "./avaragePriceDrom"
import { filtersReducer } from "./filtersReducer"

export const rootReducer = combineReducers({
    auto: autoReducer,
    avaragePrice: avaragePriceReducer,
    avaragePriceAutoRuReducer: avaragePriceAutoRuReducer,
    avaragePriceDromReducer: avaragePriceDromReducer,
    filters: filtersReducer,
    user: userReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))