// FPS that the processing engine is set to [it affects everything's FPS]
var g_fpsEngine=60;

// Global FPS that all textures default to
var g_fpsTextureDefault=16;

// Global definition of a meter [pixels/meter]
var g_px_m=32;
var g_r_s=Math.PI*2;



// Simple vector operations
function vAdd(a, b) {
	if(a==undefined) throw ('vAdd(a, b) a must be a scaler or an XY struct'); // DEBUG
	if(b==undefined) throw ('vAdd(a, b) b must be a scaler or an XY struct'); // DEBUG
	if(typeof a!='number') { // DEBUG
		if(typeof a!='object') throw ('vAdd(a, b) a must take a number or an XY struct'); // DEBUG
		if(typeof a.x!='number') throw ('vAdd(a, b) parameter "a.x" must be a number; got a typeof('+a.x+')=='+typeof a.x); // DEBUG
		if(typeof a.y!='number') throw ('vAdd(a, b) parameter "a.y" must be a number; got a typeof('+a.y+')=='+typeof a.y); // DEBUG
	} // DEBUG
	if(typeof b!='number') { // DEBUG
		if(typeof b!='object') throw ('vAdd(a, b) b must take a number or an XY struct'); // DEBUG
		if(typeof b.x!='number') throw ('vAdd(a, b) parameter "b.x" must be a number; got a typeof('+b.x+')=='+typeof b.x); // DEBUG
		if(typeof b.y!='number') throw ('vAdd(a, b) parameter "b.y" must be a number; got a typeof('+b.y+')=='+typeof b.y); // DEBUG
	} // DEBUG
	// DEBUG
	if(typeof a=='number') {
		if(typeof b=='number') {
			return a+b;
		} else {
			return { x: a+b.x, y: a+b.y };
		}
	} else {
		if(typeof b=='number') {
			return { x: a.x+b, y: a.y+b };
		} else {
			return { x: a.x+b.x, y: a.y+b.y };
		}
	}
}
function vMul(a, b) {
	if(a==undefined) throw ('vMul(a, b) a must be a scaler or an XY struct'); // DEBUG
	if(b==undefined) throw ('vMul(a, b) b must be a scaler or an XY struct'); // DEBUG
	if(typeof a!='number') { // DEBUG
		if(typeof a!='object') throw ('vMul(a, b) a must take a number or an XY struct'); // DEBUG
		if(typeof a.x!='number') throw ('vMul(a, b) parameter "a.x" must be a number; got a typeof('+a.x+')=='+typeof a.x); // DEBUG
		if(typeof a.y!='number') throw ('vMul(a, b) parameter "a.y" must be a number; got a typeof('+a.y+')=='+typeof a.y); // DEBUG
	} // DEBUG
	if(typeof b!='number') { // DEBUG
		if(typeof b!='object') throw ('vMul(a, b) b must take a number or an XY struct'); // DEBUG
		if(typeof b.x!='number') throw ('vMul(a, b) parameter "b.x" must be a number; got a typeof('+b.x+')=='+typeof b.x); // DEBUG
		if(typeof b.y!='number') throw ('vMul(a, b) parameter "b.y" must be a number; got a typeof('+b.y+')=='+typeof b.y); // DEBUG
	} // DEBUG
	// DEBUG
	if(typeof a=='number') {
		if(typeof b=='number') {
			return a*b;
		} else {
			return { x: a*b.x, y: a*b.y };
		}
	} else {
		if(typeof b=='number') {
			return { x: a.x*b, y: a.y*b };
		} else {
			return { x: a.x*b.x, y: a.y*b.y };
		}
	}
}
function vNeg(a) {
	if(a==undefined) throw ('vMul(a, b) a must be a scaler or an XY struct'); // DEBUG
	if(typeof a!='number') { // DEBUG
		if(typeof a!='object') throw ('vMul(a, b) a must take a number or an XY struct'); // DEBUG
		if(typeof a.x!='number') throw ('vMul(a, b) parameter "a.x" must be a number; got a typeof('+a.x+')=='+typeof a.x); // DEBUG
		if(typeof a.y!='number') throw ('vMul(a, b) parameter "a.y" must be a number; got a typeof('+a.y+')=='+typeof a.y); // DEBUG
	} // DEBUG
	// DEBUG
	if(typeof a=='number') {
		return -a;
	} else {
		return { x: -a.x, y: -a.y };
	}
}
function vInv(a) {
	if(a==undefined) throw ('vMul(a, b) a must be a scaler or an XY struct'); // DEBUG
	if(typeof a!='number') { // DEBUG
		if(typeof a!='object') throw ('vMul(a, b) a must take a number or an XY struct'); // DEBUG
		if(typeof a.x!='number') throw ('vMul(a, b) parameter "a.x" must be a number; got a typeof('+a.x+')=='+typeof a.x); // DEBUG
		if(typeof a.y!='number') throw ('vMul(a, b) parameter "a.y" must be a number; got a typeof('+a.y+')=='+typeof a.y); // DEBUG
	} // DEBUG
	// DEBUG
	if(typeof a=='number') {
		return 1/a;
	} else {
		return { x: 1/a.x, y: 1/a.y };
	}
}

