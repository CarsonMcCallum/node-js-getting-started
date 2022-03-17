
    var $FillPattern = function(){
        let p = '<defs>';
                    p+= '<pattern id="pattern1">';
                    p+= 'x="0" y="0" width="20" height="20"';
                    p+= 'patternUnits="userSpaceOnUse" >';
                p+= '<circle cx="10" cy="10" r="10" style="stroke: none; fill: #0000ff" />';
                p+= '</pattern>';
                p+= '</defs>';
        return p;
    }

    var $Rectangle = function(w,h,sw,sc,f){
        let rectH = h - sw,
            rectW = w - sw,
            x = sw * .5,
            y = sw * .5;
        console.log('rectangle',w,h,sw,sc,f)
        let graphic = '<svg width="'+w+'" height="'+h+'">';
                graphic+='<rect x="'+x+'" y="'+y+'" width="'+rectW+'" height="'+rectH+'" style="fill:'+f+';stroke-width:'+sw+';stroke:'+sc+'" />';
            graphic+='</svg>';
        return graphic;
    }

    var $Circle = function(w,h,sw,sc,f){
        let r = (h - sw) * .5,
            cx = w * .5,
            cy = h * .5;
        console.log('circle',w,h,sw,sc,f,r,cx,cy);
        let fill = f;
        let graphic = '<svg width="'+w+'" height="'+h+'" >';
                graphic+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke-width="'+sw+'" stroke="'+sc+'" fill="'+f+'" />';
            graphic+='</svg>';
        return graphic;
    }
    
    var $Sweet = function(w,h,sw,sc,f){
        let r = (h - sw) * .5,
        cx = w * .5,
        cy = h * .5;
            console.log('circle',w,h,sw,sc,f,r,cx,cy);
            let fill = f;
            let graphic = '<img width="22" height="22" src="/images/sweets/00.png"/>';
                  //  graphic+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke-width="'+sw+'" stroke="'+sc+'" fill="'+f+'" />';
                //graphic+='</svg>';
            return graphic;
    }

    var $Chevron = function(w,h,sw,sc,f){
        let fill = f;
        let graphic = '<svg height="'+h+'" width="'+w+'">';
                graphic+='<polygon points="29,2 56.5,20 37,20 29,15 21,20 1.5,20" style="fill:'+f+';stroke:'+sc+';stroke-width:'+sw+'" />';
            graphic+='</svg>';
        return graphic;
    }

    var $Card = function(index, cardId,s,c,f,n, graphic = [],bonus = false){
        let _c = '<div id="'+cardId+'" data-index="'+index+'" data-player-action-id="touch_card" data-selected="false" class="card small show-front" data-s="'+s+'" data-c="'+c+'" data-f="'+f+'" data-n="'+n+'">';
         
            _c+=    '<div class="front">';
                _c+=   '<div class="card-bg" style="background: radial-gradient(rgb('+$Colors[c]+'),rgb('+$Colors[c]+'));">';
                    _c+= '<div class="card-tile"></div>';
                    if(bonus){
                        _c+= '<div class="card-bonus">'+bonus+'</div>';
                    }
                _c+=   '<div class="card-graphics">';
                        for(let i = 0; i < graphic.length;i++){
                            _c+= '<div class="graphic">';
                            _c += graphic[i];
                            _c+= '</div>';
                        }
                        _c+= '</div>';// End card-graphics.
                    _c+= '</div>';// End card-bg.
            _c+=   '</div>';
            _c+=  '<div class="back"></div>';
     
            _c+= '</div>';
        return _c;
    }


   