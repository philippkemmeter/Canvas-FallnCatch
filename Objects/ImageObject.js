/**
 * Creates a new ImageObject.
 * 
 * This Object is a simple game object not colliding at all but displaying an
 * image, if set.
 * 
 * @param Game game							The game which is using the object
 * @param GE.Img.Image 						The image to check
 * @param MathExt.LinAlg3D.Vector p         3rd dimension is z-index
 */
GE.Objects.ImageObject = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

GE.Objects.ImageObject.extend(GE.Objects.GameObject);

GE.Objects.ImageObject.prototype.init = function(game, img, p) {
	GE.Objects.ImageObject.parent.init.call(this, game, p);

	this.img = GE.ValueChecker.instance_of(img, 'img', GE.Img.Image);
	
	this.collision_body = new MathExt.LinAlg2D.Rect(
		0, 0, this.get_width(), this.get_height()
	);
	
	this.scaled_collision_body = new MathExt.LinAlg2D.Rect(
		0, 0, this.get_scaled_width(), this.get_scaled_height()
	);
};

GE.Objects.ImageObject.prototype.draw = function(context, game_time) {
	if (GE.instance_of(this.img, GE.Img.Image))
		this.img.draw(context, this.get_scaled_x(), this.get_scaled_y());
	else
		this.img.draw_next_frame(
			context, this.get_scaled_x(), this.get_scaled_y(), game_time
		);
};

GE.Objects.ImageObject.prototype.set_image = function(img) {
	this.img = GE.ValueChecker.instance_of(img, 'img', GE.Img.Image);
};

GE.Objects.ImageObject.prototype.get_image = function() {
	return this.img;
};

GE.Objects.ImageObject.prototype.get_width = function() {
	return this.img.get_width();
};

GE.Objects.ImageObject.prototype.get_height = function() {
	return this.img.get_height();
};

GE.Objects.ImageObject.prototype.get_scaled_width = function() {
	return this.img.get_scaled_width();
};

GE.Objects.ImageObject.prototype.get_scaled_height = function() {
	return this.img.get_scaled_width();
};

GE.Objects.ImageObject.prototype.set_scale_factor = function(s) {
	GE.Objects.ImageObject.parent.set_scale_factor.call(this, s);
	this.img.set_scale_factor(s);
};