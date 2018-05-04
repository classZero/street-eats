import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import glamorous from 'glamorous'
import Login from '../login/Login'
import {getTruckData} from './homeActions'
import MapViewHome from '../MapView/mapviewcomponents/MapsViewHome'
import HomeDropdown from '../dropdowns/homeDropdown/HomeDropdown'
import trucksvg from 'assets/images/truck.svg'

// import URegistration from '../UserRegistration/components/URegistration'

import './home.css'

export class Home extends Component {
  static defaultProps = {
    username: '',
    trucks: []
  }
  componentDidMount() {
    getTruckData()
  }
  
  render() {
    return (
      <div className="home-container">
        <div className="home-header">
          
          <div className="home-header-login">
            <p>Login:</p>
            <Login />
          </div>

          <div className="logo-container"><h1 className="content-headers-title">Street Eats</h1> <img className="logo-icon" src={trucksvg}/></div>

          <div className="home-header-dropdown">
            {this.props.username ? <p>Username : {this.props.username}</p> : ''}
            <HomeDropdown username={this.props.username}/>
          </div>

        </div>
        <div className="home-body-container">

          <div className="map-wrapper"><MapViewHome /></div>

          <div className="home-newsfeed">
            <h1 className="content-headers">Newest Trucks</h1>

            {this.props.trucks.map((truck, i) => {
              return {res: truck, index: i, value: truck.datecreated}
            }).sort((prev, curr) => {
              if (prev.value < curr.value) {
                return 1
              }
              if (prev.value > curr.value) {
                return -1
              }
              return 0
            }).map((el, i) => {
              if (i <= 4) {
              return (<Link className="newtruck-list-item" key={'key' + i} to={`/truckprofile/${el.res.username}`}><div >
                        <h3>{el.res.companyname}</h3>
                        <p>{el.res.formattedAddress}</p>
                      </div></Link>)
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('isAuth? ' + state.loginReducer.isAuthenticated)
  return {
    isAuthenticated: state.loginReducer.isAuthenticated,
    username: state.loginReducer.username,
    trucks: state.homeReducer.truckData
  }
}

export default connect(mapStateToProps)(Home)
