var mouse={
	// Current position
	x: 0,
	y: 0,

	// Original position
	ox: 0,
	oy: 0,

	down: false, // Mouse held down
	drag: false, // Mouse dragged while down

	dist: function() { // Distance from old mouse position to current position
		var a=this.x-this.ox;
		var b=this.y-this.oy;
		return Math.sqrt(a*a+b*b);
	}
};



var mousePosBrowser=0; // Browser detection
function mousemove(e) {
	switch(mousePosBrowser) {
		case 0:
			mousePosBrowser=(e.offsetX==undefined?2:1);
			mousemove(e)
			return;
		case 1:
			mouse.x=e.offsetX;
			mouse.y=e.offsetY;
			break;
		case 2:
			mouse.x=e.pageX-canvas.offsetLeft;
			mouse.y=e.pageY-canvas.offsetTop;
			break;
	}
	if(mouse.down&&!mouse.drag) {
		var dragThresh=4; // Amount of pixels to ignore a drag
		if(dragThresh<mouse.dist()) mouse.drag=true;
	}
}

function mouseup(e) {
	mousemove(e);
	var which=e.which;
	//  \/  \/  \/  \/

	s_manager.mouseup();

	//  /\  /\  /\  /\
	mouse.down=false;
	mouse.drag=false;
}

function mousedown(e) {
	mousemove(e);
	mouse.ox=mouse.x;
	mouse.oy=mouse.y;
	mouse.down=true;
	mouse.drag=false;
	//  \/  \/  \/  \/

}


var mousescrollBrowser=0; // Browser detection
function mousescroll(e) {
	var amount;
	switch(mousescrollBrowser) {
		case 0:
			if(e.wheelDelta) mousescrollBrowser=1;
			if(e.originalEvent.detail) mousescrollBrowser=2;
			if(e.originalEvent&&e.originalEvent.wheelDelta) mousescrollBrowser=3;
			mousescroll(e);
			return;
		case 1:
			amount=e.wheelDelta;
			break;
		case 2:
			amount=e.originalEvent.detail*-40;
			break;
		case 3:
			amount=e.originalEvent.wheelDelta;
			break;
	}
	e.preventDefault();
	//  \/  \/  \/  \/

}


// Disable context menu
$(document).bind("contextmenu", function(event) {
	event.preventDefault();
});