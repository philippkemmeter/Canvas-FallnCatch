if (typeof(GE.Objects) != 'object')
	GE.Objects = {};

/**
 * Creates a new GameObject.
 * 
 * This Object is abstract  and it doesn't  make sense to  initiate it, because
 * it's invisible. It's ment to be extended.
 * Objects derived from this one  should set this._collides to true in init, if
 * they should handle collisions. Default is false due  to performance reasons.  
 * 
 * @param Game game							The game which is using the object
 * @param MathExt.LinAlg3D.Vector p         3rd dimension is z-index
 */
GE.Objects.GameObject = function(game, p) {
	if (typeof(game) != 'undefined') {
		this.init(game, p);
	}
};

GE.Objects.GameObject.COLLIDE_NONE = 0;
GE.Objects.GameObject.COLLIDE_LEFT = 1;
GE.Objects.GameObject.COLLIDE_RIGHT = 2;
GE.Objects.GameObject.COLLIDE_TOP = 4;
GE.Objects.GameObject.COLLIDE_BOTTOM = 8;

GE.Objects.GameObject.prototype.init = function(game, p) {
	this.game = GE.ValueChecker.instance_of(
		game, 'game', GE.Game
	);
	this.position = GE.ValueChecker.instance_of(
		p, 'p', MathExt.LinAlg3D.Vector
	);
	
	this.delete_me = false;
	this.scale_factor = 1;
	this.scaled_position = new MathExt.LinAlg3D.Vector(p.x, p.y, p.z);
	
	this.collides = false;
	
	this.collision_body = new MathExt.LinAlg2D.Rect(
		0, 0, 0, 0
	);
	
	this.scaled_collision_body = new MathExt.LinAlg2D.Rect(
		0, 0, 0, 0
	);

	this.event_handlers = {
		'click': []
	};
};

GE.Objects.GameObject.prototype.update = function(game_time) {
	if (this.collides) {
		var obj = this.game.get_ani_canvas().get_objects();
	
		var v = null;
		for (var i = 0; i < obj.length; i++) {
			if (obj[i] == this || !obj[i].collides)
				continue;
			
			v = this.get_scaled_collision_body().check_overlap_rect(
				obj[i].get_scaled_collision_body()
			);
			
			if (v)
				this.handle_collision(v, obj[i]);
			
		}
	}
};

GE.Objects.GameObject.prototype.draw = function(context, game_time) {
	
};

GE.Objects.GameObject.prototype.handle_collision = function(
	collision_vector, collision_object) {
	
};


GE.Objects.GameObject.prototype.get_position = function() {
	return this.position;
};

GE.Objects.GameObject.prototype.get_x = function() {
	return this.position.x;
};

GE.Objects.GameObject.prototype.get_y = function() {
	return this.position.y;
};

GE.Objects.GameObject.prototype.set_position = function(p) {
	this.position = GE.ValueChecker.instance_of(
		p, 'p', MathExt.LinAlg3D.Vector
	);
	this.scaled_position.x = this.get_x() * this.scale_factor;
	this.scaled_position.y = this.get_y() * this.scale_factor;
};

GE.Objects.GameObject.prototype.set_x = function(x) {
	this.position.x = GE.ValueChecker.int(x, 'x');
	this.scaled_position.x = this.get_x() * this.scale_factor;
};

GE.Objects.GameObject.prototype.set_y = function(y) {
	this.position.y = GE.ValueChecker.int(y, 'y');
	this.scaled_position.y = this.get_y() * this.scale_factor;
};

GE.Objects.GameObject.prototype.get_width = function() {
	return 0;
};

GE.Objects.GameObject.prototype.get_height = function() {
	return 0;
};

GE.Objects.GameObject.prototype.get_scaled_position = function() {
	return this.scaled_position;
};

GE.Objects.GameObject.prototype.get_scaled_x = function() {
	return this.scaled_position.x;
};

GE.Objects.GameObject.prototype.get_scaled_y = function() {
	return this.scaled_position.y;
};

