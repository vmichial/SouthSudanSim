/*
			Scene Class

	Organizes what you see into scenes. You can add more to
		an instance of the class & swap between them.
*/


var debug_scene_show_connections=true; // DEBUG

var Scene=function(id) {
	/*
		Public vars
	*/
	this.id='';

	this.mid={ x: undefined, y: undefined };
	this.scale={ x: 1, y: 1 }; // scale to this size [1=normal]
	this.pos={ x: 0, y: 0 };
	this.vel=4;

	this.pause=false;
	this.hide=false;


	// Custom actions to take for step() or draw()
	this.onStep=undefined;
	this.onDraw=undefined;



	/*
		Private vars
	*/
	this._entArr=[];
	this._entMap={};



	/*
			Public methods
	*/
	this.Scene=function(id) {
		if(id==undefined) {
			throw (this.id+': Constructor Scene(id) No ID given'); // DEBUG
			return;
		}

		this.id=id;
		this.__whatami='class Scene "'+id+'"';
	}

	this.addEnt=function(entity) {
		if(typeof entity!='object') throw (this.id+': addEnt(entity) parameter "entity" must be a class Entity'); // DEBUG
		var id=entity.id;
		if(typeof id!='string') throw (this.id+': addEnt(entity) parameter "entity.id" must be a string; got a typeof('+id+')=='+typeof id); // DEBUG
		mapAdd(this._entArr, this._entMap, entity, function(obj) { return obj.id; });
		if(debug_scene_show_connections) console.log('Scene('+this.id+') <-- Ent('+entity.id+')'); // DEBUG
	}
	this.getEnt=function(id) {
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': getEnt(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		return mapGet(this._entArr, this._entMap, id);
	}
	this.delEnt=function(id) {
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': delEnt(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		mapDel(this._entArr, this._entMap, id, function(obj) { return obj.id; });
		if(debug_scene_show_connections) console.log('Scene('+this.id+') -X- Ent('+entity.id+')'); // DEBUG
	}


	// Copy & paste from Entity.js  [all changes should reflect that]
	this.step=function() {
		if(this.pause) return;
		if(this.onStep!=undefined) this.onStep();
		else this.stepDefault();
	}
	// Default step all entities
	this.stepDefault=function() {
		for(var i=0; i<this._entArr.length; ++i) this._entArr[i].step();
	}

	// Drawing
	// Copy & paste from Entity.js  [all changes should reflect that]
	this.draw=function(ctx, offset, scaleMul) {
		if(this.hide) return;

		if(offset==undefined) offset={ x: 0, y: 0 };
		var adjOffset=adjOff(this.pos, offset, scaleMul);

		if(scaleMul==undefined) scaleMul=1;
		var adjScale=vMul(this.scale, scaleMul);

		if(this.onDraw!=undefined) this.onDraw(ctx, adjOffset, adjScale);
		else this.drawDefault(ctx, adjOffset, adjScale);
	}

	// Default draw all entities
	this.drawDefault=function(ctx, adjOffset, adjScale) {
		for(var i=0; i<this._entArr.length; ++i) this._entArr[i].draw(ctx, adjOffset, adjScale);
	}


	// Movement
	// Copy & paste from Entity.js  [all changes should reflect that]
	this.translate=function(pos) {
		if(typeof pos!='object') throw (this.id+': translate(pos) pos must be an XY struct'); // DEBUG
		if(typeof pos.x!='number') throw (this.id+': translate(pos) parameter "pos.x" must be a number; got a typeof('+pos.x+')=='+typeof pos.x); // DEBUG
		if(typeof pos.y!='number') throw (this.id+': translate(pos) parameter "pos.y" must be a number; got a typeof('+pos.y+')=='+typeof pos.y); // DEBUG
		this.pos=pos;
	}
	// Animates 1 step of a move towards a position [the whole scene]
	// Copy & paste from Entity.js  [all changes should reflect that]
	this.move=function(destPos) {
		if(typeof destPos!='object') throw (this.id+': move(destPos) destPos must be an XY struct'); // DEBUG
		if(typeof destPos.x!='number') throw (this.id+': move(destPos) parameter "destPos.x" must be a number; got a typeof('+destPos.x+')=='+typeof destPos.x); // DEBUG
		if(typeof destPos.y!='number') throw (this.id+': move(destPos) parameter "destPos.y" must be a number; got a typeof('+destPos.y+')=='+typeof destPos.y); // DEBUG
		if(this.pause) return this.pos;

		var ang=angleOfPos(this.pos, destPos);

		var p1=this.pos.x-destPos.x;
		var p2=this.pos.y-destPos.y;
		var to=Math.sqrt(p1*p1+p2*p2);

		to=this.vel<to?this.vel:to;
		to*=g_px_m/g_fpsEngine;

		this.pos.x+=to*Math.cos(ang);
		this.pos.y-=to*Math.sin(ang);

		return destPos.x.toFixed(1)==this.pos.x.toFixed(1)&&destPos.y.toFixed(1)==this.pos.y.toFixed(1);
	}


	// Angles
	this.face=function(destAng) {
		// Will not implement
		throw ('Will not implement Scene.face()');
	}
	this.turn=function(destAng) {
		throw ('Will not implement Scene.turn()');
	}


	// Zoom at a position
	// EXPERIMENTAL: It does not work perfectly
	this.zoomAt=function(pos, newScale) {
		var offOri, offNew, offDiff;
		var oldScale={ x: this.scale.x, y: this.scale.y };
		this.scale={ x: newScale.x, y: newScale.y };

		offOri=unadjOff(vAdd(pos, vNeg(this.pos)), { x: 0, y: 0 }, oldScale);
		offNew=unadjOff(vAdd(pos, vNeg(this.pos)), { x: 0, y: 0 }, newScale);
		offDiff=vAdd(offOri, vNeg(offNew));

		this.pos.x-=offDiff.x;
		this.pos.y-=offDiff.y;
	}


	// Hitbox for something like clicking
	this.hitPos=function(targetPos, offset, scaleMul) {
		if(typeof targetPos!='object') throw (this.id+': hitWhat(targetPos) targetPos must take a number or an XY struct'); // DEBUG
		if(typeof targetPos.x!='number') throw (this.id+': hitWhat(targetPos) parameter "targetPos.x" must be a number; got a typeof('+targetPos.x+')=='+typeof targetPos.x); // DEBUG
		if(typeof targetPos.y!='number') throw (this.id+': hitWhat(targetPos) parameter "targetPos.y" must be a number; got a typeof('+targetPos.y+')=='+typeof targetPos.y); // DEBUG
		// DEBUG
		if(offset==undefined) offset={ x: 0, y: 0 };
		if(scaleMul==undefined) scaleMul=1;

		var list={ i: -1, d: 0 };
		var adjOffset=adjOff(this.pos, offset, scaleMul);

		for(var i=0; i<this._entArr.length; ++i) {
			var dist=this._entArr[i].hitPos(targetPos, adjOffset, vMul(this.scale, scaleMul));

			if(typeof dist!='boolean') {
				if(dist<list.d||list.i==-1) {
					list.i=i;
					list.d=dist;
				}
			}
		}

		return list.i;
	}



	/*
			Private methods
	*/



	// Constructor
	this.Scene(id);
	this.__whatami='class Scene';
}