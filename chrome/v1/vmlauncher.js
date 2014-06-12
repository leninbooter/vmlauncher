chrome.contextMenus.create({
	"title": "Launch with MSTSC",
	"contexts": ["selection"],
	"onclick": launchMSTSC
});
chrome.contextMenus.create({
	"title": "Launch with VNC",
	"contexts": ["selection"],
	"onclick": launchVNC
});
chrome.contextMenus.create({
	"title": "Launch with Putty (SSH)",
	"contexts": ["selection"],
	"onclick": launchPUTTY
});

function launchMSTSC(info, tab)
{
	chrome.tabs.update(tab.id, {url:"vmlaunch:mstsc:"+info.selectionText})
}

function launchVNC(info, tab)
{
	chrome.tabs.update(tab.id, {url:"vmlaunch:vnc:"+info.selectionText})
}

function launchPUTTY(info, tab)
{
	chrome.tabs.update(tab.id, {url:"vmlaunch:ssh:"+info.selectionText})
}