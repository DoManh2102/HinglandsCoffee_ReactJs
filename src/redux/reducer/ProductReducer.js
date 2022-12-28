const stateDefault = {
    productList: [],
    productDetailt: [],
    productSearch: null,
}

export const ProductReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_PRODUCT': {
            state.productList = action.productList
            state.productList.reverse(); // đảo ngược thứ tự mảng
            return { ...state }
        }
        case 'GET_PRODUCT_DETAILT': {
            state.productDetailt = action.productDetailt
            return { ...state }
        }
        case 'GET_PRODUCT_SEARCH': {
            state.productSearch = action.productSearch
            return { ...state }
        }
        default:
            return { ...state };
    }
}