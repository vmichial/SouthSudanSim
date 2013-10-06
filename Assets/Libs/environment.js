//objects for sudan classes, diseases and lifeEvents
function environment(scene) {
	this.parent = scene;
	this.school = new School();
	this.hospital = new Hospital();
	this.family = new Family(this);
	this.disasters = new Array();
	this.quarter = 0;
	this.first = true;
	this.advQuarter = function() {
		this.quarter = (this.quarter +  1) % 4;
		if (this.quarter == 0 && !this.first) {
			this.advYear();
		}
		this.first = false;
		if (this.family.girl.gradeLevel == 9) {
			this.school.reRoll();
		}
	}
	this.aid = new Array();
	
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