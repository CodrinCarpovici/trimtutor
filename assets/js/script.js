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
  "Quadriceps",
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
    //tableData.add($("<br>"))
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
  const currentTime = dayjs().format("HH:mm");

  // Getting form data
  const formData = {
    selectedMuscleGroup: $("#muscleGroups").val(),
    difficulty: $("#difficulty").val(),
    workoutName: $("#workoutName option:selected").text(),
    time: $("#time").val(),
    day: $("#exampleModal").data("date"),
  };
  // Retrieve existing data from local storage
  const existingData = JSON.parse(localStorage.getItem("formData")) || [];

  // Check if there is already a record with the same date and time
  const existingRecord = existingData.find(
    (entry) => entry.day === formData.day && entry.time === formData.time
  );

  if (existingRecord) {
    // If time and day are the same, don't create another record, alert needs changing
    alert("A workout with the same date, time, and day already exists.");
  } else if (formData.time < currentTime) {
    alert("You cannot schedule a workout in the past!");
  } else {
    // Add entry if date and time are different
    existingData.push(formData);

    // Store the updated array in local storage
    localStorage.setItem("formData", JSON.stringify(existingData));
    // Button to have selected workout from localstorage
    showTimeButton(
      formData.day,
      formData.time,
      formData.workoutName,
      formData.difficulty
    );
  }
});

const showTimeButton = (day, workoutTime, difficulty, workoutName) => {
  const functionalButton = $("<a>")
    .attr({
      type: "button",
      class: "btn btn-primary workout-time-button",
      "data-date": day,
      difficulty: difficulty,
      workoutName: workoutName,
      href: "./dayworkoutPage.html",
    })
    .text(workoutTime);
  const clearButton = $("<button>")
    .attr({
      type: "button",
      class: "btn btn-danger clear-button",
      "data-date": day,
    })
    .text("x");
  functionalButton.append(clearButton);

  clearButton.on("click", function () {
    functionalButton.remove();
    clearButton.remove();
  });

  $(`td.col-10[data-date="${day}"]`).append(functionalButton, clearButton);

  functionalButton.on("click", function () {
    const sWorkout = {
      date: this.getAttribute("data-date"),
      time: this.text,
      difficulty: this.getAttribute("difficulty"),
      workoutName: this.getAttribute("workoutName"),
    };
    localStorage.removeItem("cWorkout");
    localStorage.setItem("cWorkout", JSON.stringify(sWorkout));
    getWorkoutDetails(formData.workoutName, formData.difficulty, formData.time);
  });
};

const displaySavedWorkouts = () => {
  const savedData = JSON.parse(localStorage.getItem("formData")) || [];
  const currentDate = dayjs().format("DD/MM/YYYY");
  const currentTime = dayjs().format("HH:mm");
  const filteredData = [];

  // compare the time and sort it
  savedData.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    } else if (a.time > b.time) {
      return 1;
    } else {
      return 0;
    }
  });

  for (let e of savedData) {
    if (e.day === currentDate && e.time < currentTime) {
      console.log("It works!!");
    } else {
      filteredData.push(e);
    }
  }

  localStorage.removeItem("formData");
  localStorage.setItem("formData", JSON.stringify(filteredData));

  filteredData.forEach((workout) => {
    showTimeButton(
      workout.day,
      workout.time,
      workout.difficulty,
      workout.workoutName
    );
  });
};

displaySavedWorkouts();
