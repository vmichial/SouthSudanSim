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

//life events have a name
function LifeEvent(ParentObj){
	this.parent = ParentObj;
	this.effect;
	this.active = false;
	this.chance;
	this.increaceChance = function(increaseBy){this.chance+=increaseBy;}
	
}

function Disaster(ParentObj){
	this.name = "Flood";
	this.effect = "Your Area has experienced a flood";
	this.continuingEffect = "The flood continues...";
	this.noHospital = true;
	this.noSchool = true;
	this.noWork = true;
	this.duration = 3;	
}

function Aid(ParentObj){
	
}

//Person is a base class. All peple inherit from it
function Player(){
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
		this.schoolProgress = true;
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
	this.available = true;
	this.hasGoodTeacher = false;;
	this.hasBuilding = false;
	this.hasMats = false;
	this.feedStudents = false;
	this.far = false;
	
	this.roll = function(){
		var rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.far = ( (roll<50)? true : false );
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.feedStudents = ( (roll<13) ?  true : false );
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.hasMats = ( (roll<11) ? true : false );
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.hasGoodTeacher = ( (roll<51) ? true : false );
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.hasBuilding = ( (roll<16) ? true : false);
	}
}

function Hospital(){
	available = false;
	this.roll = function(){
		rolls = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		this.available = ( (rolls<6)? true : false );
	}
}

function Family(){
	this.school = new School();
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