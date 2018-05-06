import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {addItem, getMenu} from '../actions/MenuBuilderActions'
import './temp.css'

class MenuBuilder extends Component{
	state = {
		itemName: '',
		itemPrice: '',
		itemDescription: '',
		itemType: 'entree',
		displayArr: []
	}


	handleChange = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		addItem({
			itemName: this.state.itemName,
			itemPrice: this.state.itemPrice,
			itemDescription: this.state.itemDescription,
			itemType: this.state.itemType
		})
	}

	displayMenu = () => {
		getMenu(21).then(resp => {
			this.setState({
				displayArr: resp.data.menu
			})
			console.log('response: ', resp.data) 
		})
	}
	

	render(){
		return(
			<div className="testzone">
				<h1 className="content-headers"> Hello World </h1>
				<form onSubmit={this.handleSubmit} id="menuBuilderForm">
					<label>Item Name <input onChange={this.handleChange} type="text" name="itemName"/></label>
					<label>Item Price <input onChange={this.handleChange} type="text" name="itemPrice"/></label>
					<label>Item Description <input onChange={this.handleChange} type="text" name="itemDescription" /></label>
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
				<button onClick={this.displayMenu}>get menu test</button>
				{this.state.displayArr.map((item, i) => (
						<div>
							<h3>{item.itemName}</h3>
						</div>
					)
				)}
				<Link to="/">Home</Link>
			</div>
		)
	}
}

export default MenuBuilder