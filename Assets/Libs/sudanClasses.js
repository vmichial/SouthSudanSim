//objects for sudan classes


//a disease will have a name, a chance of happening, and a cost
//a person will give themselves a disease on certain conditions
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
	//the maximum amount of actions that can go toward work
	//while you have the disease
	this.canWork = false;
	//maximum amount of actions you can put to school while 
	//you have the disease
	this.canSchool = false;
	//duration will determine how long it will last (in turns)
	this.duration = 1;
}

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
function Preggers(ParentObj){
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
		if(roll<=this.chance && this.active){this.parent.alive = false;}
	}	
}


function Disaster(ParentObj){
	this.name;
	this.effect;
	this.continuingEffect;
	this.noHospital;
	this.noSchool;
	this.noWork;
	this.duration;	
}

function Aid(ParentObj){
	
}

////Person is a base class. All peple inherit from it
function Player(){
	//once that baby comes out... you ain't a child anymore
	this.motherhood = false;
	//you are married eh? ITS THE END!
	this.married = false;
	//if the family member is alive, yay
	this.alive = true;
	//is the person capable of working
	this.canWork = true;
	//is the player capable of schooling
	this.canSchool = true;	
	//age can be a number between 5 and 60
	this.age = 5;
	//education is a number between 1 and 12 (inclusive) 
	//it tells grade level
	this.education = 1;
	//progress goes from [0,100] for how much schooling done
	this.schoolProgress = 0;
	//the player will need to make diseases based on some die
	//roll each time. also, every turn the player must roll
	//on each disease and let them play out.
	this.diseases = new Array();
	//LifeEvents will affect people by chance. everyone has them, with a chance of it
	//happening based in different parameters
	this.lifeEvent = new Array();
	//init is blank, it is here for initialization
	this.init = function(){
		this.married = false;
		this.alive = true;
		this.canWork = true;
		this.canSchool = true;
		this.schoolProgress = 0;
		this.diseases = new Array();
		this.lifeEvent = new Array();
		this.age = 5;
		this.education = 1;
	}
	this.checkDiseases = function(){
		
	}
}

//Father is a type of person with his own special abilities
function Father(){
	this.alive = true;
	this.canWork = true;
	this.canSchool = false;
	this.diseases = new Array();
	this.lifeEvents = new Array();
}

//Mother is a type of person with her own special abilities
function Mother(){
	this.alive = true;
	this.canWork = true;
	this.canSchool = false;
	this.diseases = new Array();
	this.lifeEvents = new Array();
	this.lifeEvents.push(new ChildBirthDeath(this));
	this.lifeEvents[0].applyEffect();
}

function Sibling(){
	this.alive = true;
	this.canWork = true;
	this.canSchool =true;
	this.diseases = new Array();
	this.lifeEvents = new Array();
}
// the school is used for certai education bonuses
//use roll to initialize the school randomly
function School(){
	this.distanceChance = 49;
	this.feedChance = 12;
	this.materialChance = 10;
	this.buildingChance = 15;
	this.goodTeachChance = 13;
	
	this.available = true;
	
	this.hasGoodTeacher = ( (Math.floor(Math.random() * (100 - 1 + 1) + 1))<= this.goodTeachChance ) ? true : false;	
	this.hasBuilding = ( (Math.floor(Math.random() * (100 - 1 + 1) + 1))<= this.buildingChance ) ? true : false;
	this.hasMats = ( (Math.floor(Math.random() * (100 - 1 + 1) + 1))<= this.materialChance ) ? true : false;
	this.feedStudents = ( (Math.floor(Math.random() * (100 - 1 + 1) + 1))<= this.feedChance ) ? true : false;
	this.far = ( (Math.floor(Math.random() * (100 - 1 + 1) + 1))<= this.distanceChance ) ? true : false;
	
	
	
	this.reRoll = function(){
		var rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.far = ( (rolls<=this.distanceChance)? true : false );
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.feedStudents = ( (rolls<=this.feedChance) ?  true : false );
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.hasMats = ( (rolls<=this.materialChance) ? true : false );
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.hasGoodTeacher = ( (rolls<51) ? true : false );
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.hasBuilding = ( (rolls<=this.buildingChance) ? true : false);
	}
}

//L'hospital is done. make a hospital object and it will have a 5% chance of
//existing. if for any reason you need a new school, just call reRoll on your
//instance of Hospital and it is gonnareroll. 5% chance of having a hospital.
//so lucky you if you get one.
function Hospital(){	
	this.chance = 5;
	this.available = ( (Math.floor(Math.random() * (100 - 1 + 1) + 1))<= this.chance ) ? true : false;
	this.reRoll = function(){
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.available = ( (rolls<=this.chance)? true : false );
	}
}

function State(){
	this.hospital = new Hospital();
	this.family = new Family();
	this.School = new School();
}
function Family(){
	this.father = new Father();
	this.mother = new Mother();
}

function GameState(){
	this.start = true;
	this.choose = false;
	this.goTo = false;
	this.atWork = false;
	this.rollDiseases = false;
	this.rollDisasters = false;
	this.rollAid = false;
	this.victoryCheck = false;
}