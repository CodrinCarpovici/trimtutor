const table = $("tbody");

const displayTable = () => {
  // Current Day
  const currentDate = dayjs();

  // Display the dates for the rest of the week
  for (let day = 0; day < 7; day++) {
    let nextDay = currentDate.add(day, "day");

    // Dynamically display the table
    let tableRow = $("<tr>");
    let tableData = $("<td>")
      .addClass("col-10 text-center")
      .text(nextDay.format("dddd"))
      .attr('id',"day")
    let tableDataButton = $("<td>").addClass("col-2 text-center");
    let button = $("<button>")
      .attr({
        id: "plus-button",
        type: "button",
        class: "btn btn-primary",
        "data-bs-toggle": "modal",
        "data-bs-target": "#exampleModal",
      })
      .text("+");

    tableRow.append(tableData, tableDataButton.append(button));

    table.append(tableRow);
  }
};

displayTable();
