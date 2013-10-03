FallnCatch.Objects.ScorePlus10 = function(game, img, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, img, p);
	}
};

FallnCatch.Objects.ScorePlus10.extend(GE.Objects.ImageObject);

FallnCatch.Objects.ScorePlus10.prototype.init = function(game, img, p) {
	FallnCatch.Objects.ScorePlus10.parent.init.call(this, game, img, p);
	
	// Geschwindigkeit in Pixel pro Sekunde
	this.speed_pps = 400;
};

FallnCatch.Objects.ScorePlus10.prototype.update = function(game_time) {
	FallnCatch.Objects.ScorePlus10.parent.update.call(this, game_time);
	
	this.set_y(this.get_y() - 
		Math.round(this.speed_pps * this.scale_factor * game_time));
	
	if (this.get_y() <= 0) {
		this.delete_next_frame();
	}
};