const initialState = {
    profile : {},
    favorites: [{username: null}],
    reviews: [],
    orders: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_USER_PROFILE':
            return {...state, profile: action.payload}
        case 'GET_FAVORITES':
            return {...state, favorites: action.payload}
        case 'REMOVE_FAVORITE':
            return {...state, removeMessage: action.payload}
        case 'GET_USERS_REVIEWS':
            return {...state, reviews: action.payload}
        case 'DELETE_REVIEW':
            return {...state, deleteReviewMessage: action.payload}
        case 'EDIT_REVIEW':
            return {...state, editReviewMessage: action.payload}
        case 'GET_ORDERS':
            return {...state, orders: action.payload.results}
        default:
            return state
    }
}
