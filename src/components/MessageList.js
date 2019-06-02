import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import RoomList from './RoomList';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };

        this.messagesRef = this.props.firebase.database().ref('Messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat (message) })
        });
    }

    render () {
        return (
            <section>
                <div>
                    <h1></h1> //whichever room is clicked 
                    {
                        this.state.messages.map ( (message, index) =>
                            <div id="message" key={index}>
                                <Card>
                                    <Card.Header>{message.username }</Card.Header>
                                    <Card.Body>
                                        <Card.Text>{message.content}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer><small className="text-muted">{message.sentAt}</small></Card.Footer>
                                </Card>
                            </div>
                        )
                    }
                </div>
            </section>
        );
    }
}


export default MessageList;
