
function EffectMethods(){

    this.pointsElement = function(_number,_type = "default"){
        return tools.stringToHTML('<div class="effect points text-shadow default floating" data-type="'+_type+'" data-points="'+_number+'">' + _number + "</div>");
    }

    this.incorrectEffectText = function(){
        return tools.stringToHTML('<div class="effect incorrect">Not a match</div>');
    }
    this.incorrectEffectTextGlow = function(){
        return tools.stringToHTML('<image class="effect incorrect-glow" src="/images/error-glow.png"></image>');
    }
}

var $EffectMethods = new EffectMethods();