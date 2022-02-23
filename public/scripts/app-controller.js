
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
         openModeOverview(modeName)
      }

      if(actionId == "close_mode_overview"){
          closeModeOverview();
      }

      if(actionId == "load_open_mode"){
          loadOpenGameMode();
      }

    
    }

});


function openModeOverview(modeName){

    let modeOverviewSection = document.querySelector('#mode-overview-screen');
    let modeOverviewContainer = document.querySelector('.mode-overview-container');

    let modePane = document.querySelector('.game-mode[data-mode-name="'+modeName+'"]');

    let modeActions = document.querySelector('.game-mode-actions');

    const state = Flip.getState(modePane);

    // Show mode overview section.
    modeOverviewSection.classList.remove("hidden");

    // Append mode pane.
    modeOverviewContainer.appendChild(modePane);

    // Animate.
    Flip.from(state, {
        // Optional properties related to HOW it's transitioned
        duration: 1,
        ease: "power4.out"
    });

    gsap.to('.mode-overview-container .game-mode .title',{scale:2});

    gsap.set(modeActions,{clearProps:"all"})
    gsap.from(modeActions,{
            opacity:0,
            delay:.3, 
            duration:.5,
            yPercent:100,
            ease:"back.out(1.7)"
        });

}

function closeModeOverview(){

    let modeOverviewSection = document.querySelector('#mode-overview-screen');
    let gameModeContainer = document.querySelector('.game-mode-container');

    let modePane = document.querySelector('#mode-overview-screen .game-mode');

    let modeActions = document.querySelector('.game-mode-actions');

    const state = Flip.getState(modePane);

    // Show mode overview section.
    //modeOverviewSection.classList.remove("hidden");

    // Append mode pane.
    gameModeContainer.appendChild(modePane);

    // Animate.
    Flip.from(state, {
        // Optional properties related to HOW it's transitioned
        duration: 0.5,
        ease: "power4.out",
        onComlpete:function(){
            modeOverviewSection.classList.add("hidden");
        }
    });

    gsap.to('.game-mode .title',{duration: 0.5,scale:1});

    gsap.to(modeActions,{
            opacity:0,
            duration:.3,
            yPercent:100,
            ease:"back.out(1.7)"
    });
}



function loadOpenGameMode(){

    let modePane = document.querySelector('#mode-overview-screen .game-mode');

    let cancelActions = document.querySelector('#mode-overview-screen .game-mode .loading-cancel-actions');

    gsap.to('.game-mode-actions',{
        opacity:0,
        duration:.3,
        yPercent:100,
        ease:"back.out(1.7)"
    });

    cancelActions.classList.remove('hidden');
    gsap.from(cancelActions,{duration:.5,scale:0})

    

}


