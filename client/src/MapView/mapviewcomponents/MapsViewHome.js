import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import './mapviewhomestyles.css'
import Geocode from 'react-geocode'

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
  render () {
    return (
    <div>

{/* handles displaying the map with markers allows pop up window on click of pin to be fully customizable */}
      <div className="mapstestcontainer">
        <Map style={{width: '75%', height: '100%', position: 'relative'}} google={this.props.google} initialCenter={{lat:36.133348310973645 ,lng:-115.15630909218748 }} zoom={11}>
        
        {/* Handles markers display */}
        {/* <Marker onClick={this.onMarkerClick}
          name={'Your position'}
          position={{lat: 36.133348310973645, lng:-115.15630909218748}} />

            <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>Truck Name</h1>
              <h4>Address of Truck</h4>
            </div>
        </InfoWindow> */}

        </Map>
        
      </div>

{/* handles console logging out lat and lng from address input WILL want to seperate this to post the lat and lng to database to pull into the map position to display markers*/}
      {/* <div>
      <script>
  {Geocode.fromAddress("12278 Kings Eagle Street Las Vegas").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location
    console.log(lat, lng)
  }
)}
  </script>
  </div> */}

    </div>
      
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCDLogqDYFJwnbzP-tbRaO3tCMiEpmY0_Y')
})(MapViewHome)
