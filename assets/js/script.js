//Muscle groups and save choice into the local storage for the modal
// Array of muscle groups
const muscleGroupsArray = [
  "Abdominals",
  "Abductors",
  "Biceps",
  "Calves",
  "Chest",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Lats",
  "Lower_Back",
  "Middle_Back",
  "Neck",
  "Quadrceps",
  "Traps",
  "Triceps",
];

// Document Elements
const table = $("tbody");
// Time Select
const select = $("#time");
// Form
const workoutForm = $("#workoutForm");
// Save Button
const saveBtn = $("#form-submit-btn");

const displayTable = () => {
  // Current Day
  const currentDate = dayjs();

  // Display the dates for the rest of the week
  for (let day = 0; day < 7; day++) {
    let nextDay = currentDate.add(day, "day");
    let dayOfWeek = nextDay.format("DD/MM/YYYY");

    // Dynamically display the table
    let tableRow = $("<tr>");
    let tableData = $("<td>")
      .addClass("col-10 text-center")
      .text(nextDay.format("dddd"))
      .attr({ id: "day", "data-date": dayOfWeek });
    let tableDataButton = $("<td>").addClass("col-2 text-center");
    let button = $("<button>")
      .attr({
        id: `plus-button-${dayOfWeek}`,
        type: "button",
        class: "btn btn-primary plus-button",
        "data-bs-toggle": "modal",
        "data-bs-target": "#exampleModal",
        "data-date": dayOfWeek,
      })
      .text("+");
    tableDataButton.append(button);
    tableRow.append(tableData, tableDataButton);
    table.append(tableRow);

    if (day == 0) {
      tableRow.addClass("present");
    } else {
      // Future class is added so we can manipulate the background color
      table.addClass("future");
    }
  }
};

displayTable();

// Get the selected element
const muscleGroupsSelect = document.getElementById("muscleGroups");

// Function to populate options in the select element
function populateMuscleGroups() {
  muscleGroupsArray.forEach((muscleGroup) => {
    const option = document.createElement("option");
    option.value = muscleGroup;
    option.text = muscleGroup;
    muscleGroupsSelect.appendChild(option);
  });
}
// Initial population of options
populateMuscleGroups();

// Time increment/decrement function
$(document).ready(function () {
  // Initializing DateTimePicker
  $("#time").datetimepicker({
    format: "HH:mm",
    stepping: 15,
  });

  // default time is 12:00
  $("#time").val("12:00");

  // Function to increment time by 15 minutes
  function incrementTime() {
    let currentTime = select.val();
    let newTime = moment(currentTime, "HH:mm")
      .add(15, "minute")
      .format("HH:mm");
    select.val(newTime);
    select.trigger("change");
  }

  // Function to decrement time by 15 minutes
  function decrementTime() {
    let currentTime = select.val();
    let newTime = moment(currentTime, "HH:mm")
      .subtract(15, "minute")
      .format("HH:mm");
    select.val(newTime);
    select.trigger("change");
  }

  $("#incrementBtn").click(incrementTime);
  $("#decrementBtn").click(decrementTime);
});

// Enables WorkoutName field after MuscleGroup and Difficulty were selected
$(document).ready(function () {
  $("#muscleGroups, #difficulty").on("change", function () {
    $("#workoutName").prop(
      "disabled",
      !($("#muscleGroups").val() && $("#difficulty").val())
    );
  });
});

// Update the plus button click event handler
$(".plus-button").click(function () {
  const clickedDate = $(this).data("date");
  $("#exampleModal").data("date", clickedDate);
});

// On form submit
workoutForm.on("submit", function (e) {
  e.preventDefault();

  // Getting form data
  const formData = {
    selectedMuscleGroup: $("#muscleGroups").val(),
    difficulty: $("#difficulty").val(),
    workoutName: $("#workoutName option:selected").text(),
    time: $("#time").val(),
    day: $("#exampleModal").data("date"),
  };
  console.l
  // Retrieve existing data from local storage
  const existingData = JSON.parse(localStorage.getItem("formData")) || [];

  // Check if there is already a record with the same date and time
  const existingRecord = existingData.find(
    (entry) => entry.day === formData.day && entry.time === formData.time
  );

  if (existingRecord) {
    // If time and day are the same, don't create another record, alert needs changing
    alert("A record with the same date, time, and day already exists.");
  } else {
    // Add entry if date and time are different
    existingData.push(formData);

    // Store the updated array in local storage
    localStorage.setItem("formData", JSON.stringify(existingData));
   // Button to have selected workout from localstorage
    showTimeButton(formData.day, formData.time);
    getWorkoutDetails(formData.workoutName, formData.difficulty, formData.time);
    
  }
});
// Button to appear on the form
const showTimeButton = (day, workoutTime) => {
  const functionalButton = $("<a>")
    .attr({
      type: "button",
      class: "btn btn-primary workout-time-button",
      "data-date": day,
      "href": "./dayworkoutPage.html"
    })
    .text(workoutTime);

  $(`td.col-10[data-date="${day}"]`).append(functionalButton);
};
// Selected workout to be displayed from localstorage
const displaySavedWorkouts = () => {
  const savedData = JSON.parse(localStorage.getItem("formData")) || [];

  // Compares the time and sorts it to return value
  savedData.sort((a, b) => {
    if (a.time < b.time) {
      return -1; 
    } else if (a.time > b.time) {
      return 1; 
    } else {
      return 0;
    }
  });
// Button appears with selected workout time on workout day
  savedData.forEach((workout) => {
    showTimeButton(workout.day, workout.time);
  });
};

displaySavedWorkouts();
