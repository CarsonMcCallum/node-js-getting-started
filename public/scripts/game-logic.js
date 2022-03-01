
// https://github.com/mdn/js-examples/blob/master/modules/dynamic-module-imports/modules/canvas.js
function $GameLogic() {


      this.mode = null;
      this.gameVars = {
        boardLength:null,
        gameLength:120,
        hints:{
          allowed:true,
          interval:15, // Show hint every X seconds.
          max:9
        }
      };
      this.players = null;
      this.server = null;
      this.serverEvent = null;
      this.deck = [];
      this.score = 0;
      this.activeCards = [];
      this.usedCards = [];
      this.selects = [];
      this.clock = null;
      this.timeSinceLastMatch = 0;
      this.hintIndex = 0; // Progressively hint cards.
      this.hintsGiven = 0;
      this.timeSinceLastHint = 0;
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

 
      //console.log(_this.clock);

      _this.timeSinceLastMatch++;

      // Check hints. 
      _this.updateHints();
      


     
      // Update time.
      if(_this.clock > 0){
        _this.clock--;
        let minutes = Math.floor(_this.clock / 60);
        let seconds = _this.clock - minutes * 60;
        let addZero = "";
        if(seconds < 10){
          addZero = "0";
        }
        let mmss = minutes + ":" + addZero + seconds;
        _this.sendEvent("clock",{time:mmss})
      }

      if(_this.clock <= 0){
        clearInterval(_this.gameInterval);
        _this.sendEvent("clock", {time:"Final score: " + _this.score})
      }

      
    }


    this.updateHints = function(){
      if(_this.gameVars.hints.allowed){
        console.log('hints allowed')
        if(_this.timeSinceLastHint >= _this.gameVars.hints.interval){
          if(_this.hintsGiven < _this.gameVars.hints.max){
            console.log('show hint')
            _this.timeSinceLastHint = 0;
            _this.hint();
            _this.hintsGiven++;
          }else{
            console.log('no more hints allowed!')
            _this.gameVars.hints.allowed = false; // Turn off for logging.
          }
        }
        _this.timeSinceLastHint++;
        //console.log('timeSinceLastHint',_this.timeSinceLastHint)
        //console.log('_this.gameVars.hints.interval',_this.gameVars.hints.interval);
      }
    }

    /*
    *   Modular game functions below.
    *
    */


    this.drawCards = function(){
        console.log('drawCards...')

        var cardsForBoard = [];

        for(let i = 0; i <= this.gameVars.boardLength ; i++){
            let nextCard = _this.getNextCard();
            console.log('nextCard',nextCard)
            let card = _this.createCard(i, nextCard);
            //_this.drawCard(card,i);
           // cardsForBoard.push(card)
            this.activeCards.push(nextCard);
            this.sendEvent("draw card",{card:nextCard,index:i})
        }


        setTimeout(function(){
            _this.sendEvent("start");
            _this.setGameInterval(true,_this.gameVars.gameLength);
            _this.checkIfBoardHasMatch();
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

    this.drawNextCards = function(indexes){
      console.log('this.drawNextCards...',indexes)

      for(let i = 0; i < 3;i++){

          let nextCard = _this.getNextCard();
          console.log('nextCard',nextCard)
          let card = _this.createCard(i, nextCard);
          //_this.drawCard(card,i);
         // cardsForBoard.push(card)
          this.activeCards[indexes[i]] = nextCard;
          this.sendEvent("draw card",{card:nextCard,index:indexes[i]})

      }
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

  

    this.checkIfMatch = function(cards){

        var Match = true;
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
            Match = false;
          }
        }
        return Match;
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
            var isValid = _this.checkIfMatch(_this.selects[playerSelectsIndex]);

                if(isValid){
                  console.log('logic isValid Match!')
                  _this.timeSinceLastHint = 0;

                  _this.score++;

                  _this.clock+= 30; // Add 30 seconds.

                    //Message correct!
                    //alert('u did it!')
                    //replaceCards(selects);
                    //resetVars();

                    let matchedCardsIndexes = [];
                    _this.selects[playerSelectsIndex].forEach(function(_c,index){
                      let _cardIndex = _this.activeCards.indexOf(_c);
                      console.log('_cardIndex',_cardIndex)
                      matchedCardsIndexes.push(_cardIndex);
                    });

                    _this.sendEvent("match", {pid:pid,indexes:matchedCardsIndexes});

                    setTimeout(function(){
                      _this.drawNextCards(matchedCardsIndexes);
                    },3000);

                    //_this.sendEvent(pid,)

                    _this.selects[playerSelectsIndex].splice(0);
                  
                } else {
                //Message error!
                    console.log('logic - No Match!'); 
                   _this.selects[playerSelectsIndex].splice(0);
                   _this.sendEvent("incorrect",{pid:pid});
                }

            
         }else if(_this.selects.length<3) {
            //_this.selects.splice(_this.selects.indexOf(card),1);
           // $(this).removeClass("selected");
        }

    }


    this.checkIfBoardHasMatch = function(){
      let matchExists = this.findMatches();
    
      if(matchExists.length > 0){
        console.log('match exists', matchExists.length)
      }else{
        _this.sendEvent("no matches exist")

      }
    }


    this.findMatches = function(){
      let counter = 0;
      let MatchesFound = [];
      var cards = _this.activeCards;

      for(var x = 0; x < cards.length; x++){
        for(var y = 1; y < cards.length; y++){
          for(var z = 2; z < cards.length; z++){
            if(cards[x]!==cards[y]&&
            _this.checkIfMatch([cards[x],cards[y],cards[z]])){
              MatchesFound.push([cards[x],cards[y],cards[z]]);
            }
          }
        }
      }
      return MatchesFound;
    }

 this.hint = function(){
  var Matches = this.findMatches();
  if(Matches.length>0){
    //find the next card from a random Match and highlight it
    var currentMatch = currentMatch||Matches[Math.floor(Math.random())*Matches.length];
    //$(currentMatch[0]).addClass("highlight");
    console.log('Matches found', currentMatch.length)
    console.log('hint',_this.activeCards.indexOf(currentMatch[0]))
    console.log('hint',_this.activeCards.indexOf(currentMatch[1]))
    console.log('hint',_this.activeCards.indexOf(currentMatch[2]))
  

    
    let _cardIndex = _this.activeCards.indexOf(currentMatch[this.hintIndex]);
    console.log('_cardIndex',_cardIndex);
    _this.sendEvent("hint",{boardIndex:_cardIndex});
    this.hintIndex++;
    if(this.hintIndex > 2){
      this.hintIndex = 0; // Reset hintIndex.
    }

    //hintCounter++;
  } else {
    console.log('no Matches found')
    //$("#add").addClass("highlight");
  }
}

    
  }
  