var Direction = function(X,Y){
	this.x = X;
	this.y = Y;
}
//start drawing from xy
var Start = function(X,Y){
	this.x = X;
	this.y = Y;
}
//approach drawing at target xy
var Target = function(X,Y){
	this.x = X;
	this.y = Y;
}
			
var Cut = function(IMAGE,Duration,direction,Start,Target){
	this.image = IMAGE;//new Image(); //SAKI instead of a generic new Image with no source attribute, use the IMAGE you passed in as a parameter
	this.direct = direction
	this.duration = Duration;
	this.start = Start;
	this.target = Target;
}

//create an array of cut objects, pass that in as the parameter when you make a cutscene
//cutscene objects are put into the scene object
var cutScene = function(Cuts){
	this.Canvas = document.getElementById("simScreen");
	this.ctx = this.Canvas.getContext('2d');
	//var that = this;
	this.cuts = Cuts;
	this.currentCut = 0;
	this.timer = 0;
	this.speed = 0;
	this.x = 0;
	this.y = 0;
	
	this.parent;
	this.manager;
	
	this.update = function(){
	console.log("YO DAWG");
	//update will perform the timed movements of the panning
	this.timer++;
		
	if(this.timer >= (60*(this.cuts[this.currentCut].duration))){
	this.currentCut++;
	this.timer = 0;
	this.x = 0;
	this.y = 0;
	console.log("TIMES UP");
	
	}
	else{
		console.log("MOVE");
		if(this.x < this.cuts[this.currentCut].target.x){
				console.log("XMOVE old",this.x);//TODO
				this.x+= this.speed*(this.cuts[this.currentCut].direct.x);
				console.log("XMOVE now",this.x);//TODO
			}
		if(this.y < this.cuts[this.currentCut].target.y){
				console.log("XMOVE old",this.y);//TODO
				this.y+= this.speed*(this.cuts[this.currentCut].direct.y);
				console.log("YMOVE now",this.y);//TODO
			}
	}
					
					
				
	}
				
	this.draw = function(){
		this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
		console.log("Draw time!");
		//ctx.drawImage(this.cuts[this.currentCut].image,-(this.cuts[this.currentCut].start.x),-(this.cuts[this.currentCut].start.y) );
		this.ctx.drawImage(this.cuts[this.currentCut].image,-(this.x),-(this.y) );

		console.log("AFTER DRAW!!!");
	}
}