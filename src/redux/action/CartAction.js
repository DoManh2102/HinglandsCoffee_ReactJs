import axios from "axios"
import { getListCartItem } from "./CartItemsAction"

const api = `${process.env.REACT_APP_BACKEND_URL}/api/v1/cart`


export const getCartAction = () => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: api,
                method: 'GET'
            })
            dispatch({
                type: 'GET_LIST_CART',
                productCart: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// export const addOrderAction = (data) => {
//     return async (dispatch) => {
//         try {
//             const result = await axios({
//                 url: api,
//                 method: 'POST',
//                 data: data
//             })
//             await dispatch(getCartAction())
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }