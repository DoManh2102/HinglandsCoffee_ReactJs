import axios from "axios"
import Swal from 'sweetalert2'

const api = 'http://localhost:3100/api/v1/cartItems'
export const getListCartItem = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: api,
                method: 'GET'
            })
            await dispatch({
                type: 'GET_CART_ITEM',
                cartItem: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const addCartItem = (data) => {
    console.log(data);
    return async (dispatch) => {
        try {
            const result = await axios({
                url: api,
                method: 'POST',
                data: data
            })
            await dispatch(getListCartItem())
        } catch (error) {
            console.log(error);
        }
    }
}