import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Card, InputGroup, FormControl } from 'react-bootstrap';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: {
                username: this.props.user,
                content: '',
                sentAt: firebase.database.ServerValue.TIMESTAM,
                roomId: this.props.user
            }
        };

        this.messagesRef = this.props.firebase.database().ref('Messages'); // {'Message1': {content: 'Hello', roomId:'Red'}}
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat (message) })
        });
    }

    /*createMessage(e) {
         e.preventDefault();
        this.messageRef.push({
            newMessage: {
                username: this.props.user,
                content: this.state.newMessage.content,
                sentAt: firebase.database.ServerValue.TIMESTAMP,
                roomId: this.props.user
            }
        });
        this.setState({newMessage.content: ''});
    }*/

    /*handleNewMessage(e) {
        this.setState({ this.newMessage.content: e.target.value })
    }*/

    render () {
        return (
            <section>
                <div>
                    <h1>{this.props.activeRoom}</h1>
                    {
                        this.state.messages.filter(message => message.roomId === this.props.activeRoom).map ( (message, index) =>
                            <div id="message" key={index}>
                                <Card>
                                    <Card.Header>{message.username}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>{message.content}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer><small className="text-muted">{message.sentAt}</small></Card.Footer>
                                </Card>
                            </div>
                        )
                    }
                </div>
                <br />
                <InputGroup size="sm" className="mb-3" >
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm" onClick= { (e) => this.createMessage(e)}>Send</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Write your message here..." onChange= { (e) => this.handleNewMessage(e) }/>
                </InputGroup>
            </section>
        );
    }
}


export default MessageList;
