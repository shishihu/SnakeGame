import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  JSON = JSON;
  title = 'SnakeGame';
  board : any[][];
  boardlength = 9;
  boardwidth = 9;
  snakeX = 4;
  snakeY = 4;
  direction = Direction.right;
  tailList : Array<Location> = [];
  appleX = 5;
  appleY = 8;
  snakeDead = false;

  constructor(){
    this.board = [];
    for (let i = 0; i < this.boardlength; i++){
      this.board.push([]);
      for (let j = 0; j < this.boardwidth; j++){
        this.board[i].push({});
      }
    } 
    this.placeApple();
    this.placeSnakeHead();
    setInterval(this.moveSnakeHead, 500, this);
    this.placeSnakeTail();
    this.getKeyPress();
  }
  placeApple(){
    var j = Math.floor(Math.random()*9);
    var i = Math.floor(Math.random()*9);
    if (!this.board[i][j]['SnakeHead'] && !this.board[i][j]['Tail']){
      this.board[i][j] ['Apple'] = true;
      this.appleX = j;
      this.appleY = i;
    }
    else{
      this.placeApple();
    }
  }
  placeSnakeHead(){
    this.board[this.snakeY][this.snakeX] ['SnakeHead'] = true;
  }
  placeSnakeTail(){
    for (let i in this.tailList){
      this.board[this.tailList[i].y][this.tailList[i].x]['Tail'] = true;
    }
  }
  moveSnakeHead(app : AppComponent){
    let oldX = app.snakeX;
    let oldY = app.snakeY;
    let snakeMove = false;
    if (app.snakeDead){
      return;
    }
    if (app.direction == Direction.up){
      if (app.snakeY != 0){
        app.snakeY -= 1;
        snakeMove = true;
      }
      else{
        app.snakeDead = true;
        return;
      }
    }
    if (app.direction == Direction.down){
      if (app.snakeY != 8){
        app.snakeY += 1;
        snakeMove = true;
      }
      else{
        app.snakeDead = true;
        return;
      }
    }
    if (app.direction == Direction.right){
      if (app.snakeX != 8){
        app.snakeX += 1;
        snakeMove = true;
      }
      else{
        app.snakeDead = true;
        return;
      }
    }
    if (app.direction == Direction.left){
      if (app.snakeX != 0){
        app.snakeX -= 1;
        snakeMove = true;
      }
      else{
        app.snakeDead = true;
        return;
      }
    }
    if (app.direction == Direction.null){
    }
    if (snakeMove){
      app.board[oldY][oldX]['SnakeHead'] = false;
      app.placeSnakeHead();
      app.eatApple();
      app.moveSnakeTail();
    }
  }
  moveSnakeTail(){
    this.board[this.tailList[this.tailList.length - 1].y][this.tailList[this.tailList.length - 1].x]['Tail'] = false;
    for (let i = this.tailList.length - 1; i > 0; i--){
      this.tailList[i] = this.tailList[i - 1];
      if (this.tailList[i].x == this.snakeX && this.tailList[i].y == this.snakeY){
        this.snakeDead = true; 
      }
    }
    this.tailList[0] = new Location(this.snakeX, this.snakeY);
    
    this.placeSnakeTail();
  }
  getKeyPress(){
      addEventListener("keydown", (event) => {
        if (event.code === "ArrowDown"){
          this.direction = Direction.down;
        }
        if (event.code === "ArrowUp"){
          this.direction = Direction.up;
        }
        if (event.code === "ArrowRight"){
          this.direction = Direction.right;
        }
        if (event.code === "ArrowLeft"){
          this.direction = Direction.left;
        }
      })
  }
  eatApple(){
      if (this.snakeX === this.appleX && this.snakeY === this.appleY){
        this.tailList.push(new Location(this.appleX, this.appleY));
        this.board[this.appleY][this.appleX] ['Apple'] = false;
        this.placeApple();
      }
  }
}

enum Direction {
  up, down, left, right, null
}

class Location {
  x : number;
  y : number;
  constructor(x : number, y : number){
    this.x = x;
    this.y = y;
  }
}

//game over screen 
//graphics