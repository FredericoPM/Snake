const { ipcMain } = require("electron");

var direction = "d";
var snake = [[5,0],];
var board = [
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
  ];

ipcMain.on("reset", (event, payload)=>{
    direction = "d";
    board = [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,2,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
    ];
    snake = [[5,0],];
})

ipcMain.on("update_direction", (event, payload)=>{
    direction = payload;
    var oldHead = snake[0];
    var newHead;
    var ate = false;
    switch(direction){
        case 'w':
            newHead = [oldHead[0] == 0 ? board.length-1: oldHead[0]-1, oldHead[1]];
        break;
        case 'a':
            newHead = [oldHead[0], oldHead[1] == 0 ? board.length-1: oldHead[1]-1];
        break;
        case 's':
            newHead = [(oldHead[0]+1)%board.length, oldHead[1]];
        break;
        case 'd':
            newHead = [oldHead[0], (oldHead[1]+1)%board.length];
        break;
    }

    if(board[newHead[0]][newHead[1]] === 2){
        snake.push(snake[snake.length-1]);
        ate = true;
    }else{
        var last = snake[snake.length-1];
        board[last[0]][last[1]] = 0;
    }

    for(var i = snake.length-1; i > 0; i--){
        snake[i] = snake[i-1];
    }
    snake[0] = newHead;

    for (var i = 0; i < snake.length; i++){
        board[snake[i][0]][snake[i][1]] = 1;
    }
    
    for(;ate;){
        var i = parseInt((Math.random()*100)%board.length);
        var j = parseInt((Math.random()*100)%board.length);
        if(board[i][j]==0){
            board[i][j]=2;
            ate = false;
        }
    }
    event.reply("update_board", board);
})
