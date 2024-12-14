const sudokuContainer = document.getElementById("sudoku-Table");
class SudokuPuzzleCell {
  constructor (rowIndex, columnIndex, value){
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.value = value;
  }
}

// لود شدن جدول
function loadSudoku(index) {
  const initialSudoku = sudokuPuzzles[index - 1];
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

      // مقدار پیش‌فرض
      if (initialSudoku[row][col] !== null) {
        input.value = initialSudoku[row][col];
        input.disabled = true;
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

// loadSudoku(1);