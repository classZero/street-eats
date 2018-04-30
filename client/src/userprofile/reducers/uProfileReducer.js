const initialState = {
    profile : {}
}


export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_USER_PROFILE':
            return {...state, profile: action.payload}
        default:
            return state
    }
}