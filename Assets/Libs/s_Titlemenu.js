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
	
	this.vel=64;
	
	// Next scene transition
	this.next=function(){
		// Logic to select the correct scene
		
		var hit=this.hitPos(mouse, this.pos, this.scale);
		if(-1<hit){
			switch(this.getEnt(hit).id){
			case 'ent_start':
				this.nextID='theTrail';
				break;
			case 'ent_credits':
				this.nextID='credits';
				break;
			}
		}
	}
	
	this.onStep=function(){
		if(this.nextID){
			var dest=this.move({x:canvas.width, y:0});
			if(dest){
				this.translate({x:0, y:0});
				this.manager.select(this.nextID);
				this.nextID=undefined;
				warrap.init();
			}
		}
	}
	this.onDraw=function(ctx, adjPos, scaleMul){
		ctx.fillStyle='#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.drawDefault(ctx, adjPos, scaleMul);
	}
	
	// Bind events
	this.mouseup=titlemenu_mouseup;
}

function titlemenu_mouseup(){
	this.next();
}