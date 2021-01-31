var dog,sadDog,happyDog;
var foodObj;
var feed, addFoods;
var position;
var database;
var fedTime,lastFed;

function preload(){
  sadDog = loadImage("Images/dog.png");
  happyDog = loadImage("Images/happyDog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed your dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFoods = createButton("Add Food");
  addFoods.position(800,95);
  addFoods.mousePressed(addFood);

  
  

  foodObj = new Food(720,220);
}

function draw() {
  background(46,139,87);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : 12 AM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed " + lastFed + "AM", 350,30)
  }

  foodObj.display();

  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
}

function addFood(){
  foodStock++;
  database.ref('/').update({
    Food:FoodStock
  })
}

function fedTime(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}