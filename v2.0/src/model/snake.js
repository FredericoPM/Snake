export default class Snake{
    constructor(size){
        this._body = [];
        this._board = [];
        this._direction = "d";
        //utilizada para resolver o bug de caso o usuario clicar teclas muito rapidamente poder virar para tras
        this._lastDirection;

        this.newBoard(size);
    }
    //setters
    set direction(direction){
        var canTurnRight = direction == 'd' && this._direction != 'a' && this._lastDirection != 'a';
        var canTurnLeft = direction == 'a' && this._direction != 'd' && this._lastDirection != 'd';
        var canTurnUp = direction == 'w' && this._direction != 's' && this._lastDirection != 's';
        var canTurnDown = direction == 's' && this._direction != 'w' && this._lastDirection != 'w';
        if(canTurnDown || canTurnLeft || canTurnRight || canTurnUp){
            this._lastDirection = this._direction;
            this._direction = direction;
        }
        
    }
    //getters
    get board(){
        return this._board;
    }
    get points(){
        return this._body.length;
    }
    //funções privadas
    //cria uma nova comida no tabuleiro numa posição nao ocupada
    _randomFood(){
        var flag = this._board.length > 0;

        while(flag){
            var i = parseInt((Math.random()*100)%this._board.length);
            var j = parseInt((Math.random()*100)%this._board.length);
            if(this._board[i][j] == 0){
                this._board[i][j] = 1;
                flag = false;
            }
        }
    }
    //imprime a cobra no _board
    _setSnake(){
        var nextPart;
        var currentPart;
        for(var i = 0; i < this._body.length; i++){
            currentPart = this._body[i];
            if(i > 0 && i < this._body.length-1){
                nextPart = this._body[i-1];
                if(currentPart.d == nextPart.d){
                    if(currentPart.d == 'w' || currentPart.d == 's'){
                        this._board[currentPart.x][currentPart.y] = 3;
                    }else{
                        this._board[currentPart.x][currentPart.y] = 4;
                    }
                }else{
                    if((currentPart.d == 'w' && nextPart.d =='a') || (currentPart.d == 'd' && nextPart.d =='s')){
                        this._board[currentPart.x][currentPart.y] = 5;
                    }else if((currentPart.d == 'w' && nextPart.d == 'd') || (currentPart.d == 'a' && nextPart.d == 's')){
                        this._board[currentPart.x][currentPart.y] = 6;
                    }else if((currentPart.d == 'd' && nextPart.d == 'w') || (currentPart.d == 's' && nextPart.d == 'a')){
                        this._board[currentPart.x][currentPart.y] = 7;
                    }else if((currentPart.d == 'a' && nextPart.d == 'w') || (currentPart.d == 's' && nextPart.d == 'd')){
                        this._board[currentPart.x][currentPart.y] = 8;
                    }
                }
            }else if(i == 0){
                this._board[currentPart.x][currentPart.y] = 2;
            }else if(i == this._body.length-1){
                this._board[currentPart.x][currentPart.y] = 9;
            }
        }
    }
    //retorna a posição para qual a cabeça deve se mover na interação atual a partir da direção
    _getNewHead(){
        const head = this._body[0];
        var newHead;
        switch(this._direction){
            case 'w':
                newHead = {x : head.x == 0 ? this._board.length-1: head.x-1, y: head.y, d:this._direction};
            break;
            case 'a':
                newHead = {x: head.x, y: head.y == 0 ? this._board.length-1: head.y-1, d:this._direction};
            break;
            case 's':
                newHead = {x: (head.x+1)%this._board.length, y: head.y, d:this._direction};
            break;
            case 'd':
                newHead = {x: head.x, y: (head.y+1)%this._board.length, d:this._direction};
            break;
        }
        return newHead;
    }
    //aumenta o tamanho da cobre e adiciona uma nova comida num local aleatorio
    _eat(){
        this._body.push(this._body[this._body.length-1]);
        this._randomFood();
    }
    //atualiza as pozições da cobra apos um movimento
    _updateSnake(newHead){
        for(var i = this._body.length-1; i > 0; i--){
            this._body[i] = this._body[i-1];
        }
        this._body[0] = newHead;
    }
    //funções publicas
    //gera um novo tabuleiro a partir do tamanho passado com uma comida e a cobra
    newBoard(size){
        this._board =[
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
        ];
        this._direction = 'd';
        this._body = [{x: parseInt(size/2), y:0, d:this._direction}];
        this._setSnake();
        this._randomFood();

        return this._board;
    }
    move(){
        this._lastDirection = this._direction;

        const newHead = this._getNewHead();
        if(this._board[newHead.x][newHead.y] >= 2){
            return false;
        }else if(this._board[newHead.x][newHead.y] == 1){
            this._eat();
        }else{
            const lastPart = this._body[this._body.length-1];
            this._board[lastPart.x][lastPart.y] = 0;
        }

        this._updateSnake(newHead);
        this._setSnake();

        return true;
    }
}