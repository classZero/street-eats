import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {HomeHeader} from 'headers/HomeHeader'

import {getMenu} from '../actions/MenuViewActions'
import './MenuView.css'

class MenuView extends Component{
	state = {
	}

	componentDidMount(){
		getMenu(this.props.match.params.username)
	}

	render(){
		return(
			<div className="tprofile-menu-container">
				<div className="tprofile-header">
            		<p>Menu</p>
                </div>
                {this.props.menu.map((item, i) => (
            				<div key={"menuitem-" + i} className="menuview-menu-item">
            					<h3>{item.itemName}</h3>
            					<h3>${item.itemPrice}</h3>
            					<h4>{item.itemType}</h4>
            					<p>{item.itemDescription}</p>
            				</div>
            			)
            	)}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
  	menu: state.MenuViewReducer.activeMenu

  }
}

export default withRouter(connect(mapStateToProps)(MenuView))