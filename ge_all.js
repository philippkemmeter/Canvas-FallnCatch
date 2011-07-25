GE={}
;GE.instance_of=function(a,b){if(!a.constructor){return false;}
if((a.constructor===b)||((b.constructor&&(b.constructor==a.constructor)))){return true;}
if(!a.constructor.parent){return false;}
return GE.instance_of(a.constructor.parent,b);}
;GE.equals=function(ab,bb,cb){if((typeof(ab)!='object')||(typeof(bb)!='object'))return false;var n=0;for(var i in ab){if(typeof(ab[i])!=typeof(bb[i]))return false;if(typeof(ab[i])=='object'){if(!GE.equals(ab[i],bb[i],cb))return false;}
if((cb&&(ab[i]!==bb[i]))||(!cb&&(ab[i]!=bb[i])))return false;n++;}
var m=0;for(var i in bb)m++;if(n!=m)return false;return true;}
GE.get_url_params=function(db){var eb=db.substr(1).split('&');var n=eb.length;var fb;var gb=new Object();for(var i=0;i<n;i++){fb=eb[i].split('=');gb[fb[0]]=fb[1];}
return gb;}
;GE.trim=function(s,hb){if(s)return GE.ltrim(GE.rtrim(s,hb),hb);else
return'';}
;GE.ltrim=function(s,hb){if(s)return s.replace(new RegExp("^["+(hb||"\\s")+"]+","g"),"");else
return'';}
;GE.rtrim=function(s,hb){if(s)return s.replace(new RegExp("["+(hb||"\\s")+"]+$","g"),"");else
return'';}
;GE._get_elem_by_id_frames=function(ib){var jb,i;for(i=0;i<frames.length;i++){try{jb=frames[i].document.getElementById(ib);if((jb)&&(typeof(jb)!=='undefined'))return jb;}
catch(e){}
}
return null;}
document.getElemById=function(ib){var jb;try{jb=document.getElementById(ib);if((jb)&&(typeof(jb)!=='undefined'))return jb;else{if(jb=GE._get_elem_by_id_frames(ib))return jb;else
return null;}
}
catch(e){if(jb=GE._get_elem_by_id_frames(ib))return jb;else
throw new Error("getElem("+ib+") has no properties.");}
}
;document.setElemInnerHTML=function(jb,text,kb){if(typeof(jb)==='string')jb=document.getElemById(jb);if(kb){jb.innerHTML='';var lb,mb=text.split('<script');var i,j,k,m,n=mb.length;for(i=0,k=false;i<n;i++){lb=mb[i].split('</script>');m=lb.length;for(j=0;j<m;j++,k=!k){if(k){eval(lb[j].substr(lb[j].indexOf('>')+1));}
else{jb.innerHTML=jb.innerHTML+lb[j];}
}
}
}
else
jb.innerHTML=text;}
;Function.prototype.extend=function(nb){if(nb.constructor==Function){this.prototype=new nb;this.prototype.constructor=this;this.parent=nb.prototype;}
else{for(x in nb)this.prototype[x]=nb[x];this.prototype.constructor=this;this.parent=nb;}
}
;Array.prototype.contains=function(ob,pb){if(typeof(cb)=='undefined')cb=true;var qb=false;for(var i=0;i<this.length;i++){if((cb&&(this[i]===ob))||(!cb&&this[i]==ob)){qb=true;break;}
}
return qb;}
;Array.prototype.search=function(ob,cb){if(typeof(cb)=='undefined')cb=true;if(typeof(ob)=='object'){for(var i=0;i<this.length;i++){if(GE.equals(this[i],ob,cb))return i;}
}
else{for(var i=0;i<this.length;i++){if((cb&&(this[i]===ob))||(!cb&&(this[i]==ob)))return i;}
}
return-1;}
;Array.prototype.remove=function(ob,rb){var i=0;var n=this.length;var r=0;while((i<n)&&(!rb||((r<rb)))){if(this[i]===ob){this.splice(i,1);r++;n--;}
else{i++;}
}
return this;}
;Array.prototype.destroy=function(){for(var i=0;i<this.length;i++){if(typeof(this[i])!=='function'){try{this[i].destroy();}
catch(e){try{delete this[i];}
catch(e){}
}
}
}
try{delete this;}
catch(e){}
}
Array.prototype.shuffle=function(){var i=this.length;if(i==0)return this;while(--i){var j=Math.floor(Math.random()*(i+1));var sb=this[i];var tb=this[j];this[i]=tb;this[j]=sb;}
return this;}
;Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)];}
;if(!Array.prototype.push){Array.prototype.push=function(jb){this[this.length]=jb;}
}
;isArray=function(a){return((a&&(typeof a=='object'))||(typeof a=='function'))&&(typeof(a.length)!='undefined');}
;if(!Math.sign){Math.sign=function(n){if(n>0)return 1;if(n<0)return-1;else
return 0;}
}
;String.prototype.ucfirst=function(){return this.charAt(0).toUpperCase()+this.substr(1);}
;document.getScrollX=function(){return document.documentElement&&document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;}
;document.getScrollY=function(){return document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop
}
;KEYS={}
;KEYS.BACKSPACE=8;KEYS.TAB=9;KEYS.ENTER=13;KEYS.SHIFT=16;KEYS.CTRL=17;KEYS.ALT=18;KEYS.PAUSE=19;KEYS.BREAK=19;KEYS.CAPS_LOCK=20;KEYS.ESCAPE=27;KEYS.PAGE_UP=33;KEYS.PAGE_DOWN=34;KEYS.END=35;KEYS.HOME=36;KEYS.LEFT_ARROW=37;KEYS.UP_ARROW=38;KEYS.RIGHT_ARROW=39;KEYS.DOWN_ARROW=40;KEYS.INSERT=45;KEYS.DELETE=46;KEYS._0=48;KEYS._1=49;KEYS._2=50;KEYS._3=51;KEYS._4=52;KEYS._5=53;KEYS._6=54;KEYS._7=55;KEYS._8=56;KEYS._9=57;KEYS.A=65;KEYS.B=66;KEYS.C=67;KEYS.D=68;KEYS.E=69;KEYS.F=70;KEYS.G=71;KEYS.H=72;KEYS.I=73;KEYS.J=74;KEYS.K=75;KEYS.L=76;KEYS.M=77;KEYS.N=78;KEYS.O=79;KEYS.P=80;KEYS.Q=81;KEYS.R=82;KEYS.S=83;KEYS.T=84;KEYS.U=85;KEYS.V=86;KEYS.W=87;KEYS.X=88;KEYS.Y=89;KEYS.Z=90;KEYS.LEFT_WINDOW_KEY=91;KEYS.RIGHT_WINDOW_KEY=92;KEYS.SELECT_KEY=93;KEYS.NUMPAD_0=96;KEYS.NUMPAD_1=97;KEYS.NUMPAD_2=98;KEYS.NUMPAD_3=99;KEYS.NUMPAD_4=100;KEYS.NUMPAD_5=101;KEYS.NUMPAD_6=102;KEYS.NUMPAD_7=103;KEYS.NUMPAD_8=104;KEYS.NUMPAD_9=105;KEYS.MULTIPLY=106;KEYS.ADD=107;KEYS.SUBTRACT=109;KEYS.DECIMAL_POINT=110;KEYS.DIVIDE=111;KEYS.F1=112;KEYS.F2=113;KEYS.F3=114;KEYS.F4=115;KEYS.F5=116;KEYS.F6=117;KEYS.F7=118;KEYS.F8=119;KEYS.F9=120;KEYS.F10=121;KEYS.F11=122;KEYS.F12=123;KEYS.NUM_LOCK=144;KEYS.SCROLL_LOCK=145;KEYS.SEMICOLON=186;KEYS.EQUAL_SIGN=187;KEYS.COMMA=188;KEYS.DASH=189;KEYS.PERIOD=190;KEYS.FORWARD_SLASH=191;KEYS.GRAVE_ACCENT=192;KEYS.OPEN_BRACKET=219;KEYS.BACK_SLASH=220;KEYS.CLOSE_BRAKET=221;KEYS.SINGLE_QUOTE=222;GE.ResourceManager=function(){this.loadcount=0;this.objects=new Array();this.urls=new Array();this.handles=new Array();}
;GE.ResourceManager.prototype.add_image=function(ub,vb){this.loadcount++;var i=this.objects.length;this.urls[i]=ub;this.handles[i]=''+vb;wb=this;this.objects[i]=new Image();this.objects[i].onload=function(){wb.loadcount--;}
this.objects[i].src=ub;}
;GE.ResourceManager.prototype.add_sound=function(ub,vb){this.loadcount++;var i=this.objects.length;this.urls[i]=ub;this.handles[i]=''+vb;wb=this;this.objects[i]=new Audio();$(this.objects[i]).bind('canplaythrough',function(){wb.loadcount--;}
);this.objects[i].src=ub;this.objects[i].load();}
;GE.ResourceManager.prototype.add_text=function(ub,vb){this.loadcount++;var i=this.objects.length;this.urls[i]=ub;this.handles[i]=''+vb;wb=this;this.objects[i]=ub;$.ajax({ub:ub,xb:function(yb,zb,XMLHttpRequest){wb.set_object(this.url,yb);wb.loadcount--;}
,$b:true,_b:'GET'}
);}
;GE.ResourceManager.prototype.find_object=function(ub){for(var i=0;i<this.urls.length;i++)if(this.urls[i]==ub)return i;return-1;}
;GE.ResourceManager.prototype.find_object_by_handle=function(vb){for(var i=0;i<this.handles.length;i++)if(this.handles[i]==vb)return i;return-1;}
;GE.ResourceManager.prototype.get_object=function(ub){var ac=this.find_object(ub);if(ac>-1)return this.objects[ac];alert(ub+' not loaded');return null;}
;GE.ResourceManager.prototype.get_object_by_handle=function(vb){var ac=this.find_object_by_handle(vb);if(ac>-1)return this.objects[ac];alert(vb+' not found');return null;}
;GE.ResourceManager.prototype.set_object=function(ub,o){var ac=this.find_object(ub);if(ac>-1){this.objects[ac]=o;return true;}
return false;}
;GE.ValueChecker={}
;GE.ValueChecker.string=function(bc,cc,dc,ec,fc,gc){if(!dc&&(String(bc).length==0)){throw new Error(cc+' must not be empty; "'+bc+'" given');}
if(gc&&gc.length
&&gc.length>0){for(var i=0,n=gc.length;i<n;i++){if(bc.indexOf(gc.charAt(i))!==-1){throw new Error(cc+' must not contain '+gc.charAt(i)+'; "'+bc+'" given');}
}
}
if((typeof(ec)!='undefined')&&((bc.length)<ec)){throw new Error(cc+' must be at least '+ec+' characters long; '+'"'+bc+'" given');}
if((typeof(fc)!='undefined')&&((bc.length)<fc)){throw new Error(cc+' must be at most '+fc+' characters long; '+'"'+bc+'" given');}
if((typeof(ec)!='undefined')&&(typeof(fc)!='undefined')&&(ec>fc)){throw new Error('max has to be greater than min');}
return String(bc);}
;GE.ValueChecker.float=function(bc,cc,ec,fc){if(typeof(ec)=='undefined'){if(typeof(fc)=='undefined'){if(isNaN(bc)){throw new Error(cc+'=="'+bc+'" ∉ ℝ');}
}
else if(fc==0){if(isNaN(bc)||(bc>fc)){throw new Error(cc+'=="'+bc+'" ∉ ℝ₀⁻');}
}
else if(fc==1){if(isNaN(bc)||(bc>fc)){throw new Error(cc+'=="'+bc+"' ∉ ℝ⁻\{0}");}
}
else{if(isNaN(bc)||(bc>fc)){throw new Error(cc+'=="'+bc+'" ∉ ]-∞; '+fc+']');}
}
}
else{if(typeof(fc)=='undefined'){if(ec==0){if(isNaN(bc)||(bc<ec)){throw new Error(cc+'=="'+bc+'" ∉ ℝ₀⁺');}
}
else if(ec==1){if(isNaN(bc)||(bc<ec)){throw new Error(cc+'=="'+bc+'" ∉ ℝ⁺\{0}');}
}
else{if(isNaN(bc)||(bc<ec)){throw new Error(cc+'=="'+bc+'" ∉ ['+ec+'; ∞]');}
}
}
else{if(ec>fc){throw new Error('max has to be greater than min');;}
if(isNaN(bc)||(bc<ec)||(bc>fc)){throw new Error(cc+'=="'+bc+'" ∉ ['+ec+'; '+fc+']');}
}
}
return parseFloat(bc);}
;GE.ValueChecker.id=function(bc,cc,hc){if(hc)return GE.ValueChecker.int(bc,cc,0);else
return GE.ValueChecker.int(bc,cc,1);}
;GE.ValueChecker.t_stamp=function(bc,cc){return GE.ValueChecker.int(bc,cc,0);}
;GE.ValueChecker.int=function(bc,cc,ec,fc){if(typeof(ec)=='undefined'){if(typeof(fc)=='undefined'){if(bc!=parseInt(bc)){throw new Error(cc+'=="'+bc+'" ∉ ℤ');}
}
else if((bc!=parseInt(bc))||(bc>fc)){throw new Error(cc+'=="'+bc
+'" ∉ {-∞, ..., '+(fc-1)+','+fc+'}');}
}
else{if(typeof(fc)=='undefined'){if(ec==0){if((bc!=parseInt(bc))||(bc<ec)){throw new Error(cc+'=="'+bc+'" ∉ ℕ₀');}
}
else if(ec==1){if((bc!=parseInt(bc))||(bc<ec)){throw new Error(cc+'=="'+bc+'" ∉ ℕ₁');}
}
else{if((bc!=parseInt(bc))||(bc<ec)){throw new Error(cc+'=="'+bc+'" ∉ ['+ec+'; ∞]');}
}
}
else{if(ec>fc){throw new Error('max has to be greater than min');;}
if((bc!=parseInt(bc))||(bc<ec)||(bc>fc)){throw new Error(cc+'=="'+bc
+'" ∉ {'+ec+', '+(ec+1)+', ...∞}');}
}
}
return parseInt(bc);}
;GE.ValueChecker.values=function(bc,cc,ic){if(ic.search(bc)==-1){throw new Error(cc+'=="'+bc+'" ∉ {'+ic.join('}, {')+'}');}
return bc;}
;GE.ValueChecker.bool=function(bc,cc){if((bc!==!!bc)&&(bc!==1)&&(bc!==0))throw new Error(cc+' should be boolean, '+bc+'given');return!!bc;}
;GE.ValueChecker.instance_of=function(bc,cc,jc){try{if(!GE.instance_of(bc,jc)){throw new Error(cc+" has to be an instance of "+jc+'; '+bc.constructor+' given');}
}
catch(e){throw e+"\n"+GE.ValueChecker.instance_of.caller;}
return bc;}
;GE.AnimatedCanvas=function(kc,lc){if(typeof(kc)!='undefined'){this.init(kc,lc);}
}
;GE.AnimatedCanvas.prototype.init=function(kc,lc){lc=GE.ValueChecker.int(lc,'fps',1);this.canvas=document.getElementById(kc);if(!this.canvas.getContext){alert('Your browser is to old...');return;}
this.context=this.canvas.getContext('2d');this.backbuf=document.createElement('canvas');this.backbuf.width=this.canvas.width;this.backbuf.height=this.canvas.height;this.backbuf_context=this.backbuf.getContext('2d');this.fps=lc;this.secs_between_frames=1/this.fps;this.last_frame_time=0;this.fps_vis=false;this.object_cnt_vis=false;this.width=this.canvas.width;this.height=this.canvas.height;this.scale_factor=1;this.game_objects=[];this.abs_game_time=0;}
GE.AnimatedCanvas.prototype.draw=function(){var mc=new Date().getTime();if(this.fps_vis){this.actual_fps=Math.round(1000
/(mc-this.last_frame_time));}
var nc=(mc-this.last_frame_time)/1000;this.abs_game_time+=nc;this.last_frame_time=mc;this._clear_backbuf();for(var i=0;i<this.game_objects.length;){this.game_objects[i].update(nc,this.abs_game_time);if(this.game_objects[i].shall_be_deleted())this.game_objects.splice(i,1);else
i++}
for(var i=0;i<this.game_objects.length;i++){this.game_objects[i].draw(this.backbuf_context,nc);}
this.context.drawImage(this.backbuf,0,0);if(this.fps_vis){this.max_fps=Math.round(1000
/(new Date().getTime()-mc));this.draw_text('Actual FPS: '+this.actual_fps.toString(),20,20);}
if(this.object_cnt_vis){this.draw_text('Objects: '+this.game_objects.length.toString(),20,40
);}
var oc=((this.secs_between_frames*1000)-(new Date().getTime()-mc+1));window.setTimeout((function(pc){return function(){pc.draw();}
}
(this)),oc
);}
GE.AnimatedCanvas.prototype.draw_text=function(text,x,y,qc,rc,sc,tc){text=GE.ValueChecker.string(text,'text');x=GE.ValueChecker.int(x,'x');y=GE.ValueChecker.int(y,'y');if(qc){qc=GE.ValueChecker.int(qc,'font_size',1);}
else{qc=20;}
if(rc){rc=GE.ValueChecker.string(rc,'font_style');}
else{rc='_sans';}
if(sc){sc=GE.ValueChecker.string(sc,'col');}
else{sc='#FFF';}
if(tc){tc=GE.ValueChecker.string(tc,'bgcol');}
this.context.save();this.context.font=qc+'px'+' '+rc;this.context.textBaseline='top';var uc=this.context.measureText(text);if(tc){this.context.fillStyle=tc;this.context.fillRect(x,y,uc.width,qc);}
this.context.fillStyle=sc;this.context.fillText(text,x,y);this.context.restore();}
;GE.AnimatedCanvas.prototype.run=function(){this.las_frame_time=new Date().getTime();this.draw();}
GE.AnimatedCanvas.prototype._clear_backbuf=function(){this.backbuf_context.fillStyle='#000';this.backbuf_context.fillRect(0,0,this.backbuf.width,this.backbuf.height
);}
GE.AnimatedCanvas.prototype.add_object=function(o){o=GE.ValueChecker.instance_of(o,'o',GE.Objects.GameObject);this.game_objects.push(o);o.set_scale_factor(o.get_scale_factor()*this.scale_factor);}
;GE.AnimatedCanvas.prototype.show_fps=function(){this.fps_vis=true;}
;GE.AnimatedCanvas.prototype.hide_fps=function(){this.fps_vis=false;}
;GE.AnimatedCanvas.prototype.show_object_count=function(){this.object_cnt_vis=true;}
;GE.AnimatedCanvas.prototype.hide_object_count=function(){this.object_cnt_vis=false;}
;GE.AnimatedCanvas.prototype.get_height=function(){return this.height;}
;GE.AnimatedCanvas.prototype.get_width=function(){return this.width;}
;GE.AnimatedCanvas.prototype.get_scaled_width=function(){return this.canvas.width;}
;GE.AnimatedCanvas.prototype.get_scaled_height=function(){return this.canvas.height;}
;GE.AnimatedCanvas.prototype.get_objects=function(){return this.game_objects;}
;GE.AnimatedCanvas.prototype.remove_all_objects=function(){this.game_objects=[];}
;GE.AnimatedCanvas.prototype.set_scale_factor=function(s){this.scale_factor=GE.ValueChecker.float(s,'s');this.canvas.width=this.width*s;this.canvas.height=this.height*s;this.backbuf.width=this.canvas.width;this.backbuf.height=this.canvas.height;for(var i=0;i<this.game_objects.length;i++){this.game_objects[i].set_scale_factor(s);}
}
;GE.AnimatedCanvas.prototype.get_scale_factor=function(){return this.scale_factor;}
;GE.EventUtil=new Object();GE.EventUtil.add_event_handler=function(vc,_b,wc){if(vc.addEventListener)vc.addEventListener(_b,wc,false);else if(vc.attachEvent)vc.attachEvent("on"+_b,wc);}
;GE.EventUtil.remove_event_handler=function(vc,_b,wc){if(vc.removeEventListener)vc.removeEventListener(_b,wc,false);else if(vc.detachEvent)vc.detachEvent("on"+_b,wc);}
;GE.EventUtil.formatEvent=function(xc){if(!xc)xc=window.event;if(!xc.stopPropagation){xc.charCode=(xc.type=="keypress")?xc.keyCode:0;xc.eventPhase=2;xc.isChar=(xc.charCode>0);xc.pageX=xc.clientX+document.body.scrollLeft;xc.pageY=xc.clientY+document.body.scrollTop;xc.preventDefault=function(){this.returnValue=false;}
;if(xc.type=="mouseout"){xc.relatedTarget=xc.toElement;}
else if(xc.type=="mouseover"){xc.relatedTarget=xc.fromElement;}
xc.stopPropagation=function(){this.cancelBubble=true;}
;xc.target=xc.srcElement;xc.time=(new Date).getTime();}
return xc;}
;GE.EventUtil.create_event=function(_b,yc){var xc=new Object();xc.bubbles=false;xc.cancelable=false;xc.target=null;xc.timeStamp=(new Date()).getTime();xc.type=_b;xc.detail=yc||0;xc.preventDefault=xc.stopPropagation=function(){}
;return xc;}
GE.Ajax={}
;GE.Ajax.callback_function=[];GE.Ajax.session_name='sid';GE.Ajax.session_id='';GE.Ajax.xml_http_requests=[];GE.Ajax.xhr_available=[];GE.Ajax.request_num=0;GE.Ajax.create_new_request=function(){if(typeof XMLHttpRequest!='undefined')return new XMLHttpRequest();else if(window.ActiveXObject){var zc=["Microsoft.XmlHttp","MSXML2.XmlHttp","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.5.0"];for(var i=zc.length-1;i>=0;i--){try{$c=new ActiveXObject(zc[i]);return $c;}
catch(e){}
}
}
throw new Error('XMLHttp (AJAX) not supported');}
;GE.Ajax.get_xhr_index=function(){var n=GE.Ajax.xhr_available.length;var gb;for(var i=0;i<n;i++){if(GE.Ajax.xhr_available[i]){gb=i;break;}
}
if(i==n){GE.Ajax.xml_http_requests[n]=GE.Ajax.create_new_request();gb=n;}
GE.Ajax.xhr_available[gb]=false;return gb;}
;GE.Ajax.send_request=function(ub,_c,ad,bd){var cd=GE.Ajax.get_xhr_index();var dd=GE.Ajax.xml_http_requests[cd];GE.Ajax.callback_functions[cd]=_c;var ed=(typeof(ad)=='undefined')?"GET":"POST";ub=(ub.indexOf('?')==-1)?ub+'?':ub+'&';ub+="anti_cache="+GE.Ajax.request_num;if(GE.Ajax.session_name&&GE.Ajax.session_id)ub+="&"+GE.Ajax.session_name+"="+GE.Ajax.session_id;dd.open(ed,ub,true);dd.onreadystatechange=function(){var fd=GE.Ajax.xml_http_requests[cd];if((fd.readyState==4)&&(fd.status==200)){GE.Ajax.xhr_available[cd]=true;if(GE.Ajax.callback_functions[cd]){if(bd){GE.Ajax.callback_functions[cd].call(this,null,fd.responseText);}
else{if(JSON&&JSON.parse)var o=JSON.parse(fd.responseText);else
var o=eval('('+fd.responseText+')');if(o.sid)GE.Ajax.session_id=o.sid;GE.Ajax.callback_functions[cd].call(this,o.err,o.result);}
}
;}
}
;if(ed=="POST"){dd.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");dd.send(encodeURI(ad));}
else{dd.setRequestHeader("Content-type","text/plain;charset=UTF-8");dd.send(null);}
GE.Ajax.request_num++;return true;}
;GE.Game=function(gd,hd){if(typeof(gd)!='undefined'){this.init(gd,hd);}
}
;GE.Game.prototype.init=function(gd,hd){this.canvas=GE.ValueChecker.instance_of(hd,'ani_canvas',GE.AnimatedCanvas
);this.res_manager=GE.ValueChecker.instance_of(gd,'res_manager',GE.ResourceManager
);this.scale_factor=1;}
;GE.Game.prototype.check_load_status=function(){var r=this.res_manager;if(r.loadcount>0){var id=100-((r.loadcount/r.objects.length)*100);window.setTimeout((function(pc){return function(){pc.check_load_status()}
}
)(this),100
);}
else{this.start();}
}
;GE.Game.prototype.start=function(){}
;GE.Game.prototype.stop=function(){}
;GE.Game.prototype.get_ani_canvas=function(){return this.canvas;}
;GE.Game.prototype.get_scale_factor=function(){return this.scale_factor;}
;GE.Game.prototype.set_scale_factor=function(s){this.scale_factor=GE.ValueChecker.float(s);this.canvas.set_scale_factor(s);}
;GE.Game.prototype.handle_key_down=function(xc){}
;GE.Game.prototype.handle_key_up=function(xc){}
;if(typeof(GE.Img)!=='object')GE.Img={}
;GE.Img.Image=function(jd){if(typeof(jd)!='undefined'){this.init(jd);}
}
;GE.Img.Image.prototype.init=function(jd){this.image=jd;this.flip_x=false;this.scaled_width=this.image.width;this.scaled_height=this.image.height;this.scale_factor=1;}
;GE.Img.Image.prototype.draw=function(kd,x,y){kd.save();kd.translate(x,y);if(this.flip_x){kd.save();kd.scale(-1,1);kd.translate(-this.image.width,0);}
kd.drawImage(this.image,0,0,this.get_scaled_width(),this.get_scaled_height());if(this.flip_x){kd.restore();}
kd.restore();}
;GE.Img.Image.prototype.get_image=function(){return this.image;}
;GE.Img.Image.prototype.get_flip_x=function(){return this.flip_x;}
;GE.Img.Image.prototype.flip_x=function(){this.flip_x=!this.flip_x;}
;GE.Img.Image.prototype.get_height=function(){return this.image.height;}
;GE.Img.Image.prototype.get_width=function(){return this.image.width;}
;GE.Img.Image.prototype.get_scaled_height=function(){return this.scaled_height;}
;GE.Img.Image.prototype.get_scaled_width=function(){return this.scaled_width;}
;GE.Img.Image.prototype.set_scale_factor=function(s){this.scale_factor=GE.ValueChecker.float(s,'s');this.scaled_width=this.image.width*s;this.scaled_height=this.image.height*s;}
;GE.Img.Image.prototype.get_scale_factor=function(){return this.scale_factor;}
;if(typeof(GE.Img)!=='object')GE.Img={}
;GE.Img.AniImage=function(jd,frames,ld,lc,md){if(typeof(jd)!='undefined'){this.init(jd,frames,ld,lc,md);}
}
;GE.Img.AniImage.extend(GE.Img.Image);GE.Img.AniImage.prototype.init=function(x,y,jd,frames,ld,lc,md){this.constructor.parent.init.call(this,x,y,jd);this.fps=lc;this.cur_frame=0;this.frames=frames;this.loop=ld;this.reversed=md||false;this.time_between_frames=0;this.time_since_last_frame=0;if(this.frames>0)this.frame_width=this.image.width/this.frames;else
this.frame_width=this.image.width;if(md)this.cur_frame=this.frames-1;this.frame_height=this.image.height;this.time_between_frames=1/lc;this.time_since_last_frame=this.time_between_frames;}
;GE.Img.AniImage.prototype.draw=function(kd,x,y,nd){kd.save();kd.translate(x,y);if(this.flip_x){kd.save();kd.scale(-1,1);kd.translate(-this.frame_width,0);}
kd.drawImage(this.image,this.frame_width*nd,0,this.frame_width,this.frame_height,0,0,this.frame_width,this.frame_height
);if(this.flip_x){kd.restore();}
kd.restore();}
GE.Img.AniImage.prototype.draw_next_frame=function(kd,x,y,od){this.draw(kd,x,y,od,this.cur_frame);this.time_since_last_frame-=od;if(this.frames>0){if(this.time_since_last_frame<=0){this.time_since_last_frame=this.time_between_frames;if(this.loop||(!this.reversed&&this.cur_frame+1!=this.frames)||(this.reversed&&this.cur_frame>0)){if(this.reversed){this.cur_frame--;if(this.cur_frame==0)if(this.loop)this.cur_frame=this.frames-1;else
return false;}
else{this.cur_frame++;if(this.cur_frame==this.frames)if(this.loop)this.cur_frame=0;else
return false;}
}
}
}
return true;}
;GE.Img.AniImage.prototype.get_frame_amout=function(){return this.frames;}
;if(typeof(GE.Txt)!='object')GE.Txt={}
;GE.Txt.Text=function(text,pd,qd,rd,sd){if(typeof(text)!='undefined'){this.init(text,pd,qd,rd,sd);}
}
;GE.Txt.Text.prototype.init=function(text,pd,qd,rd,sd){this.text=GE.ValueChecker.string(text,'text');this.size=GE.ValueChecker.int(pd,'size');this.scaled_size=this.size;if(typeof(qd)!='undefined')this.color=GE.ValueChecker.string(qd,'color',false,4,7);else
this.color='#fff';if(typeof(rd)!='undefined')this.bgcolor=GE.ValueChecker.string(rd,'bgcolor',false,4,7);else
this.bgcolor=null;if(typeof(sd)!='undefined')this.family=GE.ValueChecker.string(sd,'family');else
this.family='_sans';this.width=0;this.height=0;this.scale_factor=1;this.scale_factor_changed=true;}
;GE.Txt.Text.prototype.draw=function(kd,x,y){x=GE.ValueChecker.int(x,'x');y=GE.ValueChecker.int(y,'y');kd.save();kd.font=this.scaled_size+'px'+' '+this.family;kd.textBaseline='top';var uc=kd.measureText(this.text);if(this.scale_factor_changed){this.scaled_width=uc.width;this.scaled_height=uc.height;this.width=this.scaled_width/this.scale_factor;this.height=this.scaled_height/this.scale_factor;this.scale_factor_changed=false;}
if(this.bgcolor){kd.fillStyle=this.bgcolor;kd.fillRect(x,y,uc.width,this.scaled_size);}
kd.fillStyle=this.color;kd.fillText(this.text,x,y);kd.restore();}
;GE.Txt.Text.prototype.get_width=function(){return this.width;}
;GE.Txt.Text.prototype.get_height=function(){return this.height;}
;GE.Txt.Text.prototype.get_scaled_height=function(){return this.scaled_height;}
;GE.Txt.Text.prototype.get_scaled_width=function(){return this.scaled_width;}
;GE.Txt.Text.prototype.set_scale_factor=function(s){this.scale_factor=GE.ValueChecker.float(s,'s');this.scaled_size=this.size*s;this.scale_factor_changed=true;}
;GE.Txt.Text.prototype.get_scale_factor=function(){return this.scale_factor;}
;GE.Txt.Text.prototype.get_text=function(){return this.text;}
;if(typeof(GE.Objects)!='object')GE.Objects={}
;GE.Objects.GameObject=function(td,p){if(typeof(td)!='undefined'){this.init(td,p);}
}
;GE.Objects.GameObject.COLLIDE_NONE=0;GE.Objects.GameObject.COLLIDE_LEFT=1;GE.Objects.GameObject.COLLIDE_RIGHT=2;GE.Objects.GameObject.COLLIDE_TOP=4;GE.Objects.GameObject.COLLIDE_BOTTOM=8;GE.Objects.GameObject.prototype.init=function(td,p){this.game=GE.ValueChecker.instance_of(td,'game',GE.Game
);this.position=GE.ValueChecker.instance_of(p,'p',MathExt.LinAlg3D.Vector
);this.delete_me=false;this.scale_factor=1;this.scaled_position=new MathExt.LinAlg3D.Vector(p.x,p.y,p.z);this.collides=false;this.collision_body=new MathExt.LinAlg2D.Rect(0,0,0,0
);this.scaled_collision_body=new MathExt.LinAlg2D.Rect(0,0,0,0
);}
;GE.Objects.GameObject.prototype.update=function(od){if(this.collides){var ob=this.game.get_ani_canvas().get_objects();var v=null;for(var i=0;i<ob.length;i++){if(ob[i]==this||!ob[i].collides)continue;v=this.get_scaled_collision_body().check_overlap_rect(ob[i].get_scaled_collision_body());if(v)this.handle_collision(v,ob[i]);}
}
}
;GE.Objects.GameObject.prototype.draw=function(kd,od){}
;GE.Objects.GameObject.prototype.handle_collision=function(ud,vd){}
;GE.Objects.GameObject.prototype.get_position=function(){return this.position;}
;GE.Objects.GameObject.prototype.get_x=function(){return this.position.x;}
;GE.Objects.GameObject.prototype.get_y=function(){return this.position.y;}
;GE.Objects.GameObject.prototype.set_position=function(p){this.position=GE.ValueChecker.instance_of(p,'p',MathExt.LinAlg3D.Vector
);this.scaled_position.x=this.get_x()*this.scale_factor;this.scaled_position.y=this.get_y()*this.scale_factor;}
;GE.Objects.GameObject.prototype.set_x=function(x){this.position.x=GE.ValueChecker.int(x,'x');this.scaled_position.x=this.get_x()*this.scale_factor;}
;GE.Objects.GameObject.prototype.set_y=function(y){this.position.y=GE.ValueChecker.int(y,'y');this.scaled_position.y=this.get_y()*this.scale_factor;}
;GE.Objects.GameObject.prototype.get_width=function(){return 0;}
;GE.Objects.GameObject.prototype.get_height=function(){return 0;}
;GE.Objects.GameObject.prototype.get_scaled_position=function(){return this.scaled_position;}
;GE.Objects.GameObject.prototype.get_scaled_x=function(){return this.scaled_position.x;}
;GE.Objects.GameObject.prototype.get_scaled_y=function(){return this.scaled_position.y;}
;GE.Objects.GameObject.prototype.get_scaled_width=function(){return 0;}
;GE.Objects.GameObject.prototype.get_scaled_height=function(){return 0;}
;GE.Objects.GameObject.prototype.set_scale_factor=function(s){this.scale_factor=GE.ValueChecker.float(s,'s');this.scaled_position.x=this.get_x()*s;this.scaled_position.y=this.get_y()*s;this.scaled_collision_body.x=this.collision_body.x*this.get_scale_factor();this.scaled_collision_body.y=this.collision_body.y*this.get_scale_factor();this.scaled_collision_body.width=this.collision_body.width*this.get_scale_factor();this.scaled_collision_body.height=this.collision_body.height*this.get_scale_factor();}
;GE.Objects.GameObject.prototype.get_scale_factor=function(){return this.scale_factor;}
;GE.Objects.GameObject.prototype.shall_be_deleted=function(){return this.delete_me;}
;GE.Objects.GameObject.prototype.delete_next_frame=function(){this.delete_me=true;}
;GE.Objects.GameObject.prototype.set_collision_body=function(wd,xd,yd,zd){if(wd)wd=GE.ValueChecker.int(wd,'x_offset');else
wd=0;if(xd)xd=GE.ValueChecker.int(xd,'y_offset');else
xd=0;if(yd)yd=GE.ValueChecker.int(yd,'w_offset');else
yd=0;if(zd)zd=GE.ValueChecker.int(zd,'h_offset');else
zd=0;this.collision_body.x=wd;this.collision_body.y=xd;this.collision_body.width=yd;this.collision_body.height=zd;this.scaled_collision_body.x=wd*this.get_scale_factor();this.scaled_collision_body.y=xd*this.get_scale_factor();this.scaled_collision_body.width=yd*this.get_scale_factor();this.scaled_collision_body.height=zd*this.get_scale_factor();}
;GE.Objects.GameObject.prototype.get_collision_body=function(){return this.collision_body.translate(this.get_position());}
;GE.Objects.GameObject.prototype.get_scaled_collision_body=function(){return this.scaled_collision_body.translate(this.get_scaled_position());}
;GE.Objects.ImageObject=function(td,jd,p){if(typeof(td)!='undefined'){this.init(td,jd,p);}
}
;GE.Objects.ImageObject.extend(GE.Objects.GameObject);GE.Objects.ImageObject.prototype.init=function(td,jd,p){GE.Objects.ImageObject.parent.init.call(this,td,p);this.img=GE.ValueChecker.instance_of(jd,'img',GE.Img.Image);this.collision_body=new MathExt.LinAlg2D.Rect(0,0,this.get_width(),this.get_height());this.scaled_collision_body=new MathExt.LinAlg2D.Rect(0,0,this.get_scaled_width(),this.get_scaled_height());}
;GE.Objects.ImageObject.prototype.draw=function(kd,od){if(GE.instance_of(this.img,GE.Img.Image))this.img.draw(kd,this.get_scaled_x(),this.get_scaled_y());else
this.img.draw_next_frame(kd,this.get_scaled_x(),this.get_scaled_y(),od
);}
;GE.Objects.ImageObject.prototype.set_image=function(jd){this.img=GE.ValueChecker.instance_of(jd,'img',GE.Img.Image);}
;GE.Objects.ImageObject.prototype.get_image=function(){return this.img;}
;GE.Objects.ImageObject.prototype.get_width=function(){return this.img.get_width();}
;GE.Objects.ImageObject.prototype.get_height=function(){return this.img.get_height();}
;GE.Objects.ImageObject.prototype.get_scaled_width=function(){return this.img.get_scaled_width();}
;GE.Objects.ImageObject.prototype.get_scaled_height=function(){return this.img.get_scaled_width();}
;GE.Objects.ImageObject.prototype.set_scale_factor=function(s){GE.Objects.ImageObject.parent.set_scale_factor.call(this,s);this.img.set_scale_factor(s);}
;GE.Objects.CollidingImageObject=function(td,jd,p){if(typeof(td)!='undefined'){this.init(td,jd,p);}
}
;GE.Objects.CollidingImageObject.extend(GE.Objects.ImageObject);GE.Objects.CollidingImageObject.prototype.init=function(td,jd,p){GE.Objects.CollidingImageObject.parent.init.call(this,td,jd,p);this.collision_body=new MathExt.LinAlg2D.Rect(0,0,this.get_width(),this.get_height());this.scaled_collision_body=new MathExt.LinAlg2D.Rect(0,0,this.get_scaled_width(),this.get_scaled_height());this.collides=true;}
;GE.Objects.TextObject=function(td,$d,p){if(typeof(td)!='undefined'){this.init(td,$d,p);}
}
;GE.Objects.TextObject.extend(GE.Objects.GameObject);GE.Objects.TextObject.prototype.init=function(td,$d,p){GE.Objects.TextObject.parent.init.call(this,td,p);this.txt=GE.ValueChecker.instance_of($d,'txt',GE.Txt.Text);}
;GE.Objects.TextObject.prototype.draw=function(kd,od){this.txt.draw(kd,this.get_scaled_x(),this.get_scaled_y());}
;GE.Objects.TextObject.prototype.set_text=function($d){this.txt=GE.ValueChecker.instance_of($d,'txt',GE.Txt.Text);}
;GE.Objects.TextObject.prototype.get_image=function(){return this.txt;}
;GE.Objects.TextObject.prototype.get_width=function(){return this.txt.get_width();}
;GE.Objects.TextObject.prototype.get_height=function(){return this.txt.get_height();}
;GE.Objects.TextObject.prototype.get_scaled_width=function(){return this.txt.get_scaled_width();}
;GE.Objects.TextObject.prototype.get_scaled_height=function(){return this.txt.get_scaled_width();}
;GE.Objects.TextObject.prototype.set_scale_factor=function(s){GE.Objects.TextObject.parent.set_scale_factor.call(this,s);this.txt.set_scale_factor(s);}
;