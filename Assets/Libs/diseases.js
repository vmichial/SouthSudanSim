var disList = ["measles", "meningitis", "sleepSick", "malaria", "diarrhea", "hepA", "dengal"];
var numDiseases = disList.length;
//a disease will have a name, a chance of happening, and a cost
//a person will give themselves a disease on certain conditions
function Disease(ParentObj){
	this.parent = ParentObj;	
	//is the disease still active
	this.active = true;
	//name of the disease
	this.name = "Disease";
	//the Effect tells you what it causes to happen
	this.effect = null;
	//chance, to be interpreted as a percent. how likely wll it kill
	//you if you have it
	this.deathChance = 50;
	//the maximum amount of actions that can go toward work
	//while you have the disease
	this.affectWork = true;
	//maximum amount of actions you can put to school while 
	//you have the disease
	this.affectSchool = true;
	//duration will determine how long it will last (in turns)
	this.duration = 1;
	this.treatable = true;
}

function contractDis(ParentObj) {
	if (ParentObj.hasDisease()) {
		return;
	}
	var roll = Math.floor(Math.random() * 101);
	var roll2 = Math.floor(Math.random() * numDiseases) + 1;
	var disRates = [1, 2, 3, 4, 5, 6, 7]; //TODO
	switch (roll2) {
		case 1: 
			if (roll <= disRates[0]) {
				ParentObj.diseases.push(new Measles(ParentObj));
			}
			break;
		case 2:
			if (roll <= disRates[1]) {
				ParentObj.diseases.push(new Meningitis(ParentObj));
			}
			break;
		case 3:
			if (roll <= disRates[2]) {
				ParentObj.diseases.push(new SleepSick(ParentObj));
			}
			break;
		case 4:
			if (roll <= disRates[3]) {
				ParentObj.diseases.push(new Malaria(ParentObj));
			}
			break;
		case 5:
			if (roll <= disRates[4]) {
				ParentObj.diseases.push(new Diarrhea(ParentObj));
			}
			break;
		case 6:
			if (roll <= disRates[5]) {
				ParentObj.diseases.push(new HepA(ParentObj));
			}
			break;
		case 7:
			if (roll <= disRates[6]) {
				ParentObj.diseases.push(new Dengal(ParentObj));
			}
			break;
		default: console.log("you should never reach this disease switch case.");
	
	}

}

function Meningitis(ParentObj) {
	this.parent = ParentObj;
	this.__proto__ = new Disease(this.parent);
	//The description says what the disease is
	this.description = "You are afflicted with meningococcal meningitis";
	this.effect = "You are suffering from the effect of meningitis."; //TODO
	this.deathChance = 10; //TODO
	this.duration = -1;
	this.affectWork = true;
	this.affectSchool = true;
	this.name = "meningitis";
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		console.log(roll);
		if (roll <= this.deathChance) {
			this.parent.canWork = false;
			this.parent.canSchool = false;
			this.parent.alive = false;
		} else {
			if(this.deathChance < 20) {
				this.deathChance += 1;  //the longer you have it, the chance of it killing you is increased.
			}
		}
	}
}



function Measles(ParentObj) {
	this.parent = ParentObj;
	this.__proto__ = new Disease(this.parent);
	//The description says what the disease is
	this.description = "You are afflicted with measles";
	this.effect = "You are suffering from the effect of measles."; //TODO
	this.deathChance = 10; //TODO
	this.duration = -1;
	this.affectWork = true;
	this.affectSchool = true;
	this.name = "measles";
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		console.log(roll);
		if (roll <= this.deathChance) {
			this.parent.canWork = false;
			this.parent.canSchool = false;
			this.parent.alive = false;
		} else {
			if(this.deathChance < 20) {
				this.deathChance += 1;  //the longer you have it, the chance of it killing you is increased.
			}
		}
	}
}

function SleepSick(ParentObj) {
	this.parent = ParentObj;
	this.__proto__ = new Disease(this.parent);
	//The description says what the disease is
	this.description = "You are afflicted with African sleeping sickness.";
	this.effect = "You are suffering from the effect of African sleeping sickness."; //TODO
	this.deathChance = 10; //TODO
	this.duration = -1;
	this.affectWork = true;
	this.affectSchool = true;
	this.name = "sleepSick";
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		console.log(roll);
		if (roll <= this.deathChance) {
			this.parent.canWork = false;
			this.parent.canSchool = false;
			this.parent.alive = false;
		} else {
			if(this.deathChance < 20) {
				this.deathChance += 1;  //the longer you have it, the chance of it killing you is increased.
			}
		}
	}
}

function Malaria(ParentObj) {
	this.parent = ParentObj;
	this.__proto__ = new Disease(this.parent);
	//The description says what the disease is
	this.description = "You are afflicted with malaria.";
	this.effect = "You are suffering from the effect of malaria."; //TODO
	this.deathChance = 10; //TODO
	this.duration = -1;
	this.affectWork = true;
	this.affectSchool = true;
	this.name = "malaria";
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		console.log(roll);
		if (roll <= this.deathChance) {
			this.parent.canWork = false;
			this.parent.canSchool = false;
			this.parent.alive = false;
		} else {
			if(this.deathChance < 20) {
				this.deathChance += 1;  //the longer you have it, the chance of it killing you is increased.
			}
		}
	}
}

function Diarrhea(ParentObj) {
	this.parent = ParentObj;
	this.__proto__ = new Disease(this.parent);
	//The description says what the disease is
	this.description = "You are afflicted with diarrhea.";
	this.effect = "You are suffering from the effect of diarrhea."; //TODO
	this.deathChance = 70; //TODO
	this.duration = -1;
	this.affectWork = false;
	this.affectSchool = false;
	this.name = "diarrhea";
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		console.log(roll);
		if (roll <= this.deathChance) {
			this.parent.canWork = false;
			this.parent.canSchool = false;
			this.parent.alive = false;
		} else {
			if(this.deathChance < 20) {
				this.deathChance += 1;  //the longer you have it, the chance of it killing you is increased.
			}
		}
	}
}

function HepA(ParentObj) {
	this.parent = ParentObj;
	this.__proto__ = new Disease(this.parent);
	//The description says what the disease is
	this.description = "You are afflicted with Hepatitis A";
	this.effect = "You are suffering from the effect of Hepatitis A."; //TODO
	this.deathChance = 10; //TODO
	this.duration = -1;
	this.affectWork = false;
	this.affectSchool = false;
	this.name = "hepA";
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		console.log(roll);
		if (roll <= this.deathChance) {
			this.parent.canWork = false;
			this.parent.canSchool = false;
			this.parent.alive = false;
		} else {
			if(this.deathChance < 20) {
				this.deathChance += 1;  //the longer you have it, the chance of it killing you is increased.
			}
		}
	}
}

function Dengal(ParentObj) {
	this.parent = ParentObj;
	this.__proto__ = new Disease(this.parent);
	//The description says what the disease is
	this.description = "You are afflicted with dengal";
	this.effect = "You are suffering from the effect of dengal."; //TODO
	this.deathChance = 10; //TODO
	this.duration = -1;
	this.affectWork = true;
	this.affectSchool = true;
	this.name = "dengal";
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		console.log(roll);
		if (roll <= this.deathChance) {
			this.parent.canWork = false;
			this.parent.canSchool = false;
			this.parent.alive = false;
		} else {
			if(this.deathChance < 20) {
				this.deathChance += 1;  //the longer you have it, the chance of it killing you is increased.
			}
		}
	}
}