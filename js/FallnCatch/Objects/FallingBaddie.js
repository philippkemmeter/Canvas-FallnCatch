FallnCatch.Objects.FallingBaddie = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

FallnCatch.Objects.FallingBaddie.extend(FallnCatch.Objects.FallingThing);

FallnCatch.Objects.FallingBaddie.prototype.init = function(game, img, p) {
	FallnCatch.Objects.FallingBaddie.parent.init.call(this, game, img, p);
	
	// Fallgeschwindigkeit in Pixel pro Sekunde
	this.falling_speed_pps = FallnCatch.Game.FALLING_SPEED * 
		(1 + this.game.get_level()*FallnCatch.Game.SPEED_INCREASE_PER_LEVEL)
		* 1.1;
};

FallnCatch.Objects.FallingBaddie.prototype.handle_collision = function(
	collision_vector, collision_object)
{
	FallnCatch.Objects.FallingBaddie.parent.handle_collision.call(
		this, collision_vector, collision_object
	);
	if (GE.instance_of(collision_object, FallnCatch.Objects.Protagonist)) {
		this.game.substract_score(
			FallnCatch.Game.SCORE_PER_FALLING_BADDIE, this
		);
		this.delete_next_frame();
	};
};