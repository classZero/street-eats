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
    selectedPlace: '',
  }

  componentDidMount(){
    getCords(this.props.username)
  }

  onClickMarker = (props, marker, e) => {
    this.setState({
      selectedPlace: props.title,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  render () {
    return (
    <div>

      <div className="mapstestcontainer">
        <Map style={{width: '100%', height: '75%', position: 'relative'}} onClick={this.onMapClicked} google={this.props.google} initialCenter={{lat:36.133348310973645 ,lng:-115.15630909218748 }} zoom={11}>
        {this.props.mapdata.map((truck, i) => (
          // <div key={'key' + i}>
          <Marker 
          key={'key'+i}
          onClick={this.onClickMarker}
          title={truck.companyname}
          position={{lat: truck.lat, lng: truck.lng}} 
          />
          // <InfoWindow
          //   marker={this.state.activeMarker}
          //   visible={this.state.showingInfoWindow}>
          //     <div>
          //       <h1>{truck.companyname}</h1>
          //       <h4>Address of Truck</h4>
          //       <h6>{truck.specialinfo}</h6>
          //     </div>
          // </InfoWindow>
          //{/* </div> */}
          ))}
        </Map>
        
      </div>
      <p>{this.state.selectedPlace}</p>
    </div>
      
    )
  }
}

function mapStateToProps(state) {
    return {
        username: state.loginReducer.username,
        mapdata: state.mapreducer.mappop
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyCDLogqDYFJwnbzP-tbRaO3tCMiEpmY0_Y')
})(MapViewHome))
