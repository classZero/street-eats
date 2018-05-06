const initialState = {
    profile : {},
    favorites: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_USER_PROFILE':
            return {...state, profile: action.payload}
        case 'GET_FAVORITES':
            return {...state, favorites: action.payload}
        default:
            return state
    }
}