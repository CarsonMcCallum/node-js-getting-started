
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
        let graphic = '<svg width="'+w+'" height="'+h+'" >';
            graphic+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke-width="'+sw+'" stroke="'+sc+'" fill="'+f+'" />';
            graphic+='</svg>';
        return graphic;
    }

    var $Chevron = function(w,h,sw,sc,f){
        let graphic = '<svg height="'+h+'" width="'+w+'">';
                graphic+='<polygon points="29,2 56.5,20 37,20 29,15 21,20 1.5,20" style="fill:'+f+';stroke:'+sc+';stroke-width:'+sw+'" />';
            graphic+='</svg>';
        return graphic;
    }

    var $Card = function(cardId,s,c,f,n, graphic = []){
        let _c = '<div id="'+cardId+'" class="card show-front" data-s="'+s+'" data-c="'+c+'" data-f="'+f+'" data-n="'+n+'">';
            _c+=    '<div class="front">';
              
                    for(let i = 0; i < graphic.length;i++){
                        _c+= '<div class="graphic">';
                        _c += graphic[i];
                        _c+= '</div>';
                    }
            _c+=   '</div>';
            _c+=  '<div class="back"></div>';
            _c+= '</div>';
        return _c;
    }


   