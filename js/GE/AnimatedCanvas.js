GE.AnimatedCanvas = function(canvas_id, fps) {
	if (typeof(canvas_id) != 'undefined') {
		this.init(canvas_id, fps);
	}
};

GE.AnimatedCanvas.prototype.init = function(canvas_id, fps) {
	fps = GE.ValueChecker.int(fps, 'fps', 1);
	this.canvas = document.getElementById(canvas_id);
	if (!this.canvas.getContext) {
		alert('Your browser is to old...');
		return;
	}
	this.context = this.canvas.getContext('2d');
	this.backbuf = document.createElement('canvas');
	this.backbuf.width = this.canvas.width;
	this.backbuf.height = this.canvas.height;
	this.backbuf_context = this.backbuf.getContext('2d');
	
	this.fps = fps;
	this.secs_between_frames = 1 / this.fps;
	this.last_frame_time = 0;
	
	this.fps_vis = false;
	this.object_cnt_vis = false;
	
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	
	this.scale_factor = 1;
	
	this.game_objects = [];	
	
	// Time will count on each draw
	this.abs_game_time = 0;
}

GE.AnimatedCanvas.prototype.draw = function() {
	var this_frame_time = new Date().getTime();
	if (this.fps_vis) { 
		this.actual_fps = Math.round(1000 
			/ (this_frame_time - this.last_frame_time));
	}
	var dt = (this_frame_time - this.last_frame_time) / 1000;
	this.abs_game_time += dt;
	this.last_frame_time = this_frame_time;

	this._clear_backbuf();
	
	for (var i = 0; i < this.game_objects.length; ) {
		this.game_objects[i].update(dt, this.abs_game_time);
		if (this.game_objects[i].shall_be_deleted())
			this.game_objects.splice(i, 1);
		else
			i++
	}
	
	for (var i = 0; i < this.game_objects.length; i++) {
		this.game_objects[i].draw(this.backbuf_context, dt);
	}
	
	this.context.drawImage(this.backbuf, 0, 0);
	
	if (this.fps_vis) {
		this.max_fps = Math.round(1000 
			/ (new Date().getTime() - this_frame_time)
		);
		
		this.draw_text('Actual FPS: ' + this.actual_fps.toString(), 20, 20);
	}
	
	if (this.object_cnt_vis) {
		this.draw_text(
			'Objects: ' + this.game_objects.length.toString(), 20, 40
		);
	}
	
	var wait = ((this.secs_between_frames * 1000) 
		- (new Date().getTime() - this_frame_time + 1)); // 1000;
	
	window.setTimeout(
		(function(_this) {
			return function () { 
				_this.draw(); 
			}
		}(this)), wait
	);
}

GE.AnimatedCanvas.prototype.draw_text = function(text, x, y, font_size, 
	font_style, col, bgcol) 
{
	text = GE.ValueChecker.string(text, 'text');
	x = GE.ValueChecker.int(x, 'x');
	y = GE.ValueChecker.int(y, 'y');
	if (font_size) {
		font_size = GE.ValueChecker.int(font_size, 'font_size', 1);
	}
	else {
		font_size = 20;
	}
	if (font_style) {
		font_style = GE.ValueChecker.string(font_style, 'font_style');
	}
	else {
		font_style = '_sans';
	}
	if (col) {
		col = GE.ValueChecker.string(col, 'col');
	}
	else {
		col = '#FFF';
	}
	if (bgcol) {
		bgcol = GE.ValueChecker.string(bgcol, 'bgcol');
	}
	
	this.context.save();
	this.context.font = font_size + 'px' + ' ' + font_style;
	this.context.textBaseline = 'top';
	
	var metrics = this.context.measureText(text);
	if (bgcol) {
		this.context.fillStyle = bgcol;
		this.context.fillRect(x, y, metrics.width, font_size);
	}
  
	this.context.fillStyle = col;
	this.context.fillText(text, x, y);
	this.context.restore();
};

GE.AnimatedCanvas.prototype.run = function() {
	this.las_frame_time = new Date().getTime(); 
	this.draw();
}

GE.AnimatedCanvas.prototype._clear_backbuf = function() {
	this.backbuf_context.fillStyle = '#000';
	this.backbuf_context.fillRect(
		0, 0, this.backbuf.width, this.backbuf.height
	);
}

GE.AnimatedCanvas.prototype.add_object = function(o) {
	o = GE.ValueChecker.instance_of(o, 'o', GE.Objects.GameObject);
	this.game_objects.push(o);
	o.set_scale_factor(o.get_scale_factor() * this.scale_factor);
};

GE.AnimatedCanvas.prototype.show_fps = function() {
	this.fps_vis = true;
};

GE.AnimatedCanvas.prototype.hide_fps = function() {
	this.fps_vis = false;
};

GE.AnimatedCanvas.prototype.show_object_count = function() {
	this.object_cnt_vis = true;
};

GE.AnimatedCanvas.prototype.hide_object_count = function() {
	this.object_cnt_vis = false;
};

GE.AnimatedCanvas.prototype.get_height = function() {
	return this.height;
};

GE.AnimatedCanvas.prototype.get_width = function() {
	return this.width;
};

GE.AnimatedCanvas.prototype.get_scaled_width = function() {
	return this.canvas.width;
};

GE.AnimatedCanvas.prototype.get_scaled_height = function() {
	return this.canvas.height;
};

GE.AnimatedCanvas.prototype.get_objects = function() {
	return this.game_objects;
};

GE.AnimatedCanvas.prototype.remove_all_objects = function() {
	this.game_objects = [];
};

GE.AnimatedCanvas.prototype.set_scale_factor = function(s) {
	this.scale_factor = GE.ValueChecker.float(s, 's');
	this.canvas.width = this.width*s;
	this.canvas.height = this.height*s;
	this.backbuf.width = this.canvas.width;
	this.backbuf.height = this.canvas.height;
	for (var i = 0; i < this.game_objects.length; i++) {
		this.game_objects[i].set_scale_factor(s);
	}
};

GE.AnimatedCanvas.prototype.get_scale_factor = function() {
	return this.scale_factor;
};