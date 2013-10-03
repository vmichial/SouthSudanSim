//objects for sudan classes

//a disease will have a name, a chance of happening, and a cost
//a person will give themself a disease on certain condtions
function Disease(ParentObj){
	this.parent = ParentObj;
	
	//is the disease still active
	this.active = true;
	//name of the disease
	this.name = "Disease";
	//The description says what the disease is
	this.description = "You caught a disease";
	//the Effect tells you what it causes to happen
	this.effect = "You can only work twice and goto school once";
	//chance, to be interpreted as a percent. how likely wll it kill
	//you if you have it
	this.DeathChance = 50;
	//how many actions does this disease prevent
	this.actionCost = 3;
	//the maximum amount of actions that can go toward work
	//while you have the disease
	this.maxWork = 2;
	//maximum amount of actions you can put to school while 
	//you have the disease
	this.maxSchool = 1;
	//duration will determine how long it will last (in turns)
	this.duration = 1;
}

//life events have a name
function LifeEvent(){
	
}

//Person is a base class. All peple inherit from it
function Person(){
	this.gender = 'female';
	this.married = false;
	//if the family member is alive, yay
	this.alive = true;
	//number of action points can be [0,10]
	this.MaxActionPoints = 10;
	
	//age can be a number between 20 and 60
	this.Age = 30;
	//education is a number between 1 and 12 (inclusive) 
	//it tells grade level
	this.Education = 1;
	//progress goes from [0,100] for how much work done
	this.workProgress = 0;
	//progress goes from [0,100] for how much schooling done
	this.schoolProgress = 0;
	//the player will need to make diseases based on some die
	//roll each time. also, every turn the player must roll
	//on each disease and let them play out.
	this.diseases = new Array();
	
	this.lifeEvent = new Array();

	this.init = function(){
	
	}
	this.handleTurn = function(){
	
	}
}

//Father is a type of person with his own special abilities
function Father(){

}
Father.prototype = new Person();

//Mother is a type of person with her own special abilities
function Mother(){

}
Mother.prototype = Person();

//Daughter is the player type, she is a person but will have special
//educational goals
function Daughter(){

}
Daughter.prototype = new Person();

function GameState(){
	this.handleTurn = false;
	this.MakeDecisions = true;
}