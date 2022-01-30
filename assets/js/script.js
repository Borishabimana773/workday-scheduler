var scheduledTime = {};

function getCalendar(time){
    for (var i = 0; i < scheduledTime.calendar.length; i++) {
        if (scheduledTime.calendar[i].id == time){
            return scheduledTime.calender[i].text;
        }
    }
    return "";
}
function createElementBlock (time,textArea) {
    

}

function timeBlock() {
  // declaring the start time
  var openingTime = 9;
  // declaring the number of work hours
  var workdayHours = 9;
  for (var i = 0; i < workdayHours; i++) {
    var time = i + 9;
    var textArea = getCalendar(time);
    createElementBlock(time,textArea);
  }
}

function setCurrentDate() {
  var currentDay = moment().format("MMM Do YYYY");
  $("#currentDay").html(currentDay);
}

function load() {
  var savedSchedule = JSON.parse(localStorage.getItem("calendar"));
  if (savedSchedule) {
    scheduledTime = savedSchedule;
  } else {
    scheduledTime = {
      calendar: [],
    };
  }

  setCurrentDate();
  timeBlock();
}
load();
