if (typeof(GE.Img) !== 'object') 
	GE.Img = {};

GE.Img.AniImage = function(img, frames, loop, fps, reversed) {
	if (typeof(img) != 'undefined') {
		this.init(img, frames, loop, fps, reversed);
	}
};

GE.Img.AniImage.extend(GE.Img.Image);

GE.Img.AniImage.prototype.init = function(img, frames, loop, fps, 
	reversed) 
{
	GE.Img.AniImage.parent.init.call(this, img);
	this.fps = GE.ValueChecker.int(fps, 'fps');
	this.frames = GE.ValueChecker.int(frames, 'frames', 0);
	this.loop = GE.ValueChecker.bool(loop, 'loop');
	this.reversed = !!reversed || false;

	this.time_between_frames = 0;
	this.time_since_last_frame = 0;

	
	/* internal calcs */
	if (this.frames > 0)
		this.frame_height = this.image.height / this.frames;
	else
		this.frame_height = this.image.height;
		
	if (reversed) // if we're going backwards, start at the end..
		this.cur_frame = this.frames - 1;
	else
		this.cur_frame = 0;

		
	this.frame_width = this.image.width;
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
		0, this.frame_height * frame_num,
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

	if (this.frames > 0) {
		if (this.time_since_last_frame <= 0) {
			this.time_since_last_frame = this.time_between_frames;

			if (this.loop || 
				(!this.reversed && this.cur_frame + 1 != this.frames) 
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
					if (this.cur_frame == this.frames)
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
