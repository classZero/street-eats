import axios from 'axios'





export function editTruckProfile(name, logo, aboutus, menuurl) {
    axios.post('/api/edittruckprofile', {name, logo, aboutus, menuurl}).then(resp => {
        console.log(resp.data)
    })
}