GE.Objects.GameObject.prototype.get_scaled_width = function() {
	return 0;
};

GE.Objects.GameObject.prototype.get_scaled_height = function() {
	return 0;
};

GE.Objects.GameObject.prototype.set_scale_factor = function(s) {
	this.scale_factor = GE.ValueChecker.float(s, 's');
	this.scaled_position.x = this.get_x() * s;
	this.scaled_position.y = this.get_y() * s;
	this.scaled_collision_body.x = 
		this.collision_body.x * this.get_scale_factor();
	this.scaled_collision_body.y = 
		this.collision_body.y * this.get_scale_factor();
	this.scaled_collision_body.width = 
		this.collision_body.width * this.get_scale_factor();
	this.scaled_collision_body.height = 
		this.collision_body.height * this.get_scale_factor();
};

GE.Objects.GameObject.prototype.get_scale_factor = function() {
	return this.scale_factor;
};

GE.Objects.GameObject.prototype.shall_be_deleted = function() {
	return this.delete_me;
};

GE.Objects.GameObject.prototype.delete_next_frame = function() {
	this.delete_me = true;
};

GE.Objects.GameObject.prototype.set_collision_body = function(
	x_offset, y_offset, w_offset, h_offset)
{
	if (x_offset)
		x_offset = GE.ValueChecker.int(x_offset, 'x_offset');
	else
		x_offset = 0;
	if (y_offset)
		y_offset = GE.ValueChecker.int(y_offset, 'y_offset');
	else
		y_offset = 0;
	if (w_offset)
		w_offset = GE.ValueChecker.int(w_offset, 'w_offset');
	else
		w_offset = 0;
	if (h_offset)
		h_offset = GE.ValueChecker.int(h_offset, 'h_offset');
	else
		h_offset = 0;
	
	this.collision_body.x = x_offset;
	this.collision_body.y = y_offset;
	this.collision_body.width = w_offset;
	this.collision_body.height = h_offset;
	
	this.scaled_collision_body.x = x_offset * this.get_scale_factor();
	this.scaled_collision_body.y = y_offset * this.get_scale_factor();
	this.scaled_collision_body.width = w_offset * this.get_scale_factor();
	this.scaled_collision_body.height = h_offset * this.get_scale_factor();
};

GE.Objects.GameObject.prototype.get_collision_body = function() {
	return this.collision_body.translate(this.get_position());
};

GE.Objects.GameObject.prototype.get_scaled_collision_body = function() {
	return this.scaled_collision_body.translate(this.get_scaled_position());
};

/**
 * Fügt einen Event-Handler hinzu.
 *
 * @param String type     Typ des Events.
 * @param Function(ev) fn Funktion, die aufgerufen werden soll.
 */
GE.Objects.GameObject.prototype.add_event_handler = function(type, fn) {
	if (!this.event_handlers[type]) {
		throw new Error(
			'type (' + type + ' unknown.'
		);
	}
	GE.ValueChecker.instance_of(fn, 'fn', Function);
	this.event_handlers[type].push(fn);
};

/**
 * Entfernt einen Event-Handler.
 *
 * @param String type     Typ des Events.
 * @param Function(ev) fn Funktion, die aufgerufen werden soll.
 */
GE.Objects.GameObject.prototype.remove_event_handler = function(type, fn) {
	if (!this.event_handlers[type]) {
		throw new Error(
			'type (' + type + ' unknown.'
		);
	}
	GE.ValueChecker.instance_of(fn, 'fn', Function);
	this.event_handlers[type].remove(fn);
};

/**
 * Ruft das Click-Event explizit auf.
 *
 * @param Event ev Ereignis, das verschickt werden soll. Wird keins angegeben,
 *                 wird ein standard Click-Event erzeugt.
 */
GE.Objects.GameObject.prototype.on_click = function(ev) {
	if (!ev)
		ev = GE.EventUtil.create_event('click');

	for (var i = 0; i < this.event_handlers['click'].length; i++)
		this.event_handlers['click'][i].call(this, ev);
};
