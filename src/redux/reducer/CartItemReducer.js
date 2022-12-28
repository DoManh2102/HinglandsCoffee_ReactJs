const stateDefault = {
    cartItem: [],
}

export const CartItemsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_CART_ITEM': {
            state.cartItem = action.cartItem
            return { ...state }
        }
        default:
            return { ...state };
    }
}