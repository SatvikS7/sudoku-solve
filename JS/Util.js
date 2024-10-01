const Util = {
    print2DArray: function(board) {
        for(let i = 0; i < board.length; i++) {
            console.log(...board[i]);
        }
        console.log();
    },



    /*
    copyGrid: function(from, to) {
        for(let i = 0; i < from.length; i++) {
            to[i] = [...from[i]];
        }
    },
    */
};

export { Util } 