
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  this.users = [];
  this.badGuys = [];
  this.walls = [];
}

GameBoard.prototype.createGrid = function () {
  const viewbox = '0 0 ' + cols + ' ' + rows;
  this.area.attr('viewBox', viewbox);
  this.grid = Array(rows).fill().map(() => Array(cols).fill(0));
}

GameBoard.prototype.cleanBoard = function () {
  clearRequestInterval(timer);
  $('.time').text('00:00');
  this.grid = [];
  this.users = [];
  this.badGuys = [];
  this.walls = [];
  WIN = false;
  LOSE = false;
  countdown_fps = 0;
  counter = 0;
  this.createGrid();
  $('.life').addClass('fill');
  this.area.html('<rect x="0" y="0" id="background" class="background" width="100%" height="100%"/>');
}

GameBoard.prototype.initScene = function () {
  this.initWalls();
  this.initBadGuys();
  this.initBonuses();
}

GameBoard.prototype.initWalls = function () {
  for (let i = 0; i < walls_limit; i++) {
    let wall = new Walls(3,1,i);
    this.walls.push(wall);
    wall.drawWalls();
  }
}

GameBoard.prototype.initBadGuys = function () {
  for (let i = 0; i < badGuys_limit; i++) {
    let badGuy = new BadGuys(3,1,i);
    this.badGuys.push(badGuy);
    badGuy.drawBadGuy();
    console.log('badGuy');
  }
}

GameBoard.prototype.initBonuses = function () {
  for (let i = 0; i < bonus_limit; i++) {
    let bonus = new Bonus();
    bonus.drawBonus();
  }
}

GameBoard.prototype.lifeLess = function(){
  user.points = user.points - 1000;
  $('.life.fill').last().removeClass('fill');
  $('.loseLife').addClass('appear');
  setTimeout(()=>{
    $('.loseWinPoints').addClass('appear');
    $('.loseWinPoints .winlose').text('lost');
    $('.loseWinPoints .points').text('1000');
  }, 1500);
  setTimeout(()=>{$('.loseLife').removeClass('appear');}, 3000);
  setTimeout(()=>{$('.loseWinPoints').removeClass('appear');}, 4000);
}

GameBoard.prototype.winPoints = function(){
  user.points = user.points + 2000;
  $('.loseWinPoints').addClass('appear');
  $('.loseWinPoints .winlose').text('won');
  $('.loseWinPoints .points').text('2000');
  setTimeout(()=>{$('.loseWinPoints').removeClass('appear');}, 4000);
}

GameBoard.prototype.render = function(){
  this.time();
  //REFRESH SVG IN DOM to paint the forms created from jQuery
  // console.log(this.area.children());
  // this.area.html(this.area.html());
}

GameBoard.prototype.time = function(){
  console.log(countdown_fps, counter);
  if(!PAUSE && !INFO && !WIN && !LOSE) {
    if (countdown_fps === FPS) {
      user.points = user.points - 20;
      countdown_fps = 0;
      counter++;
      let date = new Date(null);
      date.setSeconds(counter);
      let trimmedDate = date.toISOString().substr(14,5);
      $('.time').text(trimmedDate);
    } else {
    countdown_fps++;
    }
  }
}
