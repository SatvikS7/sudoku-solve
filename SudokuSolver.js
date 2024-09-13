import { Util } from "./Util.js";


function checkNum(board, r, c, num) {
    //check row for same num
    for(let col = 0; col < 9; col++) {
        if(board[r][col] === num) {
            return false;
        }
    }

    //check col for same num
    for(let row = 0; row < 9; row++) {
        if(board[row][c] === num) {
            return false;
        }
    }

    //check square for same num
    for(let i = r-(r%3); i < r-(r%3)+3; i++) {
        for(let j = c-(c%3); j < c-(c%3)+3; j++) {
            if(i != r && j != c) {
                if(board[i][j] === num) {
                    return false;
                }
            }
        }
    }

    return true;
}

function checkValid(board) {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(!checkNum(board, i, j, board[i][j])) {
                console.log({i, j})
                return false;
            }
        }
    }
    return true;
}

function isComplete(board) {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function adjNumRecur(board, r, c, num) {
    if(num === 10) {
        return 0;
    }
    if(!checkNum(board, r, c, num)) {
        return adjNumRecur(board, r, c, num+1);
    } else {
        return num;
    }
}

function shuffle(array) {
    let currIdx = array.length, randIdx;

    while(currIdx > 0) {
        randIdx = Math.floor(Math.random() * currIdx);
        currIdx--;

        [array[currIdx], array[randIdx]] = [array[randIdx], array[currIdx]];
    }

    return array;
}

function solve(board) {
    const initialize2DArray = (w, h, val = null) =>
        Array.from({ length:h }).map(() => Array.from({ length: w }).fill(val));
    var isBlank = initialize2DArray(9, 9, false);
    var r = 0;
    var c = 0;
    var firstR = -1;
    var firstC = -1; 
    var firstPass = true;

    while(r < 9 && c < 9) {
        if(board[r][c] != 0 && isBlank[r][c] == false) {
            if(c == 8) {
                c = 0;
                r++;
            } else {
                c++;
            }
            continue;
        } else {
            isBlank[r][c] = true;
            if(firstPass) {
                firstC = c;
                firstR = r;
                firstPass = false;
            }
        }

        board[r][c] = adjNumRecur(board, r, c, board[r][c]+1);
        if(board[r][c] == 0) {
            if(firstC == c && firstR == r) {
                console.log("No solution exists");
                return;
            }
            if(c == 0) {
                c = 8;
                r--;
            } else {
                c--;
            }  
            while(isBlank[r][c] != true) {
                if(c == 0) {
                    c = 8;
                    r--;
                } else {
                    c--;
                }        
            }
        } else {
            if(c == 8) {
                c = 0;
                r++;
            } else {
                c++;
            }
        }
    }
}

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


let solution = [];
let grid = getRandomSudoku();
Util.print2DArray(grid);
Util.copyGrid(grid, solution);
solve(solution);
Util.print2DArray(solution);