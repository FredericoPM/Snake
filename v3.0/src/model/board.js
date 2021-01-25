export function generateBoard(filed){
    var board = [];
    var length = 110;
    for(var i =0 ; i < length;i++){
        board[i] = [];
        for(var j =0 ; j < length;j++){
            if(parseInt(i/10)%2 == parseInt(j/10)%2)
                board[i][j] = {backGround : 0, preenchido: false, food : false, color : ""};
            else 
                board[i][j] = {backGround : 1, preenchido: false, food : false, color : ""};
        }
    }
    if(filed){
        board[parseInt(length/2)][0] = {backGround : 0, preenchido: true, food : false, color : ""};
        board[parseInt(length/2)][1] = {backGround : 0, preenchido: true, food : false, color : ""};
        board[parseInt(length/2)][2] = {backGround : 0, preenchido: true, food : false, color : ""};
    }
    return board;
}