var admin = require("firebase-admin");

var serviceAccount = require("/Users/rahulnatarajan/Desktop/VitaApp/VitaBackend/vitadb-c40c2-firebase-adminsdk-1245s-e361c9e428.json");

function initApp() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://vitadb-c40c2.firebaseio.com"
    });
}

module.exports = initApp;

