import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

export const onFacebookRegister = () => {
    LoginManager
        .logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
            if(result.isCancelled) {
                return Promise.reject(new Error('The user cancelled the request'));
            }
            console.log('Login success with permissions: ${result.grantedPermission.toString()}');
            return AccessToken.getCurrentAccessToken();
        })
        .then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            return firebase.auth().signInWithCredential(credential);
        })
        .then((currentUser) => {
            console.log(currentUser);
        })
        .catch((error) => {
            console.log(error);
        });
} 