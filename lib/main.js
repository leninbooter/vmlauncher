/***
*	Alvin González
*	FireFox Add-On
*	Jan/21/2014
*
**/
var contextMenu = require("sdk/context-menu");
var { Cc, Ci } = require("chrome");
var file = Cc["@mozilla.org/file/local;1"]
                     .createInstance(Ci.nsIFile); 
			  
var mstscMenuItem = contextMenu.Item({
	label: "Launch with MSTSC",
	context: contextMenu.SelectionContext(),
	contentScript:	'self.on("click",function() {' +
					' var text = window.getSelection().toString(); ' +
					' self.postMessage(text);' +
					'});',
	onMessage: function(selectionText) {
		var args = ["-v:"+selectionText.trim().toString()];
		file.initWithPath("C:\\Windows\\system32\\mstsc.exe");
		var process = Cc["@mozilla.org/process/util;1"]
             .createInstance(Ci.nsIProcess);
		process.init(file);
		process.run(false,args,args.length);
	}
});
var vncMenuItem = contextMenu.Item({
	label: "Launch with VNC",
	context: contextMenu.SelectionContext(),
	contentScript:	'self.on("click",function() {' +
					' var text = window.getSelection().toString(); ' +
					' self.postMessage(text);' +
					'});',
	onMessage: function(selectionText) {
		var args = [selectionText.trim().toString()];
		file.initWithPath("C:\\Windows\\system32\\vnc.exe");
		var process = Cc["@mozilla.org/process/util;1"]
              .createInstance(Ci.nsIProcess);
		process.init(file);
		process.run(false,args,args.length);
	}	
});
