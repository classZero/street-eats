import React, { Component } from 'react'
import EditTruckProfile from './EditTruckProfile'
import EditUserProfile from './EditUserProfile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

class EditProfile extends Component {
    
  editType(source) {
    if(source === 'truck') {
      return <EditTruckProfile username={this.props.username} />
    } else {
      return <EditUserProfile username={this.props.username} />
    }
  }  
    render() {
        return (
            <div>{this.props.isAuth ? 
              <div>
                {this.editType(this.props.source)}
              </div>: <Redirect to='/' />}
            </div>
            
        )
    }
}

function mapStateToProps(state) {
  return {
    source : state.loginReducer.source,
    isAuth: state.loginReducer.isAuthenticated,
    username: state.loginReducer.username
  }
}

export default connect(mapStateToProps)(EditProfile)





























