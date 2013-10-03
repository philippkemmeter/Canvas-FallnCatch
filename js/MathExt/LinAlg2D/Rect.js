if (typeof(MathExt.LinAlg2D) == 'undefined')
	MathExt.LinAlg2D = new Object();

/**
 * Ein Rechteck
 * 
 * @param float x
 * @param float y
 * @param ufloat w
 * @param ufloat h
 */
MathExt.LinAlg2D.Rect = function (x, y, w, h) {
	if (typeof(x) != 'undefined') {
		this.x = Number(x);
		this.y = Number(y);
		this.width = Number(w);
		this.height = Number(h);
	}
};

/**
 * Prüft, ob das Rechteck mit dem angegebenen Rechteck überlappt.
 * 
 * Gibt einen 2D-Vektor zurück, der angibt, wie weit sie in x- und y-Richtung
 * überlappen.
 * 
 * Findet keine Überlappung statt, wird NULL zurückgegeben.
 * 
 * @param MathExt.LinAlg2D.Rect r
 * @return MaxtExt.LinAlg2D.Vector
 */
MathExt.LinAlg2D.Rect.prototype.check_overlap_rect = function(r) {
	var m1 = new MathExt.LinAlg2D.Vector(
		this.x + (this.width >> 1),
		this.y + (this.height >> 1)
	);
	var m2 = new MathExt.LinAlg2D.Vector(
		r.x + (r.width >> 1),
		r.y + (r.height >> 1)
	);
	
	var dist = m1.substract(m2);
	var min_dist = new MathExt.LinAlg2D.Vector(
		(this.width + r.width) >> 1,
		(this.height + r.height) >> 1
	);
	
	if (Math.abs(dist.x) >= min_dist.x || Math.abs(dist.y) >= min_dist.y)
		return null;
	
	dist.x = (dist.x > 0) ? min_dist.x - dist.x : -min_dist.x - dist.x;
	dist.y = (dist.y > 0) ? min_dist.y - dist.y : -min_dist.y - dist.y;
	
	return dist;
};

/**
 * Verschiebt das Rechteck um den angegebenen Vektor und gibt ein neues
 * Rechteck mit den neuen Koordinaten zurück.
 * 
 * @param MathExt.LinAlg2D.Vector p
 * @return MathExt.LinAlg2D.Rect
 */
MathExt.LinAlg2D.Rect.prototype.translate = function(p) {
	return new MathExt.LinAlg2D.Rect(
		this.x + p.x, this.y + p.y, this.width, this.height
	);
};