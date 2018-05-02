import React, { Component } from 'react';
import EditTruckProfile from './EditTruckProfile'
import EditUserProfile from './EditUserProfile'
import { connect } from 'react-redux'






class EditProfile extends Component {
    
  editType(source) {
    if(source === 'truck') {
      return <EditTruckProfile />
    } else {
      return <EditUserProfile />
    }
  }

  
    render() {
      console.log(this.props.source)
        return (
            <div>
              {this.editType('truck')}
            </div>
            
        )
    }
}

function mapStateToProps(state) {
  return {
    source : state.loginReducer
  }
}

export default connect(mapStateToProps)(EditProfile)





























