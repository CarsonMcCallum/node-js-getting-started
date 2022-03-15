
var $CardTheme = "default";



// RGB of colors. 

var $ColorSets = [
    "255,255,255",  // 0 - White
    "0,0,0",        // 1 - Black
    "233,30,197",   // 2 - Pink
    "30,125,233",    // 3 - Blue
    "112,225,28",   // 4 - Green,
    "255,46,46",    // 5 - Red
    "253,189,15"    // 6 - Yello
];

var $FillPatterns = ["url(#pattern_yPqhrn)","url(#pattern_EREf32)"];

var $Colors = [
    $ColorSets[3],
    $ColorSets[6],
    $ColorSets[5],
    $ColorSets[4],
    $ColorSets[4],
];
// Change the index of these to change shape colors. 


var $CardStyles = {
    default:{
        colors:{
           /* 
                // White fill
           0:{
                sc:'rgb('+$ColorSets[0]+')',
                f:{
                    0:'rgba('+$ColorSets[0]+',0)',  //  Empty
                    1:$FillPatterns[0],
                    //1:'rgba('+$ColorSets[0]+',.5)', //  Half
                    2:'rgba('+$ColorSets[0]+',1)'   //  Full
                }
            },
            1:{
                sc:'rgb('+$ColorSets[0]+')',
                f:{
                    0:'rgba('+$ColorSets[0]+',0)',  //  Empty
                    1:$FillPatterns[0],
                    //1:'rgba('+$ColorSets[1]+',.5)', //  Half
                    2:'rgba('+$ColorSets[0]+',1)'   //  Full
                }
            },
            2:{
                sc:'rgb('+$ColorSets[0]+')',
                f:{
                    0:'rgba('+$ColorSets[0]+',0)',  //  Empty
                    1:$FillPatterns[0],
                    //1:'rgba('+$ColorSets[1]+',.5)', //  Half
                    2:'rgba('+$ColorSets[0]+',1)'   //  Full
                }
            },
            3:{
                sc:'rgb('+$ColorSets[0]+')',
                f:{
                    0:'rgba('+$ColorSets[0]+',0)',  //  Empty
                    1:$FillPatterns[0],
                    //1:'rgba('+$ColorSets[1]+',.5)', //  Half
                    2:'rgba('+$ColorSets[0]+',1)'   //  Full
                }
            },
            4:{
                sc:'rgb('+$ColorSets[0]+')',
                f:{
                    0:'rgba('+$ColorSets[0]+',0)',  //  Empty
                    1:$FillPatterns[0],
                    //1:'rgba('+$ColorSets[1]+',.5)', //  Half
                    2:'rgba('+$ColorSets[0]+',1)'   //  Full
                }
            },
            */
            0:{
                sc:'rgb('+$Colors[0]+')',
                f:{
                    0:'rgba('+$Colors[0]+',0)',  //  Empty
                    1:'rgba('+$Colors[0]+',.3)', //  Half
                    2:'rgba('+$Colors[0]+',1)'   //  Full
                }
            },
            1:{
                sc:'rgb('+$Colors[1]+')',
                f:{
                    0:'rgba('+$Colors[1]+',0)',  //  Empty
                    1:'rgba('+$Colors[1]+',.3)', //  Half
                    2:'rgba('+$Colors[1]+',1)'   //  Full
                }
            },
            2:{ 
                sc:'rgb('+$Colors[2]+')',
                f:{
                    0:'rgba('+$Colors[2]+',0)',  //  Empty
                    1:'rgba('+$Colors[2]+',.3)', //  Half
                    2:'rgba('+$Colors[2]+',1)'   //  Full
                }
            },
            3:{ 
                sc:'rgb('+$Colors[3]+')',
                f:{
                    0:'rgba('+$Colors[3]+',0)',  //  Empty
                    1:'rgba('+$Colors[3]+',.3)', //  Half
                    2:'rgba('+$Colors[3]+',1)'   //  Full
                }
            
            },
            4:{ 
                sc:'rgb('+$Colors[4]+')',
                f:{
                    0:'rgba('+$Colors[4]+',0)',  //  Empty
                    1:'rgba('+$Colors[4]+',.3)', //  Half
                    2:'rgba('+$Colors[4]+',1)'   //  Full
                }
            
            },

        },
        shapes:{
                // Rectangle
                0:{
                    w:58,
                    h:22,
                    sw:4,
                },
                1:{
                    w:44,
                    h:30,
                    sw:4,
                },
                2:{
                    w:58,
                    h:22,
                    sw:4
                }
            
        },

    }/*
    "S1C1F1N1":{
        w:60,
        h:25,
        f:'rgba(145,124,223,.3)',
        sw:4,
        sc:'rgb(145,124,223)'
    }*/
}