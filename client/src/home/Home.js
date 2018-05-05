import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTruckData, changeSortView} from './homeActions'
import MapViewHome from '../MapView/mapviewcomponents/MapsViewHome'
import TruckListDropdown from '../dropdowns/homeDropdown/TruckListDropdown'
import HomeHeader from '../headers/HomeHeader'
import MapModal from '../modals/MapModal'

import './home.css'
import '../dropdowns/homeDropdown/homeDropdown.css'

export class Home extends Component {
  static defaultProps = {
    username: '',
    trucks: [],
  }
  state = {
    showMenu: ''
  }
  componentDidMount() {
    changeSortView('all')
  }

  setSortType = (e) => {
    e.preventDefault()
    let type = e.target.value

    changeSortView(type)

  }

  //sorting dropdown menu
  showMenu = (event) => {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }
  hideMenu = (event) => {
    event.preventDefault();
    
    this.setState({ showMenu: false }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }
  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    })
  }

  render() {
    const classes = this.state.showMenu ? 'menu' : 'menu hide'
    
    return (
      <div className="home-container">

        <HomeHeader username={this.props.username}/>

        <div className="home-body-container">

          <div className="map-wrapper"><MapViewHome /></div>
          
          <div>
            <div className="sort-bar-wrapper">
              <div className="dropdown-menu">
                <div>
                  <button onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu} className="dropmenu-btn sort">Sort By &#9662;</button>
                  <div className={classes} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
                    <button onClick={this.setSortType} value="all">Show All</button>
                    <button onClick={this.setSortType} value="new">Show Newest</button>
                    <button onClick={this.setSortType} value="alpha">Show By Company Name</button>
                    <button onClick={this.setSortType} value="active">Show Active Only</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-newsfeed">
              <div className="home-newsfeed-header">
                {this.props.sortType === 'new' ? <h1 className="content-headers">Newest Trucks</h1> :
                this.props.sortType === 'all' ? <h1 className="content-headers">All Trucks</h1> :
                this.props.sortType === 'alpha' ? <h1 className="content-headers">By Name  &#9662;</h1> :
                this.props.sortType === 'active' ? <h1 className="content-headers">Active Trucks</h1> :
                <h1 className="content-headers">All Trucks</h1>}
              </div>
              {/* <div className="home-newsfeed-list">                                */}
                {this.props.trucks.length > 0 ? this.props.trucks.map((truck, i) => {
                  return (<Link className="newtruck-list-item" key={'key' + i} to={`/truckprofile/${truck.username}`}>
                            <h3>{truck.companyname}</h3>
                            <p>{truck.formattedAddress}</p>
                          </Link>)
                }) : <h3 className="newtruck-list-item">No trucks listed</h3>} 
              {/* </div> */}
            </div>
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
    trucks: state.homeReducer.truckData,
    sortType: state.homeReducer.sortType
  }
}

export default connect(mapStateToProps)(Home)
