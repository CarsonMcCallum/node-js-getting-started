
class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static displayName = "Point";

    static distance(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
  
      return Math.hypot(dx, dy);
    }
  }

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));


/*
*   Section navigation.  
*/

var currentPage = "splash";

var pageDetails = {
    "splash":{
        show:{
            yPercent:0,
            xPercent:0,
         },
        hide:{
            yPercent:0,
            xPercent:-100
        }
    },
    "home":{
      show:{
          yPercent:0,
          xPercent:0,
       },
      hide:{
          yPercent:0,
          xPercent:100
      }
  },
  "game-loading-screen":{
        show:{
            yPercent:0,
            xPercent:0,
        },
        hide:{
            yPercent:0,
            xPercent:100
        }
    }

}

function setInitialPagePositions(){
  
  gsap.set('section[data-section="home"]', pageDetails["home"].hide);
  gsap.set('section[data-section="game-loading-screen"]', pageDetails["game-loading-screen"].hide);
  console.log('shit fuck',pageDetails["home"].hide.xPercent);
    
}



function navigate(e){

console.log('navigate to', e.value);

let page_current = pageDetails[currentPage];
let next_page = pageDetails[e.value];

    let pageTL = new TimelineMax({});

    pageDetails[currentPage].hide.duration = 1;
    pageDetails[e.value].show.duration = 1;

    gsap.to('section[data-section="'+currentPage+'"]',pageDetails[currentPage].hide);
    gsap.to('section[data-section="'+e.value+'"]',pageDetails[e.value].show);

    currentPage = e.value;

}

