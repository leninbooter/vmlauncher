/***
*	Alvin González
*	FireFox Add-On
*	Jan/21/2014
*
**/
var contextMenu = require("sdk/context-menu");
var iofile = require("sdk/io/file");
var { Cc, Ci } = require("chrome");
var file = Cc["@mozilla.org/file/local;1"]
                     .createInstance(Ci.nsIFile);
var MSTSCpath = "C:\\Windows\\system32\\mstsc.exe";
var VNCpath = "C:\\Windows\\system32\\VNC.exe";					 
			  			  
var mstscMenuItem = contextMenu.Item({
	label: "Launch with MSTSC",
	context: contextMenu.SelectionContext(),
	contentScript:	'self.on("click",function() {' +
					' var text = window.getSelection().toString(); ' +
					' self.postMessage(text);' +
					'});',
	onMessage: function(selectionText) { 
				
		var args = ["-v:"+selectionText.trim().toString()];
		launch("MSTSC",args);
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
		
		var args = [selectionText.trim().toString() + ":1"];
		launch("VNC",args);
		
	}	
});

function launch(app, args)
{
	switch(app)
	{
		case "MSTSC":			
			var appTarget = MSTSCpath;
		break;
		
		case "VNC":			
			var appTarget = VNCpath;
		break;
	}
	
	if ( iofile.exists(appTarget) )
	{
		file.initWithPath(appTarget);
		var process = Cc["@mozilla.org/process/util;1"]
              .createInstance(Ci.nsIProcess);
		process.init(file);
		process.run(false,args,args.length);
	}else
	{
		var promptService = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
		promptService.alert(null, "Executable not found", app + " was not found in the required path. Please, place it in C:\\Windows\\system32\\ and try again.");
	}
}
