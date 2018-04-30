import store from '../../store'

export function getProfile() {
    fetch('https://jsonplaceholder.typicode.com/users/1').then(resp => resp.json()).then(resp => {
        store.dispatch({
            type: 'GET_PROFILE',
            payload : resp
        })
    })
}