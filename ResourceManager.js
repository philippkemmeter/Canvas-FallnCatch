GE.ResourceManager = function() {
    this.loadcount = 0;
    this.objects = new Array();
    this.urls = new Array();
	this.handles = new Array();
};

GE.ResourceManager.prototype.add_image = function (url, handle) {
    this.loadcount++;
    var i = this.objects.length;
    this.urls[i] = url;
	this.handles[i] = '' + handle;

    loader = this;

    this.objects[i] = new Image();
    this.objects[i].onload = function () {
        loader.loadcount--;
    }
    this.objects[i].src = url;
};

GE.ResourceManager.prototype.add_sound = function (url, handle) {
    this.loadcount++;
    var i = this.objects.length;
    this.urls[i] = url;
	this.handles[i] = '' + handle;

    loader = this;
	
	// http://www.whatwg.org/specs/web-apps/current-work/#mediaevents
	// http://api.jquery.com/bind/
	
	this.objects[i] = new Audio();
	$(this.objects[i]).bind('canplaythrough', function() { // totally loaded

	  loader.loadcount--;
	});

	this.objects[i].src = url;
	this.objects[i].load();	
};

GE.ResourceManager.prototype.add_text = function (url, handle) {
    this.loadcount++;
    var i = this.objects.length;
    this.urls[i] = url;
	this.handles[i] = '' + handle;

    loader = this;
    this.objects[i] = url;
    $.ajax({
        url: url,
        success: function (data, text_status, XMLHttpRequest) {
            loader.set_object(this.url, data);
            loader.loadcount--;
        },
        async: true,
        type: 'GET'
    });
};

GE.ResourceManager.prototype.find_object = function (url) {
    //find the index in the url's array
    for (var i = 0; i < this.urls.length; i++)
        if (this.urls[i] == url)
            return i;

    return -1;

};

GE.ResourceManager.prototype.find_object_by_handle = function (handle) {
    //find the index in the url's array
    for (var i = 0; i < this.handles.length; i++)
        if (this.handles[i] == handle)
            return i;

    return -1;

};

GE.ResourceManager.prototype.get_object = function (url) {
    var index = this.find_object(url);

    if (index > -1)
        return this.objects[index];

    alert(url + ' not loaded');
    return null;
};

GE.ResourceManager.prototype.get_object_by_handle = function (handle) {
    var index = this.find_object_by_handle(handle);

    if (index > -1)
        return this.objects[index];

    alert(handle + ' not found');
    return null;
};

GE.ResourceManager.prototype.set_object = function (url, o) {
    var index = this.find_object(url);

    if (index > -1) {
        this.objects[index] = o;
        return true;
    }

    return false;
};