const stateDefault = {
    userAdmin: [],
    userClient: [],
}

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_USER_ADMIN': {
            state.userAdmin = action.userAdmin
            return { ...state }
        }
        case 'GET_USER_CLIENT': {
            state.userClient = action.userClient
            return { ...state }
        }
        default:
            return { ...state };
    }
}