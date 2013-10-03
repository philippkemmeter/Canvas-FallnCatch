if (typeof(MathExt.LinAlg3D) == 'undefined')
	MathExt.LinAlg3D = new Object();

/**
 * Ein einfacher 3D-Vektor mit Operationen.
 * 
 * @param float x
 * @param float y
 * @param float z
 */
MathExt.LinAlg3D.Vector = function(x, y, z) {
	if (typeof(x) != 'undefined') {
		this.x = Number(x);
		this.y = Number(y);
		this.z = Number(z);
	}
};

/**
 * Addiert den übergebenen Vektor zum aktuellen und gibt einen neuen Vektor
 * zurück, der das Ergebnis enthält.
 * 
 * @param MathExt.LinAlg3D.Vector p
 * @return MathExt.LinAlg3D.Vector
 */
MathExt.LinAlg3D.Vector.prototype.add = function(p) {
	return new MathExt.LinAlg3D.Vector(this.x+p.x, this.y+p.y, this.z+p.z);
};

MathExt.LinAlg3D.Vector.prototype.substract = function(p) {
	return new MathExt.LinAlg3D.Vector(this.x-p.x, this.y-p.y, this.z-p.z);
};

/**
 * Berechnet das Skalarprodukt des Vektores mit dem übergebenen Vektor p.
 * 
 * @param MathExt.LinAlg3D.Vector p
 * @return float
 */
MathExt.LinAlg3D.Vector.prototype.dot_product = function(p) {
	return this.x*p.x + this.y*p.y + this.z*p.z;
};

/**
 * Berechnet die Skalarmultiplikation des Vektores.
 * 
 * @param float s
 * @return MathExt.LinAlg3D.Vector
 */
MathExt.LinAlg3D.Vector.prototype.scalar_mult = function(s) {
	return new MathExt.LinAlg3D.Vector(this.x*s, this.y*s, this.z*s);
};

MathExt.LinAlg3D.Vector.prototype.get_vector_length = function() {
	return Math.sqrt(this.dot_product(this));
};