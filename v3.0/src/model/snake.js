import { generateBoard } from '../model/board.js';
export default class Snake{
    constructor(size){
        this._body = [];
        this._board = [];
        this._direction = ["d"];
        this._comandos = 0;
        //utilizada para resolver o bug de caso o usuario clicar teclas muito rapidamente poder virar para tras

        this.newBoard(size);
    }
    //setters
    set direction(direction){
        var ultimo =  this._direction.length-1;

        var canTurnRight = direction == 'd' && this._direction[ultimo] != 'a';
        var canTurnLeft = direction == 'a' && this._direction[ultimo] != 'd';
        var canTurnUp = direction == 'w' && this._direction[ultimo] != 's';
        var canTurnDown = direction == 's' && this._direction[ultimo] != 'w';
        
        if(this._comandos < 2 && (canTurnDown || canTurnLeft || canTurnRight || canTurnUp) && direction != this._direction[ultimo] && this._direction.length<4){
            if(this._direction.length == 1 && this._comandos == 0 && this._body[0].d == this._direction[0]){
                this._direction[0] = direction;
            }else{
                this._direction.push(direction);
            }
            this._comandos++;
        }else if(this._comandos == 2 || this._direction.length >= 4){
            canTurnRight = direction == 'd' && this._direction[ultimo - 1] != 'a';
            canTurnLeft = direction == 'a' && this._direction[ultimo - 1] != 'd';
            canTurnUp = direction == 'w' && this._direction[ultimo - 1] != 's';
            canTurnDown = direction == 's' && this._direction[ultimo - 1] != 'w';
            if(this._comandos < 2 && (canTurnDown || canTurnLeft || canTurnRight || canTurnUp) && direction != this._direction[ultimo-1]){
                this._direction[ultimo] = direction;
            }
        }
    }
    //getters
    get board(){
        return this._board;
    }
    get points(){
        return this._body.length-2;
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
        var previusPart;
        var currentPart;
        for(var i = 0; i < this._body.length; i++){
            currentPart = this._body[i];
            if(i > 0 && i < this._body.length-1){
                previusPart = this._body[i-1];
                if(currentPart.d == previusPart.d){
                    if(currentPart.d == 'w' || currentPart.d == 's'){
                        this._board[currentPart.x][currentPart.y] = 6;
                    }else{
                        this._board[currentPart.x][currentPart.y] = 7;
                    }
                }else{
                    if((currentPart.d == 'w' && previusPart.d =='a') || (currentPart.d == 'd' && previusPart.d =='s')){
                        this._board[currentPart.x][currentPart.y] = 8;
                    }else if((currentPart.d == 'w' && previusPart.d == 'd') || (currentPart.d == 'a' && previusPart.d == 's')){
                        this._board[currentPart.x][currentPart.y] = 9;
                    }else if((currentPart.d == 'd' && previusPart.d == 'w') || (currentPart.d == 's' && previusPart.d == 'a')){
                        this._board[currentPart.x][currentPart.y] = 10;
                    }else if((currentPart.d == 'a' && previusPart.d == 'w') || (currentPart.d == 's' && previusPart.d == 'd')){
                        this._board[currentPart.x][currentPart.y] = 11;
                    }
                }
            }else if(i == 0){
                if(currentPart.d == 'w'){
                    this._board[currentPart.x][currentPart.y] = 2;
                }else if(currentPart.d == 'a'){
                    this._board[currentPart.x][currentPart.y] = 3;
                }else if(currentPart.d == 's'){
                    this._board[currentPart.x][currentPart.y] = 4;
                }else if(currentPart.d == 'd'){
                    this._board[currentPart.x][currentPart.y] = 5;
                }
            }else if(i == this._body.length-1){
                previusPart = this._body[i-1];
                if(previusPart.d == 'w'){
                    this._board[currentPart.x][currentPart.y] = 12;
                }else if(previusPart.d == 'a'){
                    this._board[currentPart.x][currentPart.y] = 13;
                }else if(previusPart.d == 's'){
                    this._board[currentPart.x][currentPart.y] = 14;
                }else if(previusPart.d == 'd'){
                    this._board[currentPart.x][currentPart.y] = 15;
                }
            }
        }
    }
    //retorna a posição para qual a cabeça deve se mover na interação atual a partir da direção
    _getNewHead(){
        const head = this._body[0];
        var newHead;
        switch(this._direction[0]){
            case 'w':
                newHead = {x : head.x == 0 ? this._board.length-1: head.x-1, y: head.y, d:this._direction[0]};
            break;
            case 'a':
                newHead = {x: head.x, y: head.y == 0 ? this._board.length-1: head.y-1, d:this._direction[0]};
            break;
            case 's':
                newHead = {x: (head.x+1)%this._board.length, y: head.y, d:this._direction[0]};
            break;
            case 'd':
                newHead = {x: head.x, y: (head.y+1)%this._board.length, d:this._direction[0]};
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
        this._board = generateBoard(false);
        this._direction = ['d'];
        this._body = [{x: parseInt(size/2), y:2, d:this._direction[0]}];
        this._body.push({x: parseInt(size/2), y:1, d:this._direction[0]});
        this._body.push({x: parseInt(size/2), y:0, d:this._direction[0]});
        this._setSnake();
        this._randomFood();

        return this._board;
    }
    move(){
        const newHead = this._getNewHead();
        if(this._board[newHead.x][newHead.y] >= 2 && !(newHead.x == this._body[this._body.length-1].x && newHead.y == this._body[this._body.length-1].y)){
            return false;
        }else if(this._board[newHead.x][newHead.y] == 1){
            this._eat();
        }else{
            const lastPart = this._body[this._body.length-1];
            this._board[lastPart.x][lastPart.y] = 0;
        }

        this._updateSnake(newHead);
        this._setSnake();

        if(this._direction.length > 1){
            this._direction.shift();
        }
        this._comandos = 0;
        return true;
    }
}