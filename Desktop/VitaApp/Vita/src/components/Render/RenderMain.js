import React, { Component } from 'react';
import { Text, Alert, View } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from '../common';
import { LoginForm } from '../Login';
import firebase from 'react-native-firebase';

class RenderMain extends Component {

    unsubsriber = null;
    state = {
        loggedIn: false,
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loggedIn: true,
                });
            } else {
                this.setState({
                    loggedIn: false,
                })
            }
        });
        this.unsubsriber = firebase.auth().onAuthStateChanged((changedUser) => {
            this.setState({user: changedUser});
        });
    }

    componentWillUnmount() {
        if(this.unsubsriber) {
            this.unsubsriber();
        }
    }

    renderContent() {
        if(this.state.loggedIn) {
            return(
                <CardSection>
                    <Button onPress={() => firebase.auth().signOut()}>
                        Logout
                    </Button>
                </CardSection>
            )
        }
        return(
            <LoginForm />
        )
    }

    render() {
        return(
            <View>
                {this.renderContent()}
            </View>
        )
    }

}

export { RenderMain }