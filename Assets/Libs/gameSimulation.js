/*
	this simulation will work in this way, you init the gameSimulation
	which deletes the gamestates and deletes the 

*/

var s_game;
function gameSimulation(){
	this.id = 'theTrail';
	this.manager;
	var that = this;
	
	// ▼ Image initialization
	function mkimg(id){
		var ret=new Array();
		for(var i=0; 1; ++i){
			var e=$('#'+id+i);
			if(e.length) ret.push(e[0]);
			else break;
		}
		return ret;
	}
	
	var supplyImg = mkimg('supply');
	var girlImg = mkimg('girl');
	var sibImg = mkimg('sib');
	var villageImg = mkimg('village');
	var motherImg;
	var fatherImg = mkimg('father');
	var disIcon = mkimg('dis');
	var workImg = mkimg('work');
	var schoolImg = mkimg('school');
	var cowImg = mkimg('cow');
	var meatImg = mkimg('meat');
	var credImg = mkimg('credit');
	var teachImg = mkimg('teach');
	var goat = mkimg('goat');
	var deathImg = mkimg('grim');
	deathImg.push(document.getElementById("skull"));
	// ▲ Image initialization
	
	
	this.firstTimer;
	this.firstMax;
	this.explainTimer;
	this.explainMax;
	this.environment;
	this.gameStates;
	
	this.init = function(){
		this.firstTimer = 0;
		this.firstMax = 5;
		this.explainTimer = 0;
		this.explainMax = 20;
		
		this.environment = new Environment(this);
		this.gameStates = {
			first  : true,
			choose : false,
			roll   : false,
			explain: false,
			endCase: false
		}
	}
	this.init();
	
	that.keyup = function(which){
		switch(which){
		case 27: // Esc
			this.parent.select('titlemenu');
			break;
			
		case 32: // Space
			if(that.gameStates.first){
				that.gameStates.first = false;
				that.gameStates.choose = true;
				that.firstTimer = 0;
			}
			break;
			
		case 13: // Enter
			if(that.gameStates.choose){
				var roll = Math.floor(Math.random() * 101);
				for (var i = 0; i < s_game.environment.family.sib.length; i += 1) {
					if (roll < 50) {
						s_game.environment.family.sib[i].gotoWork();
					} else {
						s_game.environment.family.sib[i].gotoSchool();
					}
				}
				roll = Math.floor(Math.random() * 101);
				if (s_game.environment.family.father.alive) {
					if (roll < 50) {
						s_game.environment.family.father.gotoWork();
					} 
				}
				roll = Math.floor(Math.random() * 101);
				if (s_game.environment.family.mother.alive) {
					if (roll < 50) {
						s_game.environment.family.mother.gotoWork();
					} 
				}
				roll = Math.floor(Math.random() * 101);
				if (roll < 50) {
					s_game.environment.family.girl.gotoWork();
				} else {
					s_game.environment.family.girl.gotoSchool();
				}
				that.gameStates.choose = false;
				that.gameStates.roll = true;
			}
			break;
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
			s_game.environment.family.update();
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
			if(!s_game.environment.family.mother.alive){
				ctx.fillText("Your mother died bearing you as a child...", x,startY);
				startY+=60
			}			
			if(!s_game.environment.family.father.alive){
				ctx.fillText("Your Father died when you were younger....",x,startY);
				startY+=60;
			}
			
			ctx.fillText("You have "+(s_game.environment.family.sib.length)+ ((s_game.environment.family.sib.length==1)? " sibling." : " siblings."),x,startY);
			startY+=60;
			if(!s_game.environment.hospital.available){
				ctx.fillText("Your Area does not have a hospital nearby...", x , startY);
				startY+=60;
			}
			if(s_game.environment.school.far){
				ctx.fillText("Your School is a long walk away...", x , startY);
				startY+=60;
			}
			if(!s_game.environment.school.hasMats){
				ctx.fillText("Your School doesn't have adequate supplies...", x , startY);
				startY+=60;
			}
			if(!s_game.environment.school.hasBuilding){
				ctx.fillText("Your School does not have a building...", x , startY);
				startY+=60;
			}
			if(!s_game.environment.school.hasGoodTeacher){
				ctx.fillText("Your School doesn't have a well educated teacher...", x , startY);
				startY+=60;
			}
			if(!s_game.environment.school.feedStudents){
				ctx.fillText("Your School does not feed it's students...", x , startY);
				startY+=60;
			}						
		}
		else if(this.gameStates.choose){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			if (s_game.environment.flooded) {
					ctx.drawImage(villageImg[1], 0, 0, canvas.width, canvas.height);
			} else if (s_game.environment.droughted) {
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