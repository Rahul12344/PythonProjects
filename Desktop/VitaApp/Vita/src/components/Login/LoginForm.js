import React, { Component } from 'react';
import { Text, Alert } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from '../common';
import firebase from 'react-native-firebase';
import { onFacebookRegister } from '../config/fbauth';
import SpinnerButton from 'react-native-spinner-button';


class LoginForm extends Component {
    unsubsriber = null;
    state = {
        isAuthenticated: false,
        email: '',
        password: '',
        error: '',
        user: null,
        loading: false
    };

    componentWillMount() {
        this.unsubsriber = firebase.auth().onAuthStateChanged((changedUser) => {
            this.setState({user: changedUser});
        });
    }

    componentWillUnmount() {
        if(this.unsubsriber) {
            this.unsubsriber();
        }
    }

    onAnonymousLogin = () => {
        this.setState({
            loading: true,
        });
        firebase.auth().signInAnonymously()
            .then(() => {
                console.log('Login successfully');
                this.setState({
                    isAuthenticated: true,
                });
            })
            .catch((error) => {
                console.log('Login failed. Error: ${error}');
            });
    }

    onRegister = () => {
        this.setState({
            loading: true,
        });
        {this.renderSpinner}
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((loggedInUser) => {
            this.setState({
                user: loggedInUser,
            });
            this.authSuccess();
            console.log(firebase.database());
            firebase.database()
                .ref('users/' + firebase.auth().currentUser.uid + "/profile").set(firebase.auth().currentUser);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    onLogin = () => {
        this.setState({
            loading: true,
        });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((loggedInUser) => {
            this.setState({
                user: loggedInUser,
            });
            this.authSuccess();
            console.log(loggedInUser);
            console.log()
            firebase.database()
                .ref('users/' + firebase.auth().currentUser.uid + "/profile").set(firebase.auth().currentUser);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    authSuccess() {
        console.log("Authorized");
        this.setState({
            email: '',
            password: '',
            loading: false
        });
    }

    render()
    {
        return(
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="youremail@example.com"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
   
                <CardSection>
                    <Input 
                        label="Password"
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry={true}
                    />
                </CardSection> 

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    <Button onPress={this.onRegister}>
                        Sign Up
                    </Button>
                    <Button onPress={this.onLogin}>
                        Log In
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={onFacebookRegister}>
                        Facebook Login
                    </Button>
                </CardSection>
            </Card> 
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export { LoginForm };