var console = require('console');
var dates = require('dates');
var console = require('console');

module.exports = {
  setStartAndEndDate: setStartAndEndDate
};

function setStartAndEndDate(dateTimeExpression) {
  var whenStart;
  var whenEnd;
   
  if (dateTimeExpression.dateTimeInterval) {
   
    // Start time?
    if (dateTimeExpression.dateTimeInterval.start)
      whenStart = dates.ZonedDateTime.of(
        2019,
        5,
        11,
        dateTimeExpression.dateTimeInterval.start.time.hour,
        dateTimeExpression.dateTimeInterval.start.time.minute,
        dateTimeExpression.dateTimeInterval.start.time.second);
   
    // End time?
    if (dateTimeExpression.dateTimeInterval.end) {
      whenEnd = dates.ZonedDateTime.of(
      2019,
      5,
      11,
      dateTimeExpression.dateTimeInterval.end.time.hour,
      dateTimeExpression.dateTimeInterval.end.time.minute,
      dateTimeExpression.dateTimeInterval.end.time.second);
      
      // Before noon (shows an end without a beginning)
     if (!dateTimeExpression.dateTimeInterval.start) {
        whenStart = whenEnd.minusHours(2);
      }
    }
    else {
      whenEnd = whenStart.plusHours(2);
    }
    
     
    
  }
   else if (dateTimeExpression.dateTime.time) {
     whenStart = dates.ZonedDateTime.of(
      2019,
      5,
      11,
      dateTimeExpression.dateTime.time.hour,
      dateTimeExpression.dateTime.time.minute,
      dateTimeExpression.dateTime.time.second);
     whenEnd = whenStart.plusHours(2);
   }
  
  return {
    start: whenStart,
    end: whenEnd
  };

}