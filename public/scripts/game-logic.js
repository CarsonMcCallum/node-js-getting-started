
// https://github.com/mdn/js-examples/blob/master/modules/dynamic-module-imports/modules/canvas.js

// Helpers.
function $GameLogic() {


      this.mode = null;
      this.gameVars = {
        boardLength:null,
        gameLength:120
      };
      this.players = null;
      this.server = null;
      this.serverEvent = null;
      this.deck = [];
      this.activeCards = [];
      this.usedCards = [];
      this.selects = [];
      this.clock = null;
      this.allowPlayerInput = false;
      const _this = this;

      this.gameInterval = null;
      

      // Helper funcitons.
      this.shuffleArray = arr => arr.sort(() => Math.random() - 0.5)



    this.init = function(_server,_mode,_players) {
          console.log("server $GameLogic init!")
            this.server = _server;
            this.mode = _mode;
            this.players = _players;

            _players.forEach(function(){
              _this.selects.push([]);
            });

            this.sendEvent = _server.gameLogicEvent; 
            this.sendEvent("connected logic to server...");

    }   


    this.setGameVariables = function(){
        console.log('game-logic','setGameVariables');

        if(this.mode == "practice"){
            // Insert practice mode variables here.
            this.gameVars.boardLength = 11; // 12 cards.
            console.log('set practice game vars here...')
        }
    }

    this.createGame = function(){
        console.log('game-logic','createGame')
        _this.createDeck();
        _this.shuffleArray(_this.deck);
        console.log('deck',this.deck);

        //this.sendEvent("create board");

        this.startGame();
    }

    this.startGame = function(){
        this.sendEvent("create board")
        this.drawCards();
    }


    this.setGameInterval = function(onOrOff,time = false){
      console.log('time',time)
      if(onOrOff){
        this.clock = time;
        this.gameInterval = setInterval(_this.update,1000);
      }
    }

    this.update = function(){
     // console.log('update logic...')

      _this.clock--;
      //console.log(_this.clock)

      if(this.clock != 0){
        let minutes = Math.floor(_this.clock / 60);
        let seconds = _this.clock - minutes * 60;
        let mmss = minutes + ":" + seconds;
        _this.sendEvent("clock",{time:mmss})
      }
      
    }

    /*
    *   Modular game functions below.
    *
    */


    this.drawCards = function(){
        console.log('drawCards...')
       // this.sendEvent("deal deck")
      
        
        for(let i = 0; i <= this.gameVars.boardLength ; i++){
            let nextCard = _this.getNextCard();
            console.log('nextCard',nextCard)
            let card = _this.createCard(i, nextCard);
            //_this.drawCard(card,i);
            this.activeCards.push(nextCard);
            this.sendEvent("draw card",{card:nextCard,index:i})
        }


        setTimeout(function(){
            _this.sendEvent("start");
            _this.setGameInterval(true,_this.gameVars.gameLength);
        },2000)
        
    }
    


    parsePlayerEvent = function (event) {
        console.log('parsePlayerEvent',event.pid, event);

            if(event.name == "touch_card"){
                    console.log('touch_card')
                    console.log(_this.players);
                    console.log(event.data.boardIndex);
                    _this.selectCard(event.pid, event.data.boardIndex);
            }

            if(event.name == "deal deck"){
                
            }
    }


    this.eventHandler = function (event) {
        console.log('eventHandler')
        try{
            console.log(event);
            parsePlayerEvent(event)
        }catch(e){
            console.log(e)
        }
    }



    
    /* Test:
        let g = new Game();
        g.createCard();
    */  

        /**
         * Convert a template string into HTML DOM nodes
         * @param  {String} str The template string
         * @return {Node}       The template HTML
         */



    var shapeArr = [
        $Rectangle,
        $Circle,
        $Chevron
    ];

    this.createCard = function(index, {shape,color,fill,number}){
      

    }
    
    /*
    this.cardObject = function(cardHTML,boardIndex,drawDelay){
        return{
            cardHTML:cardHTML,
            boardIndex:boardIndex,
            drawDelay:drawDelay
        }
    }
    */

    var drawQuene = 0,
        drawIncrement = .1;

    this.drawCard = function(cardHTML, boardIndex = 0){
        

    }


    this.getNextCard = function(){
        var card = this.deck[0];
        this.deck.splice(0,1);
        return card;
    }

  
    this.createDeck = function () {

           let _deck = this.deck;

           this.deck.splice(0);//empty deck
           [0, 1, 2].forEach(function(number){
            [0,1,2].forEach(function(color){
              [0,1,2].forEach(function(shape){
                [0,1,2].forEach(function(fill){
                    _deck.push({
                    number: number,
                    shape: shape,
                    color: color,
                    fill: fill
                  });
                });
              });
            });
          });     
        return _deck;
    }

  

    this.checkIfSET = function(cards){

        var SET = true;
        var data = {
          shape: [],
          color: [],
          fill: [],
          number: [],
        };

        function checkIfSameOrDifferent(array){
            //   Not the best way but this will do for now...
              var same = true, different = true;
              if(array[0]===array[1]){
                different = false;
              } else {
                same = false;
              }
              if(array[1]===array[2]){
                different = false;
              } else {
                same = false;
              }
              if(array[0]===array[2]){
                different = false;
              } else {
                same = false;
              }
              
              return same||different;
            }
            

        for(var i = 0; i<cards.length;i++){
          let _cardData = {
            shape:cards[i].shape,
            color:cards[i].color,
            fill:cards[i].fill,
            number:cards[i].number,
          }
          for(var cardData in _cardData){
            data[cardData].push(cards[i][cardData]);
          }
        }
        for(var array in data){
          if(!checkIfSameOrDifferent(data[array])){
            SET = false;
          }
        }
        return SET;
      }

    this.selectCard = function(pid,boardIndex){ 

        let playerSelectsIndex = this.players.indexOf(pid);

        let card = this.activeCards[boardIndex];

        console.log('card',card);

        _this.selects[playerSelectsIndex].push(card);

        if(_this.selects[playerSelectsIndex].length >= 3){
            console.log('logic says check');
            console.log(_this.selects[playerSelectsIndex])
            //_this.allowPlayerInput = false;
            var isValid = _this.checkIfSET(_this.selects[playerSelectsIndex]);

                if(isValid){
                  console.log('logic isValid set!')
                    //Message correct!
                    //alert('u did it!')
                    //replaceCards(selects);
                    //resetVars();
                    _this.selects[playerSelectsIndex].forEach(function(_c,index){
                      let _cardIndex = _this.activeCards.indexOf(_c);
                      console.log('_cardIndex',_cardIndex)
                    })
                    //_this.sendEvent(pid,)
                  
                } else {
                //Message error!
                    console.log('logic - No set!'); 
                   _this.selects[playerSelectsIndex].splice(0);
                }

            
         }else if(_this.selects.length<3) {
            //_this.selects.splice(_this.selects.indexOf(card),1);
           // $(this).removeClass("selected");
        }
        
  

    }



    
  }
  