import { generateBoard } from '../model/board.js';
export default class Snake{
    constructor(size){
        this._body = [];
        this._board = [];
        this._direction = ["d"];
        this._comandos = 0;

        this.newBoard(size);
    }
    //setters
    // set direction(direction){
    //     var ultimo =  this._direction.length-1;

    //     var canTurnRight = direction == 'd' && this._direction[ultimo] != 'a';
    //     var canTurnLeft = direction == 'a' && this._direction[ultimo] != 'd';
    //     var canTurnUp = direction == 'w' && this._direction[ultimo] != 's';
    //     var canTurnDown = direction == 's' && this._direction[ultimo] != 'w';
        
    //     if(this._comandos < 2 && (canTurnDown || canTurnLeft || canTurnRight || canTurnUp) && direction != this._direction[ultimo] && this._direction.length<4){
    //         if(this._direction.length == 1 && this._comandos == 0 && this._body[0].d == this._direction[0]){
    //             this._direction[0] = direction;
    //         }else{
    //             this._direction.push(direction);
    //         }
    //         this._comandos++;
    //     }else if(this._comandos == 2 || this._direction.length >= 4){
    //         canTurnRight = direction == 'd' && this._direction[ultimo - 1] != 'a';
    //         canTurnLeft = direction == 'a' && this._direction[ultimo - 1] != 'd';
    //         canTurnUp = direction == 'w' && this._direction[ultimo - 1] != 's';
    //         canTurnDown = direction == 's' && this._direction[ultimo - 1] != 'w';
    //         if(this._comandos < 2 && (canTurnDown || canTurnLeft || canTurnRight || canTurnUp) && direction != this._direction[ultimo-1]){
    //             this._direction[ultimo] = direction;
    //         }
    //     }
    // }
    //* getters
    get board(){
        return this._board;
    }
    // get points(){
    //     return this._body.length-2;
    // }
    //funções privadas
    //cria uma nova comida no tabuleiro numa posição nao ocupada
    // _randomFood(){
    //     var flag = this._board.length > 0;

    //     while(flag){
    //         var i = parseInt((Math.random()*100)%this._board.length);
    //         var j = parseInt((Math.random()*100)%this._board.length);
    //         if(this._board[i][j] == 0){
    //             this._board[i][j] = 1;
    //             flag = false;
    //         }
    //     }
    // }
    //* imprime a cobra no _board
    _setSnake(){
        var pixels;
        var x;
        var y;
        var color;
        for(var i = 0; i < this._body.length; i++){
            pixels = this._body[i].pixels;
            for(var j = 0; j < 10; j++){
                for(var k = 0; k < 10; k++){
                    x = pixels[j][k].x;
                    y = pixels[j][k].y;
                    color = pixels[j][k].color;
                    this._board[x][y].preenchido = true;
                    this._board[x][y].color = color;
                }
            }
        }
    }
    //retorna a posição para qual a cabeça deve se mover na interação atual a pixelsir da direção
    _getNewHead(){
        const head = this._body[0];
        var newHead;
        var pixels = [];
        for(var i = 0; i<10 ;i++){
            pixels[i] = [];
            for(var j = 0; j<10 ;j++){
                if(this._direction[0] == 'w'){
                    pixels[i][j] = {x: head.pixels[i][j].x == 0 ? this._board.length-1: head.pixels[i][j].x-1, y: head.pixels[i][j].y, color: "#fff"};
                }else if(this._direction[0] == 'a'){
                    pixels[i][j] = {x: head.pixels[i][j].x, y: head.pixels[i][j].y == 0 ? this._board.length-1: head.pixels[i][j].y-1, d:this._direction[0]};
                }else if(this._direction[0] == 's'){
                    pixels[i][j] = {x: (head.pixels[i][j].x+1)%this._board.length, y: head.pixels[i][j].y, d:this._direction[0]};
                }else if(this._direction[0] == 'd'){
                    pixels[i][j] = {x: head.pixels[i][j].x, y: (head.pixels[i][j].y+1)%this._board.length, d:this._direction[0]};
                }
            }
        }
        newHead = {pixels: pixels, d: this._direction[0]};
        return newHead;
    }
    //aumenta o tamanho da cobre e adiciona uma nova comida num local aleatorio
    // _eat(){
    //     this._body.push(this._body[this._body.length-1]);
    //     this._randomFood();
    // }
    //atualiza as pozições da cobra apos um movimento
    _updateSnake(newHead){
        for(var i = this._body.length-1; i > 0; i--){
            this._body[i] = this._body[i-1];
        }
        this._body[0] = newHead;
    }
    _expand(x, y){
        
        var pixels = [];
        for(var i = 0, posX = (x-5); i < 10; i++, posX++){
            pixels[i] = [];
            for(var j = 0, posY = (y-5); j < 10; j++, posY++){
                pixels[i][j] = {x: posX, y: posY, color: "#fff"};
            }
        }
        return pixels;
    }
    //* funções publicas
    //* gera um novo tabuleiro a pixelsir do tamanho passado com uma comida e a cobra
    newBoard(size){
        this._board = generateBoard(false);
        this._direction = ['d'];
        this._body = [{pixels: this._expand(parseInt(size/2), 25), d: this._direction[0]}];
        this._body.push({pixels: this._expand(parseInt(size/2), 15), d: this._direction[0]});
        this._body.push({pixels: this._expand(parseInt(size/2), 5), d: this._direction[0]});
        this._setSnake();
        //this._randomFood();
        return this._board;
    }
    move(){
        const newHead = this._getNewHead();
        // if(this._board[newHead.x][newHead.y] >= 2 && !(newHead.x == this._body[this._body.length-1].x && newHead.y == this._body[this._body.length-1].y)){
        //     return false;
        // }else if(this._board[newHead.x][newHead.y] == 1){
        //     this._eat();
        // }else{
        //     const lastpixels = this._body[this._body.length-1];
        //     this._board[lastpixels.x][lastpixels.y] = 0;
        // }

        this._updateSnake(newHead);
        this._setSnake();

        if(this._direction.length > 1){
            this._direction.shift();
        }
        this._comandos = 0;
        return true;
    }
}