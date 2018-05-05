import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import './mapviewhomestyles.css'
import Geocode from 'react-geocode'
import moment from 'moment'
import {getCords} from '../mapviewactions/mapactions'
import {connect} from 'react-redux'
import { MapModal } from '../../modals/MapModal';

class MapViewHome extends Component {
  static defaultProps = {
    trucks: []
  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedName: '',
    selectedLocation: '',
    open: '',
    close: '',
    isModalOpen: false
  }
    
  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  onClickMarker = (props, marker, e) => {
    this.setState({
      selectedName: props.title,
      selectedLocation: props.location,
      open: this.formatISODate(props.open),
      close: this.formatISODate(props.close),
      activeMarker: marker,
      showingInfoWindow: true
    })
    this.openModal()
  }

  formatISODate = (date) => {
    let d = moment(date).format('hh:mm:ss a')
    return d
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
        <Map style={{width: '100%', height: '100%', position: 'relative'}} onClick={this.onMapClicked} google={this.props.google} initialCenter={{lat:36.133348310973645 ,lng:-115.15630909218748 }} zoom={11}>
        {this.props.trucks.filter(truck => truck.isActive === 1 ? true : false ).map((truck, i) => {
            return ( <Marker 
                      key={'key'+i}
                      onClick={this.onClickMarker}
                      title={truck.companyname}
                      location={truck.formattedAddress}
                      position={{lat: truck.lat, lng: truck.lng}} 
                      open={truck.timeopen}
                      close={truck.timeclose}
                      />
            )
        })}
        </Map>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} className="modal-wrapper">
          <h1>{this.state.selectedName}</h1>
          <p>{this.state.selectedLocation}</p>
          <p>Open: {this.state.open}   Close: {this.state.close}</p>
          <p><button onClick={() => this.closeModal()}>Close</button></p>
        </Modal>
        
    </div>
    )
  }
}


class Modal extends Component {
  render() {
    if (this.props.isOpen === false)
      return null

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: 'rgb(235, 85, 73)',
      borderRadius: '5px'
    }

    if (this.props.width && this.props.height) {
      modalStyle.width = this.props.width + 'px'
      modalStyle.height = this.props.height + 'px'
      modalStyle.marginLeft = '-' + (this.props.width/2) + 'px',
      modalStyle.marginTop = '-' + (this.props.height/2) + 'px',
      modalStyle.transform = null
    }

    if (this.props.style) {
      for (let key in this.props.style) {
        modalStyle[key] = this.props.style[key]
      }
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    if (this.props.backdropStyle) {
      for (let key in this.props.backdropStyle) {
        backdropStyle[key] = this.props.backdropStyle[key]
      }
    }

    return (
      <div className={this.props.containerClassName}>
        <div className={this.props.className} style={modalStyle}>
          {this.props.children}
        </div>
        {!this.props.noBackdrop &&
            <div className={this.props.backdropClassName} style={backdropStyle}
                 onClick={e => this.close(e)}/>}
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}



function mapStateToProps(state) {
    return {
        username: state.loginReducer.username,
        trucks: state.homeReducer.truckData
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyCDLogqDYFJwnbzP-tbRaO3tCMiEpmY0_Y')
})(MapViewHome))
