<template>
  <v-app>
    <v-main>
      <div class="board">
        <div v-for="(line, index_i) in board" :key = index_i class="rows">
          <Tile v-for= "(element, index_j) in line" :key = index_j :value = "element" :i = "index_i" :j = "index_j"/>
        </div>
        <div class="buttons">
          <button v-if = "playing === null"  v-on:click=start>Start</button>
          <button v-else v-on:click=stop>Stop</button>
        </div>
      </div>
      
    </v-main>
  </v-app>
</template>

<script>
  window.onload=function(e){
    ipcRenderer.send("reset", "reset");
    return e;
  }

  import Tile from "./Tile"
  import {ipcRenderer} from 'electron'
  var Mousetrap = require('mousetrap');
  var direction = 'd';

  Mousetrap.bind('w', function() {
    direction == 's'? direction : direction = 'w';
  });
  Mousetrap.bind('a', function() {
    direction == 'd'? direction : direction = 'a';
  });
  Mousetrap.bind('s', function() {
    direction == 'w'? direction : direction = 's'; 
  });
  Mousetrap.bind('d', function() {
    direction == 'a'? direction : direction = 'd'; 
  });

  Mousetrap.bind('up', function() {
    direction == 's'? direction : direction = 'w'; 
  });
  Mousetrap.bind('left', function() {
    direction == 'd'? direction : direction = 'a';
  });
  Mousetrap.bind('down', function() {
    direction == 'w'? direction : direction = 's'; 
  });
  Mousetrap.bind('right', function() {
    direction == 'a'? direction : direction = 'd'; 
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
          [1,0,0,0,0,2,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
        ],
        playing: null,
      }
    },
    methods:{
      updateBoard(){
        ipcRenderer.send("update_direction", direction);
        ipcRenderer.on("update_board", (event, payload)=>{
          this.board = payload;
        });
      },
      start(){
        if(this.playing == null){
          this.playing = setInterval(this.updateBoard, 450);
        }
      },
      stop(){
        clearInterval(this.playing);
        this.playing = null;
      }
    }
  };
</script>
<style>
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
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
  .buttons button{
    background: #3498DB;
    border-radius: 5px;
    padding: 10px;
    color: white;
    margin: 10px;
  }
</style>