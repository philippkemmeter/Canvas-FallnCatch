FallnCatch.Objects.Protagonist = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

FallnCatch.Objects.Protagonist.extend(GE.Objects.CollidingImageObject);

FallnCatch.Objects.Protagonist.DIR_NONE = 0;
FallnCatch.Objects.Protagonist.DIR_LEFT = -1;
FallnCatch.Objects.Protagonist.DIR_RIGHT = 1;

FallnCatch.Objects.Protagonist.prototype.init = function(game, img, p) {
	FallnCatch.Objects.Protagonist.parent.init.call(this, game, img, p);
	
	// Bewegungsgeschwindigkeit in Pixel pro Sekunde
	this.movement_speed_pps = FallnCatch.Game.PROTGONIST_SPEED;
	this.movement_direction = 0;
};

FallnCatch.Objects.Protagonist.prototype.update = function(game_time) 
{
	FallnCatch.Objects.Protagonist.parent.update.call(this, game_time);
	
	if (this.game.state == FallnCatch.Game.STATE_DIED) {
		this.delete_next_frame();
	}
	else if (this.game.state == FallnCatch.Game.STATE_PAUSED) {
		return;
	}
	
	if (this.movement_direction != FallnCatch.Objects.Protagonist.DIR_NONE) {
		this.set_x(
			this.get_x() + Math.round(this.movement_direction
				* this.movement_speed_pps * game_time)
		);
		
		if (this.get_x() < 0) {
			this.set_x(0);
			this.movement_direction = FallnCatch.Objects.Protagonist.DIR_NONE;
		}
		else if ((this.get_x() + this.get_width()) 
			> this.game.get_ani_canvas().get_width()) 
		{
			this.set_x(
				this.game.get_ani_canvas().get_width() - this.get_width()
			);
			this.movement_direction = FallnCatch.Objects.Protagonist.DIR_NONE;
		}
	}
	
};

FallnCatch.Objects.Protagonist.prototype.move_left = function() {
	this.movement_direction = FallnCatch.Objects.Protagonist.DIR_LEFT;
};

FallnCatch.Objects.Protagonist.prototype.move_right = function() {
	this.movement_direction = FallnCatch.Objects.Protagonist.DIR_RIGHT;
};

FallnCatch.Objects.Protagonist.prototype.move_stop = function() {
	this.movement_direction = FallnCatch.Objects.Protagonist.DIR_NONE;
};