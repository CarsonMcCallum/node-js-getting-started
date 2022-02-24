
// https://github.com/mdn/js-examples/blob/master/modules/dynamic-module-imports/modules/canvas.js

function Game(server,parent,toggleMasterLoadingScreen) {


      this.mode = null;
      this.rules = null;
      this.players = null;
      this.server = server;
      this.toggleMasterLoadingScreen = toggleMasterLoadingScreen;
      this.parent = parent;
      this.gameModeActions = document.querySelector('.game-mode-actions');
      this.cancelActions = document.querySelector('.game-mode-cancel');
      this.me = this;
      this.test = 'test';



    this.ready = function () {
        this.server.ready();
    }


    parseEvent = function (event) {
        console.log('dog')
        try{
            if(event.name == "create game"){
                create();
            }
        }catch(e){

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




    create = function () {
        try{

        console.log('create')
        let gameBoard = document.createElement('div');
        gameBoard.classList.add("board","level-one");

        console.log('elem',this.parent)
       // parent.appendChild(gameBoard);


        let allSections = document.querySelectorAll('section');
        
        allSections.forEach(function(section){
            section.classList.add('hidden');
        });

        let loadingOverlay = document.querySelector('#master-loading-screen');
        loadingOverlay.classList.remove('hidden');

        let gameScreen = document.querySelector('#game');
        gameScreen.classList.remove('hidden');

        

        this.toggleMasterLoadingScreen(false)
        }catch(e){
            console.log(e)
        }
    }
  

    this.openModeOverview = function (modeName) {
            

      
    }


    var triangle = function({w,h,f,sw,sc}){
        let graphic = '<svg width="'+w+'" height="'+h+'">';
            graphic+='<rect width="'+w+'" height="'+h+'" style="fill:'+f+';stroke-width:'+sw+';stroke:'+sc+'" />';
            graphic+='</svg>';
        return graphic;
    }

    var card = function(_cardId, graphic = []){
        let _c = '<div id="card-'+_cardId+'" class="card show-front" data-s="1" data-c="1" data-f="0" data-n="0">';
            _c+=    '<div class="front">';
              


                    for(let i = 0; i < graphic.length;i++){
                        _c+= '<div class="graphic">';
                        _c += graphic[i];
                        _c+= '</div>';
                    }

              
            _c+=   '</div>';
            _c+=  '<div class="back"></div>';
            _c+= '</div>';
        return _c;
    }

    var cardId = 0;

        var cardStyles = {
            "S1C1F1N1":{
                w:60,
                h:25,
                f:'rgba(145,124,223,.3)',
                sw:4,
                sc:'rgb(145,124,223)'
            }
        }


    /* Test:
        let g = new Game();
        g.createCard();
    */

    this.createCard = function(){
        cardId++;
        let newCard = card(cardId,
                        [
                            triangle(cardStyles["S1C1F1N1"]),
                            triangle(
                                cardStyles["S1C1F1N1"]
                                ),
                            triangle(cardStyles["S1C1F1N1"])
                        ]
            )

        let boardBox = document.querySelectorAll(".box");
        console.log(cardId)
        boardBox[cardId].innerHTML = newCard;
        gsap.from('#card-' + cardId,{duration:.4,scale:1.4,opacity:0,ease:"back.out(1.7)"})

    }

  
    this.showModeActions = function () {
      if(this.gameModeActionsVisible == true) {
        console.log('Game mode actions already visible!');
        return;
      } else {
        console.log("Show game mode actions.")
        gsap.set(this.gameModeActions,{clearProps:"all"})
        gsap.from(this.gameModeActions,{
                opacity:0,
                delay:.3, 
                duration:.5,
                yPercent:100,
                ease:"back.out(1.7)"
            });
        this.gameModeActionsVisible = true;
      }
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
  