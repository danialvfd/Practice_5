const sudokuContainer = document.getElementById("sudoku-Table");

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

loadSudoku(1);