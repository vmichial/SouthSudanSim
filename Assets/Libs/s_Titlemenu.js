/*
			Scene Title Menu
*/


function titlemenu_init(){
	// Make the components
	var ent_bg=new Entity('ent_bg');
	var ent_start=new Entity('ent_start');
	var tex_bg=new Texture('tex_bg', 'bgtitle');
	var tex_start=new Texture('tex_start', 'btnstart');
	
	ent_bg.addTex(tex_bg);
	ent_start.addTex(tex_start);
	
	this.addEnt(ent_bg);
	this.addEnt(ent_start);
	
	// Configure components
	tex_bg.mid={x:0, y:0};
	
	ent_start.hitbox={x:tex_start.size.x, y:tex_start.size.y};
	ent_start.pos={x:canvas.width*4/5, y:canvas.height*3/4};
	ent_start.scale={x:.5, y:.5};
	
	
	// Next scene transition
	this.next=function(){
		this.nextID='theTrail';
			console.log(this.nextID)

	}

	
	// Bind events
	this.keyup=titlemenu_keyup;
	this.mouseup=titlemenu_mouseup;
}

function titlemenu_keyup(which){
	switch(which){
		case 13: // Enter
		case ' '.charCodeAt(0): // Space
			this.next();
	}
}

function titlemenu_mouseup(){
	var hit=this.hitPos(mouse, this.pos, this.scale);
	if(-1<hit) this.next();
}