const stateDefault = {
    categorys: [],
    categoryDetailt: []
}

export const CategoryReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_CATEGORY': {
            state.categorys = action.categorys
            return { ...state }
        }
        case 'GET_CATEGORY_DETAILT': {
            state.categoryDetailt = action.categoryDetailt
            return { ...state }
        }
        default:
            return { ...state };
    }
}