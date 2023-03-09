import axios from "axios"
import Swal from 'sweetalert2'

const API = `${process.env.REACT_APP_BACKEND_URL}/api/v1/product`

export const getProductListApi = (handleToggleLoading) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: API,
                method: 'GET'
            })
            await dispatch({
                type: 'GET_PRODUCT',
                productList: result.data
            })
            await handleToggleLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
}

export const getProductSearch = (name) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: API + `/?name=${name}`,
                method: 'GET'
            })
            await dispatch({
                type: 'GET_PRODUCT_SEARCH',
                productSearch: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getManageProductSearch = (name) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: API + `/?name=${name}`,
                method: 'GET'
            })
            await dispatch({
                type: 'GET_PRODUCT',
                productList: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getProductDetailt = (id) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: API + `/${id}`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_PRODUCT_DETAILT',
                productDetailt: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const addProductApi = (formData) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: API,
                method: 'POST',
                data: formData
            })
            await dispatch(getProductListApi())
            Swal.fire('Thêm thành công')
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateProductAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: API + `/${id}`,
                method: 'POST',
                data: formData
            })
            await dispatch(getProductListApi())
            Swal.fire('Sửa thành công')
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteProductApi = (id) => {
    return async (dispatch) => {
        try {
            await axios({
                url: API + `/${id}`,
                method: 'DELETE',
            })
            dispatch(getProductListApi())
        } catch (error) {
            console.log(error)
        }
    }
}

