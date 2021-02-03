<template>
  <v-app>
    <v-main>
      <div class="game">

        <div class="titles">
          <h1 v-if= "gameState === 'over'" id="gameOver">Game over</h1>
          <div v-else>
            <h1 id="playingTitle" >Snake</h1>
            <p id="pontos">Points :  <span>{{points}}</span></p>
          </div>
          
        </div>
        <div :class="gameState === 'over' ? 'board over' : 'board playing'">
          <div v-for="(line, index_i) in board" :key = index_i class="rows">
            <Tile v-for= "(element, index_j) in line" :key = index_j :value = "element" :i = "index_i" :j = "index_j"/>
          </div>
        </div>
        <v-btn v-if = "gameState === 'paused'"  v-on:click=start class="button" id="play-pause">
          <v-icon left size="25px" id="icons" >
            {{icons.mdiPlay}}
          </v-icon>
          <span class = "button-text">Start</span>
        </v-btn>

        <v-btn v-else-if="gameState === 'playing'" v-on:click=pause class="button" id="play-pause">
          <v-icon left size="25px" id="icons">
            {{icons.mdiPause}}
          </v-icon>
          <span class = "button-text">Pause</span>
        </v-btn>

        <v-btn v-else v-on:click=restart class="button" id="restart">
          <v-icon left size="25px" id="icons">
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
  @import url('https://fonts.googleapis.com/css2?family=Hanalei+Fill&display=swap');
  .game{
    font-family: cursive;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .titles{
    width: 330px;
    display: flex;
    justify-content: center;
  }
  .titles div{
    width: 330px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .titles h1{
    font-family: 'Hanalei Fill';
    font-weight: lighter;
    letter-spacing: 3px;
    font-size: 40pt;
    
  }
  #playingTitle{
    color: #BFFF00;
    text-shadow: 3px 0 0 #304000, -3px 0 0 #304000, 0 3px 0 #304000, 0 -3px 0 #304000, 1.5px 1.5px #304000, -1.5px -1.5px 0 #304000, 1.5px -1.5px 0 #304000, -1.5px 1.5px 0 #304000;
  }
  #gameOver{
    color:#FFE00D;
    text-shadow: 3px 0 0 #403803, -3px 0 0 #403803, 0 3px 0 #403803, 0 -3px 0 #403803, 1.5px 1.5px #403803, -1.5px -1.5px 0 #403803, 1.5px -1.5px 0 #403803, -1.5px 1.5px 0 #403803;
  }
  .rows{
    display: flex;
  }
  .board{
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
  .playing{
    border: 2px solid #bfff00;
  }
  .over{
    border: 2px solid #FFE00D;
  }
  .button{
    margin-top: 30px;
    padding: 15px;
  }
  #play-pause{
    border: 1.5px solid #403803;
    background-color: #bfff00;
  }
  .button-text{
    color: #304000;
    font-weight: bold;
    font-size: 1.5em;
  }
  #restart{
    border: 1.5px solid#403803;
    background-color: #FFE00D;
  }
  .button-error-text{
    color: #403803;
    font-weight: bold;
    font-size: 1.5em;
  }
  #pontos{
    display: flex;
    align-items: baseline;
    font-size: 20pt;
  }
  #pontos span{
    font-size: 30pt;
  }
  #icons{
    margin-right: 5px;
  }
</style>