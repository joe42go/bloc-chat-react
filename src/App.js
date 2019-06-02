import React from 'react';
import {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
            activeRoom: ''
        };

        //this.setActiveRoom=this.setActiveRoom.bind(this);

    }

    setActiveRoom(roomId) {
        this.setState({activeRoom: roomId});
    }

    render () {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={2}><RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} /></Col>
                        <Col sm={8}><MessageList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} /></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default App;
