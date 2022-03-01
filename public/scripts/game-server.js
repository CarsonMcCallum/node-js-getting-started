
// https://github.com/mdn/js-examples/blob/master/modules/dynamic-module-imports/modules/canvas.js
var c = 0;
function $GameServer (){
  c++;
  console.log('gameServer instance count', c);

      this.emitter = null;
      this.user = null;
      this.mode = null;
      this.players = [];
      this.logic = null;
      this.logicEventEmitter = null;
      const _gameServer = this;
    

    this.connect = function(_playerId){
      if(!this.players.includes[_playerId]){
        this.players.push(_playerId);
      }else{
        console.log('player already connected to server');

      }
      console.log('players',this.players)
      return true;
    }

    this.initGameLogic = function(){
     
    }



    /*
    * Game is ready and awaiting instructions.
    */
    this.ready = function(){
      
    }

    this.emit = function(name,data = false){
      if(_gameServer.emitter){
        //console.log('game-server emit:', {name, data});
        _gameServer.emitter({name:name,data:data});
      }else{
        console.log("Error: Emitter disconnected for GameServer")
        console.log('error: game-server did not emit:', {name, data});
      }
     // this.emitter.emit('testEvent', 'hi'); // Was fired: hi

    }

    this.event = function(event){

      console.log("game-server", event);

      if(event.name == "ready to start"){
       
       // this.emit("deal deck");
      }

      if(event.name == "touch_card"){
        this.logic.eventHandler(event)
      }
    }


    this.gameLogicEvent = function(_name,_data = false){
      console.log("gameLogicEvent",_name,_data);
      _gameServer.emit(_name,_data);
      
    }

    this.initGame = function(){

      //_this.logic = new $GameLogic(this,"practice",["p1"]);

      console.log('ayo')

      
      _gameServer.emit("create game",{
        mode:this.mode
      });
      

      this.logic = new $GameLogic();
      this.logic.init(this,"practice", this.players);


      this.logic.setGameVariables();
      this.logic.createGame();

     // this.emit.emit('testEvent', 'hi'); // Was fired: hi
     // this.gameLogicEvent('test');
      //this.logic.test();
      
    }
    


    this.connectEventEmitter = function(_game,GameEventHandler){

      //var _init = this.initGame();
      _game.server = this;
      console.log('connectEventEmitter...')
      this.emitter = GameEventHandler;

      if(GameEventHandler){
        this.emitter = GameEventHandler;
        console.log('sdfsd')
        this.initGame();
        return true;
      }else{
        console.log("No event emitter detected.")
        return false;
      }
    }

  
  }
  