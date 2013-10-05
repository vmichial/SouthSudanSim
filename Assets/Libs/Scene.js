function Scene(Type,NAME){
	//this is set by the scene manager, and will hold a reference to said manager
	this.parent;
	this.canvas;
	this.context;
	
	this.name = NAME;

	var that = this;
    //defines the type of scene, a string with either, END,CUT,LEVEL,MENU
    this.type =Type;
    
    //the Level Object, check the structures to get a rundown on this(coming soon)
    this.Level;

    //the Menu Object, check the structures to get a rundown on this(coming soon)
    this.TheMenu;

    //The cutscene obeject,check the structures for more info
    this.Cinematic ;

    //coreSounds hold references to all of the core sounds everyone can have
    this.coreSounds;

    //custom sounds hold references to all sounds unique to this particular scene.
    //custom sounds should be set in initialization by the creator of the scene
    this.customSounds = new Array();

    //coreImages hold references to all of the core images needed for the basic game
    this.coreImages;

    //custom images hold references to all images unique to this particular scene.
    //custom images should be initialized by the creator of the scene
    this.customImages = new Array();
    
	//initialize function will call the init of the correct type, and give a loading screen
	//while you wait for assets to load
	this.init = function(){
		this.coreSounds = parent.coreSounds;
		this.coreImages = parent.coreImages;
	
	}
	this.initialize = function(){
	
	}
	
	this.clickHandler = function(events){
		switch(that.type){
			case "END":{} break;
			case "CUT":{} break;
			case "LEVEL":{} break;
			case "MENU":{} break;
			
		}
	}
	
	this.keyDownHandler = function(events){
		switch(that.type){
			case "END":{} break;
			case "CUT":{} break;
			case "LEVEL":{} break;
			case "MENU":{} break;
			
		}
	}
	
	this.keyUpHandler = function(evt){
		switch(that.type){
			case "END":{} break;
			case "CUT":{} break;
			case "LEVEL":{} break;
			case "MENU":{} break;
			
		}
	}
	//draw will draw based on what the type is
	this.draw = function(){
		switch(that.type){
			case "END":{} break;
			case "CUT":{} break;
			case "LEVEL":{this.Level.draw();} break;
			case "MENU":{} break;
			
		}
	}

	this.update = function(){
		switch(that.type){
			case "END":{} break;
			case "CUT":{} break;
			case "LEVEL":{this.Level.update();} break;
			case "MENU":{} break;
			
		}
	}
	this.addLevel = function(level){
		this.Level = level;
		level.parent = this;
	}
	this.addMenu = function(menu){
		this.TheMenu = menu;
		menu.parent = this;
	}
	this.addCut = function(cut){
		this.Cinematic = cut;
		cut.parent = this;
	}
}