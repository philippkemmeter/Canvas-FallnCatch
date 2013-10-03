GE = {};

/**
 * Checks if a is instance of b
 */
GE.instance_of = function(a, b) {
	if (!a.constructor) {
		return false;
	}
	if ((a.constructor === b)
		|| ((b.constructor && (b.constructor == a.constructor))))
	{
		return true;
	}
	if (!a.constructor.parent) {
		return false;
	}
	return GE.instance_of(a.constructor.parent, b);
};

/**
 * Prüft, ob zwei Objekte gleich sind.
 */
GE.equals = function(obj1, obj2, exact_match) {
	if ((typeof(obj1) != 'object') || (typeof(obj2) != 'object'))
		return false;
	
	var n = 0;
	for (var i in obj1) {
		if (typeof(obj1[i]) != typeof(obj2[i]))
			return false;
		if (typeof(obj1[i]) == 'object') {
			if (!GE.equals(obj1[i], obj2[i], exact_match))
				return false;
		}
		if ((exact_match && (obj1[i] !== obj2[i]))
				|| (!exact_match && (obj1[i] != obj2[i])))
			return false;
		n++;
	}
	var m = 0;
	for (var i in obj2)
		m++;
	if (n != m)
		return false;
	
	return true;
}

/**
 * Gibt die Parameter, welche über die URL mitgeliefert wurden, als ein Objekt
 * zurück mit OBJ.key = value.
 * 
 * @param string params			Die URL-Paramter (?x=u&z0=hase&...)
 * @return Object
 */
GE.get_url_params = function(params) {
	var param_arr = params.substr(1).split('&');
	var n = param_arr.length;
	var pair;
	var result = new Object();
	for (var i = 0; i < n; i++) {
		pair = param_arr[i].split('=');
		result[pair[0]] = pair[1];
	}
	return result;
};

/**
 * Trimmt einen String (wie PHP-Trim). Wird chars angegeben, werden diese
 * Buchstaben herausgefiltert am Anfang und Ende des Strings, sonst wie in PHP
 * \0
 * \t
 * \r
 * \n
 * " "
 * \x0B (vertical Tab)
 * 
 * Basiert auf der Idee und Umsetzung von http://www.webtoolkit.info/.
 * 
 * @param String s
 * @param String characters 
 * @see http://www.webtoolkit.info/
 */
GE.trim = function(s, characters) {
	if (s)
		return GE.ltrim(GE.rtrim(s, characters), characters);
	else
		return '';
};

/**
 * Trimmt den String nur von links.
 * @see GE.trim
 * @see http://www.webtoolkit.info/
 */
GE.ltrim = function(s, characters) 
{
	if (s)
		return s.replace(new RegExp("^[" + (characters||"\\s") + "]+", "g"), "");
	else
		return '';
};

/**
 * Trimmt den String nur von links.
 * @see GE.trim
 * @see http://www.webtoolkit.info/
 */
GE.rtrim = function(s, characters)
{
	if(s)
		return s.replace(new RegExp("[" + (characters||"\\s") + "]+$", "g"), "");
	else
		return '';
};

/********************************************************************
 * DOM-Elementmanipulationen und -Erhalten
 ********************************************************************/

/**
 * Hilfsfunktion für getElemById zur Durchsuchung aller Frames nach einem
 * Objekt
 * 
 * @param string id
 * @return HTMLElement
 */
GE._get_elem_by_id_frames = function(id) {
	var elem,i;
    for (i = 0; i < frames.length; i++) {
        try {
            elem = frames[i].document.getElementById(id);
            if ((elem) && (typeof(elem) !== 'undefined'))
                return elem;
        }
        catch (e){}
    }
    return null;
}

/**
 * Gibt das Element mit der ID zurück, auch wenn es sich in einer Frame
 * unterhalb des Dokuments befindet. Somit eine Erweiterung von 
 * document.getElementById
 * 
 * @param string id
 * @return HTMLElement
 */
document.getElemById = function(id) {
	var elem;
    try {
        elem = document.getElementById(id);
        if ((elem) && (typeof(elem) !== 'undefined'))
            return elem;
        else {
        	if (elem = GE._get_elem_by_id_frames(id))
        		return elem;
        	else
        		return null;
        }
    }
    catch (e) {
    	if (elem = GE._get_elem_by_id_frames(id))
    		return elem;
    	else
    		throw new Error("getElem("+id+") has no properties.");
    }
};

/**
 * Setzt das InnerHTML des angegebenen Elements. Im Gegensatz zu 
 * "HTMLElement.innerHTML = XY" ist liegt der Nutzen dieser Funktion in der
 * zusätzlichen Möglichkeit, dass enthaltenes Javascript interpretiert wird,
 * was gerade für AJAX-Anwendungen interessant ist.
 * 
 * @param HTMLElement elem
 * @param string text
 * @param bool interprete_js	[default=false]
 */
document.setElemInnerHTML = function(elem, text, interprete_js) {
	if (typeof(elem) === 'string')
		elem = document.getElemById(elem);
	if (interprete_js) {
		elem.innerHTML = '';
		var arr2, arr1 = text.split('<script');
	    var i,j,k,m,n = arr1.length;
	    for (i = 0, k = false; i < n; i++) {
	        arr2 = arr1[i].split('</script>');
	        m = arr2.length;
	        for (j = 0; j < m; j++, k=!k) {
	            if (k) {
	        		eval(arr2[j].substr(arr2[j].indexOf('>')+1));
	            }
	            else {
	                elem.innerHTML = elem.innerHTML + arr2[j];
	            }
	        }
	    }
	}
	else
		elem.innerHTML = text;
};

/********************************************************************
 * Erweiterungen der built-in sowie Host-Objekte
 ********************************************************************/

