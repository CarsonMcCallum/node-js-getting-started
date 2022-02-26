
// https://github.com/mdn/js-examples/blob/master/modules/dynamic-module-imports/modules/canvas.js

// Helpers.
var $stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body.firstChild;
};

function Game(server,parent,toggleMasterLoadingScreen) {


      this.mode = null;
      this.rules = null;
      this.players = null;
      this.server = server;
      this.toggleMasterLoadingScreen = toggleMasterLoadingScreen;
      this.parent = parent;
      this.deck = [];
      _this = this;
      
      // Helper funcitons.
      this.shuffleArray = arr => arr.sort(() => Math.random() - 0.5)



    this.ready = function () {
        _this.server.ready();
    }


    parseEvent = function (event) {
        console.log('parseEvent')


            if(event.name == "create game"){
                create();
            }

            if(event.name == "deal deck"){
                _this.createDeck();
                _this.shuffleArray(_this.deck);
               for(let i = 0; i <= 11; i++){
                    let nextCard = _this.getNextCard();
                    let card = _this.createCard(nextCard);
                    _this.drawCard(card,i);
                 }
            }
    }


    this.eventHandler = function (event) {
        console.log('eventHandler')

        try{
            console.log(event);
            parseEvent(event)
        }catch(e){
            console.log(e)
        }
    }


    this.sendToServer = function(data){
        _this.server.event(data);
    }



    create = function () {

        try{

        console.log('create')
        let gameBoard = document.createElement('div');
        gameBoard.classList.add("board","level-one");

        //console.log('elem',this.parent)
       // parent.appendChild(gameBoard);


        let allSections = document.querySelectorAll('section');
        
        allSections.forEach(function(section){
            section.classList.add('hidden');
        });

        let loadingOverlay = document.querySelector('#master-loading-screen');
        loadingOverlay.classList.remove('hidden');

        let gameScreen = document.querySelector('#game');
        gameScreen.classList.remove('hidden');

    
        this.toggleMasterLoadingScreen(false);

        }catch(e){
            console.log(e)
        }

        _this.sendToServer("ready to start");
        

        
    }
  

    this.openModeOverview = function (modeName) {
            

      
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

    this.createCard = function({shape,color,fill,number}){
        let cardId = "card-" + String(shape) + String(color) + String(fill) + String(number);

        let _shape = shapeArr[shape],
             _graphicArr = [];
        
        console.log( $CardStyles[$CardTheme].shapes[shape].w,
            $CardStyles[$CardTheme].shapes[shape].h,
            $CardStyles[$CardTheme].shapes[shape].sw,
        // Color properties.
            $CardStyles[$CardTheme].colors[color].sc,
            $CardStyles[$CardTheme].colors[color].f[fill])
        
        for(let i = 0; i <= number; i++){
                    // Shape paramaters: w,h,sw,f,sc
                    _graphicArr.push(
                        _shape(
                            // Shape properties.
                                $CardStyles[$CardTheme].shapes[shape].w,
                                $CardStyles[$CardTheme].shapes[shape].h,
                                $CardStyles[$CardTheme].shapes[shape].sw,
                            // Color properties.
                                $CardStyles[$CardTheme].colors[color].sc,
                                $CardStyles[$CardTheme].colors[color].f[fill],
                            )
                    )
        }

        

        let newCard = $Card(cardId,shape,color,fill,number,_graphicArr);
        newCard = $stringToHTML(newCard); // Make string into node.
        

        return newCard;

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
        

        // Append to deck holder.
        let deckHolder = document.querySelector('.deck-holder');
        deckHolder.appendChild(cardHTML);

        // Get newly appended card.
        let _getCard = document.getElementById(cardHTML.id);

        console.log('cardHTML.id',cardHTML.id)
        console.log(_getCard)

        // Get state for flip draw effect.
        const state = Flip.getState(_getCard);
        

        // Animate in.
        let boardBox = document.querySelector('.box[data-box-index="'+boardIndex+'"]');
        boardBox.appendChild(_getCard);

        function drecreaseDrawQuene(){
   
                if(drawQuene > 0){
                    drawQuene--;
                }
               
        }
        // Animate.
        Flip.from(state, {
            // Optional properties related to HOW it's transitioned
            duration: 1,
            delay:drawQuene * drawIncrement,
            ease: "power4.out",
            onComplete:drecreaseDrawQuene
        });

        drawQuene++;
        console.log('draw card...')
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


    this.createReportList = function () {
      if(this.activeMode !== null) {
        console.log('Report list already created!');
        return;
      } else {

        /*
        let list = document.createElement('ul');
        list.id = this.id + '-reporter';
        */
  
        let canvasWrapper = document.getElementById(this.id);
        canvasWrapper.appendChild(list);
  
      }
    }
  }
  