$(document).ready(function(){
	// Initializing functions
	
	
	// IO Events
	$(canvas).on('mousemove', mousemove);
	$(canvas).on('mouseup', mouseup);
	$(canvas).on('mousedown', mousedown);
	$(canvas).on('mousewheel DOMMouseScroll', mousescroll);
	$('body').on('keyup', kbup);
	$('body').on('keydown', kbdown);
});