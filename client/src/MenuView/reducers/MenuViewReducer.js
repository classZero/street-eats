const initialState = {
    activeMenu: [],
    cart: [],
    cartTotal: 0,
    cartSource: '',
    cartView: false
}

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
        	return {...state, cart: [], cartTotal: 0, cartSource: ''}
        case 'VIEW_CART':
            return {...state, cartView: true}
        case 'HIDE_CART':
            return {...state, cartView: false}
        default:
            return state
    }
}