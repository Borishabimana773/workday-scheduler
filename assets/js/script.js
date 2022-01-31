var scheduledTime = {};

function getCalendar(time) {
  for (var i = 0; i < scheduledTime.calendar.length; i++) {
    if (scheduledTime.calendar[i].id == time) {
      return scheduledTime.calendar[i].text;
    }
  }
  return "";
}
function createElementBlock(time, textArea) {
  var CalendarDiv = $("<div>").attr({
    id: "calendar-" + time,
    class: "row time-block",
    "data-time": time,
  });

  var colTime = $("<div>").attr("class", "col-2 col-md-1 hour text-right p-3");
  var colTextArea = $("<textarea>").attr(
    "class",
    "col-8 col-md-10 description"
  );
  var colSaveBtn = $("<button>").attr("class", "btn col-2 col-md-1 saveBtn");
  var button = $("<i>").attr("class", "fas fa-save");

  if (textArea) {
    colTextArea.append(textArea);
  }

  if (time < 12) {
    colTime.text(time + "AM");
  } else if (time === 12) {
    colTime.text(time + "PM");
  } else {
    colTime.text(time - 12 + "PM");
  }
  colSaveBtn.append(button);
  CalendarDiv.append(colTime, colTextArea, colSaveBtn);
  $(".container").append(CalendarDiv);
  timeBlockColor();
}


function timeBlock() {
  // declaring the start time
  var openingTime = 9;
  // declaring the number of work hours
  var workdayHours = 9;
  for (var i = 0; i < workdayHours; i++) {
    var time = i + 9;
    var textArea = getCalendar(time);
    createElementBlock(time, textArea);
  }
}
function CheckCalendarExist(calendarObject) {
  var id = calendarObject.id;
  var textarea = calendarObject.text.trim();
  if (!textarea) {
    for (var i = 0; i < scheduledTime.calendar.length; i++) {
      if (scheduledTime.calendar[i].id === id) {
        scheduledTime.calendar.splice(i, 1);
        return true;
      }
    }
    return true;
  }
console.log(id);
  if (scheduledTime.calendar.length > 0) {
    for (var i = 0; i < scheduledTime.calendar.length; i++) {
      if (scheduledTime.calendar[i].id === id) {
        scheduledTime.calendar[i].text = textarea;
        return true;
      }
    }
  }
  return false;
}

 function timeBlockColor() {
    var currentHour = moment().hour();
    $(".time-block").each(function (){
        var hourBlock = parseInt($(this).attr("data-time"));
        if (hourBlock < currentHour) {
            $(this).addClass("past");
        } else if (hourBlock === currentHour){
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    }) 

}


function SaveCalendar() {
  localStorage.setItem("calendar", JSON.stringify(scheduledTime));
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
$(".container").on("click", "button", function () {
  var textarea = $(this).siblings("textarea").val().trim();
  var id = $(this).closest(".time-block").attr("data-time");
  console.log(id);
  var calendarObject = {
    id: id,
    text: textarea,
  };
  if (!CheckCalendarExist(calendarObject)) {
    scheduledTime.calendar.push(calendarObject);
  }
  SaveCalendar();
});
