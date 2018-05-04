import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTruckData} from './homeActions'
import MapViewHome from '../MapView/mapviewcomponents/MapsViewHome'
import HomeHeader from '../headers/HomeHeader'

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

        <HomeHeader username={this.props.username}/>

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
