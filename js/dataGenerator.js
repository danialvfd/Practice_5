
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

for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
        let value = sudokuPuzzles[2][row][column];
        if (value) {
            sudokuPuzzleReservedCells.push(new SudokuPuzzleCell(row, column, value));
        }
    }
}

console.log(JSON.stringify(sudokuPuzzleReservedCells));
