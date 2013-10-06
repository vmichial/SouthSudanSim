var s_manager;

$(document).ready(function(){
	s_manager=new SceneManager();
	s_manager.init();
return;	
	setInterval(function(){
		s_titlemenu.step();
		s_titlemenu.draw(ctx);
	}, 42);
	
	// IO Events
	$(canvas).on('mousemove', mousemove);
	$(canvas).on('mouseup', mouseup);
	$(canvas).on('mousedown', mousedown);
	$(canvas).on('mousewheel DOMMouseScroll', mousescroll);
	$('body').on('keyup', kbup);
	$('body').on('keydown', kbdown);
});

function titlemenu_init(){
	var ent=new Entity('p45');
	var tex=new Texture('moar', 'menuMoreOff');
	
	this.addEnt(ent);
	ent.addTex(tex);
	ent.onStep=function(){
		var hit=this.hitPos(mouse);
		console.log(hit)
	}
}