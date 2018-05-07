import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {changeSortView} from './homeActions'
import MapViewHome from '../MapView/mapviewcomponents/MapsViewHome'
import TruckListDropdown from '../dropdowns/homeDropdown/TruckListDropdown'
import HomeHeader from '../headers/HomeHeader'

import './home.css'
import '../dropdowns/homeDropdown/dropdown.css'

export class Home extends Component {
  static defaultProps = {
    username: '',
    trucks: [],
  }

  componentDidMount() {
    changeSortView('all')
  }

  render() {
    return (
      <div className="home-container">

        <HomeHeader username={this.props.username}/>

        <div className="home-body-container">

          <div className="map-wrapper"><MapViewHome /></div>
          
          <div className="list-wrapper">
            <div className="sort-bar-wrapper">
              <div className="dropdown-menu">
                <div>

                  <TruckListDropdown />

                </div>
              </div>
            </div>

            {/* <Link to="/payments">temp payments</Link> */}

            <div className="home-newsfeed">
              <div className="home-newsfeed-header">
                {this.props.sortType === 'new' ? <h1 className="content-headers">Newest Trucks</h1> :
                this.props.sortType === 'all' ? <h1 className="content-headers">All Trucks</h1> :
                this.props.sortType === 'alpha' ? <h1 className="content-headers">By Name</h1> :
                this.props.sortType === 'active' ? <h1 className="content-headers">Active Trucks</h1> :
                <h1 className="content-headers">All Trucks</h1>}
              </div>
              <div className="home-newsfeed-list">                               
                {this.props.trucks.length > 0 ? this.props.trucks.map((truck, i) => {
                  return (<div className="newtruck-list-item" key={'key' + i}><Link to={`/truckprofile/${truck.username}`}>
                            <h3>{truck.companyname}</h3>
                            <p>{truck.formattedAddress}</p>
                          </Link></div>)
                }) : <h3 className="newtruck-list-item">No trucks listed</h3>} 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('isAuth? ' + state.loginReducer.isAuthenticated)
  // console.log(state.homeReducer.truckData)
  return {
    isAuthenticated: state.loginReducer.isAuthenticated,
    username: state.loginReducer.username,
    trucks: state.homeReducer.truckData,
    sortType: state.homeReducer.sortType
  }
}

export default connect(mapStateToProps)(Home)
