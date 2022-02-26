
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
      this.selects = [];
      this.allowPlayerInput = false;
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
                    let card = _this.createCard(i, nextCard);
                    _this.drawCard(card,i);
                 }
            }

            if(event.name == "start"){
                console.log("Start!");
                _this.allowPlayerInput = true;
                _this.initateListener();
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

    this.createCard = function(index, {shape,color,fill,number}){
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

        

        let newCard = $Card(index, cardId,shape,color,fill,number,_graphicArr);
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

  

    this.checkIfSET = function(cards){
        var SET = true;
        var data = {
          s: [],
          c: [],
          f: [],
          n: [],
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
            s:cards[i].dataset.s,
            c:cards[i].dataset.c,
            f:cards[i].dataset.f,
            n:cards[i].dataset.n,
          }
          for(var cardData in _cardData){
            data[cardData].push(cards[i].dataset[cardData]);
          }
        }
        for(var array in data){
          if(!checkIfSameOrDifferent(data[array])){
            SET = false;
          }
        }
        return SET;
      }

    this.selectCard = function(card){

        _this.selects.push(card);

        if(_this.selects.length >= 3){
            _this.allowPlayerInput = false;
            var isValid = _this.checkIfSET(_this.selects);

            setTimeout(function(){//Wait half a second before proceeding

                if(isValid){
                    //Message correct!
                    //alert('u did it!')
                    //replaceCards(selects);
                    //resetVars();
                    let selectedCards = document.querySelectorAll('.card.selected');

                    selectedCards.forEach(function(elem){
                    let _boardIndex = elem.dataset.index;
                    gsap.to(elem,.3,{
                        background:"#5FF7A8",
                        scale:1.1,
                        onComplete:function(){
                            _this.allowPlayerInput = true;
                        }
                    });
                    gsap.to(elem,.5,{
                        scale:1.5,
                        opacity:0,
                        delay:.5,
                        ease:"back.out(1.7)",
                        onComplete:function(){
                            elem.remove();
                            let x = _this.getNextCard();
                            _this.drawCard($Game.createCard(_boardIndex,x),_boardIndex);
                           
                        }
                    });
                    
                   
                  
                    });

                    setTimeout(function(){
                        _this.allowPlayerInput = true;
                        _this.selects = [];
                    },3000)
                
                } else {
                //Message error!
                    console.log('No set!');
                    let selectedCards = document.querySelectorAll('.card.selected');

                    
                    gsap.from('.card.selected',.5,{
                        rotation:10,
                        background:"red",
                        ease:"back.out(1.7)",
                        onComplete:function(){
                            _this.allowPlayerInput = true;
                        }
                    });
                    
                    selectedCards.forEach(function(elem){
                        elem.classList.remove('selected');
                    });
                }
               
                _this.selects.splice(0);
            },300);

            
         } else if(_this.selects.length<3) {
            //_this.selects.splice(_this.selects.indexOf(card),1);
           // $(this).removeClass("selected");
        }
        
        let cardValues = {
            shape:card.dataset.s,
            color:card.dataset.c,
            fill:card.dataset.f,
            number:card.dataset.n
        };




        card.classList.add('selected');
        gsap.from(card,
            {
           scale:.9,
           ease:"back.out(1.7)"
            }
        );
    }

    this.initateListener = function(){
        let game = document.getElementById('game');

        const playerActionList = [
            'touch_card',
            'expand_mode_overview',
            'close_mode_overview',
            'load_open_mode',
            'cancel_load_mode'
            // ...
          ];


        // Handle click events. 
        game.addEventListener('click', (event) => {
            //let trackId = false; 
            console.log('click',event.target)
            console.log('click',event.target.dataset)
            
            if(playerActionList.includes(event.target.dataset.playerActionId)) {

                let playerActionId = event.target.dataset.playerActionId;
                console.log('platerActionList item clicked', playerActionId);
                
            
                if(playerActionId == "touch_card"){
                    console.log('touch_card...')
                    //let actionTarget =  event.target.dataset.actionTarget;
                    //navigate(actionTarget);
                    if(_this.allowPlayerInput){
                        if(event.target.dataset.selected == "false"){
                           _this.selectCard(event.target);
                           console.log('click card')
                           
                        }
                    }
                   // alert('touch card');
                }

            }

        });

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
  