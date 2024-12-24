
class SudokuPuzzleCell {
    constructor(rowIndex, columnIndex, value) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.value = value;
    }
}

const sudokuPuzzles = [
    [
        [5, 3, null, 8, null, null, 6, null, null],
        [null, 4, 9, 5, null, 2, 8, 3, 1],
        [null, 2, 7, 1, null, null, 5, null, 9],
        [7, 5, null, 9, null, 1, null, null, 4],
        [2, null, 8, 4, null, null, null, null, 6],
        [4, null, null, null, null, 8, null, null, null],
        [null, 6, null, null, null, 3, 4, 1, null],
        [3, null, null, null, 1, null, null, 2, null],
        [1, 8, null, 2, null, 4, null, null, null],
    ],
    [
        [3, null, null, null, 1, 9, null, null, null],
        [null, 9, 6, null, 2, 8, 4, 3, 1],
        [1, 5, 2, null, 4, 7, 6, 8, null],
        [null, 6, 7, null, 8, null, null, null, null],
        [8, null, 5, null, null, null, 3, null, 6],
        [null, null, null, 1, null, null, null, 7, null],
        [null, null, null, 2, 3, null, 9, 6, null],
        [5, null, null, null, 6, null, null, null, null],
        [null, 2, null, 8, null, null, 1, null, 7],
    ],
    [
        [6, 8, null, null, null, null, 3, 4, null],
        [null, 5, null, null, null, null, null, 9, null],
        [null, null, null, 4, 2, null, null, null, 8],
        [null, 7, 9, null, null, null, null, 8, null],
        [null, 3, null, null, null, null, 2, null, null],
        [null, 6, 2, 5, 9, 8, null, null, null],
        [null, 9, 1, 2, null, 6, 4, null, null],
        [null, 4, 5, 8, null, null, null, null, null],
        [7, null, null, null, null, 9, null, 5, null],
    ],
];

const sudokuPuzzleReservedCells = [];


////old
const sudokuContainer = document.getElementById("sudoku-Table");
const updatedSudoku = [];
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
  _createSudokuGrid(initialSudoku);
}

// ساخت جدول
function _createSudokuGrid(initialSudoku) {
  sudokuContainer.innerHTML = "";
  const cells = [];
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

      var isFound = false;
      for (var i = 0; i < initialSudoku.length; i++) {
        if (initialSudoku[i].columnIndex === col && initialSudoku[i].rowIndex === row) {
          input.value = initialSudoku[i].value;
          input.disabled = true;
          isFound = true;
          updatedSudoku.push(new SudokuPuzzleCell(row, col, initialSudoku[i].value));
          break;
        }
      }

      if (!isFound) {
        updatedSudoku.push(new SudokuPuzzleCell(row, col, 0));
      }

      cells[row][col] = { input, cell };
      // بررسی ورودی
      input.addEventListener("input", (e) => {
        const value = e.target.value;
        if (!/^[1-9]$/.test(value)) {
          e.target.value = "";
          return;
        }
        const existingIndex = updatedSudoku.findIndex((cell) => cell.rowIndex === row && cell.columnIndex === col);

        if (existingIndex !== -1) {
          updatedSudoku[existingIndex].value = parseInt(value);
        } else {
          updatedSudoku.push(new SudokuPuzzleCell(row, col, parseInt(value)));
        }

        console.log("Updated Sudoku:", updatedSudoku);

        _highlightDuplicates(row, col, value, cells);
        _CompletedSudoku(cells);
        
      });
      cell.appendChild(input);
      sudokuContainer.appendChild(cell);
    }
  }
}

function _highlightDuplicates(row, col, value, cells) {
  let hasDuplicate = false;

  // بررسی سطر و ستون
  for (let i = 0; i < 9; i++) {
    // بررسی سطر
    if (i !== col && cells[row][i].input.value === value && value !== "") {
      cells[row][i].input.style.border = "2px solid red";
      hasDuplicate = true;
    }

    // بررسی ستون
    if (i !== row && cells[i][col].input.value === value && value !== "") {
      cells[i][col].input.style.border = "2px solid red";
      hasDuplicate = true;
    }
  }

  // اگر تکراری بود، سلول ورودی هم قرمز شود
  if (hasDuplicate) {
    cells[row][col].input.style.border = "2px solid red";
  } else {
    // اگر تکراری نبود، بازنشانی سطر و ستون
    for (let i = 0; i < 9; i++) {
      cells[row][i].input.style.border = "1px solid black"; // بازنشانی سطر
      cells[i][col].input.style.border = "1px solid black"; // بازنشانی ستون
    }
  }
}
 

function _CompletedSudoku(cells) {
  let allValid = true;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = cells[row][col].input.value;
      if (value === "" || value === "0") {
        allValid = false;
        break;
      }
    }
  }

  // صحیح شد
  if (allValid) {
    sudokuContainer.style.border = "3px solid green";
    alert("تبریک موفق شدید!!");
  } else {
    sudokuContainer.style.border = "2px solid black"; 
  }
}

_addEventListener();      