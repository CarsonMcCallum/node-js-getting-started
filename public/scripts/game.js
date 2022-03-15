
// https://github.com/mdn/js-examples/blob/master/modules/dynamic-module-imports/modules/canvas.js

// Helpers.



var failText = [
    "stupid bitch",
    "dumbass",
    "dumb bitch",
    "ugly fuck",
    "fuck you",
    "you suck shit",
    "retarded",
    "get fucked",
    "kill yourself"
];

function Game(server,parent,toggleMasterLoadingScreen) {


      this.mode = null;
      this.rules = null;
      this.players = null;
      this.playerId = "p1"; 
      this.server = server;
      this.toggleMasterLoadingScreen = toggleMasterLoadingScreen;
      this.parent = parent;
      this.deck = [];
      this.activeCards = [];
      this.selects = [];
      this.playerOneScore = 0;
      this.allowPlayerInput = false;
      this.inputMode = "standby"; // Game input modes: standby->active->matching->disabled
      this.clockElem = null;
      const _this = this;
      this.clock = null;
      this.gameOverScreen = tools.getOne('#game-over-screen');

      //_game = this;
    
      // Helper funcitons.
      this.shuffleArray = arr => arr.sort(() => Math.random() - 0.5)



        this.ready = function () {
            _this.server.ready();
        }

        // Reset game.
        this.reset = function(){
            this.emptyBoard();
            this.hideTimer();
            this.mode = null;
            this.rules = null;
            this.players = null;
            this.playerId = "p1"; 
            this.server = server;
            this.toggleMasterLoadingScreen = toggleMasterLoadingScreen;
            this.parent = parent;
            this.deck = [];
            this.activeCards = [];
            this.selects = [];
            this.allowPlayerInput = false;
            this.inputMode = "standby"; // Game input modes: standby->active->matching->disabled
            this.clockElem = null;
            this.clock = null;
            this.gameOverScreen = tools.getOne('#game-over-screen');

            // Game over screen.
            gsap.set('.score-value',{text:'--'});
        }


    


    parseEvent = function (event) {

        if(event.name == "clock"){
            gsap.set('.time',{text:event.data.time});
            this.clock = event.data.time;
            return true;
        }

            console.log('parseEvent')


        if(event.name == "create board"){
            createBoard(event.data.boardLength,event.data.columns);
        }

        if(event.name == "deal deck"){
            console.log('game.js','deal deck')
            _this.createDeck();
            _this.shuffleArray(_this.deck);
            console.log(_this.deck)

            for(let i = 0; i <= 11; i++){
                let nextCard = _this.getNextCard();
                console.log('nextCard',nextCard)
                let card = _this.createCard(i, nextCard);
                _this.drawCard(card,i);
                }
        }

        if(event.name == "draw card"){
            console.log('game.js','start draw card ------')
            if("card" in event.data){
                //console.log('card exists,', event.data)
                let card = _this.createCard(event.data.index,event.data.card);
                //console.log(card);
                _this.activeCards[event.data.index] = card;
                _this.drawCard(card,event.data.index)
            }

                console.log('game.js','end draw card ------')
        }

            if(event.name == "start"){
               
                console.log("Start!");
                
                

                tools.removeClass('.time-box','hidden');
                gsap.set('.time-box',{scale:1,opacity:1});
                //gsap.from('.time-box',{duration:.4,scale:0,opacity:0})
                // Set all box widths so they dont change when cards move.
                _this.setBoxDimensions();

                _this.activeCards.forEach(function(card){
                   // _this.flipCard(card,"front");
                })

                let tl = new gsap.timeline();
                tl.add(function(){
                    _this.activeCards.forEach(function(card,i){
                        let speedIncrease = i * 50;

                        setTimeout(function(){
                           // _this.flipCard(card,"front")
                        }, speedIncrease)
                        
                    })
                });
                
                setTimeout(function(){
                    _this.shout("positive","Start!")
                    

                    $audio.sfx("start");
                    $audio.setMusic(0);

                    $audio.music({
                        type:"play",
                        fade:true,
                        duration:8000});

                       /* $gameMusic.play();
                        $gameMusic.fade(0,0.6,2000);
                       */

                },1000);

                setTimeout(function(){
                    _this.allowPlayerInput = true;
                    _this.inputMode = "enabled";
                    _this.initateListener();
                },1200);

                
            }

            
            if(event.name == "match"){
                console.log('match',event)
                console.log('player',event.data.pid);
                console.log('matching card indexes',event.data.indexes);
                _this.allowPlayerInput = false;

                    let selected = document.querySelectorAll('.card.selected');
                    selected.forEach(function(c){
                        c.classList.remove('selected');
                    })

                    setTimeout(function(){
                        _this.correctMatch(event.data.pid,event.data.indexes);
                    },200)
            }

            if(event.name == "incorrect"){
                setTimeout(_this.incorrectMatch,300)
                var textItem = failText[Math.floor(Math.random()*failText.length)];
               // setTimeout(_this.shout("negative",textItem),750)
            }

            if(event.name == "hint"){
                _this.cardHint(event.data.boardIndex)
            }

            if(event.name == "add row"){

                let board = tools.getOne('.board');
                let getY = tools.position(board,"top center");
                let fromY = getY.y;
               
                _this.addBoxes(event.data.rowBoxIndexes);
                _this.setBoxDimensions();
                
                gsap.from('.board',{y:46});
                $sfx_new_row.play();
                $effects.floatGraphic();
            }

            if(event.name == "no matches"){
                _this.shout("negative","Shuffle!");
                gsap.to('.card',{duration:1,scale:0,onComplete:function(){
                    let boxes = tools.getAll('.box');
                    boxes.forEach(function(box){
                        box.innerHTML = "";
                    })
                }});
            }

            if(event.name == "game over"){
               // _this.shout("negative","Game over!");
                _this.allowPlayerInput = false;
                _this.gameOver(event.data.finalScore);
               // setTimeout(_this.shout("positive",event.data.score),3000)
            }
    }


    this.eventHandler = function (event) {
        //console.log('eventHandler')
        try{
            //console.log(event);
            parseEvent(event)
        }catch(e){
            console.log(e)
        }
    }

    // Send messages to server, which relays them to logic.
    this.sendToServer = function(name,data){
        console.log('game.js sendToServer',data)
        _this.server.event({pid:this.playerId,name:name,data:data});
    }


    this.load = function(){
        console.log('load...');
        console.log(this.server)
        this.server.connectEventEmitter(this.eventHandler);
    }


    createBoard = function (_boardLength,_columns) {

        try{

        console.log('createBoard')
        let gameBoard = document.createElement('div');
        gameBoard.classList.add("board","level-one");

        //console.log('elem',this.parent)
        // parent.appendChild(gameBoard);

        loadGameScreen(); // app-controller.js
        
        this.clockElem = document.querySelector('.time');

        }catch(e){
            console.log(e)
        }

        // Clear inner html of board.
        _this.clearBoard();


        let initialBoardArray = [];

        for(let i = 0; i <= _boardLength; i++){
            initialBoardArray.push(i);
        }
       
        // Add starting board length.
        _this.addBoxes(initialBoardArray,_columns);

        // Set number of board grid columns.
        _this.setBoardGrid(_columns);

        _this.sendToServer("ready to start");
        
        this.toggleMasterLoadingScreen(false,function(){
            $audio.sfx("start intro");
        });
        
    }

    this.clearBoard = function(){
        let board = document.querySelector('.board');
        board.innerHTML = "";
    }

    this.addBoxes = function(indexArr){
        let board = document.querySelector('.board');

        for(let i = 0; i < indexArr.length; i++){
            let box = '<div class="box" data-box-index="'+indexArr[i]+'"></div>';
            box = tools.stringToHTML(box);
            board.appendChild(box);
        }

    
    }

    
    this.setBoxDimensions = function(){
        let box = tools.getOne('.box:nth-child(1)');
        gsap.set('.box',{width:box.clientWidth,height:box.clientHeight});
    }

    this.setBoardGrid = function(columns){  
        document.querySelector(".board").style.gridTemplateColumns = "repeat("+columns+", 1fr)";
    }

    this.showBoard = function(){
        this.toggleMasterLoadingScreen(false);
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
       // console.log('game.js','createCard...')
        let cardId = "card-" + String(shape) + String(color) + String(fill) + String(number);

        let _shape = shapeArr[shape],
             _graphicArr = [];
        
        /*
        console.log( $CardStyles[$CardTheme].shapes[shape].w,
            $CardStyles[$CardTheme].shapes[shape].h,
            $CardStyles[$CardTheme].shapes[shape].sw,
        // Color properties.
            $CardStyles[$CardTheme].colors[color].sc,
            $CardStyles[$CardTheme].colors[color].f[fill])
            */
        
            // One shape only
            for(let i = 0; i <= number; i++){//for(let i = 0; i <= number; i++){
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
        newCard = tools.stringToHTML(newCard); // Make string into node.
        

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
               _this.flipCard(_getCard,"front")
        }

        function sfx(){
            if(drawIncrement % 2 == 0) {
                //$sfx_card_slide.play();
            }
            //$sfx_card_slide.play();
        }
        // Animate.
        Flip.from(state, {
            // Optional properties related to HOW it's transitioned
            duration: 1,
            delay:drawQuene * drawIncrement,
            ease: "power4.out",
            onStart:sfx,
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

    this.flipCard = function(card,side = "front",speed = 1){

        gsap.set(".card", {
            transformStyle: "preserve-3d",
            transformPerspective: 10000,
            transformOrigin:"50% 50%"
          });
    
          
    let front = card.firstElementChild,
        back = card.lastElementChild,
        tl = gsap.timeline({}),
        flipTime = .2 * speed;


        
    tl.to(card,{
        duration:flipTime,
        rotationY:90,
        z:10
    });
    tl.add(function(){
        if(side == "front"){
             gsap.set(front,{visibility:"visible",overflow:"visible"});
             gsap.set(back,{visibility:"hidden"});
    
        }else{
            gsap.set(front,{visibility:"hidden"});
            gsap.set(back,{visibility:"visible"});
        }
        gsap.set(card,{rotationY:-90});
    });
    tl.to(card,{duration:flipTime,rotationY:0,scale:1,z:0});

    //var x = document.querySelector('.card');
    //flipCard(x,"front");

    
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

    this.correctMatch = function(pid, indexes){


        //$sfx_click.play();

       

        // Get cards and order them by 
        let matchesBoxIndex = 0;
        let delay = .3;

        $sfx_success.play();
        
        indexes.forEach(function(i,index){

        
           
            let correctCard = _this.activeCards[i];
            correctCard.classList.remove('selected');
            
            $effects.floatingPoints(20, correctCard,"top center");

            let tl = new gsap.timeline();
            gsap.set(correctCard,{clearProps:"all"})
            gsap.killTweensOf(correctCard);
          
            tl.fromTo(correctCard,
                {
                    duration:.3,
                    backgroundColor:"#81c784"
                },{
                    scale:1.1,
                    duration:.2,
                    background:"white",
                    //ease:"back.in(1.7)"
                }
            )
            //tl.to(correctCard,{duration:.5,scale:1.1})
        });

        setTimeout(function(){

            tools.removeClass(".shout","hidden");
            tools.removeClass(".matches-container","hidden");

            let matchCardRotations = [-20,0,20];
            indexes.forEach(function(i,index){

            let correctCard = _this.activeCards[i];
            gsap.killTweensOf(correctCard)
            //gsap.set(correctCard,{clearProps:"all"})
            let matchesBox = document.querySelector('.matches-box[data-index="'+index+'"]')
            const state = Flip.getState(correctCard);
            matchesBox.appendChild(correctCard);

            gsap.set(correctCard,{
                //backgroundColor:"white",
                scale:1.4,
                rotate:matchCardRotations[index]
            })
           
            // Animate.
            Flip.from(state, {
                    // Optional properties related to HOW it's transitioned
                    duration: .3,
                    scale:1,
                    ease: "expo.inOut"
                });
        });

        setTimeout(function(){
            //$sfx_success.play();
            _this.playerOneScore++;
            document.querySelector('.scoreboard-value[data-player="one"]').innerText = _this.playerOneScore;
        },100)

        let tl = new gsap.timeline();
        tl.from('.shout-background-matches',{opacity:0,duration:.5})
        tl.from('.shout-text',{duration:.5,delay:1,opacity:0,yPercent:20,ease:"back.out(1.7)"},"-=1");
        gsap.from('.beams',{duration:1,rotation:100,scale:.4,ease:"back.out(1.7)"})
      

        setTimeout(function(){
            _this.clearMatchedShout();
        },2000)
        
    }, delay * 1000)

            setTimeout(function(){
                _this.allowPlayerInput = true;
                _this.selects = [];
            },3000)
    }

    this.clearMatchedShout = function(){
        let matchesBoxes = tools.getAll('.matches-box');
        let tl = new gsap.timeline();

        gsap.to('.shout-background-matches',{opacity:0,duration:.5})
        gsap.to('.shout-text',{duration:.4,delay:0,opacity:0,yPercent:20,ease:"expo.in"})
        gsap.to(matchesBoxes,{duration:.5,scale:0,opacity:0,onComplete:function(){
            matchesBoxes.forEach(function(mb){
                mb.innerHTML = "";
            })
            tools.addClass('.shout','hidden');
            gsap.set('.shout-text',{clearProps:"all"});
            gsap.set('.shout-background-matches',{clearProps:"all"});
           
            gsap.set('.matches-box',{clearProps:"all"});
            _this.allowPlayerInput = true;
        }},"-=.4")
      
    }

    this.cardHint = function(cardIndex){
        // Wiggle params are set in index.ejs
        console.log('cardHint')
        let cards = document.querySelectorAll('.card');
        gsap.to(cards[cardIndex], {duration:2, rotation:20, ease:"Wiggle.uniform"})
    }

    this.selectCard = function(card){

        _this.selects.push(card);
        
        //$effects.floatingPoints(50, card,"top center");
        $audio.sfx('select card');
        

        if(_this.selects.length >= 3){
            _this.allowPlayerInput = false;

            // Wait for response from server.

            setTimeout(function(){//Wait half a second before proceeding
             },300);

            
         } else if(_this.selects.length<3) {
             
            //_this.selects.splice(_this.selects.indexOf(card),1);
           // $(this).removeClass("selected");
        }
        
       

       
        gsap.fromTo(card,
            {   
                duration:.1,
                scale:.9,
            },
            {   duration:.25,
                scale:1.06,
                ease:"elastic.out(1.5, 0.5)",
                backgroundColor:"#b3e5fc"
            }
        );
        card.classList.add('selected'); 


    }

    this.unselectCard = function(card){
        console.log('unselect');
        card.classList.remove('selected');
        _this.selects.splice(_this.selects.indexOf(card),1);
    }

    this.incorrectMatch = function(){
        _this.allowPlayerInput = false;
        $audio.sfx("incorrect");

        let sCards = tools.getAll('.card.selected');
        let sCardsTiles = tools.getAll('.card.selected .card-tile');

        $effects.incorrectEffect();

        sCards.forEach(function(c){
            c.classList.remove('selected');
        })

        gsap.from(sCardsTiles,.5,{
            backgroundColor:"#ff2323",
        });


        gsap.set(sCards,{backgroundColor:"#ff2323"})
        
        gsap.to(sCards,.5,{
            rotation:10,
            clearProps:"backgroundColor",
            ease:"Wiggle.uniform",
            onComplete:function(){
                _this.allowPlayerInput = true;
            }
        });

        _this.selects.forEach(function(elem){
            elem.classList.remove('selected');
            let tl = gsap.timeline();
            tl.to(elem,{
                duration:.3,
                rotation:0,
                scale:1,
                ease:"back.in(1.7)",
                backgroundColor:"#ececec"
            })
            gsap.set(elem,{clearProps:"background"});
            elem.dataset.selected = "false";
        });
        _this.selects.splice(0);

        let cards = tools.getAll('.cards');
        cards.forEach(function(c){
            tools.removeClass(c,'selected');
            gsap.set(c,{clearProps:"all"})
        });

        gsap.set('.card',{clearProps:"all"});
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
        game.addEventListener('touchstart', (event) => {
            //let trackId = false; 
            console.log('game iput',event.target)
            console.log('click',event.target.dataset)
            
            if(playerActionList.includes(event.target.dataset.playerActionId)) {

                let playerActionId = event.target.dataset.playerActionId;
                console.log('platerActionList item clicked', playerActionId);
                
            
                if(playerActionId == "touch_card"){
                    
                    console.log('touch_card...',event.target.dataset.index)
                    //let actionTarget =  event.target.dataset.actionTarget;
                    //navigate(actionTarget);
                    if(_this.allowPlayerInput){
                        if(event.target.dataset.selected == "false"){
                            event.target.dataset.selected = "true";
                            _this.selectCard(event.target);
                            _this.sendToServer("touch_card",{action:"select",boardIndex:event.target.dataset.index});
                          
                        }else{
                            event.target.dataset.selected = "false";
                            _this.unselectCard(event.target);
                            _this.sendToServer("touch_card",{action:"unselect",boardIndex:event.target.dataset.index});
                        }
                    }
                   // alert('touch card');
                }

                

            }

        });

    }

    this.shout = function(name,text){
        let tl = new gsap.timeline();
       gsap.set('.shout-effect-text',{text:text});
        tools.removeClass('.shout-effect','hidden');

        if(name == "positive"){

            gsap.set('.shout-effect-background',{background:"linear-gradient(120deg, #44b5ff, #03a9f4)"})
           
        }
        if(name == "negative"){
            gsap.set('.shout-effect-background',{background:"linear-gradient(120deg, #e91e63, #e91e63)"})
        }

        tl.from('.shout-effect-background',{duration:.5,top:"46%",height:0,ease:"bounce.out(1.7)"});
        tl.from('.shout-effect-text',{duration:.5,scale:0,ease:"expo.out",ease:"expo.out(1.7)"},"-=.2");
        tl.to('.shout-effect-background',{duration:.5,top:"46%",height:0,ease:"expo.in(1.7)"});
        tl.to('.shout-effect-text',{duration:.3,scale:0,ease:"expo.in(1.7)"},"-=.3");
        tl.add(function(){
            tools.addClass('.shout-effect','hidden');
            gsap.set('.shout-effect-text',{clearProps:"all"})
            gsap.set('.shout-effect-background',{clearProps:"all"})
        })
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


    this.gameOver = function(finalScore){
        this.allowPlayerInput = false;
        _this.gameOverScreen.classList.remove('hidden');

        $audio.music({type:"pause",
        fade:true,
        endVolume:0,
        duration:1000
        });

        $audio.sfx("finish");

        let tl = gsap.timeline({});

        tl.from(_this.gameOverScreen,{
            duration:.3,
            opacity:0
        });
        tl.from('#game-over-screen-title',{
            duration:.5,
            delay:.75,
            y:300,
            scale:2,
            ease:"expo.out(1.5)"
        });
        tl.from('.score',{duration:.5,opacity:0});
        tl.to('#game-over-screen-title',{text:"Results:"});
        /*
        tl.to('#game-matches-found', {duration: 1, scrambleText:{
            text:String(finalScore.matchesFound), 
            chars:"0123456789", 
            revealDelay:0, 
            speed:0.7,
            newClass:"orange"}
        });

        tl.to('#game-final-points', {duration: 1, scrambleText:{
            text:String(finalScore.points), 
            chars:"0123456789", 
            revealDelay:0, 
            speed:0.7, 
            newClass:"blue"}
        });
        */
       //gsap.set('#game-matches-found',{text:finalScore.matchesFound})

      // gsap.set('#game-final-points',{text:finalScore.points})

   
       //tl.pause();
       function showFinalMatches(){
            $effects.countUp('#game-matches-found',{text:finalScore.matchesFound});
       }
       function showFinalPoints(){
             $audio.sfx("count up");
             $effects.countUp('#game-final-points',{duration:3000,text:finalScore.points});
       }
       tl.add(gsap.delayedCall(0,showFinalMatches));
       tl.add(gsap.delayedCall(2,showFinalPoints))

       /*
       gsap.delayedCall(3,function(){
           $effects.countUp('#game-matches-found',{text:finalScore.matchesFound});
       });
       gsap.delayedCall(6,function(){
           $effects.countUp('#game-final-points',{text:finalScore.points});
       })
       */

       tl.from('#gos-button',{
            delay:2,
            duration:.5,
            y:300,
            ease:"back.out(1.7)"
        });


    }


    this.emptyBoard = function(){
        let board = document.querySelector('.board');
        board.innerHTML = "";
    }

    this.hideTimer = function(){
        tools.addClass('.time-box','hidden');
    }   

   
    



    
  }
  