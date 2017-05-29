// function add(a, b) {
// 	return a + b;
// }
// console.log(add(3, 1));
//
// var toAdd = [9, 5];
//
// console.log(add(...toAdd))

// var groupA = ['Peter', 'Annemarie', 'Eduard'];
// var groupB = ['Farhad'];
// var final = [...groupB, 3, ...groupA];
//
//
// console.log(final);

var person = ['Job', 19];
var personTwee = ['Peter', 60];

function greet(name, age) {
	return 'Hallo ' + name + ' je bent ' + age + ' jaar oud!'
}

console.log(greet(...person));
console.log(greet(...personTwee));

var names = ['Peter', 'Annemarie'];
var final = ['Job', ...names];

final.forEach(function (name) {
	console.log('hallo ' + name);
});