function GUIMethods(){

    this.playerMiniCards = function(){
        let h = '<div class="player-mini-cards">';
                h+='<div class="relative" style="width:25px;height:25px;">';
                     h+='<div class="minicard">';
                        h+='<img src="/images/minicard_white.png">';
                        h+='</div>';
                        h+='<div class="minicard">';
                            h+='<img src="/images/minicard_white.png">';
                        h+='</div>';
                    h+='<div class="minicard">';
                         h+='<img src="/images/minicard_white.png">';
                    h+='</div>';
                    h+='<div class="player-card-count hidden"></div>';
                    h+='<div class="player-won-cards-holder"></div>';
                    h+='</div>';
            h+='</div>';

        h = tools.stringToHTML(h);

        return h;
    }

}

var $GUIMethods = new GUIMethods();