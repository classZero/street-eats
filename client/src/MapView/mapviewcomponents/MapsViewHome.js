import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import './mapviewhomestyles.css'
import Geocode from 'react-geocode'
import MapViewInputs from './MapViewInputs'

class MapViewHome extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  })
/* handles console logging out lat and lng from address input WILL want to seperate this to post the lat and lng to database to pull into the map position to display markers*/ 
onSubmit = Geocode.fromAddress("12278 kings eagle street las vegas 89141").then(
    response => {
      const { lat, lng } = response.results[0].geometry.location
      console.log(lat, lng)
    }
  )
  render () {
    return (
    <div>

{/* handles displaying the map with markers allows pop up window on click of pin to be fully customizable */}
      <div className="mapstestcontainer">
        <Map style={{width: '100%', height: '75%', position: 'relative'}} google={this.props.google} initialCenter={{lat:36.133348310973645 ,lng:-115.15630909218748 }} zoom={11}>
        
        {/* Handles markers display */}
        <Marker onClick={this.onMarkerClick}
          position={{lat: 35.9658194, lng:-115.1891859}} 
          />
            <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>Truck Name this can link to the profile/menu page</h1>
              <h4>Address of Truck</h4>
              <h6>OPTIONAL special info</h6>
            </div>
        </InfoWindow>

        </Map>
        
      </div>

    </div>
      
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCDLogqDYFJwnbzP-tbRaO3tCMiEpmY0_Y')
})(MapViewHome)
