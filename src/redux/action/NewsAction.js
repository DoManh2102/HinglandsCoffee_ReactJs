import axios from "axios"

const API = `${process.env.REACT_APP_BACKEND_URL}/api/v1/news`

export const getNewsLisAction = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: API,
                method: 'GET'
            })
            await dispatch({
                type: 'GET_NEWS',
                newList: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getNewsDetailt = (id) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: API + `/${id}`,
                method: 'GET'
            })
            dispatch({
                type: 'GET_NEWS_DETAILT',
                newsDetailt: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export const addNewsAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: API,
                method: 'POST',
                data: formData
            })
            await dispatch(getNewsLisAction())
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateNewsAction = (formData, id) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: API + `/${id}`,
                method: 'POST',
                data: formData
            })
            await dispatch(getNewsLisAction())
            console.log('Update thành công')
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteNewsAction = (id) => {
    return async (dispatch) => {
        try {
            await axios({
                url: API + `/${id}`,
                method: 'DELETE',
            })
            dispatch(getNewsLisAction())
        } catch (error) {
            console.log(error)
        }
    }
}