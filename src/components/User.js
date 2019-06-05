import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    handleSignIn = () => {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    handleSignOut = () => {
        this.props.firebase.auth().signOut();
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
        });
    }

    render () {
        return (
            <section>
                <p></p>
                    <Button variant="outline-primary" onClick={this.handleSignIn}>Sign In</Button>
                <p></p>
                    <Button variant="outline-secondary" onClick={this.handleSignOut}>Sign Out</Button>
                <p></p>
                    Username: {this.props.user? this.props.user.displayName:'Guest'}
            </section>
        );
    }
}


export default User;
