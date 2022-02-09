
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

var currentPage = "home";

var pageDetails = {
    "home":{
        show:{
            yPercent:0,
            xPercent:0,
         },
        hide:{
            yPercent:0,
            xPercent:-100
        }
    }
}

function setInitialPagePositions(){
    
}


function navigate(e){

console.log('navigate to',e.value);

let page_current = pageDetails[currentPage];
let next_page = pageDetails[e.value];

    let pageTL = new TimelineMax({});
    pageTL.to('section[name="'+currentPage+'"]',{
            yPercent:page_current.hide.yPercent,
            xPercent:page_current.hide.xPercent
        });
    pageTL.to('section[name="'+e.value+'"]',{
            yPercent:next_page.show.yPercent,
            xPercent:next_page.show.xPercent
    });

}