/**
 * Erweiterung des Function-Objekts um eine einfache Vererbungsmethodik.
 * Die Vererbung bleibt - Javascript getreu - prototypbasiert, es wird
 * zusätzlich ein Link zum Vater erstellt: this.parent.
 * 
 * @param Object parent_o
 */
Function.prototype.extend = function(parent_o) {
	/**
	 * Wenn es sich bei der Vaterklasse um eine nicht-statische und 
	 * nicht-abstrake Klasse handelt, dann den Prototyp entsprechend erweitern
	 * (denn <code>this</code> ist somit notwendigerweise auch nicht-statisch
	 * und nicht-abstrakt)
	 */
	if (parent_o.constructor == Function) {
		this.prototype = new parent_o;
		this.prototype.constructor = this;
		this.parent = parent_o.prototype;
	}
	else {
		/**
		 * Andernfalls wird der Prototyp entsprechend erweitert und der
		 * Konstruktor gesetzt.
		 */
		for (x in parent_o)
			this.prototype[x] = parent_o[x];
		this.prototype.constructor = this;
		this.parent = parent_o;
	}
};

/**
 * Ergänzt das Array-Objekt um die Funktion contains, welche angibt, ob
 * das Array den übergebenen Wert enthält.
 * 
 * @param mixed obj
 * @return boolean
 */
Array.prototype.contains = function(obj, excat_match) {
	if (typeof(exact_match) == 'undefined')
		exact_match = true;
	var listed = false;
	for (var i = 0; i < this.length; i++) {
		if ((exact_match && (this[i] === obj)) 
			|| (!exact_match && this[i] == obj)) 
		{
			listed = true;
			break;
		}
	}
	return listed;
};

/**
 * Ergänzt das Array-Objekt um die Funktion search, welche den Indexschlüssel
 * zurückgibt, unter welchem das angegebene Objekt abgelegt ist. Wird das
 * Element nicht gefunden, wird -1 zurückgegeben.
 * 
 * @param mixed obj
 * @return {-1, 0, 1, ..., n-1}
 */
Array.prototype.search = function(obj, exact_match) {
	if (typeof(exact_match) == 'undefined')
		exact_match = true;

	if (typeof(obj) == 'object') {
		for (var i = 0; i < this.length; i++) {
			if (GE.equals(this[i], obj, exact_match))
				return i;
		}
	}
	else {
		for (var i = 0; i < this.length; i++) {
			if ((exact_match&&(this[i] === obj))
					|| (!exact_match&&(this[i] == obj)))
				return i;
		}
	}

	return -1;
};

/**
 * Entfernt das angegebene Objekt aus dem Array. Wird der letzte Parameter
 * "max_removements" kann optional angegeben werden, um anzugeben, wie viele 
 * Vorkommen des Objekts maximal gelöscht werden dürfen.
 * 
 * @param mixt obj
 * @param uint max_removements
 * @return Array	Gibt sich selbst nach der Operation zurück
 */
Array.prototype.remove = function(obj, max_removements) {
    var i = 0;
    var n = this.length;
    var r = 0;
    while ((i < n) && (!max_removements || ((r < max_removements)))) {
        if (this[i] === obj){
            this.splice(i, 1);
            r++;
            n--;
        } else {
            i++;
        }
    }
    return this;
};

/**
 * Zerstört das Array und ruft destroy für alle Kinder auf.
 */
Array.prototype.destroy = function() {
	for (var i = 0; i < this.length; i++) {
		if (typeof(this[i]) !== 'function') {
			try {
				this[i].destroy();
			}
			catch(e) {
				try {
					delete this[i];
				}
				catch(e) {}
			}
		}
	}
	try {
		delete this;
	}
	catch(e) {}
}

/**
 * Mischt das Array (basiert auf Fisher-Yates-Algorithmus)
 */
Array.prototype.shuffle = function() {
	var i = this.length;
	if ( i == 0 )
		return this;
	while ( --i ) {
		var j = Math.floor( Math.random() * ( i + 1 ) );
		var tempi = this[i];
		var tempj = this[j];
		this[i] = tempj;
		this[j] = tempi;
	}
	return this;
};

/**
 * Gibt ein zufällig gezogenes Element zurück
 * 
 * @return mixed
 */
Array.prototype.random = function() {
	return this[Math.floor(Math.random()*this.length)];
};

/**
 * Array-Push-Methode, wenn noch nicht existent
 */
if (!Array.prototype.push) {
	Array.prototype.push = function(elem) {
		this[this.length] = elem;
	}
};

/**
 * Prüft, ob a ein Array ist.
 * 
 * @param mixed a
 * @return bool
 */
isArray = function (a) {
	return ((a && (typeof a == 'object')) || (typeof a == 'function')) 
		&& (typeof(a.length) != 'undefined');
};

/**
 * Math-Objekt wird um die sign-Funktion erweitert.
 */
if (!Math.sign) {
	Math.sign = function(n) {
		if (n > 0)
			return 1;
		if (n < 0)
			return -1;
		else
			return 0;
	}
};

/**
 * Rückgabe des Strings als Kopie mit erstem Buchstaben groß.
 * @return
 */
String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

/**
 * Gibt standardisiert zurück, wie weit das Dokument in x-Richtung gescrollt 
 * wurde.
 * 
 * @return uint
 */
document.getScrollX = function() {
	return document.documentElement && document.documentElement.scrollLeft ?
			document.documentElement.scrollLeft : document.body.scrollLeft;
};

/**
 * Gibt standardisiert zurück, wie weit das Dokument in y-Richtung gescrollt 
 * wurde.
 * 
 * @return uint
 */
document.getScrollY = function() {
	return document.documentElement && document.documentElement.scrollTop ?
			document.documentElement.scrollTop : document.body.scrollTop
};