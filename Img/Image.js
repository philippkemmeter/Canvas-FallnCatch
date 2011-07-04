if (typeof(GE.Img) !== 'object') 
	GE.Img = {};

GE.Img.Image = function(img) {
	if (typeof(img) != 'undefined') {
		this.init(img);
	}
};

GE.Img.Image.prototype.init = function(img) {
	this.image = img;
	this.flip_x = false;
	this.scaled_width = this.image.width;
	this.scaled_height = this.image.height;
	this.scale_factor = 1;
};

GE.Img.Image.prototype.draw = function(context, x, y) {
	context.save();
	context.translate(x, y);
	if (this.flip_x) {
		context.save();
		context.scale(-1, 1);
		context.translate(-this.image.width, 0);
	}
	
	context.drawImage(
		this.image, 
		0, 0, 
		this.get_scaled_width(), this.get_scaled_height()
	);
	
	if (this.flip_x) {
		context.restore();
	}
	context.restore();
};

GE.Img.Image.prototype.get_image = function() {
	return this.image;
};

GE.Img.Image.prototype.get_flip_x = function() {
	return this.flip_x;
};

GE.Img.Image.prototype.flip_x = function() {
	this.flip_x = !this.flip_x;
};

GE.Img.Image.prototype.get_height = function() {
	return this.image.height;
};

GE.Img.Image.prototype.get_width = function() {
	return this.image.width;
};

GE.Img.Image.prototype.get_scaled_height = function() {
	return this.scaled_height;
};

GE.Img.Image.prototype.get_scaled_width = function() {
	return this.scaled_width;
};

GE.Img.Image.prototype.set_scale_factor = function(s) {
	this.scale_factor = GE.ValueChecker.float(s, 's');
	this.scaled_width = this.image.width * s;
	this.scaled_height = this.image.height * s;
};


GE.Img.Image.prototype.get_scale_factor = function() {
	return this.scale_factor;
};