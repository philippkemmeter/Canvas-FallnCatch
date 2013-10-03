/*
 * Verwaltet Server-(Ajax)-Requests. Antworten vom Server werden als JSON
 * erwartet.
 *
 * @author Philipp Kemmeter
 */


/** Alles statisch */
GE.Ajax = {};

/** Welche Funktion bei erfolgreichem Request aufgerufen werden soll */
GE.Ajax.callback_functions = [];

/**
 * Der Name der Session, den der Server vergeben hat (muss mitgesandt werden
 * zur Identifikation der Verbindung
 */
GE.Ajax.session_name = 'sid';

/**
 * Die ID der Session, den der Server vergeben hat (muss mitgesandt werden
 * zur Identifikation der Verbindung
 */
GE.Ajax.session_id = '';

/**
 * Array von XHR-Objekten. Immer, wenn gerade eines in Gebrauch
 * ist, wird ein neues erzeugt. Alte, ungenutzte, werden dann wieder
 * freigegeben und deren Slots können erneut benutzt werden.
 */
GE.Ajax.xml_http_requests = [];

/**
 * Array, das angibt, ob das XHR-Objekt in xml_http_requests mit demselben
 * Index gerade in gebrauch ist, oder nicht.
 */
GE.Ajax.xhr_available = [];

/**
 * Anzahl der Requests. Wird beim Abschicken hochgezählt, damit Cachen
 * vermieden wird.
 */
GE.Ajax.request_num = 0;

/**
 * Gibt ein neu erzeugtes XHR-Objekt zurück
 *
 * @return XMLHttpRequest
 * @throws Error
 */
GE.Ajax.create_new_request = function() {
	if (typeof XMLHttpRequest != 'undefined')
		return new XMLHttpRequest();
	else if (window.ActiveXObject) {
		var avers = ["Microsoft.XmlHttp", "MSXML2.XmlHttp",
		             "MSXML2.XmlHttp.3.0",  "MSXML2.XmlHttp.4.0",
		             "MSXML2.XmlHttp.5.0"];
		for (var i = avers.length -1; i >= 0; i--) {
			try {
				httpObj = new ActiveXObject(avers[i]);
				return httpObj;
			} catch(e) {}
		}
	}
	throw new Error('XMLHttp (AJAX) not supported');
};


/**
 * Gibt den Index des nächsten freien XHR-Objekts zurück
 *
 * @access private
 * @return uint
 * @throws Error
 */
GE.Ajax.get_xhr_index = function() {
	var n = GE.Ajax.xhr_available.length;
	var result;
	for (var i = 0; i < n; i++) {
		if (GE.Ajax.xhr_available[i]) {
			result = i;
			break;
		}
	}

	if (i == n) {
		// Wenn kein neues gefunden werden konnte, dann ein neues erzeugen
		GE.Ajax.xml_http_requests[n] =
			GE.Ajax.create_new_request();
		result = n;
	}
	// und als "not available" markieren
	GE.Ajax.xhr_available[result] = false;

	return result;
};

/**
 * Sendet einen Request an den durch die URL bestimmten Server. Wird post_data
 * angegeben, werden sie als POST-Daten versandt, ansonsten wird die URL
 * inklusive aller mitgelieferten Parameter als GET versandt.
 * Die angegebene callback_function wird dann bei Erfolg aufgerufen.
 *
 * @param string url					Bestimmt das Ziel des Requests
 * @param Function callback_function	Welche Funktion bei Erfolg aufzurufen
 *                                      ist
 * @param string post_data[optional]	ggf. POST-Daten zum Versenden
 * @param bool no_parse[=false]			Ob die Serverantwort geparst werden
 *                                      soll
 * @throws Error						wenn Request nicht gesendet werden
 *                                      konnte
 */

GE.Ajax.send_request = function(url, callback_function, post_data, no_parse) {
	var xhri = GE.Ajax.get_xhr_index();
	var xhr = GE.Ajax.xml_http_requests[xhri];

	GE.Ajax.callback_functions[xhri] = callback_function;
	var method = typeof(post_data == 'undefined') ? "GET" : "POST";

	url = (url.indexOf('?') == -1) ? url + '?' : url + '&';
	url += "anti_cache=" + GE.Ajax.request_num;
	if (GE.Ajax.session_name && GE.Ajax.session_id)
		url += "&"+GE.Ajax.session_name + "="
				+ GE.Ajax.session_id;
	xhr.open(method, url, true);
	xhr.onreadystatechange = function() {
		var my_xhr = GE.Ajax.xml_http_requests[xhri];
		if ((my_xhr.readyState == 4) && (my_xhr.status == 200)) {
			GE.Ajax.xhr_available[xhri] = true;

			if (GE.Ajax.callback_functions[xhri]) {
				if(no_parse) {
					GE.Ajax.callback_functions[xhri].call(this,
						null, my_xhr.responseText);
				}
				else {
					if (JSON && JSON.parse)
						var o = JSON.parse(my_xhr.responseText);
					else
						var o = eval('(' + my_xhr.responseText + ')');

					if (o.sid)
						GE.Ajax.session_id = o.sid;

					GE.Ajax.callback_functions[xhri].call(this,
						o.err, o.result);
				}
			};
		}
	};
	if (method == "POST") {
		xhr.setRequestHeader("Content-type",
			"application/x-www-form-urlencoded;charset=UTF-8");
		/* Unsafe: Wird von modernen Browser nicht erlaubt
		 * xhr.setRequestHeader("Content-length", post_data.length);
		 */
		xhr.send(encodeURI(post_data));
	}
	else {
		xhr.setRequestHeader("Content-type",
			"text/plain;charset=UTF-8");
		/* Unsafe: Wird von modernen Browser nicht erlaubt
		 * xhr.setRequestHeader("Content-length", 0);
		 */
		xhr.send(null);
	}
	GE.Ajax.request_num++;
	return true;
};

