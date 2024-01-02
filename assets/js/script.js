const table = $("tbody");
//call function to clear the past day
clearPastDaysFromTable();
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
  "Lower Back",
  "Middle Back",
  "Neck",
  "Quadrceps",
  "Traps",
  "Triceps",
];
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

// Event listener for the change event on the select element
muscleGroupsSelect.addEventListener("change", function () {
  // Get the selected value
  const selectedMuscleGroup = muscleGroupsSelect.value;

  // Store the selected value in local storage
  localStorage.setItem("selectedMuscleGroup", selectedMuscleGroup);
});

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
    let select = $("#time");
    let currentTime = select.val();
    let newTime = moment(currentTime, "HH:mm")
      .add(15, "minute")
      .format("HH:mm");
    select.val(newTime);
    select.trigger("change");
  }

  // Function to decrement time by 15 minutes
  function decrementTime() {
    let select = $("#time");
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
//Clear data from the modal's rows if are past the current day
function clearPastDaysFromTable() {
  // Get the current date
  const currentDate = dayjs();
  // Get all table rows
  const rows = $("#table tbody tr");
}
