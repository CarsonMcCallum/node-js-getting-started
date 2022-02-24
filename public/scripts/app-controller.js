var ModeOverview = new ModeOverviewManager();

class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static displayName = "Point";

    static distance(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
  
      return Math.hypot(dx, dy);
    }
  }

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));


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
  },
  "game-loading-screen":{
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

function setInitialPagePositions(){
  
  gsap.set('section[data-section="home"]', pageDetails["home"].hide);
  gsap.set('section[data-section="game-loading-screen"]', pageDetails["game-loading-screen"].hide);
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
         ModeOverview.openModeOverview(modeName);
      }

      if(actionId == "close_mode_overview"){
          ModeOverview.closeModeOverview();
      }

      if(actionId == "load_open_mode"){
          loadOpenGameMode();
      }

      if(actionId == "cancel_load_mode"){
          cancelLoadOpenGameMode();
      }

    
    }

});



function loadOpenGameMode(){

    ModeOverview.hideModeActions();
    ModeOverview.showCancelButton();

}

function cancelLoadOpenGameMode(){
    
    ModeOverview.hideCancelButton();
    ModeOverview.showModeActions();
}


