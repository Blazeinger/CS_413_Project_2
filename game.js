var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x000000});

gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

PIXI.loader
  .add("assets.json")
  .load(loadMain);

var stage_main = new PIXI.Container();
var stage_guide = new PIXI.Container();
var stage_master = new PIXI.Container();
var stage_game = new PIXI.Container();
var stage_end = new PIXI.Container();

var main_menu;
var guide_screen;
var game_screen;
var start_button;
var guide_button;
var back_button;
var car;

function loadMain()
{
	main_menu = new PIXI.Sprite(PIXI.Texture.fromFrame("Main_screen1.png"));
	main_menu.scale.x = 4;
	main_menu.scale.y = 4;
	main_menu.position.x = 0;
    main_menu.position.y = 0;
	
	start_button = new PIXI.Sprite(PIXI.Texture.fromFrame("start.png"));
	start_button.scale.x = 2;
	start_button.scale.y = 2;
	start_button.position.x = 20;
    start_button.position.y = 300;
	
	guide_button = new PIXI.Sprite(PIXI.Texture.fromFrame("guide.png"));
	guide_button.scale.x = 2;
	guide_button.scale.y = 2;
	guide_button.position.x = 120;
    guide_button.position.y = 300;
	
	start_button.interactive = true;
	start_button.on('mousedown', mouseHandler);
	
	guide_button.interactive = true;
	guide_button.on('mousedown', mouseHandler);
	
	stage_main.addChild(main_menu);
	stage_main.addChild(start_button);
	stage_main.addChild(guide_button);
	stage_master.addChild(stage_main);
	animate();
}

function loadGame()
{
	game_screen = new PIXI.Sprite(PIXI.Texture.fromFrame("road.png"));
	game_screen.scale.x = 4;
	game_screen.scale.y = 8;
	game_screen.position.x = 0;
    game_screen.position.y = 0;
	
	car = new PIXI.Sprite(PIXI.Texture.fromFrame("race_car1.png"));
	car.scale.x = 1;
	car.scale.y = 1;
	car.position.x = 0;
	car.position.y = 200;
	
	back_button = new PIXI.Sprite(PIXI.Texture.fromFrame("back.png"));
	back_button.scale.x = 1;
	back_button.scale.y = 1;
	back_button.position.x = 0;
	back_button.position.y = 300;
	
	back_button.interactive = true;
	back_button.on('mousedown', mouseHandler);
	
	document.addEventListener('keydown', keyHandler);
	
	stage_game.addChild(game_screen);
	stage_game.addChild(back_button);
	stage_game.addChild(car);
	stage_master.addChild(stage_game);
	animate();
}

function loadGuide()
{
	guide_screen = new PIXI.Sprite(PIXI.Texture.fromFrame("guide_1.png"));
	guide_screen.scale.x = 4;
	guide_screen.scale.y = 4;
	guide_screen.position.x = 0;
    guide_screen.position.y = 0;
	
	back_button = new PIXI.Sprite(PIXI.Texture.fromFrame("back.png"));
	back_button.scale.x = 1;
	back_button.scale.y = 1;
	back_button.position.x = 0;
	back_button.position.y = 200;
	
	back_button.interactive = true;
	back_button.on('mousedown', mouseHandler);
	
	stage_guide.addChild(guide_screen);
	stage_guide.addChild(back_button);
	stage_master.addChild(stage_guide);
	animate();
}	

function mouseHandler(trigger)
{
	if(trigger.target == start_button)
	{
		stage_master.removeChild(stage_main);
		loadGame();
	}
	else if(trigger.target == guide_button)
	{
		stage_master.removeChild(stage_main);
		loadGuide();
	}
	else if(trigger.target == back_button)
	{
		stage_master.removeChild(stage_guide);
		stage_master.removeChild(stage_game);
		loadMain();
	}
}

function keyHandler(key_in)
{
	if(key_in.keyCode == 68) // keyCode 87 == W.
	{
		past_car_x = car.position.x;
		past_car_y = car.position.y;
		stage_game.removeChild(car);
		car = new PIXI.Sprite(PIXI.Texture.fromFrame("race_car1.png"));
		createjs.Tween.get(car.position).to({x: past_car_x + 5, y: past_car_y}, 500, createjs.easeOut);
		stage_game.addChild(car);
	}
	else if(key_in.keyCode == 83) // keyCode 87 == W.
	{
		past_car_x = car.position.x;
		past_car_y = car.position.y;
		stage_game.removeChild(car);
		car = new PIXI.Sprite(PIXI.Texture.fromFrame("race_car4.png"));
		createjs.Tween.get(car.position).to({x: past_car_x, y: past_car_y + 5}, 500, createjs.easeOut);
		stage_game.addChild(car);
	}
	else if(key_in.keyCode == 87) 
	{
		past_car_x = car.position.x;
		past_car_y = car.position.y;
		stage_game.removeChild(car);
		car = new PIXI.Sprite(PIXI.Texture.fromFrame("race_car3.png"));
		createjs.Tween.get(car.position).to({x: past_car_x, y: past_car_y - 5}, 500, createjs.easeOut);
		stage_game.addChild(car);
	}
	else if(key_in.keyCode == 65) 
	{
		past_car_x = car.position.x;
		past_car_y = car.position.y;
		stage_game.removeChild(car);
		car = new PIXI.Sprite(PIXI.Texture.fromFrame("race_car2.png"));
		createjs.Tween.get(car.position).to({x: past_car_x - 5, y: past_car_y}, 500, createjs.easeOut);
		stage_game.addChild(car);
	}
}

function animate()
{
	requestAnimationFrame(animate);
	renderer.render(stage_master);
}

animate();
	