
// https://github.com/mdn/js-examples/blob/master/modules/dynamic-module-imports/modules/canvas.js

class GameServer {

    constructor(user,emitter) {  
      this.emitter = null;
      this.user = user;
      this.mode = null;
    }

    connect(){
      let _this = this;
      setTimeout(function(){
       // _this.initGame();
      })
      return true;
    }

    connectEventEmitter(GameEventHandler){
      
      if(GameEventHandler){
        let _this = this;
        this.emitter = GameEventHandler;
        setTimeout(function(){
          _this.initGame();
        })
        return true;
      }else{
        console.log("No event emitter detected.")
        return false;
      }
    }

    /*
    * Game is ready and awaiting instructions.
    */
    ready(){
      
    }

    emit(name,data = false){
      if(this.emitter){
        this.emitter({name:name,data:data});
      }else{
        console.log("Error: Emitter disconnected for GameServer")
      }
     // this.emitter.emit('testEvent', 'hi'); // Was fired: hi

    }

    event(name,data = false){
      console.log("game-server", name)
      if(name == "ready to start"){

        this.emit("deal deck");
        let _this = this;
        setTimeout(function(){
          _this.emit("start");
        },2000);
      }


    }

    initGame(){
      
      this.emit("create game",{
        mode:this.mode
      });

      
    }

  
  }
  