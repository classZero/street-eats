import api from '../../lib/api'
api.new('/api')

export function editTruckProfile(name, logo, aboutus, menuurl, username) {
    api.editTruckProfile(name, logo, aboutus, menuurl, username).then(resp => {
    })
}