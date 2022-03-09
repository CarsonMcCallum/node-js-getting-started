function Effects(){

    this.parent = document.querySelector('.game-effects-inner');
    this.durations = {
        default:.4
    };
    this.eases = {
        none:"none",
        slow:"slow(0.7, 0.7, false)"
    };
    this.animations = {
        smallFadeInOut:{
            start:{
                opacity:0,
                scale:1,
            },
            in:{
                opacity:1,
                scale:1,
                y:"-=20",
                ease:"expo.out"
            },
            out:{
                opacity:0,
                scale:1.4
            }
        }
    }

    let _this = this;

    this.remove = function(elem){
        try{
           elem.remove();
        }catch(e){
            console.log(e)
        }
    }
    this.addClass = function(identifier,className){
        try{
            let elem = document.querySelector(identifier);
            elem.classList.add(className);
        }catch(e){
            console.log(e)
        }
    }

    this.getOne = function(identifier){
        try{
            let elem = document.querySelector(identifier);
            return elem;
        }catch(e){
            console.log(e)
        }
    }
    this.getAll = function(identifier){
        try{
            let elem = document.querySelectorAll(identifier);
            return elem;
        }catch(e){
            console.log(e)
        }
    }

    this.randomFromArray = function(arr){ 
        return arr[Math.floor(Math.random()*arr.length)];
    }


    this.incorrectEffect = function(){

        let incorrectEffectText = $EffectMethods.incorrectEffectText();
        let incorrectEffectTextGlow = $EffectMethods.incorrectEffectTextGlow();

        _this.parent.appendChild(incorrectEffectText);
        _this.parent.appendChild(incorrectEffectTextGlow);

        
  
        gsap.set(incorrectEffectText,_this.animations.smallFadeInOut.start);
        gsap.set(incorrectEffectTextGlow,_this.animations.smallFadeInOut.start);


        let tl = gsap.timeline({onComplete:function(){
            _this.remove(incorrectEffectText);
            _this.remove(incorrectEffectTextGlow);
        }});

        let inAnim = _this.animations.smallFadeInOut.in;
        inAnim.duration = .5;
        tl.to(incorrectEffectText,inAnim);
        tl.to(incorrectEffectTextGlow,inAnim,"-=.5")

        let outAnim = _this.animations.smallFadeInOut.out;
        outAnim.duration = .3;
        tl.to(incorrectEffectText, outAnim);
        tl.to(incorrectEffectTextGlow,outAnim,"-=.3");

    }


    this.floatingPoints = function(_number,_child,_position = "top center",_effectType = "default"){
    
        console.log('floatingPoints',_number,_child,_position,_effectType);

        // Create point element.
        let effectElement = $EffectMethods.pointsElement(_number);

        // Get position of child element.
        let childPosition = tools.position(_child,_position);

        // Append point effect element to game-effects-inner.
        _this.parent.appendChild(effectElement);


        let tl = gsap.timeline({onComplete:function(){
            _this.remove(effectElement);
        }});


        // Adjust so effect is centered.
        let effectSize = tools.size(effectElement);
        childPosition.x = childPosition.x - effectSize.width.half;
        childPosition.y = childPosition.y - effectSize.height.full;

        gsap.set(effectElement,{y:childPosition.y,x:childPosition.x});
        gsap.set(effectElement,_this.animations.smallFadeInOut.start);


        let inAnim = _this.animations.smallFadeInOut.in;
        inAnim.duration = .5;
        tl.to(effectElement,inAnim);

        let outAnim = _this.animations.smallFadeInOut.out;
        outAnim.duration = .3;
        tl.to(effectElement, outAnim);
        

        return true;

    }



    this.countUp = function(identifier, {duration = 2000, text = false, callback = false} = {}){

        // https://jshakespeare.com/simple-count-up-number-animation-javascript-react/

        //if(!identifier) return false;

        const animationDuration = duration;

        // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
        const frameDuration = 1000 / 60;
        // Use that to calculate how many frames we need to complete the animation
        const totalFrames = Math.round( animationDuration / frameDuration );
        // An ease-out function that slows the count as it progresses
        // Eases here:
        const easeOutQuad = t => 1+(--t)*t*t*t*t;

        // Format number with comma
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }
        
        // The animation function, which takes an Element
        const animateCountUp = el => {
            let frame = 0;
            const countTo = parseInt( el.innerHTML, 10 );
            // Start the animation running 60 times per second
            const counter = setInterval( () => {
                frame++;
                // Calculate our progress as a value between 0 and 1
                // Pass that value to our easing function to get our
                // progress on a curve
                const progress = easeOutQuad( frame / totalFrames );
                // Use the progress value to calculate the current count
                const currentCount = Math.round( countTo * progress );
        
                // If the current count has changed, update the element
                if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
                    el.innerHTML = formatNumber(currentCount);
                }
        
                // If we’ve reached our last frame, stop the animation
                if ( frame === totalFrames ) {
                    if(callback){
                        console.log('countup callback');
                        callback();
                    }
                    clearInterval( counter );
                }
            }, frameDuration );
        };
        
        // Run the animation on all elements with a class of ‘countup’
        const runAnimations = () => {
            const countupEls = document.querySelectorAll(identifier);
            countupEls.forEach( animateCountUp );
        };
        
        if(text){
            console.log('countUp set text', text);
            gsap.set(identifier,{text:text});
        }

        runAnimations();
    }
}


var $effects = new Effects();