// Adjust offset for global to local positions
function adjOff(lPos, gPos, gScale) {
	if(lPos!=undefined) { // DEBUG
		if(typeof lPos!='object') throw ('adjOff(lPos, gPos, gScale) lPos must be an XY struct or be undefined'); // DEBUG
		if(typeof lPos.x!='number') throw ('adjOff(lPos, gPos, gScale) parameter "lPos.x" must be a number; got a typeof('+lPos.x+')=='+typeof lPos.x); // DEBUG
		if(typeof lPos.y!='number') throw ('adjOff(lPos, gPos, gScale) parameter "lPos.y" must be a number; got a typeof('+lPos.y+')=='+typeof lPos.y); // DEBUG
	} // DEBUG
	if(gPos!=undefined) { // DEBUG
		if(typeof gPos!='object') throw ('adjOff(lPos, gPos, gScale) gPos must be an XY struct or be undefined'); // DEBUG
		if(typeof gPos.x!='number') throw ('adjOff(lPos, gPos, gScale) parameter "gPos.x" must be a number; got a typeof('+gPos.x+')=='+typeof gPos.x); // DEBUG
		if(typeof gPos.y!='number') throw ('adjOff(lPos, gPos, gScale) parameter "gPos.y" must be a number; got a typeof('+gPos.y+')=='+typeof gPos.y); // DEBUG
	} // DEBUG
	if(gScale!=undefined) { // DEBUG
		if(typeof gScale!='number') { // DEBUG
			if(typeof gScale!='object') throw ('adjOff(lPos, gPos, gScale) gScale must be an XY struct or integer'); // DEBUG
			if(typeof gScale.x!='number') throw ('adjOff(lPos, gPos, gScale) parameter "gScale.x" must be a number; got a typeof('+gScale.x+')=='+typeof gScale.x); // DEBUG
			if(typeof gScale.y!='number') throw ('adjOff(lPos, gPos, gScale) parameter "gScale.y" must be a number; got a typeof('+gScale.y+')=='+typeof gScale.y); // DEBUG
		} // DEBUG
	} // DEBUG
	// DEBUG
	if(gScale==undefined) gScale=1;
	return vAdd(vMul(gScale, lPos), gPos);
}
function unadjOff(adjPos, gPos, gScale) {
	if(adjPos!=undefined) { // DEBUG
		if(typeof adjPos!='object') throw ('unadjOff(adjPos, gPos, gScale) adjPos must be an XY struct or be undefined'); // DEBUG
		if(typeof adjPos.x!='number') throw ('unadjOff(adjPos, gPos, gScale) parameter "adjPos.x" must be a number; got a typeof('+adjPos.x+')=='+typeof adjPos.x); // DEBUG
		if(typeof adjPos.y!='number') throw ('unadjOff(adjPos, gPos, gScale) parameter "adjPos.y" must be a number; got a typeof('+adjPos.y+')=='+typeof adjPos.y); // DEBUG
	} // DEBUG
	if(gPos!=undefined) { // DEBUG
		if(typeof gPos!='object') throw ('unadjOff(adjPos, gPos, gScale) gPos must be an XY struct or be undefined'); // DEBUG
		if(typeof gPos.x!='number') throw ('unadjOff(adjPos, gPos, gScale) parameter "gPos.x" must be a number; got a typeof('+gPos.x+')=='+typeof gPos.x); // DEBUG
		if(typeof gPos.y!='number') throw ('unadjOff(adjPos, gPos, gScale) parameter "gPos.y" must be a number; got a typeof('+gPos.y+')=='+typeof gPos.y); // DEBUG
	} // DEBUG
	if(typeof gScale!='number') { // DEBUG
		if(typeof gScale!='object') throw ('unadjOff(adjPos, gPos, gScale) gScale must be an XY struct or integer'); // DEBUG
		if(typeof gScale.x!='number') throw ('unadjOff(adjPos, gPos, gScale) parameter "gScale.x" must be a number; got a typeof('+gScale.x+')=='+typeof gScale.x); // DEBUG
		if(typeof gScale.y!='number') throw ('unadjOff(adjPos, gPos, gScale) parameter "gScale.y" must be a number; got a typeof('+gScale.y+')=='+typeof gScale.y); // DEBUG
	} // DEBUG
	// DEBUG
	return vMul(vAdd(adjPos, vNeg(gPos)), vInv(gScale));
}


