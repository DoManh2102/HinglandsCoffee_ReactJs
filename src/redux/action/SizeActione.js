import axios from "axios"

const API = 'http://localhost:3100/api/v1/size/'

export const getAllSizeAction = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: API,
                method: 'GET'
            })
            await dispatch({
                type: 'GET_ALL_SIZE',
                size: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const addSizeAction = (data) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: API,
                method: 'POST',
                data: data
            })
            await dispatch(getAllSizeAction())
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateSizeAction = (id, data) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: API + `${id}`,
                method: 'POST',
                data: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}




