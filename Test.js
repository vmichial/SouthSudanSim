var s_manager;

$(document).ready(function(){
	s_manager=new SceneManager();
	s_manager.init();
	
	setInterval(function(){
		s_manager.update();
		s_manager.draw(ctx);
	}, 42);
	
	// IO Events
	$(canvas).on('mousemove', mousemove);
	$(canvas).on('mouseup', mouseup);
	$(canvas).on('mousedown', mousedown);
	$(canvas).on('mousewheel DOMMouseScroll', mousescroll);
	$('body').on('keyup', kbup);
	$('body').on('keydown', kbdown);
});

