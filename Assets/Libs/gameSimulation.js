/*
	this simulation will work in this way, you init the gameSimulation
	which deletes the gamestates and deletes the 

*/

var warrap; // Whats warrap?
function gameSimulation(){
	this.id = 'theTrail';
	this.manager;
	this.warrap = new Environment();
	
	var that = this;
	
	// ▼ Image initialization
	var supplyImg = new Array();
	for (var i = 0; i < 3; i += 1) supplyImg[i] = document.getElementById("supply" + i);
	var girlImg = new Array();
	for (var i = 0; i < 8; i += 1) girlImg[i] = document.getElementById("girl" + i);
	var sibImg = new Array();
	for (var i = 0; i < 2; i += 1) sibImg[i] = document.getElementById("sib" + i);
	var motherImg = new Array();
	var villageImg = new Array();
	for (var i = 0; i < 2; i += 1) villageImg[i] = document.getElementById("village" + i);
	var fatherImg = new Array();
	for (var i = 0; i < 2; i += 1) fatherImg[i] = document.getElementById("father" + i);
	var disIcon = new Array();
	for (var i = 0; i < 6; i += 1) disIcon[i] = document.getElementById("dis" + i);
	var workImg = new Array();
	for (var i = 0; i < 2; i += 1) workImg[i] = document.getElementById("work" + i);
	var schoolImg = new Array();
	for (var i = 0; i < 2; i += 1) schoolImg[i] = document.getElementById("school" + i);
	var cowImg = new Array();
	for (var i = 0; i < 2; i += 1) cowImg[i] = document.getElementById("cow" + i);
	var meatImg = new Array();
	for (var i = 0; i < 2; i += 1) meatImg[i] = document.getElementById("meat" + i);
	var credImg = new Array();
	for (var i = 0; i < 1; i += 1) credImg[i] = document.getElementById("credit" + i);
	var teachImg = new Array();
	for (var i = 0; i < 2; i += 1) teachImg[i] = document.getElementById("teach" + i);
	var deathImg = new Array();
	deathImg[0] = document.getElementById("grim0");
	deathImg[1] = document.getElementById("skull");
	var goat = document.getElementById("goat0");
	// ▲ Image initialization
	
	this.firstTimer = 0;
	this.firstMax = 20;
	this.explainTimer = 0;
	this.explainMax = 20;

	//this will make the manager goto next scene.... this.manager.select('id');
	//this.manager.selectLast() will make the manager goto the last scene
	this.environment = new Environment(this);
	this.gameStates = {
		first : true,
		choose 	: false,
		roll	: false,
		explain	: false,
		endCase : false
	}
	this.init = function(){
		// Reference problem: this refers to the obect "init", rather than the parent

		warrap.firstTimer = 0;
		warrap.firstMax = 5;
		warrap.explainTimer = 0;
		warrap.explainMax = 20;
		
		warrap.environment = new Environment(warrap);
		warrap.gameStates = {
			first : true,
			choose 	: false,
			roll	: false,
			explain	: false,
			endCase : false
		}
	}
	
	that.keyup = function(which){
		console.log(which);
		if(that.gameStates.first && which==32){
			that.gameStates.first = false;
			that.gameStates.choose = true;
			that.firstTimer = 0;
		}
		if(that.gameStates.choose && which==13){
			var roll = Math.floor(Math.random() * 101);
			for (var i = 0; i < that.warrap.family.sib.length; i += 1) {
				if (roll < 50) {
					that.warrap.family.sib[i].gotoWork();
				} else {
					that.warrap.family.sib[i].gotoSchool();
				}
			}
			roll = Math.floor(Math.random() * 101);
			if (that.warrap.family.father.alive) {
				if (roll < 50) {
					that.warrap.family.father.gotoWork();
				} 
			}
			roll = Math.floor(Math.random() * 101);
			if (that.warrap.family.mother.alive) {
				if (roll < 50) {
					that.warrap.family.mother.gotoWork();
				} 
			}
			roll = Math.floor(Math.random() * 101);
			if (roll < 50) {
				that.warrap.family.girl.gotoWork();
			} else {
				that.warrap.family.girl.gotoSchool();
			}
			that.gameStates.choose = false;
			that.gameStates.roll = true;
			
		} 
	}
	
	that.mouseup = function(){
		if(that.gameStates.first){
			that.firstTimer = 499;
		}
		else if (that.gameStates.choose) {
			
		}
		else if(that.gameStates.roll){
		
		} else if(that.gameStates.explain){
			that.explainTimer = 0;
			that.gameStates.explain = false;
			that.gameStates.endCase = true;
		}
	}
	this.update = function(){
		if(this.gameStates.first){
			if(this.firstTimer >= 60*this.firstMax){
				this.gameStates.first = false;
				this.gameStates.choose = true;
				this.firstTimer = 0;
			}
			else{this.firstTimer++;}
		}
		else if(this.gameStates.choose){
		
		}
		else if(this.gameStates.roll){
			this.warrap.family.update();
			this.gameStates.roll = false;
			this.gameStates.explain = true;
		}
		else if(this.gameStates.explain){
			if (this.explainTimer >= 60 * this.explainMax) {
				this.gameStates.explain = false;
				this.gameStates.endCase = true;
			} else {
				this.explainTimer += 1;
			}
		}
		else if(this.gameStates.endCase){
			this.gameStates.endCase = false;
			this.gameStates.choose = true;
		}
	}
	this.step=this.update; // Lazy alias, due to code merge
	this.draw = function(ctx){
		if(this.gameStates.first){
			var startY = 60;
			var x = (canvas.width/2)-500;
			ctx.font ='45px Arial';
			ctx.fillStyle = 'black';
			ctx.fillRect(0,0,1024,768);
			ctx.fillStyle = 'white';
			if(!this.warrap.family.mother.alive){
				ctx.fillText("Your mother died bearing you as a child...", x,startY);
				startY+=60
			}			
			if(!this.warrap.family.father.alive){
				ctx.fillText("Your Father died when you were younger....",x,startY);
				startY+=60;
			}
			
			ctx.fillText("You have "+(this.warrap.family.sib.length)+ ((this.warrap.family.sib.length==1)? " sibling." : " siblings."),x,startY);
			startY+=60;
			if(!this.warrap.hospital.available){
				ctx.fillText("Your Area does not have a hospital nearby...", x , startY);
				startY+=60;
			}
			if(this.warrap.school.far){
				ctx.fillText("Your School is a long walk away...", x , startY);
				startY+=60;
			}
			if(!this.warrap.school.hasMats){
				ctx.fillText("Your School doesn't have adequate supplies...", x , startY);
				startY+=60;
			}
			if(!this.warrap.school.hasBuilding){
				ctx.fillText("Your School does not have a building...", x , startY);
				startY+=60;
			}
			if(!this.warrap.school.hasGoodTeacher){
				ctx.fillText("Your School doesn't have a well educated teacher...", x , startY);
				startY+=60;
			}
			if(!this.warrap.school.feedStudents){
				ctx.fillText("Your School does not feed it's students...", x , startY);
				startY+=60;
			}						
		}
		else if(this.gameStates.choose){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			if (this.warrap.flooded) {
					ctx.drawImage(villageImg[1], 0, 0, canvas.width, canvas.height);
			} else if (this.warrap.droughted) {
					ctx.drawImage(workImg[0], 0, 0, canvas.width, canvas.height);
			} else {
					ctx.drawImage(villageImg[0], 0, 0, canvas.width, canvas.height);
			}
		}
		else if(this.gameStates.roll){
			ctx.fillStyle = 'green';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
		else if(this.gameStates.explain){
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
		else if(this.gameStates.endCase){
			ctx.fillStyle = 'blue';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
	}
}