// Gives an array the ability to searched in constant time
//    Need a associative array to pair with it
function mapAdd(arr, map, obj, callbackGetID) {
	if(typeof callbackGetID!='function') throw ('mapAdd() missing callback function to get an object\'s ID'); // DEBUG
	var id=callbackGetID(obj);
	var key=map[id];
	if(key==undefined) {
		map[id]=arr.length; // Add the map key
		arr.push(obj); // Push a new object
	} else {
		arr[key]=obj;
	}
}
function mapGet(arr, map, id) {
	if(typeof id=='number') {
		return arr[id];
	} else {
		var key=map[id];
		var result=arr[key];
		if(result==undefined) console.log('mapGet() could not find "'+id+'"'); // DEBUG
		return result;
	}
}
function mapDel(arr, map, id, callbackGetID) {
	if(typeof callbackGetID!='function') throw ('mapAdd() missing callback function to get an object\'s ID'); // DEBUG
	var delKey;
	if(typeof id=='number') {
		delKey=id;
		id=arr[delKey].id;
		if(arr.length<=delKey) throw ('mapDel() out of bound exception');
	} else {
		delKey=map[id]; // Find where it is
		if(delKey==undefined) throw ('mapDel() could not find "'+id+'"');
	}
	delete map[id]; // Delete it completely
	delete arr[delKey];
	if(1<arr.length) { // If not empty, close gap
		var swapKey=arr.length-1-(arr.length-1==delKey?1:0); // might the gap be the last slot?

		//console.log('------------------------');
		//console.log(id); // useless ID thats deleted
		//console.log(delKey+' <-- '+swapKey); // keys to swap
		//console.log(arr);
		//console.log(map);
		//console.log('------------------------');

		id=callbackGetID(arr[swapKey]);
		arr[delKey]=arr[swapKey]; // Swap the end to the left
		map[id]=delKey;
	}
	arr.splice(arr.length-1, 1);
}


// Shift the angle from negative or large values
//		to the range 0-2π
function angleNormalize(angle) {
	angle%=Math.PI*2; // Trim value
	if(angle<0) {
		angle+=Math.PI*2;
		angle%=Math.PI*2;
	}
	return angle;
}
// Get the difference in 2 angles
//    Negative vales mean it is towards the left parameter
function angleShortest(origAng, destAng) {
	var diff=destAng-origAng; // Get the difference in angle
	if(destAng<origAng) {
		if(0<diff+Math.PI) { // -rot [diff is neg & normal]
			destAng=diff;
		} else { // +rot [diff is neg & near 2π]
			destAng=diff+Math.PI*2;
		}
	} else {
		if(0<diff-Math.PI) { // -rot [diff is pos & near 2π]
			destAng=diff-Math.PI*2;
		} else { // +rot [diff is pos & normal]
			destAng=diff;
		}
	}
	return destAng;
}
// Get the angle of a direction
function angleOfPos(origPos, destPos) {
	if(typeof origPos!='object') throw ('angleOfPos(origPos, destPos) angleOfPos must take an XY struct'); // DEBUG
	if(typeof origPos.x!='number') throw ('angleOfPos(origPos, destPos) parameter "angleOfPos.x" must be a number; got a typeof('+angleOfPos.x+')=='+typeof angleOfPos.x); // DEBUG
	if(typeof origPos.y!='number') throw ('angleOfPos(origPos, destPos) parameter "angleOfPos.y" must be a number; got a typeof('+angleOfPos.y+')=='+typeof angleOfPos.y); // DEBUG
	if(typeof destPos!='object') throw ('angleOfPos(origPos, destPos) destPos must take an XY struct'); // DEBUG
	if(typeof destPos.x!='number') throw ('angleOfPos(origPos, destPos) parameter "destPos.x" must be a number; got a typeof('+destPos.x+')=='+typeof destPos.x); // DEBUG
	if(typeof destPos.y!='number') throw ('angleOfPos(origPos, destPos) parameter "destPos.y" must be a number; got a typeof('+destPos.y+')=='+typeof destPos.y); // DEBUG
	// DEBUG
	var pos={ x: 0, y: 0 };
	pos.x=destPos.x-origPos.x;
	pos.y=destPos.y-origPos.y;

	var finalAngle=0;
	if(pos.x!=0||pos.y!=0) {
		if(pos.y==0) {
			finalAngle=Math.PI/2;
			if(pos.x<0) finalAngle+=Math.PI;
		} else {
			finalAngle=Math.atan(pos.x/pos.y);
			if(pos.y<0) finalAngle+=Math.PI;
		}
		finalAngle+=Math.PI*3/2; // Prevents negative values
		finalAngle%=Math.PI*2;
	}
	return finalAngle;
}

// Hitbox detection for points [like mouse click]
function inHitRad(hitRad, origPos, hitPos) {
	if(hitRad==0) return false;
	var c1=origPos.x-hitPos.x;
	var c2=origPos.y-hitPos.y;
	var dist=Math.sqrt(c1*c1+c2*c2);
	return dist<hitRad?dist:false;
}
function inHitBox(hitBox, origPos, hitPos) {
	var cx, cy, dist, ang=angleOfPos(origPos, hitPos);

	cx=hitPos.x-origPos.x;
	cy=hitPos.y-origPos.y;
	dist=Math.sqrt(cx*cx+cy*cy);

	cx=(origPos.x-hitBox.x/2<hitPos.x)&&(hitPos.x<origPos.x+hitBox.x/2);
	cy=(origPos.y-hitBox.y/2<hitPos.y)&&(hitPos.y<origPos.y+hitBox.y/2);

	return cx&&cy?dist:false;
}