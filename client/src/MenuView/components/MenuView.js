import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {HomeHeader} from 'headers/HomeHeader'

import {getMenu} from '../actions/MenuViewActions'
import './MenuView.css'

class MenuView extends Component{
	state = {
  }
  
  static defaultProps = {
    menu: []
  }

	componentDidMount(){
		getMenu(this.props.match.params.username).then(resp => console.log(this.props.menu))
	}

	render(){
		return(
			<div className="tprofile-menu-container">
				<div className="tprofile-header menuview-header">
            		<p>Menu</p>
            		<button onClick={ e => this.props.toggle(e)} className="menuview-toggle">View Reviews</button>
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
