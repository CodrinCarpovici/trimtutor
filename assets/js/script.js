const table = $("tbody");

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

// Time increment/decrement function:
$(document).ready(function () {
  // Initializing datetimepicker
  $('#time').datetimepicker({
    format: 'HH:mm',
    stepping: 15
  });
 
  // Default time is 12:00
  $('#time').val('12:00');
 });
  
 //Function to increment time by 15 minutes
 function incrementTime() {
  var select = $("#time");
  var currentTime = select.val();
  var newTime = dayjs(currentTime, "HH:mm").add(15, "minute").format("HH:mm");
  select.val(newTime);
  select.trigger('change'); 
}

//Function to decrement time by 15 minutes
function decrementTime() {
  var select = $("#time");
  var currentTime = select.val();
  var newTime = dayjs(currentTime, "HH:mm").subtract(15, "minute").format("HH:mm");
  select.val(newTime);
  select.trigger('change');
}
// Event listener for increment
$("#incrementBtn").click(incrementTime);
displayTable();
