//life events encompass getting pregnant, married, or killed
//they exist always looming over the player. And every player 
//comes stock with a lifeevent. So do the mothers, because well
//women always have to have the option of randomly dying =/
function LifeEvent(ParentObj){
	this.parent = ParentObj;
	this.effect;//a string for when you have the life event
	this.active;//if it is active, then the chance of the effect is upon you
	this.chance;//a number between 1 and 100, representing the chance the effect will be applied
	this.minAge;//the minimum age the lifeEvent must wait...stalking before attempting to murder yo fais
	this.increaceChance = function(increaseBy){this.chance+=increaseBy;}//in case life isn't hard enough
	this.applyEffect;//it will either activate on some reason, or try ruining your life
}

//this object is placed inside all players at the start of the game
//it is a life event, that is inactive until the min age of 13
//once it happens, it will attempt to make you married everytime its
//effect is applied. if you are 13 or older, then you have a 10 percent
//chance of being married off to someone.
function Marriage(ParentObj){
	this.parent = ParentObj;
	this.__proto__ = new LifeEvent();
	this.effect = "You Have been married...";
	this.minAge = 9;
	this.active = false;
	this.chance = 10;
	this.applyEffect = function(){
		var roll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		if(parent.age<this.minAge)return;
		else this.active=true;
		if(parent.age>=this.minAge && roll<=this.chance && this.active){
			this.parent.married = true;
			this.parent.canWork = false;
			this.parent.canSchool = false;
		}
	}
}

//this life event sucks. Everytime you goto school, after
//a min age (hitting puberty) you have a chance of getting 
//pregnant by your dirty *** teacher. Maybe its love, maybe
//he's just a a******, regardless you are preggers and can't
//goto school anymore. :( motherhod...
function Pregnant(ParentObj){
	this.parent = ParentObj;
	this.__proto__ = new LifeEvent();
	this.effect = "Your teacher has gotten you pregnant";
	this.minAge = 13;
	this.active = false;
	this.chance = 5;
	this.turnsUntilMotherhood = 3;
	this.applyEffect = function(){
		var roll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		if(parent.age<this.minAge)return;
		else this.active=true;
		if(parent.age>=this.minAge && roll<=this.chance && this.active &&this.turnsUntilMotherhood <1){
			this.parent.motherhood = true;
			this.parent.canWork = false;
			this.parent.canSchool = false;
		}
		else this.turnsUntilMotherhood--;
	}
}

//this object is placed in all mother objects when they are created.
//it is a lifeEvent that will murder your mother's fais and blame you
//for it 5 percent of all games played.
function ChildBirthDeath(ParentObj){
	this.parent = ParentObj;
	this.__proto__=new LifeEvent();
	this.effect = "Your Mother died while giving birth to you";
	this.active = true;
	this.minAge = 0;
	this.chance = 5;
	this.applyEffect = function(){
		var roll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		console.log(roll);
		if(roll<=this.chance && this.active){this.parent.alive = false; this.parent.canWork = false;}
	}	
}

function DeadDad(ParentObj) {
	this.parent = ParentObj;
	this.__proto__ = new LifeEvent();
	this.effect = "Your father died a few years ago.";
	this.active = true;
	this.minAge = 0;
	this.chance = 50;  //TODO
	this.applyEffect = function()  {
		var roll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		console.log(roll);
		if(roll<=this.chance && this.active){this.parent.alive = false; this.parent.canWork = false;}
	}	
}
