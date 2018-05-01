import React, { Component } from 'react';
import {getProfile} from '../../truckprofile/actions/tProfileActions'
import { connect } from 'react-redux';







class EditTruckProfile extends Component {
    
    componentDidMount(){
        getProfile()       ///add username as argument
    }


    render() {
        return (
            <div>
                <div>Company name: {this.props.profile.companyname}</div>
                <div><img src={this.props.profile.companylogo} /></div>
                <div>About us: {this.props.profile.aboutus}</div>
                <div><img src={this.props.profile.menuurl} /></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile
    }
}


export default connect(mapStateToProps)(EditTruckProfile)