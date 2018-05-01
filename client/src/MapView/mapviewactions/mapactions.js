import Geocode from 'react-geocode'

export function convertAddy(addy) {
  Geocode.fromAddress("addy").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location
        console.log(lat, lng)
  })
}
