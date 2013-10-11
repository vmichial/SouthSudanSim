/*
			Scene Credits
*/


function credits_init(){
	// Make the components
	var ent_paul=new Entity('ent_paul');
	var tex_paul=new Texture('tex_paul', 'crdpaul');
	
	ent_paul.addTex(tex_paul);
	
	this.addEnt(ent_paul);
	
	// Configure components
	tex_paul.mid.x-=canvas.width/2;
	ent_paul.translate({x:0, y:900});
	this.pos.y=canvas.height;
	
	this.vel=4;
	
	
	// Next scene transition
	this.credoffset=0;
	
	this.next=function(){
		this.nextID='titlemenu';
	}
	
	this.onStep=function(){
		var dest=this.move({x:0, y:-100-this.credoffset});
		if(dest){
			if(this.nextID){
				this.translate({x:0, y:0});
				this.manager.select(this.nextID);
				this.nextID=undefined;
			}
		}
	}
	this.onDraw=function(ctx, adjPos, scaleMul){
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		{ // draw texts
			var off=32;
			ctx.fillStyle='#ffffff';
			ctx.font='64px arial';
			
			ctx.fillText('Alejandro Escanellas', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Alexis Liu', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Amanuel Gebreyesus', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Ania Lewakowski', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Edward Thang', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Ferissa Lagasca', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Francia Gracia', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Hasani Groce', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Jose Zepeda', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Joy Clayton', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Kristin Osborn', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Maximilian Bolling', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Michial Green II', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Nygel Aton', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Olabiyi Oyewumi', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Rory Savage', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Saki Wang', this.pos.x+32, this.pos.y+(off+=100))
			ctx.fillText('Thomas Bolling', this.pos.x+32, this.pos.y+(off+=100))			

			ctx.fillText('', this.pos.x+180, this.pos.y+(off+=100));

			ctx.fillText('Special Thanks', this.pos.x+180, this.pos.y+(off+=100))
			ctx.fillText('Buff Paul', this.pos.x+270, this.pos.y+(off+=100))
			
			this.credoffset=off;
			
			ent_paul.translate({x:0, y:off+400});
		}
			
		this.drawDefault(ctx, adjPos, scaleMul);
	}

	
	// Bind events
	this.keyup=credits_keyup;
	this.mouseup=credits_mouseup;
}

function credits_keyup(which){
	switch(which){
		case 13: // Enter
		case ' '.charCodeAt(0): // Space
			this.next();
	}
}

function credits_mouseup(){
	var hit=this.hitPos(mouse, this.pos, this.scale);
	if(-1<hit) this.next();
}