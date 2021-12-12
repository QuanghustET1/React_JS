import { ModalBody, ModalFooter, ModalHeader, Button, Modal } from "reactstrap";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from "../../utils/emitter";
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashpass',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('didmount', this.props.currentUser)
    }
    toggle = () =>{
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName','address'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing Parameter: '+ arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if(isValid === true){
            this.props.EditUser(this.state);
        }
    }
    render() {
        console.log('okokok', this.props);
        console.log('check child modal user', this.props.isOpen)
        return (
            <Modal 
            isOpen = {this.props.isOpen} 
            toggle = {()=>{this.toggle()}} 
            className = {'Modal-user-container'}
            size = "lg"
            >
            <ModalHeader toggle = {()=>{this.toggle()}}>Edit a User</ModalHeader>
            <ModalBody>
                <div className = "modal-user-body">
                        <div className = "input-container">
                            <label>Email</label>
                            <input type = "text" 
                            onChange={(event) => {this.handleOnChangeInput(event,"email")}}
                            value={this.state.email}
                            disabled
                            />
                        </div>
                        <div className = "input-container">
                            <label>Password</label>
                            <input type = "password" 
                            onChange={(event) => {this.handleOnChangeInput(event, "password")}}
                            value={this.state.password}
                            disabled
                            />
                        </div>
                        <div className = "input-container">
                            <label>First Name</label>
                            <input type = "text" 
                            onChange={(event) => {this.handleOnChangeInput(event, "firstName")}}
                            value={this.state.firstName}
                            />
                        </div>
                        <div className = "input-container">
                            <label>Last Name</label>
                            <input type = "text" 
                            onChange={(event) => {this.handleOnChangeInput(event, "lastName")}}
                            value={this.state.lastName}
                            />
                        </div>
                        <div className = "input-container max-w">
                            <label>Address</label>
                            <input type = "text" 
                            onChange={(event) => {this.handleOnChangeInput(event, "address")}}
                            value={this.state.address}/>
                        </div>
                </div>
                       
            </ModalBody>
            <ModalFooter>
                <Button color = "primary" className = "px-2" onClick = {()=>{this.handleSaveUser()}}>Save changes</Button>{' '}
                <Button color = "secondary" className = "px-2" onClick = {()=>{this.toggle()}}>Close</Button>
            </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
