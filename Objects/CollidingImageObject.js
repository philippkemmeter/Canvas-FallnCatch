/**
 * Creates a new ImageObject.
 * 
 * This Object is a simple game object not colliding at all but displaying an
 * image, if set.
 * 
 * @param Game game							The game which is using the object
 * @param GE.Img.Image 						The image to show
 * @param MathExt.LinAlg3D.Vector p         3rd dimension is z-index
 */
GE.Objects.CollidingImageObject = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

GE.Objects.CollidingImageObject.extend(GE.Objects.ImageObject);

GE.Objects.CollidingImageObject.prototype.init = function(game, img, p) {
	GE.Objects.CollidingImageObject.parent.init.call(this, game, img, p);
	
	this.collision_body = new MathExt.LinAlg2D.Rect(
		0, 0, this.get_width(), this.get_height()
	);
	
	this.scaled_collision_body = new MathExt.LinAlg2D.Rect(
		0, 0, this.get_scaled_width(), this.get_scaled_height()
	);
	
	this.collides = true;
};