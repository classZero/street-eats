const initialState = {
    name : "",
    website: ""
}


export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_PROFILE':
            return {...state, profile: action.payload}
        default:
            return state
    }
}