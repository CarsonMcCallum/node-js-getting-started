


function randomCorrectMatch(){
    let cards = tools.getAll('.card');
    var indexArr = [];

    for(let i = 0; i < 3; i++){
        let c = cards[Math.floor(Math.random()*cards.length)];
        indexArr.push(c.dataset.index);
    }

    $Game.correctMatch("p1",indexArr);
}