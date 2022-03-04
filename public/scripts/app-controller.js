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
    'cancel_load_mode'
    // ...
  ];
  

// Handle click events. 
document.addEventListener('click', (event) => {
    //let trackId = false; 
    console.log('click',event.target.dataset.actionId)
    
    if(actionList.includes(event.target.dataset.actionId)) {

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
    },1000);

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


connectToServer();

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

