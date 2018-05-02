import React, { Component } from 'react';
import EditTruckProfile from './EditTruckProfile'
import EditUserProfile from './EditUserProfile'






class EditProfile extends Component {
    
  editType(source) {
    if(source === 'truck') {
      return <EditTruckProfile />
    } else {
      return <EditUserProfile />
    }
  }


    render() {
        return (
            <div>
              {this.editType('truck')}

            </div>
            
        )
    }
}



export default EditProfile





























