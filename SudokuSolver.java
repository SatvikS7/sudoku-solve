public class SudokuSolver {

    static int[][] board = {
        { 5, 1, 6, 8, 4, 9, 7, 3, 2 },
        { 3, 0, 7, 6, 0, 5, 0, 0, 0 },
        { 8, 0, 9, 7, 0, 0, 0, 6, 5 },
        { 1, 3, 5, 0, 6, 0, 9, 0, 7 },
        { 4, 7, 2, 5, 9, 1, 0, 0, 6 },
        { 9, 6, 8, 3, 7, 0, 0, 5, 0 },
        { 2, 5, 3, 1, 8, 6, 0, 7, 4 },
        { 6, 8, 4, 2, 0, 7, 5, 0, 0 },
        { 7, 9, 1, 0, 5, 0, 6, 0, 8 } 
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
    public static boolean validate(int r, int c) {
        
    }
    public static void main(String[] args) {
    
        printBoard();
    }
}
