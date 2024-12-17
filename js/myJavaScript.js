const sudokuContainer = document.getElementById("sudoku-Table");
class SudokuPuzzleCell {
  constructor(rowIndex, columnIndex, value) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.value = value;
  }
}

function _addEventListener() {
  let fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', function (event) {
    const fileInput = event.target;

    if (fileInput.files.length === 0) {
      console.log('No file selected.');
      return;
    }

    const file = fileInput.files[0];

    if (file.type !== 'text/plain') {
      console.error('Please select a valid text file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const content = event.target.result; // Get the content of the file
      loadSudoku(content);
    };

    reader.onerror = function (event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsText(file); // Read the file as text
  });
}

function loadSudoku(content) {
  let initialSudoku = JSON.parse(content);
  createSudokuGrid(initialSudoku);
}

// ساخت جدول
function createSudokuGrid(initialSudoku) {
  sudokuContainer.innerHTML = "";
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (row % 3 === 0) cell.style.borderTop = "3px solid black";
      if (col % 3 === 0) cell.style.borderLeft = "3px solid black";
      if (row === 8) cell.style.borderBottom = "3px solid black";
      if (col === 8) cell.style.borderRight = "3px solid black";

      const input = document.createElement("input");
      input.maxLength = 1;

      var isFound = false;
      for (var i = 0; i < initialSudoku.length; i++) {
        if (initialSudoku[i].columnIndex === col && initialSudoku[i].rowIndex === row) {
          input.value = initialSudoku[i].value;
          input.disabled = true;
          isFound = true;
          // PUSH TO ORGIN
          break;
        }
      }

      if (!isFound) {
        console.log("not found!");
      }
      // بررسی ورودی
      input.addEventListener("input", (e) => {
        const value = e.target.value;
        if (!/^[1-9]$/.test(value)) {
          e.target.value = ""; // پاک کردن مقدار نامعتبر
          return;
        }
      });
      cell.appendChild(input);
      sudokuContainer.appendChild(cell);
    }
  }
}

_addEventListener();