import store from '../../store'
import api from 'lib/api'
api.new('/api')

export function editTruckProfile(name, logo, aboutus, menuurl) {
    api.editTruckProfile(name, logo, aboutus, menuurl).then(resp => {
        // console.log(resp)
    })
}