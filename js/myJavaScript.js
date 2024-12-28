const sudokuContainer = document.getElementById("sudoku-Table");
const feedbackMessage = document.getElementById("feedbackMessage");

function _addEventListener() {
  let fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", function (event) {
    const fileInput = event.target;

    if (fileInput.files.length === 0) {
      console.log("No file selected.");
      return;
    }

    const file = fileInput.files[0];

    if (file.type !== "text/plain") {
      console.error("Please select a valid text file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const content = event.target.result;
      const initialSudoku = JSON.parse(content);
      _createSudokuGrid(initialSudoku);
    };

    reader.onerror = function (event) {
      console.error("File could not be read! Code ");
    };

    reader.readAsText(file);
  });
}

function _createSudokuGrid(initialSudoku) {
  const cells = [];
  sudokuContainer.innerHTML = "";
  for (let row = 0; row < 9; row++) {
    cells[row] = [];
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (row % 3 === 0) cell.style.borderTop = "3px solid black";
      if (col % 3 === 0) cell.style.borderLeft = "3px solid black";
      if (row === 8) cell.style.borderBottom = "3px solid black";
      if (col === 8) cell.style.borderRight = "3px solid black";

      const input = document.createElement("input");
      input.maxLength = 1;

      for (let i = 0; i < initialSudoku.length; i++) {
        if (
          initialSudoku[i].columnIndex === col &&
          initialSudoku[i].rowIndex === row
        ) {
          input.value = initialSudoku[i].value;
          input.disabled = true;
          break;
        }
      }

      cells[row][col] = input;

      input.addEventListener("input", (e) => {
        const newValue = e.target.value;
        if (!/^[1-9]$/.test(newValue)) {
          e.target.value = "";
          cells[row][col].value = 0;
          return;
        }

        cells[row][col].value = parseInt(newValue);
        console.log("Updated Cells:", cells);

        _highlightDuplicates(cells);
      });

      cell.appendChild(input);
      sudokuContainer.appendChild(cell);
    }
  }
}

function _highlightDuplicates(cells) {
  let hasDuplicate = false;
  _resetCellStyles(cells);

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const currentValue = cells[r][c].value;

      if (currentValue === "") continue;

      for (let k = 0; k < 9; k++) {
        if (k !== c && cells[r][k].value === currentValue) {
          cells[r][c].style.border = "2px solid red";
          cells[r][k].style.border = "2px solid red";
          hasDuplicate = true;
        }
      }

      for (let k = 0; k < 9; k++) {
        if (k !== r && cells[k][c].value === currentValue) {
          cells[r][c].style.border = "2px solid red";
          cells[k][c].style.border = "2px solid red";
          hasDuplicate = true;
        }
      }

      const startRow = Math.floor(r / 3) * 3;
      const startCol = Math.floor(c / 3) * 3;

      for (let subRow = startRow; subRow < startRow + 3; subRow++) {
        for (let subCol = startCol; subCol < startCol + 3; subCol++) {
          if (
            (subRow !== r || subCol !== c) &&
            cells[subRow][subCol].value === currentValue
          ) {
            cells[r][c].style.border = "2px solid red";
            cells[subRow][subCol].style.border = "2px solid red";
            hasDuplicate = true;
          }
        }
      }
    }
  }
  _updateFeedbackMessage(cells, hasDuplicate)
}

function _resetCellStyles(cells) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      cells[r][c].style.border = "1px solid black";
    }
  }
}


function _updateFeedbackMessage(cells, hasDuplicate) {
  if (!hasDuplicate) {
    let allValid = true;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (cells[r][c].value === "") {
          allValid = false;
          break;
        }
      }
      if (!allValid) break;
    }

    if (allValid) {
      sudokuContainer.style.border = "3px solid green";
      feedbackMessage.textContent = "تبریک جدول کامل شد";
    } else {
      sudokuContainer.style.border = "2px solid black";
      feedbackMessage.textContent = "";
    }
  } else {
    sudokuContainer.style.border = "2px solid black";
    feedbackMessage.textContent = "";
  }
}

_addEventListener();