import { fetchAutoAction, fetchAutoSuccessAction } from "../autoReducer";
import axios from "axios";

// const filters = {
//     avito: true,
//     autoRu: false,
//     city: "samara",
//     brand: "bmw",
//     yearFrom: '1990',
//     yearTo: '2013',
//     priceFrom: '10000',
//     priceTo: '500000',
//     sorting: 's=104'
    
// }

export const fetchAvito = (filters) => {
    return function (dispatch) {
        dispatch(fetchAutoAction())
        axios.post('/api/auto', { filters }).then(res => dispatch(fetchAutoSuccessAction(res.data)))
    }
}