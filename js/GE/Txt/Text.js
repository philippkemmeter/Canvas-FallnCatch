if (typeof(GE.Txt) != 'object')
	GE.Txt = {};

GE.Txt.Text = function(text, size, color, bgcolor, family) {
	if (typeof(text) != 'undefined') {
		this.init(text, size, color, bgcolor, family);
	}
};

GE.Txt.Text.prototype.init = function(text, size, color, bgcolor, family) {
	this.text = GE.ValueChecker.string(text, 'text');
	this.size = GE.ValueChecker.int(size, 'size');
	this.scaled_size = this.size;
	
	if (typeof(color) != 'undefined')
		this.color = GE.ValueChecker.string(color, 'color', false, 4, 7);
	else
		this.color = '#fff';
		
	if (typeof(bgcolor) != 'undefined')
		this.bgcolor = GE.ValueChecker.string(bgcolor, 'bgcolor', false, 4, 7);
	else
		this.bgcolor = null;
	
	if (typeof(family) != 'undefined')
		this.family = GE.ValueChecker.string(family, 'family');
	else
		this.family = '_sans';
	
	this.width = 0; // will be calculated on next draw
	this.height = 0; // will be calculated on next draw
	
	this.scale_factor = 1;
	this.scale_factor_changed = true;
	
};

GE.Txt.Text.prototype.draw = function(context, x, y) {
	x = GE.ValueChecker.int(x, 'x');
	y = GE.ValueChecker.int(y, 'y');
	context.save();
	context.font = this.scaled_size + 'px' + ' ' + this.family;
	context.textBaseline = 'top';
	
	var metrics = context.measureText(this.text);
	if (this.scale_factor_changed) {
		this.scaled_width = metrics.width;
		this.scaled_height = metrics.height;
		this.width = this.scaled_width / this.scale_factor;
		this.height = this.scaled_height / this.scale_factor;
		this.scale_factor_changed = false;
	}
	
	if (this.bgcolor) {
		context.fillStyle = this.bgcolor;
		context.fillRect(x, y, metrics.width, this.scaled_size);
	}
  
	context.fillStyle = this.color;
	context.fillText(this.text, x, y);
	context.restore();
};

GE.Txt.Text.prototype.get_width = function() {
	return this.width;
};

GE.Txt.Text.prototype.get_height = function() {
	return this.height;
};

GE.Txt.Text.prototype.get_scaled_height = function() {
	return this.scaled_height;
};

GE.Txt.Text.prototype.get_scaled_width = function() {
	return this.scaled_width;
};

GE.Txt.Text.prototype.set_scale_factor = function(s) {
	this.scale_factor = GE.ValueChecker.float(s, 's');
	this.scaled_size = this.size * s;
	this.scale_factor_changed = true;
};

GE.Txt.Text.prototype.get_scale_factor = function() {
	return this.scale_factor;
};

GE.Txt.Text.prototype.get_text = function() {
	return this.text;
};