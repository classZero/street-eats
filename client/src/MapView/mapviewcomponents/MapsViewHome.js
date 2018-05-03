import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import './mapviewhomestyles.css'
import Geocode from 'react-geocode'
import {getCords} from '../mapviewactions/mapactions'
import {connect} from 'react-redux'

class MapViewHome extends Component {
  static defaultProps = {
    trucks: []
  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedName: '',
    selectedLocation: ''
  }

  componentDidMount(){
    // getCords()  replaced with homeReducer trucks list
  }

  onClickMarker = (props, marker, e) => {
    this.setState({
      selectedName: props.title,
      selectedLocation: props.location,
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
    // <div>

      // <div className="mapstestcontainer" style={{width: '900px', height: '100px'}}>
        <Map style={{width: '100%', height: '100%', position: 'relative'}} onClick={this.onMapClicked} google={this.props.google} initialCenter={{lat:36.133348310973645 ,lng:-115.15630909218748 }} zoom={11}>
        {this.props.trucks.map((truck, i) => (
          // <div key={'key' + i}>
          <Marker 
          key={'key'+i}
          onClick={this.onClickMarker}
          title={truck.companyname}
          location={truck.formattedAddress}
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
        
      // </div>
    //   <p>{this.state.selectedName}</p>
    //   <p>{this.state.selectedLocation}</p>
    // </div>
      
    )
  }
}

function mapStateToProps(state) {
    return {
        username: state.loginReducer.username,
        // mapdata: state.mapreducer.mappop,        replaced with home reducer
        trucks: state.homeReducer.truckData
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyCDLogqDYFJwnbzP-tbRaO3tCMiEpmY0_Y')
})(MapViewHome))
