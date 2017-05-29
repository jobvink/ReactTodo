var moment = require('moment');

console.log(moment().format());

var now = moment();

console.log('Timestamp', now.unix());

var timestamp = 1496092128;
var currentMoment = moment.unix(timestamp);
currentMoment.locale('nl');
console.log('Het is nu', currentMoment.format('D MMMM YYYY [om] HH:mm'));

