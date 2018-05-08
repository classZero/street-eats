const initialState = {
    activeMenu: [],
    cart: [],
    cartTotal: 0
}


export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_MENU':
            return {...state, activeMenu: action.payload }
        case 'ADD_TO_CART':
        	return {...state, cart: [...state.cart, action.payload]}
        case 'CLEAR_CART':
        	return {...state, cart: [], cartTotal: 0}
        default:
            return state
    }
}