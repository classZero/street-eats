import React, { Component } from 'react'
import {connect} from 'react-redux'
import {changeSortView} from '../../home/homeActions'
import './dropdown.css'

class TruckListDropdown extends Component {
  state = {
    showMenuList: false
  }
  
  handleClickList = (event) => {
    if (!this.state.showMenuList) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      //remove event handler and stay on page
      document.removeEventListener('click', this.handleOutsideClick, false)
    }

    this.setState(prevState => ({
      showMenuList: !prevState.showMenuList,
    }))
  }

  handleOutsideClick = (event) => {
    // ignore clicks on the component itself
    if (this.nodeL.contains(event.target)) {
      return
    }
    this.handleClickList()
  }

  componentWillUnmount = () => {
    //remove event handler before navigating away
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  componentDidMount() {
    changeSortView('all')
  }

  setSortType = (e) => {
    e.preventDefault()
    let type = e.target.value
    changeSortView(type)
  }

  render() {
    const btnColorList = this.state.showMenuList ? 'dropmenu-btn-sort color' : 'dropmenu-btn-sort noColor'
    const slider = this.state.showMenuList ? 'slider' : 'closed'
    return (
      <div className="dropdown-menu" ref={node => { this.nodeL = node }}>
        <div>
          <button onClick={this.handleClickList} className={btnColorList}>Sort &#9662;</button>
          <div className={slider} >
              <button onClick={this.setSortType} value="all">Show All</button>
              <button onClick={this.setSortType} value="new">Show Newest</button>
              <button onClick={this.setSortType} value="alpha">Show By Truck Name &#9652;</button>
              <button onClick={this.setSortType} value="alphaDesc">Show By Truck Name &#9662;</button>
              <button onClick={this.setSortType} value="active">Show Active Only</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    source: state.loginReducer.source
  }
}

export default connect(mapStateToProps)(TruckListDropdown)
