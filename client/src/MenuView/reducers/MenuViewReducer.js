const initialState = {
    activeMenu: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_MENU':
            return {...state, activeMenu: action.payload }
        default:
            return state
    }
}