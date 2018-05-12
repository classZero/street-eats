const initialState = {
    profile : {},
    reviews : []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_PROFILE':
        return {...state, profile: action.payload}
        case 'GET_REVIEWS':
            return {...state, reviews: action.payload.results}
        case 'ADDED_FAVORITE':
            return {...state, message: action.payload}
        default:
            return state
    }
}
