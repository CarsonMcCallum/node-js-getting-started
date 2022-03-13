
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

    this.floatGraphic = function(){
        let g = '<div class="shout-graphic" data-name="blue-shout-graphic">';
                g+= '<div class="shout-graphic-inner">';
                    g+= '<div class="blue-shout-graphic top"></div>';
                    g+= '<div class="blue-shout-graphic glow"></div>';
                    g+= '<div class="blue-shout-graphic text"></div>';
                    g+= '<div class="blue-shout-graphic bottom"></div>';
                g+= '</div>';
            g+= '</div>';
        return tools.stringToHTML(g);
    }
}

var $EffectMethods = new EffectMethods();