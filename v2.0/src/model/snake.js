export default class Snake{
    constructor(size){
        //propiedades privadas
        this._body = [];
        this._board = [];
        //propriedades publicas
        this._direction = "d";
        this.newBoard(size);
    }
    //setters
    set direction(direction){
        this._direction = direction;
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
                this._board[i][j] = 2;
                flag = false;
            }
        }
    }
    //imprime a cobra no _board
    _setSnake(){
        for(var i = 0; i < this._body.length; i++){
            this._board[this._body[i][0]][this._body[i][1]] = 1;
        }
    }
    //retorna a posição para qual a cabeça deve se mover na interação atual a partir da direção
    _getNewHead(){
        const head = this._body[0];
        var newHead;
        switch(this._direction){
            case 'w':
                newHead = [head[0] == 0 ? this._board.length-1: head[0]-1, head[1]];
            break;
            case 'a':
                newHead = [head[0], head[1] == 0 ? this._board.length-1: head[1]-1];
            break;
            case 's':
                newHead = [(head[0]+1)%this._board.length, head[1]];
            break;
            case 'd':
                newHead = [head[0], (head[1]+1)%this._board.length];
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
        this._body = [[parseInt(size/2),0]];
        this._setSnake();
        this._randomFood();

        return this._board;
    }
    move(){
        const newHead = this._getNewHead();
    
        if(this._board[newHead[0]][newHead[1]] == 1){
            return false;
        }else if(this._board[newHead[0]][newHead[1]] == 2){
            this._eat();
        }

        const lastPart = this._body[this._body.length-1];
        this._board[lastPart[0]][lastPart[1]] = 0;

        this._updateSnake(newHead);
        this._setSnake();

        return true;
    }
}