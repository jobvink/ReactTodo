import firebase from 'firebase';

try {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyASkHzrvJfyueCoQp3xs7vNhWN4D7HyPaE",
		authDomain: "jobs-todo-app.firebaseapp.com",
		databaseURL: "https://jobs-todo-app.firebaseio.com",
		projectId: "jobs-todo-app",
		storageBucket: "jobs-todo-app.appspot.com",
		messagingSenderId: "168810879256"
	};
	firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;