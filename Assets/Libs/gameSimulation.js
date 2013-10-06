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
	
	this.canvas = document.getElementById('simScreen');
	this.ctx = this.canvas.getContext('2d');
	
	this.firstTimer = 0;
	this.firstMax = 5;
	
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
	
	this.keyup = function(which){
		if(this.gameStates.choose && which==13){
		this.gameStates.choose = false;
		this.gameStates.roll = true;
		}
	}
	
	that.mouseup = function(){
		if(that.gameStates.first){
			that.firstTimer = 499;
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
		
		}
		else if(this.gameStates.explain){
		
		}
		else if(this.gamestates.endCase){
		
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
		}
		else if(this.gameStates.roll){
		
		}
		else if(this.gameStates.explain){
		
		}
		else if(this.gamestates.endCase){
		
		}
	}
}
var warrap = new gameSimulation();
warrap.canvas.addEventListener('mouseup',warrap.mouseup,false);

function play(){
	warrap.update();
	warrap.draw();
}
var interval = setInterval(play,1000/60);