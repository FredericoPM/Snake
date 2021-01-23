export function generateBoard(filed){
    var board = [];
    for(var i =0 ; i<11;i++){
        board[i] = [];
        for(var j =0 ; j<11;j++){
            board[i][j] = 0;
        }
    }
    if(filed){
        board[5][0] = 15;
        board[5][1] = 7;
        board[5][2] = 5;
    }
    return board;
}