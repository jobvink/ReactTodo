import firebase from 'firebase';

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

var firebaseRef = firebase.database().ref();

firebaseRef.set({
	isRunning: true,
	user: {
		name: 'Job',
		age: 25
	},
	app: {
		name: 'Todo App',
		version: '1.0'
	}
}).then(() => {
	console.log('Set voltooid');
}, () => {
	console.log('Set niet voltooid');
});

firebaseRef.child('app').set({
	name: 'Todo App refactord'
});

firebaseRef.update({
	isRunning: false,
	'app/version': 'Todo Application'
});

firebaseRef.child('app').update({
	version: '1.1.0'
}).then(() => {
	console.log('update Worked!');
}, () => {
	console.log('update didnt work');
});

firebaseRef.update({
	isRunning: null
});

firebaseRef.child('user/age').remove();

firebaseRef.child('app').once('value').then(
	(snapshot) => {
		console.log('Hele database gekregen', snapshot.key, snapshot.val());
}, (e) => {
	console.log('Kan value niet ophalen', e);
});



var log = (snapshot)  => {
	console.log('value gekregen', snapshot.val());
};

firebaseRef.on('value', log);
firebaseRef.off('value', log);
firebaseRef.update({isRunning: false});

var notesRef = firebaseRef.child('notes');

var newNoteRef = notesRef.push();

newNoteRef.set({
	text: 'Loop met de hond'
});

notesRef.on('child_added', (snapshot) => {
	console.log('child added', snapshot.key, snapshot.val());
});

var todos = {
	'1': {
		text: 'Ga naar school',
		completed: false
	},
	'2': {
		text: 'Maak je huiswerk',
		completed: true
	}
};

var todosRef = firebaseRef.child('todos');

todosRef.push(todos);

todosRef.on('value', (snapshot) => {
	console.log('todos geupdate', snapshot.val());
});