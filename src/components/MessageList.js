import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Card } from 'react-bootstrap';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ''
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

    createMessage(e) {
        e.preventDefault();
        this.messagesRef.push({
                username: this.props.user ? this.props.user.displayName : "Guest",
                content: this.state.newMessage,
                sentAt: firebase.database.ServerValue.TIMESTAMP,
                roomId: this.props.activeRoom
        });
        this.setState({newMessage:''})
    }

    handleNewMessage(e) {
        this.setState({ newMessage: e.target.value })
    }

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
                <form onSubmit={(e) => this.createMessage(e) }>
                    <input type="text" placeholder="Write message here..." size='70' value={this.state.newMessage} onChange={(e) => this.handleNewMessage(e)} />
                    <input type="submit" value="Send" />
                </form>
            </section>
        );
    }
}


export default MessageList;
