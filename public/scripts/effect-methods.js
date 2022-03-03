
function EffectMethods(){

    this.pointsElement = function(_number,_type = "default"){
        return tools.stringToHTML('<div class="effect points text-shadow default floating" data-type="'+_type+'" data-points="'+_number+'">' + _number + "</div>");
    }

}

var $EffectMethods = new EffectMethods();