import { Util } from "./Util.js";
 
const solver = {
    validate: function(r, c, board, num) {
        //check row for same num
        for(let i = 0; i < 9; i++) {
            if(board[r][i] === num) return false;
        }

        //check col for same num
        for(let i = 0; i < 9; i++) {
            if(board[i][c] === num) return false;
        }

        var squareR = r - r%3;
        var squareC = c - c%3;

        //check square for same num
        for(let i = squareR; i < squareR+3; i++) {
            for(let j = squareC; j < squareC+3; j++) {
                if(board[i][j] === num) return false;
            }
        }

        return true;
    },

    printBoard: function(board) {
        for (let i = 0; i < board.length; i++) {
            if (i % 3 === 0 && i !== 0) {
              console.log("-".repeat(29));
            }
        
            let row = "";
            for (let j = 0; j < board[i].length; j++) {
              if (j % 3 === 0 && j !== 0) {
                row += "| ";
              }
        
              row += board[i][j] !== 0 ? board[i][j] + "  " : ".  ";
            }
            console.log(row);
          }
    },

    solve: function(board) {
        var r = -1;
        var c = -1; 
        var done = true;
        var original = board;

        //check if board is done
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[0].length; j++) {
                if(board[i][j] == 0) {
                    done = false;
                    r = i;
                    c = j;
                    break;
                }
            }

            if(!done) break;
        }

        //if board is done return true
        if(done) {
            console.log('Solved Board');
            this.printBoard(board);
            return true;
        }

        //if not done try all numbers through backtracking
        for(let i = 1; i < 10; i++) {
            if(this.validate(r, c, board, i)) {
                board[r][c] = i;
                if(this.solve(board)) {
                    return true;
                } else {
                    board[r][c] = 0
                }
            }
        }

        return false;
    },
};

/*
function createSudoku() {
    let sudoku = getRandomSudoku();

    solve(sudoku);

    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(Math.random() > 0.3) {
                sudoku[i][j] = 0;
            }
        }
    }
}

function getRandomSudoku() {
    const initialize2DArray = (w, h, val = null) =>
        Array.from({ length:h }).map(() => Array.from({ length: w }).fill(val));
    
    let sudoku = initialize2DArray(9, 9, 0);
    let solution = initialize2DArray(9, 9, 0);
    
    while(!isComplete(solution)) {
        let numDone = 0;
        sudoku = initialize2DArray(9, 9, 0);
        while(numDone < 30) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            let num = Math.floor(Math.random() * 9) + 1;

            if(sudoku[row][col] === 0) {
                if(!checkNum(sudoku, row, col, num)) {
                    sudoku[row][col] = 0;
                } else {
                    sudoku[row][col] = num;
                    numDone++;
                }
            }
        }
        Util.copyGrid(sudoku, solution);
        solve(solution);
        //Util.print2DArray(solution);
    }
    Util.print2DArray(sudoku);
    return sudoku;
}
    */

export { solver }

/*
let solution = [];
let grid = getRandomSudoku();
Util.print2DArray(grid);
Util.copyGrid(grid, solution);
solve(solution);
Util.print2DArray(solution);
*/