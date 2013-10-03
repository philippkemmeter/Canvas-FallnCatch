FallnCatch.Objects.FallingGoodie = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

FallnCatch.Objects.FallingGoodie.extend(FallnCatch.Objects.FallingThing);

FallnCatch.Objects.FallingGoodie.prototype.init = function(game, img, p) {
	FallnCatch.Objects.FallingGoodie.parent.init.call(this, game, img, p);
	
	// Fallgeschwindigkeit in Pixel pro Sekunde
	this.falling_speed_pps = FallnCatch.Game.FALLING_SPEED * 
		(1 + this.game.get_level()*FallnCatch.Game.SPEED_INCREASE_PER_LEVEL);
};

FallnCatch.Objects.FallingGoodie.prototype.handle_collision = function(
	collision_vector, collision_object)
{
	FallnCatch.Objects.FallingGoodie.parent.handle_collision.call(
		this, collision_vector, collision_object
	);
	if (GE.instance_of(collision_object, FallnCatch.Objects.Protagonist)) {
		this.game.add_score(FallnCatch.Game.SCORE_PER_FALLING_GOODIE, this);
		this.delete_next_frame();
	};
};