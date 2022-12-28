import axios from "axios";
import Swal from 'sweetalert2'

const api = 'http://localhost:3100/api/v1/category'

export const getCategoryListAction = () => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: api,
                method: 'GET'
            })
            dispatch({
                type: 'GET_CATEGORY',
                categorys: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getCategoryDetailt = (id) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: api + `/${id}`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_CATEGORY_DETAILT',
                categoryDetailt: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export const addCategoryAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: api,
                method: 'POST',
                data: formData
            })
            await dispatch(getCategoryListAction())
            Swal.fire('Thêm thành công')
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteCategoryAction = (id) => {
    return async (dispatch) => {
        await axios({
            url: api + `/${id}`,
            method: 'DELETE'
        })
            .then(res => {
                dispatch(getCategoryListAction())
            })
            .catch(err => console.log(err))
    }
}