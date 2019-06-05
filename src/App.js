import React from 'react';
import {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import { Container, Row, Col } from 'react-bootstrap';


//src="https://www.gstatic.com/firebasejs/6.0.3/firebase-app.js"

var firebaseConfig = {
    apiKey: "AIzaSyAifkcLWNWHk81t8ZddkfCmevkCZN9NppE",
    authDomain: "create-react-app-79547.firebaseapp.com",
    databaseURL: "https://create-react-app-79547.firebaseio.com",
    projectId: "create-react-app-79547",
    storageBucket: "create-react-app-79547.appspot.com",
    messagingSenderId: "969062752817",
    appId: "1:969062752817:web:78dc005cdd902c6d"
};
firebase.initializeApp(firebaseConfig);



class App extends Component {
    constructor() {
        super();
        this.state = {
            activeRoom: '',
            user: ''
        };
    }

    setActiveRoom = (roomId) => {
        this.setState({activeRoom: roomId});
    }

    setUser = (userName) => {
        this.setState({user: userName});
    }

    render () {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={2}><RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom} /><User firebase={firebase} setUser={this.setUser} /></Col>
                        <Col sm={8}><MessageList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom} /></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default App;
