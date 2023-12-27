const table = $('tbody') 


{/* <tr>
                  <td class="col-10 text-center" id="day">Monday</td>
                  <td class="col-2">
                    <button
                      id="plus-button"
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      +
                    </button>
                  </td>
                </tr>
                <tr></tr> */}

const displayTable =  () => {
  // Current Day
  const currentDate = dayjs()

// Display the dates for the rest of the week
  for ( let day = 1; day < 7 ; day ++)
  {
    let nextDay = currentDate.add(day, 'day')

    // Dynamically display the table 
    let tableRow = $('<tr>')
    let tableData = $('<td>').addClass("col-10 text-center").text(nextDay.format('dddd'))
    table.append(tableRow ,tableData)

  }

}

displayTable()