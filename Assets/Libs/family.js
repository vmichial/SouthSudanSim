function Person() {
	var that = this;
	this.atWork = false;
	this.atSchool = false;
	this.alive = true;
	this.canWork = true;
	this.canSchool = true;
	this.diseases = new Array();
	this.lifeEvents = new Array();
	this.update = function() {
		for (var i = 0; i < this.lifeEvents.length; i += 1) {
			this.lifeEvents[i].applyEffect();
		}
		for (var i = 0; i < this.diseases.length; i += 1) {
			this.diseases[i].applyEffect();
		}
		contractDis(that);
	}
	this.hasDisease = function() {
		if (this.diseases.length > 0) {
			return true;
		} else {
			return false;
		}	
	}
}

////Person is a base class. All peple inherit from it
function Player(ParentObj){
	this.parent = ParentObj;
	this.__proto__ = new Person();
	//once that baby comes out... you ain't a child anymore
	this.motherhood = false;
	//you are married eh? ITS THE END!
	this.married = false;
	//if the family member is alive, yay
	//this.alive = true;
	//is the person capable of working
	//this.canWork = true;
	//is the player capable of schooling
	//this.canSchool = true;	
	//age can be a number between 5 and 60
	this.age = 5;
	//education is a number between 1 and 12 (inclusive) 
	//it tells grade level
	this.gradeLevel = 1;
	//progress goes from [0,100] for how much schooling done
	this.schoolProgress = 0;
	//the player will need to make diseases based on some die
	//roll each time. also, every turn the player must roll
	//on each disease and let them play out.
	//this.diseases = new Array();
	//LifeEvents will affect people by chance. everyone has them, with a chance of it
	//happening based in different parameters
	//this.lifeEvent = new Array();
	this.lifeEvents.push(new Pregnant(this));
	this.lifeEvents.push(new Marriage(this));
	this.lifeEvents[0].applyEffect();
	this.lifeEvents[1].applyEffect();
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
	this.advanceYear = function() {
		this.age += 1;
		if (this.schoolProgress >= 100) {
			this.gradeLevel += 1;
		}
		this.schoolProgress = 0;
	}
	this.incProg = function(amt) {
		this.schoolProgress += amt;
	}	
}
//Father is a type of person with his own special abilities
function Father(ParentObj){
	this.parent = ParentObj;
	this.__proto__ = new Person();
	this.canSchool = false;
	this.lifeEvents.push(new DeadDad(this));
	this.lifeEvents[0].applyEffect();
}

//Mother is a type of person with her own special abilities
function Mother(ParentObj){
	this.parent = ParentObj;
	this.__proto__ = new Person();
	this.canSchool = false;
	this.lifeEvents.push(new ChildBirthDeath(this));
	this.lifeEvents[0].applyEffect();
}
function Sibling(ParentObj){
	this.parent = ParentObj;
	this.__proto__ = new Person();
	this.female = Math.random() < 0.5 ? true : false;
	if (this.female) {
		this.lifeEvents.push(new Pregnant(this));
		this.lifeEvents.push(new Marriage(this));
		this.lifeEvents[0].applyEffect();
		this.lifeEvents[1].applyEffect();
	}	
}

function Family(ParentObj){
	this.parent = ParentObj;
	var that = this;
	this.father = new Father(this);
	this.mother = new Mother(this);
	this.sib = new Array();
	var size = Math.floor(Math.random() * 4);
	for (var i = 0; i < size; i += 1) {
		this.sib.push(new Sibling(this));
	}
	this.girl = new Player(this);
	this.supply = 100;
	
	this.increaseSupply = function(){
		//increase supply for family members at work
		if(this.father.atWork)this.supply += 10;
		if(this.mother.atWork)this.supply += 10;
		if(this.girl.atWork)this.supply += 10;
		for(var i = 0; i<this.sib.length; i++){
			if(this.sib[i].atWork)this.supply += 10;
		}
		//increase the supply for family members at a school with food
		if(this.girl.atSchool && this.parent.school.feedStudents){this.supply+=5;}
		for(var i = 0; i<this.sib.length; i++){
			if(this.sib[i].atSchool && this.parent.school.feedStudents)this.supply += 5;
		}
	}
	
	this.decreaseSupply = function(){
		//decrease supply for those at school
		if(this.girl.atSchool)this.supply -= 5;
		for(var i = 0; i<this.sib.length; i++){
			if(this.sib[i].atSchool)this.supply -= 5;
		}
		//increase the supply for family members at a school with food
		if(this.girl.atSchool && this.parent.school.far){this.supply -= 5;}
		for(var i = 0; i<this.sib.length; i++){
			if(this.sib[i].atSchool && this.parent.school.far)this.supply -= 5;
		}
	}
		
}