let user = {}
if (localStorage.getItem('USER_LOGIN')) {
    user = JSON.parse(localStorage.getItem('USER_LOGIN'))
}

const stateDefault = {
    userLogin: user,
}

export const UserLoginReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LOGIN_ACTION': {
            state.userLogin = action.userLogin
            localStorage.setItem('USER_LOGIN', JSON.stringify(state.userLogin));
            localStorage.setItem('TOKEN', state.userLogin.token)
            return { ...state }
        }

        default:
            return { ...state };
    }
}