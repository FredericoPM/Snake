<template>
  <v-app>
    <v-main>
      <div class="board">

        <div class="titles">
          <h1 v-if= "gameState === 'over'" id="gameOver">Game over</h1>
          <div v-else>
            <h1>Snake</h1>
            <p id="pontos">Points: {{points}}</p>
          </div>
          
        </div>

        <div v-for="(line, index_i) in board" :key = index_i class="rows">
          <Tile v-for= "(element, index_j) in line" :key = index_j :value = "element" :i = "index_i" :j = "index_j"/>
        </div>

        <v-btn v-if = "gameState === 'paused'"  v-on:click=start color="#bfff00" id="button">
          <v-icon size="25px" id="icons">
            {{icons.mdiPlay}}
          </v-icon>
          <span class = "button-text">Start</span>
        </v-btn>

        <v-btn v-else-if="gameState === 'playing'" v-on:click=pause color="#bfff00" id="button">
          <v-icon size="25px" id="icons">
            {{icons.mdiPause}}
          </v-icon>
          <span class = "button-text">Pause</span>
        </v-btn>

        <v-btn v-else v-on:click=restart color="#FFE00D" id="button">
          <v-icon size="25px" id="icons">
            {{icons.mdiRestart}}
          </v-icon>
          <span class = "button-error-text">Restart</span>
        </v-btn>
        
      </div>
      
    </v-main>
  </v-app>
</template>

<script>
  import Tile from "./Tile";
  import {ipcRenderer} from 'electron';
  var Mousetrap = require('mousetrap');

  import {
     mdiPlay,
     mdiPause,
     mdiRestart,
  } from "@mdi/js";

  window.onload = function(e){
    ipcRenderer.send("reset", "reset");
    return e;
  }

  Mousetrap.bind('w', function() {
    ipcRenderer.send("update_direction", 'w');
  });
  Mousetrap.bind('a', function() {
    ipcRenderer.send("update_direction", 'a');
  });
  Mousetrap.bind('s', function() {
    ipcRenderer.send("update_direction", 's');
  });
  Mousetrap.bind('d', function() {
    ipcRenderer.send("update_direction", 'd');
  });
  Mousetrap.bind('up', function() {
    ipcRenderer.send("update_direction", 'w');
  });
  Mousetrap.bind('left', function() {
    ipcRenderer.send("update_direction", 'a');
  });
  Mousetrap.bind('down', function() {
    ipcRenderer.send("update_direction", 's');
  });
  Mousetrap.bind('right', function() {
    ipcRenderer.send("update_direction", 'd');
  });
  
  export default {
    components: {Tile},
    name: 'App',
    data: function(){
      return {
        board: [
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [15,7,5,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
        ],
        updateFunction: null,
        points: 1,
        gameState: "paused",
        icons: {
          mdiPlay,
          mdiPause,
          mdiRestart,
        }
      }
    },
    methods:{
      update(){
        ipcRenderer.send("update_game", '_');
        ipcRenderer.on("update_board", (event, payload)=>{
          this.board = payload;
        });
        ipcRenderer.on("update_points", (event, payload)=>{
          this.points = payload;
        });
        ipcRenderer.on("game_over", (event, payload)=>{
          this.pause();
          this.gameState = payload;
        });
      },
      start(){
        if(this.gameState == "paused"){
          this.updateFunction = setInterval(this.update, 200);
          this.gameState = "playing";
        }
      },

      pause(){
        clearInterval(this.updateFunction);
        this.gameState = "paused";
      },
      restart(){
        ipcRenderer.send("reset", "reset");
        this.points = 1;
        ipcRenderer.on("reseted_board", (event, payload)=>{this.board = payload});
        this.gameState = "paused"
      }
    }
  };
</script>
<style scoped>
  .rows{
    display: flex;
  }
  .board{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .titles{
    width: 330px;
  }
  .titles div{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .titles h1{
    font-family: 'Roboto';
    font-size: 30pt;
  }
  #button{
    margin-top: 10px;
    padding: 10px;
  }
  .button-text{
    color: #304000;
    font-weight: bold;
    font-size: 1.5em;
  }
  .button-error-text{
    color: #403803;
    font-weight: bold;
    font-size: 1.5em;
  }
  #pontos{
     margin-bottom: 6pt;
  }
  #gameOver{
    color:red;
  }
  #icons{
    margin: 0;
    margin-right: 5px;
  }
</style>