FallnCatch = {};
FallnCatch.Objects = {};

FallnCatch.Game = function(res_manager, ani_canvas) {
	if (typeof(res_manager) != 'undefined') {
		this.init(res_manager, ani_canvas);
	}
};

FallnCatch.Game.extend(GE.Game);

FallnCatch.Game.STATE_LOADING = 0;
FallnCatch.Game.STATE_RUNNING = 1;
FallnCatch.Game.STATE_PAUSED = 2;
FallnCatch.Game.STATE_DIED = 3;

FallnCatch.Game.SCORE_PER_FALLING_GOODIE = 10;
FallnCatch.Game.SCORE_PER_FALLING_BADDIE = 10;
FallnCatch.Game.TIME_PER_FALLING_TIMIE = 5;

FallnCatch.Game.PROTGONIST_SPEED = 400;
FallnCatch.Game.FALLING_SPEED = 110;
FallnCatch.Game.SPEED_INCREASE_PER_LEVEL = 0.1;

FallnCatch.Game.TIME_LIMIT = 60;

FallnCatch.Game.prototype.init = function(res_manager, ani_canvas) {
	FallnCatch.Game.parent.init.call(this, res_manager, ani_canvas);
	
	this.res_manager.add_image('pix/1.png', 'falling_goodie1');
	this.res_manager.add_image('pix/wood.png', 'falling_baddie1');
	this.res_manager.add_image('pix/wecker.png', 'falling_timie1');
	this.res_manager.add_image('pix/brezel.png', 'protagonist');
	this.res_manager.add_image('pix/game_bar.png', 'game_bar');
	this.res_manager.add_image('pix/plus.png', 'plus10');
	this.res_manager.add_image('pix/minus.png', 'minus10');
	
	this.protagonist = null; // wird später initialisiert
	
	this.score = FallnCatch.Game.SCORE_PER_FALLING_GOODIE;
	this.level = 0;
	
	this.time_left = FallnCatch.Game.TIME_LIMIT;
	this.start_time = new Date().getTime();
	this.bonus_time = 0;
	
	this.state = FallnCatch.Game.STATE_LOADING;
	this.check_load_status();
};

FallnCatch.Game.prototype.start = function() {
	this.state = FallnCatch.Game.STATE_RUNNING;
	
	// Lass Dinge fallen
	var game = this;
	var add_falling_obj = function() {
		var r = Math.floor(Math.random()*5);
		if (r == 0) {
			var constructor = FallnCatch.Objects.FallingBaddie;
			var img_handle = 'falling_baddie1';
		}
		else {
			var constructor = FallnCatch.Objects.FallingGoodie;
			var img_handle = 'falling_goodie1';
		}
		var img = new GE.Img.Image(
			game.res_manager.get_object_by_handle(img_handle)
		);
		var x = Math.random()*(game.canvas.get_width()-img.get_width());
		game.canvas.add_object(
			new constructor(
				game,
				img,
				new MathExt.LinAlg3D.Vector(x, 0, 0)
			)
		);
		var speed = 1 +
			(Math.pow(0.2, game.get_level()));
		
		if (game.state == FallnCatch.Game.STATE_RUNNING)
			window.setTimeout(
				add_falling_obj, 
				speed*(Math.random()*500 +500)/ game.get_scale_factor()
			);
	}
	add_falling_obj();
	
	var img = new GE.Img.Image(
		this.res_manager.get_object_by_handle(
			'protagonist'
		)
	);
	// Erstell den Helden
	this.protagonist = new FallnCatch.Objects.Protagonist(
		this,
		img,
		new MathExt.LinAlg3D.Vector(
			(this.canvas.get_width() - img.get_width()) >> 1,
			this.canvas.get_height() - img.get_height() - 10,
			0
		)
	);
	this.canvas.add_object(this.protagonist);
	
	// Leiste oben
	this.game_bar = new FallnCatch.Objects.GameBar(
		this,
		new GE.Img.Image(
			this.res_manager.get_object_by_handle(
				'game_bar'
			)
		),
		new MathExt.LinAlg3D.Vector(0, 0, 1000)
	);
	this.canvas.add_object(this.game_bar);
	
	
	
	// Und los geht's :-)
	
	this.canvas.run();
	this.canvas.show_fps();
	this.canvas.show_object_count();
	
	// Countdown starten
	
	this.timer_interval = window.setInterval(
		function() {
			var now = new Date().getTime();
			
			var secs_past = Math.floor((now - game.start_time) / 1000);
			var x = (game.canvas.get_width()-img.get_width()) >> 1;
			if ((secs_past % 10) == 0) {
				game.canvas.add_object(
					new FallnCatch.Objects.FallingTimie(
						game,
						new GE.Img.Image(
							game.res_manager.get_object_by_handle(
								'falling_timie1'
							)
						),
						new MathExt.LinAlg3D.Vector(x, 0, 10)
					)
				);
			}
			
			game.time_left = Math.round(
				(FallnCatch.Game.TIME_LIMIT + game.bonus_time)
				- secs_past
			);
			
			if (game.time_left < 0) {
				game.time_left = 0;
				window.clearInterval(game.timer_interval);
				game.stop();
			}
		},
		1000
	);
};

