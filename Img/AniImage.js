if (typeof(GE.Img) !== 'object') 
	GE.Img = {};

GE.Img.AniImage = function(img, frames, loop, fps, reversed) {
	if (typeof(img) != 'undefined') {
		this.init(img, frames, loop, fps, reversed);
	}
};

GE.Img.AniImage.extend(GE.Img.Image);

/**
 * Initialisiert das Objekt
 *
 * @param Image img          Das Bild, das die Animationen enthält.
 * @param uint/uint[] frames Ist frames ein Array, dann bedeutet jedes Element
 *                           die Bildanzahl eines Filmstreifen, alle Streifen
 *                           werden nebeneinander erwartet.
 *                           Ist es ein Integer, gibt es nur einen Streifen.
 * @param bool loop          Ob geloopt werden darf oder one-shot.
 * @param uint fps           Frames per Seconds.
 * @param bool reversed      Ob die Animation rückwärts abgespielt werden soll.
 */
GE.Img.AniImage.prototype.init = function(img, frames, loop, fps, 
	reversed) 
{
	GE.Img.AniImage.parent.init.call(this, img);
	this.fps = GE.ValueChecker.int(fps, 'fps');
	if (frames instanceof Array) {
		for (var i = 0; i < frames.length; i++)
			GE.ValueChecker.int(frames[i], 'frames['+i+']', 0);
		this.frames = frames;
	}
	else {
		this.frames = [GE.ValueChecker.int(frames, 'frames', 0)];
	}
	this.loop = GE.ValueChecker.bool(loop, 'loop');
	this.reversed = reversed || false;

	this.time_between_frames = 0;
	this.time_since_last_frame = 0;

	this.cur_strip = 0;	// Filmstreifen, der abgespielt werden soll
	
	/* internal calcs */
	if (this.frames[this.cur_strip] > 0)
		this.frame_height = this.image.height / this.frames[this.cur_strip];
	else
		this.frame_height = this.image.height;
		
	if (reversed) // if we're going backwards, start at the end..
		this.cur_frame = this.frames - 1;
	else
		this.cur_frame = 0;

		
	this.frame_width = this.image.width / this.frames.length;
	this.time_between_frames = 1 / fps;
	this.time_since_last_frame = this.time_between_frames;

	this.height = this.frame_height;
	this.width = this.frame_width;
};

GE.Img.AniImage.prototype.draw_frame = function (context, x, y, game_time,
	frame_num) 
{
	context.save();
	context.translate(x, y);

	if (this.flip_x) {
		context.save();
		context.scale(-1, 1);
		context.translate(-this.frame_width, 0);
	}

	context.drawImage(
		this.image, 
		this.frame_width * this.cur_strip, this.frame_height * frame_num,
		this.frame_width, this.frame_height, 
		0, 0, 
		this.frame_width, this.frame_height
	);

	if (this.flip_x) {
		context.restore();
	}

	context.restore();
}

GE.Img.AniImage.prototype.draw = function (context, x, y, game_time) {
	this.draw_frame(context, x, y, game_time, this.cur_frame);

	this.time_since_last_frame -= game_time;

	if (this.frames[this.cur_strip] > 0) {
		if (this.time_since_last_frame <= 0) {
			this.time_since_last_frame = this.time_between_frames;

			if (this.loop || 
				(!this.reversed && 
					this.cur_frame + 1 != this.frames[this.cur_strip]) 
				|| (this.reversed && this.cur_frame > 0)) 
			{
				if (this.reversed) {
					this.cur_frame--;
					if (this.cur_frame == 0)
						if (this.loop)
							this.cur_frame = this.frames - 1;
						else
							return false; // end of sequence
				}
				else {
					this.cur_frame++;
					if (this.cur_frame == this.frames[this.cur_strip])
						if (this.loop)
							this.cur_frame = 0;
						else
							return false; // end of sequence
				}
			}
		}
	}

	return true; // indicates more to come...
};

GE.Img.AniImage.prototype.get_frame_amout = function() {
	return this.frames;
};

GE.Img.AniImage.prototype.set_scale_factor = function(s) {
	this.scale_factor = GE.ValueChecker.float(s, 's');
	this.scaled_width = this.frame_width * s;
	this.scaled_height = this.frame_height * s;
};

GE.Img.AniImage.prototype.get_width = function() {
	return this.frame_width;
};

GE.Img.AniImage.prototype.get_height = function() {
	return this.frame_height;
};

/**
 * Setzt den aktuellen Filmstreifen. Wechselt also die Filmrolle ;-)
 *
 * @param uint s Filmstreifennummer.
 */
GE.Img.AniImage.prototype.set_strip = function(strip) {
	this.cur_strip = GE.ValueChecker.int(
		strip, 'strip', 0, this.frames.length-1
	);
	this.cur_frame = (this.reversed) ? this.frames[this.cur_strip] : 0;
};
