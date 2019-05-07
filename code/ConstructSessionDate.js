var console = require('console');
var dates = require('dates');

module.exports.function = function constructSessionDate () {
 return dates.ZonedDateTime.of(2019,5,11,0,0,0).date;
}
