import moment from 'moment';

var formats = [
  moment.ISO_8601,
    'DD/MM/YYYY'
];

var _MS_PER_SECOND = 1000;
var _MS_PER_MINUTE = _MS_PER_SECOND * 60;
var _MS_PER_HOUR = _MS_PER_MINUTE *  60;
var _MS_PER_DAY = _MS_PER_HOUR * 24;
var _MS_PER_MONTH = _MS_PER_DAY * 30.416666667;
var _MS_PER_YEAR = _MS_PER_DAY * 364 ;

var dateDiffInYears = function(a, b) {
   // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_YEAR);
};

var dateDiffInMonths = function(a, b) {
   // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_MONTH);
};

var dateDiffInDays = function(a, b) {
   // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

var dateDiffInHours = function(a, b) {
   // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours());

  return Math.floor((utc2 - utc1) / _MS_PER_HOUR);
};

var dateDiffInMinutes = function(a, b) {
   // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());

  return Math.floor((utc2 - utc1) / _MS_PER_MINUTE);
};

var dateDiffInSeconds = function(a, b) {
   // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());

  return Math.floor((utc2 - utc1) / _MS_PER_SECOND);
};

var DateFormat = {
  getTimelineFromDate: function(date, dateNow) {
    var years = dateDiffInYears(new Date(date), dateNow);
    if (years > 0) return years + ' years ago';
    var months = dateDiffInMonths(new Date(date), dateNow);
    if (months > 0) return months + ' months ago';
    var days = dateDiffInDays(new Date(date), dateNow);
    if (days > 0) return days + ' days ago';
    var hours = dateDiffInHours(new Date(date), dateNow);
    if (hours > 0) return hours + ' hours ago';
    var minutes = dateDiffInMinutes(new Date(date), dateNow);
    if (minutes > 0) return minutes + ' minutes ago';
    var seconds = dateDiffInSeconds(new Date(date), dateNow);
    if (seconds > 0) return seconds + ' seconds ago';
    return 'right now';
  },
  getDateFromString: function(date) {
    return moment(date, formats, true);
  },
  getStringFromDate: function(date) {
    let dateMoment = moment(date);
    return dateMoment.format('DD/MM/YYYY');
  },
  StringIsDate: function(str){  
    var matches = str.match(/(\d{1,2})[- \/](\d{1,2})[- \/](\d{4})/);
    if (!matches) return false;

    var day = parseInt(matches[1], 10);
    var month = parseInt(matches[2], 10);
    var year = parseInt(matches[3], 10);
    var date = new Date(year, month - 1, day);
    if (!date || !date.getTime()) return false;

    if (date.getMonth() + 1 != month ||
        date.getFullYear() != year ||
        date.getDate() != day) {
            return false;
        }
    return true;
  },
  isDate: function(date){
    return moment(date, formats, true).isValid();
  }
};

module.exports = DateFormat;