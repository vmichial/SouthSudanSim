/*
			Scene Manager
	
	Manages all the scenes that exists
*/

var canvas, ctx;

var SceneManager=function(){
	/*
			Public vars
	*/
	
	
	/*
			Private vars
	*/
	this.id='SceneManager';
	this.current=0;
	this.last=0;
	
	this._sceneArr=[];
	this._sceneMap={};
	
	

	/*
			Public methods
	*/
	this.init=function(){
		canvas=$('#canvas')[0];
		ctx=canvas.getContext('2d');
		
		
		this.makeScene=function(id, func){
			s_scene=new Scene(id);
			s_scene.manager=this;
			
			s_scene.init=func;
			s_scene.init();

			return s_scene;
		}
		
		// Title screen
		this.addScene(this.makeScene('titlemenu', titlemenu_init));
		// Credits screen
		this.addScene(this.makeScene('credits', credits_init));
		// Levels
		warrap = new gameSimulation();
		warrap.parent=s_scene;
		this.addScene(warrap);
	}
	
	
	// Scene management
	this.addScene=function(scene) {
		if(typeof scene!='object') throw (this.id+': addScene(scene) parameter "scene" must be a class Scene'); // DEBUG
		var id=scene.id;
		if(typeof id!='string') throw (this.id+': addScene(scene) parameter "scene.id" must be a string; got a typeof('+id+')=='+typeof id); // DEBUG
		mapAdd(this._sceneArr, this._sceneMap, scene, function(obj) { return obj.id; });
		if(debug_ent_show_connections) console.log('Manager <-- Scene('+scene.id+')'); // DEBUG
	}
	this.getScene=function(id) {
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': getScene(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		return mapGet(this._sceneArr, this._sceneMap, id);
	}
	this.delScene=function(id) {
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': delScene(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		mapDel(this._sceneArr, this._sceneMap, id, function(obj) { return obj.id; });
		if(debug_ent_show_connections) console.log('Manager -X- Scene('+scene.id+')'); // DEBUG
	}
	
	
	// Scene interactions
	
	this.select=function(id){
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': select(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		var past=this.current;
		if(typeof id=='number') this.current=id;
		else this.current=this._sceneMap[id];
		if(this.current==undefined || this.current<0 || this._sceneArr.length<=this.current){ // Invalid range, revert
			throw (this.id+': select(id) parameter "id" was not found'); // DEBUG
		}
		
		this.last=this.current;
		return this.current;
	}
	this.selectLast=function(){
		this.current=this.last;
		return this.current;
	}
	
	
	
	this.update=function(){
		this.getScene(this.current).step();
	};
	
	this.draw=function(ctx){
		this.getScene(this.current).draw(ctx);
	};
	
	
	this.keyup=function(which){
		var s=this._sceneArr[this.current];
		if(s.keyup) s.keyup(which);
	}
	
	this.mouseup=function(){
		var s=this._sceneArr[this.current];
		if(s.mouseup) s.mouseup();
	}
	
	
	
	/*
			Private methods
	*/
	
	
}