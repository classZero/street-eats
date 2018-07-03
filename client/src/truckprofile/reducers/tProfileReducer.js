const initialState = {
    profile : {},
    reviews : [],
    average : 0,
    isFavorite : false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case "GET_PROFILE":
        return {...state, profile: action.payload}
        case "GET_REVIEWS":
            return {...state, reviews: action.payload.reviews,
                              average: action.payload.avgReview}
        case "ADDED_FAVORITE":
            return {...state, message: action.payload}
        case "IS_FAVORITE":
            return {...state, isFavorite: action.payload}
        default:
            return state
    }
}
