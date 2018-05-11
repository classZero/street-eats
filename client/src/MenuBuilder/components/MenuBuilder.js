import React, {Component} from 'react'
import { connect } from 'react-redux'
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
		removeItem(itemID).then(resp => getMenu(this.props.username))
	}

	render(){
		return(
			<div className="editmenu-container">
				<div className="menubuilder-header">
          <h1>Add To Your Menu</h1>
          <button onClick={ e => this.props.toggle(e)} className="menubuilder-toggle">Edit Profile</button>
        </div>
        <div className="menubuilder-body">
          <form onSubmit={this.handleSubmit} id="menuBuilderForm">
            <h4>Item Name:</h4>
            <input onChange={this.handleChange} type="text" name="itemName" value={this.state.itemName} />
            <h4>Item Price:</h4> 
            <input onChange={this.handleChange} type="text" name="itemPrice" value={this.state.itemPrice} />
            <h4>Item Description:</h4>
            <input onChange={this.handleChange} type="text" name="itemDescription" value={this.state.itemDescription} />
            <div id="menubuilder-btn-wrapper">
              <h4>Item Type:</h4>
              <select onChange={this.handleChange} value={this.state.itemType} name="itemType">
                <option value="drink">Drink</option>
                <option value="side">Side</option>
                <option value="entree" >Entree</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
            <button type="submit" id="menubuilder-submit-btn">Add Item</button>
          </form>
        </div>
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
