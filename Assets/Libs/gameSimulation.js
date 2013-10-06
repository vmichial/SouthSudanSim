/*
	this simulation will work in this way, you init the gameSimulation
	which deletes the gamestates and deletes the 

*/

var mouse = {x:126,y:200};
function gameSimulation(){
	this.manager;
	this.id = 'theTrail';
	this.warrap = new Environment();
	
	
	this.init = function(){
	
	}
	
	//this will make the manager goto next scene.... this.manager.select('id');
	//this.manager.selectLast() will make the manager goto the last scene
	this.environment = new Environment(this);
	this.gameStates = {
		first : true,
		choose 	: false,
		roll	: false,
		explain	: false		
	}
	
	this.keyup = function(which){
		if(this.gameStates.choose && which==13){
		this.gameStates.choose = false;
		this.gameStates.roll = true;
		}
	}
	
	this.mouseup = function(){
		
	}
	this.update = function(){
	
	}
	this.draw = function(ctx){
		
	}
}