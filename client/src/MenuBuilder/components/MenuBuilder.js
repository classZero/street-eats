import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import {HomeHeader} from 'headers/HomeHeader'

import {getMenu} from 'MenuView/actions/MenuViewActions'
import {addItem, removeItem} from '../actions/MenuBuilderActions'
import './MenuBuilder.css'

class MenuBuilder extends Component{
	state = {
		itemName: '',
		itemPrice: '',
		itemDescription: '',
		itemType: 'entree',
	}
	componentDidMount(){
		getMenu(this.props.username).then(console.log('menuprop: ',this.props.menu))
	}

	handleChange = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.itemName && this.state.itemPrice && this.state.itemDescription && this.state.itemType){
			addItem({
				itemName: this.state.itemName,
				itemPrice: this.state.itemPrice,
				itemDescription: this.state.itemDescription,
				itemType: this.state.itemType,
				username: this.props.username
			}).then(resp => {
				getMenu(this.props.username)
				this.setState({
					itemName: '',
					itemPrice: '',
					itemDescription: '',
					itemType: 'entree',
				})
			})
		} else{
			window.alert('Please fill out all fields before adding an item')
		}
	}
	handleRemove = (e, itemID) => {
		e.preventDefault()
		// console.log(itemID)
		removeItem(itemID).then(resp => getMenu(this.props.username))
	}

	render(){
		return(
			<div className="editmenu-container">
				<header className="menubuilder-header">
                    <h1>Edit Menu</h1>
                    <button onClick={ e => this.props.toggle(e)} className="menubuilder-toggle">Edit Profile</button>
                </header>
				<form onSubmit={this.handleSubmit} id="menuBuilderForm">
					<label>Item Name <input onChange={this.handleChange} type="text" name="itemName" value={this.state.itemName} /></label>
					<label>Item Price <input onChange={this.handleChange} type="text" name="itemPrice" value={this.state.itemPrice} /></label>
					<label>Item Description <input onChange={this.handleChange} type="text" name="itemDescription" value={this.state.itemDescription} /></label>
					<label>Item Type 
						<select onChange={this.handleChange} value={this.state.itemType} name="itemType">
							<option value="drink">Drink</option>
							<option value="side">Side</option>
							<option value="entree" >Entree</option>
							<option value="dessert">Dessert</option>
						</select>
					</label>
					<button type="submit">Add Item</button>
				</form>
				{this.props.menu.map((item, i) => (
						<div key={"menuitem-" + i} className="menuview-menu-item">
        					<h3>{item.itemName}</h3>
        					<h3>${item.itemPrice}</h3>
        					<h4>{item.itemType}</h4>
        					<p>{item.itemDescription}</p>
        					<button onClick={ e => this.handleRemove(e, item.id)} className="menubuilder-remove-button">X</button>
        				</div>	
					)
				)}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    source : state.loginReducer.source,
    isAuth: state.loginReducer.isAuthenticated,
    username: state.loginReducer.username,
    menu: state.MenuViewReducer.activeMenu
  }
}

export default connect(mapStateToProps)(MenuBuilder)