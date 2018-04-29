import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'


class MapViewHome extends Component {
  render () {
    return (
      <div>
        <h1>Hello World</h1>

      <Map google={this.props.google} zoom={14}>
 
 <Marker onClick={this.onMarkerClick}
         name={'Current location'} />
</Map>
</div>
      
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCDLogqDYFJwnbzP-tbRaO3tCMiEpmY0_Y')
})(MapViewHome)
