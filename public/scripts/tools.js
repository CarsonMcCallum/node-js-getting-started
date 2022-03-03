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

    this.randomFromArray = function(arr){ 
        return arr[Math.floor(Math.random()*arr.length)];
    }

    this.stringToHTML = function (str) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body.firstChild;
    };

    this.size = function(elem){

        try{
            let h = elem.clientHeight;
            let w = elem.clientWidth;
            return {
                height:{
                    full:h,
                    half:h * .5
                },
                width:{
                    full:w,
                    half:w * .5
                }
        };
            
        }catch{

        }
    }

    this.position = function(elem,position = "top center"){

        var bounds = elem.getBoundingClientRect();
        console.log(bounds.top, bounds.right, bounds.bottom, bounds.left);

        let pos = {
            y:bounds.top,
            x:bounds.left
        };

        if(position == "top left"){
            // Do not adjust positioning.
        }
        if(position == "top center"){
            // X center of element.
            let w = elem.clientWidth;
            console.log('elem width', w)
            console.log('adjust to center x by ',  (w * .5))
            pos.x = pos.x + (w * .5);
        }
        return {y:pos.y,x:pos.x};

    }
}


var tools = new Tools();