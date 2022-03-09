function AudioManager(){


    this.playingMusic = false;
    this.activeMusic = null;

    const _this = this;


    this.randomFromArray = function(arr){ 
        return arr[Math.floor(Math.random()*arr.length)];
    }

    this.loadMusic = function(){

    }


    this.setMusic = function(musicIndex = 0,data = false){
        $gameMusic = new Howl({
            src: '/audio/music/' + $musicOptions[musicIndex],
            loop: true,
            volume:0.6
          });
        _this.activeMusic = $gameMusic;
    }

    this.music = function({type = "play", fade = false, startVolume = 0, endVolume = 0.6, duration = 6000}){
        try{

        if(type == "play"){
            _this.activeMusic.play();
            if(fade){
                _this.activeMusic.fade(startVolume,endVolume,duration);
            }
        }else if(type == "pause"){
            if(fade){
                if(endVolume == 0.6){ // if endVolume is not passed, set to 0.
                    endVolume = 0;
                }
                let getStartVol = _this.activeMusic.volume();
                console.log('duration',duration)
                _this.activeMusic.fade(getStartVol,endVolume,duration);
            }else{
                _this.activeMusic.pause();
            }
        }

        }catch(e){
            console.log(e);
        }

    }

    this.sfx = function(name, data = false){

        // Interface sound effects.
            if(name == "select button"){
                $sfx_button.play();
            }

        // Game sound effects.
            if(name == "start intro"){
                $start_game_intro.play();
            }
            if(name == "start"){
                //$sfx_start.play();
                $voice_effects.play('start');
            }
            if(name == "finish"){
                $voice_effects.play('finish');
            }
            if(name == "select card"){
                $sfx_click.play();
            }
            if(name == "incorrect"){
                $sfx_error.play();
            }

        // Game Over sound effects.
        if(name == "count up"){
            $sfx_count_up.play();
        }

    }


    this.parseAudioId = function(audioIdArray){
        try{
            audioIdArray = audioIdArray.split(' ');
                for(let i = 0; i < audioIdArray.length;i++){
                    if(audioIdArray[i] == "button"){
                        $sfx_button.play();
                    }
                    if(audioIdArray[i] == "load-mode"){
                        $sfx_load_mode.play();
                    }
                }
        }catch(e){
            console.log(e)
        }
    }


}


var $audio = new AudioManager();