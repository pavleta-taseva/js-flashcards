import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
    }

    responseFacebook = response => {
        console.log(response);
        this.setState({
            isLoggedIn: true,
            userId: response.userId,
            name: response.name,
            email: response.email,
        });
    }

    componentClicked = () => {
        console.log('Facebook button clicked.');
    }

    render() {
        let fbContent;
        console.log(this.state.userId);
        if (this.state.isLoggedIn) {
            fbContent = null;
        } else {
            fbContent = (<FacebookLogin
                appId="371633031397919"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);
                localStorage.setItem('userId', this.state.userId);
                localStorage.setItem('name', this.state.name);
                localStorage.setItem('email', this.state.email);
        }

        return (
            <div>
                {fbContent}
            </div>
        )
    }
}