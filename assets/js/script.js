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

// Function to populate time options in 15-minute intervals
function populateTimeOptions() {
  var select = document.getElementById("time");
  select.innerHTML = "";

  for (var hours = 0; hours < 24; hours++) {
    for (var minutes = 0; minutes < 60; minutes += 15) {
      var timeString =
        (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
      var option = document.createElement("option");
      option.value = timeString;
      option.text = timeString;
      select.appendChild(option);
    }
  }
}



displayTable();
