/**
 * Abstract parent class of all Falling* classes
 */
FallnCatch.Objects.FallingThing = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

FallnCatch.Objects.FallingThing.extend(GE.Objects.CollidingImageObject);

FallnCatch.Objects.FallingThing.prototype.init = function(game, img, p) {
	FallnCatch.Objects.FallingThing.parent.init.call(this, game, img, p);
	
	// Fallgeschwindigkeit in Pixel pro Sekunde
	this.falling_speed_pps = 0;
};

FallnCatch.Objects.FallingThing.prototype.update = function(game_time) {
	FallnCatch.Objects.FallingThing.parent.update.call(this, game_time);
	
	if (this.game.state == FallnCatch.Game.STATE_DIED) {
		this.delete_next_frame();
	}
	else if (this.game.state == FallnCatch.Game.STATE_PAUSED) {
		return;
	}
	
	this.set_y(this.get_y() + 
		Math.round(this.falling_speed_pps * this.scale_factor * game_time));
	
	if ((this.get_y() + this.get_height()) 
			>= this.game.get_ani_canvas().get_height()) 
	{
		this.delete_next_frame();
	}
};