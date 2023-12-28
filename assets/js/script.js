//Muscle groups and save choice into the local storage for the modal
// Array of muscle groups
const muscleGroupsArray = ["Chest", "Back", "Legs", "Arms", "Shoulders"];
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
