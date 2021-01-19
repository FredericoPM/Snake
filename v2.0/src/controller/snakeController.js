const { ipcMain } = require("electron");
import Snake from "../model/snake"
var game = new Snake(11);

ipcMain.on("reset", (event, payload)=>{
    event.reply("reseted_board", game.newBoard(11));
})

ipcMain.on("update_direction", (event, payload)=>{
    game.direction = payload;

    if(game.move()){
        event.reply("update_board", game.board);
        event.reply("update_points", game.points);
    }else{
        event.reply("game_over", "over");
    }
})
