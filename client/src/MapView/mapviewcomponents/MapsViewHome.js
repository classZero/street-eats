import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import './mapviewhomestyles.css'
import Geocode from 'react-geocode'
import {getCords} from '../mapviewactions/mapactions'
import {connect} from 'react-redux'

class MapViewHome extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  componentDidMount(){
    getCords(this.props.username)
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
        <Map style={{width: '100%', height: '75%', position: 'relative'}} google={this.props.google} initialCenter={{lat:36.133348310973645 ,lng:-115.15630909218748 }} zoom={11}>
        
        {/* {data.map(stuff => ( */}

        {/* Handles markers display */}
        <Marker onClick={this.onMarkerClick}
          position={{lat: 36.1658194, lng:-115.1891859}} 
          />

      
          <Marker onClick={this.onMarkerClick}
          position={{lat: this.props.username.lat, lng: this.props.username.lng}} 
          />
          
            <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>Name of Truck</h1>
              <h4>Address of Truck</h4>
              <h6>OPTIONAL special info</h6>
            </div>
        </InfoWindow>
        
        {/* ))} */}

        </Map>
        
      </div>

    </div>
      
    )
  }
}

function mapStateToProps(state) {
    return {
        username: state.loginReducer.username
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyCDLogqDYFJwnbzP-tbRaO3tCMiEpmY0_Y')
})(MapViewHome))
