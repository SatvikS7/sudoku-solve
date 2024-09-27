public class SudokuSolver {

    static int[][] board = {
        { 3, 0, 6, 5, 0, 8, 4, 0, 0 },
        { 5, 2, 0, 0, 0, 0, 0, 0, 0 },
        { 0, 8, 7, 0, 0, 0, 0, 3, 1 },
        { 0, 0, 3, 0, 1, 0, 0, 8, 0 },
        { 9, 0, 0, 8, 6, 3, 0, 0, 5 },
        { 0, 5, 0, 0, 9, 0, 6, 0, 0 },
        { 1, 3, 0, 0, 0, 0, 2, 5, 0 },
        { 0, 0, 0, 0, 0, 0, 0, 7, 4 },
        { 0, 0, 5, 2, 0, 6, 3, 0, 0 }
    };
    public static void printBoard() {
        for(int i = 0; i < board.length; i++) {
            for(int j = 0; j < board[i].length; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println();
        
    }

    //check cell
    public static boolean validate(int r, int c, int[][] currBoard, int num) {
        //check row
        for(int i = 0; i < currBoard[0].length; i++) {
            if(currBoard[r][i] == num) return false;
        }
        //check column
        for(int i = 0; i < currBoard.length; i++) {
            if(currBoard[i][c] == num) return false;
        }
        //check square
        int squareR = r - r%3;
        int squareC = c - c%3;

        for(int i = squareR; i < squareR+3; i++) {
            for(int j = squareC; j < squareC+3; j++) {
                if(currBoard[i][j] == num) return false;
            }
        }

        return true;
    }

    public static boolean solve(int[][] board) {
        //check if board is done
        boolean done = true;
        int r = -1;
        int c = -1;
        for(int i = 0; i < board.length; i++) {
            for(int j = 0; j < board[0].length; j++) {
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
        if(done) return true;

        //if not done try all numbers through backtracking
        for(int i = 1; i < 10; i++) {
            if(validate(r, c, board, i)) {
                board[r][c] = i;
                if(solve(board)) {
                    return true;
                } else {
                    board[r][c] = 0;
                }
            }
        } 
        return false;


    }
    public static void main(String[] args) {
        if(solve(board)) {
            printBoard();
        } else {
            System.out.println("not solvable");
        }
    }
}
