const stateDefault = {
    newList: [],
    newsDetailt: [],
}

export const NewsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_NEWS': {
            state.newList = action.newList
            state.newList.reverse(); // đảo ngược thứ tự mảng
            return { ...state }
        }
        case 'GET_NEWS_DETAILT': {
            state.newsDetailt = action.newsDetailt
            return { ...state }
        }
        default:
            return { ...state };
    }
}