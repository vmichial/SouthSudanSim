/*
	this simulation will work in this way, you init the gameSimulation
	which deletes the gamestates and deletes the 

*/



var mouse = {x:126,y:200};
function gameSimulation(){
	var that = this;
	this.manager;
	this.id = 'theTrail';
	this.warrap = new Environment();
	console.log(this.warrap);
	var supplyImg = new Array();
	for (var i = 0; i < 3; i += 1) {
		supplyImg[i] = document.getElementById("supply" + i);
	}
	var girlImg = new Array();
	for (var i = 0; i < 8; i += 1) {
		girlImg[i] = document.getElementById("girl" + i);
	}
	var sibImg = new Array();
	for (var i = 0; i < 2; i += 1) {
		sibImg[i] = document.getElementById("sib" + i);
	}
	var motherImg = new Array();
	var villageImg = new Array();
	for (var i = 0; i < 2; i += 1) {
		villageImg[i] = document.getElementById("village" + i);
	}
	var fatherImg = new Array();
	for (var i = 0; i < 2; i += 1) {
		fatherImg[i] = document.getElementById("father" + i);
	}
	var disIcon = new Array();
	for (var i = 0; i < 6; i += 1) {
		disIcon[i] = document.getElementById("dis" + i);
	}
	var workImg = new Array();
	for (var i = 0; i < 2; i += 1) {
		workImg[i] = document.getElementById("work" + i);
	}
	var schoolImg = new Array();
	for (var i = 0; i < 2; i += 1) {
		schoolImg[i] = document.getElementById("school" + i);
	}
	var cowImg = new Array();
	for (var i = 0; i < 2; i += 1) {
		cowImg[i] = document.getElementById("cow" + i);
	}
	var meatImg = new Array();
	for (var i = 0; i < 2; i += 1) {
		meatImg[i] = document.getElementById("meat" + i);
	}
	var credImg = new Array();
	for (var i = 0; i < 1; i += 1) {
		credImg[i] = document.getElementById("credit" + i);
	}
	var teachImg = new Array();
	for (var i = 0; i < 2; i += 1) {
		teachImg[i] = document.getElementById("teach" + i);
	}
	var deathImg = new Array();
	deathImg[0] = document.getElementById("grim0");
	deathImg[1] = document.getElementById("skull");
	var goat = document.getElementById("goat0");
	this.canvas = document.getElementById('simScreen');
	this.ctx = this.canvas.getContext('2d');
	
	this.firstTimer = 0;
	this.firstMax = 20;
	this.explainTimer = 0;
	this.explainMax = 20;
	this.init = function(){
	
	}
	
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
	
	that.keyup = function(which){
		if(that.gameStates.first && which.keyCode == 32){
			that.gameStates.first = false;
			that.gameStates.choose = true;
			that.firstTimer = 0;
		}
		if(that.gameStates.choose && which.keyCode ==13){
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
	this.draw = function(ctx){
		if(this.gameStates.first){
			var startY = 60;
			var x = (this.canvas.width/2)-500;
			this.ctx.font ='45px Arial';
			this.ctx.fillStyle = 'black';
			this.ctx.fillRect(0,0,1024,768);
			this.ctx.fillStyle = 'white';
			if(!this.warrap.family.mother.alive){
				this.ctx.fillText("Your mother died bearing you as a child...", x,startY);
				startY+=60
			}			
			if(!this.warrap.family.father.alive){
				this.ctx.fillText("Your Father died when you were younger....",x,startY);
				startY+=60;
			}
			
			this.ctx.fillText("You have "+(this.warrap.family.sib.length)+ ((this.warrap.family.sib.length==1)? " sibling." : " siblings."),x,startY);
			startY+=60;
			if(!this.warrap.hospital.available){
				this.ctx.fillText("Your Area does not have a hospital nearby...", x , startY);
				startY+=60;
			}
			if(this.warrap.school.far){
				this.ctx.fillText("Your School is a long walk away...", x , startY);
				startY+=60;
			}
			if(!this.warrap.school.hasMats){
				this.ctx.fillText("Your School doesn't have adequate supplies...", x , startY);
				startY+=60;
			}
			if(!this.warrap.school.hasBuilding){
				this.ctx.fillText("Your School does not have a building...", x , startY);
				startY+=60;
			}
			if(!this.warrap.school.hasGoodTeacher){
				this.ctx.fillText("Your School doesn't have a well educated teacher...", x , startY);
				startY+=60;
			}
			if(!this.warrap.school.feedStudents){
				this.ctx.fillText("Your School does not feed it's students...", x , startY);
				startY+=60;
			}						
		}
		else if(this.gameStates.choose){
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			if (this.warrap.flooded) {
					this.ctx.drawImage(villageImg[1], 0, 0, this.canvas.width, this.canvas.height);
			} else if (this.warrap.droughted) {
					this.ctx.drawImage(workImg[0], 0, 0, this.canvas.width, this.canvas.height);
			} else {
					this.ctx.drawImage(villageImg[0], 0, 0, this.canvas.width, this.canvas.height);
			}
		}
		else if(this.gameStates.roll){
			this.ctx.fillStyle = 'green';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
		else if(this.gameStates.explain){
			this.ctx.fillStyle = 'black';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
		else if(this.gameStates.endCase){
			this.ctx.fillStyle = 'blue';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
}
var warrap = new gameSimulation();
warrap.canvas.addEventListener('mouseup',warrap.mouseup,false);
var body = document.getElementById("body");
body.addEventListener('keyup', warrap.keyup, false);

function play(){
	warrap.update();
	warrap.draw();
}
var interval = setInterval(play,1000/60);
