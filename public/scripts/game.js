
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
        parent.appendChild(gameBoard);


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
  