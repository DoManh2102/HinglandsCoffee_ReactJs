import axios from "axios";

// const api = `http://localhost:3100/api/v1/user`
const api = `http://localhost:3100/api/v1/user`


export const getUserAdminAction = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: api,
                method: 'GET'
            })
            dispatch({
                type: 'GET_USER_ADMIN',
                userAdmin: result.data.filter(user => user.type === "Admin")
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getUserClientAction = () => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: api,
                method: 'GET'
            })
            dispatch({
                type: 'GET_USER_CLIENT',
                userClient: result.data.filter(user => user.type === "Client")
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteAdminAction = (id) => {
    return (dispatch) => {
        axios({
            url: api + `/${id}`,
            method: 'DELETE'
        })
            .then(res => {
                dispatch(getUserAdminAction())
            })
            .catch(err => console.log(err))
    }
}