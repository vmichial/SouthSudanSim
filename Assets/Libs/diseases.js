var numDisease = 10;
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


//HepA, HepE, Typhoid, Diarrhea, malaria, dengue, sleepSick, shisto, rabies, meningitis
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

function contractDis(ParentObj) {
	var roll = Math.floor(Math.random() * 101);
	var chance = 20; //TODO
	if (roll <= chance) {
		roll = Math.floor(Math.random() * 101);
		if (false){}
	}

}