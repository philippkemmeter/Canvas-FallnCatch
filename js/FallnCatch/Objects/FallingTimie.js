FallnCatch.Objects.FallingTimie = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

FallnCatch.Objects.FallingTimie.extend(FallnCatch.Objects.FallingThing);

FallnCatch.Objects.FallingTimie.prototype.init = function(game, img, p) {
	FallnCatch.Objects.FallingTimie.parent.init.call(this, game, img, p);
	
	// Fallgeschwindigkeit in Pixel pro Sekunde
	this.falling_speed_pps = FallnCatch.Game.FALLING_SPEED * 2 * 
		(1 + this.game.get_level()*FallnCatch.Game.SPEED_INCREASE_PER_LEVEL);
};

FallnCatch.Objects.FallingTimie.prototype.handle_collision = function(
	collision_vector, collision_object)
{
	FallnCatch.Objects.FallingTimie.parent.handle_collision.call(
		this, collision_vector, collision_object
	);
	if (GE.instance_of(collision_object, FallnCatch.Objects.Protagonist)) {
		this.game.add_time(FallnCatch.Game.TIME_PER_FALLING_TIMIE, this);
		this.delete_next_frame();
	};
};