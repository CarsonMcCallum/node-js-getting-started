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
}


var $effects = new Effects();