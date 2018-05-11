const initialState = {
    activeMenu: [],
    cart: [],
    cartTotal: 0,
    cartSource: 'fizz'
}

//not currently using cartTotal, possibly remove in future, might be useful to prevent editing of total by user though

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_MENU':
            return {...state, activeMenu: action.payload }
        case 'ADD_TO_CART':
        	return {...state, cart: [...state.cart, action.payload]}
        case 'UPDATE_CART_SOURCE':
            return {...state, cartSource: action.payload}
        case 'TOTAL_CART':
            return {...state, cartTotal: action.payload}
        case 'REMOVE_FROM_CART':
        	return {...state, cart: action.payload}
        case 'CLEAR_CART':
        	return {...state, cart: [], cartTotal: 0}
        default:
            return state
    }
}