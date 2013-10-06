function Disaster(env){
	this.parent = env;
	this.name;
	this.effect;
	this.noHospital;
	this.noSchool;
	this.noWork;
	this.applyEffect = function () {
		this.parent.family.supply -= 50;
	}
}

function Aid(env){
	this.parent = env;
	this.__proto__ = new Disaster(this.parent);
	this.name = "aid";
	this.effect = "You've got aid.";
	this.chance = 20;
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		if (roll < this.chance) {
			this.parent.family.supply += 15;
		}
	}
}

function Drought(env) {
	this.parent = env;
	this.__proto__ = new Disaster(this.parent);
	this.name = "drought";
	this.effect = "You are suffering from the effect of drought.";
	this.chance = 6;
	this.applyEffect = function () {
		var roll = Math.floor(Math.random * 101);
		if (roll < this.chance && this.parent.quarter == 1) {
			this.__proto__.applyEffect();
			
		}
	
	}

}

function Flood(env) {
	this.parent = env;
	this.__proto__ = new Disaster(this.parent);
	this.name = "flood";
	this.effect = "You are suffering from the effect of flood.";
	this.chance = 20;
	this.applyEffect = function() {
		var roll = Math.floor(Math.random() * 101);
		if (roll < this.chance && this.parent.quarter == 3) {
			this.__proto__.applyEffect();
			this.parent.school.available = false;
			this.parent.school.hasBuilding = false;
			this.parent.school.hasMats = false;
		} else {
			this.parent.school.available = true;
		}
	}

}