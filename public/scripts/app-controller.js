var ModeOverview = new ModeOverviewManager();
var $Game, gameServer,
overviewModeName;

/*
*   Section navigation.  
*/

var currentPage = "splash";

var pageDetails = {
    "splash":{
        show:{
            yPercent:0,
            xPercent:0,
         },
        hide:{
            yPercent:0,
            xPercent:-100
        }
    },
    "home":{
      show:{
          yPercent:0,
          xPercent:0,
       },
      hide:{
          yPercent:0,
          xPercent:100
      }
  }

}


var masterLoadingScreen = document.querySelector("#master-loading-screen"),
    gameElem = document.querySelector('#game');

function toggleMasterLoadingScreen(value = false, callback = false){

    let _dur = .3;


    if(value == true){
        console.log("Show masterLoadingScreen")
        masterLoadingScreen.classList.remove('hidden');
        gsap.set(masterLoadingScreen,{clearProps:"all"});
        gsap.set(masterLoadingScreen,{opacity:0});

        gsap.to(masterLoadingScreen,{
            duration:_dur,
            opacity:1,
            onComplete:callback
        }
        );
    }
    if(value == false){

        console.log("Hide masterLoadingScreen");

        gsap.to(masterLoadingScreen,{
            duration:_dur,
            opacity:0,
            onStart:function(){
                
            },
            onComplete:function(){
                masterLoadingScreen.classList.add('hidden');
                if(callback){
                    console.log("callback...")
                    callback();
                }
            }
        }
        );
    }


}


function setInitialPagePositions(){
  
  gsap.set('section[data-section="home"]', pageDetails["home"].hide);
  console.log('shit fuck',pageDetails["home"].hide.xPercent);
    
}

setInitialPagePositions();
console.log('hi')




function navigate(newSection){
console.log('navigate to',newSection);

let page_current = pageDetails[currentPage];
let next_page = pageDetails[newSection];

    let pageTL = new TimelineMax({});

    pageDetails[currentPage].hide.duration = .3;
    pageDetails[newSection].show.duration = .3;

    gsap.to('section[data-section="'+currentPage+'"]',pageDetails[currentPage].hide);
    gsap.to('section[data-section="'+newSection+'"]',pageDetails[newSection].show);

    currentPage = newSection;


    setEventListeners(newSection);

}

function setEventListeners(name){

    if(name == "splash"){

    }

}


// defined list of ids we want to track
const actionList = [
    'navigate_to_section',
    'expand_mode_overview',
    'close_mode_overview',
    'load_open_mode',
    'cancel_load_mode',
    'game_over_action'
    // ...
  ];
  

// Handle click events. 
document.addEventListener('touchstart', (event) => {
    //let trackId = false; 
    console.log('click',event.target.dataset.actionId)

    if(event.target.dataset.audioId){
        $audio.parseAudioId(event.target.dataset.audioId)
    }

    
    if(actionList.includes(event.target.dataset.actionId)){

      let actionId = event.target.dataset.actionId;
      console.log('actionList item clicked', actionId);
    
      // Navigate to section.
      if(actionId == "navigate_to_section"){
          let actionTarget =  event.target.dataset.actionTarget;
          navigate(actionTarget);
      }

      // Open mode overview. 
      if(actionId == "expand_mode_overview"){
         let modeName = event.target.dataset.modeName;
         overviewModeName = modeName;
         ModeOverview.openModeOverview(modeName);
      }

      if(actionId == "close_mode_overview"){
          ModeOverview.closeModeOverview();
          overviewModeName = false;
      }

      if(actionId == "load_open_mode"){
          loadOpenGameMode();
      }

      if(actionId == "cancel_load_mode"){
          cancelLoadOpenGameMode();
      }

      if(actionId == "game_over_action"){
        let target = event.target.dataset.target;

            if(target == "return_to_home"){
                returnToHomeScreen();
            }
               
      }


    }
});


var loadModeTimeout = false;

function loadOpenGameMode(){

    ModeOverview.hideModeActions();
    ModeOverview.showCancelButton();

    // Simulate establish connection.
    loadModeTimeout = setTimeout(function(){

        toggleMasterLoadingScreen(true,function(){
            //navigate("game");
            connectToServer();
           
        });

    },2000);

}

function cancelLoadOpenGameMode(){

    try{
        clearTimeout(loadModeTimeout);
        console.log('Canceled loadMoadTimeout')
    }catch(e){
        console.log(e)
    }
    
    ModeOverview.hideCancelButton();
    ModeOverview.showModeActions();
}


//connectToServer();

function connectToServer(){

    // Create server instance and send along game mode. 
    gameServer = new $GameServer();

    if(gameServer.connect("p1")){
        console.log("connected...");
        
        // Create local game instance, connect to server and gameElem container, and overlay.
        $Game = new Game($GameServer,gameElem,toggleMasterLoadingScreen);
      // gameServer.connectGame($Game));

        // Connect $Game and $Game event handler. 
        
        gameServer.connectEventEmitter($Game,$Game.eventHandler);

        
        
    }
    
}


function hideSections(sectionNamesAsArray){
    try{
        for(let i = 0; i < sectionNamesAsArray.length;i++){
            try{
            let _section = document.querySelector('section[data-section="'+sectionNamesAsArray[i]+'"]');
            _section.classList.add('hidden');
            }catch(e){
                console.log(e)
            }
        }
    }
    catch(e){
        console.log(e)
    }
}
function showSections(sectionNamesAsArray){
    try{
        for(let i = 0; i < sectionNamesAsArray.length;i++){
            try{
            let _section = document.querySelector('section[data-section="'+sectionNamesAsArray[i]+'"]');
            _section.classList.remove('hidden');
            }catch(e){
                console.log(e)
            }
        }
    }
    catch(e){
        console.log(e)
    }
}

function loadGameScreen(){
        let allSections = document.querySelectorAll('section');
        
        allSections.forEach(function(section){
            section.classList.add('hidden');
        });

        let loadingOverlay = document.querySelector('#master-loading-screen');
        loadingOverlay.classList.remove('hidden');

        let gameScreen = document.querySelector('#game');
        gameScreen.classList.remove('hidden');

}

function hideAllSecitonsExceptMasterLoading(){

    let allSections = document.querySelectorAll('section');
    allSections.forEach(function(section){
        section.classList.add('hidden');
    });

    let loadingOverlay = document.querySelector('#master-loading-screen');
    loadingOverlay.classList.remove('hidden');
}

function hideGameScreen(){


    hideAllSecitonsExceptMasterLoading();


    showSections(['home','mode-overview-screen','splash']);


}


function destroyGame(){
    console.log('destroyGame...')
    $Game.reset();
    $Game = null;
    gameServer = null;
}


function returnToHomeScreen(){

    toggleMasterLoadingScreen(true,function(){
        //navigate("game");
       // connectToServer();
       
       destroyGame();
       hideGameScreen();
       toggleMasterLoadingScreen(false);
       ModeOverview.hideCancelButton();
       ModeOverview.showModeActions();
        

    });
}