FallnCatch.Game.prototype.stop = function() {
	this.state = FallnCatch.Game.STATE_DIED;
	
	this.canvas.add_object(
		new GE.Objects.TextObject(
			this,
			new GE.Txt.Text(
				"Game Over", 100
			),
			new MathExt.LinAlg3D.Vector(
				20,
				(this.canvas.get_height() >> 1) - 120,
				1000
			)
		)
	);
	
	this.canvas.add_object(
		new GE.Objects.TextObject(
			this,
			new GE.Txt.Text(
				'Score: ' + this.score, 100
			),
			new MathExt.LinAlg3D.Vector(
				20,
				(this.canvas.get_height() >> 1) + 20,
				1000
			)
		)
	);
	
};

FallnCatch.Game.prototype.add_score = function(amt, obj) {
	this.score += GE.ValueChecker.int(amt, 'amt');
	
	if (this.score > (this.level * 100))
		this.level_up();
	
	this.canvas.add_object(
		new FallnCatch.Objects.ScorePlus10(
			this,
			new GE.Img.Image(
				this.res_manager.get_object_by_handle(
					'plus10'
				)
			),
			new MathExt.LinAlg3D.Vector(obj.get_x(), obj.get_y(), 10)
		)
	);
};

FallnCatch.Game.prototype.substract_score = function(amt, obj) {
	this.score -= GE.ValueChecker.int(amt, 'amt');
	this.canvas.add_object(
		new FallnCatch.Objects.ScorePlus10(
			this,
			new GE.Img.Image(
				this.res_manager.get_object_by_handle(
					'minus10'
				)
			),
			new MathExt.LinAlg3D.Vector(obj.get_x(), obj.get_y(), 10)
		)
	);
};

FallnCatch.Game.prototype.add_time = function(amt, obj) {
	this.bonus_time += GE.ValueChecker.int(amt, 'amt');
	
	this.canvas.add_object(
		new FallnCatch.Objects.ScorePlus10(
			this,
			new GE.Img.Image(
				this.res_manager.get_object_by_handle(
					'falling_timie1'
				)
			),
			new MathExt.LinAlg3D.Vector(obj.get_x(), obj.get_y(), 10)
		)
	);
};

FallnCatch.Game.prototype.level_up = function() {
	this.level++;
};

FallnCatch.Game.prototype.get_score = function() {
	return this.score;
};

FallnCatch.Game.prototype.get_level = function() {
	return (this.level > 0) ? this.level : 0;
};

FallnCatch.Game.prototype.get_time_left = function() {
	return this.time_left;
};

FallnCatch.Game.prototype.handle_key_down = function(e) {
    var key = e.charCode ? e.charCode : e.keyCode;
    switch (key) {
    	case KEYS.RIGHT_ARROW:
    		if (this.state == FallnCatch.Game.STATE_RUNNING)
    			this.protagonist.move_right();
			break;
		case KEYS.LEFT_ARROW:
			if (this.state == FallnCatch.Game.STATE_RUNNING)
				this.protagonist.move_left();
			break;
		case KEYS.RETURN:
			if (this.state == FallnCatch.Game.STATE_DIED)
				this.start();
    }
};

FallnCatch.Game.prototype.handle_key_up = function(e) {
	if (this.state == FallnCatch.Game.STATE_RUNNING)
		this.protagonist.move_stop();
};