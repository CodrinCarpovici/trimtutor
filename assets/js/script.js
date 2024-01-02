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
        id: "plus-button",
        type: "button",
        class: "btn btn-primary",
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

// On form submit
workoutForm.on("submit", function (e) {
  e.preventDefault();

  // Getting form data to store in local storage
  const formData = {
    selectedMuscleGroup: $("#muscleGroups").val(),
    difficulty: $("#difficulty").val(),
    workoutName: $("#workoutName").val(),
    time: $("#time").val(),
    day: $("#plus-button").data("date"),
  };

  // Store form data in local storage
  localStorage.setItem("formData", JSON.stringify(formData));
});
