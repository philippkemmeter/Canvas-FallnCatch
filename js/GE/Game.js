GE.Game = function(res_manager, ani_canvas) {
	if (typeof(res_manager) != 'undefined') {
		this.init(res_manager, ani_canvas);
	}
};

GE.Game.prototype.init = function(res_manager, ani_canvas) {
	this.canvas = GE.ValueChecker.instance_of(
		ani_canvas, 'ani_canvas', GE.AnimatedCanvas
	);
	this.res_manager = GE.ValueChecker.instance_of(
		res_manager, 'res_manager', GE.ResourceManager
	);
	
	this.scale_factor = 1;
};

GE.Game.prototype.check_load_status = function () {
	var r = this.res_manager;
	if (r.loadcount > 0) {
		var pc = 100 - ((r.loadcount / r.objects.length) * 100);
//		$('#loading-bar #bar').width(pc.toString() + '%');
		window.setTimeout(
			(function(_this) {
				return function() {
					_this.check_load_status()
				}
			})(this), 100
		);
	}
	else {
		this.start();
	}
};

GE.Game.prototype.start = function() {
	
};

GE.Game.prototype.stop = function() {
	
};

GE.Game.prototype.get_ani_canvas = function() {
	return this.canvas;
};

GE.Game.prototype.get_scale_factor = function() {
	return this.scale_factor;
};

GE.Game.prototype.set_scale_factor = function(s) {
	this.scale_factor = GE.ValueChecker.float(s);
	this.canvas.set_scale_factor(s);
};


GE.Game.prototype.handle_key_down = function(ev) {

};

GE.Game.prototype.handle_key_up = function(ev) {

};
