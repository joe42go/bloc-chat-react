import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoom: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms'); // create object reference
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {  // rooms = {"1": {"name": "Blue"}, "2": {"name:"Red"},....}; synchronizes object changes; 'child-added' is an event type (controls when the callback function is called) and snapshot is the callback function
            const room = snapshot.val(); //data 'snapshot' isn't just data hence the reason why we are calling val ()
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat (room) })
        });
    }

    handleChange(e) {
        this.setState({ newRoom: e.target.value })
    }

    createRoom(e) {
         e.preventDefault();
        this.roomsRef.push({
            name: this.state.newRoom
        });
        this.setState({newRoom: ''});
    }

    render () {
        return (
            <section>
                {
                    this.state.rooms.map( (room, index) =>
                        <div key={index}>{room.name}</div>
                    )
                }
                <p></p>
                    <form onSubmit= { (e) => this.createRoom(e) }>
                        <input type="text" value={ this.state.newRoom } onChange= { (e) => this.handleChange(e) } />
                        <input type="submit" value="Create New Room"/>
                    </form>
            </section>
        );
    }
}


export default RoomList;
