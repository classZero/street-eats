import React, {Component} from 'react'
import './temp.css'

class MenuBuilder extends Component{
	state = {
		itemName: '',
		itemPrice: '',
		itemDescription: '',
		itemType: 'entree',
		newItemArr: []
	}

	componentDidMount(){
		console.clear()
	}

	handleChange = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const newItemObj = {
				itemName: this.state.itemName,
				itemPrice: this.state.itemPrice,
				itemDescription: this.state.itemDescription,
				itemType: this.state.itemType
			}

		this.setState({
			newItemArr: [...this.state.newItemArr, newItemObj]
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
				{this.state.newItemArr.map((itemObj, i)=> console.log(itemObj) )}
			</div>
		)
	}
}

export default MenuBuilder