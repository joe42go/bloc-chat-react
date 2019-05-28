import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoom: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {  //rooms = {"1": {"name": "Blue"}, "2": {"name:"Red"},....}
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat (room) })
        });
    }

    handleChange(e) {
        this.setState({ newRoom: e.target.value })
    }

    createRoom(e) {
        this.roomsRef.push({
            name: this.state.newRoom
        });
    }

    render () {
        return (
            <section>
                {
                    this.state.rooms.map( (room, index) =>
                        <div>{room.name}</div>
                    )
                }

                <form onSubmit= { (e) => this.createRoom(e) }>
                    <input type="text" value={ this.state.newRoom } onChange= { (e) => this.handleChange(e) } />
                    <input type="submit" />
                </form>


            </section>
        );
    }
}


export default RoomList;
