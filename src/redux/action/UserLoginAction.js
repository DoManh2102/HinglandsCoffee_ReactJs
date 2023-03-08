import React from "react";
import axios from "axios";

const api = `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`

export const LoginAction = (dataUser) => {
    return async (dispatch) => {
        try {
            let result = await axios({
                url: api,
                method: 'POST',
                data: dataUser
            })
            if (result.status === 200) {
                await dispatch({
                    type: 'LOGIN_ACTION',
                    userLogin: result.data
                })
            }
        } catch (error) {
            alert('Error! Sai thông tin tài khoản hoặc mật khẩu');
        }
    }
}

