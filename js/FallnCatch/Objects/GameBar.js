FallnCatch.Objects.GameBar = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

FallnCatch.Objects.GameBar.extend(GE.Objects.ImageObject);

FallnCatch.Objects.GameBar.prototype.init = function(game, img, p) {
	FallnCatch.Objects.FallingGoodie.parent.init.call(this, game, img, p);
	
	this.font_size = 20;
	this.scaled_font_size = 20;
};

FallnCatch.Objects.GameBar.prototype.draw = function(context, game_time) {
	FallnCatch.Objects.FallingGoodie.parent.draw.call(
		this, context, game_time
	);
	
	this.draw_text(
		context,
		this.scaled_font_size,
		'Score: ' + this.game.get_score(), 
		this.get_scaled_x() + 5 * this.get_scale_factor(),
		this.get_scaled_y() + 5 * this.get_scale_factor(),
		'#0f0'
	);
	
	this.draw_text(
		context,
		this.scaled_font_size,
		'Level: ' + this.game.get_level(), 
		this.get_scaled_x() + 155 * this.get_scale_factor(),
		this.get_scaled_y() + 5 * this.get_scale_factor(),
		'#0f0'
	);
	
	col = (this.game.get_time_left() < 10) ? '#f00' : '#fff';
	this.draw_text(
		context,
		this.scaled_font_size,
		'Time: ' + this.game.get_time_left(),
		this.get_scaled_x() + this.get_scaled_width() - 155 
			* this.get_scale_factor(),
		this.get_scaled_y() + 5 * this.get_scale_factor(),
		col
	);
	
};

FallnCatch.Objects.GameBar.prototype.draw_text = function(
	context, font_size, text, x, y, col) 
{
	context.save();
	context.font = font_size + 'px _sans';
	context.textBaseline = 'top';
	
	var metrics = context.measureText(text);
  
	context.fillStyle = col;
	context.fillText(text, x, y);
	context.restore();
};

FallnCatch.Objects.GameBar.prototype.set_scale_factor = function(s) {
	FallnCatch.Objects.GameBar.parent.set_scale_factor.call(this, s);
	this.scaled_font_size = this.font_size * s;
};