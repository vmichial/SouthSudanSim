function ClickWindow(src)
{
	var ent = new Entity('Window')
	var tex = new Texture('img', 'menuHereOff')
	ent.addTex(tex);
	
	if (src != null)
	{
		tex._img = src;
		tex.refreshProps()
	}
	
	ent.hitbox = {x: tex.size.x, y: tex.size.y};
	
	ent.pos.x = canvas.width/2;
	ent.pos.y = canvas.height/2;
	
	ent.onStep = function()
	{
		var test = this.hitPos( mouse );
		if(test && mouse.down)
		{
			this.getTex('img').hide = true
		}
	}
	
	ent.update = function()
	{
		this.step()
	}
	
	return ent
	
}