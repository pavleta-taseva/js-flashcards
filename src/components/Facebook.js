import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Home from './User/Home/Home.js';

export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
        this.setState({
            isLoggedIn: true,
            userId: response.userId,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
        });
    }

    componentClicked = () => {
        console.log('Facebook button clicked.');
    }

    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (<Home />);
        } else {
            fbContent = (<FacebookLogin
                appId="371633031397919"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);
        }

        return (
            <div>
                {fbContent}
            </div>
        )
    }
}
