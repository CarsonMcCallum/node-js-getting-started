function Tools(){

    this.removeClass = function(identifier,className){
        try{
            let elem = document.querySelector(identifier);
            elem.classList.remove(className)
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
}


var tools = new Tools();