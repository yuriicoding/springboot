// Variable to store the grades
var grades = [];

// Function to update the histogram
function updateHistogram() {
    var lowerBounds = [
        parseFloat(document.getElementById("max").value),
        parseFloat(document.getElementById("aplus").value),
        parseFloat(document.getElementById("a").value),
        parseFloat(document.getElementById("aminus").value),
        parseFloat(document.getElementById("bplus").value),
        parseFloat(document.getElementById("b").value),
        parseFloat(document.getElementById("bminus").value),
        parseFloat(document.getElementById("cplus").value),
        parseFloat(document.getElementById("c").value),
        parseFloat(document.getElementById("cminus").value),
        parseFloat(document.getElementById("d").value),
        parseFloat(document.getElementById("f").value)
    ];
    var bounds_validity = true;
    var f_grade = lowerBounds.length - 1;
    for (var i = 0; i < f_grade && bounds_validity == true; i++){
        if (lowerBounds[f_grade] < 0){
            bounds_validity = false;
            alert("Negative bound(s) for grades: " + lowerBounds[f_grade] + "!");
        }
        if (lowerBounds[i+1] < 0){
            bounds_validity = false;
            alert("Negative bound(s) for grades: " + lowerBounds[i] + "!");
        }
        else if (lowerBounds[i] <= lowerBounds[i+1]){
            bounds_validity = false;
            alert("Bound(s) from F to Max violate increasing order: " + lowerBounds[i] + " is less or equal to " + lowerBounds[i+1] + "!");
        }
    }
    if (bounds_validity == true){
        var histogram = document.getElementById("table_output");
        var histogramRows = histogram.getElementsByTagName("tr");
        // Update the histogram values
        for (var i = 0; i < histogramRows.length; i++) {
            var gradeCell = histogramRows[i].getElementsByTagName("td")[1];
            var gradeDiv = gradeCell.querySelector("div")
            var gradeCount = 0;

            // Count the number of grades in each range
            for (var j = 0; j < grades.length; j++) {
                if (grades[j] < lowerBounds[i] && grades[j] >= lowerBounds[i+1]) {
                    gradeCount++;
                }
                if (i == 0 && grades[j] == lowerBounds[0]){
                    gradeCount++;
                }
            }    
        
            var width = gradeCount * 20;
            gradeDiv.style.width = width + "px";
        }
    }
}

// Function to handle the new grade input
function handleNewGrade(event) {
    event.preventDefault();
    var newGradeInput = document.getElementById("new_grade");
    var newGrade = parseFloat(newGradeInput.value);
    var max_val = document.getElementById("max").value;

    if (max_val <= 0){
        alert("Enter a positive maximun value (greater than 0).");
    } else {
        if (isNaN(newGrade)) {
            alert("Invalid input. Please enter a valid number.");
        } else if (newGrade < 0){
            alert("Invalid input. Please enter a non-negative number.");
        } else if (newGrade > max_val){
            alert("Invalid input. Please enter a number less than Max bound.");
        } else {
            grades.push(newGrade);
            newGradeInput.value = "";
            updateHistogram();
        }
    }
  }

// Event listeners
window.onload = updateHistogram;
document.getElementById("submit_grade").onclick = handleNewGrade;
document.getElementById("update_bounds").onclick = updateHistogram;

var textInputs = document.getElementsByClassName("input_val");

for (var i = 0; i < textInputs.length; i++) {
  textInputs[i].addEventListener("keypress", handleKeyPress);
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
      updateHistogram();
    }
  }