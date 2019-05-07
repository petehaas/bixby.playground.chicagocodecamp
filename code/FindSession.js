var sessions = require('lib/sessions');
var console = require('console');
var textLib = require('textLib');
var dates = require('dates');
var util = require('lib/util');

module.exports.function = function findSession (searchLevel, searchCriteria,searchTime) {
 
  console.log('zonedDateTime',dates.ZonedDateTime.of(2019,5,11,0,0,0));
  // Filter by Level 100, 200, etc
  if (searchLevel)
      sessions = sessions.filter(function(session) {
          return session.level == searchLevel;
      });
  
  // Filter title by searchCriteria
  if (searchCriteria)
      sessions = sessions.filter(function(session) {
          return textLib.fuzzyMatch(session.title,searchCriteria,3);
      });
  
  // Filter by time
  if (searchTime) {
     console.log('searchTime:',searchTime);
     var startEnd = util.setStartAndEndDate(searchTime);
   console.log('hello',startEnd);
     sessions = sessions.filter(function(session) {
         
       if (!session.time) {
         console.log('TADA!',session);
       }
       var sessionTime = dates.ZonedDateTime.parseDateTime(session.time,'y-M-d h:m:s a');
    
       return sessionTime.isAfterOrEqualTo(startEnd.start) && 
              sessionTime.isBeforeOrEqualTo(startEnd.end);
     });
    
  }
 
  
  // Format date to h:mma
  sessions.forEach(function(session) {
    session.time = dates.ZonedDateTime.parseTime(session.time,'y-M-d h:m:s a').format('h:mma');
  });
  
  
  return sessions;
  
}