/**
 * Creates a new TextObject.
 * 
 * This Object is a simple game object not colliding at all but displaying an
 * image, if set.
 * 
 * @param Game game							The game which is using the object
 * @param GE.Txt.Text						The text to show
 * @param MathExt.LinAlg3D.Vector p         3rd dimension is z-index
 */
GE.Objects.TextObject = function(game, txt, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, txt, p);
	}
};

GE.Objects.TextObject.extend(GE.Objects.GameObject);

GE.Objects.TextObject.prototype.init = function(game, txt, p) {
	GE.Objects.TextObject.parent.init.call(this, game, p);

	this.txt = GE.ValueChecker.instance_of(txt, 'txt', GE.Txt.Text);
};

GE.Objects.TextObject.prototype.draw = function(context, game_time) {
	this.txt.draw(context, this.get_scaled_x(), this.get_scaled_y());
};

GE.Objects.TextObject.prototype.set_text = function(txt) {
	this.txt= GE.ValueChecker.instance_of(txt, 'txt', GE.Txt.Text);
};

GE.Objects.TextObject.prototype.get_image = function() {
	return this.txt;
};

GE.Objects.TextObject.prototype.get_width = function() {
	return this.txt.get_width();
};

GE.Objects.TextObject.prototype.get_height = function() {
	return this.txt.get_height();
};

GE.Objects.TextObject.prototype.get_scaled_width = function() {
	return this.txt.get_scaled_width();
};

GE.Objects.TextObject.prototype.get_scaled_height = function() {
	return this.txt.get_scaled_width();
};

GE.Objects.TextObject.prototype.set_scale_factor = function(s) {
	GE.Objects.TextObject.parent.set_scale_factor.call(this, s);
	this.txt.set_scale_factor(s);
};