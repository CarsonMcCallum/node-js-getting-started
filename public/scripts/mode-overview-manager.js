
// https://github.com/mdn/js-examples/blob/master/modules/dynamic-module-imports/modules/canvas.js
class ModeOverviewManager {
    constructor() {
      this.activeMode = null;
      this.gameModeActionsVisible = false;
      this.gameModeActions = document.querySelectorAll('.game-mode-actions');
      this.cancelActions = document.querySelector('.game-mode-cancel');
     
    }
  

    openModeOverview(modeName){
            
            console.log('openModeOverview',modeName);

            this.activeMode = modeName;

            let modeOverviewSection = document.querySelector('#mode-overview-screen');
            let modeOverviewContainer = document.querySelector('.mode-overview-container');

            let modePane = document.querySelector('.game-mode[data-mode-name="'+this.activeMode+'"]');

            let modeActions = document.querySelector('.game-mode-actions');

            const state = Flip.getState(modePane);

            // Show mode overview section.
            modeOverviewSection.classList.remove("hidden");

            // Append mode pane.
            modeOverviewContainer.appendChild(modePane);

            // Animate.
            Flip.from(state, {
                // Optional properties related to HOW it's transitioned
                duration: .5,
                ease: "power4.out"
            });
            gsap.to('.mode-overview-container .game-mode .title',{scale:2});

            
            this.showModeActions();

      
    }

    closeModeOverview(){

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

            this.hideModeActions();
    }
  
    showModeActions() {
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

    hideModeActions(){
      console.log('hideModeActions')
      gsap.to(this.gameModeActions,{
              opacity:0,
              duration:.3,
              yPercent:100,
              ease:"back.out(1.7)"
      });
      this.gameModeActionsVisible = false;
    }
  

    showCancelButton(){
      console.log('showCancelButton')
      this.cancelActions.classList.remove('hidden');
      gsap.set(this.cancelActions,{clearProps:"all"});
      gsap.from(this.cancelActions,{duration:.3,scale:0,  ease:"back.out(1.7)"});
    }
    hideCancelButton(){
      console.log('showCancelButton')
      var _ca = this.cancelActions;
      gsap.to(this.cancelActions,{duration:.3,scale:0,onComlpete:function(){
        _ca.classList.add('hidden');
      }});
    }

    createReportList() {
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
  