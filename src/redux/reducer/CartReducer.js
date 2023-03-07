
let cart_item = []
if (localStorage.getItem('CART_ITEM')) {
    cart_item = JSON.parse(localStorage.getItem('CART_ITEM'))
}
let stateDefault = {
    product: {},
    productCart: [],
    cart: cart_item,
    cartSearch: []
}

export const CartReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            console.log(action.product);
            state.product = action.product
            state.product = {
                ...state.product,
                quantity: 1,
                size: 'M'
            }
            let index = state.productCart.findIndex(product => product.id === state.product.id)
            if (index !== -1) {
                alert('Sản phẩm đã có trong giỏ hàng')
            } else {
                state.productCart.push(state.product)
            }
            return { ...state }
        }
        case 'DELETE_CART_ITEM': {
            state.productCart.splice(action.product, 1)
            return { ...state }
        }
        case 'EDIT_CART_ITEM': {
            // xử lý thay đổi số lượng cart_item
            state.productCart.forEach((element, index) => {
                if (element.id === action.product.product.id) {
                    action.product.product.quantity = action.product.quantity
                    state.productCart[index] = action.product.product
                }
            });
            return { ...state }
        }

        case 'CHECK_OUT_PAYLOAD': {
            state.cart.push(action.cart)
            localStorage.setItem('CART_ITEM', JSON.stringify(state.cart));
            state.productCart = [] // thanh toán xong reset productCart
            return { ...state }
        }
        case 'DELETE_ORDER': {
            const index = state.cart.findIndex(item => item == action.order)
            state.cart.splice(index, 1)
            localStorage.setItem('CART_ITEM', JSON.stringify(state.cart));
            return { ...state }
        }
        case 'CART_ITEM_SEARCH': {
            state.cartSearch = state.cart.filter(item => item.user_name === action.name.trim())
            return { ...state }
        }
        default:
            return { ...state };
    }
}